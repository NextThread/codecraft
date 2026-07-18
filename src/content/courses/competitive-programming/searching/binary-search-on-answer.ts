import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-search-on-answer",
  title: "Binary Search on Answer",
  description: "Search the value space using a monotonic feasibility check.",
  readingTime: 5,
  content: `
# Binary Search on Answer

## Theory

Sometimes we don't binary search an array — we binary search over the **space of possible answers**. This works whenever the problem has a monotonic predicate \`check(x)\`:

> If \`check(x)\` is true, then \`check(x')\` is also true for every \`x' >= x\` (or vice versa).

The task becomes: find the smallest (or largest) \`x\` for which \`check(x)\` holds.

### Recipe

1. Identify a range \`[lo, hi]\` that surely contains the answer.
2. Write a boolean \`check(x)\` — usually a greedy or a simulation.
3. Binary search: whenever \`check(mid)\` is true, remember it and shrink to the better half; otherwise move to the other half.

### Total complexity: \`O(log(hi - lo) * cost(check))\`

### Classic problems

- **Aggressive Cows** / **Book Allocation** — max-min or min-max partitioning.
- **Painters partition**.
- **Split array largest sum**.
- **Kth smallest in a sorted matrix** (binary search on value).
- **Minimum speed to eat bananas in H hours**.

### Floating-point version

For real-valued answers replace integer bounds with doubles and iterate a fixed number of times (e.g. 100) or until \`hi - lo < eps\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Aggressive Cows: place k cows in n stalls so that the minimum
// distance between any two is maximised.
bool canPlace(const vector<int>& stalls, int k, int dist) {
    int placed = 1, last = stalls[0];
    for (int i = 1; i < (int)stalls.size(); ++i) {
        if (stalls[i] - last >= dist) { ++placed; last = stalls[i]; }
        if (placed >= k) return true;
    }
    return false;
}

int aggressiveCows(vector<int> stalls, int k) {
    sort(stalls.begin(), stalls.end());
    int lo = 1, hi = stalls.back() - stalls.front(), ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (canPlace(stalls, k, mid)) { ans = mid; lo = mid + 1; }
        else                          hi = mid - 1;
    }
    return ans;
}

int main() {
    cout << aggressiveCows({1, 2, 4, 8, 9}, 3) << "\\n"; // 3
}
\`\`\`
`,
};

export default topic;
