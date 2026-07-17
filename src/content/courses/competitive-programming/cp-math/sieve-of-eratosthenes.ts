import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sieve-of-eratosthenes",
  title: "Sieve of Eratosthenes",
  description: "Sieve of Eratosthenes \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Sieve of Eratosthenes

## Theory

The **Sieve of Eratosthenes** finds all primes up to \`N\` in **O(N log log N)** time and **O(N)** memory.

### Idea

Start with an array \`isPrime[0..N]\` all set to true. For each \`i\` from 2 up to \`sqrt(N)\`, if \`isPrime[i]\` is still true, mark every multiple \`i*i, i*i + i, i*i + 2i, ...\` as composite. Start from \`i*i\` because smaller multiples (\`2i, 3i, ..., (i-1)*i\`) were already crossed out by smaller primes.

### Why \`O(N log log N)\`

The sum \`sum over primes p <= N of N/p\` is \`~ N * ln(ln N)\`.

### Segmented Sieve

If \`N\` is too large to fit in memory (e.g. \`10^12\`), sieve small primes up to \`sqrt(N)\` first, then process the range \`[L, R]\` in blocks — this is the **segmented sieve**.

### CP uses

- Primality queries in O(1) after preprocessing
- Iterating over primes
- Combined with **smallest prime factor** to factor numbers in O(log)

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Returns a boolean array: isPrime[i] is true iff i is prime, for 0 <= i <= N.
vector<char> sieve(int N) {
    vector<char> isPrime(N + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; (long long)i * i <= N; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= N; j += i) isPrime[j] = false;
        }
    }
    return isPrime;
}

// Collect all primes up to N.
vector<int> primesUpTo(int N) {
    auto p = sieve(N);
    vector<int> out;
    for (int i = 2; i <= N; i++) if (p[i]) out.push_back(i);
    return out;
}

int main() {
    for (int x : primesUpTo(50)) cout << x << ' ';
    // 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
}
\`\`\`
`,
};

export default topic;
