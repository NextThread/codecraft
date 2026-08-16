import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "eulers-theorem",
  title: "Euler's Theorem",
  description: "Euler's Theorem \u2014 theory and C++17 implementation.",
  readingTime: 5,
  content: `

# Euler's Theorem

## Theory

**Euler's theorem** generalizes Fermat's little theorem to any modulus. If gcd(a, n) = 1, then

a^phi(n) ≡ 1 (mod n)

where phi is Euler's totient function (count of integers in [1, n] coprime to n).

### Why it works

The integers coprime to n modulo n form a group under multiplication of size phi(n) (the multiplicative group Z_n*). By Lagrange's theorem, every element's order divides the group size, so a^phi(n) = e (the identity, 1) in this group.

### Consequences

- **Modular inverse**: if gcd(a, n) = 1, a^(-1) ≡ a^(phi(n) - 1) (mod n). This works for composite n too, unlike Fermat's (which needs n prime).
- **Reducing large exponents**: a^b mod n = a^(b mod phi(n)) mod n, provided gcd(a, n) = 1. When gcd(a, n) != 1, this simple reduction can fail; a safe **generalized Euler / lifting-the-exponent** rule handles that (used in "power tower mod n" problems): if b >= log2(n), a^b ≡ a^(phi(n) + b mod phi(n)) (mod n) works regardless of gcd, which is the standard trick for towers a^a^a^... mod n.

### Key observations

- Fermat's little theorem is the special case n = p prime, where phi(p) = p - 1.
- Useful whenever exponents are astronomically large (e.g., given as another expression, or a power tower) and you need a^b mod n.
- Requires phi(n), computable via factorization in O(sqrt(n)).

### Complexity

O(sqrt(n)) to factor n and get phi(n); O(log b) for the modular exponentiation itself.

### When to use

Modular inverses under composite moduli, reducing huge exponents (especially exponent given as a huge number or another power), and power-tower evaluation modulo n.

### Example

n = 10, phi(10) = 4. a = 3 (coprime to 10). Euler's theorem: 3^4 = 81 ≡ 1 (mod 10). Indeed 81 mod 10 = 1. So 3^103 mod 10 = 3^(103 mod 4) mod 10 = 3^3 mod 10 = 27 mod 10 = 7.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

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

// Euler's totient of n — O(sqrt(n)).
ll phi(ll n) {
    ll result = n;
    for (ll p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// a^b mod n via Euler's theorem, safe even when gcd(a, n) != 1,
// as long as b is given as a big exponent (b represented as string) that is >= log2(n).
// General "power tower" style reduction: a^b mod n = a^(phi(n) + b mod phi(n)) mod n when b >= log2(n).
ll bigPowMod(ll a, const string& bStr, ll n) {
    ll p = phi(n);
    ll bMod = 0;
    bool bGeqP = false; // track whether the true exponent b >= p
    for (char c : bStr) {
        int digit = c - '0';
        bMod = bMod * 10 + digit;
        if (bMod >= p) { bGeqP = true; bMod %= p; }
    }
    ll exponent = bGeqP ? bMod + p : bMod; // add phi(n) if b was large enough
    return power(a, exponent, n);
}

int main() {
    cout << power(3, 103 % phi(10), 10) << "\\n"; // 7, using Euler reduction
    cout << bigPowMod(2, "1000000000000000000000", 1000000007) << "\\n";
}
\`\`\`

`,
};

export default topic;
