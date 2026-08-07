import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-dot-product",
  title: "Dot Product",
  description: "Projections, angles and perpendicularity from a single scalar product.",
  readingTime: 4,
  difficulty: "Easy",
  content: `
# Dot Product

## Theory

For vectors \`u = (x1, y1)\` and \`v = (x2, y2)\`:

\`\`\`
u · v = x1·x2 + y1·y2 = |u| · |v| · cos(theta)
\`\`\`

The result is a **scalar**.

### What its sign tells you

| \`u · v\` | Angle between them |
|---|---|
| \`> 0\` | acute (\`< 90°\`) — same general direction |
| \`= 0\` | exactly perpendicular |
| \`< 0\` | obtuse (\`> 90°\`) — opposite general direction |

### Core uses

- **Perpendicularity test**: \`u · v == 0\` (exact with integers).
- **Angle**: \`theta = acos(u·v / (|u|·|v|))\`. Prefer \`atan2(|cross|, dot)\` — numerically stabler and handles all quadrants.
- **Projection of \`u\` onto \`v\`**: length \`= (u·v)/|v|\`, vector \`= v · (u·v)/|v|²\`.
- **Point-to-segment clamping**: \`t = dot(P - A, B - A) / |B - A|²\`.
- **Is a point inside a segment's "slab"**: \`dot(P - A, B - A) >= 0\` and \`dot(P - B, A - B) >= 0\`.
- **Angle at a polygon vertex** \`B\` between \`BA\` and \`BC\`, useful to detect right angles.

### Identity worth remembering

\`\`\`
|u - v|² = |u|² + |v|² - 2(u · v)     (law of cosines)
\`\`\`

### Precision note

Keep the dot product in integers whenever coordinates are integral: sign tests then have zero error. Only convert to floating point for the final angle/length.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using T = long long;
struct Point {
    T x = 0, y = 0;
    Point operator-(const Point& o) const { return {x - o.x, y - o.y}; }
    T dot  (const Point& o) const { return x * o.x + y * o.y; }
    T cross(const Point& o) const { return x * o.y - y * o.x; }
    T norm2() const { return x * x + y * y; }
};

bool perpendicular(const Point& u, const Point& v) { return u.dot(v) == 0; }

// -1 obtuse, 0 right, +1 acute
int angleType(const Point& u, const Point& v) {
    T d = u.dot(v);
    return (d > 0) - (d < 0);
}

// Angle between u and v in radians, [0, pi]. Stable for all cases.
long double angleBetween(const Point& u, const Point& v) {
    return atan2l(fabsl((long double)u.cross(v)), (long double)u.dot(v));
}

// Scalar length of the projection of u onto v.
long double projLength(const Point& u, const Point& v) {
    return (long double)u.dot(v) / sqrtl((long double)v.norm2());
}

// Angle at vertex b in the path a-b-c.
long double angleAt(const Point& a, const Point& b, const Point& c) {
    return angleBetween(a - b, c - b);
}

int main() {
    Point u{3, 0}, v{0, 5};
    cout << "dot         = " << u.dot(v)              << "\\n";   // 0
    cout << "perp?       = " << perpendicular(u, v)   << "\\n";   // 1
    cout << "angle (rad) = " << angleBetween(u, v)    << "\\n";   // ~1.5708

    Point w{4, 3};
    cout << "proj w on u = " << projLength(w, u)      << "\\n";   // 4
    cout << "type(u,w)   = " << angleType(u, w)       << "\\n";   // 1 (acute)

    Point a{0, 0}, b{4, 0}, c{4, 4};
    cout << "angle at b  = " << angleAt(a, b, c)      << "\\n";   // ~1.5708
}
\`\`\`
`,
};

export default topic;
