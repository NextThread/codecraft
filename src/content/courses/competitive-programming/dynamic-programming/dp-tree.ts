import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-tree",
  title: "Tree DP",
  description: "DP on rooted trees: subtree aggregates, independent set, diameter, rerooting.",
  readingTime: 8,
  content: `

# Tree DP

## Theory

On a tree there are no cycles, so a **postorder DFS** already gives a valid DP order: children before parent.

\`\`\`
dp[v] = combine(dp[c1], dp[c2], ..., dp[ck], value(v))
\`\`\`

Total cost is O(n) because each edge is used once (or O(n·k) when the state carries an extra small dimension).

### Standard recurrences

| Problem | Recurrence |
|---|---|
| Subtree size | \`sz[v] = 1 + Σ sz[c]\` |
| Subtree sum / max | aggregate of children + \`a[v]\` |
| Height | \`h[v] = 1 + max h[c]\` |
| Diameter | at each \`v\`, sum the two largest child heights |
| Max weight independent set | \`dp[v][0] = Σ max(dp[c][0], dp[c][1])\`, \`dp[v][1] = a[v] + Σ dp[c][0]\` |
| Min vertex cover | same 0/1 shape, roles swapped |
| Tree knapsack (choose k nodes) | merge children as a knapsack; small-to-large gives O(n·k) |
| Count matchings / colourings | multiply children contributions |

### Rerooting (answer for every root)

1. \`down[v]\` — answer inside the subtree of \`v\` (first DFS).
2. \`up[v]\` — contribution of everything outside, derived from the parent using prefix/suffix aggregates over siblings so excluding one child is O(1).
3. \`ans[v] = combine(down[v], up[v])\`.

Total O(n). Classic use: sum of distances from every node to all others; maximum distance from every node.

### Implementation notes

- Recursion depth can be 2·10⁵ — use an **iterative DFS** or increase the stack.
- Pass the parent instead of a \`visited\` array.
- For states that are maps/sets, merge **small into large** for O(n log n).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int n;
vector<vector<int>> g;
vector<ll> a;

// 1) maximum weight independent set
vector<array<ll,2>> dp;
void dfsMis(int v, int p) {
    dp[v][0] = 0; dp[v][1] = a[v];
    for (int to : g[v]) if (to != p) {
        dfsMis(to, v);
        dp[v][0] += max(dp[to][0], dp[to][1]);
        dp[v][1] += dp[to][0];
    }
}

// 2) diameter via heights
ll diameter = 0;
vector<ll> h;
void dfsDiam(int v, int p) {
    ll best1 = 0, best2 = 0;
    for (int to : g[v]) if (to != p) {
        dfsDiam(to, v);
        ll cand = h[to] + 1;
        if (cand > best1) { best2 = best1; best1 = cand; }
        else if (cand > best2) best2 = cand;
    }
    h[v] = best1;
    diameter = max(diameter, best1 + best2);
}

// 3) rerooting: sum of distances from every vertex
vector<ll> sz, down_, ans;
void dfsDown(int v, int p) {
    sz[v] = 1; down_[v] = 0;
    for (int to : g[v]) if (to != p) {
        dfsDown(to, v);
        sz[v] += sz[to];
        down_[v] += down_[to] + sz[to];
    }
}
void dfsUp(int v, int p) {
    for (int to : g[v]) if (to != p) {
        ans[to] = ans[v] - sz[to] + (n - sz[to]);
        dfsUp(to, v);
    }
}

int main() {
    n = 7;
    g.assign(n, {});
    auto add = [&](int x, int y) { g[x].push_back(y); g[y].push_back(x); };
    add(0,1); add(0,2); add(1,3); add(1,4); add(2,5); add(4,6);

    a = {3, 2, 1, 10, 1, 4, 5};
    dp.assign(n, {0, 0});
    dfsMis(0, -1);
    cout << "max independent set = " << max(dp[0][0], dp[0][1]) << '\\n';   // 22

    h.assign(n, 0);
    dfsDiam(0, -1);
    cout << "diameter (edges) = " << diameter << '\\n';                     // 4

    sz.assign(n, 0); down_.assign(n, 0); ans.assign(n, 0);
    dfsDown(0, -1);
    ans[0] = down_[0];
    dfsUp(0, -1);
    for (int v = 0; v < n; ++v) cout << "dist sum[" << v << "] = " << ans[v] << '\\n';
}
\`\`\`
`,
};

export default topic;
