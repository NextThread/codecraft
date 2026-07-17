import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "divisibility-rules",
  title: "Divisibility Rules",
  description: "Divisibility Rules \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Divisibility Rules

## Theory

A **divisibility rule** is a shortcut to check whether an integer \`n\` is divisible by some small integer \`d\` without doing the full division. In CP these rules are used inside digit-DP problems, big-integer checks, and constructive tasks.

### Classic rules (base 10)

- **Divisible by 2** — last digit is even (0, 2, 4, 6, 8).
- **Divisible by 3** — sum of digits divisible by 3.
- **Divisible by 4** — last two digits form a number divisible by 4.
- **Divisible by 5** — last digit is 0 or 5.
- **Divisible by 6** — divisible by 2 AND by 3.
- **Divisible by 7** — take last digit, double it, subtract from the rest; repeat until small.
- **Divisible by 8** — last three digits divisible by 8.
- **Divisible by 9** — sum of digits divisible by 9.
- **Divisible by 10** — last digit is 0.
- **Divisible by 11** — alternating sum of digits (from right) divisible by 11.

### Why the digit-sum rules work

In base 10, \`10 ≡ 1 (mod 9)\`, so any power \`10^k ≡ 1 (mod 9)\`. That means a number equals the sum of its digits modulo 9, which is why divisibility by 3 and 9 reduces to digit sums.

Similarly \`10 ≡ -1 (mod 11)\`, so alternating sums decide divisibility by 11.

### Generalization

For any modulus \`m\`, if you can compute \`10^k mod m\` cheaply, you can turn a digit-based test into a per-digit weighted sum — the foundation of **digit DP**.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Generic: check divisibility of a very large number (as string) by m.
// Works because we compute n mod m one digit at a time.
bool divisibleBy(const string &num, int m) {
    int r = 0;
    for (char c : num) r = (r * 10 + (c - '0')) % m;
    return r == 0;
}

// Digit-sum shortcut for 3 and 9.
int digitSum(long long n) {
    int s = 0;
    while (n) { s += n % 10; n /= 10; }
    return s;
}

// Alternating digit sum (right to left) — rule for 11.
int altSum(long long n) {
    int s = 0, sign = 1;
    while (n) { s += sign * (int)(n % 10); sign = -sign; n /= 10; }
    return s;
}

int main() {
    cout << boolalpha;
    cout << divisibleBy("123456789123456789", 3) << "\\n"; // true
    cout << (digitSum(729) % 9 == 0) << "\\n";             // true
    cout << (altSum(1210) % 11 == 0) << "\\n";             // true
}
\`\`\`
`,
};

export default topic;
