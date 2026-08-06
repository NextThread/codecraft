import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "tree-dp",
  title: "Tree DP",
  description: "Dynamic programming on rooted trees, including rerooting.",
  readingTime: 7,
  content: `

# Tree DP

## Theory

**Tree DP** computes an answer for every node from the answers of its children — a DFS in **postorder**, O(n) overall.

\`\`\`
dp[v] = f(dp[c1], dp[c2], ..., dp[ck])
\`\`\`

### Classic formulations

| Problem | Recurrence |
|---------|-----------|
| Subtree size | \`sz[v] = 1 + Σ sz[c]\` |
| Subtree sum | \`sum[v] = a[v] + Σ sum[c]\` |
| Height | \`h[v] = 1 + max h[c]\` |
| Diameter | for each \`v\`, combine the two largest child heights |
| Max independent set | \`dp[v][0] = Σ max(dp[c][0], dp[c][1])\`, \`dp[v][1] = a[v] + Σ dp[c][0]\` |
| Minimum vertex cover | same 0/1 shape with the roles swapped |
| Counting paths of length k | knapsack merge over children (small-to-large gives O(n·k)) |

### Rerooting (DP on all roots)

To get the answer *for every node as the root* in O(n):

1. First DFS — \`down[v]\`: the answer inside v's subtree.
2. Second DFS — \`up[v]\`: the answer from the rest of the tree, computed from the parent using prefix/suffix aggregates over siblings (so removing one child costs O(1)).
3. \`answer[v] = combine(down[v], up[v])\`.

Typical application: sum of distances from every node to all others.

### Practical notes

- Recursion depth can reach 2·10⁵ — prefer an iterative DFS or raise the stack limit.
- Merge children with **small-to-large** when the state is a map/set to get O(n log n).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> g;

// 1) maximum weight independent set on a tree
vector<array<long long,2>> dp;
vector<long long> a;

void dfsMis(int v, int p) {
    dp[v][0] = 0;
    dp[v][1] = a[v];
    for (int to : g[v]) if (to != p) {
        dfsMis(to, v);
        dp[v][0] += max(dp[to][0], dp[to][1]);
        dp[v][1] += dp[to][0];
    }
}

// 2) rerooting: sum of distances from every node to all others
vector<long long> sz, down, ans;

void dfsDown(int v, int p) {
    sz[v] = 1; down[v] = 0;
    for (int to : g[v]) if (to != p) {
        dfsDown(to, v);
        sz[v] += sz[to];
        down[v] += down[to] + sz[to];
    }
}
void dfsUp(int v, int p) {
    for (int to : g[v]) if (to != p) {
        ans[to] = ans[v] - sz[to] + (n - sz[to]);   // move the root one edge down
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

    sz.assign(n, 0); down.assign(n, 0); ans.assign(n, 0);
    dfsDown(0, -1);
    ans[0] = down[0];
    dfsUp(0, -1);
    for (int v = 0; v < n; ++v) cout << "sum of distances from " << v << " = " << ans[v] << '\\n';
}
\`\`\`
`,
};

export default topic;
