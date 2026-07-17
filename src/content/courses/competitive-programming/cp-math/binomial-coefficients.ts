import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binomial-coefficients",
  title: "Binomial Coefficients (nCr)",
  description: "Binomial Coefficients (nCr) \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Binomial Coefficients (nCr)

## Theory

**Binomial coefficients** \`C(n, r)\` (also \`nCr\`) count the number of \`r\`-subsets of an \`n\`-set. They are the coefficients in the expansion

\`(x + y)^n = sum_{k=0..n} C(n, k) * x^(n-k) * y^k\`.

### Fundamental identities

- \`C(n, r) = C(n, n - r)\`
- Pascal: \`C(n, r) = C(n - 1, r - 1) + C(n - 1, r)\`
- Hockey stick: \`sum_{i=r..n} C(i, r) = C(n + 1, r + 1)\`
- \`sum_{k} C(n, k) = 2^n\`
- \`sum_{k} (-1)^k C(n, k) = 0\` for \`n >= 1\`

### Computing \`nCr mod p\` (p prime, n <= 10^6)

Precompute factorials + inverse factorials, then

\`C(n, r) = fact[n] * invFact[r] * invFact[n - r] mod p\`

Each query is O(1).

### Lucas' theorem (huge \`n\`, small prime \`p\`)

Write \`n\` and \`r\` in base \`p\`. Then

\`C(n, r) mod p = product over digits i of C(n_i, r_i) mod p\`

using Pascal for the small digit-level coefficients.

### Overflow-free tricks

Compute \`C(n, r)\` iteratively: \`C(n, r) = C(n, r - 1) * (n - r + 1) / r\`.

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

struct Binom {
    vector<long long> f, invf;
    Binom(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i-1] * i % MOD;
        invf[n] = powmod(f[n], MOD - 2, MOD);
        for (int i = n; i > 0; i--) invf[i-1] = invf[i] * i % MOD;
    }
    long long C(int n, int r) const {
        if (r < 0 || r > n) return 0;
        return f[n] * invf[r] % MOD * invf[n - r] % MOD;
    }
};

// Lucas' theorem for prime p (small).
long long lucas(long long n, long long r, long long p) {
    if (r == 0) return 1;
    long long ni = n % p, ri = r % p;
    if (ri > ni) return 0;
    // small nCr mod p via factorials on-the-fly
    long long num = 1, den = 1;
    for (long long i = 0; i < ri; i++) {
        num = num * ((ni - i) % p) % p;
        den = den * ((i + 1) % p) % p;
    }
    long long small = num * powmod(den, p - 2, p) % p;
    return small * lucas(n / p, r / p, p) % p;
}

int main() {
    Binom b(1'000'000);
    cout << b.C(20, 10) << "\\n";                    // 184756
    cout << lucas(1'000'000'000LL, 12345LL, 13) << "\\n";
}
\`\`\`
`,
};

export default topic;
