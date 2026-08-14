import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "activity-selection",
  title: "Activity Selection",
  description: "The canonical earliest-finish-time greedy, with variants.",
  readingTime: 5,
  content: `

# Activity Selection

## Theory

**Problem.** n activities with start \`s_i\` and finish \`f_i\` share one resource. Select the largest set of mutually compatible activities.

**Greedy rule.** Repeatedly pick the compatible activity with the **smallest finish time**.

**Proof (exchange).** Let \`a\` be the activity with the smallest finish time and \`OPT\` an optimal solution whose first activity is \`b\`. Since \`f_a <= f_b\`, replacing \`b\` by \`a\` keeps compatibility and the same size. Induct on the remaining sub-instance starting after \`f_a\`.

### Variants

- **k resources / machines**: sort by start time, keep a min-heap of the machines' free times; assign to the machine that frees earliest — this is exactly the "minimum rooms" heap.
- **Weighted activity selection**: greedy fails. Sort by finish, \`dp[i] = max(dp[i-1], w_i + dp[p(i)])\` where \`p(i)\` is the last activity finishing at or before \`s_i\` (binary search) → O(n log n).
- **Job sequencing with deadlines and profits**: sort by profit descending, put each job in the latest free slot before its deadline (DSU or a set of free slots).

Sorting dominates: O(n log n), O(1) extra memory after sorting.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Activity { int start, finish, id; };

vector<int> selectActivities(vector<Activity> a) {
    sort(a.begin(), a.end(), [](auto& x, auto& y){ return x.finish < y.finish; });
    vector<int> chosen;
    int lastFinish = INT_MIN;
    for (auto& act : a)
        if (act.start >= lastFinish) { chosen.push_back(act.id); lastFinish = act.finish; }
    return chosen;
}

// weighted version: DP over activities sorted by finish time
long long weightedSelection(vector<Activity> a, vector<long long> w) {
    int n = a.size();
    vector<int> idx(n); iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int i, int j){ return a[i].finish < a[j].finish; });
    vector<int> f(n);
    for (int i = 0; i < n; ++i) f[i] = a[idx[i]].finish;
    vector<long long> dp(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        int p = upper_bound(f.begin(), f.begin() + i, a[idx[i]].start) - f.begin();
        dp[i + 1] = max(dp[i], dp[p] + w[idx[i]]);
    }
    return dp[n];
}

int main() {
    vector<Activity> a = {{1,4,0},{3,5,1},{0,6,2},{5,7,3},{8,9,4},{5,9,5}};
    for (int id : selectActivities(a)) cout << id << ' ';   // 0 3 4
    cout << '\\n';
    cout << weightedSelection(a, {5,1,8,4,2,7}) << '\\n';    // 14
}
\`\`\`
`,
};

export default topic;
