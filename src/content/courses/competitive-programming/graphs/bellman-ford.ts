import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bellman-ford",
  title: "Bellman-Ford",
  description: "Shortest paths with negative edges and negative-cycle detection.",
  readingTime: 6,
  content: `

# Bellman-Ford

## Theory

Handles **negative edge weights**. Relax **every edge** \`V − 1\` times:

\`\`\`text
repeat V-1 times:
    for each edge (u, v, w): dist[v] = min(dist[v], dist[u] + w)
\`\`\`

Because any shortest path uses at most \`V − 1\` edges, after \`V − 1\` rounds all distances are final. Complexity **O(V·E)**.

### Negative cycle detection

Do one extra round: if any edge still relaxes, a negative cycle is reachable. To list the cycle, remember \`par[]\`, walk \`V\` steps back from the relaxed vertex to land inside the cycle, then follow parents until you return.

Vertices whose distance is \`-inf\` are those reachable from a negative cycle — mark them by propagating from cycle vertices with a BFS/DFS.

### Optimisations and relatives

- **Early exit** when a full round changes nothing.
- **SPFA** (queue-based Bellman-Ford): fast in practice, worst case still O(V·E) and easy to break with anti-SPFA tests.
- **Johnson's algorithm** = Bellman-Ford potentials + Dijkstra per vertex, for all-pairs with negative edges.
- Classic application: **arbitrage detection** — take \`-log(rate)\` weights, a negative cycle means profit.
- Also solves **difference constraints** \`x_v - x_u <= w\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = LLONG_MAX / 4;

struct Edge { int u, v; ll w; };

// returns {distances, hasNegativeCycle}
pair<vector<ll>, bool> bellmanFord(int n, const vector<Edge>& edges, int src) {
    vector<ll> dist(n, INF);
    dist[src] = 0;
    for (int it = 0; it < n - 1; ++it) {
        bool changed = false;
        for (auto& e : edges)
            if (dist[e.u] < INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                changed = true;
            }
        if (!changed) break;
    }
    for (auto& e : edges)
        if (dist[e.u] < INF && dist[e.u] + e.w < dist[e.v]) return {dist, true};
    return {dist, false};
}

// extract an actual negative cycle, empty if none
vector<int> negativeCycle(int n, const vector<Edge>& edges) {
    vector<ll> dist(n, 0);
    vector<int> par(n, -1);
    int x = -1;
    for (int it = 0; it < n; ++it) {
        x = -1;
        for (auto& e : edges)
            if (dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                par[e.v] = e.u;
                x = e.v;
            }
    }
    if (x == -1) return {};
    for (int i = 0; i < n; ++i) x = par[x];
    vector<int> cyc;
    for (int v = x;; v = par[v]) {
        cyc.push_back(v);
        if (v == x && cyc.size() > 1) break;
    }
    reverse(cyc.begin(), cyc.end());
    return cyc;
}

int main() {
    vector<Edge> e = {{0,1,4},{0,2,5},{1,2,-3},{2,3,4},{3,1,-2}};
    auto [dist, neg] = bellmanFord(4, e, 0);
    cout << "negative cycle: " << neg << '\\n';       // 0
    for (ll d : dist) cout << d << ' ';               // 0 4 1 5
    cout << '\\n';

    vector<Edge> bad = {{0,1,1},{1,2,-1},{2,0,-1}};
    for (int v : negativeCycle(3, bad)) cout << v << ' ';
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
