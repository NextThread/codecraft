import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prefix-frequency",
  title: "Prefix Frequency",
  description: "Answer range count-of-value queries in O(1) per query.",
  readingTime: 4,
  content: `
# Prefix Frequency

## Theory

When array values come from a small universe (say characters, or integers in \`[0, V]\`), a **prefix frequency** table lets us answer "how many times does value \`v\` appear in \`a[l..r]\`?" in **O(1)**.

Build a 2D table \`f[i][v]\` = count of value \`v\` in \`a[0..i-1]\`. Then:

\`\`\`
count(v in a[l..r]) = f[r + 1][v] - f[l][v]
\`\`\`

- Preprocessing: **O(n * V)**.
- Query: **O(1)** per (l, r, v).
- Space: **O(n * V)** — only viable when \`V\` is small.

### When to use

- Strings over an alphabet of 26 letters (competitive programming staple).
- Counting occurrences of digits in ranges.
- Palindrome / anagram range checks.

### Alternative for large \`V\`

Store, for each value, the sorted list of positions where it occurs and use \`lower_bound\` / \`upper_bound\` — \`O(log n)\` per query, \`O(n)\` memory.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "banana";
    int n = s.size();
    vector<array<int, 26>> f(n + 1);
    f[0].fill(0);
    for (int i = 0; i < n; ++i) {
        f[i + 1] = f[i];
        ++f[i + 1][s[i] - 'a'];
    }

    auto countInRange = [&](int l, int r, char c) {
        return f[r + 1][c - 'a'] - f[l][c - 'a'];
    };

    cout << countInRange(0, 5, 'a') << "\\n";   // 3
    cout << countInRange(1, 3, 'n') << "\\n";   // 1

    // Check if s[l..r] is an anagram of another substring.
    auto sliceFreq = [&](int l, int r) {
        array<int, 26> res{};
        for (int k = 0; k < 26; ++k) res[k] = f[r + 1][k] - f[l][k];
        return res;
    };
    cout << (sliceFreq(0, 2) == sliceFreq(2, 4)) << "\\n";
}
\`\`\`
`,
};

export default topic;
