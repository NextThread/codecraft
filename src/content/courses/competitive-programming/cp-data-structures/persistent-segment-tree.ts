import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "persistent-segment-tree",
  title: "Persistent Segment Tree",
  description: "A segment tree that keeps every historical version accessible by only copying the O(log n) nodes that change per update.",
  readingTime: 9,
  content: `

# Persistent Segment Tree

## Theory

A **persistent segment tree** ("functional" segment tree) preserves **all past versions** of the structure after each update, so you can query any historical version, not just the latest one. Instead of mutating nodes in place, each update creates **new nodes only along the path from the root to the changed leaf** (O(log n) nodes), and reuses every other subtree from the previous version.

### Core idea

- A normal segment tree update touches O(log n) nodes on the path from root to leaf. In the persistent version, instead of overwriting them, you allocate **new copies** of those O(log n) nodes; each new node's untouched child pointer still points to the old subtree.
- Each version is identified by its **root pointer**. Version \`v+1\` shares almost the entire tree with version \`v\` — only the O(log n) nodes on the updated path differ.
- Querying version \`v\` just walks down from \`root[v]\` exactly like a normal segment tree query.

### Why it works

Since only the path to one leaf changes, and a tree has depth O(log n), each update allocates O(log n) new nodes, giving **O(n + q log n) total memory** and **O(log n) time per update/query**, versus O(n) memory per version if you naively copied the whole array.

### Key observations

- Supports **point update, range query** persistently (values can also be range-updated with persistent lazy propagation, though trickier).
- The classic application is **"k-th smallest in [l, r]"**: build a persistent segment tree over compressed values, where version \`i\` = version \`i-1\` with the value at index \`i\` incremented. Then \`root[r]\` minus \`root[l-1]\` (using node counts, not tree subtraction) gives the frequency of each value range within \`[l, r]\`, and you can binary-search down the tree ("merge sort tree" style but O(log n) instead of O(log^2 n)).
- Also used for **persistent arrays**, undo functionality, and answering "what did version t look like" queries in general.
- Complexity: O(log n) per update (new nodes), O(log n) per query, O((n + q) log n) total memory.

### When to use

- Need access to historical states of an array/structure (versioned data).
- The classic "count/kth-smallest of values in index range [l,r]" problem via prefix-version subtraction.
- Persistent Trie for max-XOR-in-a-prefix-range problems (same idea applied to a trie).

### Small example

Array \`[0,0,0]\` (frequency counts over compressed values), inserting value at index 2 creates version 1 with only the nodes on the path to leaf "2" duplicated; version 0's structure is untouched and still queryable.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct PersistentSegTree {
    struct Node { int sum; int left, right; };  // left/right are indices into 'nodes', 0 = null
    vector<Node> nodes;
    vector<int> roots;      // roots[v] = root node index of version v
    int n;

    explicit PersistentSegTree(int n) : n(n) {
        nodes.push_back({0, 0, 0});     // nodes[0] = sentinel "null" node (sum 0)
        roots.push_back(build(0, n - 1));
    }

    int build(int l, int r) {
        if (l == r) { nodes.push_back({0, 0, 0}); return (int)nodes.size() - 1; }
        int mid = (l + r) / 2;
        int lc = build(l, mid), rc = build(mid + 1, r);
        nodes.push_back({0, lc, rc});
        return (int)nodes.size() - 1;
    }

    // creates a NEW version = old version with point 'pos' incremented by 'delta'; returns new root
    int update(int prevRoot, int l, int r, int pos, int delta) {
        if (l == r) {
            nodes.push_back({nodes[prevRoot].sum + delta, 0, 0});
            return (int)nodes.size() - 1;
        }
        int mid = (l + r) / 2;
        int lc = nodes[prevRoot].left, rc = nodes[prevRoot].right;
        int newNode = (int)nodes.size();
        nodes.push_back({0, 0, 0});      // placeholder, filled below
        if (pos <= mid) lc = update(lc, l, mid, pos, delta);
        else rc = update(rc, mid + 1, r, pos, delta);
        nodes[newNode] = {nodes[lc].sum + nodes[rc].sum, lc, rc};
        return newNode;
    }

    void addVersion(int pos, int delta) {         // pos: 0-indexed
        roots.push_back(update(roots.back(), 0, n - 1, pos, delta));
    }

    int query(int node, int l, int r, int ql, int qr) const {
        if (qr < l || r < ql || node == 0) return 0;
        if (ql <= l && r <= qr) return nodes[node].sum;
        int mid = (l + r) / 2;
        return query(nodes[node].left, l, mid, ql, qr) + query(nodes[node].right, mid + 1, r, ql, qr);
    }

    int query(int version, int ql, int qr) const { return query(roots[version], 0, n - 1, ql, qr); }
};

int main() {
    // Classic use: k-th smallest in a[l..r] via persistence over compressed values.
    vector<int> a = {5, 2, 6, 1, 3};
    vector<int> sorted_a = a;
    sort(sorted_a.begin(), sorted_a.end());
    sorted_a.erase(unique(sorted_a.begin(), sorted_a.end()), sorted_a.end());
    auto rank = [&](int v) { return (int)(lower_bound(sorted_a.begin(), sorted_a.end(), v) - sorted_a.begin()); };

    int m = (int)sorted_a.size();
    PersistentSegTree pst(m);
    for (int v : a) pst.addVersion(rank(v), 1);   // version i (1-indexed) covers a[0..i-1]

    // k-th smallest in a[l..r] (0-indexed, inclusive): binary search down the tree using version r+1 minus version l
    auto kthSmallest = [&](int l, int r, int k) {
        int lo = pst.roots[l], hi = pst.roots[r + 1];
        int nl = 0, nr = m - 1;
        while (nl != nr) {
            int mid = (nl + nr) / 2;
            int leftCount = pst.nodes[pst.nodes[hi].left].sum - pst.nodes[pst.nodes[lo].left].sum;
            if (leftCount >= k) { hi = pst.nodes[hi].left; lo = pst.nodes[lo].left; nr = mid; }
            else { k -= leftCount; hi = pst.nodes[hi].right; lo = pst.nodes[lo].right; nl = mid + 1; }
        }
        return sorted_a[nl];
    };

    cout << kthSmallest(0, 4, 1) << '\\n';   // smallest in whole array -> 1
    cout << kthSmallest(0, 4, 3) << '\\n';   // 3rd smallest -> 3
    cout << pst.query(3, rank(1), rank(6)) << '\\n'; // frequency count in prefix version 3
}
\`\`\`
`,
};

export default topic;
