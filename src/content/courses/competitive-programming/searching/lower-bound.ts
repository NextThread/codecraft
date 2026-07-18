import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "lower-bound",
  title: "Lower Bound",
  description: "First position whose value is not less than the target.",
  readingTime: 3,
  content: `
# Lower Bound

## Theory

The **lower bound** of \`x\` in a sorted array is the index of the **first element that is >= x**. If every element is smaller than \`x\`, the lower bound is \`n\` (past the end).

- Runs in **O(log n)**.
- Extremely useful for counting, insertion positions, and rank queries.
- Available in the STL as \`std::lower_bound\`.

### Uses

- Number of elements < x: \`lower_bound(x) - a.begin()\`.
- Insertion index that keeps the array sorted.
- Building blocks for LIS in \`O(n log n)\`, coordinate compression, offline queries.

### Implementation idea

Maintain a half-open interval \`[lo, hi)\`. On each step, if \`a[mid] < x\` move \`lo = mid + 1\`, else \`hi = mid\`. Loop while \`lo < hi\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// First index i with a[i] >= x, or a.size() if none.
int lowerBound(const vector<int>& a, int x) {
    int lo = 0, hi = a.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < x) lo = mid + 1;
        else            hi = mid;
    }
    return lo;
}

int main() {
    vector<int> a = {1, 2, 4, 4, 4, 7, 9};
    cout << lowerBound(a, 4) << "\\n";                          // 2
    cout << (lower_bound(a.begin(), a.end(), 5) - a.begin());   // 5
}
\`\`\`
`,
};

export default topic;
