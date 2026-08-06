import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "centroid-decomposition",
  title: "Centroid Decomposition",
  description: "Divide and conquer on trees in O(n log n).",
  readingTime: 7,
  content: `

# Centroid Decomposition

## Theory

A **centroid** of a tree with `n` nodes is a node whose removal leaves every remaining component with at most `n / 2` nodes. Every tree has one (or two).

**Centroid decomposition** removes the centroid, recurses into each remaining component, and builds a *centroid tree* whose depth is **O(log n)** — because component sizes at least halve.

```
build(component):
    c = centroid(component)
    process all paths that pass through c
    remove c
    for each remaining component: build(...)
```

Total work: each node appears in O(log n) levels → **O(n log n)** (times the cost per level).

### Why it is powerful

Any path in the tree passes through the centroid of the *highest* level at which both endpoints are still together. So counting/optimizing over **all pairs of nodes** reduces to, at each centroid, combining root-to-node distances in the current component.

### Standard problems

- Count pairs at distance exactly / at most `k`.
- Shortest path with at most k edges between all pairs of special nodes.
- Dynamic "nearest marked node" queries (update and query in O(log n) each via the centroid tree).
- Sum of distances over all pairs; number of paths whose weight sum is divisible by m.

### Implementation checklist

1. `computeSizes` in the current component (respecting removed nodes).
2. Find the centroid by walking towards the heaviest child while it exceeds `total / 2`.
3. Process paths through the centroid — usually "count all, subtract per-child overcount".
4. Mark the centroid removed and recurse.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct CentroidDecomposition {
    int n, K;
    vector<vector<int>> g;
    vector<int> sz;
    vector<bool> removed;
    long long pairsAtMostK = 0;

    CentroidDecomposition(int n, int K) : n(n), K(K), g(n), sz(n, 0), removed(n, false) {}
    void addEdge(int a, int b) { g[a].push_back(b); g[b].push_back(a); }

    int computeSize(int v, int p) {
        sz[v] = 1;
        for (int to : g[v])
            if (to != p && !removed[to]) sz[v] += computeSize(to, v);
        return sz[v];
    }
    int findCentroid(int v, int p, int total) {
        for (int to : g[v])
            if (to != p && !removed[to] && sz[to] > total / 2)
                return findCentroid(to, v, total);
        return v;
    }
    void collect(int v, int p, int d, vector<int>& out) {
        if (d > K) return;                      // prune
        out.push_back(d);
        for (int to : g[v])
            if (to != p && !removed[to]) collect(to, v, d + 1, out);
    }
    // number of pairs (i, j) in `ds` with ds[i] + ds[j] <= K
    long long countPairs(vector<int> ds) {
        sort(ds.begin(), ds.end());
        long long res = 0;
        int l = 0, r = ds.size() - 1;
        while (l < r) {
            if (ds[l] + ds[r] <= K) { res += r - l; ++l; }
            else --r;
        }
        return res;
    }
    void build(int entry) {
        int total = computeSize(entry, -1);
        int c = findCentroid(entry, -1, total);

        vector<int> all{0};                      // the centroid itself, distance 0
        for (int to : g[c]) if (!removed[to]) {
            vector<int> branch;
            collect(to, c, 1, branch);
            pairsAtMostK -= countPairs(branch);  // subtract pairs inside one branch
            all.insert(all.end(), branch.begin(), branch.end());
        }
        pairsAtMostK += countPairs(all);         // add all pairs through the centroid

        removed[c] = true;
        for (int to : g[c])
            if (!removed[to]) build(to);
    }
};

int main() {
    int n = 7, K = 2;
    CentroidDecomposition cd(n, K);
    cd.addEdge(0,1); cd.addEdge(0,2); cd.addEdge(1,3);
    cd.addEdge(1,4); cd.addEdge(2,5); cd.addEdge(4,6);
    cd.build(0);
    cout << "pairs with distance <= " << K << ": " << cd.pairsAtMostK << '\n';
}
```
`,
};

export default topic;
