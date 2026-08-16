import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "advanced-coordinate-compression",
  title: "Advanced Coordinate Compression",
  description: "Compress large or continuous coordinate ranges into small dense indices while preserving order and event semantics.",
  readingTime: 9,
  content: `

# Advanced Coordinate Compression

## Theory

### What it is
Coordinate compression maps a large or sparse set of values (coordinates, times, weights) to a small
dense range of integers [0, k) while preserving their relative order. The "advanced" variant covers the
subtleties needed for range-query problems: handling open/closed interval endpoints, compressing both
endpoints of segments so nothing is merged incorrectly, and combining compression with offline event
processing (sweep lines, 2D BITs, difference arrays).

### Why it works
Most range-query data structures (Fenwick tree, segment tree, 2D difference array) need array-like
indices. If actual coordinates are up to 1e9 or are real numbers, we cannot allocate arrays of that
size. But if we only ever query/update at coordinates that appear in the input, we only need to
distinguish among those specific values and their combinatorially useful boundaries. Since only the
relative order matters for indexing, we can sort and deduplicate all "interesting" coordinates and
replace each with its rank. Any two coordinate values between the same pair of adjacent compressed
points behave identically for range purposes.

### Core idea
1. Collect every coordinate that will be used as an update point OR a query boundary.
2. For interval problems, also insert "boundary + 1" (or boundary - 1) values so that closed/open
   interval semantics are preserved after compression — otherwise merging [1,3] and [4,6] might look
   adjacent or overlapping incorrectly once compressed.
3. Sort and unique the coordinate list to get \`sortedCoords\`.
4. Replace each original coordinate x by \`idx(x) = lower_bound(sortedCoords, x) - sortedCoords.begin()\`.
5. Run your data structure (BIT, segment tree, sweep line, 2D diff array) on the compressed indices;
   map answers back to original coordinates only when reporting results.

### Key observations
- Compression is purely a preprocessing/offline technique: it requires knowing all coordinates that
  will ever be touched in advance, so it does not work for fully online insert-anything scenarios.
- For interval endpoints, a common trick is to add both \`x\` and \`x+1\` (for integer coordinates) to the
  coordinate set. This turns a "gap" between non-overlapping closed intervals into a real segment in
  compressed space, avoiding false adjacency merges.
- When compressing coordinates for a 2D sweep (e.g., rectangles), compress x and y independently.
- Watch for duplicate coordinates: always dedupe (\`sort\` + \`unique\`) before building the rank map.

### Complexity
- Building the compressed coordinate list: O(n log n) for sorting n coordinates.
- Looking up the compressed index of any coordinate: O(log n) via binary search (or O(1) with a
  precomputed hash map if all lookups are known upfront).

### When to use
- Any range-query structure (BIT, segment tree, 2D difference array, sweep-line data structures) needs
  a small index space but the actual coordinate values are large or come from doubles.
- Rectangle union/area problems, "count points in region" offline queries, interval scheduling with
  huge time ranges.

### Small example
Suppose we have segments [2, 100000] and [3, 5]. Without the +1 trick, compressing {2, 100000, 3, 5}
gives ranks 2->0, 3->1, 5->2, 100000->3, losing the notion that between 5 and 100000 nothing happens
except a huge empty gap that still needs to be representable if we care about "points not covered".
Adding endpoint+1 values (3, 4, 6, 100001) refines the grid so that boundaries are distinguishable from
interiors, which matters for exact interval covering counts.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct CoordCompressor {
    vector<long long> sorted_vals;

    // call add() for every coordinate of interest (and, for interval problems,
    // also add(x + 1) / add(x - 1) at the boundaries you care about) before build()
    void add(long long x) { sorted_vals.push_back(x); }

    void build() {
        sort(sorted_vals.begin(), sorted_vals.end());
        sorted_vals.erase(unique(sorted_vals.begin(), sorted_vals.end()), sorted_vals.end());
    }

    // returns the compressed index (0-based) of x; x must exist in the compressed set
    int index(long long x) const {
        int i = int(lower_bound(sorted_vals.begin(), sorted_vals.end(), x) - sorted_vals.begin());
        return i;
    }

    // maps a compressed index back to the original coordinate
    long long value(int idx) const { return sorted_vals[idx]; }

    int size() const { return (int)sorted_vals.size(); }
};

int main() {
    // Example: segments given as [l, r], we want to compress endpoints
    // and also insert r+1 so adjacent-but-not-overlapping segments don't merge.
    vector<pair<long long,long long>> segs = {{2, 100000}, {3, 5}};

    CoordCompressor cc;
    for (auto &[l, r] : segs) {
        cc.add(l);
        cc.add(r);
        cc.add(r + 1); // sentinel boundary to keep half-open semantics correct
    }
    cc.build();

    for (auto &[l, r] : segs) {
        int li = cc.index(l), ri = cc.index(r);
        cout << "segment [" << l << ", " << r << "] -> compressed [" << li << ", " << ri << "]\n";
    }
    cout << "total distinct coordinates: " << cc.size() << "\n";
}
\`\`\`

`,
};

export default topic;
