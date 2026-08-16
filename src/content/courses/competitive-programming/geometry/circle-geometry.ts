import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "circle-geometry",
  title: "Circle Geometry",
  description: "Fundamental circle operations for competitive programming: representation, point containment, tangent lines, and circle from points.",
  readingTime: 9,
  content: `
# Circle Geometry

## Theory

Circles appear frequently in competitive programming: coverage problems, collision detection, minimum enclosing circle, and geometric constructions. A circle is represented by its center (cx, cy) and radius r. This topic covers the foundational operations that other circle-related algorithms (circle-line intersection, circle-circle intersection) build on.

### Basic representation and properties

A circle: (x - cx)^2 + (y - cy)^2 = r^2. Key derived quantities:
- **Area** = pi * r^2
- **Circumference** = 2 * pi * r
- **Point containment**: a point p is inside the circle if dist(p, center) < r, on the boundary if equal, outside if greater. Comparing squared distances avoids a sqrt: (p.x-cx)^2 + (p.y-cy)^2 vs r^2.

### Circle through points

- **Circle from 2 points as diameter**: center = midpoint, radius = half the distance between them.
- **Circle from 3 non-collinear points**: the unique circumscribed circle. Center is the circumcenter — intersection of the perpendicular bisectors of any two sides of the triangle formed by the points. Can be computed by solving a 2x2 linear system derived from equating |center - A|^2 = |center - B|^2 = |center - C|^2. This is essential for the minimum enclosing circle algorithm (Welzl's algorithm), which incrementally builds the smallest circle enclosing a point set in expected O(n) time using randomization.

### Tangent lines from an external point

Given a point P outside a circle with center C and radius r, there are exactly two tangent lines from P to the circle. The tangent points T satisfy: CT ⊥ PT, and |CT| = r. Using the right triangle CPT (right angle at T), the distance d = |CP|, and the tangent length is sqrt(d^2 - r^2). The tangent points can be found by rotating the direction vector from C to P by angle ± asin(r/d) (or equivalently using the angle theta = acos(r/d) relative to CP), scaled to length r.

### Tangent lines between two circles

Two circles can have 0, 1, 2, 3, or 4 common tangent lines depending on their relative position (separate, externally tangent, intersecting, internally tangent, one inside the other). This construction is used in problems about wrapping belts/ropes around circular objects (e.g., "shortest path around obstacles" or "cow rope" style problems). General technique: external tangents exist when circles don't strictly contain each other; internal tangents exist only when circles are disjoint (no overlap).

### Complexity

Most circle primitive operations (containment, distance, circle from 2/3 points, tangent point computation) are O(1). Minimum enclosing circle via Welzl's algorithm is O(n) expected time for n points.

### When to use

Use these primitives as building blocks: point containment for coverage/collision checks, circumcircle computation for triangle-related geometry or minimum enclosing circle, and tangent lines for belt-wrapping / visibility-around-obstacles problems.

### Conceptual example

Given three points (0,0), (4,0), (0,4), the circumcenter is (2,2) with radius = sqrt(8) ≈ 2.828 — the unique circle passing through all three. A point like (2,2) is at distance 0 from the center hence strictly inside; a point (5,5) is at distance sqrt(18)≈4.24, outside.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point { double x, y; };

double dist2(const Point& a, const Point& b) {
    double dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
}

double dist(const Point& a, const Point& b) { return sqrt(dist2(a, b)); }

struct Circle { Point c; double r; };

// Point containment test (returns -1 inside, 0 on boundary, 1 outside)
int pointVsCircle(const Circle& circ, const Point& p) {
    double d2 = dist2(p, circ.c);
    double r2 = circ.r * circ.r;
    const double eps = 1e-9;
    if (d2 < r2 - eps) return -1;
    if (d2 > r2 + eps) return 1;
    return 0;
}

// Circle with two points as diameter
Circle circleFromTwoPoints(const Point& a, const Point& b) {
    Point center = {(a.x + b.x) / 2.0, (a.y + b.y) / 2.0};
    double r = dist(a, b) / 2.0;
    return {center, r};
}

// Circumscribed circle through three non-collinear points
Circle circumcircle(const Point& A, const Point& B, const Point& C) {
    double ax = A.x, ay = A.y, bx = B.x, by = B.y, cx = C.x, cy = C.y;
    double d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    // d == 0 would mean collinear points -> no unique circumcircle
    double ux = ((ax * ax + ay * ay) * (by - cy) +
                 (bx * bx + by * by) * (cy - ay) +
                 (cx * cx + cy * cy) * (ay - by)) / d;
    double uy = ((ax * ax + ay * ay) * (cx - bx) +
                 (bx * bx + by * by) * (ax - cx) +
                 (cx * cx + cy * cy) * (bx - ax)) / d;
    Point center = {ux, uy};
    double r = dist(center, A);
    return {center, r};
}

// Tangent points from external point P to circle (c, r). Returns the two tangent points.
pair<Point, Point> tangentPoints(const Circle& circ, const Point& P) {
    double d = dist(P, circ.c);
    // d must be >= r for real tangents to exist
    double theta = acos(circ.r / d);          // half-angle between CP and CT
    double baseAngle = atan2(P.y - circ.c.y, P.x - circ.c.x);
    double angle1 = baseAngle + theta;
    double angle2 = baseAngle - theta;
    Point T1 = {circ.c.x + circ.r * cos(angle1), circ.c.y + circ.r * sin(angle1)};
    Point T2 = {circ.c.x + circ.r * cos(angle2), circ.c.y + circ.r * sin(angle2)};
    return {T1, T2};
}

int main() {
    // Example: circumcircle of a triangle
    Point A{0, 0}, B{4, 0}, C{0, 4};
    Circle circ = circumcircle(A, B, C);
    printf("Circumcenter: (%.4f, %.4f), radius: %.4f\\n", circ.c.x, circ.c.y, circ.r);

    Point P{10, 10};
    auto [T1, T2] = tangentPoints(circ, P);
    printf("Tangent points: (%.4f, %.4f) and (%.4f, %.4f)\\n", T1.x, T1.y, T2.x, T2.y);

    return 0;
}
\`\`\`
`,
};

export default topic;
