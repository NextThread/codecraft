import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "polygon-intersection",
  title: "Polygon Intersection",
  description: "Clip one convex polygon against another using the Sutherland-Hodgman algorithm to compute their intersection region.",
  readingTime: 10,
  content: `
# Polygon Intersection

## Theory

Polygon intersection (clipping) computes the region common to two polygons. The general case (arbitrary simple polygons) can produce multiple disjoint output polygons and requires sophisticated algorithms (Weiler-Atherton). However, the competitive-programming-friendly special case — intersecting two **convex** polygons — always yields a single convex polygon (or empty region), and can be solved efficiently with the Sutherland-Hodgman algorithm.

### Sutherland-Hodgman algorithm (clip by convex polygon)

The idea: clip the subject polygon successively against each edge (half-plane) of the clipping convex polygon. After clipping against all edges, only the part of the subject polygon inside all half-planes (i.e., inside the convex clipping polygon) remains.

For each edge (A, B) of the clip polygon (traversed in consistent orientation, e.g., counter-clockwise, so "inside" is to the left of AB):
1. Walk around the current (partially clipped) subject polygon's vertices.
2. For each edge (P, Q) of the subject polygon, determine if P and Q are inside or outside the current clip half-plane (using the cross product sign test).
3. Based on the four cases:
   - Both inside: add Q to output.
   - P inside, Q outside: add the intersection point of PQ with the clip edge line.
   - P outside, Q inside: add the intersection point, then add Q.
   - Both outside: add nothing.
4. The output vertex list becomes the input for clipping against the next edge.

### Why it works

Each half-plane clip is a well-defined convex operation: intersecting a (possibly non-convex, but here convex) polygon with a half-plane always yields a convex polygon (since half-planes are convex and intersection of convex sets is convex). By clipping sequentially against every edge (each defining one half-plane) of the convex clip polygon, we obtain the exact intersection with the clip polygon itself (the intersection of all its half-planes).

### Complexity

If the subject polygon has n vertices and the clip polygon has m vertices, each clipping pass against one clip edge takes O(current polygon size), and there are m clip edges, with the polygon possibly growing by at most 1 vertex per clip edge. Overall complexity is O(nm) in the worst case — efficient for typical contest-sized polygons (n, m up to a few thousand).

### When to use

- Both polygons convex: use Sutherland-Hodgman directly — O(nm), simple and robust.
- One convex, one arbitrary: still applicable if the *clip* polygon is convex (subject can be arbitrary, though output correctness for self-intersecting subjects needs care).
- Both non-convex: requires general polygon clipping algorithms (Weiler-Atherton, Greiner-Hormann) — rare in contests; usually problems are designed to keep at least the clipping polygon convex.

### Conceptual example

Clip polygon: unit square (0,0),(4,0),(4,4),(0,4). Subject polygon: a triangle (2,-2),(6,2),(2,6). Clipping the triangle against each edge of the square progressively trims off the parts outside, leaving a pentagon-shaped intersection region inside the square.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Point { double x, y; };

double cross(const Point& O, const Point& A, const Point& B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

// Returns true if point p is inside (or on) the half-plane defined by directed edge A->B
// (assuming counter-clockwise clip polygon, "inside" = left side or on the line)
bool isInside(const Point& A, const Point& B, const Point& p) {
    return cross(A, B, p) >= -1e-9;
}

// Intersection of line AB with line PQ (assumes they do intersect, used only when crossing a boundary)
Point lineIntersect(const Point& A, const Point& B, const Point& P, const Point& Q) {
    double a1 = B.y - A.y, b1 = A.x - B.x, c1 = a1 * A.x + b1 * A.y;
    double a2 = Q.y - P.y, b2 = P.x - Q.x, c2 = a2 * P.x + b2 * P.y;
    double det = a1 * b2 - a2 * b1;
    double x = (b2 * c1 - b1 * c2) / det;
    double y = (a1 * c2 - a2 * c1) / det;
    return {x, y};
}

// Clip subject polygon against a single convex half-plane defined by edge A->B
vector<Point> clipHalfPlane(const vector<Point>& subject, const Point& A, const Point& B) {
    vector<Point> output;
    int n = subject.size();
    if (n == 0) return output;

    for (int i = 0; i < n; i++) {
        Point P = subject[i];
        Point Q = subject[(i + 1) % n];
        bool pIn = isInside(A, B, P);
        bool qIn = isInside(A, B, Q);

        if (pIn && qIn) {
            output.push_back(Q);
        } else if (pIn && !qIn) {
            output.push_back(lineIntersect(A, B, P, Q));
        } else if (!pIn && qIn) {
            output.push_back(lineIntersect(A, B, P, Q));
            output.push_back(Q);
        }
        // both outside: add nothing
    }
    return output;
}

// Intersect subject polygon (any simple polygon) with clipPoly (must be convex, CCW order)
vector<Point> polygonIntersection(vector<Point> subject, const vector<Point>& clipPoly) {
    int m = clipPoly.size();
    for (int i = 0; i < m && !subject.empty(); i++) {
        Point A = clipPoly[i];
        Point B = clipPoly[(i + 1) % m];
        subject = clipHalfPlane(subject, A, B);
    }
    return subject;
}

double polygonArea(const vector<Point>& poly) {
    double area = 0;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        const Point& p1 = poly[i];
        const Point& p2 = poly[(i + 1) % n];
        area += p1.x * p2.y - p2.x * p1.y;
    }
    return fabs(area) / 2.0;
}

int main() {
    // Clip polygon must be convex, given in CCW order
    vector<Point> clipPoly = {{0, 0}, {4, 0}, {4, 4}, {0, 4}};
    vector<Point> subject = {{2, -2}, {6, 2}, {2, 6}};

    vector<Point> result = polygonIntersection(subject, clipPoly);

    cout << "Intersection polygon vertices:\\n";
    for (auto& p : result) printf("(%.4f, %.4f)\\n", p.x, p.y);
    printf("Area: %.4f\\n", polygonArea(result));

    return 0;
}
\`\`\`
`,
};

export default topic;
