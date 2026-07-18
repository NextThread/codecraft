import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "selection-sort",
  title: "Selection Sort",
  description: "Repeatedly select the minimum of the unsorted suffix.",
  readingTime: 3,
  content: `
# Selection Sort

## Theory

**Selection sort** finds the minimum of the unsorted suffix and swaps it into the next position. After \`i\` iterations, the first \`i\` positions hold the smallest \`i\` elements in sorted order.

- Time: **O(n^2)** in all cases.
- Space: **O(1)**.
- **Unstable** (a swap can move equal elements past each other).
- Performs at most **n - 1** swaps — useful when writes are expensive.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void selectionSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j)
            if (a[j] < a[minIdx]) minIdx = j;
        if (minIdx != i) swap(a[i], a[minIdx]);
    }
}

int main() {
    vector<int> a = {64, 25, 12, 22, 11};
    selectionSort(a);
    for (int x : a) cout << x << ' ';       // 11 12 22 25 64
}
\`\`\`
`,
};

export default topic;
