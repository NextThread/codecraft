import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "2d-prefix-sum",
  title: "2D Prefix Sum",
  description: "Answer submatrix sum queries in O(1) using inclusion-exclusion.",
  readingTime: 4,
  content: `
# 2D Prefix Sum

## Theory

Extend prefix sums to a 2D grid \`a\` of size \`n x m\`. Define:

\`\`\`
p[i][j] = sum of a[0..i-1][0..j-1]
\`\`\`

Then the sum of the sub-rectangle with corners \`(r1, c1)\` and \`(r2, c2)\` (inclusive) is:

\`\`\`
p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1]
\`\`\`

This is inclusion-exclusion in two dimensions.

- Preprocessing: **O(n * m)**.
- Query: **O(1)**.
- Space: **O(n * m)**.

### Building the table

\`\`\`
p[i][j] = a[i-1][j-1] + p[i-1][j] + p[i][j-1] - p[i-1][j-1]
\`\`\`

### Applications

- Fast submatrix sum queries (image processing, DP on grids).
- Counting rectangles with specific properties.
- 2D histogram queries.
- Foundation for 2D difference arrays.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<vector<int>> a = {
        {3, 1, 4},
        {1, 5, 9},
        {2, 6, 5}
    };
    int n = a.size(), m = a[0].size();
    vector<vector<long long>> p(n + 1, vector<long long>(m + 1, 0));

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            p[i][j] = a[i - 1][j - 1] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];

    auto rectSum = [&](int r1, int c1, int r2, int c2) {
        return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
    };

    cout << rectSum(0, 0, 1, 1) << "\\n";   // 3+1+1+5 = 10
    cout << rectSum(1, 1, 2, 2) << "\\n";   // 5+9+6+5 = 25
}
\`\`\`
`,
};

export default topic;
