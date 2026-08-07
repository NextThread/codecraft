import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-line-intersection",
  title: "Line Intersection",
  description: "Intersecting lines with Cramer's rule, plus parallel and coincident handling.",
  readingTime: 4,
  difficulty: "Medium",
  content: `
# Line Intersection

## Theory

### Line representations

- **Two points** \`A, B\`: parametric \`P(t) = A + t·(B - A)\`.
- **Implicit / general form**: \`a·x + b·y = c\`, where \`(a, b)\` is the normal. From two points: \`a = B.y - A.y\`, \`b = A.x - B.x\`, \`c = a·A.x + b·A.y\`.

### Intersecting two general lines (Cramer's rule)

\`\`\`
a1·x + b1·y = c1
a2·x + b2·y = c2

det = a1·b2 - a2·b1
det != 0  -> unique point: x = (c1·b2 - c2·b1)/det,  y = (a1·c2 - a2·c1)/det
det == 0  -> parallel; coincident if (c1·b2 - c2·b1) == 0 and (a1·c2 - a2·c1) == 0
\`\`\`

### Intersecting via cross products (preferred)

For lines \`AB\` and \`CD\`, let \`d1 = B - A\`, \`d2 = D - C\`:

\`\`\`
den = cross(d1, d2)
den == 0 -> parallel (coincident if cross(d1, C - A) == 0)
t = cross(C - A, d2) / den
P = A + t·d1
\`\`\`

This keeps the numerator/denominator integral, so you can decide *whether* they intersect exactly and only divide at the very end.

### Segments instead of lines

Compute \`t\` for the first segment and \`u = cross(C - A, d1) / den\` for the second; the segments intersect iff \`t ∈ [0, 1]\` and \`u ∈ [0, 1]\`. For a purely boolean answer prefer the orientation-based test (no division at all).

### Precision advice

- Keep everything in \`long long\` until the final division.
- With floating point, treat \`|den| < 1e-9\` as parallel.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using T = long long;
struct Point {
    T x = 0, y = 0;
    Point operator-(const Point& o) const { return {x - o.x, y - o.y}; }
    T cross(const Point& o) const { return x * o.y - y * o.x; }
};
struct PointD { long double x, y; };

// 0 = no intersection (parallel), 1 = unique point, 2 = same line
int lineIntersection(const Point& a, const Point& b,
                     const Point& c, const Point& d, PointD& out) {
    Point d1 = b - a, d2 = d - c;
    T den = d1.cross(d2);
    if (den == 0) {
        return d1.cross(c - a) == 0 ? 2 : 0;             // coincident or parallel
    }
    long double t = (long double)(c - a).cross(d2) / (long double)den;
    out = {a.x + t * d1.x, a.y + t * d1.y};
    return 1;
}

// Segment intersection with the parameters kept as exact fractions.
bool segmentIntersection(const Point& a, const Point& b,
                         const Point& c, const Point& d, PointD& out) {
    Point d1 = b - a, d2 = d - c, ac = c - a;
    T den = d1.cross(d2);
    if (den == 0) return false;                          // parallel: handle separately
    T tn = ac.cross(d2), un = ac.cross(d1);
    if (den < 0) { den = -den; tn = -tn; un = -un; }     // normalise sign
    if (tn < 0 || tn > den || un < 0 || un > den) return false;
    long double t = (long double)tn / (long double)den;
    out = {a.x + t * d1.x, a.y + t * d1.y};
    return true;
}

int main() {
    PointD p{};
    int type = lineIntersection({0,0}, {4,4}, {0,4}, {4,0}, p);
    cout << type << " -> (" << p.x << ", " << p.y << ")\\n";   // 1 -> (2, 2)

    cout << lineIntersection({0,0}, {1,1}, {0,1}, {1,2}, p) << "\\n"; // 0 parallel
    cout << lineIntersection({0,0}, {2,2}, {1,1}, {3,3}, p) << "\\n"; // 2 same line

    if (segmentIntersection({0,0}, {4,4}, {4,0}, {0,4}, p))
        cout << "segments meet at (" << p.x << ", " << p.y << ")\\n";
    cout << segmentIntersection({0,0}, {1,1}, {3,0}, {4,1}, p) << "\\n"; // 0
}
\`\`\`
`,
};

export default topic;
