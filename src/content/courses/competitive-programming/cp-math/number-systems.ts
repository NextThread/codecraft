import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "number-systems",
  title: "Number Systems",
  description: "Number Systems \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Number Systems

## Theory

Number systems define how we represent quantities using a set of digits and a base (or radix). In competitive programming and computer science, four bases dominate: **decimal (base 10)**, **binary (base 2)**, **octal (base 8)**, and **hexadecimal (base 16)**.

Every positional number system represents a value as a weighted sum of powers of its base. For a base \`b\` number with digits \`d_k d_{k-1} ... d_1 d_0\`:

value = d_k * b^k + d_{k-1} * b^(k-1) + ... + d_1 * b + d_0

### Common bases

- **Decimal (base 10):** digits 0-9. Human-friendly. Example: \`345 = 3*100 + 4*10 + 5\`.
- **Binary (base 2):** digits 0, 1. Native to computers. Example: \`1011 = 8 + 2 + 1 = 11\`.
- **Octal (base 8):** digits 0-7. Each octal digit = 3 binary bits.
- **Hexadecimal (base 16):** digits 0-9, A-F. Each hex digit = 4 binary bits. Example: \`0x1F = 31\`.

### Conversions

**Any base to decimal** — expand using powers of the base.
**Decimal to any base** — repeatedly divide by the base and collect remainders (read bottom-up).
**Binary <-> Hex** — group 4 bits at a time (right to left).

### Why it matters in CP

- Bitmask problems live in **base 2**.
- Digit DP problems often generalize to any base.
- Some problems require detecting whether \`n\` has a "nice" representation in some base (e.g. sum of powers of 3).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Convert a number in base \`b\` (given as a string) to decimal (long long).
long long toDecimal(const string &num, int b) {
    long long value = 0;
    for (char c : num) {
        int digit = isdigit(c) ? c - '0' : toupper(c) - 'A' + 10;
        value = value * b + digit;
    }
    return value;
}

// Convert a decimal number to base \`b\` (2 <= b <= 16), returned as string.
string fromDecimal(long long n, int b) {
    if (n == 0) return "0";
    string s;
    while (n > 0) {
        int d = n % b;
        s += (d < 10) ? char('0' + d) : char('A' + d - 10);
        n /= b;
    }
    reverse(s.begin(), s.end());
    return s;
}

int main() {
    cout << toDecimal("1011", 2) << "\\n";   // 11
    cout << toDecimal("1F", 16) << "\\n";    // 31
    cout << fromDecimal(255, 16) << "\\n";   // FF
    cout << fromDecimal(11, 2) << "\\n";     // 1011
}
\`\`\`
`,
};

export default topic;
