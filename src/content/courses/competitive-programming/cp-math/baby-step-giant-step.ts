import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "baby-step-giant-step",
  title: "Baby-Step Giant-Step",
  description: "Baby-Step Giant-Step \u2014 theory and C++17 implementation.",
  readingTime: 7,
  content: `

# Baby-Step Giant-Step

## Theory

**Baby-Step Giant-Step (BSGS)** is a meet-in-the-middle algorithm to solve the discrete logarithm problem a^x ≡ b (mod n) in O(sqrt(n) log n) instead of brute-forcing O(n).

### Core idea

Let m = ceil(sqrt(n)). Write the unknown exponent as x = i*m - j, with 0 <= i, j < m (or x = i*m + j depending on the variant). Then:

a^x = b  =>  a^(i*m) = b * a^j  =>  a^(i*m) * (a^j)^(-1) ... 

A common formulation: rewrite as a^(i*m) = b * a^j, so:
1. **Baby steps**: compute and store a^j for j = 0..m-1 in a hash map (value -> j).
2. **Giant steps**: compute b * (a^(-m))^i for i = 0..m-1 and look each up in the map (using the inverse of a^m).

Whenever a match is found, x = i*m + j is a solution.

### Why it's O(sqrt(n))

Since 0 <= x < n and m ~ sqrt(n), the pair (i, j) with i, j in [0, m) covers all residues via i*m + j, so a match must exist within m baby steps and m giant steps — O(sqrt(n)) total work, each step O(log n) for exponentiation, or O(1) if precomputed incrementally.

### Key observations

- Requires gcd(a, n) = 1 for the modular inverse of a^m; when this fails, extended BSGS handles the shared-factor case by peeling off gcd(a, n) iteratively.
- The order of a divides phi(n), so the search range can be shrunk to the actual order if it's known and smaller than n.
- Works modulo any n, not just primes, as long as the inverse of a exists.

### Complexity

Time: O(sqrt(n) log n) (or O(sqrt(n)) with O(1) hashing and incremental multiplication). Space: O(sqrt(n)) for the hash map.

### When to use

Any problem requiring inversion of modular exponentiation: discrete logs, finding periods/orders, or solving equations of the form a^x ≡ b (mod n) where brute force over n is too slow but sqrt(n) fits.

### Example

Solve 5^x ≡ 3 (mod 11). m = 4 (ceil(sqrt(11))). Baby steps: 5^0=1,5^1=5,5^2=3,5^3=4 -> map{1:0,5:1,3:2,4:3}. Match found directly at j=2, so x=2. Check: 5^2=25≡3 (mod 11). Correct.

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

ll modInverse(ll a, ll mod) { return power(a, mod - 2, mod); } // mod must be prime

// Solves a^x = b (mod m), gcd(a, m) = 1, m prime (for the inverse step). Returns -1 if none.
ll bsgs(ll a, ll b, ll m) {
    a %= m; b %= m;
    ll n = (ll)ceil(sqrt((double)m)) + 1;

    unordered_map<ll, ll> table;
    ll aj = 1;
    for (ll j = 0; j < n; j++) {
        table.emplace(aj, j); // keep smallest j found first
        aj = (__int128)aj * a % m;
    }

    ll am = power(a, n, m);
    ll amInv = modInverse(am, m);
    ll gamma = b;
    for (ll i = 0; i < n; i++) {
        auto it = table.find(gamma);
        if (it != table.end()) return i * n + it->second;
        gamma = (__int128)gamma * amInv % m;
    }
    return -1;
}

int main() {
    cout << bsgs(5, 3, 11) << "\\n"; // 2
}
\`\`\`

`,
};

export default topic;
