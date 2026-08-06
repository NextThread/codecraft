import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-lifting",
  title: "Binary Lifting",
  description: "Jump pointers for ancestors, path aggregates and k-th ancestor.",
  readingTime: 6,
  content: `

# Binary Lifting

## Theory

**Binary lifting** precomputes, for every node, its ancestor \`2^k\` steps up:

\`\`\`
up[0][v] = parent(v)
up[k][v] = up[k-1][ up[k-1][v] ]
\`\`\`

Because any integer \`k\` is a sum of distinct powers of two, the **k-th ancestor** is found by following at most \`log n\` jumps.

- Preprocess: **O(n log n)** time and memory
- k-th ancestor / LCA query: **O(log n)**

### What you can carry along the jumps

Store any *associative* value per jump, e.g. \`mx[k][v]\` = maximum edge weight on the path from \`v\` to \`up[k][v]\`. Then a path query \`u → v\` splits at the LCA and combines O(log n) precomputed blocks:

- maximum / minimum edge on a path
- sum of weights (or use root prefix sums)
- number of marked nodes

### Beyond trees

Binary lifting works on any **functional graph** (each node has exactly one successor): "where am I after k steps?" — successor games, permutation powers, sparse doubling on DP transitions.

### Alternatives

- Euler tour + sparse table for O(1) LCA.
- Heavy-light decomposition when you also need updates.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct BinaryLifting {
    int n, LOG;
    vector<vector<int>> up, mx;      // ancestors and max edge weight on the jump
    vector<int> depth;

    BinaryLifting(int n, const vector<vector<pair<int,int>>>& g, int root = 0)
        : n(n), LOG(max(1, (int)ceil(log2(max(n, 2))) + 1)),
          up(LOG, vector<int>(n, root)), mx(LOG, vector<int>(n, 0)), depth(n, 0) {
        // iterative DFS
        vector<bool> vis(n, false);
        stack<int> st; st.push(root);
        up[0][root] = root;
        vis[root] = true;
        while (!st.empty()) {
            int u = st.top(); st.pop();
            for (auto [v, w] : g[u])
                if (!vis[v]) {
                    vis[v] = true;
                    depth[v] = depth[u] + 1;
                    up[0][v] = u;
                    mx[0][v] = w;
                    st.push(v);
                }
        }
        for (int k = 1; k < LOG; ++k)
            for (int v = 0; v < n; ++v) {
                up[k][v] = up[k-1][ up[k-1][v] ];
                mx[k][v] = max(mx[k-1][v], mx[k-1][ up[k-1][v] ]);
            }
    }
    int kthAncestor(int v, int k) const {
        for (int b = 0; b < LOG && v != -1; ++b)
            if (k >> b & 1) v = up[b][v];
        return v;
    }
    int lca(int u, int v) const {
        if (depth[u] < depth[v]) swap(u, v);
        int diff = depth[u] - depth[v];
        for (int b = 0; b < LOG; ++b) if (diff >> b & 1) u = up[b][u];
        if (u == v) return u;
        for (int k = LOG - 1; k >= 0; --k)
            if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }
        return up[0][u];
    }
    // maximum edge weight on the path u..v
    int maxEdge(int u, int v) const {
        int a = lca(u, v), res = 0;
        for (int node : {u, v}) {
            int d = depth[node] - depth[a], cur = node;
            for (int b = 0; b < LOG; ++b)
                if (d >> b & 1) { res = max(res, mx[b][cur]); cur = up[b][cur]; }
        }
        return res;
    }
};

int main() {
    int n = 7;
    vector<vector<pair<int,int>>> g(n);
    auto add = [&](int a, int b, int w) { g[a].push_back({b,w}); g[b].push_back({a,w}); };
    add(0,1,4); add(0,2,2); add(1,3,7); add(1,4,1); add(2,5,9); add(4,6,3);

    BinaryLifting bl(n, g, 0);
    cout << bl.kthAncestor(6, 2) << '\\n';   // 1
    cout << bl.lca(3, 6) << '\\n';           // 1
    cout << bl.maxEdge(3, 5) << '\\n';       // 9
}
\`\`\`
`,
};

export default topic;
