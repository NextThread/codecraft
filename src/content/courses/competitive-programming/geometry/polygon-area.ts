import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "geo-polygon-area",
  title: "Polygon Area",
  description: "Shoelace formula, orientation from signed area, centroid and Pick's theorem.",
  readingTime: 4,
  difficulty: "Medium",
  content: `
# Polygon Area

## Theory

### Shoelace (Gauss) formula

For a simple polygon with vertices \`p0, p1, ..., p(n-1)\` in order:

\`\`\`
2A = sum over i of ( x[i]·y[i+1] - x[i+1]·y[i] )      (indices mod n)
Area = |2A| / 2
\`\`\`

Equivalently, \`2A = sum of cross(p[i], p[i+1])\` — a sum of signed triangle areas from the origin, where the parts outside the polygon cancel out.

### Signed area gives orientation

- \`2A > 0\` → vertices are **counter-clockwise**.
- \`2A < 0\` → **clockwise**.
- \`2A = 0\` → degenerate (all points collinear).

Keep \`2A\` as a \`long long\` for integer inputs: the area is then exact and comparisons need no epsilon. Watch overflow — with coordinates up to \`1e9\` and \`n\` up to \`1e5\`, the sum can exceed \`1e23\`, so use \`__int128\` for large inputs.

### Centroid of a polygon

\`\`\`
Cx = (1 / (6A)) · sum ( (x[i] + x[i+1]) · cross(p[i], p[i+1]) )
Cy = (1 / (6A)) · sum ( (y[i] + y[i+1]) · cross(p[i], p[i+1]) )
\`\`\`

(Not the same as the average of the vertices, except for triangles.)

### Pick's theorem (lattice polygons)

For a simple polygon with integer vertices:

\`\`\`
A = I + B/2 - 1
\`\`\`

where \`I\` = interior lattice points and \`B\` = boundary lattice points. Boundary points on an edge from \`A\` to \`B\` count as \`gcd(|dx|, |dy|)\`. Rearranged, \`I = A - B/2 + 1\` — a standard trick to count interior lattice points.

### Complexity

O(n) time, O(1) extra memory for all of the above.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using T = long long;
struct Point { T x = 0, y = 0; };

// Twice the signed area (exact for integer coordinates).
T twiceSignedArea(const vector<Point>& p) {
    int n = p.size();
    T s = 0;
    for (int i = 0, j = n - 1; i < n; j = i++)
        s += p[j].x * p[i].y - p[i].x * p[j].y;
    return s;
}

long double polygonArea(const vector<Point>& p) {
    return fabsl((long double)twiceSignedArea(p)) / 2.0L;
}

// +1 CCW, -1 CW, 0 degenerate
int orientationOfPolygon(const vector<Point>& p) {
    T s = twiceSignedArea(p);
    return (s > 0) - (s < 0);
}

pair<long double, long double> centroid(const vector<Point>& p) {
    int n = p.size();
    long double cx = 0, cy = 0, a2 = 0;
    for (int i = 0, j = n - 1; i < n; j = i++) {
        long double cr = (long double)(p[j].x * p[i].y - p[i].x * p[j].y);
        a2 += cr;
        cx += (p[j].x + p[i].x) * cr;
        cy += (p[j].y + p[i].y) * cr;
    }
    return {cx / (3 * a2), cy / (3 * a2)};
}

// Boundary lattice points, then interior points via Pick's theorem.
T boundaryLatticePoints(const vector<Point>& p) {
    int n = p.size();
    T b = 0;
    for (int i = 0, j = n - 1; i < n; j = i++)
        b += __gcd(llabs(p[i].x - p[j].x), llabs(p[i].y - p[j].y));
    return b;
}

T interiorLatticePoints(const vector<Point>& p) {
    T a2 = llabs(twiceSignedArea(p));       // = 2A
    T b  = boundaryLatticePoints(p);
    return (a2 - b + 2) / 2;                // I = A - B/2 + 1
}

int main() {
    vector<Point> square = {{0,0},{4,0},{4,4},{0,4}};
    cout << "area        = " << polygonArea(square)          << "\\n";  // 16
    cout << "orientation = " << orientationOfPolygon(square) << "\\n";  // 1 (CCW)
    auto [cx, cy] = centroid(square);
    cout << "centroid    = (" << cx << ", " << cy << ")\\n";            // (2, 2)
    cout << "boundary    = " << boundaryLatticePoints(square) << "\\n"; // 16
    cout << "interior    = " << interiorLatticePoints(square) << "\\n"; // 9

    vector<Point> tri = {{0,0},{5,0},{0,5}};
    cout << "tri area    = " << polygonArea(tri) << "\\n";              // 12.5
}
\`\`\`
`,
};

export default topic;
