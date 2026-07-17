import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "inclusion-exclusion",
  title: "Inclusion-Exclusion Principle",
  description: "Inclusion-Exclusion Principle \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Inclusion-Exclusion Principle

## Theory

The **Inclusion-Exclusion Principle (IEP)** counts the size of a union by alternately adding and subtracting intersection sizes.

### Two-set form

\`|A ∪ B| = |A| + |B| - |A ∩ B|\`

### Three-set form

\`|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|\`

### General form

\`|A_1 ∪ ... ∪ A_n| = sum over non-empty S ⊆ {1..n} of (-1)^(|S|+1) * |intersection over i in S of A_i|\`

### Complement form (more common in CP)

Count elements in **none** of the sets:

\`|U| - |A_1 ∪ ... ∪ A_n| = sum over S ⊆ {1..n} of (-1)^|S| * |intersection of A_i for i in S|\`

### Classic applications

- **Count integers in [1, N] coprime with a set of primes** — subtract multiples, add pairwise intersections, etc.
- **Derangements** \`!n\` (permutations with no fixed point) — closed form using IEP.
- **Surjections** from an n-set to a k-set: \`sum_{i=0..k} (-1)^i * C(k, i) * (k-i)^n\`.

Iterating over subsets makes IEP an **O(2^n)** algorithm — works when \`n <= ~20\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Count integers in [1, N] divisible by at least one of the given (pairwise
// coprime enough for the LCM to fit) numbers, via inclusion-exclusion.
long long countDivisibleByAny(long long N, const vector<long long> &nums) {
    int n = nums.size();
    long long total = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        long long lcm = 1;
        bool overflow = false;
        for (int i = 0; i < n; i++) if (mask >> i & 1) {
            long long g = __gcd(lcm, nums[i]);
            long long step = nums[i] / g;
            if (lcm > N / step) { overflow = true; break; }
            lcm *= step;
        }
        if (overflow) continue;
        long long cnt = N / lcm;
        int bits = __builtin_popcount(mask);
        total += (bits % 2 ? +cnt : -cnt);
    }
    return total;
}

// Number of derangements of size n via IEP: !n = sum_{k=0..n} (-1)^k * n!/k!
long long derangements(int n) {
    vector<long long> f(n + 1, 1);
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i;
    long long r = 0;
    for (int k = 0; k <= n; k++) r += (k % 2 ? -1 : 1) * (f[n] / f[k]);
    return r;
}

int main() {
    cout << countDivisibleByAny(30, {2, 3, 5}) << "\\n";  // 22
    cout << derangements(5) << "\\n";                     // 44
}
\`\`\`
`,
};

export default topic;
