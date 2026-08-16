import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "circle-circle-intersection",
  title: "Circle-Circle Intersection",
  description: "Determine the relationship between two circles and compute their intersection points using the law of cosines / triangle geometry.",
  readingTime: 8,
  content: `
# Circle-Circle Intersection

## Theory

Given two circles, we often need to know whether they intersect, and if so, compute the actual intersection point(s). This appears in coverage problems, Venn-diagram area computations, and robotics/motion-planning tasks.

### Classifying the relationship

Let circle 1 have center C1, radius r1, and circle 2 have center C2, radius r2. Let d = distance(C1, C2). The relationship is determined by comparing d to r1 + r2 and |r1 - r2|:
- **d > r1 + r2**: circles are separate (no intersection), too far apart.
- **d == r1 + r2**: externally tangent (1 intersection point).
- **|r1 - r2| < d < r1 + r2**: circles properly intersect at 2 points.
- **d == |r1 - r2|**: internally tangent (1 intersection point), one circle touches the other from inside.
- **d < |r1 - r2|**: one circle entirely contains the other, no intersection.
- **d == 0 and r1 == r2**: identical circles (infinite intersection / degenerate case, must be special-cased).

### Core idea for computing intersection points

When 2 intersection points exist, consider the triangle formed by C1, C2, and one intersection point P. We know |C1 P| = r1 and |C2 P| = r2, and |C1 C2| = d. Using the law of cosines, we can find:
- a = distance from C1 to the point M where the line connecting the two intersection points crosses the line C1C2: a = (r1^2 - r2^2 + d^2) / (2d)
- h = half the distance between the two intersection points = sqrt(r1^2 - a^2)
- M = C1 + a * (unit vector from C1 to C2)
- The two intersection points are M ± h * (perpendicular unit vector to C1C2)

### Why it works

This is derived by setting up the two circle equations and subtracting them, which yields a linear equation (the radical line) representing the line through both intersection points. This line is perpendicular to C1C2. Point M is where this radical line crosses C1C2, and h follows from the Pythagorean theorem applied to the right triangle formed by C1, M, and an intersection point.

### Complexity

O(1) per pair of circles — a handful of arithmetic operations, one sqrt.

### When to use

Use whenever you need: exact overlap boundary points for Venn-diagram style area computations (which further need circular segment area formulas), collision/coverage detection between circular sensors or ranges, or geometric constructions requiring circle intersections (e.g., trilateration).

### Conceptual example

Circle 1: center (0,0), radius 5. Circle 2: center (6,0), radius 5. d = 6. Since |r1-r2|=0 < 6 < r1+r2=10, they intersect at two points. a = (25 - 25 + 36)/12 = 3, h = sqrt(25 - 9) = 4. M = (3, 0). Intersection points: (3, 4) and (3, -4) — verified: distance from (0,0) to (3,4) = 5 ✓, distance from (6,0) to (3,4) = 5 ✓.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point { double x, y; };

Point operator-(const Point& a, const Point& b) { return {a.x - b.x, a.y - b.y}; }
Point operator+(const Point& a, const Point& b) { return {a.x + b.x, a.y + b.y}; }
Point operator*(const Point& a, double t) { return {a.x * t, a.y * t}; }

double norm(const Point& a) { return sqrt(a.x * a.x + a.y * a.y); }

struct Circle { Point c; double r; };

enum class Relation { SEPARATE, EXTERNAL_TANGENT, INTERSECTING, INTERNAL_TANGENT, CONTAINED, IDENTICAL };

Relation classifyCircles(const Circle& A, const Circle& B, double eps = 1e-9) {
    double d = norm(B.c - A.c);
    double sumR = A.r + B.r, diffR = fabs(A.r - B.r);

    if (d < eps && fabs(A.r - B.r) < eps) return Relation::IDENTICAL;
    if (d > sumR + eps) return Relation::SEPARATE;
    if (fabs(d - sumR) <= eps) return Relation::EXTERNAL_TANGENT;
    if (d < diffR - eps) return Relation::CONTAINED;
    if (fabs(d - diffR) <= eps) return Relation::INTERNAL_TANGENT;
    return Relation::INTERSECTING;
}

// Returns number of intersection points (0, 1, or 2), fills pts accordingly.
// Assumes circles are neither identical nor one strictly contained without touching.
int circleCircleIntersection(const Circle& A, const Circle& B, vector<Point>& pts) {
    pts.clear();
    Point diff = B.c - A.c;
    double d = norm(diff);
    const double eps = 1e-9;

    if (d < eps) return 0; // concentric circles, no line to intersect along (or identical, handled by classify)

    if (d > A.r + B.r + eps || d < fabs(A.r - B.r) - eps) return 0; // separate or contained

    // Distance from A.c to the radical line intersection with line AC
    double a = (A.r * A.r - B.r * B.r + d * d) / (2 * d);
    double hSq = A.r * A.r - a * a;
    double h = sqrt(max(0.0, hSq));

    Point unit = diff * (1.0 / d);           // unit vector from A.c to B.c
    Point perp = {-unit.y, unit.x};          // perpendicular unit vector
    Point M = A.c + unit * a;                // point on line A.c-B.c closest to intersection chord

    if (h < eps) {
        pts.push_back(M); // tangent case, single point
        return 1;
    }

    pts.push_back(M + perp * h);
    pts.push_back(M + perp * (-h));
    return 2;
}

int main() {
    Circle c1{{0, 0}, 5};
    Circle c2{{6, 0}, 5};

    vector<Point> pts;
    int cnt = circleCircleIntersection(c1, c2, pts);
    cout << "Intersection points: " << cnt << "\\n";
    for (auto& p : pts) printf("(%.4f, %.4f)\\n", p.x, p.y);

    return 0;
}
\`\`\`
`,
};

export default topic;
