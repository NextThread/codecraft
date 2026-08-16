import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "subsequences",
  title: "Subsequences",
  description: "Generate and reason about subsequences of a sequence, distinguishing them from subsets and substrings/subarrays.",
  readingTime: 8,
  content: `
# Subsequences

## Theory

### What is a subsequence?

A **subsequence** of a sequence is obtained by deleting zero or more elements **without changing the relative order** of the remaining elements. Unlike a **substring/subarray**, elements of a subsequence need not be contiguous. Unlike a **subset** (which applies to unordered sets), a subsequence is tied to a specific array/string and preserves original ordering, which matters when elements repeat.

For a sequence of length \`n\`, there are exactly \`2^n\` subsequences (including the empty one), because — exactly like subsets — each element is either kept or dropped, independently.

### Why the include/exclude recursion works

Fix the first element. Any subsequence either:
- **skips** it, in which case the rest is any subsequence of the remaining \`n-1\` elements, or
- **includes** it as its first kept element, in which case the rest is any subsequence of the remaining \`n-1\` elements, appended after it.

This is the same combinatorial argument as subsets, but here we care about preserving the **original index order** — that's automatically satisfied since we scan left to right and only append, never reorder.

### Core idea

Recurse over the index \`i\` from \`0\` to \`n\`. At each step, branch:
1. Exclude \`a[i]\`, recurse to \`i+1\`.
2. Include \`a[i]\` (append to current sequence), recurse to \`i+1\`, then remove it (backtrack).

When \`i == n\`, the current path is a complete subsequence — record or process it.

### Key observations

- Subsequences vs. subarrays/substrings: a subarray/substring requires **contiguity**; a subsequence does not. Subarrays number O(n^2) (choose start and end), while subsequences number O(2^n) — a much larger, exponential count.
- If the original sequence has **duplicate values**, distinct index choices can produce identical subsequences as *value sequences*. Depending on the problem, you may need to dedupe (e.g., sort + skip same value at the same recursion depth) or you may want to count them as distinct because they come from different positions — read the problem statement carefully.
- Many "does there exist a subsequence with property X" problems (subsequence sum equals target, longest increasing subsequence, longest common subsequence) are naturally phrased with this same include/exclude recursive state, and are prime candidates for dynamic programming once you notice overlapping states.
- The empty subsequence and the full sequence are always included in the count of \`2^n\`.

### When to use

- Problems mentioning "subsequence" explicitly (LIS, LCS, subsequence matching, subset-sum-like problems phrased on arrays) — the include/exclude recursion is the natural brute-force starting point before optimizing with DP.

### Conceptual example

For the string \`"abc"\`, the 8 subsequences are:
\`"", "c", "b", "bc", "a", "ac", "ab", "abc"\`
(order depends on which branch — include or exclude — is explored first).

### Complexity summary

| Aspect | Value |
|---|---|
| Total subsequences | 2^n |
| Time to generate all (with copying) | O(2^n * n) |
| Recursion depth | O(n) |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Generate all subsequences of a string via include/exclude recursion
void generateSubsequences(const string& s, int idx, string& current,
                           vector<string>& result) {
    if (idx == (int)s.size()) {         // base case: processed every character
        result.push_back(current);
        return;
    }
    // Choice 1: exclude s[idx]
    generateSubsequences(s, idx + 1, current, result);

    // Choice 2: include s[idx]
    current.push_back(s[idx]);
    generateSubsequences(s, idx + 1, current, result);
    current.pop_back();                 // backtrack
}

// Example: does any subsequence of 'a' sum exactly to 'target'? (subset-sum style)
bool subsequenceSumExists(const vector<int>& a, int idx, int target) {
    if (target == 0) return true;                  // found an exact match
    if (idx == (int)a.size()) return false;        // ran out of elements
    // include a[idx] OR exclude it
    if (subsequenceSumExists(a, idx + 1, target - a[idx])) return true;
    return subsequenceSumExists(a, idx + 1, target);
}

int main() {
    string s = "abc";
    vector<string> subs;
    string current;
    generateSubsequences(s, 0, current, subs);

    cout << "Subsequences of \\"" << s << "\\" (" << subs.size() << "):\\n";
    for (auto& sub : subs) cout << "\\"" << sub << "\\" ";
    cout << "\\n";

    vector<int> a = {3, 34, 4, 12, 5, 2};
    int target = 9;
    cout << "Subsequence summing to " << target << "? "
         << (subsequenceSumExists(a, 0, target) ? "yes" : "no") << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
