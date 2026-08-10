import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-1d",
  title: "1D DP",
  description: "Linear dynamic programming: Fibonacci, climbing stairs, coin change, house robber, LIS.",
  readingTime: 8,
  content: `

# 1D DP

## Theory

**Dynamic programming** solves a problem by breaking it into overlapping subproblems, solving each once, and reusing the result. Two ingredients are required:

1. **Optimal substructure** — the answer is built from answers to smaller instances.
2. **Overlapping subproblems** — the same smaller instance appears many times.

In **1D DP** the state is a single index, usually "the answer considering the first \`i\` elements" or "the answer ending at index \`i\`".

\`\`\`
dp[i] = f(dp[i-1], dp[i-2], ..., a[i])
\`\`\`

### Top-down vs bottom-up

| | Top-down (memoization) | Bottom-up (tabulation) |
|---|---|---|
| Shape | recursion + cache | loops over states |
| Pros | writes like the recurrence, only visits reachable states | no recursion overhead, easy to compress space |
| Cons | stack depth, function-call cost | must order states manually |

### Canonical recurrences

| Problem | State | Recurrence |
|---|---|---|
| Fibonacci | \`dp[i]\` = i-th number | \`dp[i] = dp[i-1] + dp[i-2]\` |
| Climbing stairs (1 or 2 steps) | ways to reach step i | \`dp[i] = dp[i-1] + dp[i-2]\` |
| Min cost climbing | min cost at i | \`dp[i] = c[i] + min(dp[i-1], dp[i-2])\` |
| House robber (no two adjacent) | best using first i | \`dp[i] = max(dp[i-1], dp[i-2] + a[i])\` |
| Coin change (min coins) | min coins for sum s | \`dp[s] = 1 + min(dp[s - c])\` |
| Count ways to make sum | ways for sum s | \`dp[s] = Σ dp[s - c]\` |
| Max subarray (Kadane) | best ending at i | \`dp[i] = max(a[i], dp[i-1] + a[i])\` |
| LIS (O(n²)) | LIS ending at i | \`dp[i] = 1 + max(dp[j]) for j<i, a[j]<a[i]\` |

### Space optimization

If \`dp[i]\` depends only on the last \`k\` values, keep \`k\` variables instead of an array — O(1) memory.

### Reconstructing the answer

Store a \`par[i]\` (the choice that produced the optimum) and walk backwards from the final state.

### Complexity rule of thumb

\`time = (number of states) × (transitions per state)\`. For 1D DP that is usually O(n) or O(n·k).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// 1) Fibonacci: O(n) time, O(1) space
long long fib(int n) {
    long long a = 0, b = 1;
    for (int i = 0; i < n; ++i) { long long c = a + b; a = b; b = c; }
    return a;
}

// 2) House robber: no two adjacent elements
long long rob(const vector<long long>& a) {
    long long take = 0, skip = 0;                 // best if we take a[i] / skip it
    for (long long x : a) {
        long long nTake = skip + x;
        long long nSkip = max(skip, take);
        take = nTake; skip = nSkip;
    }
    return max(take, skip);
}

// 3) Coin change: minimum number of coins for target
int coinChange(const vector<int>& coins, int target) {
    const int INF = 1e9;
    vector<int> dp(target + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= target; ++s)
        for (int c : coins)
            if (c <= s) dp[s] = min(dp[s], dp[s - c] + 1);
    return dp[target] >= INF ? -1 : dp[target];
}

// 4) Kadane: maximum subarray sum
long long maxSubarray(const vector<long long>& a) {
    long long best = a[0], cur = a[0];
    for (size_t i = 1; i < a.size(); ++i) {
        cur = max(a[i], cur + a[i]);
        best = max(best, cur);
    }
    return best;
}

// 5) LIS in O(n log n) using patience sorting
int lis(const vector<int>& a) {
    vector<int> tails;                            // tails[k] = min tail of an LIS of length k+1
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);   // strictly increasing
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

int main() {
    cout << fib(50) << '\\n';                                  // 12586269025
    cout << rob({2, 7, 9, 3, 1}) << '\\n';                     // 12
    cout << coinChange({1, 5, 6, 9}, 11) << '\\n';             // 2
    cout << maxSubarray({-2, 1, -3, 4, -1, 2, 1, -5, 4}) << '\\n';  // 6
    cout << lis({10, 9, 2, 5, 3, 7, 101, 18}) << '\\n';        // 4
}
\`\`\`
`,
};

export default topic;
