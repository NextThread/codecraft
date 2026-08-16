import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "primitive-roots",
  title: "Primitive Roots",
  description: "Primitive Roots \u2014 theory and C++17 implementation.",
  readingTime: 8,
  content: `

# Primitive Roots

## Theory

A **primitive root** modulo n is an integer g such that its powers g^1, g^2, ..., g^phi(n) generate all elements of the multiplicative group Z_n* (all integers in [1, n-1] coprime to n) — i.e., g has **multiplicative order** exactly phi(n).

### Existence

Primitive roots modulo n exist **iff** n is 1, 2, 4, p^k, or 2*p^k for an odd prime p. In particular, every prime p has a primitive root, and the group Z_p* is cyclic of order p-1.

### Order of an element

The **order** of a mod n is the smallest positive d such that a^d ≡ 1 (mod n). By Lagrange, d divides phi(n) (or, for prime modulus, divides p-1).

### Finding a primitive root modulo prime p

1. Compute phi(p) = p - 1 and its distinct prime factors q1, ..., qk.
2. For candidate g = 2, 3, 4, ..., check that for every qi, g^((p-1)/qi) mod p != 1.
3. If all checks pass, g is a primitive root (its order can't be a proper divisor of p-1, since that would require it to divide (p-1)/qi for some qi).

This works because the order of g must divide p-1; if the order is a proper divisor, it divides (p-1)/qi for some prime factor qi, so g^((p-1)/qi) mod p would equal 1.

### Key observations

- The smallest primitive root modulo prime p is typically small (O(p^(1/4)) heuristically), so trial testing from g=2 upward is fast in practice.
- Number of primitive roots modulo p is phi(p-1).
- Primitive roots are the backbone of the **discrete logarithm**, **NTT (number-theoretic transform)** root computations, and index calculus.

### Complexity

Factoring p-1: O(sqrt(p)). Testing each candidate: O(k log p) using fast exponentiation, where k is the number of distinct prime factors of p-1. Overall roughly O(sqrt(p) + (number of candidates) * log(p-1) * log p).

### When to use

Needed for NTT root-of-unity setup, discrete log / index calculus, and generating full residue cycles modulo a prime.

### Example

p = 7, p-1 = 6 = 2*3. Test g=2: 2^(6/2)=2^3=8≡1 (mod 7) — fails (order divides 3), so 2 is not primitive. Test g=3: 3^3=27≡6 (mod 7) !=1, 3^2=9≡2 (mod 7) !=1, so 3 is a primitive root mod 7. Indeed powers of 3 mod 7: 3,2,6,4,5,1 — all of 1..6.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll power(ll a, ll b, ll mod) {
    a %= mod; if (a < 0) a += mod;
    ll result = 1;
    while (b > 0) {
        if (b & 1) result = (__int128)result * a % mod;
        a = (__int128)a * a % mod;
        b >>= 1;
    }
    return result;
}

// Find the smallest primitive root modulo prime p — O(sqrt(p) log p).
ll findPrimitiveRoot(ll p) {
    if (p == 2) return 1;
    ll phi = p - 1;
    ll n = phi;
    vector<ll> primeFactors;
    for (ll d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            primeFactors.push_back(d);
            while (n % d == 0) n /= d;
        }
    }
    if (n > 1) primeFactors.push_back(n);

    for (ll g = 2; g <= p - 1; g++) {
        bool ok = true;
        for (ll q : primeFactors) {
            if (power(g, phi / q, p) == 1) { ok = false; break; }
        }
        if (ok) return g;
    }
    return -1; // should not happen for prime p
}

// Multiplicative order of a modulo n (n need not be prime), assuming gcd(a, n) = 1.
ll multiplicativeOrder(ll a, ll n, ll phiN) {
    ll m = phiN;
    vector<ll> primeFactors;
    ll t = m;
    for (ll d = 2; d * d <= t; d++) {
        if (t % d == 0) { primeFactors.push_back(d); while (t % d == 0) t /= d; }
    }
    if (t > 1) primeFactors.push_back(t);

    ll order = m;
    for (ll q : primeFactors)
        while (order % q == 0 && power(a, order / q, n) == 1)
            order /= q;
    return order;
}

int main() {
    cout << findPrimitiveRoot(7) << "\\n"; // 3
    cout << multiplicativeOrder(3, 7, 6) << "\\n"; // 6
}
\`\`\`

`,
};

export default topic;
