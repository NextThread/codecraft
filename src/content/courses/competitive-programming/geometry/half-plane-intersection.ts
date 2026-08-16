import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "half-plane-intersection",
  title: "Half-Plane Intersection",
  description: "Compute the convex polygon formed by intersecting a set of half-planes using the sort-and-deque sweep algorithm.",
  readingTime: 11,
  content: `
# Half-Plane Intersection

## Theory

A half-plane is the set of points on one side of a line (including or excluding the boundary). Given a collection of half-planes, their intersection is always a convex region (possibly unbounded, empty, or a single point/segment in degenerate cases). Computing this intersection is a powerful primitive: it generalizes convex polygon clipping, solves "find a point satisfying all linear constraints" problems, and underlies problems like "common visible region from a set of directional constraints" or LP-feasibility in 2D.

### Representation

Each half-plane is represented as a directed line: a point on the line plus a direction vector, with "inside" defined as the region to the **left** of the directed line (standard convention). A constraint like ax + by <= c can be converted to this directed-line form.

### Core algorithm: sort by angle + deque sweep

The classic O(n log n) algorithm:
1. Represent each half-plane by its boundary line's angle (direction) and offset.
2. Sort all half-planes by the angle of their direction vector.
3. If multiple half-planes have the same angle, keep only the most restrictive one (discard the others, since they're parallel and one strictly contains the other's feasible region).
4. Process half-planes in angular order using a deque to maintain the current candidate intersection polygon (represented as a sequence of half-planes / their pairwise intersection points):
   - For the new half-plane, pop from the back of the deque while the intersection point of the last two half-planes in the deque is not inside the new half-plane (i.e., it violates the new constraint).
   - Symmetrically pop from the front of the deque under the same condition (needed because as we wrap around, previously added half-planes at the front may become redundant).
   - Push the new half-plane onto the deque.
5. After processing all half-planes, do a final cleanup pass at the front/back to remove any remaining half-planes made redundant by the wrap-around.
6. The result is a deque of half-planes whose pairwise consecutive intersections form the vertices of the intersection polygon. If at any point the deque has fewer than 3 half-planes, or becomes empty, the intersection is empty or unbounded/degenerate (must be handled based on problem context).

### Why it works

Sorting by angle ensures the half-planes are considered in an order consistent with how their boundary lines would appear when tracing the convex intersection region's boundary. The deque maintains exactly the "currently relevant" constraints — like a convex hull trick / monotonic stack for lines, popping constraints that have become redundant given a newly added tighter constraint. This is essentially the same amortized-analysis idea as Andrew's monotone chain for convex hulls.

### Complexity

O(n log n), dominated by the initial angle-sort; the deque sweep itself is O(n) amortized (each half-plane pushed and popped at most a constant number of times).

### When to use

- Intersecting many linear constraints in 2D to find the feasible convex region (or check feasibility).
- Computing the "kernel" of a simple polygon (the region from which the entire polygon interior is visible) — the kernel is the intersection of the half-planes defined by each edge.
- Generalizing convex polygon clipping when clip constraints are given as arbitrary half-planes rather than an explicit polygon.
- LP problems in 2D where you want the actual feasible region, not just an optimal point (for that, direct 2D LP algorithms are simpler, but half-plane intersection gives the full picture).

### Conceptual example

Half-planes: x >= 0, y >= 0, x <= 4, y <= 4 (representing a square feasibility region). Intersecting all four half-planes yields exactly the square [0,4] x [0,4]. Adding a fifth half-plane x + y <= 5 would clip off the corner near (4,4), producing a pentagon.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const double EPS = 1e-9;

struct Point {
    double x, y;
};

Point operator-(const Point& a, const Point& b) { return {a.x - b.x, a.y - b.y}; }
Point operator+(const Point& a, const Point& b) { return {a.x + b.x, a.y + b.y}; }
Point operator*(const Point& a, double t) { return {a.x * t, a.y * t}; }
double cross(const Point& a, const Point& b) { return a.x * b.y - a.y * b.x; }

// A half-plane represented as point p with direction vector d; "inside" is the left side of the directed line.
struct HalfPlane {
    Point p, d; // line passes through p in direction d
    double angle;

    HalfPlane() {}
    HalfPlane(const Point& p_, const Point& d_) : p(p_), d(d_) {
        angle = atan2(d.y, d.x);
    }

    // Is point q strictly to the left (inside) of this half-plane's boundary?
    bool contains(const Point& q) const {
        return cross(d, q - p) > -EPS;
    }

    bool operator<(const HalfPlane& other) const { return angle < other.angle; }
};

// Intersection point of two half-plane boundary lines
Point lineIntersect(const HalfPlane& a, const HalfPlane& b) {
    double t = cross(b.d, a.p - b.p) / cross(a.d, b.d);
    return a.p + a.d * t;
}

// Check if half-planes a, b, c have a common point such that c makes the a-b intersection redundant
bool isRedundant(const HalfPlane& a, const HalfPlane& b, const HalfPlane& c) {
    Point pt = lineIntersect(a, b);
    return !c.contains(pt);
}

// Compute the intersection of half-planes; returns vertices of resulting convex polygon (empty if infeasible/unbounded to size < 3)
vector<Point> halfPlaneIntersection(vector<HalfPlane> planes) {
    sort(planes.begin(), planes.end());

    // Remove parallel duplicate-direction half-planes, keeping the most restrictive
    vector<HalfPlane> uniquePlanes;
    for (auto& hp : planes) {
        if (!uniquePlanes.empty() && fabs(uniquePlanes.back().angle - hp.angle) < EPS) {
            // Same direction: keep whichever is more restrictive (doesn't contain the other's reference point... )
            if (!hp.contains(uniquePlanes.back().p)) continue; // existing is at least as tight, skip new
            uniquePlanes.back() = hp; // new is tighter
        } else {
            uniquePlanes.push_back(hp);
        }
    }
    planes = uniquePlanes;

    deque<HalfPlane> dq;
    for (auto& hp : planes) {
        // Remove from back while redundant
        while (dq.size() >= 2 && isRedundant(dq[dq.size() - 2], dq[dq.size() - 1], hp)) {
            dq.pop_back();
        }
        // Remove from front while redundant
        while (dq.size() >= 2 && isRedundant(dq[0], dq[1], hp)) {
            dq.pop_front();
        }
        dq.push_back(hp);
    }

    // Final cleanup: remove redundant half-planes at the wrap-around boundary
    while (dq.size() >= 3 && isRedundant(dq[dq.size() - 2], dq[dq.size() - 1], dq[0])) {
        dq.pop_back();
    }
    while (dq.size() >= 3 && isRedundant(dq[dq.size() - 1], dq[0], dq[1])) {
        dq.pop_front();
    }

    if (dq.size() < 3) return {}; // empty, unbounded, or degenerate intersection

    vector<Point> polygon;
    int m = dq.size();
    for (int i = 0; i < m; i++) {
        polygon.push_back(lineIntersect(dq[i], dq[(i + 1) % m]));
    }
    return polygon;
}

int main() {
    // Example: intersect half-planes forming a square [0,4] x [0,4], then clip a corner with x+y<=5
    vector<HalfPlane> planes;
    planes.push_back(HalfPlane({0, 0}, {1, 0}));   // y >= 0 (left of direction (1,0) is y>=0)
    planes.push_back(HalfPlane({4, 0}, {0, 1}));   // x <= 4
    planes.push_back(HalfPlane({4, 4}, {-1, 0}));  // y <= 4
    planes.push_back(HalfPlane({0, 4}, {0, -1}));  // x >= 0
    planes.push_back(HalfPlane({5, 0}, {-1, 1}));  // x + y <= 5

    vector<Point> result = halfPlaneIntersection(planes);

    cout << "Intersection polygon vertices:\\n";
    for (auto& p : result) printf("(%.4f, %.4f)\\n", p.x, p.y);

    return 0;
}
\`\`\`
`,
};

export default topic;
