import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "ordered-set-pbds",
  title: "Ordered Set (PBDS)",
  description: "GNU tree_order_statistics_node_update: k-th element and rank in O(log n).",
  readingTime: 5,
  content: `

# Ordered Set (PBDS)

## Theory

`std::set` cannot answer "what is the k-th smallest element?" or "how many elements are smaller than x?" in logarithmic time. GNU's **policy-based data structures** (PBDS) extend a red-black tree with subtree sizes and give exactly that:

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

template <class T>
using ordered_set = tree<T, null_type, less<T>,
                         rb_tree_tag, tree_order_statistics_node_update>;
```

Two extra operations, both **O(log n)**:

| Method | Meaning |
|--------|---------|
| `find_by_order(k)` | iterator to the k-th smallest (0-indexed) |
| `order_of_key(x)` | number of elements strictly less than `x` |

### Notes

- Available with GCC/g++ only (fine on Codeforces, AtCoder, CodeChef).
- Keys are unique, like `set`. For a **multiset** behaviour, store `pair<value, uniqueId>` or use `less_equal<T>` as the comparator (then `find` / `erase(value)` stop working — erase via `find_by_order(order_of_key(...))`).

### Typical uses

- **Counting inversions** online.
- Dynamic rank queries: "position of this score in the leaderboard".
- k-th smallest in a dynamically changing multiset (median maintenance).
- Replacing a Fenwick tree when values are not small integers.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

template <class T>
using ordered_set = tree<T, null_type, less<T>,
                         rb_tree_tag, tree_order_statistics_node_update>;

// multiset flavour: pair<value, insertionIndex> keeps keys unique
template <class T>
using ordered_multiset = tree<pair<T,int>, null_type, less<pair<T,int>>,
                              rb_tree_tag, tree_order_statistics_node_update>;

int main() {
    ordered_set<int> s;
    for (int x : {10, 4, 7, 1, 9}) s.insert(x);      // 1 4 7 9 10

    cout << *s.find_by_order(0) << '\n';             // 1  (smallest)
    cout << *s.find_by_order(2) << '\n';             // 7  (3rd smallest)
    cout << s.order_of_key(7) << '\n';               // 2  (elements < 7)
    cout << s.order_of_key(8) << '\n';              // 3

    // counting inversions in O(n log n)
    vector<int> a = {5, 4, 3, 2, 1};
    ordered_multiset<int> ms;
    long long inversions = 0;
    for (int i = 0; i < (int)a.size(); ++i) {
        inversions += ms.size() - ms.order_of_key({a[i], INT_MAX});  // already inserted and > a[i]
        ms.insert({a[i], i});
    }
    cout << "inversions = " << inversions << '\n';   // 10
}
```
`,
};

export default topic;
