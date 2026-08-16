import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "suffix-tree",
  title: "Suffix Tree",
  description: "A compressed trie of all suffixes of a string, built in linear time via Ukkonen's algorithm, unifying many string queries.",
  readingTime: 13,
  content: `
# Suffix Tree

## Theory

### What it is
A **suffix tree** for string s (length n) is a compressed (radix) trie containing all suffixes of s as root-to-leaf paths, where each edge is labeled with a substring (represented by index ranges into s, not copied characters, to keep it O(n) space) and every internal node has at least two children. Because it merges shared prefixes, it has only O(n) nodes and edges despite representing O(n^2) substrings, using edge-range compression (each edge stores a pointer/range \`[l, r)\` into s rather than the actual substring text).

### Why it's powerful
A suffix tree makes explicit the entire substring structure of s: every substring of s corresponds to a unique position along some path from the root (either ending exactly at a node or partway along an edge). This lets you answer an enormous range of string queries, often in time proportional to the query size, independent of n, after linear preprocessing:
- Substring existence check: O(|pattern|) by walking down from root.
- Longest repeated substring: deepest internal node (by string depth).
- Longest common substring of two strings: build a **generalized suffix tree** over both (with distinct terminal markers), then find the deepest node whose subtree contains leaves from both strings.
- Counting distinct substrings: sum of edge lengths (string-depth differences) over all edges.
- Number of occurrences of a substring: number of leaves in the subtree reached by walking that substring's path (leaves correspond to suffix starting positions).

### Core idea: Ukkonen's algorithm
Building a suffix tree naively by inserting each suffix independently is O(n^2). **Ukkonen's algorithm** builds it online, processing s left to right, maintaining an implicit suffix tree after each character and extending it to the next in **amortized O(1)** per character (using suffix links between internal nodes, the "active point" technique to remember where the next insertion should happen, and the "rule 3 stops early" and "trick 2 -- once a leaf, always a leaf" optimizations for extension). Overall construction is O(n) for a fixed/small alphabet (or O(n log alphabet) with balanced structures for edge child lookup on large alphabets).

Because Ukkonen's algorithm is notoriously intricate to implement correctly under contest time pressure, **in competitive programming, a suffix automaton (SAM) or suffix array + LCP array combo is usually preferred** since they achieve equivalent power (SAM's suffix-link tree is essentially isomorphic in information content to a compressed suffix tree, and SA+LCP gives most needed queries) with dramatically simpler and more robust implementations.

### Key observations
- A suffix tree and a suffix automaton's link tree are closely related: the SAM's parent/link tree is (loosely) the "reverse" structural dual capturing endpos classes, while the suffix tree directly encodes substring paths. Many problems solvable with a suffix tree are equally solvable with SAM or SA+LCP+RMQ, and those are the standard contest tools.
- Building a **generalized suffix tree** (for multiple strings) requires appending distinct sentinel/terminal characters to each string (smaller than all alphabet characters and distinct from each other) so that no suffix is a prefix of another, ensuring every suffix path ends at a distinct leaf.
- Suffix trees support O(1) LCA-based LCP queries between arbitrary suffixes once augmented with LCA preprocessing (Euler tour + sparse table), because LCP(suffix i, suffix j) = string-depth of LCA(leaf_i, leaf_j).
- In contests, if a suffix tree's power is needed, most people build a suffix array + LCP array and treat "virtual suffix tree" nodes as LCP-array ranges, which achieves the same asymptotic complexity with a far simpler implementation (this technique is sometimes called "suffix array plus LCP as an implicit suffix tree").

### Complexity
- Ukkonen's construction: O(n) time and space (small/fixed alphabet); O(n log|alphabet|) with map-based children for large alphabets.
- Substring search: O(|pattern|) time (independent of n).
- LCS / LRS / distinct substrings: O(n) after construction.

### When to use
- Theoretical foundation and for problems explicitly demanding suffix-tree structure or when you need genuine tree-shaped substring/edge relationships (rare in practice compared to SA/SAM).
- In practice: prefer **suffix array + LCP array** (simpler O(n log n) or O(n log^2 n) construction) or **suffix automaton** (simplest O(n) online construction) to solve the same class of problems in contests; understand suffix trees mainly to reason about correctness and to recognize when a problem statement is "secretly" a suffix-tree problem solvable via those substitutes.

### Small example
s = "banana$" (with terminal $). Suffix tree has leaves for "banana$", "anana$", "nana$", "ana$", "na$", "a$", "$", with internal nodes merging the "a"/"ana" shared prefixes ("a" appears with branches to "na" and "$" and to deeper "na" occurrences) and "na" shared prefixes, compressing repeated structure into O(n) nodes total.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Ukkonen's algorithm for online suffix tree construction.
// Edges are represented with [start, end) ranges into the text (end is a shared pointer
// for "open" leaf edges that grow automatically as more characters are appended).
struct SuffixTree {
    struct Node {
        map<char, int> children;   // child edges keyed by first character
        int start, *end;           // edge label = text[start, *end)
        int suffixLink = -1;
        Node(int s, int *e) : start(s), end(e) {}
    };

    string text;
    vector<Node> nodes;
    int root;
    // active point state used during construction
    int activeNode, activeEdge, activeLength;
    int remainingSuffixCount;
    int leafEnd;
    int *rootEnd;
    vector<int*> heapEnds; // manage life-time of dynamically allocated "end" pointers

    SuffixTree(const string &s) : text(s) {
        rootEnd = new int(-1);
        heapEnds.push_back(rootEnd);
        nodes.emplace_back(-1, rootEnd);
        root = 0;
        activeNode = root;
        activeEdge = -1;
        activeLength = 0;
        remainingSuffixCount = 0;
        leafEnd = -1;
        for (int i = 0; i < (int)text.size(); i++) extend(i);
    }

    ~SuffixTree() {
        for (int *p : heapEnds) delete p;
    }

    int edgeLength(int nodeIdx) {
        return *(nodes[nodeIdx].end) - nodes[nodeIdx].start + 1;
    }

    void extend(int pos) {
        leafEnd = pos;
        remainingSuffixCount++;
        int lastNewNode = -1;

        while (remainingSuffixCount > 0) {
            if (activeLength == 0) activeEdge = pos;

            char edgeChar = text[activeEdge];
            if (nodes[activeNode].children.find(edgeChar) == nodes[activeNode].children.end()) {
                // Rule 2: no outgoing edge starting with this character -> create new leaf
                int *newEnd = new int(pos);
                heapEnds.push_back(newEnd);
                nodes.emplace_back(pos, newEnd);
                nodes[activeNode].children[edgeChar] = (int)nodes.size() - 1;

                if (lastNewNode != -1) {
                    nodes[lastNewNode].suffixLink = activeNode;
                    lastNewNode = -1;
                }
            } else {
                int nextNode = nodes[activeNode].children[edgeChar];
                int elen = edgeLength(nextNode);
                if (activeLength >= elen) {
                    // walk down the edge
                    activeEdge += elen;
                    activeLength -= elen;
                    activeNode = nextNode;
                    continue;
                }
                if (text[nodes[nextNode].start + activeLength] == text[pos]) {
                    // Rule 3: character already present on the edge, extension is implicit
                    if (lastNewNode != -1 && activeNode != root) {
                        nodes[lastNewNode].suffixLink = activeNode;
                        lastNewNode = -1;
                    }
                    activeLength++;
                    break;
                }
                // Rule 2 (split): character mismatches partway along an edge, split it
                int *splitEnd = new int(nodes[nextNode].start + activeLength - 1);
                heapEnds.push_back(splitEnd);
                nodes.emplace_back(nodes[nextNode].start, splitEnd);
                int splitNode = (int)nodes.size() - 1;
                nodes[activeNode].children[edgeChar] = splitNode;

                int *leafEndPtr = new int(pos);
                heapEnds.push_back(leafEndPtr);
                nodes.emplace_back(pos, leafEndPtr);
                nodes[splitNode].children[text[pos]] = (int)nodes.size() - 1;

                nodes[nextNode].start += activeLength;
                nodes[splitNode].children[text[nodes[nextNode].start]] = nextNode;

                if (lastNewNode != -1) nodes[lastNewNode].suffixLink = splitNode;
                lastNewNode = splitNode;
            }

            remainingSuffixCount--;
            if (activeNode == root && activeLength > 0) {
                activeLength--;
                activeEdge = pos - remainingSuffixCount + 1;
            } else if (activeNode != root) {
                activeNode = nodes[activeNode].suffixLink != -1 ? nodes[activeNode].suffixLink : root;
            }
        }
    }

    // Check if pattern occurs as a substring by walking down from root.
    bool contains(const string &pattern) {
        int cur = root, i = 0;
        int n = (int)pattern.size();
        while (i < n) {
            char c = pattern[i];
            auto it = nodes[cur].children.find(c);
            if (it == nodes[cur].children.end()) return false;
            int child = it->second;
            int start = nodes[child].start;
            int len = edgeLength(child);
            int j = 0;
            while (j < len && i < n) {
                if (text[start + j] != pattern[i]) return false;
                j++; i++;
            }
            cur = child;
        }
        return true;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    s += '$'; // sentinel ensures every suffix ends at a distinct leaf

    SuffixTree st(s);

    string pattern;
    cin >> pattern;
    cout << "Contains \\"" << pattern << "\\"? " << (st.contains(pattern) ? "yes" : "no") << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
