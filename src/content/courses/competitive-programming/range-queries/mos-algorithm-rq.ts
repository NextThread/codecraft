import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mos-algorithm-rq",
  title: "Mo's Algorithm",
  description: "Recap of Mo's offline sqrt-decomposition technique for answering static range queries, framed for the range-query toolbox.",
  readingTime: 7,
  content: `

# Mo's Algorithm (Range-Query Recap)

## Theory

> This is a concise recap. For the full derivation, proof of the sqrt-block ordering, and a
> from-scratch walkthrough, see the "Mo's Algorithm" topic in the Data Structures section — this
> version focuses on how Mo's algorithm fits into the broader family of *offline* range-query
> techniques alongside difference arrays, coordinate compression, and sweep lines.

### What it is
Mo's algorithm answers many offline range queries [l, r] on a static array by reordering them so that a
two-pointer window [curL, curR] can slide from one query to the next with an amortized small number of
element add/remove operations, instead of recomputing each query from scratch.

### Why it works
Queries are bucketed by \`l / blockSize\` (block size ~ sqrt(n)) and sorted by (block of l, r — ascending
for even blocks, descending for odd blocks as a common optimization). Because l only moves within a
block of size sqrt(n) before jumping to the next block, and r is roughly monotonic within a block, the
total pointer movement across all queries is bounded by O((n + q) * sqrt(n)) instead of O(n * q).

### Core idea
1. Pick a data structure/state that supports O(1) or O(log n) \`add(x)\` / \`remove(x)\` and gives the
   current answer for the active window.
2. Sort queries by (l / blockSize, r) with alternating direction per block (the "snake" ordering).
3. Move curL and curR one step at a time to match each query's [l, r], calling add/remove as they move.
4. Record the answer for the current window state at each query.

### Key observations
- This is a purely offline technique — it needs the whole query list in advance, exactly like the other
  entries in this section (offline queries, sweep line, parallel binary search).
- It shines when there's no known "nice" prefix-sum decomposition for the query (e.g., "count distinct
  values in [l, r]" or "mode of [l, r]"), where sweep-based BIT tricks don't directly apply.
- Not suitable for problems with updates unless you use Mo's Algorithm with Updates (the 3D variant).

### Complexity
- O((n + q) * sqrt(n)) amortized, using block size ~ n / sqrt(q) tuned for the specific add/remove cost.

### When to use
- Offline range queries with an easily incrementally-maintainable answer that lacks a direct prefix-sum
  formula: distinct count, mode, k-th smallest via frequency buckets, sum of squares of frequencies, etc.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int blockSize;
struct Query { int l, r, idx; };

bool moCompare(const Query& a, const Query& b) {
    int blockA = a.l / blockSize, blockB = b.l / blockSize;
    if (blockA != blockB) return blockA < blockB;
    // snake ordering: alternate direction of r to reduce pointer movement
    return (blockA & 1) ? (a.r > b.r) : (a.r < b.r);
}

vector<long long> mosAlgorithm(const vector<int>& a, vector<Query> queries) {
    int n = (int)a.size();
    blockSize = max(1, (int)sqrt((double)n));
    sort(queries.begin(), queries.end(), moCompare);

    vector<int> freq(*max_element(a.begin(), a.end()) + 1, 0);
    long long distinctCount = 0;
    vector<long long> ans(queries.size());

    auto add = [&](int pos) {
        if (freq[a[pos]]++ == 0) distinctCount++;
    };
    auto remove = [&](int pos) {
        if (--freq[a[pos]] == 0) distinctCount--;
    };

    int curL = 0, curR = -1;
    for (auto& q : queries) {
        while (curR < q.r) add(++curR);
        while (curL > q.l) add(--curL);
        while (curR > q.r) remove(curR--);
        while (curL < q.l) remove(curL++);
        ans[q.idx] = distinctCount;
    }
    return ans;
}

int main() {
    vector<int> a = {1, 2, 1, 3, 2, 4, 1};
    vector<Query> qs = {{0, 2, 0}, {0, 6, 1}, {2, 4, 2}};

    auto ans = mosAlgorithm(a, qs);
    for (auto x : ans) cout << x << '\n'; // distinct count per query, in original order
}
\`\`\`

`,
};

export default topic;
