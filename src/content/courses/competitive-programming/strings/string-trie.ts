import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-trie",
  title: "Trie",
  description: "Prefix tree for dictionaries and autocomplete, plus the binary XOR trie.",
  readingTime: 7,
  content: `

# Trie

## Theory

A **trie** (prefix tree) stores strings along root-to-node paths, one character per edge. Strings sharing a prefix share the path, so operations cost only the length of the word:

- \`insert(word)\`, \`search(word)\`, \`startsWith(prefix)\` — **O(|word|)**
- memory — O(total characters × alphabet)

\`\`\`
insert "cat", "car", "cart", "dog"
        root
       /    \\
      c      d
      a      o
     / \\     g*
    t*  r*
         \\
          t*
\`\`\`

\`*\` marks a terminal node. Storing per node:

- \`words\` — how many inserted strings end here (supports deletion),
- \`prefixes\` — how many strings pass through (counts words with a prefix).

### Implementation styles

- **Flat array of children** (\`vector<array<int,26>>\`) — fastest, contiguous memory, index-based; the contest default.
- **Map of children** — for large or unknown alphabets.

### Binary (XOR) trie

Insert numbers bit by bit from the most significant bit. Then **maximum XOR with x** is a greedy descent: at each bit prefer the opposite branch. O(30) per query. With subtree counters you can also count pairs with XOR < k, or delete numbers.

### Applications

- Autocomplete, spell check, dictionary counting.
- Maximum XOR pair / maximum XOR subarray (with prefix XOR).
- Aho–Corasick automaton = trie + failure links, for matching many patterns at once.
- Counting distinct prefixes, longest common prefix of a set, word-search puzzles.
- Persistent tries for XOR queries on ranges.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// lowercase trie with word/prefix counters and deletion
struct Trie {
    struct Node {
        array<int,26> nxt;
        int words = 0, prefixes = 0;
        Node() { nxt.fill(-1); }
    };
    vector<Node> t{1};

    void insert(const string& s) {
        int v = 0;
        ++t[v].prefixes;
        for (char c : s) {
            int i = c - 'a';
            if (t[v].nxt[i] == -1) { t[v].nxt[i] = t.size(); t.emplace_back(); }
            v = t[v].nxt[i];
            ++t[v].prefixes;
        }
        ++t[v].words;
    }
    int find(const string& s) const {
        int v = 0;
        for (char c : s) {
            v = t[v].nxt[c - 'a'];
            if (v == -1) return -1;
        }
        return v;
    }
    bool contains(const string& s) const { int v = find(s); return v != -1 && t[v].words > 0; }
    int countPrefix(const string& p) const { int v = find(p); return v == -1 ? 0 : t[v].prefixes; }
    void erase(const string& s) {                 // assumes s was inserted
        int v = 0; --t[v].prefixes;
        for (char c : s) { v = t[v].nxt[c - 'a']; --t[v].prefixes; }
        --t[v].words;
    }
    // longest prefix of s that is an inserted word
    string longestWordPrefix(const string& s) const {
        int v = 0, best = 0;
        for (int i = 0; i < (int)s.size(); ++i) {
            v = t[v].nxt[s[i] - 'a'];
            if (v == -1) break;
            if (t[v].words > 0) best = i + 1;
        }
        return s.substr(0, best);
    }
};

// binary trie for maximum XOR
struct XorTrie {
    static const int B = 30;
    vector<array<int,2>> t{{-1, -1}};
    void insert(int x) {
        int v = 0;
        for (int b = B; b >= 0; --b) {
            int bit = x >> b & 1;
            if (t[v][bit] == -1) { t[v][bit] = t.size(); t.push_back({-1, -1}); }
            v = t[v][bit];
        }
    }
    int maxXor(int x) const {
        int v = 0, res = 0;
        for (int b = B; b >= 0; --b) {
            int bit = x >> b & 1;
            if (t[v][bit ^ 1] != -1) { res |= 1 << b; v = t[v][bit ^ 1]; }
            else v = t[v][bit];
        }
        return res;
    }
};

int main() {
    Trie tr;
    for (string w : {"cat", "car", "cart", "dog"}) tr.insert(w);
    cout << tr.contains("car") << ' ' << tr.contains("ca") << '\\n';   // 1 0
    cout << tr.countPrefix("ca") << '\\n';                             // 3
    cout << tr.longestWordPrefix("cartoon") << '\\n';                  // cart
    tr.erase("car");
    cout << tr.contains("car") << ' ' << tr.countPrefix("ca") << '\\n'; // 0 2

    XorTrie xt;
    vector<int> a = {3, 10, 5, 25, 2, 8};
    int best = 0;
    xt.insert(a[0]);
    for (size_t i = 1; i < a.size(); ++i) { best = max(best, xt.maxXor(a[i])); xt.insert(a[i]); }
    cout << "max XOR pair = " << best << '\\n';                        // 28
}
\`\`\`
`,
};

export default topic;
