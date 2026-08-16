import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sweep-line",
  title: "Sweep Line",
  description: "Process geometric or interval events in sorted order while maintaining a data structure of 'currently active' elements.",
  readingTime: 9,
  content: `

# Sweep Line

## Theory

### What it is
A sweep line algorithm imagines a vertical (or horizontal) line moving across sorted event coordinates
(x-coordinates, times, endpoints), maintaining an auxiliary data structure that reflects only the
elements "active" at the line's current position. Queries/updates are answered as the line passes
relevant events, turning many 2D or interval problems into a 1D problem plus a maintained structure.

### Why it works
Many 2D/interval problems become tractable once we fix one dimension and process events along it in
sorted order, because the interesting structure (active intervals, active segments, active rectangles)
changes only at discrete event points (start/end of interval, rectangle corners). Between two
consecutive events nothing changes, so we only need to do work exactly at event points, not
continuously — this reduces a seemingly continuous 2D problem to O(events) discrete steps.

### Core idea
1. Convert the problem into a set of events, each tagged with a coordinate (usually x) and a type
   (e.g., "segment starts", "segment ends", "query at this x").
2. Sort all events by coordinate (breaking ties carefully, e.g., process "start" events before "query"
   before "end" events, depending on the semantics needed).
3. Sweep through events in order, maintaining a structure (BIT, segment tree, balanced BST/ordered set,
   or simple counter) representing the currently active set.
4. When an "add" event occurs, insert into the structure; on "remove", delete; on "query", read the
   current state of the structure.

### Key observations
- This is the natural offline technique for interval/rectangle problems: rectangle union area, counting
  overlapping intervals, closest pair of points, skyline problems, and offline range-add + point-query
  (which is really a 1D sweep with a difference array).
- Tie-breaking order at equal coordinates is often the trickiest part — e.g., process interval starts
  before interval ends if you want to count intervals as overlapping when [a,b] and [b,c] touch, or the
  opposite order if you want touching intervals to be considered non-overlapping.
- Sweep line combines naturally with coordinate compression (for the axis of unaffected events) and
  segment trees/BITs (for the maintained active-set structure).

### Complexity
- O(events * log(events)) for sorting plus O(log(events)) per structure operation during the sweep,
  i.e. typically O(n log n) overall for n input segments/points/rectangles.

### When to use
- Interval overlap counting, "maximum number of overlapping intervals at any time", rectangle union
  area (combined with a segment tree over compressed y-coordinates), closest pair of points, skyline
  silhouette, and any problem phrased as "process events in time/coordinate order while tracking a
  running aggregate".

### Small example
Given intervals [1,4], [2,6], [5,7], find the maximum number of overlapping intervals. Create events
(1, +1), (4, -1), (2, +1), (6, -1), (5, +1), (7, -1). Sort by coordinate (with +1 events before -1 events
at ties, since [1,4] and something starting at 4 could count as overlapping only if you define it that
way). Sweep, maintaining a running counter, and track its maximum — that maximum is the answer. This
replaces an O(n^2) pairwise check with an O(n log n) sweep.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Example: maximum number of overlapping intervals at any point in time
int maxOverlap(vector<pair<int,int>>& intervals) {
    // event: (coordinate, delta) where delta = +1 for start, -1 for end
    vector<pair<int,int>> events;
    for (auto& [l, r] : intervals) {
        events.push_back({l, +1});
        events.push_back({r, -1});
    }
    // process starts (+1) before ends (-1) at the same coordinate so that
    // touching intervals [a,b] and [b,c] count as overlapping at x = b
    sort(events.begin(), events.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second > b.second; // +1 before -1
    });

    int cur = 0, best = 0;
    for (auto& [coord, delta] : events) {
        cur += delta;
        best = max(best, cur);
    }
    return best;
}

// Example: total length of the union of 1D intervals (classic sweep with a difference/counter)
long long unionLength(vector<pair<int,int>>& intervals) {
    vector<pair<int,int>> events;
    for (auto& [l, r] : intervals) {
        events.push_back({l, +1});
        events.push_back({r, -1});
    }
    sort(events.begin(), events.end());

    long long total = 0;
    int active = 0;
    int prevX = events.empty() ? 0 : events[0].first;
    for (auto& [x, delta] : events) {
        if (active > 0) total += (x - prevX); // length covered since last event
        prevX = x;
        active += delta;
    }
    return total;
}

int main() {
    vector<pair<int,int>> intervals = {{1, 4}, {2, 6}, {5, 7}};
    cout << "max overlap: " << maxOverlap(intervals) << '\n';
    cout << "union length: " << unionLength(intervals) << '\n';
}
\`\`\`

`,
};

export default topic;
