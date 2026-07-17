import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "gcd",
  title: "GCD",
  description: "GCD \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# GCD

## Theory

The **greatest common divisor** \`gcd(a, b)\` of two non-negative integers is the largest integer that divides both. By convention, \`gcd(a, 0) = a\`.

### Properties

- \`gcd(a, b) = gcd(b, a)\`
- \`gcd(a, b) = gcd(a - b, b)\` for \`a >= b\` (subtraction form)
- \`gcd(a, b) = gcd(b, a mod b)\` (Euclidean form — much faster)
- \`gcd(a, b) * lcm(a, b) = a * b\`
- \`gcd\` is associative: \`gcd(a, b, c) = gcd(gcd(a, b), c)\`

### Euclidean algorithm

Repeatedly replace \`(a, b)\` with \`(b, a mod b)\` until \`b == 0\`. Complexity: **O(log(min(a, b)))**. This is one of the oldest algorithms still in daily use.

### Binary GCD (Stein's algorithm)

Uses only shifts, subtractions, and parity checks. Sometimes faster on hardware without cheap division. Complexity still \`O(log)\`.

### In C++17

\`std::gcd(a, b)\` is available in \`<numeric>\` and works with any integer type.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Recursive Euclidean algorithm.
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Iterative form — avoids recursion stack.
long long gcdIter(long long a, long long b) {
    while (b) { a %= b; swap(a, b); }
    return a;
}

// Binary GCD (Stein's algorithm).
long long binaryGcd(long long a, long long b) {
    if (!a || !b) return a | b;
    int shift = __builtin_ctzll(a | b);
    a >>= __builtin_ctzll(a);
    do {
        b >>= __builtin_ctzll(b);
        if (a > b) swap(a, b);
        b -= a;
    } while (b);
    return a << shift;
}

int main() {
    cout << gcd(48, 18) << "\\n";                 // 6
    cout << std::gcd(48, 18) << "\\n";            // 6 (C++17 <numeric>)
    cout << binaryGcd(1000000000LL, 750) << "\\n";
}
\`\`\`
`,
};

export default topic;
