import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "linear-sieve",
  title: "Linear Sieve (Smallest Prime Factor)",
  description: "Linear Sieve (Smallest Prime Factor) \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Linear Sieve (Smallest Prime Factor)

## Theory

The **linear sieve** computes both the list of primes and the **smallest prime factor** \`spf[x]\` for every \`x <= N\` in **O(N)** time — each composite is crossed out exactly once.

### Idea

Iterate \`i\` from 2 to \`N\`. If \`spf[i]\` is 0, \`i\` is prime; add it to the prime list and set \`spf[i] = i\`. Then, for each prime \`p\` in the list, mark \`spf[i * p] = p\`, but **break** as soon as \`p\` divides \`i\`. This break ensures every composite \`c\` is marked exactly once — by its smallest prime factor.

### Why exactly O(N)

Each composite \`c = spf[c] * (c / spf[c])\` is written down at the unique iteration \`i = c / spf[c]\`, \`p = spf[c]\`.

### Fast factorization

Given \`spf\`, factor any \`x <= N\` in **O(log x)**:

\`\`\`
while (x > 1) { record spf[x]; x /= spf[x]; }
\`\`\`

### CP uses

- Massive precomputation of prime factors
- Multiplicative-function sieves (totient, mobius, sigma) — you can compute \`phi[i]\` alongside the sieve in O(N).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Linear sieve. Returns (primes, spf) where spf[x] = smallest prime factor of x.
pair<vector<int>, vector<int>> linearSieve(int N) {
    vector<int> spf(N + 1, 0), primes;
    for (int i = 2; i <= N; i++) {
        if (spf[i] == 0) {            // i is prime
            spf[i] = i;
            primes.push_back(i);
        }
        for (int p : primes) {
            if ((long long)i * p > N) break;
            spf[i * p] = p;
            if (i % p == 0) break;    // ensures O(N) total work
        }
    }
    return {primes, spf};
}

// Factor x using spf in O(log x).
vector<pair<int,int>> factor(int x, const vector<int> &spf) {
    vector<pair<int,int>> f;
    while (x > 1) {
        int p = spf[x], e = 0;
        while (x % p == 0) { x /= p; e++; }
        f.push_back({p, e});
    }
    return f;
}

int main() {
    auto [primes, spf] = linearSieve(50);
    for (auto [p, e] : factor(84, spf)) cout << p << "^" << e << ' ';
    // 2^2 3^1 7^1
}
\`\`\`
`,
};

export default topic;
