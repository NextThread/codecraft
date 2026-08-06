import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "heavy-light-decomposition",
  title: "Heavy-Light Decomposition",
  description: "Path queries on trees in O(log^2 n) via chain decomposition.",
  readingTime: 7,
  content: `

# Heavy-Light Decomposition

## Theory

**HLD** splits the tree into vertical **chains** so that any root-to-node path crosses at most `O(log n)` chains. Each chain is a contiguous range in a flattened array, so a segment tree over that array answers **path queries with updates**.

### Building blocks

1. For every node pick the **heavy child** = the child with the largest subtree; all other edges are **light**.
2. Chains follow heavy edges. Moving up a light edge at least doubles the subtree size → at most `log n` light edges on any root path.
3. A DFS that visits the heavy child first assigns positions so that every chain occupies a contiguous segment.

### Complexity

| | Cost |
|---|---|
| Build | O(n) |
| Path query / update | O(log² n) — log chains × log per segment-tree op |
| Subtree query / update | O(log n) — one contiguous range |

### Query pattern

While `head[u] != head[v]`, jump the node whose chain head is deeper to `parent[head[...]]`, combining the segment `[pos[head], pos[node]]`. When both are in the same chain, combine the remaining segment.

For **edge weights**, store each edge's weight at its lower endpoint and skip the LCA itself in the final segment.

### When to use

Path sum/max/assign with updates, subtree updates combined with path queries, LCA for free. Alternatives: link-cut trees (O(log n) amortized, harder), or Euler tour if updates are subtree-only.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct SegTree {                    // max segment tree with point update
    int n; vector<long long> t;
    explicit SegTree(int n) : n(n), t(2 * n, LLONG_MIN / 4) {}
    void update(int i, long long v) {
        for (t[i += n] = v, i >>= 1; i; i >>= 1) t[i] = max(t[2*i], t[2*i+1]);
    }
    long long query(int l, int r) const {           // inclusive
        long long res = LLONG_MIN / 4;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res = max(res, t[l++]);
            if (r & 1) res = max(res, t[--r]);
        }
        return res;
    }
};

struct HLD {
    int n, timer = 0;
    vector<vector<int>> g;
    vector<int> parent, depth, heavy, head, pos, sz;
    SegTree seg;

    explicit HLD(int n) : n(n), g(n), parent(n, -1), depth(n, 0),
                          heavy(n, -1), head(n), pos(n), sz(n, 1), seg(n) {}
    void addEdge(int a, int b) { g[a].push_back(b); g[b].push_back(a); }

    int dfsSize(int v, int p) {
        parent[v] = p;
        int maxSub = 0;
        for (int to : g[v]) if (to != p) {
            depth[to] = depth[v] + 1;
            int s = dfsSize(to, v);
            sz[v] += s;
            if (s > maxSub) { maxSub = s; heavy[v] = to; }
        }
        return sz[v];
    }
    void decompose(int v, int h) {
        head[v] = h;
        pos[v] = timer++;
        if (heavy[v] != -1) decompose(heavy[v], h);          // heavy child keeps the chain
        for (int to : g[v])
            if (to != parent[v] && to != heavy[v]) decompose(to, to);
    }
    void build(int root = 0) { dfsSize(root, -1); decompose(root, root); }

    void setValue(int v, long long value) { seg.update(pos[v], value); }

    long long queryPath(int u, int v) {                      // max over nodes on u..v
        long long res = LLONG_MIN / 4;
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) swap(u, v);
            res = max(res, seg.query(pos[head[u]], pos[u]));
            u = parent[head[u]];
        }
        if (depth[u] > depth[v]) swap(u, v);
        return max(res, seg.query(pos[u], pos[v]));
    }
    long long querySubtree(int v) { return seg.query(pos[v], pos[v] + sz[v] - 1); }
};

int main() {
    int n = 7;
    HLD h(n);
    h.addEdge(0,1); h.addEdge(0,2); h.addEdge(1,3);
    h.addEdge(1,4); h.addEdge(2,5); h.addEdge(4,6);
    h.build(0);

    vector<long long> val = {5, 3, 8, 1, 9, 2, 7};
    for (int v = 0; v < n; ++v) h.setValue(v, val[v]);

    cout << h.queryPath(3, 6) << '\n';       // max on 3-1-4-6 = 9
    cout << h.queryPath(3, 5) << '\n';       // max on 3-1-0-2-5 = 8
    cout << h.querySubtree(1) << '\n';       // max in subtree of 1 = 9
    h.setValue(3, 100);
    cout << h.queryPath(3, 5) << '\n';       // 100
}
```
`,
};

export default topic;
