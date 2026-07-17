import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "combinations",
  title: "Combinations",
  description: "Combinations \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Combinations

## Theory

A **combination** is a **selection** of items without regard to order.

### Formula

\`C(n, k) = n! / (k! (n - k)!)\` (also written \`nCk\` or \`binomial(n, k)\`).

### Symmetry & identities

- \`C(n, k) = C(n, n - k)\`
- \`C(n, 0) = C(n, n) = 1\`
- Pascal's identity: \`C(n, k) = C(n - 1, k - 1) + C(n - 1, k)\`
- Vandermonde's identity: \`sum_{i} C(m, i) * C(n, k - i) = C(m + n, k)\`
- Sum along a row: \`sum_{k=0..n} C(n, k) = 2^n\`

### Combinations with repetition

Choosing \`k\` items from \`n\` types, repetition allowed, order irrelevant: \`C(n + k - 1, k)\`.

### Computation strategies

- **Small \`n\`, \`k\`**: Pascal DP \`O(n^2)\` fills a triangle.
- **Modular, up to 10^6**: precompute factorials + inverse factorials for O(1) queries.
- **Very large \`n\`, small \`k\`**: \`C(n, k) = n * (n-1) * ... * (n-k+1) / k!\` — do it with big ints or with a modular inverse when needed.
- **Very large \`n, k\`, prime modulus**: **Lucas' theorem**.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Pascal DP (small n).
vector<vector<long long>> pascal(int n) {
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
    return C;
}

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// Big-n C(n, k) modulo prime — O(k).
long long binomLargeN(long long n, long long k) {
    if (k < 0 || k > n) return 0;
    if (k > n - k) k = n - k;
    long long num = 1, den = 1;
    for (long long i = 0; i < k; i++) {
        num = num * ((n - i) % MOD) % MOD;
        den = den * ((i + 1) % MOD) % MOD;
    }
    return num * powmod(den, MOD - 2, MOD) % MOD;
}

int main() {
    auto C = pascal(10);
    cout << C[10][3] << "\\n";                          // 120
    cout << binomLargeN(1'000'000'000LL, 5) << "\\n";
}
\`\`\`
`,
};

export default topic;
