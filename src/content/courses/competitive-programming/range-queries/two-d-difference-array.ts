import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "two-d-difference-array",
  title: "2D Difference Array",
  description: "Apply range updates on a 2D grid and recover final values with a single 2D prefix sum pass.",
  readingTime: 8,
  content: `

# 2D Difference Array

## Theory

### What it is
The 2D difference array generalizes the classic 1D difference array trick to grids. It lets you apply
many rectangular range-add updates to a 2D array in O(1) per update, then reconstruct the final array
with a single O(n*m) pass using a 2D prefix sum.

### Why it works
In 1D, adding v to a range [l, r] can be encoded as diff[l] += v and diff[r+1] -= v; taking the prefix
sum of diff reproduces the update. In 2D, a rectangle update on rows [r1, r2] and columns [c1, c2] can
be encoded using inclusion-exclusion on the four corners of the rectangle:

\`\`\`
diff[r1][c1]     += v
diff[r1][c2+1]   -= v
diff[r2+1][c1]   -= v
diff[r2+1][c2+1] += v
\`\`\`

Taking the 2D prefix sum of diff afterward reconstructs an array where every cell inside the rectangle
has been incremented by v exactly once, and cells outside are untouched. This works because the four
corner adjustments cancel out correctly outside the rectangle boundaries (standard inclusion-exclusion),
the same idea used for 2D prefix sums themselves.

### Core idea
1. Maintain a difference grid \`diff\` of size (n+1) x (m+1) (extra row/column to avoid bounds checks).
2. For each rectangle update (r1, c1, r2, c2, v), touch only the 4 corners in O(1).
3. After all updates, compute the 2D prefix sum of \`diff\` in place to get the final grid.

### Key observations
- Only works when all updates are known before any query is answered (fully offline), OR you process
  all updates first and then do all queries after building the final grid.
- Extending to 3D (or higher) difference arrays follows the same inclusion-exclusion pattern with 2^d
  corner updates for a d-dimensional box.
- Combines well with coordinate compression when rectangle coordinates come from a large range but only
  a few distinct values actually matter.

### Complexity
- Each rectangle update: O(1).
- Final reconstruction (2D prefix sum): O(n*m).
- Total for q updates on an n x m grid: O(n*m + q), versus O(q*n*m) for naive per-cell updates.

### When to use
- You need to apply many axis-aligned rectangle "add v" operations to a grid and only need the final
  state (not intermediate states) — e.g., counting overlapping rectangles, image stamping, "how many
  intervals of 2D events cover each cell" style problems.
- Not suitable if you need to answer queries interleaved with updates (use a 2D Fenwick tree / BIT with
  range update-range query instead for that).

### Small example
Grid is 4x4 (0-indexed), apply +1 to rectangle rows [1,2], cols [1,2], and +1 to rectangle rows [0,3],
cols [0,0]. After building diff and taking the 2D prefix sum, cell (1,1) gets +1 from the first
rectangle, cell (0,0) gets +1 from the second rectangle, etc. The result matches applying both updates
directly cell by cell, but was computed in O(1) + O(1) update time instead of O(area) per update.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Diff2D {
    int n, m;
    vector<vector<long long>> diff; // (n+2) x (m+2) to be safe with +1 indices

    Diff2D(int n_, int m_) : n(n_), m(m_), diff(n_ + 2, vector<long long>(m_ + 2, 0)) {}

    // add v to all cells with r1 <= r <= r2, c1 <= c <= c2 (0-indexed, inclusive)
    void rangeAdd(int r1, int c1, int r2, int c2, long long v) {
        diff[r1][c1]         += v;
        diff[r1][c2 + 1]     -= v;
        diff[r2 + 1][c1]     -= v;
        diff[r2 + 1][c2 + 1] += v;
    }

    // builds and returns the final n x m grid after all rangeAdd calls
    vector<vector<long long>> build() {
        vector<vector<long long>> grid(n, vector<long long>(m, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                long long val = diff[i][j];
                if (i > 0) val += grid[i - 1][j];
                if (j > 0) val += grid[i][j - 1];
                if (i > 0 && j > 0) val -= grid[i - 1][j - 1];
                grid[i][j] = val;
            }
        }
        return grid;
    }
};

int main() {
    int n = 4, m = 4;
    Diff2D d(n, m);

    d.rangeAdd(1, 1, 2, 2, 1); // +1 to a 2x2 inner square
    d.rangeAdd(0, 0, 3, 0, 1); // +1 to the entire first column

    auto grid = d.build();
    for (auto &row : grid) {
        for (auto x : row) cout << x << ' ';
        cout << '\n';
    }
}
\`\`\`

`,
};

export default topic;
