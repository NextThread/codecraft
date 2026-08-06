import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "deque",
  title: "Deque",
  description: "Double-ended queue and the sliding window maximum.",
  readingTime: 5,
  content: `

# Deque

## Theory

A **deque** (double-ended queue) supports O(1) insertion and removal at *both* ends, plus O(1) random access.

`std::deque<T>` is implemented as a list of fixed-size blocks, so:

- `push_front`, `push_back`, `pop_front`, `pop_back`, `operator[]` — all O(1)
- Insertion in the middle — O(n)
- Slightly slower than `vector` for pure iteration (indirection), but far better than shifting.

### Key applications

- **Sliding window minimum/maximum** in O(n) using a *monotonic deque*.
- **0-1 BFS**: edges of weight 0 go to the front, weight 1 to the back — Dijkstra in O(V + E).
- Palindrome checks, undo/redo, work-stealing schedulers.
- Underlying container of `std::queue` and `std::stack`.

### Monotonic deque for window maximum

Store indices with strictly decreasing values. For each new element:
1. Pop from the back while the back value is `<=` the new value (it can never be a maximum again).
2. Push the new index.
3. Pop from the front if it left the window.
4. The front is the maximum of the current window.

Each index enters and leaves once → O(n) total.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// maximum of every window of length k — O(n)
vector<int> slidingMax(const vector<int>& a, int k) {
    deque<int> dq;                       // indices, values decreasing
    vector<int> res;
    for (int i = 0; i < (int)a.size(); ++i) {
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) res.push_back(a[dq.front()]);
    }
    return res;
}

// 0-1 BFS: shortest path when every edge weighs 0 or 1
vector<int> zeroOneBfs(const vector<vector<pair<int,int>>>& g, int src) {
    vector<int> dist(g.size(), INT_MAX);
    deque<int> dq;
    dist[src] = 0;
    dq.push_back(src);
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);
                else        dq.push_back(v);
            }
        }
    }
    return dist;
}

int main() {
    vector<int> a = {1, 3, -1, -3, 5, 3, 6, 7};
    for (int x : slidingMax(a, 3)) cout << x << ' ';   // 3 3 5 5 6 7
    cout << '\n';

    vector<vector<pair<int,int>>> g = {{{1,0},{2,1}},{{2,0}},{{3,1}},{}};
    for (int d : zeroOneBfs(g, 0)) cout << d << ' ';   // 0 0 0 1
    cout << '\n';
}
```
`,
};

export default topic;
