import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-grid",
  title: "2D / Grid DP",
  description: "DP over two indices: grid paths, obstacles, min path sum, edit distance shape.",
  readingTime: 7,
  content: `

# 2D / Grid DP

## Theory

When one index is not enough, the state becomes a pair. Two big families:

1. **Grid DP** — the state is a cell \`(r, c)\` of a matrix.
2. **Two-sequence DP** — the state is \`(i, j)\` = prefixes of two arrays/strings (LCS, edit distance).

### Grid paths

Moving only right/down from \`(0,0)\` to \`(n-1,m-1)\`:

\`\`\`
dp[r][c] = dp[r-1][c] + dp[r][c-1]        // count paths
dp[r][c] = g[r][c] + min(dp[r-1][c], dp[r][c-1])   // min path sum
\`\`\`

Blocked cells simply get \`dp = 0\` (counting) or \`+INF\` (minimising). The pure combinatorial count with no obstacles is \`C(n+m-2, n-1)\`.

### Iteration order

Any order in which every predecessor state is computed first works. For right/down moves, row-major order is fine. If moves can also go **up/left**, the graph has cycles in the DP sense — use BFS/Dijkstra (0-1 BFS for unit costs) instead of plain DP.

### Space optimization

\`dp[r][c]\` depends only on row \`r-1\` and the current row ⇒ keep two rows, or one row updated in place when the transition only uses \`dp[r-1][c]\` and \`dp[r][c-1]\`.

### Common variants

| Problem | Transition |
|---|---|
| Unique paths | sum of up + left |
| Min/max path sum | cost + min/max of predecessors |
| Falling path (any of 3 diagonals) | \`min(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1])\` |
| Maximal square of 1s | \`dp[r][c] = 1 + min(up, left, up-left)\` |
| Cherry pickup (2 walkers) | state \`(row, c1, c2)\` |
| Count paths mod p | same recurrence with \`% MOD\` |

Complexity is (states × transitions) = O(n·m) for the simple versions.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long INF = 1e18;

// 1) count paths with obstacles ('#' blocked), O(n*m) time, O(m) space
long long countPaths(const vector<string>& g, long long MOD = 1000000007) {
    int n = g.size(), m = g[0].size();
    vector<long long> dp(m, 0);
    dp[0] = (g[0][0] == '#') ? 0 : 1;
    for (int r = 0; r < n; ++r)
        for (int c = 0; c < m; ++c) {
            if (g[r][c] == '#') { dp[c] = 0; continue; }
            if (c > 0) dp[c] = (dp[c] + dp[c - 1]) % MOD;
        }
    return dp[m - 1];
}

// 2) minimum path sum, right/down only
long long minPathSum(vector<vector<long long>> a) {
    int n = a.size(), m = a[0].size();
    vector<long long> dp(m, INF);
    dp[0] = 0;
    for (int r = 0; r < n; ++r)
        for (int c = 0; c < m; ++c) {
            long long best = (c > 0) ? min(dp[c], dp[c - 1]) : dp[c];
            dp[c] = (r == 0 && c == 0) ? a[0][0] : best + a[r][c];
        }
    return dp[m - 1];
}

// 3) largest square of 1s
int maximalSquare(const vector<string>& g) {
    int n = g.size(), m = g[0].size(), best = 0;
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int r = 1; r <= n; ++r)
        for (int c = 1; c <= m; ++c)
            if (g[r - 1][c - 1] == '1') {
                dp[r][c] = 1 + min({dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]});
                best = max(best, dp[r][c]);
            }
    return best * best;                        // area
}

int main() {
    vector<string> g = {"....", ".#..", "...."};
    cout << countPaths(g) << '\\n';                     // 5
    cout << minPathSum({{1,3,1},{1,5,1},{4,2,1}}) << '\\n';   // 7
    cout << maximalSquare({"10100","10111","11111","10010"}) << '\\n'; // 4
}
\`\`\`
`,
};

export default topic;
