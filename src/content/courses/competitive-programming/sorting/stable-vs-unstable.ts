import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "stable-vs-unstable-sorting",
  title: "Stable vs Unstable Sorting",
  description: "Why preserving the original order of equal keys matters.",
  readingTime: 3,
  content: `
# Stable vs Unstable Sorting

## Theory

A sort is **stable** if two elements comparing equal keep their original relative order after sorting; otherwise it is **unstable**.

### Why stability matters

- Sorting records by multiple keys: first sort by secondary key, then stably by primary key.
- Preserving tie-breaking information (e.g. original insertion order).
- Some algorithms (radix sort, counting sort) rely on stability internally.

### Which algorithms are stable?

| Stable | Unstable |
| --- | --- |
| Insertion, Bubble, Merge, Counting, Radix, Bucket, Timsort | Selection, Quick, Heap, Introsort |

### In C++

- \`std::sort\` — unstable, \`O(n log n)\`.
- \`std::stable_sort\` — stable, \`O(n log n)\` extra memory (or \`O(n log^2 n)\` in place).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Student { string name; int score; };

int main() {
    vector<Student> v = {{"Alice", 90}, {"Bob", 80}, {"Cara", 90}, {"Dan", 80}};

    // Stable sort keeps Alice before Cara among the 90s.
    stable_sort(v.begin(), v.end(),
                [](const Student& a, const Student& b) { return a.score > b.score; });

    for (auto& s : v) cout << s.name << ' ' << s.score << "\\n";
}
\`\`\`
`,
};

export default topic;
