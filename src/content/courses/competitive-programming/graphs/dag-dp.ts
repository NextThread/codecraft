import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dag-dp",
  title: "DAG DP",
  description: "Dynamic programming over the topological order of a directed acyclic graph.",
  readingTime: 8,
  content: `
# DAG DP

## Theory

**DAG DP** is dynamic programming performed on the vertices of a Directed Acyclic Graph, using the topological order as the order of computation. Because a DAG has no cycles, we can always process vertices so that every predecessor (or successor) of a vertex is processed before it, which makes the recurrence well-defined and free of circular dependencies.

### Core idea

1. Build the graph and compute a topological order (via Kahn's algorithm or DFS post-order reversal).
2. Define \`dp[v]\` as the answer restricted to paths ending (or starting) at \`v\`.
3. Process vertices in topological order, relaxing/combining \`dp[v]\` into all outgoing (or incoming) neighbors.
4. The final answer is typically \`max/min/sum\` over all \`dp[v]\`.

This generalizes plain array DP: an array \`a[0..n-1]\` where \`dp[i]\` depends on \`dp[j]\` for \`j < i\` is literally DP on the DAG whose edges go from smaller to larger indices. Longest Increasing Subsequence, longest path in a DAG, counting paths, and many "ordering" problems reduce to DAG DP.

### Why it works

Topological order guarantees an evaluation order in which every dependency of \`dp[v]\` has already been finalized when we compute \`dp[v]\`. This turns a potentially exponential search over all paths into a linear pass with O(1) or O(deg) work per vertex.

### Key observations

- Any acyclic dependency structure (not just literal graphs) can be modeled as a DAG and solved this way.
- Longest/shortest path in a DAG is solvable in O(V+E), unlike general graphs which need Dijkstra/Bellman-Ford for shortest paths.
- Counting the number of paths, or number of ways, between nodes is a direct sum-based DAG DP.
- If the DAG is implicit (e.g., states in a grid where you can only move right/down), you don't need to build it explicitly — natural iteration order already respects topological order.
- Memoized recursion (top-down DFS with memo) computes the same values without explicitly building a topological order, and is often simpler to write.

### Complexity

O(V + E) time and O(V) extra space for dp values, plus O(V) for the topological order.

### When to use

- Longest/shortest path in a DAG.
- Counting paths or ways to reach a state under acyclic transitions.
- Any "process items with acyclic precedence constraints and combine values" problem (e.g., project scheduling, course prerequisites with scoring).

### Example

Graph: 1->2, 1->3, 2->4, 3->4, with weights on edges. Topological order: 1,2,3,4.
\`dp[1] = 0\`. Process 1: update dp[2], dp[3]. Process 2: update dp[4]. Process 3: update dp[4] (take max). dp[4] is the longest path ending at 4.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Longest path in a DAG using topological order.
struct DAGDP {
    int n;
    vector<vector<pair<int,int>>> adj; // adj[u] = {v, weight}
    vector<int> indeg;

    DAGDP(int n) : n(n), adj(n), indeg(n, 0) {}

    void addEdge(int u, int v, int w) {
        adj[u].push_back({v, w});
        indeg[v]++;
    }

    // Returns topological order (Kahn's algorithm).
    vector<int> topoOrder() {
        vector<int> order;
        queue<int> q;
        vector<int> deg = indeg;
        for (int i = 0; i < n; i++) if (deg[i] == 0) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (auto [v, w] : adj[u]) {
                if (--deg[v] == 0) q.push(v);
            }
        }
        // If order.size() != n, the graph has a cycle.
        return order;
    }

    // Longest path ending at each vertex, starting dp from 0 at every source.
    vector<long long> longestPaths() {
        vector<int> order = topoOrder();
        vector<long long> dp(n, 0); // dp[v] = longest path ending at v
        for (int u : order) {
            for (auto [v, w] : adj[u]) {
                dp[v] = max(dp[v], dp[u] + w);
            }
        }
        return dp;
    }

    // Number of distinct paths ending at each vertex (mod optional).
    vector<long long> countPaths() {
        vector<int> order = topoOrder();
        vector<long long> ways(n, 0);
        for (int i = 0; i < n; i++) if (indeg[i] == 0) ways[i] = 1; // sources count as 1 path (themselves)
        for (int u : order) {
            for (auto [v, w] : adj[u]) {
                ways[v] += ways[u];
            }
        }
        return ways;
    }
};

int main() {
    int n = 5; // vertices 0..4
    DAGDP g(n);
    g.addEdge(0, 1, 3);
    g.addEdge(0, 2, 2);
    g.addEdge(1, 3, 4);
    g.addEdge(2, 3, 1);
    g.addEdge(3, 4, 5);

    vector<long long> dp = g.longestPaths();
    cout << "Longest path to each vertex:\\n";
    for (int i = 0; i < n; i++) cout << i << ": " << dp[i] << "\\n";

    long long answer = *max_element(dp.begin(), dp.end());
    cout << "Overall longest path: " << answer << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
