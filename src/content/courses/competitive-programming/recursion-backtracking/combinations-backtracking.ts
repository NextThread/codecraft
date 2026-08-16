import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "combinations-backtracking",
  title: "Combinations",
  description: "Generate all ways to choose k elements out of n using backtracking, and understand C(n, k) counting.",
  readingTime: 8,
  content: `
# Combinations

## Theory

### What is a combination?

A **combination** is a selection of \`k\` elements out of \`n\`, where **order does not matter** (unlike a permutation). The number of ways to choose \`k\` elements from \`n\` is the binomial coefficient:

\`C(n, k) = n! / (k! * (n-k)!)\`

Combinations are essentially a size-restricted version of subsets: subsets of a set of size \`n\` are exactly the union of all combinations \`C(n, 0), C(n, 1), ..., C(n, n)\`.

### Core idea (index + start-position backtracking)

To generate combinations without duplicates (e.g., \`{1,2}\` and \`{2,1}\` should count as the same combination and only be produced once), enforce that chosen elements are always taken in **increasing index order**:

1. Maintain a \`start\` parameter: only consider elements at index >= \`start\` for the next pick. This guarantees each combination is generated exactly once, in sorted order.
2. At each recursive call, loop \`i\` from \`start\` to \`n-1\`: choose \`a[i]\`, recurse with \`start = i+1\`, then un-choose (backtrack).
3. Base case: when the current selection has size \`k\`, record it and return (no need to keep exploring further from a full-size combination).

### Key observations

- The "start index" trick is the standard technique to avoid generating the same unordered combination multiple times — it's what distinguishes combination-generation from permutation-generation code.
- **Pruning**: if the remaining elements (\`n - start\`) are fewer than the still-needed count (\`k - current.size()\`), no valid combination can be completed from here — return immediately. This significantly cuts down wasted recursive calls for large \`n\`, small \`k\` or vice versa.
- Combinations generalize to "combination sum" problems (choose elements, possibly with repetition, that sum to a target) by adjusting whether \`start\` advances to \`i\` (repetition allowed) or \`i+1\` (no repetition) in the recursive call.
- Time complexity for generating all combinations is O(C(n,k) * k) (each of the C(n,k) results takes O(k) to build/copy).

### When to use

- Choosing subsets of a fixed size: team selection, choosing k items to test, generating k-length combinations for brute force search, coefficients in combinatorics problems, or as a building block for combination-sum / subset-sum with repetition.

### Conceptual example

Combinations of size 2 from \`{1,2,3,4}\`: \`{1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}\` — exactly \`C(4,2) = 6\` results, each element pair listed once thanks to the increasing-index rule.

### Complexity summary

| Aspect | Value |
|---|---|
| Total combinations | C(n, k) |
| Time (with copying) | O(C(n,k) * k) |
| Recursion depth | O(k) |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Generate all combinations of size k from a[0..n-1], choosing indices in increasing order
void combine(const vector<int>& a, int start, int k, vector<int>& current,
             vector<vector<int>>& result) {
    int n = a.size();
    if ((int)current.size() == k) {      // base case: picked exactly k elements
        result.push_back(current);
        return;
    }
    // Pruning: not enough remaining elements to reach size k
    int remainingNeeded = k - (int)current.size();
    int remainingAvailable = n - start;
    if (remainingAvailable < remainingNeeded) return;

    for (int i = start; i < n; i++) {
        current.push_back(a[i]);          // choose a[i]
        combine(a, i + 1, k, current, result); // next pick must have index > i
        current.pop_back();               // backtrack
    }
}

// Variant: combination sum with repetition allowed (elements can be reused)
void combinationSum(const vector<int>& candidates, int start, int target,
                     vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {                    // exact sum reached
        result.push_back(current);
        return;
    }
    for (int i = start; i < (int)candidates.size(); i++) {
        if (candidates[i] > target) continue; // pruning: this candidate alone overshoots
        current.push_back(candidates[i]);
        // pass 'i' (not i+1) since repetition of the same candidate is allowed
        combinationSum(candidates, i, target - candidates[i], current, result);
        current.pop_back();
    }
}

int main() {
    vector<int> a = {1, 2, 3, 4};
    int k = 2;
    vector<vector<int>> result;
    vector<int> current;
    combine(a, 0, k, current, result);

    cout << "C(" << a.size() << "," << k << ") = " << result.size() << " combinations:\\n";
    for (auto& c : result) {
        cout << "{ ";
        for (int x : c) cout << x << " ";
        cout << "}\\n";
    }

    vector<int> candidates = {2, 3, 6, 7};
    vector<vector<int>> sumResult;
    vector<int> cur2;
    combinationSum(candidates, 0, 7, cur2, sumResult);
    cout << "Combination sums to 7: " << sumResult.size() << " ways\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
