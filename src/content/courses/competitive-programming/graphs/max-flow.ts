import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "max-flow",
  title: "Max Flow",
  description: "Ford-Fulkerson, Edmonds-Karp, Dinic, and min-cut duality.",
  readingTime: 8,
  content: `

# Max Flow

## Theory

A **flow network** has capacities \`c(u,v) >= 0\`, a source \`s\` and a sink \`t\`. A flow respects capacities and conserves flow at every other vertex. Maximise the value leaving \`s\`.

### Residual graph and augmenting paths

For each edge keep a **reverse edge** with capacity 0. Sending \`f\` along \`u→v\` does \`cap[u→v] -= f\` and \`cap[v→u] += f\`. Repeat: find an \`s→t\` path with positive residual capacity and saturate it (**Ford-Fulkerson**).

| Algorithm | Path choice | Complexity |
|---|---|---|
| Ford-Fulkerson (DFS) | any | O(E · maxflow) — can be slow |
| Edmonds-Karp | BFS shortest | O(V·E^2) |
| **Dinic** | BFS levels + blocking flow | O(V^2·E), **O(E·sqrt(V))** on unit capacities |

**Dinic is the default in CP.** It handles \`V ~ 10^4\` comfortably, and unit-capacity bipartite matching in near-linear time.

### Max-flow min-cut theorem

Max flow value = min cut capacity. After the final BFS, the vertices reachable from \`s\` in the residual graph form the source side of a minimum cut, so you can output the cut edges.

### Modelling toolbox

- **Bipartite matching**: source→left (1), left→right (1), right→sink (1).
- **Vertex capacities**: split \`v\` into \`v_in → v_out\` with the capacity on that edge.
- **Multiple sources/sinks**: super-source and super-sink.
- **Minimum path cover on a DAG**, project selection / max closure, image segmentation, minimum vertex cover in bipartite graphs (Kőnig).
- **Min-cost max-flow** when edges also carry a cost (SPFA/Johnson potentials).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct Dinic {
    struct E { int to; ll cap; };
    vector<E> edges;
    vector<vector<int>> g;
    vector<int> level, it;
    int n;

    explicit Dinic(int n) : g(n), level(n), it(n), n(n) {}
    void addEdge(int u, int v, ll c) {
        g[u].push_back(edges.size()); edges.push_back({v, c});
        g[v].push_back(edges.size()); edges.push_back({u, 0});   // reverse
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q; level[s] = 0; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int id : g[u]) {
                auto& e = edges[id];
                if (e.cap > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }
    ll dfs(int u, int t, ll pushed) {
        if (u == t || !pushed) return pushed;
        for (int& i = it[u]; i < (int)g[u].size(); ++i) {
            int id = g[u][i];
            auto& e = edges[id];
            if (e.cap <= 0 || level[e.to] != level[u] + 1) continue;
            ll got = dfs(e.to, t, min(pushed, e.cap));
            if (got) { e.cap -= got; edges[id ^ 1].cap += got; return got; }
        }
        return 0;
    }
    ll maxflow(int s, int t) {
        ll flow = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while (ll pushed = dfs(s, t, LLONG_MAX)) flow += pushed;
        }
        return flow;
    }
    // vertices reachable from s in the residual graph = source side of a min cut
    vector<char> minCutSide(int s) {
        vector<char> vis(n, 0);
        vector<int> st{s}; vis[s] = 1;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int id : g[u]) if (edges[id].cap > 0 && !vis[edges[id].to]) {
                vis[edges[id].to] = 1;
                st.push_back(edges[id].to);
            }
        }
        return vis;
    }
};

int main() {
    Dinic d(6);
    d.addEdge(0,1,16); d.addEdge(0,2,13);
    d.addEdge(1,2,10); d.addEdge(2,1,4);
    d.addEdge(1,3,12); d.addEdge(3,2,9);
    d.addEdge(2,4,14); d.addEdge(4,3,7);
    d.addEdge(3,5,20); d.addEdge(4,5,4);
    cout << d.maxflow(0, 5) << '\\n';        // 23
    auto side = d.minCutSide(0);
    for (int v = 0; v < 6; ++v) if (side[v]) cout << v << ' ';
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
