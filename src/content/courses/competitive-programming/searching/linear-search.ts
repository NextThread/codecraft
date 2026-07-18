import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "linear-search",
  title: "Linear Search",
  description: "The simplest search: scan every element until the target is found.",
  readingTime: 3,
  content: `
# Linear Search

## Theory

**Linear search** (also called sequential search) inspects each element one by one until it either finds the target or exhausts the collection.

- Works on **any** container — sorted or not.
- Time complexity: **O(n)** in the worst and average case, **O(1)** best case.
- Space complexity: **O(1)**.

### When to use it

- \`n\` is small (say, \`n <= 10^5\` inside a single loop, or \`n <= 10^3\` inside nested loops).
- The data is unsorted and sorting would cost more than a single scan.
- You need to find something with a complex condition that can't be indexed.

### Variants

- **Find first / last occurrence** — stop at the first match, or keep scanning to remember the latest.
- **Count occurrences** — increment a counter instead of returning.
- **Sentinel linear search** — place the target at the end to remove the bounds check inside the loop (micro-optimization).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Returns index of target, or -1 if not present.
int linearSearch(const vector<int>& a, int target) {
    for (int i = 0; i < (int)a.size(); ++i)
        if (a[i] == target) return i;
    return -1;
}

// Sentinel version — saves one comparison per iteration.
int sentinelSearch(vector<int> a, int target) {
    int n = a.size();
    a.push_back(target);              // sentinel
    int i = 0;
    while (a[i] != target) ++i;
    return i == n ? -1 : i;
}

int main() {
    vector<int> a = {4, 2, 7, 1, 9, 3};
    cout << linearSearch(a, 7) << "\\n";   // 2
    cout << sentinelSearch(a, 5) << "\\n"; // -1
}
\`\`\`
`,
};

export default topic;
