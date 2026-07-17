import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "extended-euclidean",
  title: "Extended Euclidean Algorithm",
  description: "Extended Euclidean Algorithm \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Extended Euclidean Algorithm

## Theory

The **Extended Euclidean Algorithm (EEA)** computes not only \`g = gcd(a, b)\` but also integers \`x, y\` such that

\`a * x + b * y = g\`  (Bezout's identity).

### Derivation

Base case: \`gcd(a, 0) = a\`, with \`x = 1\`, \`y = 0\`.
Recursive step: \`gcd(a, b) = gcd(b, a mod b)\`. If \`b * x1 + (a mod b) * y1 = g\`, then, since \`a mod b = a - (a / b) * b\`,

\`b * x1 + (a - (a/b) * b) * y1 = g\`
\`a * y1 + b * (x1 - (a/b) * y1) = g\`

so \`x = y1\`, \`y = x1 - (a/b) * y1\`.

### Solving \`a*x ≡ c (mod m)\`

A solution exists iff \`gcd(a, m) | c\`. Use EEA on \`(a, m)\` to get \`a*x0 + m*y0 = g\`; then \`x = x0 * (c / g)\` mod \`m/g\`.

### Modular inverse for composite modulus

\`inv(a) mod m\` exists iff \`gcd(a, m) = 1\`; then \`x\` from EEA is the inverse (normalize to \`[0, m)\`).

### Chinese Remainder Theorem

EEA is the workhorse that combines two congruences into one.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Extended Euclidean — returns gcd(a, b) and sets x, y with a*x + b*y = gcd.
long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extGcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// Modular inverse for any modulus m (requires gcd(a, m) == 1).
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extGcd((a % m + m) % m, m, x, y);
    if (g != 1) return -1;             // no inverse
    return (x % m + m) % m;
}

// Solve a*x = c (mod m). Returns true on success and one solution in x.
bool solveLinear(long long a, long long c, long long m, long long &x) {
    long long x0, y0;
    long long g = extGcd(a, m, x0, y0);
    if (c % g != 0) return false;
    long long M = m / g;
    x = ((x0 * (c / g)) % M + M) % M;  // smallest non-negative solution
    return true;
}

int main() {
    cout << modInverse(3, 11) << "\\n";       // 4
    long long x;
    if (solveLinear(14, 30, 100, x)) cout << x << "\\n"; // e.g. 45
}
\`\`\`
`,
};

export default topic;
