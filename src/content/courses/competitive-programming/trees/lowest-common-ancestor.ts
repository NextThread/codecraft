import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "lowest-common-ancestor",
  title: "Lowest Common Ancestor (LCA)",
  description: "Definition and the O(n) / O(log n) approaches.",
  readingTime: 6,
  content: `

# Lowest Common Ancestor (LCA)

## Theory

The **LCA** of nodes \`u\` and \`v\` in a rooted tree is the deepest node that is an ancestor of both.

### Approaches

| Method | Preprocess | Query | Note |
|--------|-----------|-------|------|
| Naive: lift the deeper node one step at a time | O(n) | O(n) | fine for small trees |
| **Binary lifting** | O(n log n) | O(log n) | most used, easy to extend |
| Euler tour + sparse table RMQ | O(n log n) | **O(1)** | best for many queries |
| Tarjan offline (DSU) | O(n α) | offline | all queries known in advance |
| Heavy-light / segment tree | O(n) | O(log n) | comes free with HLD |

### Distance from LCA

\`\`\`
dist(u, v) = depth[u] + depth[v] - 2 * depth[lca(u, v)]
\`\`\`

This single formula solves a huge fraction of tree problems: path lengths, "is w on the path u→v" (\`dist(u,w) + dist(w,v) == dist(u,v)\`), path sums with prefix sums from the root, and k-th node on a path.

### Binary lifting sketch (details in the next topic)

Precompute \`up[k][v]\` = the \`2^k\`-th ancestor of \`v\`. To find the LCA:

1. Lift the deeper node until both depths match.
2. If they coincide, that node is the LCA.
3. Otherwise lift both together from the highest power down while the ancestors differ; the answer is \`up[0][u]\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct LCA {
    int n, LOG;
    vector<vector<int>> up;      // up[k][v] = 2^k-th ancestor
    vector<int> depth;
    const vector<vector<int>>& g;

    LCA(const vector<vector<int>>& g, int root = 0)
        : n(g.size()), LOG(max(1, (int)ceil(log2(max(n, 2))) + 1)),
          up(LOG, vector<int>(g.size(), root)), depth(g.size(), 0), g(g) {
        dfs(root, root);
        for (int k = 1; k < LOG; ++k)
            for (int v = 0; v < n; ++v)
                up[k][v] = up[k-1][ up[k-1][v] ];
    }
    void dfs(int v, int p) {                    // iterative to avoid deep recursion
        stack<pair<int,int>> st;
        st.push({v, p});
        vector<bool> vis(n, false);
        while (!st.empty()) {
            auto [u, par] = st.top(); st.pop();
            if (vis[u]) continue;
            vis[u] = true;
            up[0][u] = par;
            for (int to : g[u])
                if (!vis[to]) { depth[to] = depth[u] + 1; st.push({to, u}); }
        }
    }
    int lift(int v, int k) const {
        for (int b = 0; b < LOG; ++b)
            if (k >> b & 1) v = up[b][v];
        return v;
    }
    int lca(int u, int v) const {
        if (depth[u] < depth[v]) swap(u, v);
        u = lift(u, depth[u] - depth[v]);
        if (u == v) return u;
        for (int k = LOG - 1; k >= 0; --k)
            if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }
        return up[0][u];
    }
    int dist(int u, int v) const { return depth[u] + depth[v] - 2 * depth[lca(u, v)]; }
};

int main() {
    int n = 9;
    vector<vector<int>> g(n);
    auto addEdge = [&](int a, int b) { g[a].push_back(b); g[b].push_back(a); };
    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(1,4);
    addEdge(2,5); addEdge(4,6); addEdge(4,7); addEdge(5,8);

    LCA t(g, 0);
    cout << t.lca(3, 6) << '\\n';     // 1
    cout << t.lca(6, 8) << '\\n';     // 0
    cout << t.dist(3, 7) << '\\n';    // 3
}
\`\`\`
`,
};

export default topic;
