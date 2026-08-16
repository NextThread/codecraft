import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "subsets",
  title: "Subsets",
  description: "Generate all subsets (the power set) of a collection using recursive include/exclude choices and bitmasking.",
  readingTime: 9,
  content: `
# Subsets

## Theory

### What is the subset generation problem?

Given a set (or array) of \`n\` distinct elements, generate all \`2^n\` subsets, including the empty set and the full set itself. This collection of all subsets is called the **power set**.

### Why 2^n subsets?

For every element, there are exactly two independent choices: include it in the subset or exclude it. Since these choices are made independently for each of the \`n\` elements, by the multiplication principle there are \`2 * 2 * ... * 2\` (\`n\` times) \`= 2^n\` total combinations.

### Core idea (recursive include/exclude)

Process elements one at a time by index. At each index, branch into two recursive calls:

1. **Exclude** the current element, recurse on the rest.
2. **Include** the current element (add it to the current partial subset), recurse on the rest, then remove it again (backtrack) so the next branch starts clean.

When the index reaches \`n\` (no elements left to decide on), the current partial subset is complete — record it.

### Alternative: bitmask enumeration

Since each subset corresponds to a unique binary string of length \`n\` (bit \`i\` = 1 means "element \`i\` is included"), you can enumerate all subsets iteratively by looping a mask from \`0\` to \`2^n - 1\` and checking which bits are set. This avoids recursion entirely and is often simpler and faster in practice for small \`n\`.

### Key observations

- The recursion tree has exactly \`2^n\` leaves (complete subsets) and total number of nodes is O(2^n) as well, so total time is O(2^n * n) if you copy each subset (each subset can have up to n elements, copying costs O(n)).
- Subsets can be generated in **lexicographic order** naturally if you always try "exclude" before "include" (or vice versa) consistently at each level.
- This exact recursive shape (two choices per element) generalizes to sequences with repeated elements: sort first, then skip duplicate values at the same recursion level to avoid generating duplicate subsets.
- Bitmask method needs \`n\` to be small enough (typically n <= ~20-24) since \`2^n\` grows extremely fast; both methods share the same asymptotic complexity but bitmask has lower constant overhead (no function call stack).

### When to use

- Need to explore all possible selections from a collection: subset-sum feasibility (small n), enumerating team compositions, brute-force search over feature/item selections, generating test cases.

### Conceptual example

For \`{1, 2, 3}\`, recursive include/exclude produces (in one natural order):
\`{}, {3}, {2}, {2,3}, {1}, {1,3}, {1,2}, {1,2,3}\`
— 8 subsets total, matching \`2^3\`.

### Complexity summary

| Approach | Time | Extra space |
|---|---|---|
| Recursive include/exclude | O(2^n * n) | O(n) recursion depth + O(2^n * n) to store all subsets |
| Bitmask enumeration | O(2^n * n) | O(1) extra besides output |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// --- Approach 1: recursive include/exclude ---
void generateSubsetsRec(const vector<int>& a, int idx, vector<int>& current,
                         vector<vector<int>>& result) {
    if (idx == (int)a.size()) {          // base case: decided for every element
        result.push_back(current);       // record a completed subset
        return;
    }
    // Choice 1: exclude a[idx]
    generateSubsetsRec(a, idx + 1, current, result);

    // Choice 2: include a[idx]
    current.push_back(a[idx]);
    generateSubsetsRec(a, idx + 1, current, result);
    current.pop_back();                  // backtrack: undo the inclusion
}

// --- Approach 2: bitmask enumeration (iterative, no recursion) ---
vector<vector<int>> generateSubsetsBitmask(const vector<int>& a) {
    int n = a.size();
    vector<vector<int>> result;
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int bit = 0; bit < n; bit++) {
            if (mask & (1 << bit)) subset.push_back(a[bit]); // bit set -> include a[bit]
        }
        result.push_back(subset);
    }
    return result;
}

int main() {
    vector<int> a = {1, 2, 3};

    vector<vector<int>> resultRec;
    vector<int> current;
    generateSubsetsRec(a, 0, current, resultRec);

    cout << "Recursive: " << resultRec.size() << " subsets\\n";
    for (auto& s : resultRec) {
        cout << "{ ";
        for (int x : s) cout << x << " ";
        cout << "}\\n";
    }

    auto resultBitmask = generateSubsetsBitmask(a);
    cout << "Bitmask: " << resultBitmask.size() << " subsets\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
