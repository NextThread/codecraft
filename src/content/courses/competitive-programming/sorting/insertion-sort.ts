import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "insertion-sort",
  title: "Insertion Sort",
  description: "Insert each element into its place in the sorted prefix.",
  readingTime: 3,
  content: `
# Insertion Sort

## Theory

**Insertion sort** grows a sorted prefix by taking the next element and shifting the prefix rightwards until it finds the correct position. It's the way most people sort playing cards in their hand.

- Time: **O(n^2)** average and worst, **O(n)** on nearly sorted inputs.
- Space: **O(1)**.
- **Stable**.
- Efficient for small \`n\` (< 32) — hybrid sorts (Timsort, introsort) fall back to it.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void insertionSort(vector<int>& a) {
    int n = a.size();
    for (int i = 1; i < n; ++i) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = key;
    }
}

int main() {
    vector<int> a = {12, 11, 13, 5, 6};
    insertionSort(a);
    for (int x : a) cout << x << ' ';   // 5 6 11 12 13
}
\`\`\`
`,
};

export default topic;
