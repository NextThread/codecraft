import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "introduction-to-searching",
  title: "Introduction to Searching",
  description: "Overview of searching techniques used in competitive programming.",
  readingTime: 4,
  content: `
# Introduction to Searching

## Theory

**Searching** is the task of locating an element (or a value satisfying some property) inside a collection. It is one of the most fundamental operations in computer science, and mastering it is essential for competitive programming.

### Why searching matters

- Many problems reduce to *"find the smallest/largest x such that ..."*.
- Choosing the right search technique changes the complexity from \`O(n)\` to \`O(log n)\` — often the difference between TLE and AC.
- Search ideas power more advanced algorithms: two pointers, sliding window, parametric search, etc.

### Classification

| Technique | Data requirement | Time |
| --- | --- | --- |
| Linear Search | none | \`O(n)\` |
| Binary Search | sorted / monotonic | \`O(log n)\` |
| Lower / Upper Bound | sorted | \`O(log n)\` |
| Binary Search on Answer | monotonic predicate | \`O(log(range) * check)\` |
| Ternary Search | unimodal function | \`O(log n)\` |
| Meet in the Middle | exponential search space | \`O(2^(n/2))\` |

### How to choose

1. **Is the array sorted or can be sorted cheaply?** — Binary search family.
2. **Is there a monotonic yes/no predicate on the answer?** — Binary search on answer.
3. **Is the function unimodal (increases then decreases)?** — Ternary search.
4. **Brute force is \`2^n\` but \`n <= 40\`?** — Meet in the middle.
5. **None of the above?** — Linear scan is fine for small \`n\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {2, 5, 7, 9, 12, 18};
    int target = 9;

    // Linear search
    bool found = false;
    for (int x : a) if (x == target) { found = true; break; }
    cout << "linear: " << found << "\\n";

    // STL binary search (needs sorted input)
    cout << "binary: " << binary_search(a.begin(), a.end(), target) << "\\n";
}
\`\`\`
`,
};

export default topic;
