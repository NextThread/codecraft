import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bridges",
  title: "Bridges",
  description: "Edges whose removal disconnects the graph, via DFS low-links.",
  readingTime: 6,
  content: `

# Bridges

## Theory

A **bridge** (cut edge) is an edge whose removal increases the number of connected components in an undirected graph.

### Low-link criterion

Run a DFS keeping \`tin[u]\` (entry time) and

\`\`\`text
low[u] = min(tin[u], low[child] over children, tin[v] over back edges)
\`\`\`

Edge \`(u, child)\` is a bridge iff \`low[child] > tin[u]\` — the subtree of \`child\` has no back edge above \`u\`.

O(V + E). **Multi-edges matter**: skip the parent by **edge id**, not by vertex, otherwise a doubled edge is falsely reported as a bridge.

### Consequences

- A graph has no bridges iff it is **2-edge-connected**.
- Contracting every 2-edge-connected component yields the **bridge tree**, a forest whose edges are exactly the bridges. Path queries on it answer "how many bridges must I cross?".
- Any edge on a cycle is never a bridge; in a tree every edge is a bridge.
- **Online bridge finding** exists (DSU-based), but offline low-link is the standard.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Bridges {
    int n, timer_ = 0;
    vector<vector<pair<int,int>>> adj;        // (to, edgeId)
    vector<int> tin, low;
    vector<char> vis;
    vector<pair<int,int>> bridges;

    explicit Bridges(int n) : n(n), adj(n), tin(n, -1), low(n, -1), vis(n, 0) {}
    void addEdge(int u, int v, int id) {
        adj[u].push_back({v, id});
        adj[v].push_back({u, id});
    }
    void dfs(int u, int pe) {
        vis[u] = 1;
        tin[u] = low[u] = timer_++;
        for (auto [v, id] : adj[u]) {
            if (id == pe) continue;                     // skip the edge we came from
            if (vis[v]) low[u] = min(low[u], tin[v]);   // back edge
            else {
                dfs(v, id);
                low[u] = min(low[u], low[v]);
                if (low[v] > tin[u]) bridges.push_back({u, v});
            }
        }
    }
    void run() { for (int u = 0; u < n; ++u) if (!vis[u]) dfs(u, -1); }
};

int main() {
    Bridges b(6);
    int id = 0;
    b.addEdge(0,1,id++); b.addEdge(1,2,id++); b.addEdge(2,0,id++);   // cycle
    b.addEdge(1,3,id++);                                              // bridge
    b.addEdge(3,4,id++); b.addEdge(4,5,id++); b.addEdge(5,3,id++);   // cycle
    b.run();
    for (auto [u, v] : b.bridges) cout << u << '-' << v << '\\n';     // 1-3
}
\`\`\`
`,
};

export default topic;
