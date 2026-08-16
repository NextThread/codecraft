import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mos-algorithm",
  title: "Mo's Algorithm",
  description: "Offline square-root decomposition of queries for range problems with an invertible add/remove operation.",
  readingTime: 8,
  content: `

# Mo's Algorithm

## Theory

**Mo's algorithm** answers many **offline** range queries \`[l, r]\` on a static array efficiently when you have cheap \`add(x)\` / \`remove(x)\` operations that update a running answer as the window \`[curL, curR]\` grows or shrinks by one element. Instead of processing queries in input order, it **reorders** them so the window moves a total of only O((n + q) * sqrt(n)) steps.

### Core idea

Split the array into blocks of size \`B ~ sqrt(n)\`. Sort queries by:
1. block of \`l\` (i.e. \`l / B\`)
2. \`r\` (ascending in even blocks, descending in odd blocks — the "boustrophedon" trick to avoid resetting \`r\` every block)

Then maintain a current window \`[curL, curR]\` and slide it to match each query's \`[l, r]\` by repeatedly calling \`add\`/\`remove\` at the boundaries.

### Why it works

- Within one block of \`l\` (size B), \`r\` only moves forward (or only backward), so total \`r\` movement across all queries in that block is O(n), and there are O(n/B) blocks -> O(n * n / B) = O(n * sqrt n) for the \`r\` pointer.
- \`l\` moves at most O(B) per query (since queries in the same block have \`l\` within B of each other, plus the block sort ensures neighbouring queries have close \`l\`), giving O(q * B) total.
- Balancing gives \`B = sqrt(n)\`, total **O((n + q) sqrt n)**.

### Key observations

- Requires the underlying operation to support both \`add\` and \`remove\` (i.e., be easily reversible) — e.g. frequency counts, running sum, "distinct count", but NOT things like min/max that can't easily be un-done.
- Purely offline: you must know all queries in advance.
- Extends to **Mo's with updates** (adding a time dimension) and to **Mo's on trees** (via Euler tour flattening).
- Complexity: O((n + q) sqrt n) time, O(n + q) memory.

### When to use

- Many range queries on a static array, asking for something like "number of distinct values in [l,r]", "sum of (freq[v])^2", "count of value v in range", where per-element add/remove is O(1) or O(log n).
- When online (per-query immediate answer) processing isn't required and there's no simpler data structure (e.g. persistent structures) available.

### Small example

Array \`[1,1,2,3,1]\`, queries: distinct-count(0,2), distinct-count(1,4).
Sorted by Mo's order, we slide the window adding/removing elements and updating a frequency map + distinct counter, answering both queries touching each array element O(1) amortized number of times overall.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    // Example: array of values in [1, MAXV], queries ask for number of distinct values in [l, r] (0-indexed, inclusive)
    cin >> n;
    vector<int> a(n);
    for (auto &x : a) cin >> x;
    cin >> q;

    struct Query { int l, r, idx; };
    vector<Query> queries(q);
    for (int i = 0; i < q; ++i) {
        cin >> queries[i].l >> queries[i].r;
        queries[i].idx = i;
    }

    int B = max(1, (int)sqrt((double)n));
    sort(queries.begin(), queries.end(), [&](const Query& a1, const Query& b1) {
        int blockA = a1.l / B, blockB = b1.l / B;
        if (blockA != blockB) return blockA < blockB;
        // even block: r ascending, odd block: r descending (removes need to reset r each block)
        return (blockA & 1) ? (a1.r > b1.r) : (a1.r < b1.r);
    });

    vector<int> freq(*max_element(a.begin(), a.end()) + 1, 0);
    int curL = 0, curR = -1;      // empty window [curL, curR]
    long long distinctCount = 0;
    vector<long long> answer(q);

    auto add = [&](int pos) {
        if (freq[a[pos]]++ == 0) ++distinctCount;
    };
    auto remove = [&](int pos) {
        if (--freq[a[pos]] == 0) --distinctCount;
    };

    for (const auto& query : queries) {
        while (curR < query.r) add(++curR);
        while (curL > query.l) add(--curL);
        while (curR > query.r) remove(curR--);
        while (curL < query.l) remove(curL++);
        answer[query.idx] = distinctCount;
    }

    for (int i = 0; i < q; ++i) cout << answer[i] << '\\n';
}
\`\`\`
`,
};

export default topic;
