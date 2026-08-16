import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "closest-pair-of-points",
  title: "Closest Pair of Points",
  description: "Divide and conquer algorithm to find the minimum distance between any two points in a set in O(n log n) time.",
  readingTime: 10,
  content: `
# Closest Pair of Points

## Theory

Given n points in the plane, the closest pair problem asks for the pair with minimum Euclidean distance. A brute-force check of all pairs takes O(n^2). The classic divide-and-conquer algorithm solves it in O(n log n), and is one of the canonical examples of the divide-and-conquer paradigm applied to geometry.

### Core idea

1. Sort points by x-coordinate.
2. Recursively split the point set into left and right halves by a vertical line through the median x-coordinate.
3. Recursively find the closest pair distance d_left in the left half and d_right in the right half; let d = min(d_left, d_right).
4. The true closest pair might straddle the dividing line, so we must check a "strip" of points within distance d of the dividing line.
5. Key geometric lemma: within the strip, if points are sorted by y-coordinate, any point needs to be compared only against the next few (at most 7-8) points in y-order, because if two points in the strip are both within distance d of the line and closer than d to each other, they must fit in a d x 2d rectangle, which by a packing argument can contain only a bounded number of points that are pairwise at least d apart... more precisely, at most 8 points can be within a d x d square while maintaining pairwise distances >= d, since only close points matter, this constant is what makes the strip step linear.

### Why it works — combining step complexity

For each point in the strip (sorted by y), we compare it to the next up-to-7 points ahead in the y-sorted order. This makes the merge/combine step O(n) (excluding the sort, which is O(n log n) once, done outside the recursion or maintained via merge-sort style y-order propagation). This gives the recurrence T(n) = 2T(n/2) + O(n) = O(n log n).

### Algorithm details

- Precompute points sorted by x (Px) once.
- At each recursive call, also need points sorted by y (Py) restricted to the current subset — maintaining this efficiently (via merging, like merge sort) is what keeps the combine step O(n) instead of O(n log n) (which would give O(n log^2 n) overall — still acceptable for most contest constraints, and much simpler to implement).
- In the strip step: collect points in current range with |x - x_mid| < d, sorted by y, then for each, compare against the next few points until the y-distance exceeds d.

### Complexity

- O(n log n) time (or O(n log^2 n) with the simpler re-sort-each-time approach, still fast enough for n up to ~10^5-10^6)
- O(n) space

### When to use

Use this whenever you need the minimum pairwise distance among a large set of points and O(n^2) brute force (fine for n <= ~5000) is too slow. Common in problems about minimum spanning "closeness", nearest neighbor style queries, or as a subroutine in more complex geometric algorithms.

### Conceptual example

Points: (0,0), (5,4), (3,1), (19,10), (20,10), (2,2). Brute force finds the minimum distance is between (0,0) and (2,2), distance = sqrt(8) ≈ 2.83, but let's check (3,1)-(2,2): sqrt(1+1)=sqrt(2)≈1.41, which is smaller — so brute force / divide and conquer would correctly identify (2,2)-(3,1) as the closest pair.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point {
    double x, y;
};

double dist(const Point& a, const Point& b) {
    double dx = a.x - b.x, dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}

// Brute force for small subarrays (base case)
double bruteForce(vector<Point>& pts, int lo, int hi) {
    double best = numeric_limits<double>::max();
    for (int i = lo; i <= hi; i++)
        for (int j = i + 1; j <= hi; j++)
            best = min(best, dist(pts[i], pts[j]));
    return best;
}

// Merge two y-sorted ranges into a temp buffer, keep them y-sorted for the strip step
void mergeByY(vector<Point>& pts, vector<Point>& buffer, int lo, int mid, int hi) {
    int i = lo, j = mid + 1, k = lo;
    while (i <= mid && j <= hi) {
        if (pts[i].y <= pts[j].y) buffer[k++] = pts[i++];
        else buffer[k++] = pts[j++];
    }
    while (i <= mid) buffer[k++] = pts[i++];
    while (j <= hi) buffer[k++] = pts[j++];
    for (int idx = lo; idx <= hi; idx++) pts[idx] = buffer[idx];
}

// pts is sorted by x in [lo, hi]; after this call it will also be sorted by y within [lo, hi]
double closestRec(vector<Point>& pts, vector<Point>& buffer, int lo, int hi) {
    if (hi - lo <= 2) {
        double best = bruteForce(pts, lo, hi);
        sort(pts.begin() + lo, pts.begin() + hi + 1, [](const Point& a, const Point& b) {
            return a.y < b.y;
        });
        return best;
    }

    int mid = (lo + hi) / 2;
    double midX = pts[mid].x;

    double dLeft = closestRec(pts, buffer, lo, mid);
    double dRight = closestRec(pts, buffer, mid + 1, hi);
    double d = min(dLeft, dRight);

    // Merge the two y-sorted halves into a single y-sorted range [lo, hi]
    mergeByY(pts, buffer, lo, mid, hi);

    // Build the strip: points within distance d of the dividing line, already y-sorted
    vector<Point> strip;
    for (int i = lo; i <= hi; i++) {
        if (fabs(pts[i].x - midX) < d) strip.push_back(pts[i]);
    }

    // For each point in strip, compare with next few points (bounded by geometry)
    for (size_t i = 0; i < strip.size(); i++) {
        for (size_t j = i + 1; j < strip.size() && (strip[j].y - strip[i].y) < d; j++) {
            d = min(d, dist(strip[i], strip[j]));
        }
    }

    return d;
}

double closestPair(vector<Point> pts) {
    sort(pts.begin(), pts.end(), [](const Point& a, const Point& b) {
        return a.x < b.x;
    });
    vector<Point> buffer(pts.size());
    return closestRec(pts, buffer, 0, (int)pts.size() - 1);
}

int main() {
    int n;
    cin >> n;
    vector<Point> pts(n);
    for (auto& p : pts) cin >> p.x >> p.y;

    printf("%.6f\\n", closestPair(pts));
    return 0;
}
\`\`\`
`,
};

export default topic;
