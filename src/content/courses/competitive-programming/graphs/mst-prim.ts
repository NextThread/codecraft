import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mst-prim",
  title: "Minimum Spanning Tree (Prim)",
  description: "Grow one tree, always adding the cheapest crossing edge.",
  readingTime: 6,
  content: `

# Minimum Spanning Tree (Prim)

## Theory

An **MST** of a connected weighted undirected graph is a spanning tree of minimum total weight (\`V − 1\` edges).

**Prim's algorithm** grows a single tree from an arbitrary vertex, repeatedly adding the cheapest edge that leaves the current tree.

Correctness is the **cut property**: the lightest edge crossing any cut is in some MST.

| Implementation | Complexity | Use |
|---|---|---|
| priority_queue over edges | O(E log V) | sparse graphs |
| O(V^2) dense scan (\`minE[]\`) | O(V^2) | complete graphs, geometric MST |

Prim beats Kruskal on **dense** graphs and when edges are generated on the fly (e.g. MST of points where the weight is a distance — no need to store \`V^2\` edges).

### Facts worth remembering

- If all weights are distinct the MST is unique.
- The MST also minimises the **maximum edge** on the path between any two vertices (minimax / bottleneck property).
- **Maximum spanning tree**: negate the weights.
- Disconnected graph → you get a minimum spanning **forest**; detect it when fewer than \`V − 1\` edges are taken.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

// Prim with a heap, O(E log V). Returns {total weight, edges} or weight -1 if disconnected.
pair<ll, vector<pair<int,int>>> prim(const vector<vector<pair<int,int>>>& g) {
    int n = g.size();
    vector<char> inTree(n, 0);
    vector<pair<int,int>> used;
    ll total = 0;
    // (weight, to, from)
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    pq.push({0, 0, -1});
    while (!pq.empty()) {
        auto [w, u, from] = pq.top(); pq.pop();
        if (inTree[u]) continue;
        inTree[u] = 1;
        total += w;
        if (from != -1) used.push_back({from, u});
        for (auto [v, wt] : g[u]) if (!inTree[v]) pq.push({wt, v, u});
    }
    if ((int)used.size() != n - 1) return {-1, {}};
    return {total, used};
}

// dense O(V^2) Prim on a weight matrix
ll primDense(const vector<vector<int>>& w) {
    int n = w.size();
    const int INF = INT_MAX / 2;
    vector<int> minE(n, INF);
    vector<char> used(n, 0);
    minE[0] = 0;
    ll total = 0;
    for (int it = 0; it < n; ++it) {
        int v = -1;
        for (int i = 0; i < n; ++i) if (!used[i] && (v == -1 || minE[i] < minE[v])) v = i;
        used[v] = 1;
        total += minE[v];
        for (int to = 0; to < n; ++to) if (!used[to]) minE[to] = min(minE[to], w[v][to]);
    }
    return total;
}

int main() {
    int n = 4;
    vector<vector<pair<int,int>>> g(n);
    auto add = [&](int u, int v, int w){ g[u].push_back({v,w}); g[v].push_back({u,w}); };
    add(0,1,1); add(0,2,4); add(1,2,2); add(2,3,5); add(1,3,3);
    auto [total, edges] = prim(g);
    cout << total << '\\n';                                   // 6
    for (auto [u, v] : edges) cout << u << '-' << v << ' ';   // 0-1 1-2 1-3
    cout << '\\n';

    vector<vector<int>> w = {{0,1,4,9},{1,0,2,3},{4,2,0,5},{9,3,5,0}};
    cout << primDense(w) << '\\n';                            // 6
}
\`\`\`
`,
};

export default topic;
