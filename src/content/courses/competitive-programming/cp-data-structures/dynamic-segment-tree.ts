import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dynamic-segment-tree",
  title: "Dynamic Segment Tree",
  description: "A segment tree over a huge or unknown value range that allocates nodes lazily, only where data actually exists.",
  readingTime: 7,
  content: `

# Dynamic Segment Tree

## Theory

A **dynamic (a.k.a. "sparse" or "pointer-based") segment tree** represents a segment tree over a very large index range (e.g. \`[0, 1e9]\`) **without allocating O(range) memory up front**. Nodes are created **on demand**, only along paths that are actually touched by an update or query. Children are accessed through pointers/indices that start as "null" and get allocated the first time they're needed.

### Core idea

- Same recursive structure as a normal segment tree (\`[l, r]\` splits at \`mid\`), but instead of a fixed array \`tree[4*n]\`, each node stores explicit \`left\`/\`right\` child pointers (or indices into a dynamically growing vector), initialized to "null".
- On update, when you need to recurse into a child that doesn't exist yet, **allocate it first** (with a neutral/default value), then recurse.
- On query, if a child doesn't exist, its subtree's aggregate is just the identity value (e.g. 0 for sum, -infinity for max) — no need to allocate, just return the identity.

### Why it works

Only O(log(range)) nodes are created per update (one path from root to leaf), so after \`q\` updates you've allocated **O(q log(range))** nodes total, regardless of how large the coordinate range is. Queries that don't touch existing nodes short-circuit immediately using identity values.

### Key observations

- Essential when the value range is huge (e.g. up to 1e9 or 1e18) and coordinate compression isn't possible (e.g. because updates are added online and you don't know all values in advance).
- Supports lazy propagation the same way as a normal segment tree — allocate the lazy-affected children when pushing down.
- Can be made **persistent** simultaneously (persistent dynamic segment tree) — this combo is extremely common for "k-th smallest with values up to 1e9, indices as versions" problems.
- Complexity: O(log(range)) per update/query, O(q log(range)) total memory for q operations, versus O(range) for a static array-backed segment tree.

### When to use

- Value ranges too large to allocate directly (coordinate compression unavailable, e.g. online updates with new values arriving after queries).
- Building a segment tree "over all possible values" (e.g. segment tree over [0, 1e9] indexed by value, for order-statistics operations) without needing every value to appear.

### Small example

Segment tree over \`[0, 1e9]\` with only 3 point updates at positions \`5, 1000000, 999999999\`: only ~3 * log2(1e9) ≈ 90 nodes get allocated total, instead of 4e9 for an array-based tree.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct DynamicSegTree {
    struct Node { long long sum = 0; int left = -1, right = -1; };
    vector<Node> nodes;
    long long lo, hi;      // covered value range [lo, hi]
    int root = -1;

    DynamicSegTree(long long lo, long long hi) : lo(lo), hi(hi) { root = newNode(); }

    int newNode() { nodes.push_back(Node{}); return (int)nodes.size() - 1; }

    void update(int node, long long l, long long r, long long pos, long long delta) {
        nodes[node].sum += delta;
        if (l == r) return;
        long long mid = l + (r - l) / 2;
        if (pos <= mid) {
            if (nodes[node].left == -1) nodes[node].left = newNode();
            update(nodes[node].left, l, mid, pos, delta);
        } else {
            if (nodes[node].right == -1) nodes[node].right = newNode();
            update(nodes[node].right, mid + 1, r, pos, delta);
        }
    }
    void update(long long pos, long long delta) { update(root, lo, hi, pos, delta); }

    long long query(int node, long long l, long long r, long long ql, long long qr) const {
        if (node == -1 || qr < l || r < ql) return 0;      // unallocated subtree = identity (0 for sum)
        if (ql <= l && r <= qr) return nodes[node].sum;
        long long mid = l + (r - l) / 2;
        return query(nodes[node].left, l, mid, ql, qr) + query(nodes[node].right, mid + 1, r, ql, qr);
    }
    long long query(long long ql, long long qr) const { return query(root, lo, hi, ql, qr); }
};

int main() {
    DynamicSegTree seg(0, 1'000'000'000LL);   // huge range, but memory grows only with #updates
    seg.update(5, 3);
    seg.update(1'000'000, 7);
    seg.update(999'999'999LL, 2);

    cout << seg.query(0, 1'000'000) << '\\n';        // 3 + 7 = 10
    cout << seg.query(999'999'998LL, 999'999'999LL) << '\\n'; // 2
    cout << "nodes allocated: " << seg.nodes.size() << '\\n'; // small, ~O(3 * log(range))
}
\`\`\`
`,
};

export default topic;
