import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "chinese-remainder-theorem",
  title: "Chinese Remainder Theorem",
  description: "Chinese Remainder Theorem \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Chinese Remainder Theorem

## Theory

The **Chinese Remainder Theorem (CRT)** solves a system of congruences

\`x ≡ r1 (mod m1)\`
\`x ≡ r2 (mod m2)\`
\`...\`
\`x ≡ rk (mod mk)\`

**Classical CRT.** If \`m1, m2, ..., mk\` are **pairwise coprime**, there is a unique solution modulo \`M = m1 * m2 * ... * mk\`.

**Generalized CRT.** If some \`mi, mj\` share factors, a solution exists iff for every pair \`ri ≡ rj (mod gcd(mi, mj))\`. The combined solution is unique modulo \`lcm(m1, ..., mk)\`.

### Merging two congruences

Given \`x ≡ r1 (mod m1)\` and \`x ≡ r2 (mod m2)\`:

- Let \`g = gcd(m1, m2)\`. If \`(r2 - r1) mod g != 0\`, no solution.
- Use extended Euclidean to find \`p, q\` with \`m1*p + m2*q = g\`.
- Then \`x = r1 + m1 * p * (r2 - r1) / g\` modulo \`lcm(m1, m2)\`.

Merge congruences pairwise to combine \`k\` of them.

### Uses in CP

- Recovering big answers from several small prime moduli (hashing, avoiding overflow)
- Number theory tasks with mixed moduli
- Combining sub-problem answers under different constraints

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using i128 = __int128;

long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long x1, y1, g = extGcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}

// Merge x = r1 (mod m1) and x = r2 (mod m2).
// Returns {true, (r, m)} where r is the merged remainder modulo m = lcm(m1, m2).
pair<bool, pair<long long, long long>>
crt2(long long r1, long long m1, long long r2, long long m2) {
    long long p, q;
    long long g = extGcd(m1, m2, p, q);
    long long diff = r2 - r1;
    if (diff % g != 0) return {false, {0, 0}};
    long long lcm = m1 / g * m2;
    i128 mult = (i128)(diff / g) * p % (m2 / g);
    long long r = (long long)(((i128)r1 + (i128)m1 * mult) % lcm);
    if (r < 0) r += lcm;
    return {true, {r, lcm}};
}

// Merge k congruences.
pair<bool, pair<long long, long long>>
crt(const vector<long long> &r, const vector<long long> &m) {
    long long R = 0, M = 1;
    for (size_t i = 0; i < r.size(); i++) {
        auto res = crt2(R, M, r[i], m[i]);
        if (!res.first) return {false, {0, 0}};
        R = res.second.first; M = res.second.second;
    }
    return {true, {R, M}};
}

int main() {
    // x = 2 (mod 3), x = 3 (mod 5), x = 2 (mod 7) -> x = 23 (mod 105)
    auto res = crt({2, 3, 2}, {3, 5, 7});
    cout << res.second.first << " (mod " << res.second.second << ")\\n";
}
\`\`\`
`,
};

export default topic;
