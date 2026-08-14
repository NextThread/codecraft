import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "zero-one-bfs",
  title: "0-1 BFS",
  description: "Shortest paths with weights 0 and 1 in O(V + E) using a deque.",
  readingTime: 5,
  content: `

# 0-1 BFS

## Theory

When every edge weighs **0 or 1**, you do not need a heap. Use a **deque**:

- relaxing along a **0-edge** → \`push_front\` (same distance layer)
- relaxing along a **1-edge** → \`push_back\` (next layer)

The deque then holds at most two distinct distance values, exactly the BFS invariant, so the front is always the minimum. Complexity **O(V + E)** instead of \`O(E log V)\`.

### Typical modelling

- **Grid with free and costly moves**: moving along the current direction costs 0, turning costs 1 → minimum number of turns.
- **Minimum edges to reverse** in a directed graph: keep the real edge with weight 0 and add the reversed edge with weight 1.
- **Minimum walls to break** in a maze: empty cell 0, wall 1.
- **Minimum number of "special" operations** to reach a state.

### Generalisation: Dial's algorithm

For small integer weights \`0..k\`, use \`k+1\` buckets (a circular array of queues) and get O(E + V·k). Beyond that, go back to Dijkstra.

Do not forget the stale check \`if (d != dist[u]) continue;\` — a node may be pushed multiple times.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const int INF = INT_MAX / 2;

vector<int> zeroOneBfs(const vector<vector<pair<int,int>>>& g, int src) {
    vector<int> dist(g.size(), INF);
    deque<int> dq;
    dist[src] = 0;
    dq.push_back(src);
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : g[u])
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);
                else        dq.push_back(v);
            }
    }
    return dist;
}

// minimum walls to break to cross a grid ('.' free, '#' wall)
int minWalls(const vector<string>& g) {
    int R = g.size(), C = g[0].size();
    vector<vector<int>> dist(R, vector<int>(C, INF));
    deque<pair<int,int>> dq;
    dist[0][0] = (g[0][0] == '#');
    dq.push_back({0, 0});
    int dr[] = {1,-1,0,0}, dc[] = {0,0,1,-1};
    while (!dq.empty()) {
        auto [r, c] = dq.front(); dq.pop_front();
        for (int d = 0; d < 4; ++d) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            int w = (g[nr][nc] == '#');
            if (dist[r][c] + w < dist[nr][nc]) {
                dist[nr][nc] = dist[r][c] + w;
                if (w) dq.push_back({nr, nc});
                else   dq.push_front({nr, nc});
            }
        }
    }
    return dist[R-1][C-1];
}

int main() {
    vector<vector<pair<int,int>>> g = {{{1,0},{2,1}},{{2,0}},{{3,1}},{}};
    for (int d : zeroOneBfs(g, 0)) cout << d << ' ';   // 0 0 0 1
    cout << '\\n';
    cout << minWalls({"..#",".##","..."}) << '\\n';     // 0
}
\`\`\`
`,
};

export default topic;
