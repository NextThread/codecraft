import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "multi-source-bfs",
  title: "Multi-Source BFS",
  description: "Running BFS from many sources simultaneously to compute distance-to-nearest-source in a single linear pass.",
  readingTime: 6,
  content: `
# Multi-Source BFS

## Theory

Standard BFS finds shortest distances from a single source in an unweighted graph. **Multi-source BFS** answers a related but distinct question: *for every vertex, what is the shortest distance to the nearest of several given source vertices?* Rather than running BFS once per source (O(k * (V+E))), we push **all** sources into the queue at distance 0 simultaneously and run one BFS.

### Core idea

1. Initialize a distance array with 0 for every source vertex and infinity elsewhere.
2. Push all source vertices into the BFS queue at once (conceptually, imagine a super-source connected to each real source with a 0-weight edge).
3. Run ordinary BFS layer by layer; the first time a vertex is reached, that is its distance to the *nearest* source, because BFS explores in non-decreasing distance order and all sources start at the same distance 0.

### Why it works

BFS processes vertices in strictly non-decreasing order of distance from the initial frontier. If the initial frontier contains multiple sources all at distance 0, then when a vertex is first dequeued/marked visited, it is via the shortest possible path from *any* of the sources — because a shorter path from a different source would have reached it in an earlier BFS layer.

### Key observations

- Equivalent to adding a virtual super-node connected to all sources with weight-0 edges, then doing single-source BFS from the super-node.
- Very common on grids: "distance from nearest 1-cell to every 0-cell", "rotting oranges" style problems, "distance to nearest water/fire cell".
- Only works for unweighted graphs (or uniform edge weight); for weighted graphs, use multi-source Dijkstra with the same trick (push all sources with dist 0 into the priority queue).
- Much faster than looping over sources and running BFS from each: O(V+E) total instead of O(k(V+E)).

### Complexity

O(V + E) time, O(V) space — same as single-source BFS, independent of the number of sources.

### When to use

- Grid problems asking for distance to the nearest of several special cells (multiple sources of fire, water, guards, etc.).
- Percolation/spreading simulations (e.g., "minutes until all oranges rot").
- Finding, for every node, the nearest of a marked subset of nodes in a graph.
- As a subroutine for 0-1 BFS/Dijkstra style problems with multiple starting points.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Multi-source BFS on a grid: distance from each cell to the nearest '1' cell.
vector<vector<int>> multiSourceBFSGrid(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<int>> dist(rows, vector<int>(cols, -1));
    queue<pair<int,int>> q;

    // Push all sources (cells equal to 1) with distance 0.
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                dist[r][c] = 0;
                q.push({r, c});
            }
        }
    }

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int dir = 0; dir < 4; dir++) {
            int nr = r + dr[dir], nc = c + dc[dir];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (dist[nr][nc] != -1) continue; // already visited
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    return dist;
}

// General graph version: nodes 0..n-1, sources given explicitly.
vector<int> multiSourceBFSGraph(int n, vector<vector<int>>& adj, vector<int>& sources) {
    vector<int> dist(n, -1);
    queue<int> q;
    for (int s : sources) {
        dist[s] = 0;
        q.push(s);
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

int main() {
    vector<vector<int>> grid = {
        {0, 0, 0, 1},
        {0, 0, 0, 0},
        {0, 1, 0, 0},
    };
    vector<vector<int>> dist = multiSourceBFSGrid(grid);
    for (auto& row : dist) {
        for (int v : row) cout << v << ' ';
        cout << "\\n";
    }
    return 0;
}
\`\`\`
`,
};

export default topic;
