import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "double-hashing",
  title: "Double Hashing",
  description: "Reducing collision probability in string hashing by combining two independent polynomial hashes.",
  readingTime: 9,
  content: `
# Double Hashing

## Theory

### What it is
Polynomial (rolling) hashing maps a string to an integer so that equal strings always get equal hashes, and different strings *usually* get different hashes. Single hashing modulo one prime is vulnerable to collisions, either by bad luck or by an adversary who knows your modulus (common in CP problems designed to break single-hash solutions, e.g. anti-hash tests on Codeforces). **Double hashing** computes two independent hashes (different bases and/or different moduli) and represents each substring hash as a *pair* \`(h1, h2)\`. Two substrings are considered equal only if both components match.

### Why it works
Treat each hash as picking a random point in Z_p. The probability that two distinct strings collide under one random hash is about \`1/p\`. Using two independent hashes makes the collision probability roughly \`1/(p1 * p2)\`, which for \`p1, p2 ~ 1e9\` is about \`1e-18\` -- astronomically small, and effectively immune to precomputed adversarial tests since the constants (base, mod) are typically randomized at runtime.

### Core idea
For a string \`s[0..n-1]\`, and base \`b\`, modulus \`m\`, define
\`H(i) = (s[0]*b^(i-1) + s[1]*b^(i-2) + ... + s[i-1]) mod m\`
as the hash of prefix of length \`i\`. Then the hash of substring \`s[l..r)\` is
\`hash(l, r) = (H(r) - H(l) * b^(r-l)) mod m\`
Do this simultaneously for two (base, mod) pairs and combine the results into one 64-bit key (e.g. \`h1 * MOD2 + h2\`, or a \`pair<long long,long long>\`, or pack into \`__int128\`/ \`uint64_t\` combining) for easy comparison/hash-map storage.

### Key observations
- Use **random** bases and moduli chosen at program start (seeded with \`chrono\`) so an adversary cannot precompute a test that collides with your fixed constants.
- Prefer moduli that are large primes not equal to typical "nice" numbers like 1e9+7 (well-known constants are exactly what anti-hash tests target).
- Precomputing power arrays for both moduli lets you answer arbitrary substring-hash queries in O(1) after O(n) preprocessing.
- Combine the two hash values into a single 64-bit or 128-bit number so you can use ordinary hash sets/maps of substrings without nested pair overhead.
- Double hashing does **not** make collisions impossible, just extremely unlikely -- for ICPC-style problems this is the accepted standard; for problems explicitly guarding against hashing, use suffix arrays/automata instead.

### Complexity
- Preprocessing: O(n) per hash (O(n) overall with 2 hashes, small constant factor).
- Substring hash query: O(1).
- Comparing two substrings: O(1).

### When to use
- Fast substring equality checks / comparisons.
- String matching, counting distinct substrings (with hashing all substrings and using a set, O(n^2 log n) or O(n^2)), longest common substring via binary search + hashing, checking palindromes, deduplication of strings.
- As a lightweight and simple alternative to suffix structures when true worst-case guarantees aren't required.

### Small example
String "abab", base b, mod m. Prefix hashes H(0..4) computed. Hash of "ab" (indices [0,2)) equals hash of "ab" at [2,4) if computed correctly, letting you detect the repeated block in O(1) once prefixes are built.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

struct DoubleHash {
    int n;
    ll mod1, mod2, base1, base2;
    vector<ll> h1, h2, p1, p2;

    DoubleHash(const string &s, ll m1, ll m2, ll b1, ll b2)
        : n((int)s.size()), mod1(m1), mod2(m2), base1(b1), base2(b2) {
        h1.assign(n + 1, 0);
        h2.assign(n + 1, 0);
        p1.assign(n + 1, 1);
        p2.assign(n + 1, 1);
        for (int i = 0; i < n; i++) {
            h1[i + 1] = (h1[i] * base1 + (s[i] - 'a' + 1)) % mod1;
            h2[i + 1] = (h2[i] * base2 + (s[i] - 'a' + 1)) % mod2;
            p1[i + 1] = (p1[i] * base1) % mod1;
            p2[i + 1] = (p2[i] * base2) % mod2;
        }
    }

    // hash of s[l..r) as combined 128-bit-safe pair packed into one ull
    pair<ll, ll> get(int l, int r) const {
        ll x = ((h1[r] - h1[l] * p1[r - l]) % mod1 + mod1) % mod1;
        ll y = ((h2[r] - h2[l] * p2[r - l]) % mod2 + mod2) % mod2;
        return {x, y};
    }
};

// Generate randomized parameters to defeat anti-hash tests.
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

ll randPrimeAround(ll lo, ll hi) {
    // pick a random odd number in range and test primality (Miller-Rabin lite via trial division for demo)
    while (true) {
        ll cand = lo + rng() % (hi - lo);
        if (cand % 2 == 0) cand++;
        bool prime = true;
        for (ll d = 3; d * d <= cand; d += 2) {
            if (cand % d == 0) { prime = false; break; }
        }
        if (prime) return cand;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;

    ll mod1 = randPrimeAround((ll)1e9, (ll)1e9 + 1000000);
    ll mod2 = randPrimeAround((ll)1e9 + 2000000, (ll)1e9 + 3000000);
    ll base1 = 131 + rng() % 1000;
    ll base2 = 137 + rng() % 1000;

    DoubleHash dh(s, mod1, mod2, base1, base2);

    // Example: check if two substrings are equal in O(1)
    int n = (int)s.size();
    if (n >= 4) {
        auto h_left = dh.get(0, n / 2);
        auto h_right = dh.get(n / 2, n);
        cout << "First half == second half? " << (h_left == h_right ? "yes" : "no") << "\\n";
    }

    // Example: count distinct substrings using a hash set of pairs (O(n^2) pairs, fine for small n)
    set<pair<ll,ll>> distinctHashes;
    for (int l = 0; l < n; l++)
        for (int r = l + 1; r <= n; r++)
            distinctHashes.insert(dh.get(l, r));
    cout << "Distinct substrings (approx, via hashing): " << distinctHashes.size() << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
