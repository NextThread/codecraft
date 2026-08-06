import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dsu",
  title: "Disjoint Set Union (DSU)",
  description: "Union-Find with path compression and union by size.",
  readingTime: 6,
  content: `

# Disjoint Set Union (DSU)

## Theory

**DSU** (Union-Find) maintains a partition of `n` elements into disjoint sets with two operations:

- `find(x)` — representative of x's set
- `unite(a, b)` — merge two sets

With both optimizations the amortized cost is **O(α(n))** — effectively constant (α is the inverse Ackermann function).

### The two optimizations

1. **Path compression** — in `find`, reattach every visited node directly to the root.
2. **Union by size / rank** — always hang the smaller tree under the larger one.

Using only one of them gives O(log n); using both gives near-O(1).

### Extras you often need

- `size[root]` — number of elements in the component.
- `components` counter, decremented on each successful union.
- **DSU with rollback** (no path compression, union by size, keep a stack) for offline dynamic connectivity.
- **Weighted / bipartite DSU** — store parity or a potential to answer "same or different group?".
- **DSU on segments** — "next free cell" trick.

### Uses

Kruskal's MST, connected components, cycle detection in an undirected graph, offline queries (small-to-large merging), grouping equal strings/accounts, Kruskal reconstruction tree, painting intervals.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, sz;
    int components;

    explicit DSU(int n) : parent(n), sz(n, 1), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {                              // path compression
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    }
    bool unite(int a, int b) {                     // union by size
        a = find(a); b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        --components;
        return true;
    }
    bool same(int a, int b) { return find(a) == find(b); }
    int size(int x) { return sz[find(x)]; }
};

// Kruskal's minimum spanning tree
long long kruskal(int n, vector<tuple<int,int,int>> edges) {   // (w, u, v)
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long total = 0;
    for (auto [w, u, v] : edges)
        if (dsu.unite(u, v)) total += w;
    return dsu.components == 1 ? total : -1;       // -1 if the graph is disconnected
}

int main() {
    DSU dsu(6);
    dsu.unite(0, 1);
    dsu.unite(1, 2);
    dsu.unite(4, 5);
    cout << dsu.same(0, 2) << ' ' << dsu.same(0, 3) << '\n';   // 1 0
    cout << dsu.size(0) << ' ' << dsu.components << '\n';       // 3 3

    vector<tuple<int,int,int>> e = {{1,0,1},{4,0,2},{2,1,2},{5,2,3},{3,1,3}};
    cout << "MST weight = " << kruskal(4, e) << '\n';           // 6
}
```
`,
};

export default topic;
