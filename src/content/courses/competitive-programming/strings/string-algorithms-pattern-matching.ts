import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-algorithms-pattern-matching",
  title: "String Algorithms / Pattern Matching",
  description: "Choosing between KMP, Z, hashing, Aho-Corasick, suffix arrays and automata.",
  readingTime: 9,
  content: `

# String Algorithms / Pattern Matching

## Theory

A map of the main string algorithms and when each one is the right tool.

### Single pattern in a text

| Algorithm | Time | Notes |
|---|---|---|
| Naive | O(n·m) | fine for tiny inputs |
| **KMP** | O(n+m) | prefix function; also gives borders/periods |
| **Z-function** | O(n+m) | simplest to code once you know it |
| **Rabin–Karp** | O(n+m) avg | hashing; easy to extend to 2D |
| Boyer–Moore / \`std::search\` | sublinear avg | rarely needed in contests |

### Many patterns at once

**Aho–Corasick** = trie of all patterns + BFS-built **failure links** (the KMP idea on a trie). Feed the text once and every occurrence of every pattern is reported.

- Build: O(Σ|patterns| · Σ)
- Query: O(|text| + occurrences)
- Uses: dictionary filtering, forbidden-substring DP, counting pattern hits.

### Full-text structures

| Structure | Build | Answers |
|---|---|---|
| **Suffix array** + LCP (Kasai) | O(n log n) | pattern search O(m log n), distinct substrings, longest repeated/common substring |
| **Suffix automaton** | O(n) | occurrence counts, number of distinct substrings, k-th substring, LCS of two strings |
| **Suffix tree** | O(n) | same, harder to code |
| **Eertree** | O(n) | all distinct palindromic substrings |

Number of distinct substrings from a suffix array: \`n(n+1)/2 - Σ LCP\`.

### Deciding quickly

- One pattern, need speed and simplicity → **Z-function**.
- Need borders, periods, or a DFA for DP → **KMP / automaton**.
- Substring equality/LCP queries everywhere → **hashing**.
- Many patterns → **Aho–Corasick**.
- Distinct substrings, ranking, longest repeated → **suffix array or suffix automaton**.
- Palindromes → **Manacher** (or Eertree).

### Traps

- Overflow-based hashing (mod 2^64) is breakable; use a random base and a prime modulus.
- Forgetting the separator when concatenating pattern and text.
- Off-by-one when mapping transformed indices back (Manacher, suffix arrays).
- Aho–Corasick output links: without them you miss patterns that are suffixes of other patterns.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// ---------- Aho-Corasick: find all patterns in a text ----------
struct AhoCorasick {
    struct Node {
        array<int,26> nxt;
        int fail = 0;
        vector<int> out;                 // pattern ids ending here
        Node() { nxt.fill(-1); }
    };
    vector<Node> t{1};

    void add(const string& s, int id) {
        int v = 0;
        for (char c : s) {
            int i = c - 'a';
            if (t[v].nxt[i] == -1) { t[v].nxt[i] = t.size(); t.emplace_back(); }
            v = t[v].nxt[i];
        }
        t[v].out.push_back(id);
    }
    void build() {
        queue<int> q;
        for (int c = 0; c < 26; ++c) {
            if (t[0].nxt[c] == -1) t[0].nxt[c] = 0;
            else { t[t[0].nxt[c]].fail = 0; q.push(t[0].nxt[c]); }
        }
        while (!q.empty()) {
            int v = q.front(); q.pop();
            // merge output links so suffix patterns are not missed
            const auto& fo = t[t[v].fail].out;
            t[v].out.insert(t[v].out.end(), fo.begin(), fo.end());
            for (int c = 0; c < 26; ++c) {
                int u = t[v].nxt[c];
                if (u == -1) t[v].nxt[c] = t[t[v].fail].nxt[c];
                else { t[u].fail = t[t[v].fail].nxt[c]; q.push(u); }
            }
        }
    }
    // (position, pattern id) for every occurrence end
    vector<pair<int,int>> search(const string& text) {
        vector<pair<int,int>> res;
        int v = 0;
        for (int i = 0; i < (int)text.size(); ++i) {
            v = t[v].nxt[text[i] - 'a'];
            for (int id : t[v].out) res.push_back({i, id});
        }
        return res;
    }
};

// ---------- suffix array (O(n log^2 n)) + Kasai LCP ----------
vector<int> suffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rnk(n), tmp(n);
    for (int i = 0; i < n; ++i) { sa[i] = i; rnk[i] = s[i]; }
    for (int k = 1; ; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rnk[a] != rnk[b]) return rnk[a] < rnk[b];
            int ra = a + k < n ? rnk[a + k] : -1;
            int rb = b + k < n ? rnk[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; ++i) tmp[sa[i]] = tmp[sa[i-1]] + cmp(sa[i-1], sa[i]);
        rnk = tmp;
        if (rnk[sa[n-1]] == n - 1) break;
    }
    return sa;
}
vector<int> kasai(const string& s, const vector<int>& sa) {
    int n = s.size();
    vector<int> rnk(n), lcp(n ? n - 1 : 0);
    for (int i = 0; i < n; ++i) rnk[sa[i]] = i;
    int k = 0;
    for (int i = 0; i < n; ++i) {
        if (rnk[i] == n - 1) { k = 0; continue; }
        int j = sa[rnk[i] + 1];
        while (i + k < n && j + k < n && s[i + k] == s[j + k]) ++k;
        lcp[rnk[i]] = k;
        if (k) --k;
    }
    return lcp;
}

int main() {
    AhoCorasick ac;
    vector<string> pats = {"he", "she", "his", "hers"};
    for (int i = 0; i < (int)pats.size(); ++i) ac.add(pats[i], i);
    ac.build();
    for (auto [pos, id] : ac.search("ushers"))
        cout << pats[id] << " ends at " << pos << '\\n';   // she@3, he@3, hers@5

    string s = "banana";
    auto sa = suffixArray(s);
    auto lcp = kasai(s, sa);
    for (int i : sa) cout << s.substr(i) << '\\n';
    long long n = s.size(), distinct = n * (n + 1) / 2;
    for (int v : lcp) distinct -= v;
    cout << "distinct substrings = " << distinct << '\\n';  // 15
}
\`\`\`
`,
};

export default topic;
