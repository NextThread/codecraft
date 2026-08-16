import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "point-in-polygon",
  title: "Point in Polygon",
  description: "Determine whether a point lies inside, outside, or on the boundary of a polygon using ray casting and winding number methods.",
  readingTime: 9,
  content: `
# Point in Polygon

## Theory

The point-in-polygon (PIP) problem asks: given a polygon (simple, possibly non-convex) and a query point, determine whether the point is inside, outside, or on the boundary of the polygon. This is one of the most fundamental primitives in computational geometry, used in GIS systems, collision detection, and countless competitive programming problems.

### Core idea: Ray casting (even-odd rule)

Cast a ray from the query point to infinity (typically horizontal, going right) and count how many times it crosses the polygon's edges. If the count is odd, the point is inside; if even, it is outside. This works because each time the ray crosses the boundary, it toggles between inside and outside regions.

Key observations:
- Care must be taken with edges that are exactly horizontal (collinear with the ray) or when the ray passes exactly through a vertex — naive implementations double-count or miss these cases.
- A robust implementation checks, for each edge (p1, p2), whether the point's y-coordinate lies strictly between p1.y and p2.y (using one inclusive, one exclusive bound to avoid double-counting shared vertices), then computes the x-intersection of the ray with the edge and compares it to the point's x-coordinate.
- Boundary detection (point exactly on an edge) should be checked separately using the cross product / segment-on-segment test, since ray casting alone may misclassify boundary points due to floating-point issues.

### Winding number method

An alternative approach sums the signed angles (or uses cross-product sign changes) subtended by the polygon's edges as seen from the point. If the total winding number is zero, the point is outside; otherwise it's inside. This method is more robust for complex/self-intersecting polygons but is usually more expensive to compute. For simple polygons, ray casting (even-odd) is simpler and sufficient for most contest problems.

### Complexity

Both methods run in O(n) per query, where n is the number of polygon vertices. If many queries must be answered on the same static polygon, and the polygon is convex, a binary-search approach can answer each query in O(log n) by triangulating around a fixed vertex. For non-convex polygons, O(n) per query is standard unless further preprocessing (e.g., trapezoidal decomposition) is used.

### When to use

- Use ray casting for general (possibly non-convex) simple polygons — it's simple, fast, and covers the vast majority of contest scenarios.
- Use the O(log n) convex polygon check when the polygon is convex and many queries are expected.
- Always special-case boundary points explicitly if the problem distinguishes "on boundary" from "inside"/"outside".

### Conceptual example

Consider a square polygon (0,0), (4,0), (4,4), (0,4) and query point (2,2). A rightward ray from (2,2) crosses only the right edge x=4 once → odd count → inside. For query point (5,5), the ray crosses no edges → even (zero) → outside.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point {
    double x, y;
};

// Cross product of vectors OA and OB
double cross(const Point& O, const Point& A, const Point& B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

// Check if point p lies on segment ab (assuming collinearity already likely)
bool onSegment(const Point& a, const Point& b, const Point& p) {
    double cr = cross(a, b, p);
    if (fabs(cr) > 1e-9) return false; // not collinear
    // Check p is within bounding box of segment
    return min(a.x, b.x) - 1e-9 <= p.x && p.x <= max(a.x, b.x) + 1e-9 &&
           min(a.y, b.y) - 1e-9 <= p.y && p.y <= max(a.y, b.y) + 1e-9;
}

// Returns: 0 = outside, 1 = inside, 2 = on boundary
int pointInPolygon(const vector<Point>& poly, const Point& p) {
    int n = poly.size();
    // First check boundary explicitly
    for (int i = 0; i < n; i++) {
        Point a = poly[i], b = poly[(i + 1) % n];
        if (onSegment(a, b, p)) return 2;
    }

    bool inside = false;
    for (int i = 0, j = n - 1; i < n; j = i++) {
        const Point& pi = poly[i];
        const Point& pj = poly[j];
        // Check if the horizontal ray from p crosses edge (pi, pj)
        bool crosses = ((pi.y > p.y) != (pj.y > p.y));
        if (crosses) {
            double xIntersect = pi.x + (p.y - pi.y) * (pj.x - pi.x) / (pj.y - pi.y);
            if (p.x < xIntersect) {
                inside = !inside; // toggle inside/outside
            }
        }
    }
    return inside ? 1 : 0;
}

int main() {
    int n;
    cin >> n;
    vector<Point> poly(n);
    for (auto& pt : poly) cin >> pt.x >> pt.y;

    int q;
    cin >> q;
    while (q--) {
        Point p;
        cin >> p.x >> p.y;
        int res = pointInPolygon(poly, p);
        if (res == 0) cout << "OUTSIDE\\n";
        else if (res == 1) cout << "INSIDE\\n";
        else cout << "BOUNDARY\\n";
    }
    return 0;
}
\`\`\`
`,
};

export default topic;
