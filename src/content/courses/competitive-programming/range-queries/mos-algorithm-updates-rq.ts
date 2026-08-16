import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mos-algorithm-updates-rq",
  title: "Mo's Algorithm with Updates",
  description: "Recap of the 3D Mo's algorithm variant that also processes point updates, adapted for offline range-query workflows.",
  readingTime: 7,
  content: `

# Mo's Algorithm with Updates (Range-Query Recap)

## Theory

> This is a concise recap. For the full derivation and step-by-step build-up from the base algorithm,
> see the "Mo's Algorithm with Updates" topic in the Data Structures section — this version highlights
> where it fits among offline range-query techniques (alongside plain Mo's algorithm, offline queries,
> and offline dynamic connectivity).

### What it is
An extension of Mo's algorithm that also supports point updates between queries, by adding a third
dimension — "time" (i.e., how many updates have been applied) — to the sort key alongside l and r. It
processes each query as a triple (l, r, t) where t is the number of updates that should be visible when
answering that query.

### Why it works
Just as Mo's algorithm bounds total (l, r) pointer movement across queries sorted by blocks, adding a
time pointer \`curT\` that also moves monotonically-ish under a similar block-based ordering bounds the
total number of update-apply / update-undo operations. Sorting queries by (block(l), block(r), t) keeps
all three pointers (curL, curR, curT) from jumping too far between consecutive queries.

### Core idea
1. Record the full timeline: the original array and a list of updates (position, old value, new value)
   applied in order.
2. Each query becomes (l, r, t) where t = number of updates already applied at the time the query was
   asked (0 = before any updates).
3. Sort queries by (l / blockSize, r / blockSize, t) — using two-level blocking (size ~ n^(2/3) is
   standard for this variant) with alternating direction for the second key to smooth pointer motion.
4. Maintain curL, curR, curT. To move curT forward, apply the next update to the array and the
   add/remove tracking structure (as if the changed position were removed then re-added if it's
   currently inside [curL, curR]); to move curT backward, undo the update similarly.

### Key observations
- Still fully offline: every update and query must be known in advance.
- Optimal block size differs from the plain version: ~n^(2/3) balances the extra time dimension.
- More constant-factor heavy than plain Mo's algorithm; only reach for it when updates are truly
  point updates interleaved with range queries and no simpler BIT/segment-tree trick applies.

### Complexity
- O(n^(5/3)) roughly, i.e., O((n + q + u)^(5/3))-ish depending on block tuning, where u is the number of
  updates — significantly worse per-operation than plain Mo's O(n sqrt n), so only use when needed.

### When to use
- Offline problems needing both point updates and range queries where the aggregate (distinct count,
  frequency-based stats) has no simple update-friendly data structure (otherwise prefer a BIT/segment
  tree of frequency counts, which is usually simpler and faster).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Update { int pos, newVal; };
struct Query3D { int l, r, t, idx; };

int blockSize;
bool cmp3D(const Query3D& a, const Query3D& b) {
    int ba = a.l / blockSize, bb = b.l / blockSize;
    if (ba != bb) return ba < bb;
    int ra = a.r / blockSize, rb = b.r / blockSize;
    if (ra != rb) return (ba & 1) ? ra > rb : ra < rb;
    return (ra & 1) ? a.t > b.t : a.t < b.t; // alternate time direction too
}

vector<long long> mosWithUpdates(vector<int> a, vector<Update> updates, vector<Query3D> queries) {
    int n = (int)a.size();
    blockSize = max(1, (int)round(pow((double)n, 2.0 / 3.0)));
    sort(queries.begin(), queries.end(), cmp3D);

    int maxVal = *max_element(a.begin(), a.end());
    for (auto& u : updates) maxVal = max(maxVal, u.newVal);
    vector<int> freq(maxVal + 1, 0);
    long long distinctCount = 0;

    auto add = [&](int val) { if (freq[val]++ == 0) distinctCount++; };
    auto remove = [&](int val) { if (--freq[val] == 0) distinctCount--; };

    int curL = 0, curR = -1, curT = 0;
    vector<long long> ans(queries.size());

    auto applyUpdate = [&](int t, int dir) {
        // dir = +1 apply updates[t], dir = -1 undo it (swap old/new roles)
        Update& u = updates[t];
        if (u.pos >= curL && u.pos <= curR) remove(a[u.pos]); // remove stale value if visible
        swap(a[u.pos], u.newVal); // stores previous value back into u.newVal for undo symmetry
        if (u.pos >= curL && u.pos <= curR) add(a[u.pos]);
    };

    for (auto& q : queries) {
        while (curR < q.r) add(a[++curR]);
        while (curL > q.l) add(a[--curL]);
        while (curR > q.r) remove(a[curR--]);
        while (curL < q.l) remove(a[curL++]);
        while (curT < q.t) applyUpdate(curT++, +1);
        while (curT > q.t) applyUpdate(--curT, -1);
        ans[q.idx] = distinctCount;
    }
    return ans;
}

int main() {
    vector<int> a = {1, 2, 3, 2, 1};
    vector<Update> updates = {{0, 5}, {2, 2}}; // pos, newVal
    vector<Query3D> qs = {
        {0, 4, 0, 0}, // distinct count before any update
        {0, 4, 1, 1}, // after 1st update
        {0, 4, 2, 2}, // after both updates
    };

    auto ans = mosWithUpdates(a, updates, qs);
    for (auto x : ans) cout << x << '\n';
}
\`\`\`

`,
};

export default topic;
