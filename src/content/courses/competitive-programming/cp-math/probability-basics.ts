import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "probability-basics",
  title: "Probability Basics",
  description: "Probability Basics \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Probability Basics

## Theory

**Probability** measures how likely an event is, as a number in \`[0, 1]\`.

### Sample space, events

A **sample space** \`S\` is the set of all outcomes. An **event** \`A\` is a subset of \`S\`. For finite equally-likely outcomes:

\`P(A) = |A| / |S|\`

### Axioms

1. \`P(A) >= 0\`
2. \`P(S) = 1\`
3. For disjoint events, \`P(A ∪ B) = P(A) + P(B)\`

### Rules

- Complement: \`P(not A) = 1 - P(A)\`
- Union: \`P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\`
- Conditional: \`P(A | B) = P(A ∩ B) / P(B)\`
- Independence: \`A\` and \`B\` are independent iff \`P(A ∩ B) = P(A) * P(B)\`
- Bayes: \`P(A | B) = P(B | A) * P(A) / P(B)\`
- Total probability: \`P(B) = sum_i P(B | A_i) * P(A_i)\` over a partition \`A_i\`.

### In CP

Answers are usually given as \`P mod (10^9 + 7)\` — treat \`p / q\` as \`p * q^{-1} mod p\`. Precompute inverses if many queries.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}
long long invMod(long long a) { return powmod(a, MOD - 2, MOD); }

// Simulate probability of "at least one shared birthday" among k people.
// Real answer: 1 - product_{i=0..k-1} (365 - i) / 365.
double birthdayCollision(int k) {
    double p = 1.0;
    for (int i = 0; i < k; i++) p *= (365.0 - i) / 365.0;
    return 1.0 - p;
}

// Modular version of a probability p/q: report the value modulo MOD.
long long asModular(long long p, long long q) {
    return p % MOD * invMod(q % MOD) % MOD;
}

int main() {
    cout << birthdayCollision(23) << "\\n";       // ~0.507
    cout << asModular(1, 6) << "\\n";             // 1/6 mod p
}
\`\`\`
`,
};

export default topic;
