import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "lcm",
  title: "LCM",
  description: "LCM \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# LCM

## Theory

The **least common multiple** \`lcm(a, b)\` is the smallest positive integer that is a multiple of both \`a\` and \`b\`.

### Key identity

\`lcm(a, b) = a * b / gcd(a, b)\`

Compute \`gcd\` first, then divide **before** multiplying to avoid overflow: \`a / gcd(a, b) * b\`.

### Properties

- \`lcm(a, 0) = 0\` by convention
- \`lcm\` is associative
- For a prime factorization view: take the **maximum** exponent of each prime across \`a\` and \`b\`
- \`lcm(a1, a2, ..., an)\` can grow astronomically — often kept modulo a prime in CP

### Overflow warning

Even for 64-bit ints, \`lcm\` can overflow easily. Use \`__int128\` or reduce modulo when accumulating LCMs.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }

// Safe LCM — divide first, then multiply.
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return a / gcd(a, b) * b;
}

// LCM of an array.
long long lcmAll(const vector<long long> &v) {
    long long r = 1;
    for (long long x : v) r = lcm(r, x);
    return r;
}

int main() {
    cout << lcm(12, 18) << "\\n";                            // 36
    cout << lcmAll({4, 6, 8, 9}) << "\\n";                   // 72
    cout << std::lcm(4LL, 6LL) << "\\n";                     // C++17: 12
}
\`\`\`
`,
};

export default topic;
