import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "suffix-automaton",
  title: "Suffix Automaton",
  description: "A minimal DFA recognizing exactly all substrings of a string, built online in linear time.",
  readingTime: 13,
  content: `
# Suffix Automaton

## Theory

### What it is
The **suffix automaton (SAM)** of a string s is the smallest deterministic finite automaton (DFA) that accepts exactly the set of all suffixes of s reversed in transition structure... more precisely: it is the minimal DFA whose set of paths from the initial state spell out exactly the set of **all substrings** of s. Despite s having O(n^2) distinct substrings in the worst case, SAM has only O(n) states and O(n) transitions (edges), because it cleverly groups substrings sharing the same set of ending positions ("endpos" equivalence classes) into a single state.

### Core idea: endpos equivalence
For a substring t of s, define \`endpos(t)\` = set of ending positions (indices) in s where t occurs. Two substrings with the same endpos set are considered equivalent, and SAM merges each equivalence class into a single **state**. Key facts:
- All substrings within one endpos-class form a contiguous range of lengths, and they are all suffixes of each other (the longest one's suffixes down to some minimum length).
- Each state has a **link** (analogous to a suffix link) pointing to the state for the endpos-class of the string obtained by dropping the class's shortest string's first character, forming a tree structure (the **suffix link tree** / **parent tree**), rooted at the initial state.
- \`len[state]\` = length of the longest string in that state's class; \`len[link[state]] + 1\` to \`len[state]\` is the range of lengths in that class.

### Online construction
SAM is built by processing s one character at a time, maintaining a "last" pointer to the state for the whole prefix processed so far. Adding character c:
1. Create new state \`cur\` with \`len[cur] = len[last] + 1\`.
2. Walk up from \`last\` via suffix links (call the walking pointer p) while p has no transition on c: add transition \`p --c--> cur\`.
3. If p becomes -1 (no more links, reached "before start"), set \`link[cur] = initial state\`.
4. Else let q = transition of p on c. If \`len[q] == len[p] + 1\`, set \`link[cur] = q\` (q's class already fits perfectly).
5. Else we must **clone** q into a new state \`clone\` with the same transitions and link as q but \`len[clone] = len[p] + 1\`; redirect the chain of transitions that pointed to q (from p upward via suffix links) to point to \`clone\` instead; set \`link[q] = link[cur] = clone\`.
6. Update \`last = cur\`.

Each step is amortized O(1) transitions to redirect (careful analysis via potential function), giving overall **O(n)** (or O(n log alphabet) / O(n * alphabet) depending on transition storage, e.g. array vs map) construction time.

### Key observations
- SAM has at most 2n-1 states and 3n-4 transitions for a string of length n (n >= 2).
- Every substring of s corresponds to exactly one path from the initial state; the string is a substring iff that path exists -- so substring existence check is O(|pattern|) by just walking transitions.
- The suffix link tree encodes endpos-class containment: parent's endpos set is a superset of child's. This tree is central to many applications (e.g., computing endpos-set sizes = number of occurrences of a substring, via subtree sums, since each original prefix's terminal state marks an actual suffix occurrence, and endpos-size = number of terminal-marked states in the subtree).
- Number of occurrences of substring corresponding to a state = size of subtree in suffix link tree rooted there, counting states that are "clone-free" endpoints of original prefixes (mark states created directly during processing, not clones, propagate counts upward via tree DP in link-tree order, e.g. topologically by len or via DFS/BFS).
- Concatenating SAM with a generalized construction (resetting "last" appropriately, or building over multiple strings with a common automaton and separators) supports multi-string problems: longest common substring, k distinct strings' common substrings, etc.

### Complexity
- Construction: O(n) amortized time (with transition arrays sized to alphabet, O(n*alphabet) memory) or O(n log alphabet) time/O(n) memory with map-based transitions.
- Substring check: O(|pattern|).
- Counting occurrences: O(n) preprocessing (subtree sums on link tree) then O(1) per state query.
- Distinct substrings count: sum over states of (len[state] - len[link[state]]).

### When to use
- Whenever you need to reason about **all substrings** of a string compactly: counting distinct substrings, finding the k-th lexicographically smallest substring, longest common substring of two (or more) strings, counting occurrences of each substring, string matching, minimal string rotation, and many "hard" string DP problems where suffix array + LCP is more cumbersome.
- SAM is generally preferred over suffix trees in competitive programming because it's simpler to implement online and directly gives you a DFA to traverse.

### Small example
s = "aba" builds a SAM with states for "", "a", "ab", "aba", "b", "ba" grouped by endpos. Distinct substrings = sum(len[v] - len[link[v]]) over all states except initial = 5 ("a","ab","aba","b","ba" -- note "a" appears twice in s but counted once as distinct substring).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const int ALPHA = 26;

struct SuffixAutomaton {
    struct State {
        int len = 0;
        int link = -1;
        array<int, ALPHA> next;
        long long cnt = 0; // number of occurrences (endpos set size), computed after build
        State() { next.fill(-1); }
    };

    vector<State> st;
    int last;

    SuffixAutomaton() {
        st.emplace_back(); // state 0: initial state, len=0, link=-1
        last = 0;
    }

    void extend(char c) {
        int ch = c - 'a';
        int cur = (int)st.size();
        st.emplace_back();
        st[cur].len = st[last].len + 1;
        st[cur].cnt = 1; // this state corresponds to an actual prefix occurrence

        int p = last;
        while (p != -1 && st[p].next[ch] == -1) {
            st[p].next[ch] = cur;
            p = st[p].link;
        }

        if (p == -1) {
            st[cur].link = 0;
        } else {
            int q = st[p].next[ch];
            if (st[p].len + 1 == st[q].len) {
                st[cur].link = q;
            } else {
                int clone = (int)st.size();
                st.push_back(st[q]);       // copy transitions and link
                st[clone].len = st[p].len + 1;
                st[clone].cnt = 0;         // clone is not an original prefix endpoint
                while (p != -1 && st[p].next[ch] == q) {
                    st[p].next[ch] = clone;
                    p = st[p].link;
                }
                st[q].link = clone;
                st[cur].link = clone;
            }
        }
        last = cur;
    }

    void build(const string &s) {
        for (char c : s) extend(c);
        computeOccurrenceCounts();
    }

    // Propagate cnt (number of occurrences) up the suffix-link tree: parent gets sum of children.
    void computeOccurrenceCounts() {
        int n = (int)st.size();
        vector<int> order(n);
        iota(order.begin(), order.end(), 0);
        // sort states by len descending so we process children before parents
        sort(order.begin(), order.end(), [&](int a, int b) { return st[a].len > st[b].len; });
        for (int v : order) {
            if (st[v].link != -1) st[st[v].link].cnt += st[v].cnt;
        }
    }

    // Check if pattern p is a substring of s: walk transitions from state 0.
    bool contains(const string &p) {
        int cur = 0;
        for (char c : p) {
            int ch = c - 'a';
            if (st[cur].next[ch] == -1) return false;
            cur = st[cur].next[ch];
        }
        return true;
    }

    // Number of occurrences of pattern p in s (0 if not present).
    long long countOccurrences(const string &p) {
        int cur = 0;
        for (char c : p) {
            int ch = c - 'a';
            if (st[cur].next[ch] == -1) return 0;
            cur = st[cur].next[ch];
        }
        return st[cur].cnt;
    }

    // Number of distinct substrings of s.
    long long countDistinctSubstrings() {
        long long total = 0;
        for (int v = 1; v < (int)st.size(); v++) {
            total += st[v].len - st[st[v].link].len;
        }
        return total;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;

    SuffixAutomaton sam;
    sam.build(s);

    cout << "Distinct substrings: " << sam.countDistinctSubstrings() << "\\n";

    string pattern;
    cin >> pattern;
    cout << "Contains \\"" << pattern << "\\"? " << (sam.contains(pattern) ? "yes" : "no") << "\\n";
    cout << "Occurrences: " << sam.countOccurrences(pattern) << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
