import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "johnsons-algorithm",
  title: "Johnson's Algorithm",
  description: "All-pairs shortest paths in sparse graphs with negative edges, via reweighting and Dijkstra.",
  readingTime: 10,
  content: `
# Johnson's Algorithm

## Theory

**Johnson's algorithm** computes all-pairs shortest paths in a directed, weighted graph that may contain negative edge weights (but no negative cycles), in **O(V * E log V)** — much faster than running Floyd-Warshall's O(V^3) on sparse graphs, and faster than running Bellman-Ford from every vertex (O(V^2 E)).

### Core idea

The obstacle to using Dijkstra from every vertex is negative edges. Johnson's algorithm **reweights** all edges so they become non-negative, without changing which paths are shortest, then runs Dijkstra from every vertex on the reweighted graph.

1. Add a new virtual vertex \`q\` with a zero-weight edge to every other vertex.
2. Run Bellman-Ford from \`q\` to compute \`h[v]\` = shortest distance from \`q\` to \`v\` for every vertex (this also detects negative cycles — if Bellman-Ford finds one, the algorithm aborts).
3. Reweight every edge \`(u, v)\` with original weight \`w(u,v)\` to \`w'(u,v) = w(u,v) + h[u] - h[v]\`. This is guaranteed non-negative because \`h[v] <= h[u] + w(u,v)\` (triangle inequality from Bellman-Ford's shortest-path property).
4. Run Dijkstra from every vertex \`u\` using the reweighted graph to get \`d'(u,v)\`.
5. Recover the true distance: \`d(u,v) = d'(u,v) - h[u] + h[v]\` (the \`h[u]\`, \`h[v]\` terms telescope out along any path from u to v, since intermediate \`h\` terms cancel).

### Why it works

For any path \`u = v0 -> v1 -> ... -> vk = v\`, the reweighted length is
\`sum(w(vi,vi+1) + h[vi] - h[vi+1]) = sum(w(vi,vi+1)) + h[u] - h[v]\`
(telescoping sum). So reweighted path length = original length + h[u] - h[v], a *constant* depending only on the endpoints, not on the path chosen. Hence the path that minimizes reweighted length also minimizes original length — reweighting preserves the identity of shortest paths while making all weights non-negative, which is exactly what's needed for Dijkstra to be correct.

### Key observations

- Requires no negative cycles (checked automatically as a side effect of the Bellman-Ford step).
- The added vertex \`q\` and its zero-weight edges only exist to compute \`h[]\`; they are removed before running Dijkstra.
- Extremely effective for **sparse** graphs: O(V*E log V) beats Floyd-Warshall's O(V^3) once E is noticeably less than V^2.
- If all weights are already non-negative, Johnson's algorithm still works but is unnecessary — just run Dijkstra V times directly.
- Combines two well-known algorithms as building blocks: one Bellman-Ford run + V Dijkstra runs.

### Complexity

- Bellman-Ford step: O(V * E).
- V runs of Dijkstra (with a binary heap): O(V * E log V).
- Total: O(V * E log V), plus O(V^2) to store the all-pairs distance matrix.

### When to use

- All-pairs shortest paths on **sparse** graphs that may contain negative edges but no negative cycles.
- When Floyd-Warshall's O(V^3) is too slow (large V, sparse E) but negative weights rule out plain repeated Dijkstra.

### Example

Graph with a negative edge (u,v,-2) but no negative cycle. Adding q with 0-weight edges to all, Bellman-Ford gives potentials h[]. Reweighting makes every edge weight >= 0, letting Dijkstra run safely V times; distances are corrected back with h[u]-h[v].

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll INF = LLONG_MAX / 4;

struct Edge { int u, v; ll w; };

struct Johnson {
    int n;
    vector<Edge> edges;
    vector<vector<pair<int,ll>>> adj;

    Johnson(int n) : n(n), adj(n) {}

    void addEdge(int u, int v, ll w) {
        edges.push_back({u, v, w});
        adj[u].push_back({v, w});
    }

    // Returns h[] potentials from virtual source, or empty vector if a negative cycle exists.
    vector<ll> bellmanFordPotentials() {
        vector<ll> h(n + 1, 0); // h[n] is the virtual source, initialized 0, connected to all with weight 0
        // Relax n times (n = number of real vertices + 1 iterations of n edges each, standard bound V-1 -> here V = n+1)
        int V = n + 1;
        for (int iter = 0; iter < V - 1; iter++) {
            bool changed = false;
            for (auto& e : edges) {
                if (h[e.u] + e.w < h[e.v]) { h[e.v] = h[e.u] + e.w; changed = true; }
            }
            if (!changed) break;
        }
        // Check for negative cycle.
        for (auto& e : edges) {
            if (h[e.u] + e.w < h[e.v]) return {}; // negative cycle detected
        }
        h.resize(n); // drop virtual source
        return h;
    }

    // Returns dist[i][j], or empty if a negative cycle exists.
    vector<vector<ll>> allPairsShortestPaths() {
        vector<ll> h = bellmanFordPotentials();
        if (h.empty()) return {}; // negative cycle

        vector<vector<ll>> dist(n, vector<ll>(n, INF));

        for (int src = 0; src < n; src++) {
            // Dijkstra on reweighted graph: w'(u,v) = w(u,v) + h[u] - h[v] >= 0.
            vector<ll> d(n, INF);
            d[src] = 0;
            priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq;
            pq.push({0, src});
            while (!pq.empty()) {
                auto [du, u] = pq.top(); pq.pop();
                if (du > d[u]) continue;
                for (auto [v, w] : adj[u]) {
                    ll wPrime = w + h[u] - h[v];
                    if (d[u] + wPrime < d[v]) {
                        d[v] = d[u] + wPrime;
                        pq.push({d[v], v});
                    }
                }
            }
            // Undo reweighting: true dist(src,v) = d[v] - h[src] + h[v].
            for (int v = 0; v < n; v++) {
                if (d[v] < INF) dist[src][v] = d[v] - h[src] + h[v];
            }
        }
        return dist;
    }
};

int main() {
    int n = 4;
    Johnson g(n);
    g.addEdge(0, 1, -1);
    g.addEdge(0, 2, 4);
    g.addEdge(1, 2, 3);
    g.addEdge(1, 3, 2);
    g.addEdge(3, 1, 1);
    g.addEdge(2, 3, 2);

    auto dist = g.allPairsShortestPaths();
    if (dist.empty()) {
        cout << "Negative cycle detected\\n";
    } else {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << (dist[i][j] >= INF ? -1 : dist[i][j]) << " ";
            }
            cout << "\\n";
        }
    }
    return 0;
}
\`\`\`
`,
};

export default topic;
