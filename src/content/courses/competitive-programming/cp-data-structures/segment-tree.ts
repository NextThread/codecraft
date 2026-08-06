import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "segment-tree",
  title: "Segment Tree",
  description: "Range queries with point updates on any associative operation.",
  readingTime: 7,
  content: `

# Segment Tree

## Theory

A **segment tree** answers range queries and point updates in **O(log n)** for any *associative* merge operation (sum, min, max, gcd, matrix product, "best subsegment", …).

- Built over an array of size `n`, stored in an array of size `4n` (or `2n` for the iterative version).
- Node `v` covers `[l, r]`; children cover `[l, mid]` and `[mid+1, r]`.
- Build — O(n), query — O(log n), point update — O(log n).

```
                [0,5] sum=36
        [0,2] 9              [3,5] 27
    [0,1]4   [2,2]5     [3,4]16   [5,5]11
 [0,0]1 [1,1]3        [3,3]7 [4,4]9
```

### Compared to a Fenwick tree

| | Fenwick | Segment tree |
|---|---|---|
| Memory | n | 2n–4n |
| Operations | invertible (sum, xor) | any associative merge |
| Code size | tiny | moderate |
| Range updates | needs tricks | natural with lazy propagation |

### Variants

- **Iterative (bottom-up)** — shortest and fastest for point update + range query.
- **Lazy propagation** — range updates (next topic).
- **Merge sort tree / persistent / dynamic (sparse)** segment trees for advanced queries.
- **Descend on the tree** for "first index with value >= x" in O(log n).

### The neutral element

Every merge needs an identity: `0` for sum, `+inf` for min, `-inf` for max, `0` for gcd.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// recursive segment tree for range sum + point assignment
struct SegTree {
    int n;
    vector<long long> t;

    explicit SegTree(const vector<long long>& a) : n(a.size()), t(4 * a.size()) {
        build(1, 0, n - 1, a);
    }
    void build(int v, int l, int r, const vector<long long>& a) {
        if (l == r) { t[v] = a[l]; return; }
        int m = (l + r) / 2;
        build(2*v, l, m, a);
        build(2*v+1, m+1, r, a);
        t[v] = t[2*v] + t[2*v+1];
    }
    // assign a[pos] = value
    void update(int v, int l, int r, int pos, long long value) {
        if (l == r) { t[v] = value; return; }
        int m = (l + r) / 2;
        if (pos <= m) update(2*v, l, m, pos, value);
        else          update(2*v+1, m+1, r, pos, value);
        t[v] = t[2*v] + t[2*v+1];
    }
    long long query(int v, int l, int r, int ql, int qr) const {
        if (qr < l || r < ql) return 0;                  // identity
        if (ql <= l && r <= qr) return t[v];
        int m = (l + r) / 2;
        return query(2*v, l, m, ql, qr) + query(2*v+1, m+1, r, ql, qr);
    }
    void update(int pos, long long value) { update(1, 0, n - 1, pos, value); }
    long long query(int l, int r) const { return query(1, 0, n - 1, l, r); }
};

// iterative min segment tree — compact and fast
struct MinSeg {
    int n;
    vector<int> t;
    explicit MinSeg(const vector<int>& a) : n(a.size()), t(2 * a.size(), INT_MAX) {
        copy(a.begin(), a.end(), t.begin() + n);
        for (int i = n - 1; i > 0; --i) t[i] = min(t[2*i], t[2*i+1]);
    }
    void update(int i, int value) {
        for (t[i += n] = value, i >>= 1; i; i >>= 1)
            t[i] = min(t[2*i], t[2*i+1]);
    }
    int query(int l, int r) const {                      // inclusive
        int res = INT_MAX;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res = min(res, t[l++]);
            if (r & 1) res = min(res, t[--r]);
        }
        return res;
    }
};

int main() {
    vector<long long> a = {1, 3, 5, 7, 9, 11};
    SegTree st(a);
    cout << st.query(1, 3) << '\n';       // 15
    st.update(2, 100);
    cout << st.query(1, 3) << '\n';       // 110

    MinSeg ms({5, 2, 8, 1, 9});
    cout << ms.query(0, 2) << '\n';       // 2
    ms.update(1, 7);
    cout << ms.query(0, 2) << '\n';       // 5
}
```
`,
};

export default topic;
