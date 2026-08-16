import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mobius-inversion",
  title: "Mobius Inversion",
  description: "Mobius Inversion \u2014 theory and C++17 implementation.",
  readingTime: 7,
  content: `

# Mobius Inversion

## Theory

Mobius inversion lets you recover an arithmetic function f from its **divisor-sum transform** g, where

g(n) = sum over d dividing n of f(d).

Given g, the inversion formula recovers f:

f(n) = sum over d dividing n of mu(n/d) * g(d)

equivalently f(n) = sum over d dividing n of mu(d) * g(n/d).

### Why it works

Substitute the definition of g into the inversion formula and swap summation order; the identity sum_{d|m} mu(d) = [m == 1] collapses everything except the f(n) term, because pairs (d, e) with d*e|n and product condition telescope to only the n itself surviving. This is the divisor-lattice analogue of the inclusion-exclusion / Fourier-inversion idea.

### Multiplicative version

There's also a "multiplicative" form used for sums over floor(N/i) blocks:

If g(n) = sum_{d|n} f(d), and you only need g at n = N, you can compute it directly. But more commonly in CP, Mobius inversion is applied the other way: given a natural sum defining g via a divisibility condition (like gcd), express f via mu to compute sums efficiently in O(sqrt(N)) or O(N) using **block/divisor enumeration**.

### Classic pattern

To compute S = sum_{i=1}^{N} sum_{j=1}^{N} [gcd(i,j) == 1] * h(i,j), rewrite [gcd(i,j)==1] = sum_{d | gcd(i,j)} mu(d), swap sums:

S = sum_{d=1}^{N} mu(d) * (sum over multiples of d of h).

This turns an O(N^2) sum into O(N log N) or O(N) work, since sum_{d} f(d) with f depending on floor(N/d) can be grouped.

### Key observations

- Works over any locally finite poset via Mobius function of that poset; the divisor poset gives the number-theoretic mu.
- phi(n) satisfies sum_{d|n} phi(d) = n, so by inversion phi(n) = sum_{d|n} mu(d) * (n/d).
- Precompute mu with a sieve, then apply inversion formulas in O(N) or O(N log N).

### Complexity

Precomputing mu: O(N). Applying inversion sums: typically O(N) or O(N log N) depending on structure.

### When to use

Counting coprime pairs, sum of gcd(i,j) over a grid, inverting a "sum over divisors" relation to get a per-value formula, and derived sieves (e.g., squarefree counting, Mobius-weighted convolution).

### Example

Recovering phi via inversion: phi(n) = sum_{d|n} mu(d) * (n/d). For n=12: divisors 1,2,3,4,6,12 with mu = 1,-1,-1,0,1,0. Sum = 1*12 + (-1)*6 + (-1)*4 + 0*3 + 1*2 + 0*1 = 12-6-4+2 = 4 = phi(12). Correct.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> mobiusTable(int N) {
    vector<int> mu(N + 1), spf(N + 1, 0);
    vector<int> primes;
    mu[1] = 1;
    for (int i = 2; i <= N; i++) {
        if (spf[i] == 0) { spf[i] = i; primes.push_back(i); mu[i] = -1; }
        for (int p : primes) {
            if (p > spf[i] || (long long)i * p > N) break;
            spf[i * p] = p;
            mu[i * p] = (p == spf[i]) ? 0 : -mu[i];
        }
    }
    return mu;
}

// Recover phi(n) for all n via Mobius inversion of sum_{d|n} phi(d) = n — O(N log N).
vector<long long> phiViaInversion(int N) {
    auto mu = mobiusTable(N);
    vector<long long> phi(N + 1, 0);
    for (int d = 1; d <= N; d++)
        for (int n = d; n <= N; n += d)
            phi[n] += (long long)mu[d] * (n / d);
    return phi;
}

// Count pairs (i, j), 1<=i,j<=N, with gcd(i,j) = 1 — O(N log N) using Mobius.
long long countCoprimePairs(int N) {
    auto mu = mobiusTable(N);
    long long total = 0;
    for (int d = 1; d <= N; d++) {
        long long cnt = N / d;
        total += (long long)mu[d] * cnt * cnt;
    }
    return total;
}

int main() {
    auto phi = phiViaInversion(20);
    for (int i = 1; i <= 20; i++) cout << phi[i] << ' ';
    cout << "\\n";
    cout << countCoprimePairs(10) << "\\n";
}
\`\`\`

`,
};

export default topic;
