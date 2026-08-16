import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "parallel-binary-search",
  title: "Parallel Binary Search",
  description: "Binary search the answer for many queries simultaneously by advancing all searches together, one offline sweep pass at a time.",
  readingTime: 9,
  content: `

# Parallel Binary Search

## Theory

### What it is
Parallel binary search answers many "find the smallest/largest x such that predicate(query, x) holds"
queries at once. Instead of running an independent O(log(range)) binary search per query — each needing
its own expensive O(f(n)) check — it runs all binary searches in lockstep: at each of the O(log(range))
rounds, it batches together every query currently at the same "check this midpoint" step, verifies all
of them with a single shared offline sweep, then narrows each query's search interval based on the
result.

### Why it works
If checking a single (query, mid) pair costs O(f(n)) and doing it independently per query costs
O(q * log(range) * f(n)), we can instead group all queries whose current binary-search midpoint would
require the same kind of expensive check (e.g., "process events up to time mid and check DSU
connectivity") into one combined sweep. Processing events up to the maximum needed mid once, while
checking each query's predicate as its own threshold is passed, turns q separate O(f(n)) checks into a
single O(f(n)) pass shared among all of them per round.

### Core idea
1. For each query, maintain \`lo\`, \`hi\` bounds on the answer (standard binary search state).
2. Repeat O(log(range)) rounds:
   - For each query still active (lo < hi), compute mid = (lo + hi) / 2.
   - Group queries by mid conceptually by doing ONE offline sweep over "time"/"value" from 0 up to the
     maximum mid, applying updates as the sweep passes each threshold, and evaluating each query's
     predicate exactly when the sweep reaches that query's mid (often via a DSU, BIT, or similar
     structure that supports incremental application of events in sorted order).
   - Update each query's lo/hi based on whether its predicate was true or false at mid.
   - Reset/rebuild the shared data structure for the next round (or design it to be resettable/rollback-
     capable, e.g., DSU with rollback instead of path compression).
3. After O(log(range)) rounds, lo (or hi) holds each query's answer.

### Key observations
- Requires the predicate to be monotonic in the search variable (classic binary search precondition) —
  and requires all queries to be known offline in advance.
- Best used when checking a single (query, mid) pair naively is expensive, but processing "events up to
  threshold T" incrementally for ALL queries at once is cheap (e.g., adding edges to a DSU one at a time
  is O(alpha(n)) each, so processing up to any mid is proportional to mid, and doing so once per round
  for the whole batch is far cheaper than doing it separately per query).
- Very common in "minimize the maximum edge weight such that some connectivity/matching property holds"
  problems, offline dynamic connectivity, and k-th smallest style problems on structures without direct
  order statistics support.
- Rollback DSU (union by rank/size, no path compression, undo via a stack) is the classic companion data
  structure since it lets you add edges for a round, check predicates, then roll back cleanly to reuse
  for the next round with a different mid ordering.

### Complexity
- O(log(range)) rounds, each doing one O((n + q) * f) shared sweep (f = cost of one incremental
  update/check step, e.g., O(alpha(n)) for rollback DSU), giving O((n + q) * f * log(range)) total —
  versus O(q * n * f * log(range)) for naive independent binary searches. This is a factor of q
  improvement in the sweep cost per round.

### When to use
- Many "smallest threshold such that property holds" queries share the same expensive-to-build
  incremental structure (DSU-based connectivity, flow-based feasibility, etc.).
- Classic applications: offline dynamic graph connectivity queries, "minimum bottleneck edge" queries
  for many (u, v) pairs, k-th distinct/order-statistic queries on structures lacking direct support.

### Small example
Given a graph where edges are added one at a time (indexed by time 1..m), and q queries "what is the
earliest time by which u and v become connected?", parallel binary search maintains lo=1, hi=m per
query. Each round, it sweeps time 1..hi_max, unions edges via rollback DSU, and checks each active
query's connectivity exactly at its mid, then rolls back before the next round. After O(log m) rounds
every query's earliest connecting time is found, using O(m log m) total union operations instead of
O(m * q) from naive independent searches.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Rollback DSU: union by size, no path compression, undoable via a history stack
struct RollbackDSU {
    vector<int> parent, sz;
    vector<pair<int,int>> history; // (child_root, parent_root) unions performed, for undo

    RollbackDSU(int n) : parent(n), sz(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        while (parent[x] != x) x = parent[x];
        return x;
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        history.push_back({b, a});
        return true;
    }
    int snapshot() const { return (int)history.size(); }
    void rollbackTo(int checkpoint) {
        while ((int)history.size() > checkpoint) {
            auto [child, par] = history.back();
            history.pop_back();
            sz[par] -= sz[child];
            parent[child] = child;
        }
    }
};

// Parallel binary search: for each query (u, v), find smallest time t such that
// edges[0..t) make u and v connected. edges are added in a fixed given order.
vector<int> parallelBinarySearch(int n, vector<pair<int,int>>& edges,
                                  vector<pair<int,int>>& queries) {
    int m = (int)edges.size();
    int q = (int)queries.size();
    vector<int> lo(q, 0), hi(q, m); // answer in [0, m], m means "never connects"

    bool anyActive = true;
    while (anyActive) {
        anyActive = false;
        // bucket queries by their current mid so we process each mid's prefix once
        vector<vector<int>> queriesAtMid(m + 1);
        for (int i = 0; i < q; i++) {
            if (lo[i] < hi[i]) {
                int mid = (lo[i] + hi[i]) / 2;
                queriesAtMid[mid].push_back(i);
                anyActive = true;
            }
        }
        if (!anyActive) break;

        RollbackDSU dsu(n);
        for (int t = 0; t <= m; t++) {
            for (int qi : queriesAtMid[t]) {
                auto [u, v] = queries[qi];
                bool connected = (dsu.find(u) == dsu.find(v));
                int mid = t;
                if (connected) hi[qi] = mid; else lo[qi] = mid + 1;
            }
            if (t < m) dsu.unite(edges[t].first, edges[t].second);
        }
    }
    vector<int> ans(q);
    for (int i = 0; i < q; i++) ans[i] = lo[i]; // m means never connected
    return ans;
}

int main() {
    int n = 5;
    vector<pair<int,int>> edges = {{0,1}, {1,2}, {3,4}, {2,3}};
    vector<pair<int,int>> queries = {{0, 2}, {0, 4}, {3, 4}};

    auto ans = parallelBinarySearch(n, edges, queries);
    for (int x : ans) cout << x << '\n'; // number of edges needed for connectivity, per query
}
\`\`\`

`,
};

export default topic;
