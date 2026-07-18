import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-search",
  title: "Binary Search",
  description: "Logarithmic search on sorted data — the workhorse of CP.",
  readingTime: 5,
  content: `
# Binary Search

## Theory

**Binary search** locates a target in a **sorted** array by repeatedly halving the search interval. Each step compares the middle element with the target and discards the half that cannot contain it.

- Requires random access and a **monotonic** (usually sorted) sequence.
- Time complexity: **O(log n)**.
- Space complexity: **O(1)** iterative, **O(log n)** recursive.

### Correct middle calculation

Use \`mid = lo + (hi - lo) / 2\` instead of \`(lo + hi) / 2\` to avoid integer overflow when \`lo\` and \`hi\` are large.

### Common pitfalls

- Off-by-one on the loop condition — mixing \`hi = n\` (exclusive) with \`hi = n - 1\` (inclusive).
- Infinite loops when the interval never shrinks (make sure \`lo\` or \`hi\` always moves).
- Applying binary search on data that is not truly monotonic.

### Recursive vs iterative

Both are correct; iterative is slightly faster and avoids stack overflow.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Classic iterative binary search — returns index or -1.
int binarySearch(const vector<int>& a, int target) {
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else                 hi = mid - 1;
    }
    return -1;
}

// Recursive version.
int binarySearchRec(const vector<int>& a, int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    return a[mid] < target
        ? binarySearchRec(a, mid + 1, hi, target)
        : binarySearchRec(a, lo, mid - 1, target);
}

int main() {
    vector<int> a = {1, 3, 5, 7, 9, 11, 13};
    cout << binarySearch(a, 7) << "\\n";              // 3
    cout << binary_search(a.begin(), a.end(), 4);     // 0 (STL)
}
\`\`\`
`,
};

export default topic;
