import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "circle-line-intersection",
  title: "Circle-Line Intersection",
  description: "Compute intersection points between a circle and a line or segment using projection and the Pythagorean theorem.",
  readingTime: 8,
  content: `
# Circle-Line Intersection

## Theory

Finding where a line (or line segment) intersects a circle is a common primitive: line-of-sight problems, laser/ray bouncing off circular obstacles, and coverage/visibility problems in competitive programming.

### Core idea: perpendicular distance and projection

Given a circle with center C and radius r, and a line defined by two points A and B:
1. Compute the foot of the perpendicular from C onto line AB — call it F. This is the point on the (infinite) line closest to C.
2. Compute d = distance from C to F (the perpendicular distance from center to line).
3. Compare d to r:
   - If d > r: no intersection.
   - If d == r: the line is tangent, touching at exactly F.
   - If d < r: the line crosses the circle at two points, located at distance h = sqrt(r^2 - d^2) from F along the line direction, on either side.

### Why it works

This follows directly from the Pythagorean theorem: for any intersection point P on the line, the triangle C-F-P is right-angled at F (since CF is perpendicular to the line), so |CP|^2 = |CF|^2 + |FP|^2. Setting |CP| = r (P is on the circle) gives |FP| = sqrt(r^2 - d^2) = h.

### Computing F precisely

Let direction vector d_vec = B - A (unit vector u = d_vec / |d_vec|). The projection scalar t = dot(C - A, u) gives the position of F along the line: F = A + t*u. This handles the general case robustly without needing to solve a quadratic explicitly (though solving the quadratic formed by substituting the parametric line equation into the circle equation is an equivalent, sometimes more directly extensible, approach — e.g., it generalizes better to segments where you need the actual t parameter to check bounds).

### Segment vs. infinite line

If working with a segment (not an infinite line), after finding candidate intersection points, check whether their parameter t (position along AB) lies within [0, 1] (i.e., between A and B) to confirm they lie on the segment, not just the extended line.

### Complexity

O(1) per circle-line intersection test — just a handful of dot products, one sqrt, and a comparison.

### When to use

Use whenever you need exact intersection points or a boolean intersects/doesn't-intersect test between a circle and a straight edge: laser reflection/refraction problems, "does this line of sight pass through/avoid a circular obstacle" problems, or visibility graphs with circular obstacles.

### Conceptual example

Circle center (0,0), radius 5. Line through (-10, 0) and (10, 0) — the x-axis. The foot of perpendicular from (0,0) to this line is (0,0) itself, so d = 0 < r = 5. Then h = sqrt(25 - 0) = 5, giving intersection points (0,0) ± 5*(unit direction of line) = (-5,0) and (5,0), which is exactly correct.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point { double x, y; };

Point operator-(const Point& a, const Point& b) { return {a.x - b.x, a.y - b.y}; }
Point operator+(const Point& a, const Point& b) { return {a.x + b.x, a.y + b.y}; }
Point operator*(const Point& a, double t) { return {a.x * t, a.y * t}; }

double dot(const Point& a, const Point& b) { return a.x * b.x + a.y * b.y; }
double norm(const Point& a) { return sqrt(dot(a, a)); }

struct Circle { Point c; double r; };

// Returns number of intersection points (0, 1, or 2) with the infinite line through A, B.
// Fills pts with the intersection point(s) found.
int circleLineIntersection(const Circle& circ, const Point& A, const Point& B, vector<Point>& pts) {
    pts.clear();
    Point dir = B - A;
    double lenDir = norm(dir);
    Point u = dir * (1.0 / lenDir); // unit direction vector along the line

    // Projection of (C - A) onto the line direction gives parameter t for foot of perpendicular
    double t = dot(circ.c - A, u);
    Point F = A + u * t; // foot of perpendicular from center onto the line

    double d = norm(circ.c - F); // perpendicular distance from center to line
    const double eps = 1e-9;

    if (d > circ.r + eps) {
        return 0; // no intersection
    } else if (fabs(d - circ.r) <= eps) {
        pts.push_back(F); // tangent: exactly one point
        return 1;
    } else {
        double h = sqrt(max(0.0, circ.r * circ.r - d * d));
        pts.push_back(F + u * h);
        pts.push_back(F + u * (-h));
        return 2;
    }
}

// Same as above but restricted to the segment AB (checks parametric t in [0, lenDir])
int circleSegmentIntersection(const Circle& circ, const Point& A, const Point& B, vector<Point>& pts) {
    vector<Point> linePts;
    int cnt = circleLineIntersection(circ, A, B, linePts);
    pts.clear();
    double lenAB = norm(B - A);
    for (auto& p : linePts) {
        // Check p lies within segment bounds via projection parameter
        double t = dot(p - A, B - A) / (lenAB * lenAB);
        if (t >= -1e-9 && t <= 1 + 1e-9) pts.push_back(p);
    }
    return pts.size();
}

int main() {
    Circle circ{{0, 0}, 5};
    Point A{-10, 0}, B{10, 0};

    vector<Point> pts;
    int cnt = circleLineIntersection(circ, A, B, pts);
    cout << "Intersections: " << cnt << "\\n";
    for (auto& p : pts) printf("(%.4f, %.4f)\\n", p.x, p.y);

    return 0;
}
\`\`\`
`,
};

export default topic;
