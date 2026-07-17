import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "time-complexity",
  title: "Time Complexity",
  description: "Big-O, all common growth rates, and how to estimate if your solution fits.",
  readingTime: 10,
  content: `
# Time Complexity

## What is Time Complexity?

**Time complexity** describes how the number of basic operations an algorithm performs **grows with the input size \`n\`**. We don't care about exact seconds — hardware changes. We care about the **shape** of the growth.

We express it using **asymptotic notation**, most commonly **Big-O**.

## Asymptotic notations

| Notation | Meaning | Bound |
|----------|---------|-------|
| **O(f(n))** | Upper bound — worst case grows *at most* like f(n) | ≤ |
| **Ω(f(n))** | Lower bound — grows *at least* like f(n) | ≥ |
| **Θ(f(n))** | Tight bound — grows *exactly* like f(n) | = |
| **o(f(n))** | Strictly smaller than f(n) | < |

In CP we almost always use **Big-O** for the worst case.

## Rules of thumb

1. Drop constants: \`O(3n) = O(n)\`.
2. Drop lower-order terms: \`O(n^2 + n) = O(n^2)\`.
3. Different inputs get different variables: \`O(n + m)\`, not \`O(n)\`.
4. Nested loops multiply. Sequential loops add.

## All common time complexities

Ordered from fastest to slowest:

### 1. O(1) — Constant

Runs in the same time regardless of input.

\`\`\`cpp
int first = a[0];        // O(1)
int sum   = a + b;       // O(1)
\`\`\`

### 2. O(log n) — Logarithmic

Cuts the input roughly in half every step. Classic example: **binary search**.

\`\`\`cpp
int binary_search(vector<int>& a, int x) {
    int lo = 0, hi = a.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] == x) return mid;
        if (a[mid] < x) lo = mid + 1;
        else            hi = mid - 1;
    }
    return -1;
}
\`\`\`

### 3. O(√n) — Square root

Common in prime checks and factorization.

\`\`\`cpp
bool is_prime(int n) {
    if (n < 2) return false;
    for (int i = 2; (long long)i * i <= n; ++i)
        if (n % i == 0) return false;
    return true;
}
\`\`\`

### 4. O(n) — Linear

One pass through the input.

\`\`\`cpp
int sum = 0;
for (int x : a) sum += x;   // O(n)
\`\`\`

### 5. O(n log n) — Linearithmic

The complexity of good sorting algorithms: **merge sort, heap sort, std::sort**.

\`\`\`cpp
sort(a.begin(), a.end());   // O(n log n)
\`\`\`

### 6. O(n²) — Quadratic

Two nested loops over the input. Bubble sort, selection sort, checking all pairs.

\`\`\`cpp
for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j)
        if (a[i] + a[j] == target) { /* ... */ }
\`\`\`

### 7. O(n³) — Cubic

Three nested loops. Floyd–Warshall all-pairs shortest paths.

\`\`\`cpp
for (int k = 0; k < n; ++k)
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
\`\`\`

### 8. O(2ⁿ) — Exponential

Trying every subset. Naive recursion for the Fibonacci numbers.

\`\`\`cpp
int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);   // O(2^n)
}
\`\`\`

### 9. O(n!) — Factorial

Trying every permutation. Brute-force TSP.

\`\`\`cpp
do {
    // evaluate permutation
} while (next_permutation(a.begin(), a.end()));
\`\`\`

## Comparing growth rates

\`\`\`text
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
\`\`\`

## What fits in 1 second? (competitive rule of thumb)

Modern judges execute roughly **10⁸ simple operations per second** for C++.

| n (input size) | Max feasible complexity |
|----------------|-------------------------|
| n ≤ 10        | O(n!) , O(2ⁿ · n)      |
| n ≤ 20        | O(2ⁿ · n)               |
| n ≤ 500       | O(n³)                   |
| n ≤ 5 000     | O(n²)                   |
| n ≤ 10⁶      | O(n log n)              |
| n ≤ 10⁸      | O(n) — barely           |
| n up to 10¹⁸ | O(log n) or O(1)        |

:::info
Always **look at the constraints first**. They tell you which complexity you're allowed.
:::

## Best / Average / Worst case

- **Best case** — the input that makes the algorithm finish fastest.
- **Average case** — expected behavior on random input.
- **Worst case** — the input that makes it slowest. **This is what Big-O usually describes.**

Example — **Quick Sort**:

- Best / average: **O(n log n)**
- Worst: **O(n²)** (bad pivot on already-sorted data)

## Amortized complexity

Sometimes a single operation is expensive, but if you average it over many operations it becomes cheap. Classic example: appending to a **dynamic array** (\`std::vector::push_back\`) is **O(1) amortized**, even though occasional resizes cost O(n).

## Program: measuring complexity empirically

\`\`\`cpp
#include <bits/stdc++.h>
#include <chrono>
using namespace std;
using namespace chrono;

int main() {
    for (int n : {1000, 2000, 4000, 8000}) {
        vector<int> a(n);
        iota(a.begin(), a.end(), 0);
        random_shuffle(a.begin(), a.end());

        auto t1 = high_resolution_clock::now();
        sort(a.begin(), a.end());
        auto t2 = high_resolution_clock::now();

        cout << "n = " << n << "  time = "
             << duration_cast<microseconds>(t2 - t1).count()
             << " us\\n";
    }
}
\`\`\`

Notice the time roughly **doubles** when \`n\` doubles — that's the signature of **O(n log n)**.
`,
};

export default topic;
