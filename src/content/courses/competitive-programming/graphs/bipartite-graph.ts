import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bipartite-graph",
  title: "Bipartite Graph",
  description: "2-colouring, odd-cycle detection, and bipartite DSU.",
  readingTime: 6,
  content: `

# Bipartite Graph

## Theory

A graph is **bipartite** if its vertices split into two sets with every edge going across. Equivalently:

- it is **2-colourable**, and
- it contains **no odd-length cycle**.

### Test by BFS/DFS colouring

Colour the source 0, every neighbour with the opposite colour. If an edge ever joins two same-coloured vertices, an odd cycle exists → not bipartite. O(V + E). Run it per component; isolated vertices are fine.

The failing edge plus the two BFS tree paths give you an explicit **odd cycle** as a certificate.

### Test by DSU with parity

Store for each vertex a parity relative to its DSU root. Union with parity; a contradiction means an odd cycle. This is the right tool for **online** edge additions and for "same/different group" query problems.

### Why it matters

- **Bipartite matching** / Kőnig's theorem: max matching = min vertex cover; max independent set = V − max matching.
- Trees and even cycles are always bipartite; any graph with a self-loop is not.
- Many "split people into two teams" and 2-colouring constraint problems reduce to this.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// BFS 2-colouring; returns colours or empty if not bipartite
vector<int> bipartite(const vector<vector<int>>& adj) {
    int n = adj.size();
    vector<int> color(n, -1);
    for (int s = 0; s < n; ++s) {
        if (color[s] != -1) continue;
        color[s] = 0;
        queue<int> q; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                if (color[v] == -1) { color[v] = color[u] ^ 1; q.push(v); }
                else if (color[v] == color[u]) return {};
            }
        }
    }
    return color;
}

// DSU with parity: supports online edge insertion
struct ParityDSU {
    vector<int> p, rnk, par;                 // par = parity to parent
    explicit ParityDSU(int n) : p(n), rnk(n, 0), par(n, 0) { iota(p.begin(), p.end(), 0); }
    pair<int,int> find(int x) {               // (root, parity to root)
        if (p[x] == x) return {x, 0};
        auto [r, pr] = find(p[x]);
        p[x] = r; par[x] ^= pr;
        return {r, par[x]};
    }
    bool addEdge(int a, int b) {              // false => creates an odd cycle
        auto [ra, pa] = find(a);
        auto [rb, pb] = find(b);
        if (ra == rb) return (pa ^ pb) == 1;
        if (rnk[ra] < rnk[rb]) { swap(ra, rb); swap(pa, pb); }
        p[rb] = ra;
        par[rb] = pa ^ pb ^ 1;
        if (rnk[ra] == rnk[rb]) ++rnk[ra];
        return true;
    }
};

int main() {
    vector<vector<int>> even = {{1,3},{0,2},{1,3},{0,2}};        // 4-cycle
    vector<vector<int>> odd  = {{1,2},{0,2},{0,1}};              // triangle
    cout << !bipartite(even).empty() << ' ' << !bipartite(odd).empty() << '\\n';  // 1 0

    ParityDSU d(3);
    cout << d.addEdge(0,1) << d.addEdge(1,2) << d.addEdge(0,2) << '\\n';          // 110
}
\`\`\`
`,
};

export default topic;
