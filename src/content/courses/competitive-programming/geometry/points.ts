import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-points",
  title: "Points",
  description: "A reusable 2D point/vector struct with operators — the base of all geometry code.",
  readingTime: 4,
  difficulty: "Easy",
  content: `
# Points

## Theory

Every geometry solution starts with a **point** type. In computational geometry a point \`(x, y)\` and a vector are the same structure; the meaning comes from context: \`B - A\` is the vector from \`A\` to \`B\`.

### Choosing the coordinate type

- Prefer **integers** (\`long long\`) whenever the input is integral. Dot/cross products stay exact, so no epsilon bugs.
- Use \`long double\` only when the problem truly needs division, square roots, or rotations. Then compare with an epsilon: \`fabs(a - b) < 1e-9\`.
- Watch for overflow: with coordinates up to \`1e9\`, a cross product reaches \`~4e18\`, which fits in \`long long\` but only barely — never use \`int\`.

### Operations you need

| Operation | Formula |
|---|---|
| Addition | \`(x1 + x2, y1 + y2)\` |
| Subtraction | \`(x1 - x2, y1 - y2)\` |
| Scaling | \`(k·x, k·y)\` |
| Dot product | \`x1·x2 + y1·y2\` |
| Cross product (z-component) | \`x1·y2 - y1·x2\` |
| Squared length | \`x² + y²\` (avoid \`sqrt\` when comparing) |
| Angle | \`atan2(y, x)\` in \`(-π, π]\` |
| Rotation by θ | \`(x·cosθ - y·sinθ, x·sinθ + y·cosθ)\` |
| Perpendicular (90° CCW) | \`(-y, x)\` |

### Sorting points

- **Lexicographic** (\`x\`, then \`y\`) — used by Convex Hull.
- **Angular** around an origin — use half-plane comparison plus cross product instead of \`atan2\` to stay exact.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using T = long long;                 // switch to long double for float geometry

struct Point {
    T x = 0, y = 0;

    Point operator+(const Point& o) const { return {x + o.x, y + o.y}; }
    Point operator-(const Point& o) const { return {x - o.x, y - o.y}; }
    Point operator*(T k)            const { return {x * k, y * k}; }

    T dot  (const Point& o) const { return x * o.x + y * o.y; }
    T cross(const Point& o) const { return x * o.y - y * o.x; }

    T norm2() const { return x * x + y * y; }          // squared length
    long double norm() const { return sqrtl((long double)norm2()); }

    Point perp() const { return {-y, x}; }             // rotate 90 deg CCW

    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
    bool operator< (const Point& o) const {            // lexicographic
        return x != o.x ? x < o.x : y < o.y;
    }
};

ostream& operator<<(ostream& os, const Point& p) {
    return os << '(' << p.x << ", " << p.y << ')';
}

// Angular sort around the origin, exact (no atan2).
int half(const Point& p) { return (p.y < 0 || (p.y == 0 && p.x < 0)) ? 1 : 0; }

bool angleLess(const Point& a, const Point& b) {
    if (half(a) != half(b)) return half(a) < half(b);
    T c = a.cross(b);
    return c != 0 ? c > 0 : a.norm2() < b.norm2();
}

int main() {
    Point a{1, 2}, b{4, 6};
    Point ab = b - a;
    cout << "a + b   = " << a + b        << "\\n";
    cout << "b - a   = " << ab           << "\\n";
    cout << "dot     = " << a.dot(b)     << "\\n";       // 16
    cout << "cross   = " << a.cross(b)   << "\\n";       // -2
    cout << "|b - a| = " << ab.norm()    << "\\n";       // 5

    vector<Point> pts = {{3, 1}, {1, 1}, {1, -2}, {-2, 0}};
    sort(pts.begin(), pts.end());
    for (auto& p : pts) cout << p << ' ';
    cout << "\\n";
    sort(pts.begin(), pts.end(), angleLess);
    for (auto& p : pts) cout << p << ' ';
    cout << "\\n";
}
\`\`\`
`,
};

export default topic;
