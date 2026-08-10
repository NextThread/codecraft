import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "knapsack",
  title: "Knapsack",
  description: "0/1, unbounded, bounded and subset-sum knapsacks with space optimization.",
  readingTime: 9,
  content: `

# Knapsack

## Theory

Given items with **weights** \`w[i]\` and **values** \`v[i]\` and a capacity \`W\`, maximise total value. The knapsack family is the most reused DP pattern in contests.

### 0/1 knapsack — each item at most once

\`\`\`
dp[i][c] = max(dp[i-1][c],                 // skip item i
               dp[i-1][c - w[i]] + v[i])   // take item i
\`\`\`

O(n·W) time, O(n·W) memory → compress to a single array by iterating capacity **downwards**:

\`\`\`
for i in items:
  for c = W down to w[i]:
      dp[c] = max(dp[c], dp[c - w[i]] + v[i])
\`\`\`

The descending loop guarantees each item is used at most once.

### Unbounded knapsack — unlimited copies

Iterate capacity **upwards** so the same item can be reused:

\`\`\`
for i in items:
  for c = w[i] to W:
      dp[c] = max(dp[c], dp[c - w[i]] + v[i])
\`\`\`

Counting-version note: looping items outside and capacity inside counts **combinations**; swapping the loops counts **permutations**.

### Bounded knapsack — at most \`k[i]\` copies

- Naive: treat as \`k[i]\` separate items — O(W·Σk).
- **Binary splitting**: split \`k\` into \`1, 2, 4, …\` groups → O(W·Σ log k).
- Monotonic deque optimisation → O(n·W).

### Subset sum / partition

Same recurrence with boolean values (or \`bitset\` for a huge speedup):

\`\`\`
possible |= possible << w[i];     // std::bitset, ~W/64 per item
\`\`\`

Partition into two equal halves = subset sum for \`total/2\`.

### Variants worth knowing

| Variant | Trick |
|---|---|
| Count subsets with sum S | replace max by + |
| Minimum coins | dp of costs, \`min\` |
| Knapsack with small values, huge W | swap the roles: \`dp[value] = min weight\` |
| Fractional knapsack | not DP — greedy by value/weight |
| Reconstruct chosen items | keep the 2D table or a \`taken[i][c]\` bitset |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// 1) 0/1 knapsack, O(n*W) time, O(W) memory
long long knapsack01(const vector<int>& w, const vector<long long>& v, int W) {
    vector<long long> dp(W + 1, 0);
    for (size_t i = 0; i < w.size(); ++i)
        for (int c = W; c >= w[i]; --c)
            dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
    return dp[W];
}

// 2) unbounded knapsack
long long knapsackUnbounded(const vector<int>& w, const vector<long long>& v, int W) {
    vector<long long> dp(W + 1, 0);
    for (size_t i = 0; i < w.size(); ++i)
        for (int c = w[i]; c <= W; ++c)
            dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
    return dp[W];
}

// 3) bounded knapsack via binary splitting
long long knapsackBounded(vector<int> w, vector<long long> v, vector<int> k, int W) {
    vector<int> W2; vector<long long> V2;
    for (size_t i = 0; i < w.size(); ++i) {
        int cnt = k[i];
        for (int p = 1; cnt > 0; p <<= 1) {
            int take = min(p, cnt);
            W2.push_back(w[i] * take);
            V2.push_back(v[i] * take);
            cnt -= take;
        }
    }
    return knapsack01(W2, V2, W);
}

// 4) subset sum with bitset: which sums are reachable?
bool canPartition(const vector<int>& a) {
    int total = accumulate(a.begin(), a.end(), 0);
    if (total % 2) return false;
    bitset<100001> dp;
    dp[0] = 1;
    for (int x : a) dp |= dp << x;
    return dp[total / 2];
}

// 5) count subsets with a given sum
long long countSubsets(const vector<int>& a, int S, long long MOD = 1000000007) {
    vector<long long> dp(S + 1, 0);
    dp[0] = 1;
    for (int x : a)
        for (int s = S; s >= x; --s)
            dp[s] = (dp[s] + dp[s - x]) % MOD;
    return dp[S];
}

int main() {
    vector<int> w = {3, 4, 5, 2};
    vector<long long> v = {30, 50, 60, 20};
    cout << knapsack01(w, v, 9) << '\\n';               // 110
    cout << knapsackUnbounded(w, v, 9) << '\\n';        // 110
    cout << knapsackBounded({2,3}, {10,14}, {2,3}, 8) << '\\n';  // 38
    cout << canPartition({1, 5, 11, 5}) << '\\n';       // 1
    cout << countSubsets({1, 2, 3, 3}, 6) << '\\n';     // 3
}
\`\`\`
`,
};

export default topic;
