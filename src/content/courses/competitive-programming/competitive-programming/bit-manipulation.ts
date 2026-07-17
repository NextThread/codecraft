import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "bit-manipulation",
  title: "Bit Manipulation",
  description: "Bitwise operators, tricks, Brian Kernighan's algorithm, and classic problems.",
  readingTime: 14,
  content: `
# Bit Manipulation

## Why bits?

Every integer in a computer is stored as a sequence of **bits** (0s and 1s). Manipulating those bits directly lets us:

- Do things **extremely fast** (a single CPU instruction).
- Encode **sets of up to 64 elements** in a single \`long long\`.
- Solve problems that look hard with clever one-liners.

## Bitwise operators

| Operator | Name | Example (\`a=6=110\`, \`b=3=011\`) | Result |
|----------|------|------------------------------------|--------|
| \`&\`  | AND         | \`6 & 3\`   | \`010 = 2\` |
| \`|\`  | OR          | \`6 \\| 3\` | \`111 = 7\` |
| \`^\`  | XOR         | \`6 ^ 3\`   | \`101 = 5\` |
| \`~\`  | NOT         | \`~6\`      | flips all bits |
| \`<<\` | Left shift  | \`6 << 1\`  | \`1100 = 12\` (× 2) |
| \`>>\` | Right shift | \`6 >> 1\`  | \`011 = 3\`  (÷ 2) |

## Essential bit tricks

Assume \`x\` is a non-negative integer and \`i\` is a bit position (0 = least significant).

### 1. Check if the i-th bit is set
\`\`\`cpp
bool bit_set = (x >> i) & 1;
\`\`\`

### 2. Set the i-th bit
\`\`\`cpp
x |= (1 << i);
\`\`\`

### 3. Clear the i-th bit
\`\`\`cpp
x &= ~(1 << i);
\`\`\`

### 4. Toggle the i-th bit
\`\`\`cpp
x ^= (1 << i);
\`\`\`

### 5. Check if x is a power of two
A power of two has exactly one bit set. \`x & (x - 1)\` clears the lowest set bit; if the result is 0 and x > 0, x was a power of two.

\`\`\`cpp
bool pow2 = x > 0 && (x & (x - 1)) == 0;
\`\`\`

### 6. Isolate the lowest set bit
\`\`\`cpp
int lowest = x & -x;   // two's complement magic
\`\`\`

### 7. Turn off the lowest set bit
\`\`\`cpp
x &= (x - 1);
\`\`\`

### 8. Multiply / divide by powers of two
\`\`\`cpp
int y = x << 3;   // x * 8
int z = x >> 2;   // x / 4  (for non-negative x)
\`\`\`

### 9. Swap two numbers without a temp
\`\`\`cpp
a ^= b; b ^= a; a ^= b;
\`\`\`

### 10. XOR properties (memorize these)
- \`a ^ a = 0\`
- \`a ^ 0 = a\`
- XOR is **commutative** and **associative**

Used in the classic *"find the number that appears once when all others appear twice"* trick:

\`\`\`cpp
int single = 0;
for (int x : a) single ^= x;   // O(n) time, O(1) space
\`\`\`

## Counting set bits (popcount)

### Naive: loop through 32 bits
\`\`\`cpp
int popcount_naive(unsigned x) {
    int c = 0;
    while (x) { c += x & 1; x >>= 1; }
    return c;
}
\`\`\`
Runs in **O(bits)**, i.e. 32 iterations.

### Brian Kernighan's Algorithm

Key insight: \`x & (x - 1)\` removes the **lowest set bit** of \`x\`. So we loop exactly **as many times as there are set bits** — much faster when the number is sparse.

\`\`\`cpp
int popcount_bk(unsigned x) {
    int c = 0;
    while (x) {
        x &= (x - 1);   // drop the lowest set bit
        ++c;
    }
    return c;
}
\`\`\`

**Complexity:** O(k) where k = number of set bits (≤ 32). This is Brian Kernighan's algorithm.

### Built-in (fastest)
\`\`\`cpp
__builtin_popcount(x);        // for unsigned int
__builtin_popcountll(x);      // for unsigned long long
\`\`\`

Other useful GCC builtins:

| Builtin | Meaning |
|---------|---------|
| \`__builtin_clz(x)\`  | leading zeros |
| \`__builtin_ctz(x)\`  | trailing zeros |
| \`__builtin_parity(x)\` | parity of set bits |

## Iterating over subsets of a set (bitmask trick)

Given a bitmask \`m\`, iterate over **every non-empty subset** of \`m\`:

\`\`\`cpp
for (int s = m; s > 0; s = (s - 1) & m) {
    // s is a subset of m
}
\`\`\`
Runs in **O(3^n)** total across all masks — the standard trick for subset DP.

## Full-featured program: bit toolkit demo

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    unsigned x = 29;   // 11101

    cout << "x            = " << bitset<8>(x) << " (" << x << ")\\n";
    cout << "bit 2 set?   = " << ((x >> 2) & 1) << "\\n";
    cout << "set   bit 1  = " << bitset<8>(x | (1 << 1)) << "\\n";
    cout << "clear bit 0  = " << bitset<8>(x & ~(1u << 0)) << "\\n";
    cout << "toggle bit 3 = " << bitset<8>(x ^ (1 << 3)) << "\\n";
    cout << "lowest set   = " << (x & -x) << "\\n";
    cout << "popcount     = " << __builtin_popcount(x) << "\\n";
    cout << "is pow of 2? = " << (x && !(x & (x - 1))) << "\\n";
    return 0;
}
\`\`\`

## Checking power of k (general idea)

- **Power of 2:** \`x > 0 && (x & (x - 1)) == 0\`.
- **Power of 4:** power of 2 **and** the single set bit is at an even position → \`x > 0 && (x & (x - 1)) == 0 && (x & 0x55555555) != 0\`.
- **Power of 3:** no direct bit trick — use the fact that the largest power of 3 that fits in an \`int\` is \`3^19 = 1162261467\`, so \`x > 0 && 1162261467 % x == 0\`.

## Practice problems

Solve these in order — they cover every trick above:

1. [Codeforces 579A — Raising Bacteria](https://codeforces.com/problemset/problem/579/A) — the answer is literally \`__builtin_popcount(n)\`.
2. [LeetCode — Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/description/) — implement popcount, then optimize with Brian Kernighan.
3. [LeetCode — Power of Two](https://leetcode.com/problems/power-of-two/) — one-line trick with \`x & (x - 1)\`.
4. [LeetCode — Power of Three](https://leetcode.com/problems/power-of-three/) — the divisibility trick above.
5. [LeetCode — Power of Four](https://leetcode.com/problems/power-of-four/) — combine "power of two" with an odd/even bit mask.
6. [LeetCode — Check if Number is a Sum of Powers of Three](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/) — write \`n\` in base 3 and check every digit is 0 or 1.

:::info
Once these feel easy, hunt tags like **bitmasks**, **dp**, **constructive** on [Codeforces](https://codeforces.com/problemset?tags=bitmasks) and [AtCoder](https://atcoder.jp/) to keep leveling up.
:::
`,
};

export default topic;
