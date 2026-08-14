import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "floyd-warshall",
  title: "Floyd-Warshall",
  description: "All-pairs shortest paths in O(V^3), plus transitive closure and min-max paths.",
  readingTime: 6,
  content: `

# Floyd-Warshall

## Theory

All-pairs shortest paths by DP over the set of allowed intermediate vertices:

\`\`\`text
for k in 0..n-1:
  for i in 0..n-1:
    for j in 0..n-1:
      d[i][j] = min(d[i][j], d[i][k] + d[k][j])
\`\`\`

\`d_k[i][j]\` = shortest \`i→j\` path using only \`0..k\` as intermediates. **The \`k\` loop must be outermost.**

- **O(V^3)** time, **O(V^2)** memory — practical up to \`V ~ 400-500\`.
- Works with **negative edges**; \`d[i][i] < 0\` afterwards means \`i\` lies on a negative cycle.
- Guard \`d[i][k] + d[k][j]\` against INF overflow (skip if either is INF).
- Path reconstruction: keep \`nxt[i][j]\` (or \`par\`), updated whenever you improve.

### Variants of the same recurrence

- **Transitive closure** (Warshall): \`reach[i][j] |= reach[i][k] && reach[k][j]\`, or bitsets for O(V^3/64).
- **Minimax path** (minimise the largest edge): \`d[i][j] = min(d[i][j], max(d[i][k], d[k][j]))\`.
- **Maximum probability / bottleneck / widest path**: swap min/max and +/×.
- **Counting paths** with matrix multiplication instead.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = LLONG_MAX / 4;

void floyd(vector<vector<ll>>& d, vector<vector<int>>& nxt) {
    int n = d.size();
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i) {
            if (d[i][k] == INF) continue;
            for (int j = 0; j < n; ++j)
                if (d[k][j] < INF && d[i][k] + d[k][j] < d[i][j]) {
                    d[i][j] = d[i][k] + d[k][j];
                    nxt[i][j] = nxt[i][k];
                }
        }
}

vector<int> path(const vector<vector<int>>& nxt, int u, int v) {
    if (nxt[u][v] == -1) return {};
    vector<int> res{u};
    while (u != v) { u = nxt[u][v]; res.push_back(u); }
    return res;
}

int main() {
    int n = 4;
    vector<vector<ll>> d(n, vector<ll>(n, INF));
    vector<vector<int>> nxt(n, vector<int>(n, -1));
    for (int i = 0; i < n; ++i) { d[i][i] = 0; nxt[i][i] = i; }
    auto add = [&](int u, int v, ll w) { d[u][v] = w; nxt[u][v] = v; };
    add(0,1,5); add(0,3,10); add(1,2,3); add(2,3,1);

    floyd(d, nxt);
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) cout << (d[i][j] == INF ? -1 : d[i][j]) << '\\t';
        cout << '\\n';
    }
    for (int v : path(nxt, 0, 3)) cout << v << ' ';   // 0 1 2 3
    cout << '\\n';

    bool anyNegCycle = false;
    for (int i = 0; i < n; ++i) if (d[i][i] < 0) anyNegCycle = true;
    cout << anyNegCycle << '\\n';                     // 0
}
\`\`\`
`,
};

export default topic;
