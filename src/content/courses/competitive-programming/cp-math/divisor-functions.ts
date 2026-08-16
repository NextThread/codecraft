import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "divisor-functions",
  title: "Divisor Functions",
  description: "Divisor Functions \u2014 theory and C++17 implementation.",
  readingTime: 6,
  content: `

# Divisor Functions

## Theory

For a positive integer n with prime factorization n = p1^a1 * p2^a2 * ... * pk^ak, two classic arithmetic functions are:

- **d(n)** (also written tau(n)) — the number of positive divisors of n.
- **sigma(n)** — the sum of positive divisors of n.

### Formulas

Because both d and sigma are **multiplicative** (d(mn) = d(m)d(n) and sigma(mn) = sigma(m)sigma(n) when gcd(m, n) = 1), they can be computed from the prime factorization:

- d(n) = product over i of (a_i + 1)
- sigma(n) = product over i of (p_i^(a_i+1) - 1) / (p_i - 1)

More generally, define sigma_x(n) = sum of d^x over divisors d of n. sigma_0 = d(n), sigma_1 = sigma(n).

### Why multiplicativity works

If gcd(m, n) = 1, every divisor of mn factors uniquely as (divisor of m) * (divisor of n) by CRT-style reasoning on prime powers, so the divisor sum/count splits as a product.

### Key observations

- d(n) is odd iff n is a perfect square (divisors pair up d with n/d, except sqrt(n)).
- Sum of d(i) for i = 1..N equals sum over k=1..N of floor(N/k) — useful for O(N log N) or O(sqrt(N)) per-query computations (hyperbola method gives O(sqrt(N)) total for a single N).
- A **perfect number** satisfies sigma(n) = 2n.

### Computing over a range

To get d(i) or sigma(i) for all i in [1, N], use a **sieve-like** approach: for each divisor p from 1 to N, add contributions to all multiples of p. This runs in O(N log N).

A faster O(N log log N) approach uses the linear sieve, tracking the smallest prime factor and the exponent of that prime in each number, updating multiplicative functions incrementally.

### Complexity

- Single n: O(sqrt(n)) via factorization.
- Table up to N: O(N log N) simple sieve, or O(N) with a linear sieve for multiplicative functions.

### When to use

Divisor-function tricks appear in problems counting divisor sums, computing sum_{i<=N} d(i) quickly, or working with perfect/abundant/deficient numbers.

### Example

n = 12 = 2^2 * 3. d(12) = (2+1)(1+1) = 6 (divisors 1,2,3,4,6,12). sigma(12) = (2^3-1)/(2-1) * (3^2-1)/(3-1) = 7 * 4 = 28.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Number of divisors and sum of divisors for a single n via factorization — O(sqrt(n)).
pair<long long,long long> divisorFunctions(long long n) {
    long long d = 1, sigma = 1;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            long long pk = 1; // p^(a+1) - 1 accumulation as sum 1+p+...+p^a
            long long sum = 0, cur = 1;
            int a = 0;
            while (n % p == 0) { n /= p; a++; sum += cur; cur *= p; }
            sum += cur; // add p^a term (final power)
            d *= (a + 1);
            sigma *= sum;
        }
    }
    if (n > 1) { d *= 2; sigma *= (1 + n); } // remaining prime factor
    return {d, sigma};
}

// Sieve for d(i) for all i in [1, N] — O(N log N).
vector<int> divisorCountTable(int N) {
    vector<int> d(N + 1, 0);
    for (int p = 1; p <= N; p++)
        for (int m = p; m <= N; m += p)
            d[m]++;
    return d;
}

// Sieve for sigma(i) for all i in [1, N] — O(N log N).
vector<long long> divisorSumTable(int N) {
    vector<long long> s(N + 1, 0);
    for (int p = 1; p <= N; p++)
        for (int m = p; m <= N; m += p)
            s[m] += p;
    return s;
}

int main() {
    auto [d, sigma] = divisorFunctions(12);
    cout << d << " " << sigma << "\\n"; // 6 28

    auto table = divisorCountTable(20);
    for (int i = 1; i <= 20; i++) cout << table[i] << ' ';
}
\`\`\`

`,
};

export default topic;
