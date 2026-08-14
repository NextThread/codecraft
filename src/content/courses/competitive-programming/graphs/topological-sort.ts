import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "topological-sort",
  title: "Topological Sort",
  description: "Kahn's algorithm, DFS postorder, lexicographic order, and DAG DP.",
  readingTime: 6,
  content: `

# Topological Sort

## Theory

A **topological order** of a directed graph lists every vertex before all of its successors. It exists **iff the graph is a DAG**.

### Kahn's algorithm (BFS, indegrees)

1. Compute \`indeg[v]\`.
2. Push all vertices with \`indeg == 0\`.
3. Pop \`u\`, append to order, decrement neighbours, push those hitting 0.

If the produced order has fewer than \`n\` vertices, a **cycle** exists — so Kahn doubles as cycle detection. O(V + E).

Use a **priority_queue** instead of a queue for the **lexicographically smallest** order. The number of rounds equals the longest path length + 1 (level = earliest time a task can start).

### DFS variant

Reverse DFS postorder is a topological order. Shorter to write, but recursion depth and cycle reporting need care.

### Uses

- **DAG DP**: longest/shortest path, counting paths, DP over states in dependency order.
- Build systems, course prerequisites, dependency resolution.
- Uniqueness: the order is unique iff the DAG has a Hamiltonian path — i.e. every Kahn step has exactly one zero-indegree vertex.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Kahn: returns empty vector if a cycle exists
vector<int> topoSort(const vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> indeg(n, 0), order;
    for (int u = 0; u < n; ++u) for (int v : adj[u]) ++indeg[v];
    priority_queue<int, vector<int>, greater<>> pq;   // lexicographically smallest
    for (int u = 0; u < n; ++u) if (!indeg[u]) pq.push(u);
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        order.push_back(u);
        for (int v : adj[u]) if (--indeg[v] == 0) pq.push(v);
    }
    return (int)order.size() == n ? order : vector<int>{};
}

// DAG DP: longest path length (in edges) using the topological order
int longestPath(const vector<vector<int>>& adj) {
    auto order = topoSort(adj);
    vector<int> dp(adj.size(), 0);
    int best = 0;
    for (int u : order)
        for (int v : adj[u]) { dp[v] = max(dp[v], dp[u] + 1); best = max(best, dp[v]); }
    return best;
}

int main() {
    vector<vector<int>> dag = {{1,2},{3},{3},{4},{}};
    for (int u : topoSort(dag)) cout << u << ' ';    // 0 1 2 3 4
    cout << '\\n';
    cout << longestPath(dag) << '\\n';               // 3

    vector<vector<int>> cyc = {{1},{2},{0}};
    cout << topoSort(cyc).empty() << '\\n';          // 1 (cycle)
}
\`\`\`
`,
};

export default topic;
