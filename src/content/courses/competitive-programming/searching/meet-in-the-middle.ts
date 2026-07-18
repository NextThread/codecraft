import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "meet-in-the-middle",
  title: "Meet in the Middle",
  description: "Split an exponential search into two halves and combine.",
  readingTime: 5,
  content: `
# Meet in the Middle

## Theory

**Meet in the Middle (MITM)** turns a brute force \`O(2^n)\` search into \`O(2^(n/2) * log)\` by splitting the input into two halves, enumerating every subset of each half, and combining the results.

Typical setup:

1. Split the \`n\` items into halves \`A\` (size \`n/2\`) and \`B\` (size \`n - n/2\`).
2. Enumerate all \`2^{|A|}\` subset sums of \`A\` into an array; do the same for \`B\`.
3. Sort one array and for each value \`s\` from the other, use binary search to find matching partners.

Works well when \`n <= 40\` (or up to ~45 with careful constants).

### Classic problems

- Subset sum with \`n <= 40\`.
- Number of subsets with sum in \`[L, R]\`.
- 4-SUM: pairs from A vs pairs from B.
- Codeforces "Reading Books" and similar knapsack variants.

### Complexity

- Enumerating each half: \`O(2^(n/2))\`.
- Sorting a half: \`O(2^(n/2) * n)\`.
- Merging with binary search: \`O(2^(n/2) * log)\`.

Total: **O(2^(n/2) * n)** — feasible for \`n = 40\` (~10^6).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Count subsets of a[] whose sum is exactly target using MITM.
long long countSubsetsWithSum(const vector<long long>& a, long long target) {
    int n = a.size();
    int lh = n / 2, rh = n - lh;

    vector<long long> left, right;
    for (int mask = 0; mask < (1 << lh); ++mask) {
        long long s = 0;
        for (int i = 0; i < lh; ++i) if (mask >> i & 1) s += a[i];
        left.push_back(s);
    }
    for (int mask = 0; mask < (1 << rh); ++mask) {
        long long s = 0;
        for (int i = 0; i < rh; ++i) if (mask >> i & 1) s += a[lh + i];
        right.push_back(s);
    }

    sort(right.begin(), right.end());
    long long ans = 0;
    for (long long s : left) {
        long long need = target - s;
        auto lo = lower_bound(right.begin(), right.end(), need);
        auto hi = upper_bound(right.begin(), right.end(), need);
        ans += hi - lo;
    }
    return ans;
}

int main() {
    vector<long long> a = {1, 2, 3, 4, 5};
    cout << countSubsetsWithSum(a, 5) << "\\n"; // 3
}
\`\`\`
`,
};

export default topic;
