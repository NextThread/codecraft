import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "offline-queries",
  title: "Offline Queries",
  description: "Read all queries in advance and reorder or batch them to answer with simpler, faster data structures.",
  readingTime: 9,
  content: `

# Offline Queries

## Theory

### What it is
"Offline" query processing means you are allowed to read the entire set of queries before answering any
of them, and you are free to answer them in any order (as long as you tag each answer with its original
query index to output correctly). This extra freedom often turns a hard "online" problem (must answer
each query immediately, in given order) into an easy one solvable with simpler structures like a
Fenwick tree, DSU, or a simple sweep.

### Why it works
Online algorithms must support arbitrary interleavings of updates and queries without knowing the
future. Offline algorithms can sort or group queries by some property (e.g., right endpoint, time,
value) so that when a query is processed, the data structure is in exactly the state needed to answer
it cheaply — often because updates are applied incrementally and monotonically as we sweep through the
sorted order, rather than being applied and rolled back repeatedly.

### Core idea
1. Read all n array/graph operations and all q queries into memory first.
2. Choose an order to process queries that makes the required data structure state easy to build
   incrementally (common choices: sort by right endpoint for interval problems, sort by time for
   dynamic connectivity, sort by threshold value for "count elements <= v" style queries).
3. Sweep through the chosen order, applying updates/insertions as needed, and answer each query the
   moment the data structure reflects exactly the elements relevant to it.
4. Store answers indexed by original query number, then output in original order at the end.

### Key observations
- Offline processing is what makes CDQ divide and conquer, Mo's algorithm, the offline "smaller to the
  left" counting trick (BIT + sorting by value), and offline dynamic connectivity (segment tree over
  time + rollback DSU) all work.
- A very common pattern: "count pairs/queries with property P" by sorting both the array and the
  queries by value, then sweeping while maintaining a Fenwick tree of "seen so far".
- Offline processing cannot be used if the problem explicitly requires answering in real time before
  future queries are revealed (truly online / interactive problems).
- Combine with coordinate compression when the offline sweep key comes from a large domain.

### Complexity
- Typically O((n + q) log(n + q)) for the sort plus O(log n) per Fenwick/BIT operation during the sweep,
  i.e. O((n + q) log n) overall — much better than a naive O(n) or worse per query.

### When to use
- Range queries where all queries are known upfront and order of answering doesn't matter (offline
  range-sum / range-mode via Mo's algorithm, static range k-th smallest via merge sort tree or
  persistent segment tree, or via offline BIT sweep).
- Counting inversions, "for each query (l, r) count distinct values" (classic offline BIT sweep by r),
  and dynamic connectivity queries when the full update timeline is known in advance.

### Small example
Query: for each of q queries (l, r), count distinct values in a[l..r]. Sort queries by r. Sweep i from
1 to n, maintaining a BIT over positions where position p is "active" (+1) only if a[p] is the last
occurrence of its value seen so far (deactivate the previous occurrence, if any, with -1). When i
reaches a query's r, answer it with BIT prefix sum over [l, r]. This offline reordering turns an
O(n) per query brute force into O((n + q) log n) total.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Fenwick tree (BIT) supporting point update and prefix sum
struct BIT {
    vector<long long> tree;
    int n;
    BIT(int n_) : n(n_), tree(n_ + 1, 0) {}
    void update(int i, long long delta) { // 1-indexed
        for (; i <= n; i += i & (-i)) tree[i] += delta;
    }
    long long query(int i) const { // prefix sum [1, i]
        long long s = 0;
        for (; i > 0; i -= i & (-i)) s += tree[i];
        return s;
    }
    long long rangeSum(int l, int r) const { return query(r) - query(l - 1); }
};

// Offline "distinct values in [l, r]" using sort-by-r + BIT sweep
vector<long long> countDistinctOffline(const vector<int>& a, const vector<pair<int,int>>& queries) {
    int n = (int)a.size();
    int q = (int)queries.size();

    // group query indices by their right endpoint
    vector<vector<int>> byR(n + 1);
    for (int i = 0; i < q; i++) {
        auto [l, r] = queries[i]; // 0-indexed inclusive
        byR[r].push_back(i);
    }

    BIT bit(n);
    unordered_map<int, int> lastPos; // value -> last 1-indexed position seen
    vector<long long> ans(q);

    for (int i = 0; i < n; i++) {
        int v = a[i];
        if (lastPos.count(v)) bit.update(lastPos[v], -1); // remove stale occurrence
        bit.update(i + 1, +1);
        lastPos[v] = i + 1;

        for (int qi : byR[i]) {
            auto [l, r] = queries[qi];
            ans[qi] = bit.rangeSum(l + 1, r + 1); // convert to 1-indexed
        }
    }
    return ans;
}

int main() {
    vector<int> a = {1, 2, 1, 3, 2, 4};
    vector<pair<int,int>> queries = {{0, 2}, {0, 5}, {2, 4}}; // 0-indexed inclusive [l, r]

    auto ans = countDistinctOffline(a, queries);
    for (auto x : ans) cout << x << '\n';
}
\`\`\`

`,
};

export default topic;
