import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "difference-array",
  title: "Difference Array",
  description: "Perform many range updates in O(1) each, then recover the array in O(n).",
  readingTime: 4,
  content: `
# Difference Array

## Theory

A **difference array** \`d\` of \`a\` stores \`d[i] = a[i] - a[i - 1]\` (with \`a[-1] = 0\`).

Two facts make it powerful:

1. A **range update** "add \`v\` to \`a[l..r]\`" becomes two point updates: \`d[l] += v; d[r + 1] -= v;\`
2. The original array is recovered by taking a **prefix sum** of \`d\`.

So we can apply \`q\` range updates in \`O(q)\` total and reconstruct the final array in \`O(n)\` — much better than \`O(q * n)\` naive.

### Use cases

- Many offline range increments followed by one final read.
- 2D grid heat maps (using a 2D difference array).
- Detecting the overlap count of intervals (each interval adds \`+1\`).

### Limitation

Doesn't support intermixed point queries during updates efficiently — for that use a Fenwick tree.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 8;
    vector<long long> diff(n + 1, 0);

    auto rangeAdd = [&](int l, int r, long long v) {
        diff[l] += v;
        diff[r + 1] -= v;
    };

    rangeAdd(1, 4, 3);      // +3 to indices 1..4
    rangeAdd(2, 6, 5);      // +5 to indices 2..6
    rangeAdd(0, 7, 1);      // +1 to everything

    vector<long long> a(n);
    long long run = 0;
    for (int i = 0; i < n; ++i) { run += diff[i]; a[i] = run; }
    for (long long x : a) cout << x << ' ';   // 1 4 9 9 9 6 6 1
}
\`\`\`
`,
};

export default topic;
