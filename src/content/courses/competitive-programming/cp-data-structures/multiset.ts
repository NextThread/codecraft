import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "multiset",
  title: "Multiset",
  description: "Sorted container allowing duplicates, with erase pitfalls.",
  readingTime: 4,
  content: `

# Multiset

## Theory

`std::multiset<T>` is a `set` that **allows duplicate keys**. Same red-black tree, same O(log n) costs.

### The classic pitfall

```cpp
ms.erase(x);              // removes ALL copies of x
ms.erase(ms.find(x));     // removes exactly ONE copy  ✅
```

Always erase by iterator when you want to delete a single occurrence.

### Useful members

- `count(x)` — number of copies, **O(log n + count)**; use `find` if you only need existence.
- `equal_range(x)` — pair of iterators covering all copies of `x`.
- `*ms.begin()` / `*ms.rbegin()` — current minimum / maximum in O(1).

### Typical uses

- Sliding-window minimum/maximum when elements are removed arbitrarily (window with deletions).
- "Running median" via two multisets.
- Greedy scheduling: repeatedly take the smallest element `>= x` (`lower_bound`) and replace it.
- Multiset of remaining capacities in bin-packing style greedy problems.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// sliding window maximum using a multiset (handles arbitrary removals)
vector<int> windowMax(const vector<int>& a, int k) {
    multiset<int> ms;
    vector<int> res;
    for (int i = 0; i < (int)a.size(); ++i) {
        ms.insert(a[i]);
        if (i >= k) ms.erase(ms.find(a[i - k]));    // erase one copy only
        if (i >= k - 1) res.push_back(*ms.rbegin());
    }
    return res;
}

int main() {
    multiset<int> ms = {5, 1, 5, 3, 5};
    cout << ms.count(5) << '\n';            // 3
    ms.erase(ms.find(5));                   // one copy
    cout << ms.count(5) << '\n';            // 2
    ms.erase(5);                            // all remaining copies
    cout << ms.count(5) << '\n';            // 0

    for (int x : ms) cout << x << ' ';      // 1 3
    cout << '\n';

    vector<int> a = {1, 3, -1, -3, 5, 3, 6, 7};
    for (int x : windowMax(a, 3)) cout << x << ' ';   // 3 3 5 5 6 7
    cout << '\n';

    // greedy: smallest available value >= need
    multiset<int> pool = {2, 4, 4, 9};
    int need = 3;
    auto it = pool.lower_bound(need);
    if (it != pool.end()) { cout << "use " << *it << '\n'; pool.erase(it); }  // 4
}
```
`,
};

export default topic;
