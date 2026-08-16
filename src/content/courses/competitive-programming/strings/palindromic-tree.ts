import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "palindromic-tree",
  title: "Palindromic Tree (Eertree)",
  description: "A structure representing every distinct palindromic substring of a string exactly once, built online in linear time.",
  readingTime: 11,
  content: `
# Palindromic Tree (Eertree)

## Theory

### What it is
The **palindromic tree** (a.k.a. **eertree**, "eer" = reverse of "ree" for tree, playing on palindrome symmetry) is a data structure that stores every **distinct palindromic substring** of a string s exactly once as a node, built incrementally in O(n) (amortized) time. Unlike Manacher's algorithm, which finds palindrome lengths at each center but doesn't give you a structured way to explore all distinct palindromes or their suffix-palindrome relationships, the eertree explicitly builds a tree of palindromes connected by "palindromic suffix links," enabling direct answers to counting/enumeration questions.

### Core idea
Every palindromic substring, when you strip its two outermost matching characters, yields another (shorter) palindrome that is a suffix of it (and a prefix, by symmetry) -- unless it has length 0 or 1. This recursive shrinking structure is exactly a tree. The eertree maintains:
- Two roots: an **imaginary root of length -1** (its "palindrome" doesn't really exist but conceptually represents "even before the string starts," used to bootstrap length-1 palindromes) and a **root of length 0** (empty string).
- Each node stores: length of the palindrome, a **suffix link** to the longest proper palindromic suffix of it that's also a node (dropping its outer characters until a valid shorter or equal-class palindrome is found), and transition edges for each character c meaning "if we prepend/append c to this palindrome, we reach this other palindrome node."

### Online construction
Process s character by character, maintaining a pointer `last` to the node of the longest palindromic suffix of the string processed so far. For each new character c at position i:
1. Starting from `last`, walk up suffix links until finding a node X such that `s[i - len[X] - 1] == c` (i.e., prepending c to X's palindrome, viewed as extending symmetric around the new character, forms a valid new palindrome ending at i). The special -1-length root always satisfies this trivially (bootstraps length-1 palindromes).
2. If X already has a transition on c, that's the palindrome ending at i (no new node needed); update `last` and continue.
3. Otherwise create a new node Y with `len[Y] = len[X] + 2`, add transition `X --c--> Y`.
4. Compute Y's suffix link: if `len[Y] == 1`, link to the root of length 0; otherwise walk up suffix links from X's suffix link similarly to find the correct shorter palindromic suffix and use its transition on c (or the length-0/length-(-1) root if none).
5. Update `last = Y`.

Because the depth of suffix-link walking is amortized O(1) per character (bounded by the fact that each new palindrome's suffix-link depth compared to the previous longest suffix palindrome changes by a controlled amount, similar in spirit to the Z-function/KMP amortized analysis), total construction is O(n) (for fixed/small alphabet with array transitions, or O(n log alphabet) with map-based transitions).

### Key observations
- A string of length n has at most n+1 distinct palindromic substrings (the eertree size is O(n): at most n new palindrome nodes, plus the two auxiliary roots) -- a nontrivial but true classical fact (each new character adds at most one new distinct palindrome).
- Each node can track a count field to count occurrences of that palindrome as a substring (increment count when the node is "current longest palindromic suffix" at some position, then propagate/sum counts down the suffix-link tree in reverse order after processing, similar to SAM's endpos propagation).
- Very useful for palindrome-heavy DP problems: e.g., "minimum number of palindromic substrings to partition a string" combined with a DP over positions where eertree gives you, at each position, all distinct palindromic suffixes ending there in O(1) amortized via suffix-link chain (though the chain itself can be O(n) long in the worst case per position unless you use additional "series-link" optimizations for problems needing per-position enumeration of ALL palindromic suffixes efficiently).
- The two-root trick with lengths -1 and 0 elegantly handles both odd-length palindromes (grown from the length-0 root, single center character) and even-length palindromes (an artifact of the length -1 root allowing "virtual" extension).

### Complexity
- Construction: O(n) amortized (array transitions) or O(n log alphabet) (map transitions).
- Number of distinct palindromic substrings: number of real nodes (excluding the two roots).
- Total occurrences of all palindromes (sum over all palindromic substrings of their occurrence counts): O(n) to compute via suffix-link tree propagation after construction.

### When to use
- Counting distinct palindromic substrings.
- Counting occurrences of each palindromic substring, or the most frequent palindrome.
- Palindrome partition DP (minimum cuts into palindromes, counting palindromic partitions) where transitions benefit from directly enumerating palindromic suffixes.
- Any problem fundamentally about the structure/relationships of palindromic substrings, as an alternative or complement to Manacher's algorithm (which gives lengths but not this rich substructure).

### Small example
s = "aabaa". Distinct palindromes found while building: "a", "aa", "aba", "aabaa", "b" -- 5 distinct palindromic substrings total, each represented by exactly one eertree node (plus the two roots).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const int ALPHA = 26;

struct PalindromicTree {
    struct Node {
        array<int, ALPHA> next;
        int len;
        int link;
        long long count = 0; // occurrences of this palindrome, filled after full build
        Node(int l) : len(l), link(0) { next.fill(0); }
    };

    vector<Node> tree;
    string s;
    int last;

    // node 0 = root of length -1, node 1 = root of length 0
    PalindromicTree() {
        tree.emplace_back(-1);
        tree.emplace_back(0);
        tree[0].link = 0;
        tree[1].link = 0;
        last = 1;
    }

    int getSuffixLink(int x, int i) {
        // walk up suffix links from x until s[i - len[x] - 1] == s[i], i.e. can extend with s[i]
        while (i - tree[x].len - 1 < 0 || s[i - tree[x].len - 1] != s[i]) {
            x = tree[x].link;
        }
        return x;
    }

    void addChar(char c) {
        s += c;
        int i = (int)s.size() - 1;
        int ch = c - 'a';

        int x = getSuffixLink(last, i);

        if (tree[x].next[ch] != 0) {
            // palindrome already exists, just move "last" there and count occurrence
            last = tree[x].next[ch];
            tree[last].count++;
            return;
        }

        // create a new palindrome node
        int newLen = tree[x].len + 2;
        tree.emplace_back(newLen);
        int y = (int)tree.size() - 1;
        tree[x].next[ch] = y;

        if (newLen == 1) {
            tree[y].link = 1; // single character palindromes link to empty-string root
        } else {
            int suf = getSuffixLink(tree[x].link, i);
            tree[y].link = tree[suf].next[ch];
        }

        tree[y].count = 1;
        last = y;
    }

    void build(const string &str) {
        for (char c : str) addChar(c);
        propagateCounts();
    }

    // Sum occurrence counts down the suffix-link tree: each palindrome's total occurrence
    // count includes occurrences of it as a suffix-palindrome of longer ones counted at "last".
    void propagateCounts() {
        vector<int> order(tree.size());
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return tree[a].len > tree[b].len; });
        for (int v : order) {
            if (v >= 2) tree[tree[v].link].count += tree[v].count;
        }
    }

    long long distinctPalindromes() const {
        return (long long)tree.size() - 2; // exclude the two auxiliary roots
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;

    PalindromicTree pt;
    pt.build(s);

    cout << "Distinct palindromic substrings: " << pt.distinctPalindromes() << "\\n";

    long long totalOccurrences = 0;
    for (int i = 2; i < (int)pt.tree.size(); i++) totalOccurrences += pt.tree[i].count;
    cout << "Total palindromic substring occurrences: " << totalOccurrences << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
