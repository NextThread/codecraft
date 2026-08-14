import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "cycle-detection",
  title: "Cycle Detection",
  description: "Cycles in directed and undirected graphs, and Floyd's tortoise-hare.",
  readingTime: 6,
  content: `

# Cycle Detection

## Theory

### Directed graph — DFS colours

Keep three states: \`0\` unvisited, \`1\` in the current recursion stack, \`2\` finished. Reaching a state-\`1\` vertex means a **back edge**, hence a cycle. Recover the cycle from the parent chain. O(V + E).

Alternative: run Kahn's topological sort — if it outputs fewer than \`n\` vertices there is a cycle.

### Undirected graph — DFS with parent, or DSU

DFS: any edge to a visited vertex that is **not the parent edge** closes a cycle (careful with multi-edges: skip only *one* parent edge, by edge id). DSU: if both endpoints of an edge already share a root, that edge closes a cycle.

A connected undirected graph is acyclic (a tree) iff \`E == V - 1\`.

### Functional graph / linked list — Floyd

When each node has exactly one successor, use **tortoise and hare**: slow moves 1, fast moves 2. They meet inside the cycle; then reset slow to the start and advance both by 1 to find the cycle entry; walking once more gives the cycle length. O(n) time, O(1) memory. Brent's algorithm is a faster variant.

### Related

Negative cycles need **Bellman-Ford**; the number of cycles in general graphs is #P-hard, but girth (shortest cycle) can be found with BFS from every vertex in O(V·E).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// directed: returns one cycle or an empty vector
vector<int> findCycleDirected(const vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> state(n, 0), par(n, -1), cycle;
    int start = -1, endv = -1;
    function<bool(int)> dfs = [&](int u) {
        state[u] = 1;
        for (int v : adj[u]) {
            if (state[v] == 0) { par[v] = u; if (dfs(v)) return true; }
            else if (state[v] == 1) { start = v; endv = u; return true; }
        }
        state[u] = 2;
        return false;
    };
    for (int u = 0; u < n; ++u)
        if (state[u] == 0 && dfs(u)) break;
    if (start == -1) return {};
    for (int v = endv; v != start; v = par[v]) cycle.push_back(v);
    cycle.push_back(start);
    reverse(cycle.begin(), cycle.end());
    return cycle;
}

// undirected: DFS skipping the edge we came from (by edge id)
bool hasCycleUndirected(const vector<vector<pair<int,int>>>& adj) {  // (to, edgeId)
    int n = adj.size();
    vector<int> vis(n, 0);
    function<bool(int,int)> dfs = [&](int u, int pe) {
        vis[u] = 1;
        for (auto [v, id] : adj[u]) {
            if (id == pe) continue;
            if (vis[v]) return true;
            if (dfs(v, id)) return true;
        }
        return false;
    };
    for (int u = 0; u < n; ++u) if (!vis[u] && dfs(u, -1)) return true;
    return false;
}

// functional graph: Floyd's tortoise and hare -> (cycle start, cycle length)
pair<int,int> floydCycle(const vector<int>& next_, int start) {
    int slow = next_[start], fast = next_[next_[start]];
    while (slow != fast) { slow = next_[slow]; fast = next_[next_[fast]]; }
    slow = start;
    while (slow != fast) { slow = next_[slow]; fast = next_[fast]; }
    int len = 1;
    for (int x = next_[slow]; x != slow; x = next_[x]) ++len;
    return {slow, len};
}

int main() {
    vector<vector<int>> d = {{1},{2},{3},{1}};
    for (int v : findCycleDirected(d)) cout << v << ' ';   // 1 2 3
    cout << '\\n';

    vector<vector<pair<int,int>>> u(3);
    auto add = [&](int a, int b, int id){ u[a].push_back({b,id}); u[b].push_back({a,id}); };
    add(0,1,0); add(1,2,1); add(2,0,2);
    cout << hasCycleUndirected(u) << '\\n';                 // 1

    auto [s, len] = floydCycle({1,2,3,4,2}, 0);
    cout << s << ' ' << len << '\\n';                       // 2 3
}
\`\`\`
`,
};

export default topic;
