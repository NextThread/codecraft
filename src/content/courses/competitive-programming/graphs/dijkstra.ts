import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dijkstra",
  title: "Dijkstra",
  description: "Single-source shortest paths with non-negative weights.",
  readingTime: 7,
  content: `

# Dijkstra

## Theory

Shortest paths from one source when **all weights are >= 0**.

Greedy invariant: the unvisited vertex with the smallest tentative distance is already final — because every edge is non-negative, no detour can shorten it.

### Implementations

| Variant | Complexity | When |
|---|---|---|
| binary heap (\`priority_queue\`) | O(E log V) | default in CP |
| \`set\` with decrease-key | O(E log V) | when you must erase old entries |
| dense O(V^2) scan | O(V^2) | \`V <= 2000\` and \`E ~ V^2\` |

With a heap, skip **stale entries** with \`if (d > dist[u]) continue;\` — do not bother erasing.

### Practical notes

- Use \`long long\` for distances; \`INF = 4e18\` overflows on addition, prefer \`LLONG_MAX / 4\`.
- **Negative weights break it** — use Bellman-Ford or Johnson's reweighting.
- Store \`parent[]\` to reconstruct the path.
- **Multi-source**: push all sources with distance 0.
- **Counting shortest paths / second shortest**: keep \`cnt[v]\` or two best distances per vertex.
- **Layered / state graphs** (k free edges, parity, fuel): node = (vertex, state).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = LLONG_MAX / 4;

pair<vector<ll>, vector<int>> dijkstra(const vector<vector<pair<int,int>>>& g, int src) {
    int n = g.size();
    vector<ll> dist(n, INF);
    vector<int> par(n, -1);
    priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;                 // stale
        for (auto [v, w] : g[u])
            if (d + w < dist[v]) {
                dist[v] = d + w;
                par[v] = u;
                pq.push({dist[v], v});
            }
    }
    return {dist, par};
}

vector<int> restorePath(const vector<int>& par, int t) {
    vector<int> path;
    for (int v = t; v != -1; v = par[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}

// number of shortest paths modulo M
vector<ll> countShortest(const vector<vector<pair<int,int>>>& g, int src, ll M = 1000000007) {
    int n = g.size();
    vector<ll> dist(n, INF), cnt(n, 0);
    priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq;
    dist[src] = 0; cnt[src] = 1; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (d + w < dist[v]) { dist[v] = d + w; cnt[v] = cnt[u]; pq.push({dist[v], v}); }
            else if (d + w == dist[v]) cnt[v] = (cnt[v] + cnt[u]) % M;
        }
    }
    return cnt;
}

int main() {
    vector<vector<pair<int,int>>> g = {{{1,4},{2,1}},{{3,1}},{{1,2},{3,5}},{}};
    auto [dist, par] = dijkstra(g, 0);
    for (ll d : dist) cout << d << ' ';                 // 0 3 1 4
    cout << '\\n';
    for (int v : restorePath(par, 3)) cout << v << ' '; // 0 2 1 3
    cout << '\\n';
    for (ll c : countShortest(g, 0)) cout << c << ' ';  // 1 1 1 1
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
