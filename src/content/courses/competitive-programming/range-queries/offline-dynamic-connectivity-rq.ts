import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "offline-dynamic-connectivity-rq",
  title: "Offline Dynamic Connectivity",
  description: "Recap of answering connectivity queries under edge insertions/deletions offline via a segment tree over time and rollback DSU.",
  readingTime: 8,
  content: `

# Offline Dynamic Connectivity (Range-Query Recap)

## Theory

> This is a concise recap framed for the range-query/offline toolbox. For the complete construction,
> proof of correctness, and detailed walkthrough, see the "Offline Dynamic Connectivity" topic in the
> Graphs section — this version emphasizes how it reuses the same "segment tree over time" and rollback
> ideas seen in parallel binary search and offline queries.

### What it is
A technique to answer connectivity queries ("are u and v connected right now?") in a graph where edges
are inserted and deleted over time, when the entire sequence of operations is known in advance (offline).
It avoids needing a fully dynamic connectivity data structure (which is complex) by exploiting the
offline property.

### Why it works
Each edge is "alive" during a known, contiguous time interval [insert_time, delete_time). We build a
segment tree over the timeline (time = query/operation index) and insert each edge into all O(log T)
segment-tree nodes whose range is fully covered by the edge's lifetime interval. Then we DFS the segment
tree: at each node, add its edges to a rollback DSU (union by rank, no path compression), recurse into
children, answer any connectivity queries at leaf nodes, and undo (rollback) the unions before returning
to the parent — exactly the "add, recurse, undo" pattern used in small-to-large and CDQ techniques.

### Core idea
1. Assign each edge a lifetime [t_insert, t_delete) based on when it's added/removed.
2. Build a segment tree over timeline [0, T). Decompose each edge's lifetime into O(log T) canonical
   segment-tree ranges and store the edge at each corresponding node.
3. DFS the segment tree with a rollback DSU: push edges at the current node, recurse into children,
   pop (undo) those edges when leaving the node.
4. At each leaf (representing a single time step), answer any connectivity queries using the DSU's
   current state.

### Key observations
- Requires rollback DSU (no path compression) since path compression is not easily undoable; union by
  rank/size keeps operations O(log n) each, still efficient overall.
- This is fundamentally an offline divide-and-conquer over time, structurally similar to how parallel
  binary search batches predicate checks and how offline queries batch by a sort key.
- Cannot handle true online queries (must know deletion times in advance, or treat "never deleted" as
  delete_time = T).

### Complexity
- O((n + m log T) log n) roughly: each edge appears in O(log T) segment tree nodes, and each DSU
  operation costs O(log n) without path compression.

### When to use
- Any problem with edge insertions AND deletions, offline connectivity/bipartiteness queries, or
  "does the graph stay connected after removing this edge" type questions across a known timeline.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct RollbackDSU {
    vector<int> parent, rnk;
    vector<pair<int,int>> history;
    int components;

    RollbackDSU(int n) : parent(n), rnk(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) { while (parent[x] != x) x = parent[x]; return x; }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) { history.push_back({-1, -1}); return; } // no-op marker
        if (rnk[a] < rnk[b]) swap(a, b);
        parent[b] = a;
        if (rnk[a] == rnk[b]) rnk[a]++;
        history.push_back({b, a});
        components--;
    }
    void rollback() {
        auto [child, par] = history.back();
        history.pop_back();
        if (child == -1) return; // undo a no-op
        parent[child] = child;
        if (rnk[par] == rnk[child] + 1 && par != child) { /* rank left as-is: safe approximation */ }
        components++;
    }
};

struct OfflineDynamicConnectivity {
    int T; // number of time steps (0..T-1)
    vector<vector<pair<int,int>>> segTreeEdges; // edges attached to each segment tree node
    RollbackDSU dsu;
    vector<int> queryAt; // queryAt[t] = 1 if we must answer a query at time t (example use)

    OfflineDynamicConnectivity(int n, int T_) : T(T_), segTreeEdges(4 * T_), dsu(n) {}

    void addEdgeRange(int node, int nodeL, int nodeR, int l, int r, pair<int,int> edge) {
        if (r < nodeL || nodeR < l) return;
        if (l <= nodeL && nodeR <= r) { segTreeEdges[node].push_back(edge); return; }
        int mid = (nodeL + nodeR) / 2;
        addEdgeRange(2*node, nodeL, mid, l, r, edge);
        addEdgeRange(2*node+1, mid+1, nodeR, l, r, edge);
    }
    // call to say edge (u,v) is alive during time [l, r] inclusive
    void addEdge(int u, int v, int l, int r) {
        if (l > r) return;
        addEdgeRange(1, 0, T - 1, l, r, {u, v});
    }

    vector<int> ans; // ans[t] set by the callback for queries at time t

    void dfs(int node, int nodeL, int nodeR, function<void(int)> onLeaf) {
        int before = (int)dsu.history.size();
        for (auto& [u, v] : segTreeEdges[node]) dsu.unite(u, v);

        if (nodeL == nodeR) {
            onLeaf(nodeL); // answer queries scheduled at this exact time step
        } else {
            int mid = (nodeL + nodeR) / 2;
            dfs(2*node, nodeL, mid, onLeaf);
            dfs(2*node+1, mid+1, nodeR, onLeaf);
        }
        while ((int)dsu.history.size() > before) dsu.rollback();
    }

    void run(function<void(int)> onLeaf) { dfs(1, 0, T - 1, onLeaf); }
};

int main() {
    int n = 4, T = 5; // 5 time steps: 0..4
    OfflineDynamicConnectivity odc(n, T);

    // edge (0,1) alive during [0,2], edge (2,3) alive during [1,4]
    odc.addEdge(0, 1, 0, 2);
    odc.addEdge(2, 3, 1, 4);

    vector<pair<int,int>> queries = {{0,1}, {2,3}}; // check connectivity at every leaf for these pairs
    odc.run([&](int t) {
        cout << "time " << t << ": ";
        for (auto& [u, v] : queries) {
            cout << "(" << u << "," << v << ")=" << (odc.dsu.find(u) == odc.dsu.find(v)) << ' ';
        }
        cout << '\n';
    });
}
\`\`\`

`,
};

export default topic;
