import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bipartite-matching",
  title: "Bipartite Matching",
  description: "Kuhn's algorithm, Konig's theorem, and assignment modelling.",
  readingTime: 7,
  content: `

# Bipartite Matching

## Theory

A **matching** is a set of edges with no shared vertex. In a bipartite graph \`L ∪ R\`, the maximum matching can be found with augmenting paths.

### Kuhn's algorithm

For each left vertex, DFS looking for an **augmenting path**: an unmatched right vertex, or a matched one whose partner can be re-matched. Each successful DFS increases the matching by 1.

- Complexity **O(V·E)**; fast in practice with the *greedy pre-matching* heuristic and randomising the adjacency order.
- **Hopcroft-Karp** does it in **O(E·sqrt(V))**; equivalently run Dinic on the unit-capacity flow network.

### Theorems you will use

- **Kőnig:** in bipartite graphs, max matching = **min vertex cover**.
- **Max independent set** = \`V − \` max matching.
- **Minimum path cover of a DAG** = \`V − \` max matching of the split graph.
- **Hall's theorem:** a perfect matching on \`L\` exists iff every subset \`S ⊆ L\` has \`|N(S)| >= |S|\`.
- **Dilworth:** minimum chain cover of a poset = longest antichain.

### Weighted version

Maximum-weight perfect matching = the **assignment problem**: Hungarian algorithm in O(n^3), or min-cost max-flow.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Kuhn {
    int nl, nr;
    vector<vector<int>> adj;      // left -> right
    vector<int> matchL, matchR;
    vector<char> used;

    Kuhn(int nl, int nr) : nl(nl), nr(nr), adj(nl), matchL(nl, -1), matchR(nr, -1) {}
    void addEdge(int l, int r) { adj[l].push_back(r); }

    bool tryKuhn(int u) {
        for (int v : adj[u]) {
            if (used[v]) continue;
            used[v] = 1;
            if (matchR[v] == -1 || tryKuhn(matchR[v])) {
                matchR[v] = u;
                matchL[u] = v;
                return true;
            }
        }
        return false;
    }
    int maxMatching() {
        int res = 0;
        for (int u = 0; u < nl; ++u)               // greedy warm start
            for (int v : adj[u])
                if (matchR[v] == -1) { matchR[v] = u; matchL[u] = v; ++res; break; }
        for (int u = 0; u < nl; ++u) {
            if (matchL[u] != -1) continue;
            used.assign(nr, 0);
            if (tryKuhn(u)) ++res;
        }
        return res;
    }
    // Konig: minimum vertex cover from the maximum matching
    pair<vector<int>, vector<int>> minVertexCover() {
        vector<char> visL(nl, 0), visR(nr, 0);
        function<void(int)> dfs = [&](int u) {
            visL[u] = 1;
            for (int v : adj[u]) if (!visR[v] && matchL[u] != v) {
                visR[v] = 1;
                if (matchR[v] != -1) dfs(matchR[v]);
            }
        };
        for (int u = 0; u < nl; ++u) if (matchL[u] == -1) dfs(u);
        vector<int> L, R;
        for (int u = 0; u < nl; ++u) if (!visL[u]) L.push_back(u);
        for (int v = 0; v < nr; ++v) if (visR[v]) R.push_back(v);
        return {L, R};
    }
};

int main() {
    Kuhn k(4, 4);
    k.addEdge(0,0); k.addEdge(0,1);
    k.addEdge(1,0); k.addEdge(1,2);
    k.addEdge(2,2); k.addEdge(3,2); k.addEdge(3,3);
    cout << k.maxMatching() << '\\n';                  // 4
    auto [L, R] = k.minVertexCover();
    cout << "cover size = " << L.size() + R.size() << '\\n';
}
\`\`\`
`,
};

export default topic;
