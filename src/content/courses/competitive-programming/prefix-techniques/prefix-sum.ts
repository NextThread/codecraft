import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prefix-sum",
  title: "Prefix Sum",
  description: "Answer range sum queries in O(1) after O(n) preprocessing.",
  readingTime: 4,
  content: `
# Prefix Sum

## Theory

A **prefix sum** array \`p\` of an array \`a\` (0-indexed) is defined as:

\`\`\`
p[0] = 0
p[i] = a[0] + a[1] + ... + a[i - 1]
\`\`\`

The sum of the subarray \`a[l..r]\` (both inclusive) is then \`p[r + 1] - p[l]\`, answered in **O(1)**.

- Preprocessing: **O(n)**.
- Query: **O(1)**.
- Space: **O(n)**.

### Why 1-indexed \`p\` helps

Using a size-\`n+1\` prefix array with \`p[0] = 0\` removes the special case for \`l = 0\`.

### Applications

- Range sum queries on an immutable array.
- Detecting subarrays with a given sum (with a hash map of prefix sums).
- Counting subarrays with sum divisible by k.
- Building block for 2D prefix sums, difference arrays, and many DPs.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = a.size();
    vector<long long> p(n + 1, 0);
    for (int i = 0; i < n; ++i) p[i + 1] = p[i] + a[i];

    auto rangeSum = [&](int l, int r) { return p[r + 1] - p[l]; };
    cout << rangeSum(1, 4) << "\\n";      // 1+4+1+5 = 11
    cout << rangeSum(0, 7) << "\\n";      // 31

    // Number of subarrays with sum == target.
    long long target = 5, ans = 0;
    unordered_map<long long, long long> cnt{{0, 1}};
    for (int i = 0; i < n; ++i) {
        ans += cnt[p[i + 1] - target];
        ++cnt[p[i + 1]];
    }
    cout << ans << "\\n";
}
\`\`\`
`,
};

export default topic;
