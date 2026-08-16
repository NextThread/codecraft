import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "permutations-backtracking",
  title: "Permutations",
  description: "Generate all orderings of a collection using backtracking with a used-marker array or in-place swapping.",
  readingTime: 9,
  content: `
# Permutations

## Theory

### What is a permutation?

A **permutation** of \`n\` distinct elements is an ordering (arrangement) of all of them. There are \`n!\` (n factorial) distinct permutations, since there are \`n\` choices for the first position, \`n-1\` remaining choices for the second, \`n-2\` for the third, and so on: \`n * (n-1) * (n-2) * ... * 1 = n!\`.

### Core idea (position-by-position backtracking)

Build the permutation one position at a time:

1. At each step, try every element that **hasn't been used yet** as the next element of the permutation.
2. Mark it used, place it, and recurse to fill the remaining positions.
3. After the recursive call returns (all ways of completing the permutation from here have been explored), **unmark** it and **remove** it (backtrack) so the next candidate can be tried at this position.
4. Base case: when the current permutation has length \`n\`, it's complete — record it.

This is the canonical backtracking template: choose -> explore -> un-choose.

### Alternative: in-place swap-based generation

Instead of a separate "used" array, you can generate permutations by swapping: fix position \`i\`, try each element from index \`i\` to \`n-1\` by swapping it into position \`i\`, recurse on \`i+1\`, then swap back. This avoids extra space for tracking usage and extra copying, operating directly on the array.

### Key observations

- The recursion tree has depth \`n\` (one level per position) and branching factor that shrinks: \`n\` choices at the root, \`n-1\` at depth 1, etc. Total leaves = \`n!\`.
- Total time to generate all permutations (copying each one out) is O(n! * n).
- If there are **duplicate elements**, naive generation produces duplicate permutations. To generate only distinct permutations: sort first, and at each recursion level skip a candidate value if an identical value was already tried at the same level (this is the standard "duplicate skip" pattern in backtracking).
- \`std::next_permutation\` in the C++ standard library generates permutations in lexicographic order in-place without recursion — useful when you just need to iterate through all permutations of a sorted sequence.

### When to use

- Any problem requiring exploration of all orderings: traveling salesman brute force (small n), arranging items to satisfy adjacency constraints, generating test permutations, puzzles like "arrange tiles so that...".

### Conceptual example

Permutations of \`{1, 2, 3}\` (used-array approach): starting with 1 fixed first, we get \`1,2,3\` and \`1,3,2\`; then similarly starting with 2 and with 3 — a total of \`3! = 6\` permutations.

### Complexity summary

| Aspect | Value |
|---|---|
| Total permutations | n! |
| Time (generating + copying all) | O(n! * n) |
| Space (recursion depth + used array) | O(n) |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// --- Approach 1: backtracking with a "used" marker array ---
void permuteUsed(const vector<int>& a, vector<int>& current, vector<bool>& used,
                  vector<vector<int>>& result) {
    if (current.size() == a.size()) {   // base case: full permutation built
        result.push_back(current);
        return;
    }
    for (int i = 0; i < (int)a.size(); i++) {
        if (used[i]) continue;           // skip elements already placed
        // choose
        used[i] = true;
        current.push_back(a[i]);
        // explore
        permuteUsed(a, current, used, result);
        // un-choose (backtrack)
        current.pop_back();
        used[i] = false;
    }
}

// --- Approach 2: in-place swap-based generation ---
void permuteSwap(vector<int>& a, int start, vector<vector<int>>& result) {
    if (start == (int)a.size()) {       // base case: positions 0..n-1 all fixed
        result.push_back(a);
        return;
    }
    for (int i = start; i < (int)a.size(); i++) {
        swap(a[start], a[i]);           // place a[i] at position 'start'
        permuteSwap(a, start + 1, result);
        swap(a[start], a[i]);           // backtrack: restore original order
    }
}

int main() {
    vector<int> a = {1, 2, 3};

    vector<vector<int>> result1;
    vector<int> current;
    vector<bool> used(a.size(), false);
    permuteUsed(a, current, used, result1);
    cout << "Used-array approach: " << result1.size() << " permutations\\n";

    vector<vector<int>> result2;
    permuteSwap(a, 0, result2);
    cout << "Swap-based approach: " << result2.size() << " permutations\\n";

    // Bonus: std::next_permutation for lexicographic generation
    vector<int> b = {1, 2, 3};
    sort(b.begin(), b.end());
    cout << "next_permutation sequence:\\n";
    do {
        for (int x : b) cout << x << " ";
        cout << "\\n";
    } while (next_permutation(b.begin(), b.end()));

    return 0;
}
\`\`\`
`,
};

export default topic;
