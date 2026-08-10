import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-bitmask",
  title: "Bitmask DP",
  description: "DP over subsets: TSP, assignment problem, subset partitioning, SOS DP.",
  readingTime: 8,
  content: `

# Bitmask DP

## Theory

When \`n ≤ 20-22\`, a **subset of items** can be encoded as an integer bitmask, so the DP state becomes \`dp[mask]\` (optionally plus a small extra dimension).

- Number of masks: \`2^n\`. With an extra index: \`2^n · n\`.
- \`n = 20\` → 1M masks (fine). \`n = 24\` → 16M (borderline).

### Bit tricks used constantly

\`\`\`cpp
mask & (1 << i)          // is i in the set?
mask | (1 << i)          // add i
mask & ~(1 << i)         // remove i
__builtin_popcount(mask) // size of the set
mask == (1<<n) - 1       // full set
\`\`\`

### Pattern 1 — permutation building (assignment / TSP)

\`dp[mask]\` = best cost after placing the items in \`mask\`; the next position is \`popcount(mask)\`:

\`\`\`
dp[mask | 1<<i] = min(dp[mask] + cost[popcount(mask)][i])
\`\`\`

O(2^n · n) — the classic **assignment problem** in O(2^n·n).

**TSP** needs the current city too: \`dp[mask][v]\`, O(2^n · n²).

### Pattern 2 — counting Hamiltonian-ish paths

Same state; replace min by +.

### Pattern 3 — iterating submasks

\`\`\`cpp
for (int sub = mask; sub; sub = (sub - 1) & mask) { ... }
\`\`\`

Total over all masks is **3^n** — used for partitioning a set into groups (e.g. minimum number of valid teams, graph colouring, set cover).

### Pattern 4 — SOS DP (sum over subsets)

Compute \`f[mask] = Σ_{sub ⊆ mask} a[sub]\` in O(2^n · n):

\`\`\`
for i in 0..n-1
  for mask in 0..2^n-1
      if mask >> i & 1: f[mask] += f[mask ^ (1<<i)]
\`\`\`

### Pattern 5 — broken profile / grid tiling

For grids with one small side (\`m ≤ 15\`), the mask stores the profile of the frontier: domino tilings, counting independent sets on a grid.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long INF = 1e18;

// 1) assignment problem: cost[worker][job], min total
long long assignment(const vector<vector<long long>>& cost) {
    int n = cost.size();
    vector<long long> dp(1 << n, INF);
    dp[0] = 0;
    for (int mask = 0; mask < (1 << n); ++mask) {
        if (dp[mask] == INF) continue;
        int w = __builtin_popcount(mask);            // next worker to assign
        if (w == n) continue;
        for (int j = 0; j < n; ++j)
            if (!(mask >> j & 1))
                dp[mask | 1 << j] = min(dp[mask | 1 << j], dp[mask] + cost[w][j]);
    }
    return dp[(1 << n) - 1];
}

// 2) TSP: shortest Hamiltonian cycle from 0
long long tsp(const vector<vector<long long>>& d) {
    int n = d.size();
    vector<vector<long long>> dp(1 << n, vector<long long>(n, INF));
    dp[1][0] = 0;
    for (int mask = 1; mask < (1 << n); ++mask)
        for (int v = 0; v < n; ++v) {
            if (dp[mask][v] == INF || !(mask >> v & 1)) continue;
            for (int to = 0; to < n; ++to)
                if (!(mask >> to & 1))
                    dp[mask | 1 << to][to] = min(dp[mask | 1 << to][to], dp[mask][v] + d[v][to]);
        }
    long long best = INF;
    for (int v = 1; v < n; ++v) best = min(best, dp[(1 << n) - 1][v] + d[v][0]);
    return best;
}

// 3) submask enumeration: minimum number of groups where ok[mask] says a group is valid
int minGroups(int n, const vector<char>& ok) {
    int full = (1 << n) - 1;
    vector<int> dp(1 << n, INT_MAX);
    dp[0] = 0;
    for (int mask = 1; mask <= full; ++mask)
        for (int sub = mask; sub; sub = (sub - 1) & mask)
            if (ok[sub] && dp[mask ^ sub] != INT_MAX)
                dp[mask] = min(dp[mask], dp[mask ^ sub] + 1);
    return dp[full];
}

// 4) SOS DP: f[mask] = sum of a[sub] over all sub subset of mask
vector<long long> sos(vector<long long> a, int n) {
    for (int i = 0; i < n; ++i)
        for (int mask = 0; mask < (1 << n); ++mask)
            if (mask >> i & 1) a[mask] += a[mask ^ (1 << i)];
    return a;
}

int main() {
    cout << assignment({{9,2,7,8},{6,4,3,7},{5,8,1,8},{7,6,9,4}}) << '\\n';  // 13
    cout << tsp({{0,10,15,20},{10,0,35,25},{15,35,0,30},{20,25,30,0}}) << '\\n'; // 80

    int n = 3;
    vector<char> ok(1 << n, 1);                 // any non-empty group is valid
    cout << minGroups(n, ok) << '\\n';           // 1

    auto f = sos({1, 2, 3, 4}, 2);
    cout << f[3] << '\\n';                       // 1+2+3+4 = 10
}
\`\`\`
`,
};

export default topic;
