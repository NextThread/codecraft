import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "segment-intersection-applications",
  title: "Segment Intersection Applications",
  description: "Practical techniques built on segment intersection: counting intersections, detecting any intersection among many segments, and related contest patterns.",
  readingTime: 10,
  content: `
# Segment Intersection Applications

## Theory

Segment intersection testing (checking whether two line segments cross) is a basic geometric primitive, but many competitive programming problems build higher-level algorithms on top of it: determining if *any* pair among n segments intersects, counting all intersecting pairs, finding intersection points for polygon clipping, and detecting simple-polygon self-intersections.

### Core primitive recap

Two segments AB and CD intersect if and only if:
1. The orientations of (A,B,C) and (A,B,D) differ, AND the orientations of (C,D,A) and (C,D,B) differ (proper crossing), OR
2. One of the four "collinear and on-segment" special cases holds (a point of one segment lies exactly on the other segment).

Orientation is computed via cross product sign: orientation(p,q,r) = sign of (q-p) x (r-p). This gives an O(1) test using only sign comparisons — robust and exact when coordinates are integers.

### Application 1: Any-intersection detection among n segments (naive vs. sweep)

Checking all pairs is O(n^2), fine for n up to a few thousand. For larger n, the sweep-line approach (Bentley-Ottmann) using a balanced BST ordered by the segments' current y-position at the sweep x-coordinate reduces this to O((n + k) log n), where k is the number of intersections. See the "Sweep Line Geometry" topic for the general technique — the same idea underlies detecting the first intersecting pair efficiently, which is important in polygon validity checks.

### Application 2: Counting intersections

If you need the *count* of intersecting pairs (not the sweep-line output), and coordinates are moderate, O(n^2) pairwise testing is often the simplest robust solution. For very large n, sweep-line events combined with a Fenwick tree / order-statistics structure can count crossings in O(n log n), similar to counting inversions — this is common in problems phrased as "count pairs of chords that cross" (e.g., mapped to inversion counting when segments connect points on two parallel lines or a circle).

### Application 3: Finding the intersection point

Once you know two segments properly intersect, the intersection point is found by solving the parametric line equations:
P = A + t*(B-A) = C + u*(D-C)
Solve the 2x2 linear system for t and u using Cramer's rule via cross products. This is needed for polygon clipping (Sutherland-Hodgman) and for constructing the arrangement of segments.

### Application 4: Segments intersecting a query segment/rectangle

For range-type queries (e.g., "does any segment intersect this vertical line at x = k"), maintain the active segment set sorted by y at the sweep position — this is exactly the sweep-line status structure, enabling O(log n) queries as the sweep moves.

### Complexity summary

- Single pair test: O(1)
- All pairs (n segments): O(n^2) naive, O(n log n + k log n) via sweep for reporting k intersections
- Detect if any intersection exists: O(n log n) via sweep (stop early), O(n^2) naive

### When to use

Use pairwise O(n^2) for n up to ~2000-5000 for simplicity and robustness. Use sweep-line when n is large (10^4-10^6) or when you need output-sensitive performance. Always use exact integer arithmetic (cross products) when coordinates are integers to avoid floating-point error in the orientation tests; only switch to doubles when actual intersection coordinates must be computed.

### Conceptual example

Given segments (0,0)-(4,4), (0,4)-(4,0), and (5,5)-(6,6): the first two cross at (2,2) (orientations differ properly), while the third doesn't intersect either. A naive O(n^2) scan over 3 segments finds exactly one intersecting pair.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Point {
    ll x, y;
};

// Cross product (p1-p0) x (p2-p0)
ll cross(const Point& p0, const Point& p1, const Point& p2) {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
}

int sgn(ll v) { return (v > 0) - (v < 0); }

bool onSegment(const Point& p, const Point& q, const Point& r) {
    // Check r lies within bounding box of segment pq, assuming collinear
    return min(p.x, q.x) <= r.x && r.x <= max(p.x, q.x) &&
           min(p.y, q.y) <= r.y && r.y <= max(p.y, q.y);
}

// Returns true if segments AB and CD intersect (including touching/collinear cases)
bool segmentsIntersect(const Point& A, const Point& B, const Point& C, const Point& D) {
    int d1 = sgn(cross(C, D, A));
    int d2 = sgn(cross(C, D, B));
    int d3 = sgn(cross(A, B, C));
    int d4 = sgn(cross(A, B, D));

    if (d1 != d2 && d3 != d4) return true; // proper intersection

    // Special collinear cases
    if (d1 == 0 && onSegment(C, D, A)) return true;
    if (d2 == 0 && onSegment(C, D, B)) return true;
    if (d3 == 0 && onSegment(A, B, C)) return true;
    if (d4 == 0 && onSegment(A, B, D)) return true;

    return false;
}

// Compute intersection point of two properly-crossing segments (as doubles)
pair<double, double> intersectionPoint(const Point& A, const Point& B, const Point& C, const Point& D) {
    double a1 = B.y - A.y, b1 = A.x - B.x, c1 = a1 * A.x + b1 * A.y;
    double a2 = D.y - C.y, b2 = C.x - D.x, c2 = a2 * C.x + b2 * C.y;
    double det = a1 * b2 - a2 * b1;
    double x = (b2 * c1 - b1 * c2) / det;
    double y = (a1 * c2 - a2 * c1) / det;
    return {x, y};
}

int main() {
    int n;
    cin >> n;
    vector<Point> A(n), B(n);
    for (int i = 0; i < n; i++) cin >> A[i].x >> A[i].y >> B[i].x >> B[i].y;

    // Naive O(n^2) check for any/all intersecting pairs
    int count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (segmentsIntersect(A[i], B[i], A[j], B[j])) {
                count++;
            }
        }
    }
    cout << "Intersecting pairs: " << count << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
