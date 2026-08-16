import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mobius-function",
  title: "Mobius Function",
  description: "Mobius Function \u2014 theory and C++17 implementation.",
  readingTime: 6,
  content: `

# Mobius Function

## Theory

The **Mobius function** mu(n) is defined for positive integers n:

- mu(1) = 1
- mu(n) = 0 if n has a squared prime factor (n is not squarefree)
- mu(n) = (-1)^k if n is a product of k distinct primes (squarefree)

### Why it matters

mu is the key ingredient of **Mobius inversion** and encodes inclusion-exclusion over the divisor lattice. Its defining property:

sum over d dividing n of mu(d) = [n == 1]   (1 if n = 1, else 0)

This identity is exactly inclusion-exclusion: it "detects" n = 1 among divisor sums, letting us flip relations between a function and its divisor-sum transform.

### Multiplicativity

mu is multiplicative: mu(ab) = mu(a) mu(b) when gcd(a, b) = 1. This follows directly from the squarefree/prime-count definition and lets a linear sieve compute mu(i) for all i up to N in O(N).

### Computing mu

- **Single value**: factor n; if any prime appears with exponent >= 2, mu(n) = 0; otherwise mu(n) = (-1)^(number of distinct primes).
- **Table up to N**: sieve of Eratosthenes variant. Initialize mu[1] = 1. For each prime p, mu[p] = -1 for primes, and mu[p * m] = -mu[m] if p does not divide m, else mu[p*m] = 0. A linear sieve tracks the smallest prime factor to apply this in O(N).

### Applications

- Counting coprime pairs: number of pairs (a, b) with 1<=a,b<=N and gcd(a,b)=1 equals sum_{d=1}^{N} mu(d) * floor(N/d)^2.
- Computing sum of gcd over a range using divisor sums.
- Mobius inversion (see the dedicated topic) to invert divisor-sum relations, e.g., recovering phi(n) from sum_{d|n} phi(d) = n.
- Squarefree counting: sum_{d^2 <= N} mu(d) * floor(N/d^2) counts squarefree numbers up to N.

### Complexity

O(N) or O(N log log N) to build the table with a sieve; O(sqrt(n)) for a single value via factorization.

### Example

mu(1)=1, mu(2)=-1, mu(3)=-1, mu(4)=0 (4=2^2), mu(6)=1 (2*3, two primes), mu(12)=0 (12=2^2*3).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Mobius function table for 1..N using a linear (Euler) sieve — O(N).
vector<int> mobiusTable(int N) {
    vector<int> mu(N + 1), spf(N + 1, 0); // spf = smallest prime factor
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

// Single value via factorization — O(sqrt(n)).
int mobius(long long n) {
    int result = 1;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            n /= p;
            if (n % p == 0) return 0; // squared factor
            result = -result;
        }
    }
    if (n > 1) result = -result;
    return result;
}

int main() {
    auto mu = mobiusTable(20);
    for (int i = 1; i <= 20; i++) cout << mu[i] << ' ';
    cout << "\\n";
    cout << mobius(12) << "\\n"; // 0
}
\`\`\`

`,
};

export default topic;
