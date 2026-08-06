import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sparse-table",
  title: "Sparse Table",
  description: "O(1) idempotent range queries on a static array.",
  readingTime: 6,
  content: `

# Sparse Table

## Theory

For a **static** array (no updates), a sparse table answers range queries extremely fast:

- Build: **O(n log n)** time and memory
- Query: **O(1)** for *idempotent* operations (min, max, gcd, and, or), **O(log n)** for others (sum)

### Construction

`table[k][i]` = answer for the segment `[i, i + 2^k - 1]`.

```
table[0][i] = a[i]
table[k][i] = merge(table[k-1][i], table[k-1][i + 2^(k-1)])
```

### O(1) query (idempotent merge)

Let `k = floor(log2(r - l + 1))`. The two blocks `[l, l+2^k-1]` and `[r-2^k+1, r]` cover `[l, r]` and may overlap — harmless for min/max/gcd because overlapping does not change the result.

```cpp
answer = merge(table[k][l], table[k][r - (1 << k) + 1]);
```

For sums, overlap breaks the answer, so you must use disjoint blocks → O(log n) per query.

### When to use what

| Need | Structure |
|------|-----------|
| static min/max/gcd, many queries | **sparse table**, O(1) |
| updates required | segment tree / Fenwick |
| range sum only | prefix sums |
| O(n) build, O(1) RMQ | sparse table + blocks (or Cartesian tree + LCA) |

Also the standard tool for **LCA via Euler tour + RMQ** and for binary lifting tables.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct SparseTable {
    vector<vector<int>> t;
    vector<int> lg;

    explicit SparseTable(const vector<int>& a) {
        int n = a.size();
        lg.assign(n + 1, 0);
        for (int i = 2; i <= n; ++i) lg[i] = lg[i / 2] + 1;
        int K = lg[n] + 1;
        t.assign(K, vector<int>(n));
        t[0] = a;
        for (int k = 1; k < K; ++k)
            for (int i = 0; i + (1 << k) <= n; ++i)
                t[k][i] = min(t[k-1][i], t[k-1][i + (1 << (k-1))]);
    }
    // O(1) range minimum, inclusive bounds
    int queryMin(int l, int r) const {
        int k = lg[r - l + 1];
        return min(t[k][l], t[k][r - (1 << k) + 1]);
    }
};

// gcd works too (idempotent enough: gcd(x,x)=x)
struct SparseGcd {
    vector<vector<long long>> t;
    vector<int> lg;
    explicit SparseGcd(const vector<long long>& a) {
        int n = a.size();
        lg.assign(n + 1, 0);
        for (int i = 2; i <= n; ++i) lg[i] = lg[i/2] + 1;
        t.assign(lg[n] + 1, vector<long long>(n));
        t[0] = a;
        for (int k = 1; k < (int)t.size(); ++k)
            for (int i = 0; i + (1 << k) <= n; ++i)
                t[k][i] = gcd(t[k-1][i], t[k-1][i + (1 << (k-1))]);
    }
    long long query(int l, int r) const {
        int k = lg[r - l + 1];
        return gcd(t[k][l], t[k][r - (1 << k) + 1]);
    }
};

int main() {
    vector<int> a = {5, 2, 4, 7, 1, 9, 3};
    SparseTable sp(a);
    cout << sp.queryMin(0, 3) << '\n';    // 2
    cout << sp.queryMin(3, 6) << '\n';    // 1
    cout << sp.queryMin(5, 5) << '\n';    // 9

    SparseGcd sg({12, 18, 24, 9});
    cout << sg.query(0, 2) << '\n';       // 6
    cout << sg.query(2, 3) << '\n';       // 3
}
```
`,
};

export default topic;
