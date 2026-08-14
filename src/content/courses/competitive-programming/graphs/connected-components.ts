import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "connected-components",
  title: "Connected Components",
  description: "Labelling components with DFS/BFS or DSU, plus grid flood fill.",
  readingTime: 5,
  content: `

# Connected Components

## Theory

In an **undirected** graph, a connected component is a maximal set of mutually reachable vertices. Every vertex lies in exactly one component.

Three standard ways, all O(V + E):

1. **DFS/BFS sweep** — loop over vertices; on an unvisited one, start a traversal and label everything it reaches with the current component id.
2. **DSU** — union the endpoints of every edge; the number of components is \`n − (successful unions)\`.
3. **Flood fill** on a grid — same as (1) with implicit neighbours (4- or 8-connectivity).

### Things you usually compute alongside

- \`comp[v]\` — component id, giving O(1) "are u and v connected?".
- component sizes, max/min size, number of edges per component.
- Whether a component is a **tree** (edges = vertices − 1), a **cycle** (edges = vertices, all degrees 2), or **complete**.

For **directed** graphs "connected" splits into *weakly connected* (ignore directions) and *strongly connected* (see SCC). DSU handles only the undirected/incremental case — it cannot process deletions.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// component labelling with iterative BFS
pair<int, vector<int>> components(const vector<vector<int>>& adj) {
    int n = adj.size(), cnt = 0;
    vector<int> comp(n, -1);
    for (int s = 0; s < n; ++s) {
        if (comp[s] != -1) continue;
        queue<int> q; q.push(s); comp[s] = cnt;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) if (comp[v] == -1) { comp[v] = cnt; q.push(v); }
        }
        ++cnt;
    }
    return {cnt, comp};
}

// number of islands via flood fill (4-connectivity)
int countIslands(vector<string> g) {
    int R = g.size(), C = g[0].size(), cnt = 0;
    int dr[] = {1,-1,0,0}, dc[] = {0,0,1,-1};
    for (int r = 0; r < R; ++r) for (int c = 0; c < C; ++c) {
        if (g[r][c] != '1') continue;
        ++cnt;
        vector<pair<int,int>> st{{r, c}};
        g[r][c] = '0';
        while (!st.empty()) {
            auto [x, y] = st.back(); st.pop_back();
            for (int d = 0; d < 4; ++d) {
                int nx = x + dr[d], ny = y + dc[d];
                if (nx < 0 || nx >= R || ny < 0 || ny >= C || g[nx][ny] != '1') continue;
                g[nx][ny] = '0';
                st.push_back({nx, ny});
            }
        }
    }
    return cnt;
}

int main() {
    vector<vector<int>> adj = {{1},{0},{3},{2},{}};
    auto [cnt, comp] = components(adj);
    cout << cnt << '\\n';                     // 3
    for (int c : comp) cout << c << ' ';      // 0 0 1 1 2
    cout << '\\n';
    cout << countIslands({"11000","11000","00100","00011"}) << '\\n';   // 3
}
\`\`\`
`,
};

export default topic;
