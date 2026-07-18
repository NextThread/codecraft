import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "heap-sort",
  title: "Heap Sort",
  description: "Sort in place using a binary max-heap.",
  readingTime: 4,
  content: `
# Heap Sort

## Theory

**Heap sort** builds a max-heap from the array, then repeatedly swaps the root (the current maximum) with the last unsorted element and shrinks the heap.

- Time: **O(n log n)** in all cases.
- Space: **O(1)** — sorts in place.
- **Unstable**.
- Guaranteed worst-case \`O(n log n)\` — used as a fallback in introspective sort when quick sort recurses too deep.

### Heap operations

- \`siftDown(i)\`: pushes \`a[i]\` down until the heap property holds. Cost: \`O(log n)\`.
- Building a heap bottom-up is **O(n)**, not \`O(n log n)\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void siftDown(vector<int>& a, int n, int i) {
    while (true) {
        int l = 2 * i + 1, r = 2 * i + 2, best = i;
        if (l < n && a[l] > a[best]) best = l;
        if (r < n && a[r] > a[best]) best = r;
        if (best == i) return;
        swap(a[i], a[best]);
        i = best;
    }
}

void heapSort(vector<int>& a) {
    int n = a.size();
    for (int i = n / 2 - 1; i >= 0; --i) siftDown(a, n, i);   // build heap
    for (int end = n - 1; end > 0; --end) {
        swap(a[0], a[end]);
        siftDown(a, end, 0);
    }
}

int main() {
    vector<int> a = {12, 11, 13, 5, 6, 7};
    heapSort(a);
    for (int x : a) cout << x << ' ';   // 5 6 7 11 12 13
}
\`\`\`
`,
};

export default topic;
