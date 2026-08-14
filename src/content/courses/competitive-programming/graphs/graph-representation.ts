import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "graph-representation",
  title: "Graph Representation",
  description: "Adjacency list, matrix, edge list, and grids as graphs.",
  readingTime: 6,
  content: `

# Graph Representation

## Theory

A graph is \`G = (V, E)\`. Choose the storage that matches the queries.

| Representation | Memory | "is u-v an edge?" | Iterate neighbours |
|---|---|---|---|
| Adjacency list | O(V + E) | O(deg u) | O(deg u) — optimal |
| Adjacency matrix | O(V^2) | O(1) | O(V) |
| Edge list | O(E) | O(E) | O(E) |

**Default in CP: adjacency list** (\`vector<vector<int>>\`), because contest graphs are sparse (\`E ~ V\`).

- **Weighted**: \`vector<vector<pair<int,int>>>\` holding \`(to, weight)\`.
- **Edge list** is what Kruskal and Bellman-Ford want.
- **Matrix** suits Floyd-Warshall, dense flow, and \`V <= 500\`.
- **Grids** are implicit graphs: cell \`(r,c)\` is node \`r*m+c\`, neighbours via direction arrays.
- **Directed vs undirected**: undirected pushes both \`u->v\` and \`v->u\`.
- **CSR / flattened arrays** (head/next arrays) save memory for \`10^6\`+ edges.

Read input with \`1\`-indexed vertices and subtract one, or size the vectors \`n + 1\` — pick one convention and keep it.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 5, m = 5;
    vector<array<int,3>> edges = {{0,1,4},{0,2,1},{1,3,2},{2,3,5},{3,4,3}};

    // 1. adjacency list (weighted, undirected)
    vector<vector<pair<int,int>>> adj(n);
    for (auto [u, v, w] : edges) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    for (int u = 0; u < n; ++u) {
        cout << u << ':';
        for (auto [v, w] : adj[u]) cout << ' ' << v << '(' << w << ')';
        cout << '\\n';
    }

    // 2. adjacency matrix
    const int INF = 1e9;
    vector<vector<int>> mat(n, vector<int>(n, INF));
    for (int i = 0; i < n; ++i) mat[i][i] = 0;
    for (auto [u, v, w] : edges) mat[u][v] = mat[v][u] = w;

    // 3. grid as an implicit graph
    vector<string> grid = {"..#", ".#.", "..."};
    int R = grid.size(), C = grid[0].size();
    int dr[] = {1,-1,0,0}, dc[] = {0,0,1,-1};
    auto neighbours = [&](int r, int c) {
        vector<pair<int,int>> res;
        for (int d = 0; d < 4; ++d) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] != '#')
                res.push_back({nr, nc});
        }
        return res;
    };
    cout << "neighbours of (0,0) = " << neighbours(0, 0).size() << '\\n';   // 2
    cout << "mat[0][2] = " << mat[0][2] << '\\n';                          // 1
}
\`\`\`
`,
};

export default topic;
