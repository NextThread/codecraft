import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "combinatorics",
  title: "Combinatorics",
  description: "Combinatorics \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Combinatorics

## Theory

**Combinatorics** studies counting, arrangement, and selection of objects. Almost every counting-heavy CP problem reduces to a small vocabulary of formulas.

### Fundamental principles

- **Rule of sum** — disjoint choices add: \`|A| + |B|\`.
- **Rule of product** — independent choices multiply: \`|A| * |B|\`.
- **Bijection principle** — count set A by mapping it 1-1 to a set B that is easier to count.

### Core counts

- **Permutations of \`n\`**: \`n!\`
- **k-permutations of \`n\`** (order matters, no repetition): \`P(n, k) = n! / (n-k)!\`
- **Combinations** (order does not matter): \`C(n, k) = n! / (k! (n-k)!)\`
- **With repetition** — combinations with repetition: \`C(n + k - 1, k)\`
- **Stars and bars** — number of non-negative integer solutions of \`x1 + ... + xk = n\` is \`C(n + k - 1, k - 1)\`.
- **Multinomial coefficient**: \`n! / (a1! a2! ... am!)\` with \`a1 + ... + am = n\`.

### Sequences everyone should recognize

- **Factorials**: 1, 1, 2, 6, 24, 120, ...
- **Binomial coefficients** — Pascal's triangle
- **Catalan numbers** — \`C_n = C(2n, n) / (n + 1)\`
- **Bell / Stirling numbers** — set partitions

### Modular counting

Precompute \`fact[0..N]\` and \`invFact[0..N]\` modulo a prime once; then any \`nCk\` costs O(1).

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

struct Combo {
    vector<long long> f, invf;
    Combo(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
        invf[n] = powmod(f[n], MOD - 2, MOD);
        for (int i = n; i > 0; i--) invf[i - 1] = invf[i] * i % MOD;
    }
    long long C(int n, int k) const {
        if (k < 0 || k > n) return 0;
        return f[n] * invf[k] % MOD * invf[n - k] % MOD;
    }
    long long P(int n, int k) const {
        if (k < 0 || k > n) return 0;
        return f[n] * invf[n - k] % MOD;
    }
    // Stars and bars: non-negative solutions of x1+...+xk = n.
    long long stars(int n, int k) const { return C(n + k - 1, k - 1); }
};

int main() {
    Combo c(1'000'000);
    cout << c.C(10, 3) << "\\n";     // 120
    cout << c.P(10, 3) << "\\n";     // 720
    cout << c.stars(5, 3) << "\\n";  // C(7,2) = 21
}
\`\`\`
`,
};

export default topic;
