import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "z-function",
  title: "Z-function",
  description: "Z-array in O(n): pattern matching, distinct substrings and period detection.",
  readingTime: 7,
  content: `

# Z-function

## Theory

For a string \`s\` of length \`n\`, \`z[i]\` is the length of the longest common prefix of \`s\` and the suffix starting at \`i\`. By convention \`z[0] = 0\` (or \`n\`).

\`\`\`
s = a a b a a b a a a
z = 0 1 0 6 1 0 2 1 0     (z[0] left as 0)
\`\`\`

### The O(n) algorithm

Maintain the rightmost **z-box** \`[l, r)\` — a segment that equals a prefix of \`s\`.

\`\`\`
for i = 1..n-1:
    if i < r: z[i] = min(r - i, z[i - l])      // reuse previous work
    while i + z[i] < n and s[z[i]] == s[i + z[i]]: ++z[i]
    if i + z[i] > r: l = i, r = i + z[i]
\`\`\`

\`r\` never moves left and the inner \`while\` advances it, so total work is O(n).

### Pattern matching

Run the Z-function on \`pattern + '#' + text\` (with \`#\` not appearing in either). Every \`i\` with \`z[i] == |pattern|\` gives an occurrence at \`i - |pattern| - 1\` in the text. **O(n + m)**.

### Other applications

| Task | Recipe |
|---|---|
| Number of distinct substrings | add characters one at a time; each new character adds \`n - max z\` of the reversed string |
| Smallest period | smallest \`p\` with \`p + z[p] == n\` (or \`n % p == 0\` for a full repetition) |
| Count occurrences of each prefix | z-values grouped by length |
| Compare suffixes / lexicographic smallest rotation | z on \`s + s\` |
| String compression | smallest \`p\` dividing \`n\` with \`z[p] == n - p\` |

### Z vs prefix function

They carry the same information and convert into each other in O(n). Use whichever is more natural: Z for "how far does the prefix extend from here", pi for automata and borders.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Z-function in O(n)
vector<int> zFunction(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    for (int i = 1, l = 0, r = 0; i < n; ++i) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) ++z[i];
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// all occurrences of pat inside txt
vector<int> zSearch(const string& txt, const string& pat) {
    string s = pat + '\\x01' + txt;
    vector<int> z = zFunction(s), res;
    int m = pat.size();
    for (size_t i = m + 1; i < s.size(); ++i)
        if (z[i] >= m) res.push_back(i - m - 1);
    return res;
}

// smallest period of s (n % period == 0 means s is a full repetition)
int smallestPeriodZ(const string& s) {
    int n = s.size();
    vector<int> z = zFunction(s);
    for (int p = 1; p <= n; ++p)
        if (p + z[p % n == 0 ? p % n : p] >= n || (p < n && p + z[p] == n)) {
            if (n % p == 0) return p;
        }
    return n;
}

// number of distinct substrings, O(n^2)
long long distinctSubstrings(const string& s) {
    int n = s.size();
    long long total = 0;
    string cur;
    for (int i = 0; i < n; ++i) {
        cur = s[i] + cur;                                  // grow to the left
        vector<int> z = zFunction(cur);
        int mx = 0;
        for (int v : z) mx = max(mx, v);
        total += cur.size() - mx;
    }
    return total;
}

// lexicographically smallest rotation using z on s+s
string smallestRotation(const string& s) {
    string d = s + s;
    int n = s.size(), best = 0;
    for (int i = 1; i < n; ++i) {
        int a = best, b = i;
        while (b - i < n && d[a] == d[b]) { ++a; ++b; }
        if (b - i < n && d[b] < d[a]) best = i;
    }
    return d.substr(best, n);
}

int main() {
    for (int x : zFunction("aabaabaaa")) cout << x << ' ';
    cout << '\\n';                                       // 0 1 0 6 1 0 2 1 0

    for (int p : zSearch("aaaaa", "aa")) cout << p << ' ';
    cout << '\\n';                                       // 0 1 2 3

    cout << smallestPeriodZ("abcabcabc") << '\\n';        // 3
    cout << distinctSubstrings("ababa") << '\\n';         // 9
    cout << smallestRotation("bcdaa") << '\\n';           // aabcd
}
\`\`\`
`,
};

export default topic;
