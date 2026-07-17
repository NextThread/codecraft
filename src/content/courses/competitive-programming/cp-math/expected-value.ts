import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "expected-value",
  title: "Expected Value",
  description: "Expected Value \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Expected Value

## Theory

The **expected value** (mean) of a random variable \`X\` is the weighted average of its possible values:

\`E[X] = sum_x x * P(X = x)\`  (discrete)
\`E[X] = integral of x * f(x) dx\`  (continuous, density \`f\`)

### Fundamental properties

- **Linearity of expectation** (holds even if variables are dependent):
  \`E[X + Y] = E[X] + E[Y]\`
  \`E[a * X + b] = a * E[X] + b\`
- **Products**: \`E[X * Y] = E[X] * E[Y]\` only if \`X, Y\` are independent.
- **Indicator trick**: for events \`A_i\`, \`E[number of A_i that occur] = sum_i P(A_i)\`. This is the single most useful CP tool for expected-value problems.

### Examples

- Expected value of a fair die: \`(1 + 2 + ... + 6) / 6 = 3.5\`.
- Expected number of coin flips until first head (geometric with \`p = 1/2\`): \`1 / p = 2\`.
- Expected number of fixed points of a random permutation of \`n\` elements: \`1\` (sum of indicators, \`P(i is fixed) = 1/n\`, \`n * 1/n = 1\`).

### CP idioms

- Set up **indicators** for the quantities you want to count.
- Use **linearity** to break the sum into independent pieces.
- Represent answers as rational numbers modulo a prime (\`p * q^{-1} mod m\`).
- For process-like problems, set up recurrences on expected values (\`E[state] = 1 + sum_children p_i * E[child_i]\`) and solve as a linear system or DP.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}
long long invMod(long long a) { return powmod(a, MOD - 2, MOD); }

// Expected value of a fair die.
double dieExpectation(int faces) {
    return (faces + 1) / 2.0;
}

// Expected number of rolls of a fair die until we see all \`faces\` values.
// Classic coupon collector: n * H_n where H_n = 1 + 1/2 + ... + 1/n.
double couponCollector(int faces) {
    double H = 0;
    for (int i = 1; i <= faces; i++) H += 1.0 / i;
    return faces * H;
}

// Modular version of coupon collector: answer = n * sum(1/i) mod p.
long long couponCollectorMod(int n) {
    long long ans = 0;
    for (int i = 1; i <= n; i++) ans = (ans + invMod(i)) % MOD;
    return ans * n % MOD;
}

int main() {
    cout << dieExpectation(6) << "\\n";               // 3.5
    cout << couponCollector(6) << "\\n";              // 14.7
    cout << couponCollectorMod(6) << "\\n";
}
\`\`\`
`,
};

export default topic;
