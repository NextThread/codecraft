import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "functional-graphs",
  title: "Functional Graphs",
  description: "Graphs with outdegree 1: rho shape, cycle finding, and k-th successor.",
  readingTime: 6,
  content: `

# Functional Graphs

## Theory

A **functional graph** has exactly one outgoing edge per vertex: \`next[v]\`. Following the edges from any start eventually enters a cycle, so each component looks like a **rho (ρ)**: trees hanging off exactly one cycle.

### Standard tasks

- **Find the cycle in each component** — iterative walk with a \`state[]\` array (0 unvisited, 1 in progress with an order index, 2 done). When you meet an in-progress vertex, the cycle is the suffix of the current path.
- **Cycle entry / length with O(1) memory** — Floyd's tortoise and hare, or Brent's algorithm.
- **Depth of tree vertices** — distance to the cycle, computed by reverse BFS from the cycle nodes.
- **k-th successor queries** — **binary lifting**: \`up[j][v] = up[j-1][up[j-1][v]]\`, O(n log n) build, O(log k) per query. For huge \`k\` (\`10^18\`), or answer in O(1) by "walk to the cycle, then take \`(k − depth) mod len\`".
- **Longest path / maximum sum over k steps** — DP on the trees plus a sliding window over the doubled cycle.

Permutations are the special case where every vertex also has indegree 1 — the graph is a union of pure cycles (permutation cycles, order = lcm of lengths).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// find all cycles, and for each vertex its component/cycle info
struct FuncGraph {
    int n;
    vector<int> nxt, state, cycleId, depth;   // cycleId = -1 if not on a cycle
    vector<vector<int>> cycles;

    explicit FuncGraph(vector<int> nxt) : n(nxt.size()), nxt(move(nxt)),
        state(n, 0), cycleId(n, -1), depth(n, 0) {
        for (int s = 0; s < n; ++s) {
            if (state[s]) continue;
            vector<int> path;
            int u = s;
            while (state[u] == 0) { state[u] = 1; path.push_back(u); u = this->nxt[u]; }
            if (state[u] == 1) {                       // new cycle found
                int id = cycles.size();
                cycles.push_back({});
                int start = find(path.begin(), path.end(), u) - path.begin();
                for (int i = start; i < (int)path.size(); ++i) {
                    cycles[id].push_back(path[i]);
                    cycleId[path[i]] = id;
                }
            }
            for (int v : path) state[v] = 2;
        }
        // depth = steps until reaching a cycle
        vector<int> order;
        function<int(int)> dep = [&](int v) -> int {
            if (cycleId[v] != -1) return 0;
            if (depth[v]) return depth[v];
            return depth[v] = dep(nxt[v]) + 1;
        };
        for (int v = 0; v < n; ++v) dep(v);
    }
};

// binary lifting for k-th successor
struct Lift {
    int LOG;
    vector<vector<int>> up;
    Lift(const vector<int>& nxt, long long maxK) {
        int n = nxt.size();
        LOG = 1;
        while ((1LL << LOG) <= maxK) ++LOG;
        up.assign(LOG, vector<int>(n));
        up[0] = nxt;
        for (int j = 1; j < LOG; ++j)
            for (int v = 0; v < n; ++v) up[j][v] = up[j-1][up[j-1][v]];
    }
    int kth(int v, long long k) const {
        for (int j = 0; k; ++j, k >>= 1) if (k & 1) v = up[j][v];
        return v;
    }
};

int main() {
    vector<int> nxt = {1, 2, 3, 1, 3, 4};     // cycle 1->2->3->1
    FuncGraph fg(nxt);
    cout << "cycles: " << fg.cycles.size() << ", len = " << fg.cycles[0].size() << '\\n'; // 1, 3
    cout << "depth[5] = " << fg.depth[5] << '\\n';                                        // 2
    Lift lf(nxt, 1e18);
    cout << lf.kth(0, 1000000000000000000LL) << '\\n';
}
\`\`\`
`,
};

export default topic;
