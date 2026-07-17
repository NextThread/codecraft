import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "modular-inverse",
  title: "Modular Inverse",
  description: "Modular Inverse \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Modular Inverse

## Theory

The **modular inverse** of \`a\` modulo \`m\` is an integer \`x\` such that

\`a * x ≡ 1 (mod m)\`.

It exists **iff** \`gcd(a, m) = 1\`. It lets us "divide by \`a\`" in modular arithmetic.

### Two ways to compute it

1. **Fermat's little theorem** — when \`m\` is prime and \`a\` is not a multiple of \`m\`:
   \`a^(m-2) ≡ a^(-1) (mod m)\`. Compute with binary exponentiation in \`O(log m)\`.

2. **Extended Euclidean algorithm** — works whenever \`gcd(a, m) = 1\`, even for composite \`m\`. Find \`x, y\` with \`a*x + m*y = 1\`; then \`x mod m\` is the inverse.

### Precomputing many inverses

To get inverses of \`1..n\` mod prime \`p\` in **O(n)** total, use the recurrence:

\`inv[1] = 1\`
\`inv[i] = (p - (p / i) * inv[p % i] % p) % p\`

### Uses

- Dividing in \`nCr mod p\`
- Rational-number DP over prime modulus
- CRT reconstruction

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// Fermat inverse — MOD must be prime, a not a multiple of MOD.
long long invFermat(long long a, long long m = MOD) {
    return powmod(a, m - 2, m);
}

// Extended Euclidean — general case.
long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extGcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}
long long invExt(long long a, long long m) {
    long long x, y;
    long long g = extGcd(a, m, x, y);
    if (g != 1) return -1; // no inverse
    return (x % m + m) % m;
}

// Linear-time table of inverses mod prime p.
vector<long long> inversesUpTo(int n, long long p = MOD) {
    vector<long long> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) inv[i] = (p - (p / i) * inv[p % i] % p) % p;
    return inv;
}

int main() {
    cout << invFermat(2) << "\\n";        // 500000004
    cout << invExt(3, 11) << "\\n";       // 4 (since 3*4 = 12 = 1 mod 11)
}
\`\`\`
`,
};

export default topic;
