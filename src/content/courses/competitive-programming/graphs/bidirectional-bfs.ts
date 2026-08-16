import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bidirectional-bfs",
  title: "Bidirectional BFS",
  description: "Searching simultaneously from source and target to cut the effective search radius in half.",
  readingTime: 7,
  content: `
# Bidirectional BFS

## Theory

**Bidirectional BFS** finds the shortest path between a specific source and a specific target in an unweighted graph by running two BFS frontiers at once — one growing forward from the source, one growing backward from the target — and stopping as soon as the two frontiers meet.

### Core idea

1. Maintain two visited/distance maps: \`distFwd\` from the source, \`distBwd\` from the target.
2. Maintain two frontiers (queues or frontier sets), one for each direction.
3. At each step, expand the *smaller* frontier by one BFS layer (this is the key optimization).
4. After each expansion, check whether any vertex has been visited by both searches. If so, the shortest path length is \`distFwd[meet] + distBwd[meet]\` (minimized over all meeting vertices found so far, or more precisely — you must be careful to check the current minimum over all common vertices, not just stop at the first collision if there could be a shorter combined distance at the same layer).
5. Stop once the frontiers intersect; reconstruct the path if needed by storing parent pointers on both sides.

### Why it works

Plain BFS from a single source explores a ball of radius \`d\` (the answer), touching roughly \`b^d\` vertices for branching factor \`b\`. Two simultaneous BFS searches each only need to reach depth \`d/2\` before meeting, touching roughly \`2 * b^(d/2)\` vertices — exponentially fewer for large branching factor and large \`d\`. This is a huge win on graphs with high branching factor (e.g., word-ladder-style state graphs, puzzle state spaces).

### Key observations

- Only valid for unweighted graphs (or apply the same idea to 0-1 BFS / Dijkstra with more care about frontier ordering — meeting-in-the-middle correctness is trickier with weights).
- Always expand the smaller frontier to keep both sides balanced — this is what gives the exponential speedup.
- Must handle the "meeting" check carefully: as soon as a vertex appears in both visited sets, a candidate shortest path is found, but you should finish processing the current BFS layer(s) fully and take the minimum among all overlapping vertices, since BFS guarantees layer-by-layer correctness only within a completed layer.
- Especially powerful for implicit/generated graphs (e.g., permutation puzzles, word transformations) where the state space is huge but branching factor is high, making the exponential base reduction very impactful.
- Needs the graph to be undirected, or if directed, you need the reverse-adjacency graph for the backward search.

### Complexity

O(b^(d/2)) vertices explored instead of O(b^d) for a branching factor \`b\` and shortest-path distance \`d\` — asymptotically the same worst-case O(V+E) but with a dramatically smaller practical constant on high-branching-factor graphs.

### When to use

- Single-pair shortest path queries (not single-source-to-all) on unweighted graphs with large branching factor.
- Puzzle solving / state-space search (e.g., word ladder, sliding puzzles, Rubik's-cube-like transformations) where explicit graph construction is too expensive but neighbor generation is cheap in both directions.
- When only a source-target distance is needed, not the full distance table.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Bidirectional BFS on a graph given as adjacency list; returns shortest distance,
// or -1 if target is unreachable.
int bidirectionalBFS(int n, vector<vector<int>>& adj, int src, int dst) {
    if (src == dst) return 0;

    vector<int> distFwd(n, -1), distBwd(n, -1);
    queue<int> qFwd, qBwd;
    distFwd[src] = 0; qFwd.push(src);
    distBwd[dst] = 0; qBwd.push(dst);

    // Expand the smaller frontier's full layer each round.
    while (!qFwd.empty() && !qBwd.empty()) {
        if (qFwd.size() <= qBwd.size()) {
            int layerSize = qFwd.size();
            for (int i = 0; i < layerSize; i++) {
                int u = qFwd.front(); qFwd.pop();
                for (int v : adj[u]) {
                    if (distFwd[v] != -1) continue;
                    distFwd[v] = distFwd[u] + 1;
                    if (distBwd[v] != -1) return distFwd[v] + distBwd[v]; // frontiers met
                    qFwd.push(v);
                }
            }
        } else {
            int layerSize = qBwd.size();
            for (int i = 0; i < layerSize; i++) {
                int u = qBwd.front(); qBwd.pop();
                for (int v : adj[u]) {
                    if (distBwd[v] != -1) continue;
                    distBwd[v] = distBwd[u] + 1;
                    if (distFwd[v] != -1) return distFwd[v] + distBwd[v]; // frontiers met
                    qBwd.push(v);
                }
            }
        }
    }
    return -1; // no path
}

int main() {
    int n = 8;
    vector<vector<int>> adj(n);
    auto addEdge = [&](int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    };
    addEdge(0, 1); addEdge(1, 2); addEdge(2, 3);
    addEdge(3, 4); addEdge(4, 5); addEdge(5, 6);
    addEdge(6, 7); addEdge(0, 7); // creates a cycle giving a shortcut

    cout << "Distance 0 -> 4: " << bidirectionalBFS(n, adj, 0, 4) << "\\n"; // expect 4 (via cycle) 
    return 0;
}
\`\`\`
`,
};

export default topic;
