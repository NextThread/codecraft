import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "pascal-triangle",
  title: "Pascal Triangle",
  description: "Pascal Triangle \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Pascal Triangle

## Theory

**Pascal's triangle** is the triangular array where entry \`(n, k)\` (0-indexed) equals \`C(n, k)\`. Row \`n\` has \`n + 1\` entries and sums to \`2^n\`.

\`\`\`
Row 0:            1
Row 1:          1   1
Row 2:        1   2   1
Row 3:      1   3   3   1
Row 4:    1   4   6   4   1
Row 5:  1   5  10  10   5   1
\`\`\`

### Pascal's rule

\`C(n, k) = C(n - 1, k - 1) + C(n - 1, k)\`

Directly gives a bottom-up DP in \`O(n^2)\` time and \`O(n^2)\` (or \`O(n)\` with rolling) space. Perfect for \`n <= 5000\`.

### Cool patterns

- **Row sum** = \`2^n\`
- **Alternating row sum** = 0 for \`n >= 1\`
- **Fibonacci** = sum of shallow diagonals
- **Sierpinski triangle** — highlight odd entries; you get the fractal
- **Hockey stick**: \`sum_{i=r..n} C(i, r) = C(n+1, r+1)\`

### When to use Pascal vs. factorial method

Pascal is faster and simpler when \`n <= ~5000\`. Beyond that, factorial + inverse factorial precomputation (see nCr) is the way.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Full Pascal's triangle up to row n — O(n^2).
vector<vector<long long>> pascal(int n) {
    vector<vector<long long>> T(n + 1);
    for (int i = 0; i <= n; i++) {
        T[i].assign(i + 1, 1);
        for (int j = 1; j < i; j++) T[i][j] = (T[i-1][j-1] + T[i-1][j]) % MOD;
    }
    return T;
}

// One row at a time — O(n) space if you only need the current row.
vector<long long> pascalRow(int n) {
    vector<long long> row(n + 1, 0);
    row[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = i; j > 0; j--) row[j] = (row[j] + row[j-1]) % MOD;
    return row;
}

int main() {
    auto T = pascal(6);
    for (auto &r : T) { for (auto x : r) cout << x << ' '; cout << '\\n'; }
    auto r = pascalRow(10);
    for (auto x : r) cout << x << ' ';   // 1 10 45 120 210 252 210 120 45 10 1
}
\`\`\`
`,
};

export default topic;
