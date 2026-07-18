import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bubble-sort",
  title: "Bubble Sort",
  description: "Repeatedly swap adjacent out-of-order pairs.",
  readingTime: 3,
  content: `
# Bubble Sort

## Theory

**Bubble sort** repeatedly walks the array, swapping each pair of adjacent elements that are out of order. After each full pass, the largest remaining element "bubbles" to its final position.

- Time: **O(n^2)** average and worst, **O(n)** best (already sorted, with the early-exit flag).
- Space: **O(1)**.
- **Stable**.
- Almost never used in practice — mostly educational.

### Optimisation

If a pass performs no swaps, the array is sorted; stop early.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void bubbleSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (a[j] > a[j + 1]) { swap(a[j], a[j + 1]); swapped = true; }
        }
        if (!swapped) break;                     // already sorted
    }
}

int main() {
    vector<int> a = {5, 1, 4, 2, 8};
    bubbleSort(a);
    for (int x : a) cout << x << ' ';           // 1 2 4 5 8
}
\`\`\`
`,
};

export default topic;
