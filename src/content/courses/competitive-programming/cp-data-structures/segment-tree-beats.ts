import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "segment-tree-beats",
  title: "Segment Tree Beats",
  description: "Segment tree technique for range chmin/chmax updates with amortized O(log^2 n) using extra per-node metadata.",
  readingTime: 9,
  content: `

# Segment Tree Beats

## Theory

**Segment Tree Beats** (Ji Driver's technique) handles range updates like \`chmin(l, r, x)\` ("set every element in [l,r] to min(a[i], x)") that are **not naturally compatible** with simple lazy propagation, by tracking extra per-node metadata — the **maximum**, **second-maximum**, and **count of maximum** — and pruning recursion smartly so the amortized complexity stays O(log^2 n) (or O(log^3 n) in some variants) despite looking like it should be O(n) per update.

### Core idea

For range chmin: each node stores \`max1\` (max value), \`max2\` (largest value strictly less than max1), and \`cnt\` (how many elements equal max1). To apply \`chmin(x)\` to a node:

- if \`x >= max1\`: no-op, prune immediately.
- if \`max2 < x < max1\`: only the \`cnt\` elements equal to \`max1\` change (to \`x\`) — apply directly to this node (update sum, set new max1 = x, tag it as a pending chmin), **no recursion needed**.
- if \`x <= max2\`: can't resolve at this node — recurse into both children, push down first.

### Why it works (amortized analysis)

Define a potential function based on the number of distinct "max-value groups" across the tree. Each recursive descent into the "x <= max2" case strictly reduces this potential (merges/eliminates a distinct value), so despite occasional O(n) worst case appearance, the amortized cost over the whole operation sequence is **O((n + q) log^2 n)**. The full proof is subtle but the practical takeaway is: it works and is fast in practice for chmin/chmax with sum queries.

### Key observations

- Supports: range chmin, range chmax, range add, range sum query, range max query — the full "Segment Tree Beats" combo used in the classic problem set.
- Requires careful node merging (combine max1/max2/cnt from children) and lazy push-down handling multiple tag types (add tag + chmin tag interacting).
- Much more intricate to implement correctly than standard lazy segment trees — battle-test with brute force on small cases.
- Complexity: O((n + q) log^2 n) amortized time, O(n) memory.

### When to use

- Problems requiring range chmin/chmax combined with range sum or range add, where a plain lazy segment tree cannot represent the update compactly (chmin is not a simple linear function of the stored value).
- Recognizable from statements like "assign a[i] = min(a[i], x) for i in [l,r]; also support range add and range sum query."

### Small example

Array \`[1,5,3,7,2]\`, chmin(0,4,4): elements > 4 are 5 and 7, brought down to 4 -> \`[1,4,3,4,2]\`. Segment Tree Beats achieves this update while keeping O(log^2 n) amortized time instead of scanning all elements.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll NEG_INF = LLONG_MIN;

struct SegTreeBeats {
    int n;
    vector<ll> sum, max1, max2;
    vector<int> cnt;         // count of elements equal to max1
    vector<ll> addTag;       // pending "add" lazy (applied to whole node)

    explicit SegTreeBeats(const vector<ll>& a) {
        n = (int)a.size();
        sum.assign(4 * n, 0); max1.assign(4 * n, 0); max2.assign(4 * n, NEG_INF);
        cnt.assign(4 * n, 0); addTag.assign(4 * n, 0);
        build(1, 0, n - 1, a);
    }

    void build(int node, int l, int r, const vector<ll>& a) {
        if (l == r) { sum[node] = max1[node] = a[l]; max2[node] = NEG_INF; cnt[node] = 1; return; }
        int mid = (l + r) / 2;
        build(2 * node, l, mid, a);
        build(2 * node + 1, mid + 1, r, a);
        pull(node);
    }

    void pull(int node) {
        int lc = 2 * node, rc = 2 * node + 1;
        sum[node] = sum[lc] + sum[rc];
        if (max1[lc] == max1[rc]) {
            max1[node] = max1[lc]; cnt[node] = cnt[lc] + cnt[rc];
            max2[node] = max(max2[lc], max2[rc]);
        } else if (max1[lc] > max1[rc]) {
            max1[node] = max1[lc]; cnt[node] = cnt[lc];
            max2[node] = max(max2[lc], max1[rc]);
        } else {
            max1[node] = max1[rc]; cnt[node] = cnt[rc];
            max2[node] = max(max1[lc], max2[rc]);
        }
    }

    void applyAdd(int node, int l, int r, ll delta) {
        sum[node] += delta * (r - l + 1);
        max1[node] += delta;
        if (max2[node] != NEG_INF) max2[node] += delta;
        addTag[node] += delta;
    }
    void applyChmin(int node, ll x) {
        if (x >= max1[node]) return;                 // no effect
        sum[node] -= (ll)cnt[node] * (max1[node] - x);
        max1[node] = x;
    }

    void pushDown(int node, int l, int r) {
        int mid = (l + r) / 2, lc = 2 * node, rc = 2 * node + 1;
        if (addTag[node]) {
            applyAdd(lc, l, mid, addTag[node]);
            applyAdd(rc, mid + 1, r, addTag[node]);
            addTag[node] = 0;
        }
        applyChmin(lc, max1[node]);
        applyChmin(rc, max1[node]);
    }

    void rangeAdd(int node, int l, int r, int ql, int qr, ll delta) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) { applyAdd(node, l, r, delta); return; }
        pushDown(node, l, r);
        int mid = (l + r) / 2;
        rangeAdd(2 * node, l, mid, ql, qr, delta);
        rangeAdd(2 * node + 1, mid + 1, r, ql, qr, delta);
        pull(node);
    }
    void rangeAdd(int l, int r, ll delta) { rangeAdd(1, 0, n - 1, l, r, delta); }

    void rangeChmin(int node, int l, int r, int ql, int qr, ll x) {
        if (qr < l || r < ql || max1[node] <= x) return;      // pruned: no element exceeds x
        if (ql <= l && r <= qr && max2[node] < x) { applyChmin(node, x); return; }
        pushDown(node, l, r);
        int mid = (l + r) / 2;
        rangeChmin(2 * node, l, mid, ql, qr, x);
        rangeChmin(2 * node + 1, mid + 1, r, ql, qr, x);
        pull(node);
    }
    void rangeChmin(int l, int r, ll x) { rangeChmin(1, 0, n - 1, l, r, x); }

    ll querySum(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return sum[node];
        pushDown(node, l, r);
        int mid = (l + r) / 2;
        return querySum(2 * node, l, mid, ql, qr) + querySum(2 * node + 1, mid + 1, r, ql, qr);
    }
    ll querySum(int l, int r) { return querySum(1, 0, n - 1, l, r); }
};

int main() {
    vector<ll> a = {1, 5, 3, 7, 2};
    SegTreeBeats st(a);
    st.rangeChmin(0, 4, 4);              // a -> [1,4,3,4,2]
    cout << st.querySum(0, 4) << '\\n';  // 1+4+3+4+2 = 14
    st.rangeAdd(0, 4, 10);               // a -> [11,14,13,14,12]
    cout << st.querySum(0, 4) << '\\n';  // 64
}
\`\`\`
`,
};

export default topic;
