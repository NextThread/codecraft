import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "priority-queue",
  title: "Priority Queue (Heap)",
  description: "Binary heap, std::priority_queue, and heap patterns.",
  readingTime: 6,
  content: `

# Priority Queue (Heap)

## Theory

A **priority queue** always gives you the element with the highest priority. It is normally implemented as a **binary heap**: a complete binary tree stored in an array where

```
parent(i) = (i - 1) / 2      left(i) = 2i + 1      right(i) = 2i + 2
```

**Max-heap property:** every parent is `>=` its children.

| Operation | Complexity |
|-----------|-----------|
| top / peek | O(1) |
| push (sift up) | O(log n) |
| pop (sift down) | O(log n) |
| build from n items | **O(n)** |

`std::priority_queue<T>` is a max-heap by default; a min-heap is `priority_queue<T, vector<T>, greater<T>>`.

### Uses

- **Dijkstra** and **Prim** algorithms.
- **k-th largest / smallest**, top-k frequent elements (keep a heap of size k).
- **Merging k sorted lists**, external sorting.
- Scheduling by deadline/cost, Huffman coding, "median of a stream" with two heaps.

Note: a heap gives no ordered iteration and no O(log n) search for arbitrary values — use a `set` for that.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// hand-written max-heap over a vector
struct MaxHeap {
    vector<int> h;

    void push(int v) {
        h.push_back(v);
        int i = h.size() - 1;
        while (i > 0 && h[(i - 1) / 2] < h[i]) {       // sift up
            swap(h[i], h[(i - 1) / 2]);
            i = (i - 1) / 2;
        }
    }
    int top() const { return h[0]; }
    void pop() {
        h[0] = h.back();
        h.pop_back();
        int i = 0, n = h.size();
        while (true) {                                  // sift down
            int l = 2 * i + 1, r = 2 * i + 2, best = i;
            if (l < n && h[l] > h[best]) best = l;
            if (r < n && h[r] > h[best]) best = r;
            if (best == i) break;
            swap(h[i], h[best]);
            i = best;
        }
    }
    bool empty() const { return h.empty(); }
};

// Dijkstra with a min-heap
vector<long long> dijkstra(const vector<vector<pair<int,int>>>& g, int src) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(g.size(), INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;                      // stale entry
        for (auto [v, w] : g[u])
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
    }
    return dist;
}

int main() {
    MaxHeap mh;
    for (int v : {5, 1, 9, 3, 7}) mh.push(v);
    while (!mh.empty()) { cout << mh.top() << ' '; mh.pop(); }   // 9 7 5 3 1
    cout << '\n';

    // k-th largest with a min-heap of size k
    vector<int> a = {7, 10, 4, 3, 20, 15};
    int k = 3;
    priority_queue<int, vector<int>, greater<>> pq;
    for (int x : a) { pq.push(x); if ((int)pq.size() > k) pq.pop(); }
    cout << "3rd largest = " << pq.top() << '\n';                // 10

    vector<vector<pair<int,int>>> g = {{{1,4},{2,1}},{{3,1}},{{1,2},{3,5}},{}};
    for (long long d : dijkstra(g, 0)) cout << d << ' ';         // 0 3 1 4
    cout << '\n';
}
```
`,
};

export default topic;
