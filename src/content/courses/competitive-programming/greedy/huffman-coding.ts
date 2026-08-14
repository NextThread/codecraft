import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "huffman-coding",
  title: "Huffman Coding",
  description: "Optimal prefix-free codes by repeatedly merging the two smallest weights.",
  readingTime: 6,
  content: `

# Huffman Coding

## Theory

Given symbols with frequencies, build a **prefix-free** binary code minimising the total encoded length \`sum(freq_i * depth_i)\`.

**Algorithm.** Put every symbol in a min-heap. While more than one node remains: pop the two smallest, create a parent with their summed weight, push it back. The last node is the root; left edge = 0, right edge = 1.

- Complexity **O(n log n)**; O(n) if the frequencies are already sorted (two-queue trick).
- The cost equals the **sum of all internal node weights** — handy when you only need the number, not the tree.
- Optimality follows from an exchange argument: the two rarest symbols can always be placed as deepest siblings.

### Notes and variants

- Codes are not unique; depths are.
- Same algorithm solves "**minimum cost to merge n stones / connect n ropes**".
- **Kraft inequality**: a set of lengths is realisable iff \`sum 2^(-l_i) <= 1\`.
- If all frequencies are equal, Huffman degenerates to a fixed-length code.
- Huffman is optimal among *symbol* codes; arithmetic coding beats it by approaching the entropy bound exactly.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    long long w;
    char ch;
    Node *l = nullptr, *r = nullptr;
    Node(long long w, char ch) : w(w), ch(ch) {}
    Node(Node* a, Node* b) : w(a->w + b->w), ch(0), l(a), r(b) {}
};

void collect(Node* n, string code, map<char,string>& out) {
    if (!n->l && !n->r) { out[n->ch] = code.empty() ? "0" : code; return; }
    collect(n->l, code + '0', out);
    collect(n->r, code + '1', out);
}

map<char,string> huffman(const map<char,long long>& freq) {
    auto cmp = [](Node* a, Node* b){ return a->w > b->w; };
    priority_queue<Node*, vector<Node*>, decltype(cmp)> pq(cmp);
    for (auto [c, f] : freq) pq.push(new Node(f, c));
    while (pq.size() > 1) {
        Node* a = pq.top(); pq.pop();
        Node* b = pq.top(); pq.pop();
        pq.push(new Node(a, b));
    }
    map<char,string> codes;
    collect(pq.top(), "", codes);
    return codes;
}

// cost only: sum of internal node weights (ropes / stones merging)
long long mergeCost(vector<long long> w) {
    priority_queue<long long, vector<long long>, greater<>> pq(w.begin(), w.end());
    long long total = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        total += a + b;
        pq.push(a + b);
    }
    return total;
}

int main() {
    map<char,long long> f = {{'a',45},{'b',13},{'c',12},{'d',16},{'e',9},{'f',5}};
    long long bits = 0;
    for (auto [c, code] : huffman(f)) {
        cout << c << " -> " << code << '\\n';
        bits += (long long)code.size() * f[c];
    }
    cout << "total bits = " << bits << '\\n';       // 224
    cout << mergeCost({4,3,2,6}) << '\\n';          // 29
}
\`\`\`
`,
};

export default topic;
