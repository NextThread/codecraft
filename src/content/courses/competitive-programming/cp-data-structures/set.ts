import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "set",
  title: "Set",
  description: "Balanced BST container with ordered operations.",
  readingTime: 5,
  content: `

# Set

## Theory

`std::set<T>` stores **unique**, **sorted** keys in a self-balancing binary search tree (red-black tree).

| Operation | Complexity |
|-----------|-----------|
| `insert`, `erase`, `count`, `find` | O(log n) |
| `lower_bound`, `upper_bound` | O(log n) |
| iteration in sorted order | O(n) |
| `begin()` (minimum), `rbegin()` (maximum) | O(1) |

Inserting a duplicate is silently ignored (`insert` returns `pair<iterator,bool>`).

### Important details

- Use the **member** `s.lower_bound(x)`, never `std::lower_bound(s.begin(), s.end(), x)` — the latter is O(n) because set iterators are not random-access.
- Iterators stay valid after other insertions/erasures (only the erased one is invalidated).
- No indexing: "the k-th smallest element" needs an **ordered set (PBDS)** or a Fenwick/segment tree.
- Custom ordering via a comparator: `set<int, greater<int>>` or a struct with `operator()`.

### Typical uses

- Maintaining a dynamic sorted collection: nearest smaller/greater element, free-interval management.
- Sweep-line algorithms (active segments), Dijkstra without a priority queue.
- Deduplication + coordinate compression.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    set<int> s = {5, 1, 9, 1};             // duplicate ignored
    s.insert(3);
    for (int x : s) cout << x << ' ';      // 1 3 5 9
    cout << '\n';

    cout << s.count(5) << ' ' << s.count(4) << '\n';   // 1 0
    s.erase(5);

    // predecessor / successor of a value
    int x = 4;
    auto it = s.lower_bound(x);             // first element >= x
    if (it != s.end())   cout << "successor(>=4) = " << *it << '\n';   // 9
    if (it != s.begin()) cout << "predecessor(<4) = " << *prev(it) << '\n'; // 3

    cout << "min = " << *s.begin() << ", max = " << *s.rbegin() << '\n';

    // descending set with a custom comparator
    set<int, greater<int>> desc(s.begin(), s.end());
    for (int v : desc) cout << v << ' ';    // 9 3 1
    cout << '\n';

    // set of structs
    struct P { int x, y; bool operator<(const P& o) const { return tie(x,y) < tie(o.x,o.y); } };
    set<P> pts = {{1,2},{1,1},{0,5}};
    for (auto& p : pts) cout << '(' << p.x << ',' << p.y << ") ";
    cout << '\n';                           // (0,5) (1,1) (1,2)
}
```
`,
};

export default topic;
