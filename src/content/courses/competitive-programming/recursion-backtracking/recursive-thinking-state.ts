import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "recursive-thinking-state",
  title: "Recursive Thinking & State",
  description: "Learn to design recursive solutions by identifying state, transitions, and how choices propagate through the call tree.",
  readingTime: 9,
  content: `
# Recursive Thinking & State

## Theory

### What is "state" in recursion?

The **state** of a recursive function is the minimal set of parameters that fully describes "where you are" in the problem at any point in the recursion. Two calls with identical state must behave identically. Designing a correct and efficient recursive solution is really about answering: *"What is the state, and how does it change from one call to the next?"*

### Why identifying state matters

- If your state is incomplete (missing information the decision actually depends on), the recursion will give wrong answers because it can't distinguish genuinely different situations.
- If your state is redundant (extra parameters that don't affect the answer), you waste memory/time and lose the ability to memoize effectively (in DP-flavored recursion).
- A precise state definition also tells you the **branching factor** (how many recursive calls happen per state) and the **state space size**, which together determine time complexity.

### Core idea: choice + state transition

Most recursive/backtracking solutions follow this template:

1. **Represent state** with parameters (e.g., index, remaining capacity, current partial answer, visited set).
2. **Base case**: when state indicates "no more decisions to make," record/return the answer.
3. **Recursive case**: enumerate the *choices* available from the current state; for each choice, compute the **next state** and recurse.
4. **Combine**: use whatever the recursive call(s) return to build the answer for the current state (sum, max, list of results, boolean OR, etc.).

### Key observations

- Two common state patterns: **"index-based"** (process elements one at a time, e.g., \`i\`-th element of an array) and **"remaining-resource-based"** (e.g., remaining sum, remaining slots).
- The state also implicitly encodes the **path taken so far** in tree/graph recursion (e.g., current node, visited set, distance traveled).
- If the same state can be reached via multiple different call paths, you may be redoing work — a signal that memoization (top-down DP) could help, turning exponential recursion into polynomial.
- Passing state by reference vs. by value matters: mutable state passed by reference (e.g., a shared \`vector<int>& path\`) must be carefully undone after use (this is the essence of backtracking, covered in a later topic) or later branches see corrupted state.
- Think of the recursion as walking a **state-space tree**: each node is a state, each edge is a choice, leaves are terminal states (base cases).

### When to use

- Whenever a problem can be phrased as "make a sequence of choices, where each choice reduces the problem to a smaller version of itself." Includes generating combinatorial objects (subsets, permutations), tree/graph traversal, and recursive DP formulations.

### Conceptual example

Climbing stairs: you can take 1 or 2 steps at a time; how many ways to reach step \`n\`?

- **State**: current step \`i\` remaining to climb.
- **Choices**: take 1 step (go to state \`i-1\`) or take 2 steps (go to state \`i-2\`), provided \`i >= 1\` or \`i >= 2\` respectively.
- **Base cases**: \`i == 0\` -> 1 way (already there); \`i < 0\` -> 0 ways (overshoot).
- **Combine**: \`ways(i) = ways(i-1) + ways(i-2)\`.

This is identical in shape to Fibonacci — recognizing the state (\`i\`) makes the recursive formula obvious, and also reveals that memoizing on \`i\` avoids recomputation.

### Complexity summary

| Without memo (state reused often) | With memo on state |
|---|---|
| Can be exponential (e.g., O(2^n) for stairs) | O(number of distinct states x work per state) |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// --- Example 1: climbing stairs, state = remaining steps i ---
long long waysNaive(int i) {
    if (i == 0) return 1;      // base case: exactly reached the top
    if (i < 0) return 0;       // base case: overshot
    // recursive case: try both choices (1 step, 2 steps) and sum outcomes
    return waysNaive(i - 1) + waysNaive(i - 2);
}

// Same recursion, but memoized on state i to avoid recomputation
long long waysMemo(int i, vector<long long>& memo) {
    if (i == 0) return 1;
    if (i < 0) return 0;
    if (memo[i] != -1) return memo[i];      // state already computed
    memo[i] = waysMemo(i - 1, memo) + waysMemo(i - 2, memo);
    return memo[i];
}

// --- Example 2: reaching a target sum using a fixed set of coin values, unlimited uses ---
// State = (index into coin list, remaining amount to make)
bool canMakeAmount(const vector<int>& coins, int idx, int remaining) {
    if (remaining == 0) return true;              // base case: exact amount reached
    if (remaining < 0 || idx == (int)coins.size()) return false; // dead end
    // choice A: use this coin again (state stays at same idx, remaining shrinks)
    if (canMakeAmount(coins, idx, remaining - coins[idx])) return true;
    // choice B: move on to next coin type without using this one
    return canMakeAmount(coins, idx + 1, remaining);
}

int main() {
    int n = 10;
    cout << "ways (naive) = " << waysNaive(n) << "\\n";

    vector<long long> memo(n + 1, -1);
    cout << "ways (memo)  = " << waysMemo(n, memo) << "\\n";

    vector<int> coins = {2, 5, 7};
    cout << "can make 12? " << (canMakeAmount(coins, 0, 12) ? "yes" : "no") << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
