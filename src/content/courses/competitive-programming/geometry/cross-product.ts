import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-cross-product",
  title: "Cross Product",
  description: "The single most useful primitive: turn direction, signed area, collinearity.",
  readingTime: 4,
  difficulty: "Easy",
  content: `
# Cross Product

## Theory

In 2D we use the scalar **z-component** of the 3D cross product:

\`\`\`
cross(u, v) = u.x · v.y - u.y · v.x = |u| · |v| · sin(theta)
\`\`\`

### Interpretation

- \`|cross(u, v)|\` is the **area of the parallelogram** spanned by \`u\` and \`v\`; half of it is the triangle area.
- The **sign** encodes turn direction:

| \`cross(B-A, C-A)\` | Meaning |
|---|---|
| \`> 0\` | \`A → B → C\` turns **counter-clockwise** (left) |
| \`= 0\` | the three points are **collinear** |
| \`< 0\` | turns **clockwise** (right) |

### Where it is used

- Orientation / \`ccw\` predicate (the basis of segment intersection, convex hull, point-in-polygon).
- Signed polygon area (shoelace formula) and centroid.
- Collinearity and parallelism tests: \`cross(u, v) == 0\`.
- Angular sorting (compare by half-plane, then by cross product sign).
- Line intersection via Cramer's rule.

### Overflow

With coordinates up to \`1e9\`, differences reach \`2e9\` and the product reaches \`4e18\` — use \`long long\` (or \`__int128\` for extra safety). Never \`int\`.

### Handy identity

\`\`\`
cross(u, v) = -cross(v, u)
area(A,B,C) = |cross(B - A, C - A)| / 2
\`\`\`

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

// cross of vectors AB and AC
T cross3(const Point& a, const Point& b, const Point& c) {
    return (b - a).cross(c - a);
}

int sgn(T v) { return (v > 0) - (v < 0); }

bool collinear(const Point& a, const Point& b, const Point& c) {
    return cross3(a, b, c) == 0;
}

bool parallel(const Point& u, const Point& v) { return u.cross(v) == 0; }

// Twice the (signed) triangle area — keeps everything integral.
T twiceArea(const Point& a, const Point& b, const Point& c) {
    return cross3(a, b, c);
}

long double triangleArea(const Point& a, const Point& b, const Point& c) {
    return fabsl((long double)cross3(a, b, c)) / 2.0L;
}

int main() {
    Point a{0, 0}, b{4, 0}, c{4, 3}, d{8, 0};

    cout << "cross3(a,b,c) = " << cross3(a, b, c) << "\\n";   // 12  -> CCW
    cout << "sign          = " << sgn(cross3(a, b, c)) << "\\n";
    cout << "collinear abd = " << collinear(a, b, d) << "\\n"; // 1
    cout << "area abc      = " << triangleArea(a, b, c) << "\\n"; // 6
    cout << "parallel      = " << parallel(b - a, d - a) << "\\n"; // 1
}
\`\`\`
`,
};

export default topic;
