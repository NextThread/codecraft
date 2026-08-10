import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prefix-function-kmp",
  title: "Prefix Function / KMP",
  description: "The pi array, KMP pattern matching, borders, periods and automaton.",
  readingTime: 9,
  content: `

# Prefix Function / KMP

## Theory

The **prefix function** \`pi[i]\` of a string \`s\` is the length of the longest **proper** prefix of \`s[0..i]\` that is also a suffix of \`s[0..i]\`.

\`\`\`
s  = a b a b c a b a b a
pi = 0 0 1 2 0 1 2 3 4 3
\`\`\`

### Computing pi in O(n)

\`\`\`
pi[0] = 0
for i = 1..n-1:
    j = pi[i-1]
    while j > 0 and s[i] != s[j]: j = pi[j-1]
    if s[i] == s[j]: ++j
    pi[i] = j
\`\`\`

Amortised O(n): \`j\` increases at most n times and each decrease is paid for by a previous increase.

### KMP pattern matching

Build \`pi\` of \`pattern + '#' + text\` (the separator prevents overflow across the boundary). Every position where \`pi\` equals \`|pattern|\` marks an occurrence. **O(n + m)** time, O(n + m) memory — or run the matching loop directly against the text for O(m) memory.

### Borders and periods

- All borders of \`s\` are \`pi[n-1]\`, \`pi[pi[n-1]-1]\`, … — follow the chain.
- The **smallest period** is \`n - pi[n-1]\`; the string is a full repetition of it iff \`n % (n - pi[n-1]) == 0\`.
- Minimum characters to append to make \`s\` a repetition: \`period - n % period\`.

### Counting prefix occurrences

\`cnt[i]\` = number of occurrences of the prefix of length \`i\`:

\`\`\`
for i in 0..n-1: ++cnt[pi[i]]
for i = n down to 1: cnt[pi[i-1]] += cnt[i]
\`\`\`

### Automaton

\`aut[state][c]\` (state = matched length) turns KMP into an O(1)-per-character DFA — needed for DP over "text avoiding a pattern" problems. Build in O(n·Σ).

### Related uses

- Shortest palindrome by prepending: \`pi\` of \`s + '#' + reverse(s)\`.
- Counting distinct borders, string compression, cyclic-shift equality.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// prefix function
vector<int> prefixFunction(const string& s) {
    int n = s.size();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; ++i) {
        int j = pi[i-1];
        while (j > 0 && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) ++j;
        pi[i] = j;
    }
    return pi;
}

// all occurrences of pat in txt (0-indexed starts)
vector<int> kmpSearch(const string& txt, const string& pat) {
    vector<int> res;
    if (pat.empty()) return res;
    vector<int> pi = prefixFunction(pat);
    int j = 0;
    for (int i = 0; i < (int)txt.size(); ++i) {
        while (j > 0 && txt[i] != pat[j]) j = pi[j-1];
        if (txt[i] == pat[j]) ++j;
        if (j == (int)pat.size()) { res.push_back(i - j + 1); j = pi[j-1]; }
    }
    return res;
}

// smallest period; s is a full repetition iff n % period == 0
int smallestPeriod(const string& s) {
    vector<int> pi = prefixFunction(s);
    return s.size() - pi.back();
}

// all borders, longest first
vector<int> borders(const string& s) {
    vector<int> pi = prefixFunction(s), b;
    for (int k = pi.back(); k > 0; k = pi[k-1]) b.push_back(k);
    return b;
}

// occurrences of every prefix inside s
vector<int> prefixOccurrences(const string& s) {
    int n = s.size();
    vector<int> pi = prefixFunction(s), cnt(n + 1, 0);
    for (int i = 0; i < n; ++i) ++cnt[pi[i]];
    for (int i = n; i > 0; --i) cnt[pi[i-1]] += cnt[i];
    for (int i = 0; i <= n; ++i) ++cnt[i];        // each prefix occurs as itself
    return cnt;
}

// KMP automaton over 'a'..'z'
vector<array<int,26>> automaton(const string& pat) {
    int n = pat.size();
    vector<int> pi = prefixFunction(pat);
    vector<array<int,26>> aut(n + 1);
    for (int state = 0; state <= n; ++state)
        for (int c = 0; c < 26; ++c) {
            if (state < n && c == pat[state] - 'a') aut[state][c] = state + 1;
            else aut[state][c] = state ? aut[pi[state-1]][c] : 0;
        }
    return aut;
}

int main() {
    for (int x : prefixFunction("ababcababa")) cout << x << ' ';
    cout << '\\n';                                     // 0 0 1 2 0 1 2 3 4 3

    for (int p : kmpSearch("ababababa", "aba")) cout << p << ' ';
    cout << '\\n';                                     // 0 2 4 6

    cout << smallestPeriod("abcabcabc") << '\\n';       // 3
    for (int b : borders("aabaaab")) cout << b << ' ';
    cout << '\\n';                                     // 2 1

    auto aut = automaton("aba");
    cout << aut[2]['a' - 'a'] << '\\n';                 // 3
}
\`\`\`
`,
};

export default topic;
