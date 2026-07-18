import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "quick-sort",
  title: "Quick Sort",
  description: "Partition around a pivot and recurse — fastest in practice.",
  readingTime: 4,
  content: `
# Quick Sort

## Theory

**Quick sort** picks a **pivot**, partitions the array so that everything smaller sits left and everything larger sits right, then recurses on both sides.

- Time: **O(n log n)** average, **O(n^2)** worst case (bad pivots).
- Space: **O(log n)** average call stack.
- **Unstable**.
- In practice the fastest general-purpose comparison sort — cache-friendly with in-place partitioning.

### Pivot strategies

- Last element (simple but O(n^2) on sorted input).
- Random element (expected O(n log n)).
- Median of three (very good in practice).
- Introspective sort switches to heap sort when recursion gets too deep — this is what \`std::sort\` uses.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int partition(vector<int>& a, int lo, int hi) {
    int pivot = a[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; ++j)
        if (a[j] <= pivot) swap(a[++i], a[j]);
    swap(a[i + 1], a[hi]);
    return i + 1;
}

void quickSort(vector<int>& a, int lo, int hi) {
    if (lo >= hi) return;
    // Randomise pivot to avoid worst case on sorted input.
    swap(a[hi], a[lo + rand() % (hi - lo + 1)]);
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
}

int main() {
    vector<int> a = {10, 7, 8, 9, 1, 5};
    quickSort(a, 0, a.size() - 1);
    for (int x : a) cout << x << ' ';   // 1 5 7 8 9 10
}
\`\`\`
`,
};

export default topic;
