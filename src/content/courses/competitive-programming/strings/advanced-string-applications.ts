import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "advanced-string-applications",
  title: "Advanced String Algorithms & Applications",
  description: "Combining string structures to solve compound competitive programming problems: LCS/LRS of many strings, string DP, minimal rotation, and more.",
  readingTime: 13,
  content: `
# Advanced String Algorithms & Applications

## Theory

### What it is
This topic ties together the string toolkit (hashing, KMP/Z, suffix arrays, suffix automata, Aho-Corasick, palindromic trees) into **compound problem-solving patterns** that show up repeatedly in harder competitive programming problems. Rather than a single algorithm, it is a catalog of techniques for combining structures and doing DP over them.

### Longest common substring of two or more strings
- **Two strings**: concatenate \`s1 + '#' + s2 + '$'\` (distinct separators not in alphabet), build a suffix array + LCP array (or suffix automaton). For each adjacent pair in the SA, if the two suffixes originate from different original strings, their LCP is a candidate common substring length; take the max. With SAM, build the automaton on s1, then feed s2's characters through it while tracking the current match length (reset/extend using suffix links when a character doesn't match), maintaining the best length seen -- O(|s1| + |s2|) total.
- **k strings**: generalized suffix array/automaton over all k strings joined by distinct separators; use a sliding window over the SA (sorted suffixes) to find the smallest window covering suffixes from all k source strings, and take the minimum LCP within that window as a candidate, maximized over all windows (classic "smallest range covering elements from k lists" technique adapted to strings).

### String matching with DP over automaton states
- Problems like "count strings of length L over alphabet that do NOT contain any pattern from a dictionary" are solved by building an Aho-Corasick automaton over the forbidden patterns, marking "bad" states (a state is bad if it or any state reachable via dictionary links is a pattern end), then running a DP: \`dp[i][state]\` = number of ways to build a string of length i ending in Aho-Corasick state \`state\` without ever touching a bad state. Transition: \`dp[i+1][goto(state,c)] += dp[i][state]\` for each character c, skipping transitions into bad states. For very large L, represent the transition as a matrix over states and use **matrix exponentiation** for O(states^3 log L).
- Similarly, "count distinct substrings across many text queries" or "does any of these patterns appear in this text" style problems combine Aho-Corasick with additional bookkeeping (e.g., per-state counts, subtree sums over the automaton's fail-link tree analogous to SAM's endpos propagation).

### Minimal string rotation (Booth's algorithm / SA-based)
Finding the lexicographically smallest rotation of a string s can be solved by:
- **Booth's algorithm**: O(n) direct algorithm using a failure-function-like scan over \`s + s\`.
- **Suffix array approach**: build the suffix array of \`s + s\` (or \`s + '#' + s\`, careful with duplicate handling) and find the smallest index i < n such that SA contains i early and the suffix starting at i doesn't run past position n -- effectively find the first suffix in sorted order whose starting index is < n; that index is the rotation start. O(n log n) with SA construction, simpler to get right than Booth's in some cases.

### Longest palindromic substring, palindrome partitioning DP
- Manacher's algorithm gives O(n) longest palindromic substring / all palindrome radii.
- Combined with a DP over positions (\`dp[i]\` = min cuts to partition \`s[0..i)\` into palindromes), using Manacher/eertree to quickly determine "is s[l..r) a palindrome?" in O(1) (via precomputed radius arrays) turns an O(n^3) or O(n^2) partition DP into O(n^2) or better; further optimizing the DP transition with a monotonic structure or "palindromic tree with series links" can reach O(n log n).

### Key observations
- Compound problems rarely need a "new algorithm" -- they need **the right combination**: pick a structure that gives O(1)/O(log n) answers to the sub-question your DP or greedy needs, then wrap standard techniques (matrix exponentiation, sliding window, two pointers, monotonic stacks) around it.
- Always consider both a **hashing-based approach** (simple, works with high probability, good for quick contest solutions) and a **deterministic structure** (SA/SAM/Aho-Corasick, guaranteed correct, needed if the problem is adversarial or hashing is explicitly insufficient).
- When multiple strings are involved, concatenation with distinct sentinels is the standard trick to reuse single-string structures (SA, SAM, suffix tree) for multi-string problems; just remember to track "which original string does this position belong to" for cross-string queries.
- For automaton + DP over huge lengths, matrix exponentiation over the transition matrix (states x states) is the go-to when L is too large for direct O(L * states) DP.

### Complexity
Varies by combination; typical building blocks: O(n log n) suffix array, O(n) SAM/Aho-Corasick/Eertree/Manacher, O(states^3 log L) matrix exponentiation, O(n) or O(n log n) for most DP layers once O(1)/O(log n) substring queries are available.

### When to use
- Multi-string common substring / distinct substring problems.
- Counting or constructing strings under pattern-avoidance constraints, especially for huge lengths (matrix exponentiation + automaton).
- Palindrome partitioning / counting problems needing fast palindrome queries.
- Any "hard" string problem in a contest's last few slots that clearly needs two or more of: hashing, suffix structures, automaton DP, and careful complexity bookkeeping.

### Small example
Find the longest common substring of "abcde" and "xabcy": concatenate as "abcde#xabcy$", build SA+LCP, scan adjacent SA pairs from different halves, find max LCP = 3 for "abc".

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Example 1: Longest common substring of two strings via suffix automaton built on s1,
// then streaming s2 through it while tracking current match length (O(|s1|+|s2|)).
struct SAMForLCS {
    struct State { int len = 0, link = -1; array<int,26> next; State(){ next.fill(-1);} };
    vector<State> st; int last;
    SAMForLCS() { st.emplace_back(); last = 0; }
    void extend(char c) {
        int ch = c - 'a';
        int cur = (int)st.size(); st.emplace_back(); st[cur].len = st[last].len + 1;
        int p = last;
        while (p != -1 && st[p].next[ch] == -1) { st[p].next[ch] = cur; p = st[p].link; }
        if (p == -1) st[cur].link = 0;
        else {
            int q = st[p].next[ch];
            if (st[p].len + 1 == st[q].len) st[cur].link = q;
            else {
                int clone = (int)st.size(); st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                while (p != -1 && st[p].next[ch] == q) { st[p].next[ch] = clone; p = st[p].link; }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }
    void build(const string &s) { for (char c : s) extend(c); }

    int longestCommonSubstringWith(const string &t) {
        int cur = 0, len = 0, best = 0;
        for (char c : t) {
            int ch = c - 'a';
            while (cur != 0 && st[cur].next[ch] == -1) { cur = st[cur].link; len = st[cur].len; }
            if (st[cur].next[ch] != -1) { cur = st[cur].next[ch]; len++; }
            best = max(best, len);
        }
        return best;
    }
};

// Example 2: Booth's algorithm for lexicographically minimal rotation, O(n).
string minimalRotation(string s) {
    string ss = s + s;
    int n = (int)s.size();
    vector<int> f(2 * n, -1);
    int k = 0;
    for (int j = 1; j < 2 * n; j++) {
        char sj = ss[j];
        int i = f[j - k - 1];
        while (i != -1 && sj != ss[k + i + 1]) {
            if (sj < ss[k + i + 1]) k = j - i - 1;
            i = f[i];
        }
        if (sj != ss[k + i + 1]) {
            if (sj < ss[k]) k = j;
            f[j - k] = -1;
        } else {
            f[j - k] = i + 1;
        }
    }
    return s.substr(k) + s.substr(0, k);
}

// Example 3: Counting strings of length L over {a,b} avoiding pattern "aab", via
// Aho-Corasick automaton + matrix exponentiation for huge L.
struct Matrix {
    int n;
    vector<vector<long long>> a;
    Matrix(int n_) : n(n_), a(n_, vector<long long>(n_, 0)) {}
    static Matrix identity(int n) { Matrix m(n); for (int i=0;i<n;i++) m.a[i][i]=1; return m; }
    Matrix operator*(const Matrix &o) const {
        Matrix r(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++) {
                if (!a[i][k]) continue;
                for (int j = 0; j < n; j++) r.a[i][j] += a[i][k] * o.a[k][j];
            }
        return r;
    }
};
Matrix matPow(Matrix base, long long p) {
    Matrix result = Matrix::identity(base.n);
    while (p > 0) {
        if (p & 1) result = result * base;
        base = base * base;
        p >>= 1;
    }
    return result;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Demo 1: longest common substring
    string s1 = "abcde", s2 = "xabcy";
    SAMForLCS sam; sam.build(s1);
    cout << "LCS length: " << sam.longestCommonSubstringWith(s2) << "\\n";

    // Demo 2: minimal rotation
    string s = "bbaaccaadd";
    cout << "Minimal rotation: " << minimalRotation(s) << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
