import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "modular-arithmetic",
  title: "Modular Arithmetic",
  description: "Modular Arithmetic \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Modular Arithmetic

## Theory

**Modular arithmetic** works with remainders modulo some positive integer \`m\`. Two integers \`a, b\` are **congruent** modulo \`m\`, written \`a ≡ b (mod m)\`, if \`m | (a - b)\`.

### Rules that preserve congruence

- \`(a + b) mod m = ((a mod m) + (b mod m)) mod m\`
- \`(a - b) mod m = ((a mod m) - (b mod m) + m) mod m\`  ← add m to keep result non-negative
- \`(a * b) mod m = ((a mod m) * (b mod m)) mod m\`
- Division is **not** direct; use modular inverse (only exists when \`gcd(a, m) = 1\`).

### Common prime moduli

\`10^9 + 7\`, \`10^9 + 9\`, \`998244353\` are all prime — they play well with Fermat's little theorem for inverses and with NTT.

### Overflow

For \`m\` up to \`~ 3 * 10^9\`, \`long long * long long\` overflows. Use \`__int128\` or a custom \`mulmod\`.

### Negative numbers

Always normalize: \`((x % m) + m) % m\`.

### CP idioms

- Store counts / DP values modulo \`10^9 + 7\`
- Precompute factorials + inverse factorials for \`nCr\`
- Combine with matrix exponentiation for fast recurrences

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using u128 = __int128;

const long long MOD = 1'000'000'007LL;

long long addm(long long a, long long b, long long m = MOD) {
    return (a + b) % m;
}
long long subm(long long a, long long b, long long m = MOD) {
    return (a - b % m + m) % m;
}
long long mulm(long long a, long long b, long long m = MOD) {
    return (long long)((u128)a * b % m);
}
long long powm(long long a, long long e, long long m = MOD) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = mulm(r, a, m); a = mulm(a, a, m); e >>= 1; }
    return r;
}

int main() {
    cout << addm(999999999LL, 999999999LL) << "\\n";   // works modulo 1e9+7
    cout << mulm(123456789LL, 987654321LL) << "\\n";
    cout << powm(2, 1000000, MOD) << "\\n";
}
\`\`\`
`,
};

export default topic;
