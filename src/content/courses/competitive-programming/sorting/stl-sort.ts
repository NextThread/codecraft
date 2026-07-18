import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "stl-sort",
  title: "STL Sort",
  description: "Using std::sort effectively in competitive programming.",
  readingTime: 3,
  content: `
# STL Sort

## Theory

C++'s \`std::sort\` is an **introspective sort** — a hybrid of quicksort, heapsort, and insertion sort. Guaranteed **O(n log n)** worst case (since C++11) and unstable.

### Signature

\`\`\`cpp
sort(first, last);                    // uses operator<
sort(first, last, cmp);               // uses custom comparator
\`\`\`

### Related helpers

- \`stable_sort\` — preserves the order of equal elements.
- \`partial_sort\` — sorts only the first \`k\` elements.
- \`nth_element\` — places the k-th element in its final position.
- \`is_sorted\`, \`is_sorted_until\` — sanity checks.
- \`sort(v.rbegin(), v.rend())\` — descending sort trick.

### Sorting pairs and tuples

\`std::pair\` and \`std::tuple\` have lexicographic \`operator<\`, so \`sort\` works out of the box.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {5, 3, 8, 1, 4};
    sort(a.begin(), a.end());                              // ascending
    sort(a.rbegin(), a.rend());                            // descending

    vector<pair<int, string>> p = {{3, "c"}, {1, "a"}, {2, "b"}};
    sort(p.begin(), p.end());                              // by first, then second

    // Sort strings by length, then alphabetically.
    vector<string> s = {"banana", "kiwi", "apple", "fig"};
    sort(s.begin(), s.end(), [](const string& x, const string& y) {
        return x.size() != y.size() ? x.size() < y.size() : x < y;
    });
    for (auto& t : s) cout << t << ' ';
}
\`\`\`
`,
};

export default topic;
