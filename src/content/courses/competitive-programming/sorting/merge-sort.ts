import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "merge-sort",
  title: "Merge Sort",
  description: "Divide, sort recursively, and merge — always O(n log n).",
  readingTime: 4,
  content: `
# Merge Sort

## Theory

**Merge sort** is a classic divide-and-conquer algorithm:

1. **Divide** the array into two halves.
2. **Sort** each half recursively.
3. **Merge** the two sorted halves in linear time.

- Time: **O(n log n)** in all cases.
- Space: **O(n)** for the merge buffer.
- **Stable**.
- Great for linked lists and external sorting (data larger than RAM).

### Applications

- Counting **inversions** during the merge step.
- External sorting on disk.
- Basis for many parallel sort implementations.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void merge(vector<int>& a, int l, int m, int r) {
    vector<int> tmp;
    tmp.reserve(r - l + 1);
    int i = l, j = m + 1;
    while (i <= m && j <= r)
        tmp.push_back(a[i] <= a[j] ? a[i++] : a[j++]);
    while (i <= m) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);
    for (int k = 0; k < (int)tmp.size(); ++k) a[l + k] = tmp[k];
}

void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}

int main() {
    vector<int> a = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(a, 0, a.size() - 1);
    for (int x : a) cout << x << ' ';   // 3 9 10 27 38 43 82
}
\`\`\`
`,
};

export default topic;
