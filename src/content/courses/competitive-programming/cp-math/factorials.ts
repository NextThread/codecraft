import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "factorials",
  title: "Factorials",
  description: "Factorials \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Factorials

## Theory

The **factorial** \`n!\` is the product \`1 * 2 * ... * n\`, with \`0! = 1\` by convention.

### Growth

\`n!\` grows faster than any exponential. Rough sizes: \`10! ≈ 3.6 * 10^6\`, \`20! ≈ 2.4 * 10^18\` (still fits in \`unsigned long long\`), \`25!\` already needs a big integer.

### Stirling's approximation

\`n! ~ sqrt(2 * pi * n) * (n / e)^n\`. Useful for asymptotic analysis.

### Modular factorials

For a prime modulus \`p\`, precompute:

- \`fact[i] = i! mod p\` for \`i = 0..N\`
- \`invFact[N] = pow(fact[N], p - 2, p)\`, then \`invFact[i - 1] = invFact[i] * i mod p\`

This lets you answer \`n! mod p\`, \`1/n! mod p\`, and hence \`nCr mod p\` in O(1) after \`O(N)\` preprocessing.

### Wilson's theorem

\`(p - 1)! ≡ -1 (mod p)\` iff \`p\` is prime — a rarely-used but neat characterization.

### Legendre's formula

The exponent of a prime \`p\` in \`n!\` is \`sum_{i>=1} floor(n / p^i)\`. Answers questions like "how many trailing zeros does \`n!\` have in base 10?" (count of 5's).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Precomputed factorial and inverse-factorial tables mod prime MOD.
struct FactTable {
    vector<long long> f, invf;
    FactTable(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
        auto pw = [](long long a, long long e) {
            long long r = 1;
            while (e) { if (e & 1) r = r * a % MOD; a = a * a % MOD; e >>= 1; }
            return r;
        };
        invf[n] = pw(f[n], MOD - 2);
        for (int i = n; i > 0; i--) invf[i - 1] = invf[i] * i % MOD;
    }
};

// Legendre's formula: exponent of prime p in n!.
long long expInFactorial(long long n, long long p) {
    long long e = 0;
    for (long long q = p; q <= n; q *= p) {
        e += n / q;
        if (q > n / p) break;   // avoid overflow
    }
    return e;
}

int main() {
    FactTable ft(1'000'000);
    cout << ft.f[10] << "\\n";                   // 3628800
    cout << expInFactorial(25, 5) << "\\n";      // 6 (25! has 6 trailing zeros)
}
\`\`\`
`,
};

export default topic;
