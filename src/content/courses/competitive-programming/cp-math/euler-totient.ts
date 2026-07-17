import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "euler-totient",
  title: "Euler Totient Function",
  description: "Euler Totient Function \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Euler Totient Function

## Theory

**Euler's totient function** \`phi(n)\` counts the positive integers \`k <= n\` with \`gcd(k, n) = 1\`.

### Formula from prime factorization

If \`n = p1^a1 * ... * pk^ak\`, then

\`phi(n) = n * product over i of (1 - 1/p_i)\`.

Examples: \`phi(1) = 1\`, \`phi(p) = p - 1\` for prime \`p\`, \`phi(p^k) = p^k - p^(k-1)\`, \`phi(m*n) = phi(m) * phi(n)\` when \`gcd(m, n) = 1\` (multiplicative).

### Euler's theorem

For any \`a\` coprime with \`n\`: \`a^phi(n) ≡ 1 (mod n)\`. This gives modular inverses for composite moduli: \`a^(-1) ≡ a^(phi(n) - 1) (mod n)\`.

### Computing phi

- **Single value**: factor \`n\` (O(sqrt(n))), then apply the product formula.
- **Table up to N**: modify the sieve. Initialize \`phi[i] = i\`; for each prime \`p\`, for each multiple \`m\` of \`p\`, do \`phi[m] -= phi[m] / p\`. Runs in **O(N log log N)**.

### CP uses

- Modular exponents modulo composite \`n\`
- Counting coprime pairs
- Mobius / Dirichlet identities

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Single-value Euler's totient — O(sqrt(n)).
long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// Totient table up to N — O(N log log N).
vector<int> totientTable(int N) {
    vector<int> phi(N + 1);
    iota(phi.begin(), phi.end(), 0);        // phi[i] = i initially
    for (int i = 2; i <= N; i++) {
        if (phi[i] == i) {                  // i is prime
            for (int j = i; j <= N; j += i) phi[j] -= phi[j] / i;
        }
    }
    return phi;
}

int main() {
    cout << phi(36) << "\\n";                            // 12
    auto t = totientTable(20);
    for (int i = 1; i <= 20; i++) cout << t[i] << ' ';
}
\`\`\`
`,
};

export default topic;
