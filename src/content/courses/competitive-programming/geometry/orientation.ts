import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-orientation",
  title: "Orientation",
  description: "The ccw predicate, collinear cases, and exact segment intersection testing.",
  readingTime: 4,
  difficulty: "Medium",
  content: `
# Orientation

## Theory

The **orientation** (or \`ccw\`) predicate answers: walking \`A → B → C\`, do we turn left, go straight, or turn right?

\`\`\`
orient(A, B, C) = sign( cross(B - A, C - A) )
  +1 -> counter-clockwise (left turn)
   0 -> collinear
  -1 -> clockwise (right turn)
\`\`\`

It is the workhorse predicate of computational geometry — exact for integer inputs, which is why so many algorithms are built on it instead of on angles.

### Applications

- **Convex hull** (Andrew's monotone chain, Graham scan).
- **Segment intersection** without any division.
- **Point in polygon / point in triangle**: all cross products share the same sign.
- **Convexity check** of a polygon: no orientation flips while walking the vertices.
- **Which side of a line** a point lies on.

### Proper segment intersection test

Segments \`p1p2\` and \`p3p4\` intersect iff either:

1. **Proper crossing** — \`orient(p1,p2,p3) · orient(p1,p2,p4) < 0\` **and** \`orient(p3,p4,p1) · orient(p3,p4,p2) < 0\`; or
2. **Touching/collinear case** — some orientation is 0 and the corresponding point lies inside the other segment's bounding box (\`onSegment\` check).

Handling case 2 is where most implementations go wrong. Always test: shared endpoints, one endpoint lying on the other segment, fully overlapping collinear segments, and degenerate (zero-length) segments.

### Complexity

O(1) per query, with no floating-point error when coordinates are integers.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using T = long long;
struct Point {
    T x = 0, y = 0;
    Point operator-(const Point& o) const { return {x - o.x, y - o.y}; }
    T cross(const Point& o) const { return x * o.y - y * o.x; }
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};

// +1 CCW, 0 collinear, -1 CW
int orient(const Point& a, const Point& b, const Point& c) {
    T v = (b - a).cross(c - a);
    return (v > 0) - (v < 0);
}

// Assumes a, b, p are collinear: is p inside the bounding box of ab?
bool onSegment(const Point& a, const Point& b, const Point& p) {
    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

// Do segments p1p2 and p3p4 share at least one point? Handles all degenerate cases.
bool segmentsIntersect(const Point& p1, const Point& p2,
                       const Point& p3, const Point& p4) {
    int d1 = orient(p3, p4, p1), d2 = orient(p3, p4, p2);
    int d3 = orient(p1, p2, p3), d4 = orient(p1, p2, p4);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)))
        return true;                                    // proper crossing

    if (d1 == 0 && onSegment(p3, p4, p1)) return true;   // touching / collinear
    if (d2 == 0 && onSegment(p3, p4, p2)) return true;
    if (d3 == 0 && onSegment(p1, p2, p3)) return true;
    if (d4 == 0 && onSegment(p1, p2, p4)) return true;
    return false;
}

// Point strictly inside / on the boundary of triangle abc.
bool inTriangle(const Point& a, const Point& b, const Point& c, const Point& p) {
    int o1 = orient(a, b, p), o2 = orient(b, c, p), o3 = orient(c, a, p);
    bool hasNeg = (o1 < 0) || (o2 < 0) || (o3 < 0);
    bool hasPos = (o1 > 0) || (o2 > 0) || (o3 > 0);
    return !(hasNeg && hasPos);                         // no sign conflict
}

int main() {
    cout << orient({0,0}, {4,0}, {2,3}) << "\\n";        // 1  (CCW)
    cout << orient({0,0}, {4,0}, {2,-3}) << "\\n";       // -1 (CW)
    cout << orient({0,0}, {4,0}, {8,0}) << "\\n";        // 0  (collinear)

    cout << segmentsIntersect({0,0}, {4,4}, {0,4}, {4,0}) << "\\n";  // 1 crossing
    cout << segmentsIntersect({0,0}, {2,0}, {3,0}, {5,0}) << "\\n";  // 0 collinear apart
    cout << segmentsIntersect({0,0}, {4,0}, {2,0}, {6,0}) << "\\n";  // 1 overlapping

    cout << inTriangle({0,0}, {5,0}, {0,5}, {1,1}) << "\\n";         // 1
}
\`\`\`
`,
};

export default topic;
