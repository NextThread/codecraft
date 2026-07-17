import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "fibonacci-matrix-exponentiation",
  title: "Fibonacci using Matrix Exponentiation",
  description: "Fibonacci using Matrix Exponentiation \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Fibonacci using Matrix Exponentiation

## Theory

Fibonacci is the classic use case for matrix exponentiation. The identity

\`\`\`
[ F(n+1) ]   [ 1 1 ]^n   [ F(1) ]
[  F(n)  ] = [ 1 0 ]   * [ F(0) ]
\`\`\`

lets us compute \`F(n) mod p\` in **O(log n)** matrix multiplications, i.e. \`O(log n)\` because the matrix is 2 x 2.

### Correctness

\`[[1,1],[1,0]] * [F(n+1), F(n)]^T = [F(n+1) + F(n), F(n+1)]^T = [F(n+2), F(n+1)]^T\`. Induction.

### Fast doubling (an equivalent, often-faster approach)

Instead of raw matrix multiplication, use the identities

\`F(2k)   = F(k) * (2 F(k+1) - F(k))\`
\`F(2k+1) = F(k)^2 + F(k+1)^2\`

Still \`O(log n)\` and avoids the constant overhead of matrix operations.

### Handling \`n\` up to \`10^18\`

Everything is modulo a prime \`p\` (typically \`10^9 + 7\`). Watch for overflow — use \`__int128\` or make sure operands fit within \`long long\` after each \`% p\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Matrix exponentiation approach.
using M = array<array<long long, 2>, 2>;
M mul(const M &A, const M &B) {
    M C{};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}
long long fibMatrix(long long n) {
    M base = {{{1, 1}, {1, 0}}};
    M result = {{{1, 0}, {0, 1}}};    // identity
    while (n) { if (n & 1) result = mul(result, base); base = mul(base, base); n >>= 1; }
    return result[0][1];              // F(n)
}

// Fast doubling — pair (F(n), F(n+1)).
pair<long long, long long> fibFast(long long n) {
    if (n == 0) return {0, 1};
    auto [a, b] = fibFast(n >> 1);          // F(k), F(k+1)
    long long c = a * ((2 * b - a + MOD) % MOD) % MOD;   // F(2k)
    long long d = (a * a + b * b) % MOD;                 // F(2k+1)
    if (n & 1) return {d, (c + d) % MOD};
    else       return {c, d};
}

int main() {
    cout << fibMatrix(1000000000000LL) << "\\n";
    cout << fibFast(1000000000000LL).first << "\\n";
}
\`\`\`
`,
};

export default topic;
