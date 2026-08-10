import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-palindromes",
  title: "Palindromes",
  description: "Checking, expanding around centres, DP tables and palindromic counting.",
  readingTime: 7,
  content: `

# Palindromes

## Theory

A string is a **palindrome** if it reads the same forwards and backwards. Three toolkits cover nearly every palindrome task.

### 1. Two pointers — O(n)

Check a palindrome, or allow one deletion / k mismatches by branching when the pointers disagree.

### 2. Expand around centre — O(n²)

There are \`2n - 1\` centres (n single characters + n-1 gaps). Expanding each gives:

- longest palindromic **substring**,
- total **count** of palindromic substrings,
- all palindromic substrings, in O(n²).

Manacher's algorithm does the same in O(n) — see the Manacher topic.

### 3. DP table — O(n²)

\`\`\`
pal[l][r] = (s[l] == s[r]) && (r - l < 2 || pal[l+1][r-1])
\`\`\`

Feeds into palindrome partitioning (minimum cuts, count of partitions) and range palindrome queries.

For **subsequences** instead of substrings:

\`\`\`
lps[l][r] = s[l]==s[r] ? lps[l+1][r-1] + 2 : max(lps[l+1][r], lps[l][r-1])
\`\`\`

and \`LPS(s) = LCS(s, reverse(s))\`. Minimum insertions to make \`s\` a palindrome = \`n - LPS\`.

### 4. Palindromic permutation

A multiset of characters can be rearranged into a palindrome iff at most one character has an odd count. Combined with prefix XOR masks this answers range queries in O(1).

### Other useful facts

- Shortest palindrome by prepending characters: run KMP's prefix function on \`s + '#' + reverse(s)\`.
- Counting palindromic substrings of each length: Manacher radii + a difference array.
- Eertree (palindromic tree) stores all distinct palindromic substrings in O(n).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// 1) simple check + "valid after deleting at most one character"
bool isPal(const string& s, int i, int j) {
    while (i < j) if (s[i++] != s[j--]) return false;
    return true;
}
bool validAfterOneDeletion(const string& s) {
    int i = 0, j = s.size() - 1;
    while (i < j) {
        if (s[i] != s[j]) return isPal(s, i + 1, j) || isPal(s, i, j - 1);
        ++i; --j;
    }
    return true;
}

// 2) longest palindromic substring + count of palindromic substrings, O(n^2)
pair<string, long long> palindromeScan(const string& s) {
    int n = s.size(), bestL = 0, bestLen = n ? 1 : 0;
    long long total = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            ++total;
            if (r - l + 1 > bestLen) { bestLen = r - l + 1; bestL = l; }
            --l; ++r;
        }
    };
    for (int c = 0; c < n; ++c) { expand(c, c); expand(c, c + 1); }
    return {s.substr(bestL, bestLen), total};
}

// 3) minimum insertions to make s a palindrome = n - LPS
int minInsertions(const string& s) {
    int n = s.size();
    vector<vector<int>> lps(n, vector<int>(n, 0));
    for (int i = 0; i < n; ++i) lps[i][i] = 1;
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            lps[l][r] = (s[l] == s[r]) ? lps[l+1][r-1] + 2
                                       : max(lps[l+1][r], lps[l][r-1]);
        }
    return n - lps[0][n-1];
}

// 4) can the characters be rearranged into a palindrome?
bool canPermutePalindrome(const string& s) {
    int mask = 0;
    for (char c : s) mask ^= 1 << (c - 'a');
    return (mask & (mask - 1)) == 0;              // zero or one bit set
}

int main() {
    cout << validAfterOneDeletion("abca") << '\\n';         // 1
    auto [best, total] = palindromeScan("babad");
    cout << best << ' ' << total << '\\n';                  // bab 5
    cout << minInsertions("abcd") << '\\n';                 // 3
    cout << canPermutePalindrome("aabbc") << '\\n';         // 1
}
\`\`\`
`,
};

export default topic;
