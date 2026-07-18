import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "nth-element",
  title: "nth_element",
  description: "Place the k-th element in its final sorted position in O(n).",
  readingTime: 3,
  content: `
# nth_element

## Theory

\`std::nth_element(first, nth, last)\` reorders the range so that:

- \`*nth\` is the element that would be at position \`nth\` if the range were fully sorted.
- All elements before \`nth\` are \`<= *nth\`.
- All elements after \`nth\` are \`>= *nth\`.

The two partitions are **not** individually sorted.

- Expected time: **O(n)** (linear!).
- Worst-case time: usually \`O(n)\` too because implementations use introselect (falls back to median-of-medians).
- Space: **O(1)**.

### Uses

- Finding the k-th smallest/largest without fully sorting.
- Computing medians in \`O(n)\`.
- Efficient top-k when the order among the top-k doesn't matter.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {7, 2, 5, 3, 9, 1, 8, 4, 6};
    int k = 3;      // 0-indexed: 4th smallest
    nth_element(a.begin(), a.begin() + k, a.end());
    cout << "4th smallest = " << a[k] << "\\n";     // 4

    // Median in O(n).
    int n = a.size();
    nth_element(a.begin(), a.begin() + n / 2, a.end());
    cout << "median = " << a[n / 2] << "\\n";
}
\`\`\`
`,
};

export default topic;
