import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "upper-bound",
  title: "Upper Bound",
  description: "First position whose value is strictly greater than the target.",
  readingTime: 3,
  content: `
# Upper Bound

## Theory

The **upper bound** of \`x\` in a sorted array is the index of the **first element strictly greater than \`x\`**. If every element is \`<= x\`, the upper bound is \`n\`.

- Runs in **O(log n)**.
- Symmetric to \`lower_bound\`, just with \`<=\` instead of \`<\` in the comparison.

### Counting occurrences

The number of elements equal to \`x\` in a sorted array is:

\`\`\`
upper_bound(x) - lower_bound(x)
\`\`\`

### When to use which

| Query | Use |
| --- | --- |
| first index with \`a[i] >= x\` | \`lower_bound\` |
| first index with \`a[i] > x\` | \`upper_bound\` |
| count of \`a[i] == x\` | \`upper - lower\` |
| count of \`a[i] < x\` | \`lower_bound(x)\` |
| count of \`a[i] <= x\` | \`upper_bound(x)\` |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// First index i with a[i] > x, or a.size() if none.
int upperBound(const vector<int>& a, int x) {
    int lo = 0, hi = a.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] <= x) lo = mid + 1;
        else             hi = mid;
    }
    return lo;
}

int main() {
    vector<int> a = {1, 2, 4, 4, 4, 7, 9};
    int lo = lower_bound(a.begin(), a.end(), 4) - a.begin();
    int hi = upper_bound(a.begin(), a.end(), 4) - a.begin();
    cout << "count of 4 = " << hi - lo << "\\n"; // 3
}
\`\`\`
`,
};

export default topic;
