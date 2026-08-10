import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-interval",
  title: "Interval DP",
  description: "DP over ranges: matrix chain, burst balloons, optimal BST, palindromes.",
  readingTime: 7,
  content: `

# Interval DP

## Theory

**Interval (range) DP** has the state \`dp[l][r]\` = the best answer for the segment \`[l, r]\`, and the transition splits the segment at some \`k\`:

\`\`\`
dp[l][r] = min/max over l <= k < r of ( dp[l][k] + dp[k+1][r] + cost(l, r) )
\`\`\`

- States: O(n²), transitions: O(n) ⇒ **O(n³)** in general.
- Iterate by **increasing length**, so all shorter intervals are ready.

\`\`\`
for len = 2..n
  for l = 0..n-len
      r = l + len - 1
      combine sub-intervals
\`\`\`

### Classic problems

| Problem | cost / transition |
|---|---|
| Matrix chain multiplication | \`p[l]*p[k+1]*p[r+1]\` |
| Merging stones / cutting a rod | \`sum(l..r)\` (prefix sums) |
| Optimal binary search tree | \`sum of frequencies in [l,r]\` |
| Burst balloons | remove \`k\` **last**: \`a[l-1]*a[k]*a[r+1]\` |
| Longest palindromic subsequence | \`s[l]==s[r] ? dp[l+1][r-1]+2 : max(...)\` |
| Minimum insertions for palindrome | \`n - LPS\` |
| Removing boxes / Zuma-style | extra dimension for the streak |

### Order matters: "last" vs "first"

Burst-balloons style problems are easier if you think about the element removed **last** in the interval — then the two sides are independent.

### Optimisations

- **Knuth optimisation**: if the cost satisfies the quadrangle inequality and \`opt[l][r-1] ≤ opt[l][r] ≤ opt[l+1][r]\`, the total work drops to O(n²) (works for optimal BST and merging stones).
- **Divide & conquer optimisation** applies when the layer structure is \`dp[i][j]\` with monotone \`opt\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long INF = 1e18;

// 1) matrix chain multiplication: p has n+1 dimensions for n matrices
long long matrixChain(const vector<long long>& p) {
    int n = p.size() - 1;
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            dp[l][r] = INF;
            for (int k = l; k < r; ++k)
                dp[l][r] = min(dp[l][r],
                    dp[l][k] + dp[k+1][r] + p[l] * p[k+1] * p[r+1]);
        }
    return dp[0][n-1];
}

// 2) merging stones: cost of merging two piles = their total
long long mergeStones(const vector<long long>& a) {
    int n = a.size();
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; ++i) pre[i+1] = pre[i] + a[i];
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            dp[l][r] = INF;
            for (int k = l; k < r; ++k)
                dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r]);
            dp[l][r] += pre[r+1] - pre[l];
        }
    return dp[0][n-1];
}

// 3) burst balloons: maximise sum of a[l-1]*a[k]*a[r+1]
long long burstBalloons(vector<long long> a) {
    a.insert(a.begin(), 1); a.push_back(1);
    int n = a.size();
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    for (int len = 1; len <= n - 2; ++len)
        for (int l = 1; l + len - 1 <= n - 2; ++l) {
            int r = l + len - 1;
            for (int k = l; k <= r; ++k)                  // k burst last
                dp[l][r] = max(dp[l][r],
                    dp[l][k-1] + a[l-1] * a[k] * a[r+1] + dp[k+1][r]);
        }
    return dp[1][n-2];
}

// 4) longest palindromic subsequence
int lps(const string& s) {
    int n = s.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int i = 0; i < n; ++i) dp[i][i] = 1;
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            dp[l][r] = (s[l] == s[r]) ? dp[l+1][r-1] + 2
                                      : max(dp[l+1][r], dp[l][r-1]);
        }
    return dp[0][n-1];
}

int main() {
    cout << matrixChain({40, 20, 30, 10, 30}) << '\\n';   // 26000
    cout << mergeStones({4, 3, 3, 4}) << '\\n';           // 28
    cout << burstBalloons({3, 1, 5, 8}) << '\\n';         // 167
    cout << lps("bbbab") << '\\n';                        // 4
}
\`\`\`
`,
};

export default topic;
