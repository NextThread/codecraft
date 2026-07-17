import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-exponentiation",
  title: "Binary Exponentiation",
  description: "Binary Exponentiation \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Binary Exponentiation

## Theory

**Binary exponentiation** (a.k.a. fast exponentiation, exponentiation by squaring) computes \`a^n\` in **O(log n)** multiplications, instead of the naive O(n).

### Idea

Write \`n\` in binary. Then

\`a^n = product over set bits i of a^(2^i)\`

We iterate through the bits of \`n\`, keeping a running "current square" that doubles each step (\`a, a^2, a^4, a^8, ...\`). Whenever the current bit of \`n\` is 1, we multiply it into the result.

### Modular version

Everything works modulo \`m\`, keeping numbers small. Use \`__int128\` (or \`mulmod\`) when \`m\` fits in 64 bits but \`m * m\` would overflow.

### Generalization

The same "log-n combine" trick works for any associative operation:

- Multiplying matrices — \`O(k^3 log n)\` recurrences
- Composing permutations
- Applying a linear recurrence
- Repeated function composition

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Compute (a^e) mod m using binary exponentiation.
long long powmod(long long a, long long e, long long m) {
    long long result = 1 % m;
    a %= m;
    if (a < 0) a += m;
    while (e > 0) {
        if (e & 1) result = result * a % m;
        a = a * a % m;
        e >>= 1;
    }
    return result;
}

// Non-modular version — beware of overflow for large exponents.
long long power(long long a, long long e) {
    long long r = 1;
    while (e > 0) {
        if (e & 1) r *= a;
        a *= a;
        e >>= 1;
    }
    return r;
}

int main() {
    cout << powmod(2, 62, 1000000007) << "\\n";   // 2^62 mod (10^9+7)
    cout << power(3, 10) << "\\n";                 // 59049
}
\`\`\`
`,
};

export default topic;
