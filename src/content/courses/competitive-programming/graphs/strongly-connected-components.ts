import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "strongly-connected-components",
  title: "Strongly Connected Components",
  description: "Kosaraju and Tarjan, condensation DAG, 2-SAT connection.",
  readingTime: 7,
  content: `

# Strongly Connected Components

## Theory

In a **directed** graph, an SCC is a maximal set of vertices where every vertex reaches every other. Contracting each SCC gives the **condensation**, which is always a **DAG**.

### Kosaraju (two passes, easiest to remember)

1. DFS on \`G\`, push vertices onto a stack on exit (reverse postorder).
2. DFS on the **reversed** graph, popping from the stack; each traversal is one SCC.

O(V + E), needs both \`adj\` and \`radj\`. Components come out in **topological order of the condensation**.

### Tarjan (one pass)

Track \`low[u]\` and a stack of the current path; when \`low[u] == tin[u]\`, pop an SCC. One DFS, no reversed graph. Components come out in **reverse** topological order.

### What SCCs are used for

- **Condensation DP**: longest path, reachability counts, minimum vertices to reach everything (count sources).
- **2-SAT**: build the implication graph; the formula is satisfiable iff no variable has \`x\` and \`¬x\` in the same SCC. Assign by comparing component indices.
- Making a graph strongly connected: answer is \`max(sources, sinks)\` on the condensation (1 if it is already a single SCC).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Kosaraju: returns comp[] ids in topological order of the condensation
vector<int> kosaraju(const vector<vector<int>>& adj) {
    int n = adj.size();
    vector<vector<int>> radj(n);
    for (int u = 0; u < n; ++u) for (int v : adj[u]) radj[v].push_back(u);

    vector<char> vis(n, 0);
    vector<int> order;
    function<void(int)> dfs1 = [&](int u) {
        vis[u] = 1;
        for (int v : adj[u]) if (!vis[v]) dfs1(v);
        order.push_back(u);
    };
    for (int u = 0; u < n; ++u) if (!vis[u]) dfs1(u);

    vector<int> comp(n, -1);
    int c = 0;
    function<void(int)> dfs2 = [&](int u) {
        comp[u] = c;
        for (int v : radj[u]) if (comp[v] == -1) dfs2(v);
    };
    for (int i = n - 1; i >= 0; --i)
        if (comp[order[i]] == -1) { dfs2(order[i]); ++c; }
    return comp;
}

// condensation DAG (deduplicated edges)
vector<vector<int>> condensation(const vector<vector<int>>& adj, const vector<int>& comp) {
    int c = *max_element(comp.begin(), comp.end()) + 1;
    vector<set<int>> s(c);
    for (int u = 0; u < (int)adj.size(); ++u)
        for (int v : adj[u]) if (comp[u] != comp[v]) s[comp[u]].insert(comp[v]);
    vector<vector<int>> dag(c);
    for (int i = 0; i < c; ++i) dag[i].assign(s[i].begin(), s[i].end());
    return dag;
}

int main() {
    // 0->1->2->0 is one SCC, 3->4->3 another, edge 2->3
    vector<vector<int>> adj = {{1},{2},{0,3},{4},{3}};
    auto comp = kosaraju(adj);
    for (int c : comp) cout << c << ' ';        // 0 0 0 1 1
    cout << '\\n';
    auto dag = condensation(adj, comp);
    for (int i = 0; i < (int)dag.size(); ++i) {
        cout << i << " ->";
        for (int v : dag[i]) cout << ' ' << v;
        cout << '\\n';
    }
}
\`\`\`
`,
};

export default topic;
