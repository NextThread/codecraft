import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dfs",
  title: "DFS",
  description: "Depth-first search, entry/exit times, edge classification, iterative version.",
  readingTime: 7,
  content: `

# DFS

## Theory

**Depth-first search** goes as deep as possible before backtracking. O(V + E) with an adjacency list.

\`\`\`text
dfs(u): visited[u] = true
        for v in adj[u]: if !visited[v]: dfs(v)
\`\`\`

### Timestamps

Record \`tin[u]\` on entry and \`tout[u]\` on exit. Then \`u\` is an ancestor of \`v\` iff \`tin[u] < tin[v] && tout[v] < tout[u]\` — an O(1) ancestor test, and the basis of Euler tour + segment tree techniques.

### Edge classification (directed)

- **Tree edge** — to an unvisited node.
- **Back edge** — to a node still on the stack (state = 1) ⇒ **cycle**.
- **Forward / cross edge** — to an already finished node (state = 2).

In undirected graphs only tree and back edges exist (ignoring the parent edge).

### What DFS gives you

Connected components, cycle detection, topological sort (reverse postorder), bridges and articulation points, SCC (Tarjan/Kosaraju), Euler tour, subtree aggregates, flood fill, backtracking search.

### Recursion depth

Contest graphs with \`10^5\`+ nodes can overflow the stack on some judges. Either raise the stack or use the **explicit-stack iterative** version below.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<int> visited, tin, tout;
int timer_ = 0;

void dfs(int u) {
    visited[u] = 1;
    tin[u] = timer_++;
    for (int v : adj[u]) if (!visited[v]) dfs(v);
    tout[u] = timer_++;
}

// iterative DFS (preorder), stack-safe
vector<int> dfsIterative(int src, int n) {
    vector<int> vis(n, 0), order;
    vector<int> st{src};
    while (!st.empty()) {
        int u = st.back(); st.pop_back();
        if (vis[u]) continue;
        vis[u] = 1;
        order.push_back(u);
        for (int i = adj[u].size() - 1; i >= 0; --i)
            if (!vis[adj[u][i]]) st.push_back(adj[u][i]);
    }
    return order;
}

int main() {
    int n = 6;
    adj.assign(n, {});
    auto add = [&](int u, int v){ adj[u].push_back(v); adj[v].push_back(u); };
    add(0,1); add(0,2); add(1,3); add(2,4); add(4,5);

    visited.assign(n, 0); tin.assign(n, 0); tout.assign(n, 0);
    dfs(0);
    for (int u = 0; u < n; ++u) cout << u << ": [" << tin[u] << ',' << tout[u] << "]\\n";

    auto isAncestor = [&](int u, int v){ return tin[u] < tin[v] && tout[v] < tout[u]; };
    cout << isAncestor(2, 5) << ' ' << isAncestor(1, 5) << '\\n';   // 1 0

    for (int u : dfsIterative(0, n)) cout << u << ' ';              // 0 1 3 2 4 5
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
