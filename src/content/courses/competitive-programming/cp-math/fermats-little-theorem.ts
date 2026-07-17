import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "fermats-little-theorem",
  title: "Fermat's Little Theorem",
  description: "Fermat's Little Theorem \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Fermat's Little Theorem

## Theory

**Fermat's little theorem (FLT).** If \`p\` is prime and \`a\` is any integer, then

\`a^p ≡ a (mod p)\`.

If additionally \`gcd(a, p) = 1\`, then

\`a^(p - 1) ≡ 1 (mod p)\`, equivalently \`a^(p - 2) ≡ a^(-1) (mod p)\`.

### Consequences in CP

- **Modular inverse** modulo a prime: \`inv(a) = pow(a, p - 2, p)\`.
- **Reducing exponents modulo p - 1** when the base is coprime with \`p\`: \`a^e ≡ a^(e mod (p-1)) (mod p)\`.
- **Fermat primality test** — probabilistic, but composite Carmichael numbers can fool it. In practice we use Miller-Rabin (a stronger variant).

### Why it is true (sketch)

Multiplying the residues \`{1, 2, ..., p - 1}\` by \`a\` just permutes them modulo \`p\`. Taking the product on both sides and canceling \`(p - 1)!\` gives \`a^(p-1) ≡ 1 (mod p)\`.

### Generalization

Euler's theorem: for general \`m\`, \`a^phi(m) ≡ 1 (mod m)\` when \`gcd(a, m) = 1\`. FLT is the special case \`m = p\` prime with \`phi(p) = p - 1\`.

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

// Modular inverse via Fermat — requires MOD prime and a % MOD != 0.
long long modInverse(long long a, long long p = MOD) {
    return powmod(a, p - 2, p);
}

// Reduce a huge exponent using a^(p-1) = 1 (mod p) for coprime a.
long long powBig(long long a, long long e, long long p = MOD) {
    return powmod(a, e % (p - 1), p);
}

int main() {
    cout << modInverse(7) << "\\n";                    // 7^(p-2) mod p
    cout << (7LL * modInverse(7) % MOD) << "\\n";      // 1
    cout << powBig(2, (long long)1e18, MOD) << "\\n";  // fast
}
\`\`\`
`,
};

export default topic;
