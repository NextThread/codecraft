import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "euler-path",
  title: "Euler Path / Circuit",
  description: "Existence conditions and Hierholzer's algorithm for using every edge once.",
  readingTime: 6,
  content: `

# Euler Path / Circuit

## Theory

An **Euler path** uses every edge exactly once; an **Euler circuit** is one that starts and ends at the same vertex.

### Existence

**Undirected** (all edges in one connected component):
- Circuit ⇔ every vertex has **even** degree.
- Path ⇔ exactly **two** vertices have odd degree (start and end there).

**Directed**:
- Circuit ⇔ \`in(v) == out(v)\` for all \`v\`, and the graph is connected when directions are ignored (on vertices with edges).
- Path ⇔ one vertex with \`out − in = 1\` (start), one with \`in − out = 1\` (end), all others balanced.

Isolated vertices are ignored. Compare with a **Hamiltonian** path (every *vertex* once) which is NP-hard — Euler is linear.

### Hierholzer's algorithm — O(V + E)

Walk greedily, consuming edges (\`used[]\` for undirected pairs, or an iterator per vertex to avoid rescanning). When stuck, pop the vertex into the output. Reverse the output at the end. Use an **iterative** version to survive \`10^5\`+ edges.

### Applications

De Bruijn sequences, genome assembly, "mail carrier" / Chinese postman (pair up odd vertices with shortest paths), reconstructing a word from domino pieces.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// directed Euler path/circuit via iterative Hierholzer; empty if none
vector<int> eulerDirected(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> g(n);
    vector<int> outdeg(n, 0), indeg(n, 0);
    for (auto [u, v] : edges) { g[u].push_back(v); ++outdeg[u]; ++indeg[v]; }

    int start = -1, plusOne = 0, minusOne = 0;
    for (int v = 0; v < n; ++v) {
        int d = outdeg[v] - indeg[v];
        if (d == 1) { ++plusOne; start = v; }
        else if (d == -1) ++minusOne;
        else if (d != 0) return {};
        if (start == -1 && outdeg[v] > 0) start = v;
    }
    if (plusOne > 1 || minusOne > 1) return {};
    if (start == -1) return {};

    vector<int> it(n, 0), st{start}, path;
    while (!st.empty()) {
        int u = st.back();
        if (it[u] < (int)g[u].size()) st.push_back(g[u][it[u]++]);
        else { path.push_back(u); st.pop_back(); }
    }
    if ((int)path.size() != (int)edges.size() + 1) return {};   // disconnected
    reverse(path.begin(), path.end());
    return path;
}

// undirected version, edges consumed by id
vector<int> eulerUndirected(int n, const vector<pair<int,int>>& edges) {
    vector<vector<pair<int,int>>> g(n);
    for (int i = 0; i < (int)edges.size(); ++i) {
        auto [u, v] = edges[i];
        g[u].push_back({v, i});
        g[v].push_back({u, i});
    }
    int start = 0, odd = 0;
    for (int v = 0; v < n; ++v) {
        if (g[v].size() % 2) { ++odd; start = v; }
        else if (!g[start].size() && g[v].size()) start = v;
    }
    if (odd != 0 && odd != 2) return {};
    vector<char> used(edges.size(), 0);
    vector<int> it(n, 0), st{start}, path;
    while (!st.empty()) {
        int u = st.back();
        while (it[u] < (int)g[u].size() && used[g[u][it[u]].second]) ++it[u];
        if (it[u] == (int)g[u].size()) { path.push_back(u); st.pop_back(); }
        else {
            auto [v, id] = g[u][it[u]++];
            used[id] = 1;
            st.push_back(v);
        }
    }
    if ((int)path.size() != (int)edges.size() + 1) return {};
    return path;
}

int main() {
    for (int v : eulerDirected(4, {{0,1},{1,2},{2,0},{0,3}})) cout << v << ' ';
    cout << '\\n';   // 0 1 2 0 3
    for (int v : eulerUndirected(3, {{0,1},{1,2},{2,0}})) cout << v << ' ';
    cout << '\\n';   // a closed walk 0 ... 0
}
\`\`\`
`,
};

export default topic;
