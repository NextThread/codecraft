import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "trie",
  title: "Trie",
  description: "Prefix tree for strings and the binary trie for XOR queries.",
  readingTime: 6,
  content: `

# Trie

## Theory

A **trie** (prefix tree) stores strings character by character along root-to-node paths. Nodes share common prefixes, so:

- \`insert(word)\` — O(|word|)
- \`search(word)\`, \`startsWith(prefix)\` — O(|word|)
- Memory — O(total characters × alphabet)

\`\`\`
insert "cat", "car", "dog"
        root
       /    \\
      c      d
      a      o
     / \\     g*
    t*  r*
\`\`\`

\`*\` marks a terminal node (\`isEnd\`). Storing a \`count\` per node lets you delete words and count words with a given prefix.

### Implementation styles

- **Array of children** (\`int nxt[26]\`) — fastest; use a flat \`vector<array<int,26>>\` to avoid pointer chasing.
- **Map of children** — memory-friendly for large alphabets.

### Binary trie (XOR trie)

Insert numbers by their bits from the most significant to the least. Then **maximum XOR with a given x** is a greedy walk: at each bit try the opposite branch. O(30) per query.

Uses: maximum XOR pair, maximum XOR subarray (with prefix XOR), count pairs with XOR < k, persistent tries for XOR range queries.

### Other applications

Autocomplete, dictionary matching, Aho–Corasick automaton (trie + failure links), counting distinct prefixes, word-search puzzles.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// lowercase-letter trie with prefix counts
struct Trie {
    struct Node { array<int,26> nxt; int words = 0, prefixes = 0;
                  Node() { nxt.fill(-1); } };
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
    int find(const string& s) const {          // node index or -1
        int v = 0;
        for (char c : s) {
            v = t[v].nxt[c - 'a'];
            if (v == -1) return -1;
        }
        return v;
    }
    bool contains(const string& s) const { int v = find(s); return v != -1 && t[v].words > 0; }
    int countPrefix(const string& p) const { int v = find(p); return v == -1 ? 0 : t[v].prefixes; }
};

// binary trie for maximum XOR queries
struct XorTrie {
    static const int B = 30;
    vector<array<int,2>> t{{-1, -1}};

    void insert(int x) {
        int v = 0;
        for (int b = B; b >= 0; --b) {
            int bit = (x >> b) & 1;
            if (t[v][bit] == -1) { t[v][bit] = t.size(); t.push_back({-1, -1}); }
            v = t[v][bit];
        }
    }
    int maxXor(int x) const {                  // trie must be non-empty
        int v = 0, res = 0;
        for (int b = B; b >= 0; --b) {
            int bit = (x >> b) & 1;
            if (t[v][bit ^ 1] != -1) { res |= 1 << b; v = t[v][bit ^ 1]; }
            else                       v = t[v][bit];
        }
        return res;
    }
};

int main() {
    Trie tr;
    for (string w : {"cat", "car", "cart", "dog"}) tr.insert(w);
    cout << tr.contains("car") << ' ' << tr.contains("ca") << '\\n';   // 1 0
    cout << tr.countPrefix("ca") << '\\n';                             // 3

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
