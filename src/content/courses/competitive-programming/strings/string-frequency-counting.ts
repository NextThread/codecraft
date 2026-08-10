import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-frequency-counting",
  title: "Frequency / Counting",
  description: "Character counts, anagrams, prefix frequency tables and sliding-window counting.",
  readingTime: 7,
  content: `

# Frequency / Counting

## Theory

Most "easy" string problems reduce to **counting characters**. Because the alphabet is tiny, a fixed array beats any hash map.

\`\`\`cpp
array<int,26> cnt{};
for (char c : s) ++cnt[c - 'a'];
\`\`\`

Use \`array<int,128>\` (or 256) when the input may contain digits, spaces or mixed case.

### Anagram checks

Two strings are anagrams iff their frequency arrays are equal — O(n) instead of O(n log n) sorting. Group anagrams by using the sorted string (or the 26-count tuple) as a map key.

### Prefix frequency table

\`f[i][c]\` = occurrences of \`c\` in \`s[0..i-1]\`:

\`\`\`
count(c in s[l..r]) = f[r+1][c] - f[l][c]      // O(1) per query
\`\`\`

Build in O(n·26). This answers range anagram queries, "can s[l..r] be rearranged into a palindrome?" (at most one odd count), and range character counts.

### Sliding window with counts

Keep a window frequency array plus a counter of how many distinct requirements are satisfied:

- longest substring with **at most k distinct** characters,
- smallest window containing all characters of \`t\`,
- longest substring without repeating characters,
- count substrings with exactly k distinct = \`atMost(k) - atMost(k-1)\`.

Each character enters and leaves the window once → **O(n)**.

### Bitmask counting

When only parity matters (palindromic permutations), compress the 26 counts into a 26-bit mask and XOR: prefix masks + a hash map count pairs of equal/one-bit-different masks in O(n).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// 1) anagram check in O(n)
bool isAnagram(const string& a, const string& b) {
    if (a.size() != b.size()) return false;
    array<int,26> c{};
    for (char ch : a) ++c[ch - 'a'];
    for (char ch : b) if (--c[ch - 'a'] < 0) return false;
    return true;
}

// 2) prefix frequency: range counts and range palindrome-permutation test
struct PrefixFreq {
    vector<array<int,26>> f;
    explicit PrefixFreq(const string& s) : f(s.size() + 1) {
        f[0].fill(0);
        for (size_t i = 0; i < s.size(); ++i) {
            f[i+1] = f[i];
            ++f[i+1][s[i] - 'a'];
        }
    }
    int count(int l, int r, char c) const { return f[r+1][c-'a'] - f[l][c-'a']; }
    bool canBePalindrome(int l, int r) const {
        int odd = 0;
        for (int c = 0; c < 26; ++c) odd += (f[r+1][c] - f[l][c]) & 1;
        return odd <= 1;
    }
};

// 3) longest substring with at most k distinct characters
int longestAtMostKDistinct(const string& s, int k) {
    array<int,26> cnt{};
    int distinct = 0, best = 0, l = 0;
    for (int r = 0; r < (int)s.size(); ++r) {
        if (cnt[s[r]-'a']++ == 0) ++distinct;
        while (distinct > k) if (--cnt[s[l++]-'a'] == 0) --distinct;
        best = max(best, r - l + 1);
    }
    return best;
}

// 4) smallest window in s containing all characters of t
string minWindow(const string& s, const string& t) {
    array<int,128> need{}, have{};
    for (char c : t) ++need[(int)c];
    int required = 0;
    for (int c = 0; c < 128; ++c) required += (need[c] > 0);
    int formed = 0, l = 0, bestLen = INT_MAX, bestL = 0;
    for (int r = 0; r < (int)s.size(); ++r) {
        int c = s[r];
        if (++have[c] == need[c]) ++formed;
        while (formed == required) {
            if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
            int d = s[l++];
            if (have[d]-- == need[d]) --formed;
        }
    }
    return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);
}

int main() {
    cout << isAnagram("listen", "silent") << '\\n';        // 1

    PrefixFreq pf("banana");
    cout << pf.count(0, 5, 'a') << '\\n';                  // 3
    cout << pf.canBePalindrome(1, 5) << '\\n';             // anana -> 1

    cout << longestAtMostKDistinct("eceba", 2) << '\\n';   // 3
    cout << minWindow("ADOBECODEBANC", "ABC") << '\\n';    // BANC
}
\`\`\`
`,
};

export default topic;
