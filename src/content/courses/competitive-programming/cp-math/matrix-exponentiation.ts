import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "matrix-exponentiation",
  title: "Matrix Exponentiation",
  description: "Matrix Exponentiation \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Matrix Exponentiation

## Theory

**Matrix exponentiation** raises a \`k x k\` matrix to a large power \`n\` in **O(k^3 log n)** time using binary exponentiation.

### Why it matters

Linear recurrences of order \`k\` — \`f(n) = c1 * f(n-1) + c2 * f(n-2) + ... + ck * f(n-k)\` — can be expressed as \`v_n = M * v_{n-1}\` for a fixed \`k x k\` matrix \`M\`. Then \`v_n = M^n * v_0\`, computable in \`O(k^3 log n)\`.

### Steps

1. Write the recurrence as a state vector \`v\`.
2. Build the **transition matrix** \`M\` so that \`v_{i+1} = M * v_i\`.
3. Use binary exponentiation on matrices (identity matrix as the base case).
4. Multiply \`M^n\` by the initial vector \`v_0\`.

### Applications

- Fibonacci and general linear recurrences modulo a prime for \`n\` up to \`10^18\`.
- Counting paths of length exactly \`n\` in a graph (adjacency matrix \`A\`, answer is \`A^n\`).
- Counting strings avoiding certain patterns (via a DFA transition matrix).

### Watch out

- Multiplication is **not commutative** — order of factors matters.
- Always reduce modulo after every multiplication to avoid overflow.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

using Matrix = vector<vector<long long>>;

Matrix multiply(const Matrix &A, const Matrix &B) {
    int n = A.size(), m = B[0].size(), k = B.size();
    Matrix C(n, vector<long long>(m, 0));
    for (int i = 0; i < n; i++)
        for (int p = 0; p < k; p++) if (A[i][p])
            for (int j = 0; j < m; j++)
                C[i][j] = (C[i][j] + A[i][p] * B[p][j]) % MOD;
    return C;
}

Matrix identity(int n) {
    Matrix I(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) I[i][i] = 1;
    return I;
}

Matrix matpow(Matrix A, long long e) {
    Matrix R = identity(A.size());
    while (e) { if (e & 1) R = multiply(R, A); A = multiply(A, A); e >>= 1; }
    return R;
}

int main() {
    // Example: count length-n walks between nodes in a small graph.
    Matrix A = {{0, 1, 1}, {1, 0, 1}, {1, 1, 0}};
    Matrix P = matpow(A, 5);
    for (auto &row : P) { for (auto x : row) cout << x << ' '; cout << '\\n'; }
}
\`\`\`
`,
};

export default topic;
