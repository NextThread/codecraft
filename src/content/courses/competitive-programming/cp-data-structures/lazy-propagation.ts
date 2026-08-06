import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "lazy-propagation",
  title: "Lazy Propagation",
  description: "Range updates on a segment tree in O(log n).",
  readingTime: 7,
  content: `

# Lazy Propagation

## Theory

A plain segment tree updates one position at a time. To update a whole range in **O(log n)** we store a **pending (lazy) modification** on each node and push it down only when we must descend.

### The three primitives

1. **apply(node, lazyValue, segmentLength)** — modify the node's aggregate as if the update touched its whole segment.
2. **push(node)** — hand the pending value to both children and clear it.
3. **pull(node)** — recompute the node from its children.

A range update stops at every node fully inside \`[ql, qr]\`, marks it, and returns — that is why only O(log n) nodes are ever touched.

### Two common flavours

| Update | Aggregate | Compose lazies |
|--------|-----------|----------------|
| range **add** | sum / min / max | add: \`lz += x\` |
| range **assign** | sum / min / max | assign overwrites: \`lz = x\` |

Mixing add and assign requires an ordered composition (an assign clears a pending add).

### Correctness rules

- Composition must be associative: applying lazies in order must equal applying the composed lazy.
- Never forget to \`push\` before descending, and \`pull\` after returning.
- For \`min\`/\`max\` with range add, \`apply\` is simply \`t[v] += x\` (no length factor); for sums it is \`t[v] += x * len\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// range add + range sum
struct LazySeg {
    int n;
    vector<long long> t, lz;

    explicit LazySeg(const vector<long long>& a) : n(a.size()), t(4*a.size()), lz(4*a.size(), 0) {
        build(1, 0, n - 1, a);
    }
    void build(int v, int l, int r, const vector<long long>& a) {
        if (l == r) { t[v] = a[l]; return; }
        int m = (l + r) / 2;
        build(2*v, l, m, a); build(2*v+1, m+1, r, a);
        t[v] = t[2*v] + t[2*v+1];
    }
    void applyAdd(int v, int len, long long x) {
        t[v] += x * len;
        lz[v] += x;
    }
    void push(int v, int l, int r) {
        if (lz[v] == 0) return;
        int m = (l + r) / 2;
        applyAdd(2*v,   m - l + 1, lz[v]);
        applyAdd(2*v+1, r - m,     lz[v]);
        lz[v] = 0;
    }
    void update(int v, int l, int r, int ql, int qr, long long x) {
        if (qr < l || r < ql) return;
        if (ql <= l && r <= qr) { applyAdd(v, r - l + 1, x); return; }
        push(v, l, r);
        int m = (l + r) / 2;
        update(2*v, l, m, ql, qr, x);
        update(2*v+1, m+1, r, ql, qr, x);
        t[v] = t[2*v] + t[2*v+1];
    }
    long long query(int v, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return t[v];
        push(v, l, r);
        int m = (l + r) / 2;
        return query(2*v, l, m, ql, qr) + query(2*v+1, m+1, r, ql, qr);
    }
    void update(int l, int r, long long x) { update(1, 0, n - 1, l, r, x); }
    long long query(int l, int r) { return query(1, 0, n - 1, l, r); }
};

int main() {
    vector<long long> a = {1, 2, 3, 4, 5};
    LazySeg st(a);
    cout << st.query(0, 4) << '\\n';    // 15
    st.update(1, 3, 10);               // a = 1 12 13 14 5
    cout << st.query(0, 4) << '\\n';    // 45
    cout << st.query(1, 2) << '\\n';    // 25
    st.update(0, 0, -1);
    cout << st.query(0, 1) << '\\n';    // 12
}
\`\`\`
`,
};

export default topic;
