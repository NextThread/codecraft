import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "catalan-numbers",
  title: "Catalan Numbers",
  description: "Catalan Numbers \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Catalan Numbers

## Theory

The **Catalan numbers** \`C_n\` are one of the most reused sequences in combinatorics:

\`1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, ...\`

### Formulas

- Closed form: \`C_n = C(2n, n) / (n + 1)\`
- Equivalent: \`C_n = C(2n, n) - C(2n, n + 1)\`
- Recurrence: \`C_{n+1} = sum_{i=0..n} C_i * C_{n-i}\`, with \`C_0 = 1\`
- Ratio: \`C_{n+1} = C_n * 2*(2n + 1) / (n + 2)\`

### Things Catalan numbers count

- Number of **balanced parentheses** with \`n\` pairs
- Number of **binary search trees** with \`n\` distinct keys
- Number of full binary trees with \`n + 1\` leaves
- **Monotonic lattice paths** from \`(0,0)\` to \`(n,n)\` that never rise above the diagonal
- Number of ways to **triangulate** a convex \`(n + 2)\`-gon
- Number of **Dyck words** of length \`2n\`

### Modular computation

Use \`C_n = C(2n, n) * inv(n + 1) mod p\`, with the standard factorial + inverse-factorial precomputation.

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

// DP via convolution recurrence — O(n^2).
vector<long long> catalanDP(int n) {
    vector<long long> C(n + 1, 0);
    C[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            C[i] = (C[i] + C[j] * C[i - 1 - j]) % MOD;
    return C;
}

// Closed form using factorials — O(n) preprocessing, O(1) per query.
struct CatalanFast {
    vector<long long> f, invf;
    CatalanFast(int n) : f(2 * n + 1), invf(2 * n + 1) {
        f[0] = 1;
        for (int i = 1; i <= 2 * n; i++) f[i] = f[i-1] * i % MOD;
        invf[2*n] = powmod(f[2*n], MOD - 2, MOD);
        for (int i = 2*n; i > 0; i--) invf[i-1] = invf[i] * i % MOD;
    }
    long long C(int n) const {
        long long binom = f[2*n] * invf[n] % MOD * invf[n] % MOD;
        return binom * powmod(n + 1, MOD - 2, MOD) % MOD;
    }
};

int main() {
    for (long long x : catalanDP(9)) cout << x << ' ';
    // 1 1 2 5 14 42 132 429 1430 4862
    cout << "\\n" << CatalanFast(100).C(10) << "\\n";  // 16796
}
\`\`\`
`,
};

export default topic;
