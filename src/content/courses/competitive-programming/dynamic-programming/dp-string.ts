import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-string",
  title: "String DP",
  description: "Edit distance, wildcard/regex matching, palindrome partitioning and word break.",
  readingTime: 8,
  content: `

# String DP

## Theory

String DP is mostly **two-pointer state** DP: \`dp[i][j]\` describes prefixes (or a substring) of the input.

### Edit distance (Levenshtein)

\`\`\`
dp[i][j] = min( dp[i-1][j]   + 1,        // delete a[i]
                dp[i][j-1]   + 1,        // insert b[j]
                dp[i-1][j-1] + (a[i]!=b[j]) )
\`\`\`

Base cases \`dp[i][0]=i\`, \`dp[0][j]=j\`. O(n·m) time, O(min(n,m)) memory with rolling rows. Variants: different insert/delete/replace costs, Damerau–Levenshtein (adds transposition), LCS-only edit distance (no replace).

### Wildcard matching (\`?\` any char, \`*\` any run)

\`\`\`
dp[i][j] = p[j]=='*' ? (dp[i-1][j] || dp[i][j-1])
         : (p[j]=='?' || p[j]==s[i]) && dp[i-1][j-1]
\`\`\`

Regex-style \`.\` and \`x*\` needs a slightly different transition where \`x*\` may match zero occurrences: \`dp[i][j] = dp[i][j-2] || (match(s[i], p[j-1]) && dp[i-1][j])\`.

### Word break / dictionary segmentation

\`\`\`
dp[i] = OR over j<i of ( dp[j] && s[j..i-1] in dict )
\`\`\`

O(n²) substring checks; use a **trie** or hashing to make each check O(1)/O(len).

### Palindrome partitioning

Precompute \`isPal[i][j]\` in O(n²), then

\`\`\`
cut[i] = min over j<=i of ( cut[j-1] + 1 ) where s[j..i] is a palindrome
\`\`\`

Counting palindromic substrings and the longest palindromic substring both fall out of the same \`isPal\` table (or use Manacher for O(n)).

### Practical notes

- 1-indexed DP tables make the base cases painless.
- \`dp[i][j]\` with \`n,m ≤ 5000\` is 25M states — fine with \`short\`/\`int\`, too big if you store strings.
- When only lengths matter, roll to two rows.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// 1) edit distance, O(n*m) time, O(m) space
int editDistance(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<int> prev(m + 1), cur(m + 1);
    for (int j = 0; j <= m; ++j) prev[j] = j;
    for (int i = 1; i <= n; ++i) {
        cur[0] = i;
        for (int j = 1; j <= m; ++j)
            cur[j] = min({prev[j] + 1, cur[j - 1] + 1,
                          prev[j - 1] + (a[i-1] != b[j-1])});
        swap(prev, cur);
    }
    return prev[m];
}

// 2) wildcard matching with '?' and '*'
bool wildcard(const string& s, const string& p) {
    int n = s.size(), m = p.size();
    vector<vector<char>> dp(n + 1, vector<char>(m + 1, 0));
    dp[0][0] = 1;
    for (int j = 1; j <= m; ++j) dp[0][j] = dp[0][j-1] && p[j-1] == '*';
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j) {
            if (p[j-1] == '*') dp[i][j] = dp[i-1][j] || dp[i][j-1];
            else dp[i][j] = (p[j-1] == '?' || p[j-1] == s[i-1]) && dp[i-1][j-1];
        }
    return dp[n][m];
}

// 3) word break
bool wordBreak(const string& s, const vector<string>& dict) {
    unordered_set<string> d(dict.begin(), dict.end());
    int n = s.size();
    vector<char> dp(n + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j < i && !dp[i]; ++j)
            if (dp[j] && d.count(s.substr(j, i - j))) dp[i] = 1;
    return dp[n];
}

// 4) minimum palindromic cuts
int minPalindromeCuts(const string& s) {
    int n = s.size();
    vector<vector<char>> pal(n, vector<char>(n, 0));
    for (int i = n - 1; i >= 0; --i)
        for (int j = i; j < n; ++j)
            pal[i][j] = (s[i] == s[j]) && (j - i < 2 || pal[i+1][j-1]);
    vector<int> cut(n + 1, INT_MAX);
    cut[0] = 0;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= i; ++j)
            if (pal[j-1][i-1] && cut[j-1] != INT_MAX)
                cut[i] = min(cut[i], cut[j-1] + 1);
    return cut[n] - 1;                     // cuts = pieces - 1
}

int main() {
    cout << editDistance("intention", "execution") << '\\n';   // 5
    cout << wildcard("adceb", "*a*b") << '\\n';                // 1
    cout << wordBreak("applepenapple", {"apple", "pen"}) << '\\n'; // 1
    cout << minPalindromeCuts("aab") << '\\n';                 // 1
}
\`\`\`
`,
};

export default topic;
