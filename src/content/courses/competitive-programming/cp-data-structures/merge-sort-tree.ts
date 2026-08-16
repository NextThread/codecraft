import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "merge-sort-tree",
  title: "Merge Sort Tree",
  description: "A segment tree where each node stores a sorted copy of its range, enabling order-statistics range queries.",
  readingTime: 7,
  content: `

# Merge Sort Tree

## Theory

A **merge sort tree** is a segment tree built like merge sort: each node covering range \`[l, r]\` stores a **sorted vector** of the elements in that range, built by merging its children's sorted vectors (exactly like the merge step of merge sort). This lets you answer questions such as "how many elements in \`[l, r]\` are \`<= x\`?" using **binary search inside each of the O(log n) nodes** that decompose the query range.

### Core idea

- Build: recursively build left/right children, then \`merge\` their sorted vectors into the parent's — this costs O(n log n) total (same as merge sort) and O(n log n) memory (each element appears in O(log n) nodes).
- Query "count of values \`<= x\` in \`[l, r]\`": decompose \`[l, r]\` into O(log n) canonical nodes (like a normal segment tree range query), and in each node's sorted vector do a binary search (\`upper_bound\`) for \`x\`, summing the counts. Total **O(log^2 n)** per query.

### Why it works

Any range query decomposes into O(log n) disjoint canonical segment-tree nodes. Because each node's data is pre-sorted, a rank/count query inside it is O(log(node size)) via binary search, and node sizes are all <= n, so O(log n) per node, O(log^2 n) overall.

### Key observations

- Static structure: no efficient point update (updating one element requires re-sorting O(log n) vectors, each potentially O(n), so updates are expensive) — it's best for **immutable arrays**, or use a Fenwick tree of sorted structures / wavelet tree for update-friendly variants.
- Generalizes to: k-th smallest in a range (binary search on the answer + count query, O(log n * log^2 n)), counting inversions in a range, range median, "count elements in [x, y] within [l, r]".
- Complexity: O(n log n) build/memory, O(log^2 n) query, O(n log n) update-from-scratch (rare, usually avoided).

### When to use

- Offline or static-array problems needing rank queries (count of values in some numeric range) restricted to an index range — a common building block when persistent segment trees over compressed values are overkill or you want simpler code.
- When updates are absent or rare.

### Small example

Array \`[5,2,6,1,3]\`. Root's sorted vector: \`[1,2,3,5,6]\`. Query "count <= 4 in [0,2]" (values 5,2,6): decompose to a node covering [0,2] with sorted vector \`[2,5,6]\`; \`upper_bound(4)\` gives index 1 -> answer 1 (just the 2).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct MergeSortTree {
    int n;
    vector<vector<int>> tree;   // tree[node] = sorted values in that node's range

    explicit MergeSortTree(const vector<int>& a) {
        n = (int)a.size();
        tree.assign(4 * max(n, 1), {});
        if (n) build(1, 0, n - 1, a);
    }

    void build(int node, int l, int r, const vector<int>& a) {
        if (l == r) { tree[node] = {a[l]}; return; }
        int mid = (l + r) / 2;
        build(2 * node, l, mid, a);
        build(2 * node + 1, mid + 1, r, a);
        merge(tree[2 * node].begin(), tree[2 * node].end(),
              tree[2 * node + 1].begin(), tree[2 * node + 1].end(),
              back_inserter(tree[node]));
    }

    // count of elements <= x in [ql, qr]
    int countLE(int node, int l, int r, int ql, int qr, int x) const {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) {
            return (int)(upper_bound(tree[node].begin(), tree[node].end(), x) - tree[node].begin());
        }
        int mid = (l + r) / 2;
        return countLE(2 * node, l, mid, ql, qr, x) + countLE(2 * node + 1, mid + 1, r, ql, qr, x);
    }

    int countLE(int ql, int qr, int x) const { return n ? countLE(1, 0, n - 1, ql, qr, x) : 0; }

    // count of elements within [lo, hi] in range [ql, qr]
    int countRange(int ql, int qr, int lo, int hi) const {
        if (lo > hi) return 0;
        return countLE(ql, qr, hi) - countLE(ql, qr, lo - 1);
    }
};

int main() {
    vector<int> a = {5, 2, 6, 1, 3};
    MergeSortTree tree(a);
    cout << tree.countLE(0, 2, 4) << '\\n';        // values 5,2,6 <= 4 -> just 2 -> 1
    cout << tree.countRange(0, 4, 2, 5) << '\\n';  // values in [2,5] among all 5 -> 2,5,3 -> 3
}
\`\`\`
`,
};

export default topic;
