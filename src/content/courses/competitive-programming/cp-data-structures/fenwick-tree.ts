import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "fenwick-tree",
  title: "Fenwick Tree (BIT)",
  description: "Binary indexed tree for prefix sums with point updates.",
  readingTime: 6,
  content: `

# Fenwick Tree (BIT)

## Theory

A **Fenwick tree** (Binary Indexed Tree) maintains an array under

- point update \`add(i, delta)\` — **O(log n)**
- prefix query \`sum(1..i)\` — **O(log n)**

with only \`n + 1\` integers of memory and a very small constant — usually faster than a segment tree when only sums are needed.

### The core idea

Index \`i\` (1-based) stores the sum of the \`i & -i\` elements ending at \`i\`. \`i & -i\` isolates the lowest set bit.

\`\`\`
update: i += i & -i     (move to the parent that covers i)
query : i -= i & -i     (jump to the previous disjoint block)
\`\`\`

Range sum: \`sum(l, r) = sum(r) - sum(l - 1)\`.

### Extensions

- **Build in O(n)**: fill \`bit[i] += a[i]\`, then propagate \`bit[i + (i & -i)] += bit[i]\`.
- **Range update + point query**: store differences (\`add(l, v)\`, \`add(r+1, -v)\`), then a prefix sum is the value.
- **Range update + range query**: two BITs.
- **k-th element / lower_bound** in O(log n) by descending over powers of two.
- **2D BIT** for grid prefix sums in O(log² n).

### Uses

Counting inversions, number of smaller elements to the right, dynamic frequency tables, offline queries after coordinate compression.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Fenwick {
    int n;
    vector<long long> bit;
    explicit Fenwick(int n) : n(n), bit(n + 1, 0) {}

    // build from a 0-indexed array in O(n)
    explicit Fenwick(const vector<long long>& a) : n(a.size()), bit(a.size() + 1, 0) {
        for (int i = 1; i <= n; ++i) {
            bit[i] += a[i - 1];
            int j = i + (i & -i);
            if (j <= n) bit[j] += bit[i];
        }
    }

    void add(int i, long long delta) {          // 1-indexed
        for (; i <= n; i += i & -i) bit[i] += delta;
    }
    long long sum(int i) const {                // a[1..i]
        long long s = 0;
        for (; i > 0; i -= i & -i) s += bit[i];
        return s;
    }
    long long sum(int l, int r) const { return sum(r) - sum(l - 1); }

    // smallest idx with prefix sum >= target (requires non-negative values)
    int lowerBound(long long target) const {
        int pos = 0;
        for (int pw = 1 << (31 - __builtin_clz(max(n, 1))); pw; pw >>= 1)
            if (pos + pw <= n && bit[pos + pw] < target) {
                pos += pw;
                target -= bit[pos];
            }
        return pos + 1;
    }
};

int main() {
    vector<long long> a = {1, 3, 5, 7, 9, 11};
    Fenwick fw(a);
    cout << fw.sum(1, 3) << '\\n';        // 9
    fw.add(2, 10);                        // a[2] = 13
    cout << fw.sum(1, 3) << '\\n';        // 19
    cout << fw.sum(6) << '\\n';           // 46
    cout << fw.lowerBound(20) << '\\n';   // first prefix reaching 20

    // counting inversions with a BIT over values
    vector<int> v = {5, 4, 3, 2, 1};
    int maxV = 5;
    Fenwick cnt(maxV);
    long long inv = 0;
    for (int i = (int)v.size() - 1; i >= 0; --i) {
        inv += cnt.sum(v[i] - 1);        // already-seen values smaller than v[i]
        cnt.add(v[i], 1);
    }
    cout << "inversions = " << inv << '\\n';   // 10
}
\`\`\`
`,
};

export default topic;
