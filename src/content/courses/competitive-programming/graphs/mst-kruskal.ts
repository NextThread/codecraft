import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mst-kruskal",
  title: "Minimum Spanning Tree (Kruskal)",
  description: "Sort edges, union with DSU, and the second-best / bottleneck extensions.",
  readingTime: 6,
  content: `

# Minimum Spanning Tree (Kruskal)

## Theory

**Kruskal:** sort all edges by weight ascending, then add each edge whose endpoints are in different DSU components. Stop after \`V − 1\` edges.

Complexity **O(E log E)** — dominated by sorting; DSU adds an inverse-Ackermann factor.

Correctness: the **cycle property** (the heaviest edge of any cycle is not needed) plus the cut property.

### Why Kruskal is the CP favourite

- Works directly on an **edge list** — matches the usual input format.
- Trivially gives a spanning **forest** when the graph is disconnected (\`components > 1\`).
- **Maximum spanning tree** by sorting descending.
- **Bottleneck / minimax queries**: process edges in order and answer "when do u and v get connected?" — this is offline dynamic connectivity, and the value is the minimax path weight.
- **Kruskal reconstruction tree (KRT)**: create a new node per merge with the edge weight; ancestors then answer minimax path queries in O(log n).
- **Second-best MST**: for every non-tree edge \`e\`, replace the maximum edge on the tree path between its endpoints (binary lifting) and take the smallest increase.

Prim is preferable only for dense/implicit graphs.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct DSU {
    vector<int> p, sz;
    int comps;
    explicit DSU(int n) : p(n), sz(n, 1), comps(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        p[b] = a; sz[a] += sz[b]; --comps;
        return true;
    }
};

struct Edge { int w, u, v; };

// returns {total weight (-1 if disconnected), chosen edges}
pair<ll, vector<Edge>> kruskal(int n, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a.w < b.w; });
    DSU dsu(n);
    ll total = 0;
    vector<Edge> tree;
    for (auto& e : edges)
        if (dsu.unite(e.u, e.v)) { total += e.w; tree.push_back(e); }
    return {dsu.comps == 1 ? total : -1, tree};
}

// bottleneck: smallest possible maximum edge on a path s -> t
int bottleneck(int n, vector<Edge> edges, int s, int t) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a.w < b.w; });
    DSU dsu(n);
    for (auto& e : edges) {
        dsu.unite(e.u, e.v);
        if (dsu.find(s) == dsu.find(t)) return e.w;
    }
    return -1;
}

int main() {
    vector<Edge> e = {{1,0,1},{4,0,2},{2,1,2},{5,2,3},{3,1,3}};
    auto [total, tree] = kruskal(4, e);
    cout << total << '\\n';                                       // 6
    for (auto& x : tree) cout << x.u << '-' << x.v << '(' << x.w << ") ";
    cout << '\\n';
    cout << bottleneck(4, e, 0, 3) << '\\n';                      // 3
}
\`\`\`
`,
};

export default topic;
