import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "rolling-hash",
  title: "Rolling Hash",
  description: "Polynomial hashing, O(1) substring hashes, double hashing and Rabin-Karp.",
  readingTime: 8,
  content: `

# Rolling Hash

## Theory

A **polynomial hash** maps a string to a number:

\`\`\`
H(s) = ( s[0]*p^0 + s[1]*p^1 + ... + s[n-1]*p^(n-1) ) mod M
\`\`\`

with a base \`p\` larger than the alphabet (e.g. 131, 1000003) and a large prime modulus \`M\` (e.g. \`1e9+7\`, or \`(1<<61)-1\` for extra safety).

### O(1) substring hashes

Precompute prefix hashes \`h[i] = H(s[0..i-1])\` and powers \`pw[i] = p^i\`:

\`\`\`
hash(l, r) = ( h[r+1] - h[l] * pw[r-l+1] ) mod M
\`\`\`

(using the "most significant first" convention). Preprocessing O(n), each query **O(1)** — this makes substring comparison, LCP binary search, and duplicate detection almost free.

### Collision probability

With one modulus around \`1e9\` and \`q\` compared pairs, the failure probability is ~\`q²/M\` (birthday paradox) — risky for \`q ≈ 1e5\`+. Fixes:

- **Double hashing** — two independent (p, M) pairs, effectively \`M ≈ 1e18\`.
- **Randomised base** chosen at runtime to defeat anti-hash tests.
- Mod \`2^61 - 1\` with 128-bit multiplication.

Never use \`unsigned long long\` overflow (mod \`2^64\`) in Codeforces-style contests — Thue–Morse anti-tests break it.

### Rabin–Karp matching

Hash the pattern, slide a window over the text comparing hashes, verify matches directly. Average O(n + m).

### Typical applications

| Task | Idea |
|---|---|
| Count distinct substrings of length k | hash all windows into a set |
| Longest common substring of two strings | binary search length + hash sets |
| Longest repeated substring | binary search + hash set |
| Palindrome check | compare hash of the substring with the reversed-string hash |
| Longest common prefix of suffixes | binary search + hash |
| 2D pattern matching | hash rows, then hash the row-hashes |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct Hashing {
    static const ll M1 = 1000000007, M2 = 998244353;
    ll P1, P2;
    vector<ll> h1, h2, p1, p2;

    explicit Hashing(const string& s) {
        mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
        P1 = 131 + rng() % 100 * 2;                 // randomised bases
        P2 = 137 + rng() % 100 * 2;
        int n = s.size();
        h1.assign(n + 1, 0); h2.assign(n + 1, 0);
        p1.assign(n + 1, 1); p2.assign(n + 1, 1);
        for (int i = 0; i < n; ++i) {
            h1[i+1] = (h1[i] * P1 + s[i]) % M1;
            h2[i+1] = (h2[i] * P2 + s[i]) % M2;
            p1[i+1] = p1[i] * P1 % M1;
            p2[i+1] = p2[i] * P2 % M2;
        }
    }
    // hash of s[l..r], 0-indexed inclusive
    pair<ll,ll> get(int l, int r) const {
        ll a = (h1[r+1] - h1[l] * p1[r-l+1]) % M1; if (a < 0) a += M1;
        ll b = (h2[r+1] - h2[l] * p2[r-l+1]) % M2; if (b < 0) b += M2;
        return {a, b};
    }
    bool equal(int l1, int r1, int l2, int r2) const {
        return (r1 - l1 == r2 - l2) && get(l1, r1) == get(l2, r2);
    }
};

// count distinct substrings of length k
int distinctOfLength(const string& s, int k) {
    if ((int)s.size() < k) return 0;
    Hashing H(s);
    set<pair<ll,ll>> seen;
    for (int i = 0; i + k <= (int)s.size(); ++i) seen.insert(H.get(i, i + k - 1));
    return seen.size();
}

// longest common substring of a and b via binary search + hashing
int longestCommonSubstring(const string& a, const string& b) {
    Hashing HA(a), HB(b);
    auto ok = [&](int len) {
        if (len == 0) return true;
        if (len > (int)a.size() || len > (int)b.size()) return false;
        set<pair<ll,ll>> s;
        for (int i = 0; i + len <= (int)a.size(); ++i) s.insert(HA.get(i, i + len - 1));
        for (int i = 0; i + len <= (int)b.size(); ++i)
            if (s.count(HB.get(i, i + len - 1))) return true;   // note: different bases!
        return false;
    };
    // bases must match across the two objects for cross comparison; keep both from one string:
    (void)ok;
    // safe version: concatenate with a separator and hash once
    string c = a + '\\x01' + b;
    Hashing H(c);
    int off = a.size() + 1;
    int lo = 0, hi = min(a.size(), b.size());
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        set<pair<ll,ll>> s;
        for (int i = 0; i + mid <= (int)a.size(); ++i) s.insert(H.get(i, i + mid - 1));
        bool found = false;
        for (int i = 0; i + mid <= (int)b.size() && !found; ++i)
            found = s.count(H.get(off + i, off + i + mid - 1));
        if (found) lo = mid; else hi = mid - 1;
    }
    return lo;
}

int main() {
    string s = "abcabcabc";
    Hashing H(s);
    cout << H.equal(0, 2, 3, 5) << '\\n';                    // 1  ("abc" == "abc")
    cout << distinctOfLength(s, 3) << '\\n';                 // 3
    cout << longestCommonSubstring("abcdef", "zabcy") << '\\n'; // 3 ("abc")
}
\`\`\`
`,
};

export default topic;
