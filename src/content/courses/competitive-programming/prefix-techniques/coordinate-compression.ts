import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "coordinate-compression-basic",
  title: "Coordinate Compression (Basic)",
  description: "Shrink large sparse values into a dense 0..k-1 range.",
  readingTime: 4,
  content: `
# Coordinate Compression (Basic)

## Theory

Many algorithms and data structures (Fenwick trees, segment trees, prefix arrays) need values or coordinates to lie in a small range like \`[0, n)\`. **Coordinate compression** maps the actual values — which might be up to \`10^9\` or negative — to their rank in the sorted list of distinct values.

Steps:

1. Copy all values into a vector \`vals\`.
2. Sort and deduplicate: \`sort\` + \`erase(unique(...), end)\`.
3. Replace each value \`x\` by \`lower_bound(vals, x) - vals.begin()\`.

Now the values live in \`[0, k)\` where \`k\` is the number of distinct values — while preserving the original ordering.

- Preprocessing: **O(n log n)**.
- Query (compress a value): **O(log n)**.
- Space: **O(n)**.

### Where it helps

- Fenwick tree over sparse coordinates.
- Offline range problems on huge coordinate systems.
- Counting inversions / smaller-to-the-right using a BIT.
- Sweep line problems on 10^9-sized axes.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {1'000'000, -5, 42, 1'000'000, -5, 7, 42, 7, 7};

    vector<int> vals = a;
    sort(vals.begin(), vals.end());
    vals.erase(unique(vals.begin(), vals.end()), vals.end());

    auto compress = [&](int x) {
        return int(lower_bound(vals.begin(), vals.end(), x) - vals.begin());
    };

    vector<int> b(a.size());
    for (int i = 0; i < (int)a.size(); ++i) b[i] = compress(a[i]);

    for (int x : b) cout << x << ' ';   // 3 0 2 3 0 1 2 1 1
    cout << "\\ndistinct = " << vals.size() << "\\n";
}
\`\`\`
`,
};

export default topic;
