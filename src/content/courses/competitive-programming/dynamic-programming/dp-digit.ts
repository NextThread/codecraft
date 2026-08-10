import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-digit",
  title: "Digit DP",
  description: "Count numbers in a range satisfying digit constraints, with tight/leading-zero flags.",
  readingTime: 8,
  content: `

# Digit DP

## Theory

**Digit DP** counts numbers in \`[0, N]\` (or \`[L, R]\` via \`f(R) - f(L-1)\`) that satisfy a property of their decimal (or binary) digits. We build the number digit by digit from the most significant side.

### The standard state

\`\`\`
dp[pos][tight][leadingZero][extra...]
\`\`\`

- \`pos\` — index of the digit being chosen (0 … len-1).
- \`tight\` — are all previous digits equal to N's prefix? If yes, the current digit is capped by \`N[pos]\`, otherwise it ranges 0..9.
- \`leadingZero\` — have we placed a non-zero digit yet? Needed when "digit count" or "no leading zeros" matters.
- \`extra\` — the problem-specific accumulator: digit sum, sum mod k, mask of used digits, previous digit, count of a value, etc.

### The transition

\`\`\`
limit = tight ? N[pos] : 9
for d in 0..limit:
    res += go(pos+1,
              tight && (d == limit),
              leadingZero && (d == 0),
              update(extra, d))
\`\`\`

Base case: \`pos == len\` → return 1 if the accumulated state satisfies the property.

Memoise only states with \`tight == false\` (and usually \`leadingZero == false\`), since tight states are visited at most once per position.

### Complexity

\`O(len × 10 × states_of_extra)\` — with \`len ≤ 19\` for 64-bit numbers this is tiny.

### Typical problems

| Problem | \`extra\` |
|---|---|
| Sum of digits divisible by k | \`sum % k\` |
| Number itself divisible by k | \`value % k\` |
| No two equal adjacent digits | previous digit |
| Digits strictly increasing | previous digit |
| Contains digit 7 / avoids "13" | boolean flags |
| Count of a specific digit | running count |
| Distinct digits only | 10-bit mask |
| Numbers whose digits form a palindrome | usually needs a different technique |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

// -------- 1) count x in [0, N] whose digit sum is divisible by K --------
string S;
int K;
ll memo1[20][200][2];
bool vis1[20][200][2];

ll go1(int pos, int sum, int tight) {
    if (pos == (int)S.size()) return sum % K == 0;
    if (vis1[pos][sum][tight]) return memo1[pos][sum][tight];
    vis1[pos][sum][tight] = true;
    int limit = tight ? S[pos] - '0' : 9;
    ll res = 0;
    for (int d = 0; d <= limit; ++d)
        res += go1(pos + 1, sum + d, tight && d == limit);
    return memo1[pos][sum][tight] = res;
}
ll countDigitSumDiv(ll n, int k) {
    if (n < 0) return 0;
    S = to_string(n); K = k;
    memset(vis1, 0, sizeof vis1);
    return go1(0, 0, 1);
}

// -------- 2) count x in [0, N] with all distinct digits --------
ll memo2[20][1024][2][2];
bool vis2[20][1024][2][2];

ll go2(int pos, int mask, int tight, int lead) {
    if (pos == (int)S.size()) return 1;
    if (vis2[pos][mask][tight][lead]) return memo2[pos][mask][tight][lead];
    vis2[pos][mask][tight][lead] = true;
    int limit = tight ? S[pos] - '0' : 9;
    ll res = 0;
    for (int d = 0; d <= limit; ++d) {
        if (!(lead && d == 0) && (mask >> d & 1)) continue;      // digit reused
        int nmask = (lead && d == 0) ? mask : (mask | 1 << d);
        res += go2(pos + 1, nmask, tight && d == limit, lead && d == 0);
    }
    return memo2[pos][mask][tight][lead] = res;
}
ll countDistinctDigits(ll n) {
    if (n < 0) return 0;
    S = to_string(n);
    memset(vis2, 0, sizeof vis2);
    return go2(0, 0, 1, 1);
}

int main() {
    // numbers in [1, 100] whose digit sum is divisible by 5
    cout << countDigitSumDiv(100, 5) - countDigitSumDiv(0, 5) << '\\n';   // 18

    // numbers in [1, 200] with pairwise distinct digits
    cout << countDistinctDigits(200) - 1 << '\\n';                        // 182
}
\`\`\`
`,
};

export default topic;
