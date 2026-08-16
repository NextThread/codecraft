import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "discrete-logarithm",
  title: "Discrete Logarithm",
  description: "Discrete Logarithm \u2014 theory and C++17 implementation.",
  readingTime: 6,
  content: `

# Discrete Logarithm

## Theory

Given a, b, and modulus n, the **discrete logarithm problem (DLP)** asks for x such that a^x ≡ b (mod n). Unlike ordinary logarithms, no efficient closed form exists in general — this asymmetry (easy to exponentiate, hard to invert) underlies cryptography (Diffie-Hellman, ElGamal).

### Core idea: Baby-Step Giant-Step

The standard CP algorithm (see the dedicated BSGS topic) solves DLP in O(sqrt(n) log n) by writing x = i*m - j for m = ceil(sqrt(n)), precomputing "baby steps" a^j and matching against "giant steps" b * (a^-m)^i.

### When a solution may not exist

If gcd(a, n) != 1, a might not generate a subgroup containing b; special handling (dividing out gcd repeatedly) is needed — this generalized version is sometimes called the "extended BSGS".

### Key observations

- The multiplicative order of a modulo n divides phi(n) (if gcd(a,n)=1); the search space for x can be restricted to [0, ord(a)).
- For prime modulus p, working in Z_p* (cyclic group of order p-1) is standard.
- Index calculus and Pohlig-Hellman speed things up further when p-1 is smooth, but BSGS is the general-purpose O(sqrt(n)) method used in contests.

### Complexity

O(sqrt(n) log n) time, O(sqrt(n)) memory for BSGS with a hash map.

### When to use

Any modular equation a^x ≡ b (mod n) that must be solved for x, e.g., inverse of exponentiation, order-finding subproblems, or as a subroutine after reducing a more complex equation to this form.

### Example

Solve 3^x ≡ 4 (mod 7). Powers of 3 mod 7: 3^1=3, 3^2=2, 3^3=6, 3^4=4. So x=4 works (also x=4+6k for any k since order of 3 mod 7 is 6).

## C++17 Implementation

See the Baby-Step Giant-Step topic for the full, contest-ready implementation of this algorithm; discrete logarithm and BSGS are the same technique presented from two angles (the problem statement vs. the solving method).

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

// Solve a^x = b (mod m) for the smallest non-negative x, or -1 if none exists.
// Requires gcd(a, m) = 1 (use extended BSGS for the general case).
ll discreteLog(ll a, ll b, ll m) {
    a %= m; b %= m;
    ll n = (ll)sqrt((double)m) + 1;
    unordered_map<ll, ll> babySteps; // value a^j -> smallest j
    ll cur = 1;
    for (ll j = 0; j < n; j++) {
        if (!babySteps.count(cur)) babySteps[cur] = j;
        cur = (__int128)cur * a % m;
    }
    ll factor = power(power(a, n, m), m - 2, m); // (a^n)^(-1) mod m, needs m prime for Fermat inverse
    ll giant = b;
    for (ll i = 0; i <= n; i++) {
        if (babySteps.count(giant)) return i * n + babySteps[giant];
        giant = (__int128)giant * factor % m;
    }
    return -1;
}

int main() {
    cout << discreteLog(3, 4, 7) << "\\n"; // 4
}
\`\`\`

`,
};

export default topic;
