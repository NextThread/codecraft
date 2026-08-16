import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "shortest-path-dag",
  title: "Shortest Path on DAG",
  description: "Computing single-source shortest (or longest) paths in O(V+E) using topological order, without Dijkstra.",
  readingTime: 7,
  content: `
# Shortest Path on DAG

## Theory

In a general weighted graph, shortest paths need Dijkstra (O((V+E) log V), non-negative weights) or Bellman-Ford (O(VE), handles negative weights but not negative cycles). In a **Directed Acyclic Graph**, we can do strictly better: **O(V+E)**, and negative edge weights are perfectly fine because there are no cycles to create a negative cycle.

### Core idea

1. Compute a topological order of the DAG.
2. Initialize \`dist[source] = 0\`, all others \`= +infinity\`.
3. Process vertices in topological order; for each vertex \`u\`, relax every outgoing edge \`(u, v, w)\`: \`dist[v] = min(dist[v], dist[u] + w)\`.
4. Since \`u\` is processed before any \`v\` reachable via an edge from \`u\` (topological property), by the time we relax edges out of \`u\`, \`dist[u]\` is already final.

The same idea works for **longest paths** by flipping min to max and initializing to \`-infinity\` — this is exactly the DAG DP longest-path pattern, and is used, e.g., to compute critical paths in project scheduling.

### Why it works

Topological order ensures that when vertex \`u\` is popped for processing, all edges that could still decrease \`dist[u]\` have already been considered (since all predecessors of \`u\` come earlier in the order). Thus \`dist[u]\` is finalized before it is used to relax successors — no need to ever "revisit" a vertex, unlike Bellman-Ford or Dijkstra with negative weights.

### Key observations

- No priority queue is needed — the topological order itself is the correct processing order, giving true linear time.
- Works correctly with **negative edge weights**, something Dijkstra cannot handle.
- If some vertices are unreachable from the source, their dist remains infinity, and edges from them are simply skipped (or safely relaxed since `dist[u] = infinity` won't improve anything, guard against overflow).
- To find longest paths (critical path method), negate the objective or directly take max instead of min.
- If the graph is not guaranteed acyclic, first detect cycles (e.g., via Kahn's algorithm — if the produced order has fewer than V vertices, a cycle exists and this technique does not apply).

### Complexity

O(V + E) time, O(V) space — a strict improvement over Dijkstra/Bellman-Ford, achievable specifically because of acyclicity.

### When to use

- Shortest or longest paths in scheduling / dependency graphs (e.g., critical path method, PERT charts).
- Any shortest-path problem where the graph is guaranteed acyclic (e.g., DP problems reformulated as graph problems, like word ladder restricted to strictly increasing lengths).
- As a subroutine when a graph has few back edges that can be removed to make it a DAG, plus separate handling.

### Example

Edges (u -> v, w): 0->1 (5), 0->2 (3), 1->3 (6), 2->1 (-2), 2->3 (4). Topological order: 0,2,1,3.
dist[0]=0. Process 0: dist[1]=5, dist[2]=3. Process 2: dist[1] = min(5, 3-2)=1, dist[3]=min(inf,3+4)=7. Process 1: dist[3]=min(7,1+6)=7. Final: dist[3]=7 (correctly handling negative edge 2->1).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll INF = LLONG_MAX / 2;

struct DAGShortestPath {
    int n;
    vector<vector<pair<int,ll>>> adj; // adj[u] = {v, weight}
    vector<int> indeg;

    DAGShortestPath(int n) : n(n), adj(n), indeg(n, 0) {}

    void addEdge(int u, int v, ll w) {
        adj[u].push_back({v, w});
        indeg[v]++;
    }

    // Returns topo order; size < n means a cycle exists.
    vector<int> topoOrder() {
        vector<int> deg = indeg, order;
        queue<int> q;
        for (int i = 0; i < n; i++) if (deg[i] == 0) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (auto [v, w] : adj[u]) if (--deg[v] == 0) q.push(v);
        }
        return order;
    }

    vector<ll> shortestPaths(int src) {
        vector<int> order = topoOrder();
        vector<ll> dist(n, INF);
        dist[src] = 0;
        for (int u : order) {
            if (dist[u] >= INF) continue; // unreachable
            for (auto [v, w] : adj[u]) {
                dist[v] = min(dist[v], dist[u] + w);
            }
        }
        return dist;
    }

    // Longest paths (e.g., critical path method), src's dist = 0, unreachable = -INF.
    vector<ll> longestPaths(int src) {
        vector<int> order = topoOrder();
        vector<ll> dist(n, -INF);
        dist[src] = 0;
        for (int u : order) {
            if (dist[u] <= -INF) continue;
            for (auto [v, w] : adj[u]) {
                dist[v] = max(dist[v], dist[u] + w);
            }
        }
        return dist;
    }
};

int main() {
    int n = 4;
    DAGShortestPath g(n);
    g.addEdge(0, 1, 5);
    g.addEdge(0, 2, 3);
    g.addEdge(1, 3, 6);
    g.addEdge(2, 1, -2);
    g.addEdge(2, 3, 4);

    vector<ll> dist = g.shortestPaths(0);
    for (int i = 0; i < n; i++) {
        cout << "dist[" << i << "] = " << (dist[i] >= INF ? -1 : dist[i]) << "\\n";
    }
    return 0;
}
\`\`\`
`,
};

export default topic;
