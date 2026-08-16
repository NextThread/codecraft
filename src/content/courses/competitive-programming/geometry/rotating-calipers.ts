import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "rotating-calipers",
  title: "Rotating Calipers",
  description: "A technique for solving extremal problems on convex polygons — diameter, minimum bounding box, and more — in linear time.",
  readingTime: 10,
  content: `
# Rotating Calipers

## Theory

Rotating calipers is a technique for computing extremal properties of convex polygons — such as the diameter (maximum distance between any two vertices), the minimum-area or minimum-perimeter bounding rectangle, and the minimum distance between two convex polygons — in O(n) time after the polygon(s) have been constructed (i.e., after an O(n log n) convex hull computation if starting from raw points).

### Core idea

Imagine two parallel lines ("calipers") touching the convex polygon at two points (like calipers measuring the width of an object), and slowly rotate them around the polygon while keeping them in contact with the boundary. As you rotate 180 degrees (or 360, depending on the problem), the pair of contact points/edges sweeps through all locally extreme configurations. Because a convex polygon's supporting lines rotate monotonically, each "antipodal" pair transition can be tracked with a two-pointer sweep, giving overall O(n) rather than O(n^2).

### Antipodal pairs

Two vertices (or edges) of a convex polygon are "antipodal" if there exist parallel supporting lines through each. The diameter of a convex polygon is always achieved by an antipodal pair of vertices. As one caliper point (index i) walks around the polygon, the "opposite" point (index j) also walks around monotonically (in the same rotational direction), never needing to backtrack — this monotonicity is the key insight enabling the O(n) two-pointer technique instead of checking all O(n^2) vertex pairs.

### Algorithm structure (diameter example)

1. Compute the convex hull of the point set (O(n log n)), if not already given.
2. Initialize j to the point farthest from edge (hull[0], hull[1]) (found by scanning while the cross-product-based area keeps increasing).
3. For each edge i = (hull[i], hull[i+1]), advance j as long as the polygon's edge/point configuration indicates j+1 is farther from the current edge's line than j (using cross product to compare areas of triangles, avoiding sqrt).
4. Track the maximum distance seen between hull[i] and hull[j] (and other combinations, depending on exact algorithm) across all i.
5. Since j advances monotonically and total advancement is O(n) across the whole loop (amortized), the overall algorithm is O(n).

### Complexity

O(n log n) if starting from raw points (dominated by convex hull construction), O(n) if the convex polygon is already given.

### When to use

- Diameter of a point set / convex polygon (farthest pair of points): classic rotating calipers application.
- Minimum-area or minimum-perimeter enclosing rectangle of a convex polygon: the optimal rectangle always has one side collinear with a polygon edge, so rotate calipers through all edges checking width/height at each orientation.
- Minimum distance between two disjoint convex polygons: dual calipers, one per polygon, rotated in sync.
- Any extremal geometric query over convex shapes where brute-force pairwise comparison would be O(n^2) but the answer has a monotonic rotational structure.

### Conceptual example

For a convex polygon with vertices (0,0), (4,0), (4,3), (0,3) (a rectangle), the diameter is between opposite corners, e.g., (0,0) and (4,3), distance 5 — the antipodal pair. Rotating calipers would identify this without checking all C(4,2)=6 pairs individually (though for n=4 the saving is trivial — the benefit shows for large n).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Point {
    ll x, y;
};

ll cross(const Point& O, const Point& A, const Point& B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

ll dist2(const Point& a, const Point& b) {
    ll dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
}

// Standard monotone chain convex hull, returns hull in CCW order without duplicate first/last point.
vector<Point> convexHull(vector<Point> pts) {
    int n = pts.size(), k = 0;
    if (n <= 2) return pts;
    sort(pts.begin(), pts.end(), [](const Point& a, const Point& b) {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });
    vector<Point> hull(2 * n);

    // Build lower hull
    for (int i = 0; i < n; i++) {
        while (k >= 2 && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }
    // Build upper hull
    for (int i = n - 2, lower = k + 1; i >= 0; i--) {
        while (k >= lower && cross(hull[k - 2], hull[k - 1], pts[i]) <= 0) k--;
        hull[k++] = pts[i];
    }
    hull.resize(k - 1); // last point == first point, drop duplicate
    return hull;
}

// Rotating calipers: find the squared diameter (max squared distance between any two hull points)
ll rotatingCalipersDiameter(const vector<Point>& hull) {
    int n = hull.size();
    if (n == 1) return 0;
    if (n == 2) return dist2(hull[0], hull[1]);

    ll best = 0;
    int j = 1;
    // For each edge i -> i+1, advance j while it keeps increasing the triangle area (farther point)
    for (int i = 0; i < n; i++) {
        int nextI = (i + 1) % n;
        while (true) {
            int nextJ = (j + 1) % n;
            // Compare areas: if moving j forward increases distance-from-edge, advance
            ll areaCur = llabs(cross(hull[i], hull[nextI], hull[j]));
            ll areaNext = llabs(cross(hull[i], hull[nextI], hull[nextJ]));
            if (areaNext > areaCur) {
                j = nextJ;
            } else {
                break;
            }
        }
        best = max({best, dist2(hull[i], hull[j]), dist2(hull[nextI], hull[j])});
    }
    return best;
}

int main() {
    int n;
    cin >> n;
    vector<Point> pts(n);
    for (auto& p : pts) cin >> p.x >> p.y;

    vector<Point> hull = convexHull(pts);
    ll diameterSq = rotatingCalipersDiameter(hull);

    printf("Diameter squared: %lld\\n", diameterSq);
    printf("Diameter: %.6f\\n", sqrt((double)diameterSq));

    return 0;
}
\`\`\`
`,
};

export default topic;
