import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prime-factorization",
  title: "Prime Factorization",
  description: "Prime Factorization \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Prime Factorization

## Theory

Every integer \`n > 1\` can be written **uniquely** as a product of primes (Fundamental Theorem of Arithmetic):

\`n = p1^a1 * p2^a2 * ... * pk^ak\`

### Trial-division factorization — O(sqrt(n))

Iterate \`p\` from 2 upward. While \`p\` divides \`n\`, keep dividing and record the exponent. Stop when \`p * p > n\`. If a remainder \`> 1\` is left, it is itself a prime.

### Faster factorization with a smallest-prime-factor sieve

If we precompute \`spf[x]\` = smallest prime factor of \`x\` for all \`x <= N\` (see **Linear Sieve**), we can factorize any \`x <= N\` in **O(log x)** by repeatedly dividing by \`spf[x]\`.

### Pollard's rho

For very large \`n\` (up to \`10^18\`) that we cannot sieve, **Pollard's rho** combined with Miller-Rabin factors in roughly \`O(n^{1/4})\`.

### Uses

- Counting/summing divisors
- Computing Euler's totient
- GCD/LCM relationships
- Number theory constructions

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Trial-division prime factorization — O(sqrt(n)).
// Returns pairs (prime, exponent).
vector<pair<long long, int>> factorize(long long n) {
    vector<pair<long long, int>> f;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            int e = 0;
            while (n % p == 0) { n /= p; e++; }
            f.push_back({p, e});
        }
    }
    if (n > 1) f.push_back({n, 1});
    return f;
}

// Factor using precomputed smallest-prime-factor table — O(log n) per query.
vector<pair<int, int>> factorizeWithSPF(int n, const vector<int> &spf) {
    vector<pair<int, int>> f;
    while (n > 1) {
        int p = spf[n], e = 0;
        while (n % p == 0) { n /= p; e++; }
        f.push_back({p, e});
    }
    return f;
}

int main() {
    for (auto [p, e] : factorize(360)) cout << p << "^" << e << ' ';
    // 2^3 3^2 5^1
}
\`\`\`
`,
};

export default topic;
