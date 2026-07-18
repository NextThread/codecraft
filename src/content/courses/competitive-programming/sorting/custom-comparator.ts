import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "custom-comparator",
  title: "Custom Comparator",
  description: "Write correct comparators for sort, sets, and priority queues.",
  readingTime: 4,
  content: `
# Custom Comparator

## Theory

A **comparator** is a callable \`cmp(a, b)\` that returns \`true\` if \`a\` should come **before** \`b\`. It must define a **strict weak ordering**:

1. **Irreflexive**: \`cmp(a, a)\` is false.
2. **Asymmetric**: if \`cmp(a, b)\` then not \`cmp(b, a)\`.
3. **Transitive**: if \`cmp(a, b)\` and \`cmp(b, c)\` then \`cmp(a, c)\`.
4. Equivalence (\`!cmp(a,b) && !cmp(b,a)\`) is also transitive.

Violating these rules causes undefined behaviour — often a crash or an infinite loop inside \`sort\`.

### Common patterns

- Sort by field ascending: \`return a.x < b.x;\`
- Descending: \`return a.x > b.x;\`
- Multi-key: use \`tie\` for lexicographic order.
- Priority queue is a **max-heap** by default; invert the comparator to make it a min-heap.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Item { int weight; int value; };

int main() {
    vector<Item> v = {{5, 10}, {3, 8}, {5, 12}, {2, 4}};

    // Sort by weight asc, then by value desc.
    sort(v.begin(), v.end(), [](const Item& a, const Item& b) {
        return tie(a.weight, b.value) < tie(b.weight, a.value);
    });

    // Min-heap of ints using a custom comparator.
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(5); minHeap.push(1); minHeap.push(3);
    while (!minHeap.empty()) { cout << minHeap.top() << ' '; minHeap.pop(); }
}
\`\`\`
`,
};

export default topic;
