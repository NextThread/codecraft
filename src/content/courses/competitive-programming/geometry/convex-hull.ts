import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-convex-hull",
  title: "Convex Hull",
  description: "Andrew's monotone chain in O(n log n), with collinearity and hull-usage notes.",
  readingTime: 5,
  difficulty: "Medium",
  content: `
# Convex Hull

## Theory

The **convex hull** of a point set is the smallest convex polygon containing all points — the shape of a rubber band snapped around the points.

### Andrew's monotone chain — O(n log n)

1. Sort the points lexicographically by \`(x, y)\` and remove duplicates.
2. Build the **lower hull**: scan left → right, pushing points; while the last three make a non-left turn (\`cross <= 0\`), pop.
3. Build the **upper hull**: scan right → left with the same rule.
4. Concatenate, dropping the duplicated endpoints.

The result is in **counter-clockwise** order and has at most \`n\` vertices. Cost: sorting dominates at \`O(n log n)\`; the scans are \`O(n)\` amortised because each point is pushed and popped at most once.

### Collinear points

- \`cross <= 0\` → pop → **strict** hull (collinear points on an edge are removed).
- \`cross < 0\` → pop → collinear points are **kept** on the hull.

Read the problem statement carefully; both variants are asked for. Careful: with the "keep collinear" version, an input where *all* points are collinear produces a degenerate hull that lists points twice — special-case it.

### Graham scan alternative

Sort by polar angle around the lowest point, then do a single stack scan. Same complexity, but the angular comparator with ties is more error-prone than monotone chain.

### What hulls unlock

- **Diameter** of a point set (farthest pair) via rotating calipers — O(n) after the hull.
- **Minimum enclosing rectangle / width** via rotating calipers.
- **Point in convex polygon** in O(log n) with binary search on hull edges.
- **Convex Hull Trick** for DP optimisation (upper envelope of lines).
- Minkowski sums, closest pair of convex polygons.

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
    bool operator< (const Point& o) const { return x != o.x ? x < o.x : y < o.y; }
};

T cross3(const Point& o, const Point& a, const Point& b) {
    return (a - o).cross(b - o);
}

// Returns the hull in counter-clockwise order.
// keepCollinear = false -> only true corner vertices.
vector<Point> convexHull(vector<Point> pts, bool keepCollinear = false) {
    sort(pts.begin(), pts.end());
    pts.erase(unique(pts.begin(), pts.end()), pts.end());
    int n = pts.size();
    if (n < 3) return pts;

    vector<Point> hull(2 * n);
    int k = 0;
    auto bad = [&](const Point& o, const Point& a, const Point& b) {
        T c = cross3(o, a, b);
        return keepCollinear ? c < 0 : c <= 0;
    };

    for (int i = 0; i < n; ++i) {                       // lower hull
        while (k >= 2 && bad(hull[k - 2], hull[k - 1], pts[i])) --k;
        hull[k++] = pts[i];
    }
    for (int i = n - 2, lower = k + 1; i >= 0; --i) {   // upper hull
        while (k >= lower && bad(hull[k - 2], hull[k - 1], pts[i])) --k;
        hull[k++] = pts[i];
    }
    hull.resize(k - 1);                                 // drop repeated first point
    return hull;
}

// Squared diameter of the point set via the hull (O(h^2), fine for small hulls).
T hullDiameter2(const vector<Point>& h) {
    T best = 0;
    for (size_t i = 0; i < h.size(); ++i)
        for (size_t j = i + 1; j < h.size(); ++j) {
            Point d = h[i] - h[j];
            best = max(best, d.x * d.x + d.y * d.y);
        }
    return best;
}

int main() {
    vector<Point> pts = {{0,0},{4,0},{4,4},{0,4},{2,2},{2,0},{1,1}};
    auto h = convexHull(pts);
    cout << "hull size = " << h.size() << "\\n";          // 4
    for (auto& p : h) cout << '(' << p.x << ',' << p.y << ") ";
    cout << "\\n";
    cout << "diameter^2 = " << hullDiameter2(h) << "\\n";  // 32
}
\`\`\`
`,
};

export default topic;
