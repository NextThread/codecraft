import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "counting-sort",
  title: "Counting Sort",
  description: "Linear-time sort for bounded integer keys.",
  readingTime: 4,
  content: `
# Counting Sort

## Theory

**Counting sort** is a non-comparison sort that works when the keys are integers in a small range \`[0, k]\`. It counts how many times each value occurs, then reconstructs the sorted output.

- Time: **O(n + k)**.
- Space: **O(n + k)**.
- **Stable** when implemented with prefix sums + right-to-left placement.
- Not comparison-based, so the \`O(n log n)\` lower bound does not apply.

### When to use

- Keys are small integers (e.g. ages 0..120, characters).
- You want a stable sort to serve as a building block for radix sort.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Stable counting sort for non-negative integers in [0, maxVal].
void countingSort(vector<int>& a, int maxVal) {
    int n = a.size();
    vector<int> cnt(maxVal + 1, 0);
    for (int x : a) ++cnt[x];
    for (int i = 1; i <= maxVal; ++i) cnt[i] += cnt[i - 1];  // prefix sums
    vector<int> out(n);
    for (int i = n - 1; i >= 0; --i) out[--cnt[a[i]]] = a[i];
    a = move(out);
}

int main() {
    vector<int> a = {4, 2, 2, 8, 3, 3, 1};
    countingSort(a, 8);
    for (int x : a) cout << x << ' ';   // 1 2 2 3 3 4 8
}
\`\`\`
`,
};

export default topic;
