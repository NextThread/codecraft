import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-state-design",
  title: "DP State Design & Transitions",
  description: "How to identify, design, and validate dynamic programming states and transitions from scratch.",
  readingTime: 10,
  content: `
# DP State Design & Transitions

## Theory

Dynamic programming is not a fixed algorithm but a *methodology*: break a problem into overlapping subproblems, define a state that captures "enough" information to make future decisions, and combine solutions via a recurrence (transition). The hardest part of DP is rarely coding the recurrence — it is **finding the right state**.

### What a "state" really is

A DP state is a summary of the past that is sufficient to determine all future outcomes, independent of *how* that state was reached. This is the DP analogue of the Markov property: given the state, the future is conditionally independent of the specific history.

Formally, if \`dp[state]\` is well-defined (a single number/value, not "it depends"), then your state is valid. If two different histories lead to the same state but require different future answers, your state is **under-specified** and must be enlarged.

### How to design a state

1. **Identify the decision process.** What sequence of choices builds up a solution? (place item i or not; cut string at position j; visit city c next...)
2. **Identify what information affects future decisions.** This becomes the state's dimensions: an index, a remaining capacity, a bitmask of used elements, a "last chosen value," parity, etc.
3. **Minimize the state.** Redundant dimensions blow up complexity. Ask: "can I derive this piece of information from something already in the state, or do I actually need it going forward?"
4. **Write the transition.** For each state, enumerate the possible next decisions and how they change the state (and cost).
5. **Define base cases and the answer state(s).**
6. **Check acyclicity.** Transitions must move strictly "forward" in some order (increasing index, decreasing remaining capacity, etc.) so the DP graph is a DAG — otherwise you get infinite recursion (unless you're solving a shortest-path-like fixed point, e.g. Bellman-Ford style DP over a cyclic graph).

### Common state "ingredients"

- **Prefix/suffix index**: \`dp[i]\` = best answer considering first i elements.
- **Two indices**: \`dp[i][j]\` for interval problems, two-sequence alignment (LCS, edit distance), or matching.
- **Capacity/budget**: \`dp[i][w]\` = knapsack-style remaining resource.
- **Bitmask**: \`dp[mask]\` = subset of elements used/visited (TSP, assignment).
- **Last value / last choice**: \`dp[i][last]\` when the next transition's validity or cost depends on the previous pick (e.g. longest increasing subsequence variants, coloring with no two adjacent same).
- **Extra flags**: "tight" bound in digit DP, "is this the first occurrence," "have we already paid a fixed cost," parity of count.

### Reducing state size

- **Roll indices**: if \`dp[i]\` only depends on \`dp[i-1]\`, keep O(1) or O(k) rolling arrays instead of O(n) history — saves memory, not time complexity of states themselves.
- **Coordinate compression**: replace large value ranges with compressed ranks.
- **Exploit monotonicity**: sometimes the optimal previous choice is monotonic in i, enabling divide & conquer or monotonic queue optimizations (see related topics) that cut a dimension's effective cost from O(n) to O(log n) or O(1) amortized.
- **Symmetry**: if state (a,b) and (b,a) are equivalent, canonicalize (e.g. always store the smaller first) to halve state count.

### Validating a candidate state

A quick sanity test: pick two different ways to reach what you believe is "the same state," and ask whether the optimal continuation could differ. If yes, augment the state with whatever distinguishes them. Example: in "minimum cost to paint houses with no two adjacent houses the same color," the state \`dp[i]\` alone is insufficient because the best continuation depends on house i's color — so the true state is \`dp[i][color]\`.

### Complexity

Total time = (number of states) x (transition cost per state). Good state design keeps both factors small. E.g., bitmask DP over n items gives 2^n states; each transition trying n next moves gives O(2^n * n) total — feasible for n <= ~20.

### When to use

Use DP when a problem has (1) optimal substructure — an optimal solution is built from optimal solutions to subproblems, and (2) overlapping subproblems — naive recursion revisits the same subproblems repeatedly. If subproblems don't overlap, plain divide & conquer suffices; if there's no optimal substructure, DP transitions won't compose correctly (greedy or search may be needed instead).

### Worked mini example

Problem: given an array, find the maximum sum of a subsequence with no two adjacent elements chosen (house robber).

- Decision process: for each index i, either take it or skip it.
- Naive state guess: \`dp[i]\` = best sum using first i elements. Check sufficiency: does the optimal continuation from index i+1 depend on whether we took index i? Yes! If we took i, we cannot take i+1.
- Fix: either enlarge state to \`dp[i][taken?]\`, or note the DP invariant "\`dp[i]\` = best over first i elements regardless of whether i is taken" combined with recurrence \`dp[i] = max(dp[i-1], dp[i-2] + a[i])\` — this cleverly avoids needing the flag because \`dp[i-1]\` already accounts for both cases and dp[i-2]+a[i] is always safe (i-2 and i are non-adjacent, and dp[i-2] never assumes i-1 was taken).

This illustrates the central skill: recognizing when a compact recurrence secretly still captures all needed information, versus when you truly must widen the state.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Example 1: House robber - state design without extra flag
long long houseRobber(const vector<int>& a) {
    int n = a.size();
    if (n == 0) return 0;
    // dp[i] = best sum using first i elements (i taken or not, both covered)
    vector<long long> dp(n + 1, 0);
    dp[0] = 0;
    dp[1] = a[0];
    for (int i = 2; i <= n; i++) {
        // Option 1: skip element i-1 -> dp[i-1]
        // Option 2: take element i-1 -> dp[i-2] + a[i-1] (safe: i-2 excludes i-1's neighbor)
        dp[i] = max(dp[i - 1], dp[i - 2] + a[i - 1]);
    }
    return dp[n];
}

// Example 2: same problem but with an EXPLICIT augmented state dp[i][takenFlag]
// to illustrate the "widen state until Markov property holds" technique.
long long houseRobberExplicit(const vector<int>& a) {
    int n = a.size();
    // dp[i][0] = best sum for first i elements, i-th NOT taken
    // dp[i][1] = best sum for first i elements, i-th taken
    vector<array<long long, 2>> dp(n + 1, {0, LLONG_MIN / 2});
    for (int i = 1; i <= n; i++) {
        dp[i][0] = max(dp[i - 1][0], dp[i - 1][1]); // previous either state, we skip
        dp[i][1] = dp[i - 1][0] + a[i - 1];         // must not have taken previous
    }
    return max(dp[n][0], dp[n][1]);
}

// Generic template pattern for designing a DP:
// 1. Decide dimensions of state (here: index i, "last color" c)
// 2. Fill base cases
// 3. Transition forward respecting acyclicity (i increasing)
long long paintHousesNoAdjacentSame(const vector<vector<long long>>& cost) {
    // cost[i][c] = cost of painting house i with color c
    int n = cost.size();
    if (n == 0) return 0;
    int k = cost[0].size();
    vector<vector<long long>> dp(n, vector<long long>(k, 0));
    dp[0] = cost[0];
    for (int i = 1; i < n; i++) {
        for (int c = 0; c < k; c++) {
            long long best = LLONG_MAX;
            for (int pc = 0; pc < k; pc++) {
                if (pc == c) continue; // state must track "last color" to enforce this
                best = min(best, dp[i - 1][pc]);
            }
            dp[i][c] = best + cost[i][c];
        }
    }
    return *min_element(dp[n - 1].begin(), dp[n - 1].end());
}

int main() {
    vector<int> a = {2, 7, 9, 3, 1};
    cout << "House robber (implicit state): " << houseRobber(a) << "\\n";
    cout << "House robber (explicit state): " << houseRobberExplicit(a) << "\\n";

    vector<vector<long long>> cost = {{17, 2, 17}, {16, 16, 5}, {14, 3, 19}};
    cout << "Paint houses min cost: " << paintHousesNoAdjacentSame(cost) << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
