import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bfs",
  title: "BFS",
  description: "Shortest paths in unweighted graphs, multi-source BFS, grid BFS.",
  readingTime: 7,
  content: `

# BFS

## Theory

**Breadth-first search** explores level by level with a queue, so it computes the **shortest path in edges** from a source in O(V + E).

\`\`\`text
dist[src] = 0; push src
while queue not empty:
    u = pop front
    for v in adj[u]: if dist[v] unset: dist[v] = dist[u] + 1; push v
\`\`\`

**Invariant:** the queue holds at most two consecutive distance levels, so distances come out non-decreasing — that is why the first time you reach a node is the shortest way.

### Variants

- **Multi-source BFS** — push every source with distance 0 (rotting oranges, nearest 0 in a matrix, distance to the closest special vertex).
- **Grid BFS** — direction arrays; mark visited *when pushing*, never when popping, or nodes get queued twice.
- **Path reconstruction** — store \`parent[v]\` and walk back from the target.
- **0-1 BFS** — deque, weights 0/1 (own topic).
- **BFS on states** — the node can be a tuple (position, keys, remaining fuel, parity). This is how most "shortest sequence of moves" puzzles are solved.
- **Bidirectional BFS** — search from both ends, meets in the middle, roughly \`b^(d/2)\` instead of \`b^d\`.

BFS also gives the **graph diameter of a tree** (two BFS runs) and detects bipartiteness by level parity.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int src) {
    vector<int> dist(adj.size(), -1);
    queue<int> q;
    dist[src] = 0; q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u])
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
    return dist;
}

vector<int> shortestPath(const vector<vector<int>>& adj, int s, int t) {
    vector<int> par(adj.size(), -2), dist(adj.size(), -1);
    queue<int> q; dist[s] = 0; par[s] = -1; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u])
            if (dist[v] == -1) { dist[v] = dist[u] + 1; par[v] = u; q.push(v); }
    }
    vector<int> path;
    if (dist[t] == -1) return path;
    for (int v = t; v != -1; v = par[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}

// multi-source BFS on a grid: distance to the nearest '1'
vector<vector<int>> gridBfs(const vector<string>& g) {
    int R = g.size(), C = g[0].size();
    vector<vector<int>> dist(R, vector<int>(C, -1));
    queue<pair<int,int>> q;
    for (int r = 0; r < R; ++r) for (int c = 0; c < C; ++c)
        if (g[r][c] == '1') { dist[r][c] = 0; q.push({r, c}); }
    int dr[] = {1,-1,0,0}, dc[] = {0,0,1,-1};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; ++d) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    return dist;
}

int main() {
    vector<vector<int>> adj = {{1,2},{0,3},{0},{1,4},{3}};
    for (int d : bfs(adj, 0)) cout << d << ' ';           // 0 1 1 2 3
    cout << '\\n';
    for (int v : shortestPath(adj, 0, 4)) cout << v << ' '; // 0 1 3 4
    cout << '\\n';
    for (auto& row : gridBfs({"010","000","001"})) {
        for (int d : row) cout << d << ' ';
        cout << '\\n';
    }
}
\`\`\`
`,
};

export default topic;
