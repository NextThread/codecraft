import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "ternary-search",
  title: "Ternary Search",
  description: "Find the extremum of a unimodal function in O(log n).",
  readingTime: 4,
  content: `
# Ternary Search

## Theory

**Ternary search** finds the maximum (or minimum) of a **unimodal** function — one that strictly increases up to some peak and then strictly decreases (or vice versa).

The interval is divided into three parts by \`m1 = lo + (hi - lo) / 3\` and \`m2 = hi - (hi - lo) / 3\`. Comparing \`f(m1)\` with \`f(m2)\` lets us discard one third of the range every iteration.

- Complexity: **O(log n)** (base 3/2).
- Works on integers **and** real numbers.
- Requires the function to be **strictly** unimodal — flat plateaus break the comparison.

### Integer vs real

- For integers, stop when \`hi - lo <= 2\` and pick the best of the last few candidates.
- For doubles, iterate a fixed number of times (~200) to reach acceptable precision.

### Typical uses

- Optimal x for a convex/concave physical simulation.
- Minimising a cost function over a real parameter.
- Some geometry problems (distance between a point and a curve).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Real-valued ternary search — maximise a unimodal f on [lo, hi].
double ternaryMax(function<double(double)> f, double lo, double hi) {
    for (int it = 0; it < 200; ++it) {
        double m1 = lo + (hi - lo) / 3;
        double m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) lo = m1;
        else               hi = m2;
    }
    return (lo + hi) / 2;
}

// Integer ternary search — maximise unimodal f on [lo, hi].
int ternaryMaxInt(function<long long(int)> f, int lo, int hi) {
    while (hi - lo > 2) {
        int m1 = lo + (hi - lo) / 3;
        int m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) lo = m1 + 1;
        else               hi = m2 - 1;
    }
    int best = lo;
    for (int i = lo + 1; i <= hi; ++i)
        if (f(i) > f(best)) best = i;
    return best;
}

int main() {
    // f(x) = -(x - 3)^2 + 10 — peak at x = 3.
    auto f = [](double x) { return -(x - 3) * (x - 3) + 10; };
    cout << fixed << setprecision(4) << ternaryMax(f, -10, 10) << "\\n";
}
\`\`\`
`,
};

export default topic;
