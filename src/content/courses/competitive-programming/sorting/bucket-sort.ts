import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bucket-sort",
  title: "Bucket Sort",
  description: "Distribute values into buckets, sort each, then concatenate.",
  readingTime: 4,
  content: `
# Bucket Sort

## Theory

**Bucket sort** distributes the input into a fixed number of buckets, sorts each bucket individually (usually with insertion sort or recursively), then concatenates the results.

- Time: **O(n + k)** average when the input is uniformly distributed, **O(n^2)** worst case.
- Space: **O(n + k)**.
- **Stable** when the per-bucket sort is stable.
- Ideal for floating-point numbers uniformly distributed in \`[0, 1)\`.

### Steps

1. Create \`k\` empty buckets.
2. For each value \`x\`, place it into bucket \`floor(k * x)\` (or a similar hash).
3. Sort each bucket.
4. Concatenate the buckets in order.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Bucket sort for floats in [0, 1).
void bucketSort(vector<double>& a) {
    int n = a.size();
    vector<vector<double>> buckets(n);
    for (double x : a) buckets[min((int)(n * x), n - 1)].push_back(x);
    for (auto& b : buckets) sort(b.begin(), b.end());
    int idx = 0;
    for (auto& b : buckets)
        for (double x : b) a[idx++] = x;
}

int main() {
    vector<double> a = {0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51};
    bucketSort(a);
    for (double x : a) cout << x << ' ';
}
\`\`\`
`,
};

export default topic;
