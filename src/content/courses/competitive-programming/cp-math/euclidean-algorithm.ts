import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "euclidean-algorithm",
  title: "Euclidean Algorithm",
  description: "Euclidean Algorithm \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Euclidean Algorithm

## Theory

The **Euclidean algorithm** computes \`gcd(a, b)\` using the identity:

\`gcd(a, b) = gcd(b, a mod b)\`,  with \`gcd(a, 0) = a\`.

### Correctness

Any common divisor of \`a\` and \`b\` also divides \`a mod b = a - floor(a/b) * b\`, and vice versa. So \`gcd(a, b) = gcd(b, a mod b)\`. Each step strictly decreases the smaller argument, so the process terminates.

### Complexity

At every two steps the smaller number is **at least halved**, so the number of iterations is \`O(log(min(a, b)))\`. The worst case is consecutive Fibonacci numbers — this is Lame's theorem.

### Recursive vs iterative

Both are \`O(log)\` in time, but iterative uses O(1) space.

### Extended Euclidean

A generalization also finds integers \`x, y\` such that \`a*x + b*y = gcd(a, b)\` (Bezout's identity). See the dedicated topic.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Recursive form.
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Iterative form — same complexity, O(1) stack.
long long gcdIterative(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    cout << gcd(1071, 462) << "\\n";           // 21
    cout << gcdIterative(1071, 462) << "\\n";  // 21
    // Fibonacci worst case: gcd(F_{n+1}, F_n) does n iterations.
    cout << gcd(89, 55) << "\\n";              // 1
}
\`\`\`
`,
};

export default topic;
