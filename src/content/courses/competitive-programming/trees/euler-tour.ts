import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "euler-tour",
  title: "Euler Tour",
  description: "Flattening a tree into an array for subtree and path queries.",
  readingTime: 6,
  content: `

# Euler Tour

## Theory

An **Euler tour** flattens a tree into an array so that tree queries become *range* queries on that array — letting you use Fenwick trees, segment trees or sparse tables.

### Flavour 1 — entry/exit times (subtree ranges)

During a DFS record \`tin[v]\` when entering and \`tout[v]\` when leaving:

- The subtree of \`v\` occupies exactly the contiguous range \`[tin[v], tout[v]]\`.
- \`u\` is an ancestor of \`v\` ⟺ \`tin[u] <= tin[v] && tout[v] <= tout[u]\` — an **O(1) ancestor test**.

This gives:
- subtree sum / min / max / count with a segment tree or BIT,
- "add x to the whole subtree" with a lazy segment tree or difference array,
- distinct colors in a subtree (with small-to-large or Mo's algorithm on the tour).

### Flavour 2 — visit list of length 2n − 1 (LCA by RMQ)

Append the node every time you touch it (before and after each child). Then

\`\`\`
lca(u, v) = the node of minimum depth in the tour between first[u] and first[v]
\`\`\`

which is a **range-minimum query** — O(1) with a sparse table after O(n log n) preprocessing.

### Flavour 3 — edge tour (path sums)

Add \`+w\` at \`tin[v]\` and \`−w\` at \`tout[v]+1\`; a prefix sum then gives the root-to-node distance, so path updates/queries reduce to range operations.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct EulerTour {
    int n, timer = 0;
    vector<int> tin, tout, flat;        // flat[tin[v]] = v
    vector<int> tour, depthTour, first; // for LCA by RMQ
    const vector<vector<int>>& g;

    EulerTour(const vector<vector<int>>& g, int root = 0)
        : n(g.size()), tin(g.size()), tout(g.size()), flat(g.size()),
          first(g.size(), -1), g(g) {
        dfs(root, root, 0);
    }
    void dfs(int v, int p, int d) {
        tin[v] = timer;
        flat[timer] = v;
        ++timer;
        first[v] = tour.size();
        tour.push_back(v); depthTour.push_back(d);
        for (int to : g[v])
            if (to != p) {
                dfs(to, v, d + 1);
                tour.push_back(v); depthTour.push_back(d);   // back at v
            }
        tout[v] = timer - 1;
    }
    bool isAncestor(int u, int v) const {
        return tin[u] <= tin[v] && tout[v] <= tout[u];
    }
    int lcaBruteRmq(int u, int v) const {                    // replace by a sparse table
        int l = first[u], r = first[v];
        if (l > r) swap(l, r);
        int best = l;
        for (int i = l; i <= r; ++i) if (depthTour[i] < depthTour[best]) best = i;
        return tour[best];
    }
};

int main() {
    int n = 7;
    vector<vector<int>> g(n);
    auto add = [&](int a, int b) { g[a].push_back(b); g[b].push_back(a); };
    add(0,1); add(0,2); add(1,3); add(1,4); add(2,5); add(4,6);

    EulerTour et(g, 0);
    for (int v = 0; v < n; ++v)
        cout << "node " << v << ": [" << et.tin[v] << ", " << et.tout[v] << "]\\n";

    cout << boolalpha << et.isAncestor(1, 6) << ' ' << et.isAncestor(2, 6) << '\\n'; // true false
    cout << et.lcaBruteRmq(3, 6) << '\\n';    // 1

    // subtree sum using the flattened array + prefix sums
    vector<long long> value(n, 1), flatVal(n);
    for (int v = 0; v < n; ++v) flatVal[et.tin[v]] = value[v];
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; ++i) pre[i+1] = pre[i] + flatVal[i];
    int v = 1;
    cout << "subtree size of 1 = " << pre[et.tout[v] + 1] - pre[et.tin[v]] << '\\n';  // 4
}
\`\`\`
`,
};

export default topic;
