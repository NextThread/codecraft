import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-subsequence",
  title: "Subsequence DP",
  description: "LIS, LCS, counting distinct subsequences and subsequence-sum states.",
  readingTime: 8,
  content: `

# Subsequence DP

## Theory

A **subsequence** keeps relative order but may skip elements (unlike a substring, which must be contiguous). Almost every subsequence problem uses one of three state shapes.

### 1. "Best subsequence ending at i" — one index

\`\`\`
LIS:  dp[i] = 1 + max{ dp[j] : j < i, a[j] < a[i] }        O(n^2)
\`\`\`

Speed-ups:
- **Patience / lower_bound** on the tails array → O(n log n).
- **Fenwick tree over compressed values** → O(n log n) and generalises to weighted LIS (max sum increasing subsequence).

Related: longest non-decreasing subsequence (\`upper_bound\`), longest bitonic subsequence (LIS from left + LIS from right), minimum number of decreasing chains = LIS length (Dilworth).

### 2. "Two prefixes" — two indices

\`\`\`
LCS:  dp[i][j] = a[i-1]==b[j-1] ? dp[i-1][j-1] + 1
                                : max(dp[i-1][j], dp[i][j-1])
\`\`\`

- Length of **shortest common supersequence** = \`n + m - LCS\`.
- Minimum insertions+deletions to convert a→b = \`n + m - 2·LCS\`.
- Longest **palindromic subsequence** of \`s\` = \`LCS(s, reverse(s))\`.
- Reconstruct by walking the table backwards from \`(n, m)\`.

### 3. "Index + accumulated value" — subset-sum style

\`\`\`
dp[i][s] = number of subsequences of the first i items with sum s
\`\`\`

This is the knapsack pattern; see the Knapsack topic.

### Counting distinct subsequences

\`\`\`
dp[i] = 2 * dp[i-1]                       // include / exclude s[i]
if s[i] appeared before at position p:  dp[i] -= dp[p-1]
\`\`\`

Counting occurrences of \`t\` as a subsequence of \`s\`:

\`\`\`
dp[i][j] = dp[i-1][j] + (s[i]==t[j] ? dp[i-1][j-1] : 0)
\`\`\`

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1000000007;

// 1) LIS length + one actual LIS, O(n log n)
vector<int> lisSequence(const vector<int>& a) {
    int n = a.size();
    vector<int> tails, idx, par(n, -1);
    for (int i = 0; i < n; ++i) {
        int pos = lower_bound(tails.begin(), tails.end(), a[i]) - tails.begin();
        if (pos == (int)tails.size()) { tails.push_back(a[i]); idx.push_back(i); }
        else { tails[pos] = a[i]; idx[pos] = i; }
        par[i] = pos ? idx[pos - 1] : -1;
    }
    vector<int> res;
    for (int cur = idx.back(); cur != -1; cur = par[cur]) res.push_back(a[cur]);
    reverse(res.begin(), res.end());
    return res;
}

// 2) LCS length and string
string lcs(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1] + 1
                                          : max(dp[i-1][j], dp[i][j-1]);
    string s;
    for (int i = n, j = m; i && j; )
        if (a[i-1] == b[j-1]) { s += a[i-1]; --i; --j; }
        else if (dp[i-1][j] >= dp[i][j-1]) --i; else --j;
    reverse(s.begin(), s.end());
    return s;
}

// 3) number of times t appears as a subsequence of s
long long countSubseqOccurrences(const string& s, const string& t) {
    int m = t.size();
    vector<long long> dp(m + 1, 0);
    dp[0] = 1;
    for (char c : s)
        for (int j = m; j >= 1; --j)
            if (t[j-1] == c) dp[j] = (dp[j] + dp[j-1]) % MOD;
    return dp[m];
}

// 4) count distinct subsequences of s (non-empty)
long long distinctSubsequences(const string& s) {
    vector<long long> last(256, -1);
    long long total = 1;                       // counts the empty subsequence
    vector<long long> dp(s.size() + 1, 0);
    dp[0] = 1;
    for (size_t i = 1; i <= s.size(); ++i) {
        dp[i] = dp[i-1] * 2 % MOD;
        int p = last[(unsigned char)s[i-1]];
        if (p != -1) dp[i] = (dp[i] - dp[p-1] + MOD) % MOD;
        last[(unsigned char)s[i-1]] = i;
    }
    (void)total;
    return (dp[s.size()] - 1 + MOD) % MOD;
}

int main() {
    for (int x : lisSequence({10, 9, 2, 5, 3, 7, 101, 18})) cout << x << ' ';
    cout << '\\n';                                        // 2 3 7 18
    cout << lcs("AGGTAB", "GXTXAYB") << '\\n';            // GTAB
    cout << countSubseqOccurrences("rabbbit", "rabbit") << '\\n';  // 3
    cout << distinctSubsequences("aba") << '\\n';         // 6
}
\`\`\`
`,
};

export default topic;
