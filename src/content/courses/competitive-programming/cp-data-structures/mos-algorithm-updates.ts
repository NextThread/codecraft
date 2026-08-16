import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mos-algorithm-updates",
  title: "Mo's Algorithm with Updates",
  description: "Extending Mo's algorithm with a time dimension to handle point updates between queries.",
  readingTime: 8,
  content: `

# Mo's Algorithm with Updates

## Theory

Standard **Mo's algorithm** only works on a static array. **Mo's algorithm with updates** ("Mo's with time") handles an interleaved sequence of range queries and point updates by adding a third dimension: **time** \`t\`, which counts how many updates have happened so far. Each query is now a triple \`(l, r, t)\` and the algorithm walks through a 3D space \`(l, r, t)\` instead of 2D.

### Core idea

- Maintain pointers \`curL, curR, curT\`.
- Sort queries by \`(l / B, r / B, t)\` (block on both \`l\` and \`r\`, with \`t\` as tertiary key; ties broken to keep monotonic direction similar to plain Mo's).
- To move \`curT\` forward, **apply** the next update (record old value, set new value, and update the current window's aggregate if the changed index lies inside \`[curL, curR]\`); to move it backward, **undo** the update (restore old value, similarly updating the aggregate if relevant).
- To move \`curL\`/\`curR\`, add/remove elements exactly like plain Mo's.

### Why it works

With block size \`B = n^(2/3)\` (tuned for this 3D variant), the total movement across all three pointers is **O(n^(5/3))**:
- \`l\` and \`r\` pointer movement, bounded similarly to 2D Mo's but now O(n) queries times O(B) for l/r within a block group, plus O(n/B) block-transitions each costing O(n) for r -> total O(n^2/B + qB).
- \`t\` pointer movement is O(n) per distinct (l-block, r-block) pair times O(number of such pairs) = O(n * (n/B)^2).
Balancing all terms with \`B = n^(2/3)\` gives total **O(n^(5/3))** for n queries/updates/array size of the same order.

### Key observations

- Each update must be **undoable**: store \`(position, oldValue, newValue)\` so it can be applied and rolled back.
- Applying/undoing an update only changes the answer if the position it touches currently lies inside \`[curL, curR]\`; otherwise it's a no-op on the aggregate (but still flips the stored array value for future application).
- Works for the same class of aggregates as plain Mo's (invertible add/remove), extended with an invertible "update" op.
- Complexity: O(n^(5/3)) time typically, O(n) memory.

### When to use

- Offline problems with a mix of point updates and range queries where you need e.g. "distinct values in [l,r]" and values can change over time.
- When persistent segment trees or BIT-of-BITs would be more complex to implement under time pressure.

### Small example

Array \`[1,2,3]\`; update: set a[1]=5 at time 1; query (0,2) at time 0 and query (0,2) at time 1 give different distinct counts (3 vs 3, but composition differs) — the key point is queries "see" only updates with \`t' <= their t\`.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n;
    vector<int> a(n);
    for (auto &x : a) cin >> x;

    struct Update { int pos, newVal; };
    struct Query { int l, r, t, idx; };
    vector<Update> updates;
    vector<Query> queries;

    cin >> q;
    for (int i = 0; i < q; ++i) {
        char type; cin >> type;
        if (type == 'Q') {
            int l, r; cin >> l >> r;
            queries.push_back({l, r, (int)updates.size(), (int)queries.size()});
        } else {
            int pos, val; cin >> pos >> val;
            updates.push_back({pos, val});
        }
    }

    int B = max(1, (int)round(pow((double)n, 2.0 / 3.0)));
    sort(queries.begin(), queries.end(), [&](const Query& x, const Query& y) {
        int bxL = x.l / B, byL = y.l / B;
        if (bxL != byL) return bxL < byL;
        int bxR = x.r / B, byR = y.r / B;
        if (bxR != byR) return bxR < byR;
        return x.t < y.t;
    });

    int maxV = 1;
    for (int v : a) maxV = max(maxV, v);
    for (auto &u : updates) maxV = max(maxV, u.newVal);
    vector<int> freq(maxV + 1, 0);
    long long distinctCount = 0;
    int curL = 0, curR = -1, curT = 0;
    vector<long long> answer(q);

    auto add = [&](int val) { if (freq[val]++ == 0) ++distinctCount; };
    auto remove = [&](int val) { if (--freq[val] == 0) --distinctCount; };

    auto applyUpdate = [&](int t) {
        auto& u = updates[t];
        if (u.pos >= curL && u.pos <= curR) { remove(a[u.pos]); add(u.newVal); }
        swap(a[u.pos], u.newVal);   // now u.newVal holds the OLD value, for easy undo
    };
    auto undoUpdate = [&](int t) { applyUpdate(t); }; // applying the swapped update again undoes it

    for (const auto& query : queries) {
        while (curR < query.r) add(a[++curR]);
        while (curL > query.l) add(a[--curL]);
        while (curR > query.r) remove(a[curR--]);
        while (curL < query.l) remove(a[curL++]);
        while (curT < query.t) applyUpdate(curT++);
        while (curT > query.t) undoUpdate(--curT);
        answer[query.idx] = distinctCount;
    }

    for (int i = 0; i < q; ++i) if (i < (int)answer.size()) cout << answer[i] << '\\n';
}
\`\`\`
`,
};

export default topic;
