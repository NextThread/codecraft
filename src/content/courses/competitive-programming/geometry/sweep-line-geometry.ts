import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sweep-line-geometry",
  title: "Sweep Line Geometry",
  description: "The sweep line paradigm for geometric problems: processing events in sorted order while maintaining a dynamic status structure.",
  readingTime: 11,
  content: `
# Sweep Line Geometry

## Theory

The sweep line (or plane sweep) technique is a general paradigm for solving geometric problems by imagining a line (usually vertical) sweeping across the plane from left to right, stopping at discrete "event points". At each event, the algorithm updates a "status" data structure that reflects the geometric objects currently intersected by the sweep line, and produces output. This converts an inherently 2D problem into a sequence of 1D updates, often reducing complexity from O(n^2) to O(n log n).

### Core components

1. **Events**: Points where the combinatorial structure of the sweep changes — e.g., segment endpoints, intersection points, circle tangency points. Events are processed in sorted order (typically by x-coordinate, with ties broken by y or by event type).
2. **Event queue**: A priority queue (or pre-sorted array if all events are known in advance) that yields events in sweep order. New events (like segment intersections) may be discovered and inserted dynamically.
3. **Status structure**: A balanced BST (in C++, typically `std::set` or `std::map` with a custom comparator) that maintains the objects currently crossed by the sweep line, ordered by their position along the perpendicular axis (e.g., y-coordinate at current sweep x). This must support insertion, deletion, and neighbor queries (predecessor/successor) in O(log n).

### Why it works

Most geometric relationships (intersection, overlap, containment) only change at specific critical x-coordinates. Between two consecutive events, the relative order of objects along the sweep line doesn't change, so we don't need to recheck everything — only examine the local neighborhood of newly inserted/removed objects for potential new events.

### Classic applications

- **Bentley-Ottmann algorithm**: Find all intersections among n segments in O((n + k) log n) time, where k is the number of intersections. Events are segment endpoints and discovered intersection points; status holds segments ordered by y at the current sweep x; only adjacent segments in the status structure are checked for future intersections.
- **Rectangle union area / perimeter**: Sweep a vertical line over rectangle edges; maintain a structure (segment tree over compressed y-coordinates) tracking covered length; events are left/right edges of rectangles.
- **Closest pair of points** (alternative to divide-and-conquer): sweep by x, maintain a set of "active" points within the current best distance d of the sweep line, ordered by y, and only compare nearby points.
- **Klee's measure problem**: total length/area covered by a union of intervals/rectangles.
- **Counting intersecting pairs / segment tree over events**: convert to an inversion-counting style problem.

### Complexity

Typically O(n log n) or O((n+k) log n) where k is output size (number of events like intersections). The log factor comes from the balanced BST operations (insert/delete/neighbor query) on the status structure, and from the priority queue for events.

### When to use

Whenever a problem involves many geometric objects whose pairwise relationships need to be determined and a naive O(n^2) all-pairs check is too slow, but relationships only change at discrete critical points — segments, intervals, rectangles, circles. If the "status" of the sweep can be maintained incrementally with local updates, sweep line applies.

### Conceptual example

To find if any two of n rectangles overlap: create events for left edge (insert) and right edge (remove) of each rectangle, sorted by x. Maintain a status structure of currently "active" rectangles' y-intervals (e.g., an interval tree or sorted set). At each insert event, check if the new y-interval overlaps any active interval — if so, report overlap. This finds an intersecting pair in O(n log n) instead of checking all O(n^2) pairs.

## C++17 Implementation

The example below demonstrates a sweep-line solution to detect whether any two segments intersect, in O(n log n), using an event-driven set-based status structure (the essence of Bentley-Ottmann restricted to intersection detection).

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Point { double x, y; };

struct Segment {
    Point a, b; // a.x <= b.x assumed after normalization
    int id;
};

double cross(const Point& O, const Point& A, const Point& B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

bool onSegment(const Point& p, const Point& q, const Point& r) {
    return min(p.x, q.x) - 1e-9 <= r.x && r.x <= max(p.x, q.x) + 1e-9 &&
           min(p.y, q.y) - 1e-9 <= r.y && r.y <= max(p.y, q.y) + 1e-9;
}

int sgn(double v) { return (v > 1e-9) - (v < -1e-9); }

bool segmentsIntersect(const Point& A, const Point& B, const Point& C, const Point& D) {
    int d1 = sgn(cross(C, D, A));
    int d2 = sgn(cross(C, D, B));
    int d3 = sgn(cross(A, B, C));
    int d4 = sgn(cross(A, B, D));
    if (d1 != d2 && d3 != d4) return true;
    if (d1 == 0 && onSegment(C, D, A)) return true;
    if (d2 == 0 && onSegment(C, D, B)) return true;
    if (d3 == 0 && onSegment(A, B, C)) return true;
    if (d4 == 0 && onSegment(A, B, D)) return true;
    return false;
}

// Event: x-coordinate, type (0 = start, 1 = end), segment index
struct Event {
    double x;
    int type; // 0 = insert, 1 = remove
    int idx;
    bool operator<(const Event& other) const {
        if (x != other.x) return x < other.x;
        return type < other.type; // process inserts before removes at same x (safe heuristic)
    }
};

// Returns the y-coordinate of segment s at sweep position x (linear interpolation)
double yAt(const Segment& s, double x) {
    if (fabs(s.b.x - s.a.x) < 1e-12) return s.a.y; // vertical segment edge case
    double t = (x - s.a.x) / (s.b.x - s.a.x);
    return s.a.y + t * (s.b.y - s.a.y);
}

// Detect if any pair of segments intersects using a sweep line + ordered status set.
// Simplified: uses current sweep x captured by reference for the comparator.
bool anyIntersection(vector<Segment> segs) {
    int n = segs.size();
    // Normalize so a.x <= b.x
    for (auto& s : segs) if (s.a.x > s.b.x) swap(s.a, s.b);

    vector<Event> events;
    for (int i = 0; i < n; i++) {
        events.push_back({segs[i].a.x, 0, i});
        events.push_back({segs[i].b.x, 1, i});
    }
    sort(events.begin(), events.end());

    double sweepX = -1e18;
    auto cmp = [&](int i, int j) {
        double yi = yAt(segs[i], sweepX), yj = yAt(segs[j], sweepX);
        if (fabs(yi - yj) > 1e-9) return yi < yj;
        return i < j;
    };
    set<int, decltype(cmp)> status(cmp);
    map<int, set<int, decltype(cmp)>::iterator> pos;

    for (auto& ev : events) {
        sweepX = ev.x;
        if (ev.type == 0) {
            auto it = status.insert(ev.idx).first;
            pos[ev.idx] = it;
            // Check neighbors for intersection
            if (next(it) != status.end() &&
                segmentsIntersect(segs[ev.idx].a, segs[ev.idx].b, segs[*next(it)].a, segs[*next(it)].b))
                return true;
            if (it != status.begin() &&
                segmentsIntersect(segs[ev.idx].a, segs[ev.idx].b, segs[*prev(it)].a, segs[*prev(it)].b))
                return true;
        } else {
            auto it = pos[ev.idx];
            auto nx = next(it), pv = (it == status.begin() ? status.end() : prev(it));
            if (nx != status.end() && pv != status.end() &&
                segmentsIntersect(segs[*pv].a, segs[*pv].b, segs[*nx].a, segs[*nx].b))
                return true;
            status.erase(it);
        }
    }
    return false;
}

int main() {
    int n;
    cin >> n;
    vector<Segment> segs(n);
    for (int i = 0; i < n; i++) {
        cin >> segs[i].a.x >> segs[i].a.y >> segs[i].b.x >> segs[i].b.y;
        segs[i].id = i;
    }
    cout << (anyIntersection(segs) ? "YES" : "NO") << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
