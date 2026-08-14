import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "interval-scheduling",
  title: "Interval Scheduling",
  description: "Maximum non-overlapping intervals, merging, and minimum rooms.",
  readingTime: 6,
  content: `

# Interval Scheduling

## Theory

Given intervals \`[l_i, r_i)\`, the three questions that appear again and again:

### 1. Maximum number of non-overlapping intervals

**Sort by right endpoint** and greedily take any interval that starts at or after the last taken end.

*Why:* the interval that finishes earliest leaves the most room for the rest — exchange argument. Sorting by left endpoint or by length is **wrong**.

Complexity O(n log n).

### 2. Merge overlapping intervals

Sort by left endpoint, keep a running \`[curL, curR]\`, extend while \`l <= curR\`, otherwise flush.

### 3. Minimum number of rooms / platforms (max overlap)

Turn intervals into events: \`+1\` at \`l\`, \`-1\` at \`r\`. Sort events (process \`-1\` before \`+1\` at equal coordinates for half-open intervals) and track the running maximum. Equivalent: a min-heap of end times.

### Related greedy tasks

- **Minimum removals to make intervals disjoint** = n − (answer to problem 1).
- **Interval point cover** — stabbing all intervals with fewest points: sort by right end, place a point at each uncovered right end.
- **Weighted interval scheduling** is *not* greedy — sort by end and do DP with binary search.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using Interval = pair<int,int>;   // [l, r)

int maxNonOverlapping(vector<Interval> a) {
    sort(a.begin(), a.end(), [](auto& x, auto& y){ return x.second < y.second; });
    int cnt = 0, lastEnd = INT_MIN;
    for (auto [l, r] : a)
        if (l >= lastEnd) { ++cnt; lastEnd = r; }
    return cnt;
}

vector<Interval> mergeIntervals(vector<Interval> a) {
    sort(a.begin(), a.end());
    vector<Interval> res;
    for (auto iv : a) {
        if (!res.empty() && iv.first <= res.back().second)
            res.back().second = max(res.back().second, iv.second);
        else res.push_back(iv);
    }
    return res;
}

int minRooms(vector<Interval> a) {                 // maximum overlap
    vector<pair<int,int>> ev;                      // (coord, delta)
    for (auto [l, r] : a) { ev.push_back({l, +1}); ev.push_back({r, -1}); }
    sort(ev.begin(), ev.end());                    // -1 sorts before +1
    int cur = 0, best = 0;
    for (auto [x, d] : ev) { cur += d; best = max(best, cur); }
    return best;
}

int main() {
    vector<Interval> a = {{1,3},{2,5},{4,7},{6,8},{8,9}};
    cout << maxNonOverlapping(a) << '\\n';                 // 3
    for (auto [l, r] : mergeIntervals(a)) cout << '[' << l << ',' << r << ") ";
    cout << '\\n';                                          // [1,9)
    cout << minRooms(a) << '\\n';                           // 2
}
\`\`\`
`,
};

export default topic;
