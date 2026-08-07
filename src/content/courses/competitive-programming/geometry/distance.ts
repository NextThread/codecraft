import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-distance",
  title: "Distance",
  description: "Euclidean, Manhattan and Chebyshev distances, plus point-to-line and point-to-segment.",
  readingTime: 4,
  difficulty: "Easy",
  content: `
# Distance

## Theory

### Metrics between two points

| Metric | Formula | Use |
|---|---|---|
| Euclidean | \`sqrt((x1-x2)² + (y1-y2)²)\` | Real geometric distance |
| Squared Euclidean | \`(x1-x2)² + (y1-y2)²\` | **Comparisons** — exact, no \`sqrt\` |
| Manhattan (L1) | \`|x1-x2| + |y1-y2|\` | Grid movement |
| Chebyshev (L∞) | \`max(|x1-x2|, |y1-y2|)\` | King moves on a chessboard |

**Golden rule:** never call \`sqrt\` if you only need to compare distances — compare the squared values instead. It's faster and exact for integer inputs.

### L1 ↔ L∞ trick

The rotation \`(x, y) → (x + y, x - y)\` maps Manhattan distance to Chebyshev distance (and back with a factor of 2). This converts "maximum Manhattan distance between points" into two independent max–min range computations — an O(n) solution.

### Point to line

For the infinite line through \`A\` and \`B\`:

\`\`\`
dist = |cross(B - A, P - A)| / |B - A|
\`\`\`

### Point to segment

Project \`P\` onto \`AB\` with the dot product and clamp the parameter \`t\` to \`[0, 1]\`:

\`\`\`
t = dot(P - A, B - A) / |B - A|²
t <= 0 -> nearest point is A
t >= 1 -> nearest point is B
else      nearest point is A + t·(B - A)
\`\`\`

### Segment to segment

If the segments intersect, the distance is 0. Otherwise it is the minimum of the four point-to-segment distances.

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

T dist2(const Point& a, const Point& b) { return (a - b).norm2(); }              // exact
long double dist(const Point& a, const Point& b) { return sqrtl((long double)dist2(a, b)); }

T manhattan(const Point& a, const Point& b) { return llabs(a.x - b.x) + llabs(a.y - b.y); }
T chebyshev(const Point& a, const Point& b) { return max(llabs(a.x - b.x), llabs(a.y - b.y)); }

// Distance from p to the infinite line AB.
long double distToLine(const Point& p, const Point& a, const Point& b) {
    Point ab = b - a;
    return fabsl((long double)ab.cross(p - a)) / sqrtl((long double)ab.norm2());
}

// Distance from p to the segment AB.
long double distToSegment(const Point& p, const Point& a, const Point& b) {
    Point ab = b - a, ap = p - a;
    if (ab.norm2() == 0) return dist(p, a);                  // degenerate segment
    long double t = (long double)ap.dot(ab) / (long double)ab.norm2();
    if (t <= 0) return dist(p, a);
    if (t >= 1) return dist(p, b);
    long double px = a.x + t * ab.x, py = a.y + t * ab.y;
    long double dx = p.x - px, dy = p.y - py;
    return sqrtl(dx * dx + dy * dy);
}

int main() {
    Point a{0, 0}, b{3, 4}, p{3, 0};
    cout << "dist2      = " << dist2(a, b)     << "\\n";      // 25
    cout << "dist       = " << dist(a, b)      << "\\n";      // 5
    cout << "manhattan  = " << manhattan(a, b) << "\\n";      // 7
    cout << "chebyshev  = " << chebyshev(a, b) << "\\n";      // 4
    cout << "to line    = " << distToLine(p, a, b)    << "\\n";  // 2.4
    cout << "to segment = " << distToSegment(p, a, b) << "\\n";  // 2.4
}
\`\`\`
`,
};

export default topic;
