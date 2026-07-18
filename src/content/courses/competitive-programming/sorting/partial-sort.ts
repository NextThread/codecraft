import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "partial-sort",
  title: "Partial Sort",
  description: "Get the top-k elements in order without fully sorting.",
  readingTime: 3,
  content: `
# Partial Sort

## Theory

\`std::partial_sort(first, middle, last)\` rearranges the range so that the first \`middle - first\` elements are the smallest ones, in sorted order. The rest of the range is left in an unspecified order.

- Time: **O(n * log k)** where \`k = middle - first\`.
- Space: **O(1)**.
- Ideal when \`k\` is much smaller than \`n\` and you need them sorted.
- Internally uses a heap-based selection.

### Cousins

- \`nth_element\` — only guarantees the k-th element's position, faster \`O(n)\` on average, but the top-k are unsorted.
- \`partial_sort_copy\` — same idea but writes results into a separate range.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {9, 1, 8, 2, 7, 3, 6, 4, 5};
    // Get the 3 smallest elements in sorted order at the front.
    partial_sort(a.begin(), a.begin() + 3, a.end());
    for (int i = 0; i < 3; ++i) cout << a[i] << ' ';   // 1 2 3
    cout << "\\n";
    // Top 3 largest — sort descending.
    partial_sort(a.begin(), a.begin() + 3, a.end(), greater<int>());
    for (int i = 0; i < 3; ++i) cout << a[i] << ' ';   // 9 8 7
}
\`\`\`
`,
};

export default topic;
