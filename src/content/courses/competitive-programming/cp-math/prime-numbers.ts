import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prime-numbers",
  title: "Prime Numbers",
  description: "Prime Numbers \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Prime Numbers

## Theory

A **prime number** is an integer \`p > 1\` whose only positive divisors are \`1\` and \`p\`. Numbers greater than 1 that are not prime are called **composite**. \`1\` is neither prime nor composite by convention.

### Key facts

- \`2\` is the only even prime.
- Every integer \`n > 1\` has a **unique** prime factorization (Fundamental Theorem of Arithmetic).
- There are infinitely many primes (Euclid's proof).
- Primes thin out but never stop: the number of primes ≤ N is roughly \`N / ln N\` (Prime Number Theorem).

### Primality test — trial division

If \`n\` has a divisor \`d\` with \`1 < d < n\`, then it also has a divisor ≤ \`sqrt(n)\`. So we only test divisors up to \`sqrt(n)\`. Complexity **O(sqrt(n))**.

Optimization: after checking 2 and 3, test only numbers of the form \`6k ± 1\`, because every prime > 3 has that form.

### Faster tests

- **Miller-Rabin** — probabilistic, extremely fast; with well-chosen bases it is deterministic for \`n < 3.3 * 10^24\`.
- **Sieve of Eratosthenes** — precompute primality of every number up to N in \`O(N log log N)\`.

### Where primes appear in CP

Modular arithmetic (\`10^9 + 7\` is prime), hashing, cryptography, number-theoretic transforms, and any problem involving factorization.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Trial-division primality test — O(sqrt(n)).
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n < 4) return true;             // 2, 3
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// Deterministic Miller-Rabin for 64-bit integers.
using u128 = __int128;
long long mulmod(long long a, long long b, long long m) {
    return (long long)((u128)a * b % m);
}
long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = mulmod(r, a, m); a = mulmod(a, a, m); e >>= 1; }
    return r;
}
bool millerRabin(long long n) {
    if (n < 2) return false;
    for (long long p : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37})
        if (n % p == 0) return n == p;
    long long d = n - 1; int r = 0;
    while ((d & 1) == 0) { d >>= 1; r++; }
    for (long long a : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}) {
        long long x = powmod(a, d, n);
        if (x == 1 || x == n - 1) continue;
        bool composite = true;
        for (int i = 0; i < r - 1; i++) {
            x = mulmod(x, x, n);
            if (x == n - 1) { composite = false; break; }
        }
        if (composite) return false;
    }
    return true;
}

int main() {
    cout << boolalpha << isPrime(97) << " " << millerRabin(1000000007LL) << "\\n";
}
\`\`\`
`,
};

export default topic;
