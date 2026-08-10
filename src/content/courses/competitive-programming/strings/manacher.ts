import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "manacher",
  title: "Manacher's Algorithm",
  description: "All palindromic radii in O(n): longest palindromic substring and counting.",
  readingTime: 7,
  content: `

# Manacher's Algorithm

## Theory

Manacher computes, for **every centre**, the radius of the longest palindrome centred there — in **O(n)** total.

Two arrays:

- \`d1[i]\` — number of odd-length palindromes centred at \`i\` (radius including the centre); the palindrome is \`s[i-d1[i]+1 .. i+d1[i]-1]\`, length \`2·d1[i]-1\`.
- \`d2[i]\` — number of even-length palindromes centred between \`i-1\` and \`i\`; length \`2·d2[i]\`.

### Why it is linear

We keep the rightmost palindrome found so far, \`[l, r]\`. For a new centre \`i < r\`, the mirror centre \`j = l + r - i\` already tells us a lower bound on the radius:

\`\`\`
k = min(d1[j], r - i + 1)
\`\`\`

then we extend naively. Every naive extension pushes \`r\` to the right, and \`r\` only ever moves right, so the total extension work is O(n).

### Unified transform

A common alternative inserts separators:

\`\`\`
"abba"  ->  "#a#b#b#a#"
\`\`\`

Now every palindrome is odd-length and a single array suffices; radii in the transformed string map back with \`len = radius - 1\`.

### What it gives you

| Task | From Manacher |
|---|---|
| Longest palindromic substring | max of \`2·d1[i]-1\` and \`2·d2[i]\` |
| Count all palindromic substrings | \`Σ d1[i] + Σ d2[i]\` |
| Is \`s[l..r]\` a palindrome? | check the centre's radius reaches \`l\`/\`r\` |
| Count palindromes of each length | radii + difference array |
| Split into palindromic pieces | feed radii into a DP |

Compared to hashing (O(n log n) with binary search) Manacher is exact and faster, but only handles palindromes.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// d1: odd radii, d2: even radii
pair<vector<int>, vector<int>> manacher(const string& s) {
    int n = s.size();
    vector<int> d1(n), d2(n);

    for (int i = 0, l = 0, r = -1; i < n; ++i) {
        int k = (i > r) ? 1 : min(d1[l + r - i], r - i + 1);
        while (i - k >= 0 && i + k < n && s[i - k] == s[i + k]) ++k;
        d1[i] = k--;
        if (i + k > r) { l = i - k; r = i + k; }
    }
    for (int i = 0, l = 0, r = -1; i < n; ++i) {
        int k = (i > r) ? 0 : min(d2[l + r - i + 1], r - i + 1);
        while (i - k - 1 >= 0 && i + k < n && s[i - k - 1] == s[i + k]) ++k;
        d2[i] = k--;
        if (i + k > r) { l = i - k - 1; r = i + k; }
    }
    return {d1, d2};
}

// longest palindromic substring
string longestPalindrome(const string& s) {
    auto [d1, d2] = manacher(s);
    int bestLen = 0, bestL = 0;
    for (int i = 0; i < (int)s.size(); ++i) {
        if (2 * d1[i] - 1 > bestLen) { bestLen = 2 * d1[i] - 1; bestL = i - d1[i] + 1; }
        if (2 * d2[i] > bestLen)     { bestLen = 2 * d2[i];     bestL = i - d2[i]; }
    }
    return s.substr(bestL, bestLen);
}

// number of palindromic substrings
long long countPalindromicSubstrings(const string& s) {
    auto [d1, d2] = manacher(s);
    long long total = 0;
    for (size_t i = 0; i < s.size(); ++i) total += d1[i] + d2[i];
    return total;
}

// O(1) palindrome queries after O(n) preprocessing
struct PalQuery {
    vector<int> d1, d2;
    explicit PalQuery(const string& s) { tie(d1, d2) = manacher(s); }
    bool isPal(int l, int r) const {
        int len = r - l + 1, c = (l + r) / 2;
        return (len & 1) ? d1[c] >= (len + 1) / 2 : d2[c + 1] >= len / 2;
    }
};

int main() {
    cout << longestPalindrome("forgeeksskeegfor") << '\\n';   // geeksskeeg
    cout << countPalindromicSubstrings("aaa") << '\\n';       // 6
    PalQuery q("abacaba");
    cout << q.isPal(0, 6) << ' ' << q.isPal(1, 3) << ' ' << q.isPal(0, 1) << '\\n'; // 1 1 0
}
\`\`\`
`,
};

export default topic;
