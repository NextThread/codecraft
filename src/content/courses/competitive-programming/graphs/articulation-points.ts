import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "articulation-points",
  title: "Articulation Points",
  description: "Cut vertices via low-links, root special case, and biconnected components.",
  readingTime: 6,
  content: `

# Articulation Points

## Theory

An **articulation point** (cut vertex) is a vertex whose removal (with its incident edges) increases the number of connected components.

### Criterion (same DFS as bridges)

For a non-root vertex \`u\`: \`u\` is a cut vertex iff it has a child \`v\` with \`low[v] >= tin[u]\`.

For the **root** of the DFS tree: it is a cut vertex iff it has **two or more** DFS children.

Note the \`>=\` (bridges use strict \`>\`), and that here you may skip the parent **vertex** instead of the edge id — multi-edges do not affect cut vertices.

O(V + E).

### Related structures

- No cut vertices and \`V >= 3\` ⇒ the graph is **2-vertex-connected** (biconnected).
- **Biconnected components** = maximal edge sets sharing no cut vertex; obtained by pushing edges on a stack and popping when the criterion fires.
- The **block-cut tree** has one node per biconnected block and one per cut vertex; it answers questions like "which vertices must every u→v path pass through?".
- Typical problems: critical routers/servers in a network, adding minimum edges to make a graph biconnected.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct CutVertices {
    int n, timer_ = 0;
    vector<vector<int>> adj;
    vector<int> tin, low;
    vector<char> vis, isCut;

    explicit CutVertices(int n) : n(n), adj(n), tin(n, -1), low(n, -1), vis(n, 0), isCut(n, 0) {}
    void addEdge(int u, int v) { adj[u].push_back(v); adj[v].push_back(u); }
    void dfs(int u, int parent) {
        vis[u] = 1;
        tin[u] = low[u] = timer_++;
        int children = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            if (vis[v]) low[u] = min(low[u], tin[v]);
            else {
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] >= tin[u] && parent != -1) isCut[u] = 1;
                ++children;
            }
        }
        if (parent == -1 && children > 1) isCut[u] = 1;   // root case
    }
    void run() { for (int u = 0; u < n; ++u) if (!vis[u]) dfs(u, -1); }
};

int main() {
    CutVertices c(7);
    c.addEdge(0,1); c.addEdge(1,2); c.addEdge(2,0);   // cycle 0-1-2
    c.addEdge(1,3);                                   // 1 and 3 are cut vertices
    c.addEdge(3,4); c.addEdge(4,5); c.addEdge(5,3);   // cycle 3-4-5
    c.addEdge(4,6);                                   // 4 is a cut vertex too
    c.run();
    for (int u = 0; u < 7; ++u) if (c.isCut[u]) cout << u << ' ';   // 1 3 4
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
