import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "introduction-to-sorting",
  title: "Introduction to Sorting",
  description: "Why sorting matters and how to choose an algorithm.",
  readingTime: 4,
  content: `
# Introduction to Sorting

## Theory

**Sorting** arranges a collection into a defined order (usually non-decreasing). It is one of the most heavily used building blocks in competitive programming: two pointers, binary search, greedy, sweep line, and many DPs assume sorted input.

### Cheat sheet

| Algorithm | Best | Average | Worst | Space | Stable |
| --- | --- | --- | --- | --- | --- |
| Bubble | n | n^2 | n^2 | 1 | yes |
| Selection | n^2 | n^2 | n^2 | 1 | no |
| Insertion | n | n^2 | n^2 | 1 | yes |
| Merge | n log n | n log n | n log n | n | yes |
| Quick | n log n | n log n | n^2 | log n | no |
| Heap | n log n | n log n | n log n | 1 | no |
| Counting | n + k | n + k | n + k | k | yes |
| Radix | n * d | n * d | n * d | n + k | yes |
| Bucket | n + k | n + k | n^2 | n + k | yes |

### Rules of thumb

- Use \`std::sort\` (introsort) — reliably \`O(n log n)\`.
- Use \`std::stable_sort\` when relative order matters.
- Use counting/radix when keys are bounded small integers.
- Use \`nth_element\` when only a specific rank is needed.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {5, 2, 9, 1, 7, 3};
    sort(a.begin(), a.end());                 // ascending
    for (int x : a) cout << x << ' ';
    cout << "\\n";
    sort(a.rbegin(), a.rend());               // descending
    for (int x : a) cout << x << ' ';
}
\`\`\`
`,
};

export default topic;
