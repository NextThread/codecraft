import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "factors-divisors",
  title: "Factors and Divisors",
  description: "Factors and Divisors \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Factors and Divisors

## Theory

A **divisor** (or **factor**) of an integer \`n\` is an integer \`d\` such that \`n % d == 0\`. The set of positive divisors of \`n\` is denoted \`D(n)\`.

### Finding all divisors in O(sqrt(n))

Divisors come in pairs: if \`d\` divides \`n\`, then so does \`n / d\`. Iterate \`i\` from \`1\` to \`sqrt(n)\`; whenever \`i | n\`, record both \`i\` and \`n / i\` (avoiding duplicates when \`i * i == n\`).

### Counting divisors

If \`n = p1^a1 * p2^a2 * ... * pk^ak\`, then the number of divisors is:

\`d(n) = (a1 + 1)(a2 + 1) ... (ak + 1)\`

### Sum of divisors

\`sigma(n) = product over i of (p_i^(a_i + 1) - 1) / (p_i - 1)\`

### Highly composite numbers

Numbers with many divisors grow slowly: even up to \`10^18\`, no number has more than ~ **103,680** divisors. In CP this bound is often used to argue that "iterating over divisors" is safe.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// All positive divisors of n, sorted — O(sqrt(n)).
vector<long long> divisors(long long n) {
    vector<long long> small, large;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            small.push_back(i);
            if (i != n / i) large.push_back(n / i);
        }
    }
    reverse(large.begin(), large.end());
    small.insert(small.end(), large.begin(), large.end());
    return small;
}

// Number of divisors from prime factorization.
long long countDivisors(long long n) {
    long long cnt = 1;
    for (long long p = 2; p * p <= n; p++) {
        int e = 0;
        while (n % p == 0) { n /= p; e++; }
        cnt *= (e + 1);
    }
    if (n > 1) cnt *= 2;   // remaining prime factor
    return cnt;
}

int main() {
    for (long long d : divisors(36)) cout << d << ' ';   // 1 2 3 4 6 9 12 18 36
    cout << "\\n" << countDivisors(36) << "\\n";           // 9
}
\`\`\`
`,
};

export default topic;
