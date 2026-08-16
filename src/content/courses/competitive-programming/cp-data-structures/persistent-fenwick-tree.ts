import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "persistent-fenwick-tree",
  title: "Persistent Fenwick Tree",
  description: "Combining Fenwick-tree query structure with path-copying persistence, or emulating persistence with a Fenwick of persistent structures.",
  readingTime: 7,
  content: `

# Persistent Fenwick Tree

## Theory

A plain Fenwick tree (BIT) is hard to persist directly because each \`add(i, delta)\` touches O(log n) indices scattered across the array (\`i += i & -i\`), and naive path-copying would need to copy the whole array shape each time. There are two practical approaches to get "Fenwick-like" persistence:

1. **Persistent segment tree standing in for a Fenwick tree** — since a Fenwick tree only ever needs prefix sums and point updates, a persistent segment tree (see that topic) already supports this with O(log n) new nodes per update and full version history; in practice this *is* the standard "persistent BIT" used in contests.
2. **"BIT of persistent structures"** (2D persistence) — when you need many independent partial-persistent Fenwick trees indexed by time or by an offline sweep coordinate (e.g. "Fenwick tree over positions, one such tree per version"), you attach a **persistent array of BIT-node values** and only clone the O(log n) touched Fenwick cells for each version, storing each version's array of cell values in a persistent map (or persistent segment tree over the same index domain as the BIT array).

### Core idea (approach 2, explicit)

Treat the BIT's internal array \`bit[1..n]\` itself as an array that needs point updates and point/whole reads, and store *that* array persistently using a persistent segment tree (or persistent array). An update \`add(i, delta)\` still visits the same O(log n) BIT cells \`i, i + (i&-i), ...\`; instead of mutating them in place we create a new persistent-array version where those O(log n) cells are updated (also O(log n) new segment-tree nodes each, so O(log^2 n) new nodes total per BIT update). A query \`prefix(i)\` on version \`v\` reads the O(log n) needed BIT cells from that version's persistent array.

### Why it works

Persistence of an array under point updates costs O(log n) new nodes per update (path copying). Since a Fenwick update touches O(log n) array cells, persisting a Fenwick tree this way costs **O(log^2 n)** new nodes per update and **O(log^2 n)** time per query (each of the O(log n) BIT reads costs O(log n) to fetch from the persistent array).

### Key observations

- In practice, if you only need "prefix sum as of version v" with point updates, a **persistent segment tree is simpler and asymptotically as good** (O(log n) per op) — prefer it unless you specifically need Fenwick's tiny constant factor and are persisting a fixed small number of versions.
- The "BIT storing persistent-structure roots" pattern is more commonly used the other way around: a **Fenwick tree indexed by one dimension whose cells are persistent segment trees indexed by another dimension**, used for offline 2D range queries (e.g. 2D range counting with updates) — a genuinely different and very useful structure.
- Complexity: O(log^2 n) per update/query for direct persistence; O(log n) per update/query if replaced by a persistent segment tree.

### When to use

- You need versioned prefix-sum queries: prefer a **persistent segment tree** for clean O(log n).
- You need a Fenwick tree as a "spine" holding a persistent structure per node for 2D problems ("Fenwick of persistent segment trees") — that's the powerful, common contest pattern.

### Small example

Offline 2D queries "count points with x <= X and y <= Y inserted so far": sweep x, at each x use \`fenwick[x]\` to persist a segment tree over y; \`query(X, Y)\` = read the persistent segment tree version stored at Fenwick position X, then query range \`[0, Y]\` in it, combined via the BIT's O(log n) decomposition over x.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Persistent segment tree building block (point update, prefix/range sum query).
struct PersistentSegTree {
    struct Node { long long sum; int left, right; };
    vector<Node> nodes;
    int n;

    explicit PersistentSegTree(int n) : n(n) { nodes.push_back({0, 0, 0}); }

    int build(int l, int r) {
        if (l == r) { nodes.push_back({0, 0, 0}); return (int)nodes.size() - 1; }
        int mid = (l + r) / 2;
        int lc = build(l, mid), rc = build(mid + 1, r);
        nodes.push_back({0, lc, rc});
        return (int)nodes.size() - 1;
    }

    int update(int prev, int l, int r, int pos, long long delta) {
        if (l == r) { nodes.push_back({nodes[prev].sum + delta, 0, 0}); return (int)nodes.size() - 1; }
        int mid = (l + r) / 2, lc = nodes[prev].left, rc = nodes[prev].right;
        int cur = (int)nodes.size(); nodes.push_back({0, 0, 0});
        if (pos <= mid) lc = update(lc, l, mid, pos, delta); else rc = update(rc, mid + 1, r, pos, delta);
        nodes[cur] = {nodes[lc].sum + nodes[rc].sum, lc, rc};
        return cur;
    }

    long long query(int node, int l, int r, int ql, int qr) const {
        if (node == 0 || qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return nodes[node].sum;
        int mid = (l + r) / 2;
        return query(nodes[node].left, l, mid, ql, qr) + query(nodes[node].right, mid + 1, r, ql, qr);
    }
};

// "Fenwick of persistent segment trees": index x with a BIT, each BIT cell holds one persistent-tree root
// per historical insertion step, enabling 2D offline counting: count of points with x<=X, y<=Y inserted so far.
struct FenwickOfPersistentTrees {
    int n;                       // range of x (1-indexed)
    int yRange;                  // range of y (compressed), 0-indexed size
    vector<vector<int>> roots;   // roots[i] = list of persistent-tree roots for BIT node i, growing over time
    PersistentSegTree pst;

    FenwickOfPersistentTrees(int n, int yRange) : n(n), yRange(yRange), roots(n + 1), pst(yRange) {
        int emptyRoot = pst.build(0, yRange - 1);
        for (int i = 0; i <= n; ++i) roots[i].push_back(emptyRoot);
    }

    void insertPoint(int x, int y) {                 // x is 1-indexed
        for (; x <= n; x += x & -x) roots[x].push_back(pst.update(roots[x].back(), 0, yRange - 1, y, 1));
    }

    long long countPrefix(int x, int y) const {       // points with X<=x, Y<=y inserted so far
        long long res = 0;
        for (; x > 0; x -= x & -x) res += pst.query(roots[x].back(), 0, yRange - 1, 0, y);
        return res;
    }
};

int main() {
    FenwickOfPersistentTrees fpt(5, 5);   // x in [1,5], y compressed to [0,4]
    fpt.insertPoint(2, 1);
    fpt.insertPoint(4, 3);
    fpt.insertPoint(3, 0);
    cout << fpt.countPrefix(4, 3) << '\\n';  // points with x<=4, y<=3: (2,1),(4,3),(3,0) -> 3
    cout << fpt.countPrefix(2, 0) << '\\n';  // x<=2, y<=0 -> 0
}
\`\`\`
`,
};

export default topic;
