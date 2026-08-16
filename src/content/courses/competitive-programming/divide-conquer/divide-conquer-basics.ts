import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "divide-conquer-basics",
  title: "Divide & Conquer Basics",
  description: "The core paradigm of splitting a problem into subproblems, solving recursively, and combining results.",
  readingTime: 8,
  content: \`
# Divide & Conquer Basics

## Theory

**Divide and Conquer (D&C)** is an algorithmic paradigm that solves a problem by:

1. **Divide** — split the problem into smaller subproblems of the same type.
2. **Conquer** — solve the subproblems recursively (base case solved directly).
3. **Combine** — merge the subproblem solutions into a solution for the original problem.

### Why it works

Many problems have optimal-substructure: the answer to the whole can be built from
answers to independent (or nearly independent) parts. By recursing until subproblems
become trivial, we avoid solving the full problem "in one shot" and instead exploit
recursive structure — often turning an O(n^2) brute force into O(n log n).

### Core idea

If a problem of size n can be split into \\(a\\) subproblems each of size \\(n/b\\), and combining
costs \\(f(n)\\), the recurrence is:

\\[ T(n) = a\\,T(n/b) + f(n) \\]

The **Master Theorem** solves this class of recurrences:

- If \\(f(n) = O(n^{\\log_b a - \\epsilon})\\) then \\(T(n) = \\Theta(n^{\\log_b a})\\).
- If \\(f(n) = \\Theta(n^{\\log_b a})\\) then \\(T(n) = \\Theta(n^{\\log_b a} \\log n)\\).
- If \\(f(n) = \\Omega(n^{\\log_b a + \\epsilon})\\) (and regularity holds) then \\(T(n) = \\Theta(f(n))\\).

Example: merge sort has \\(a=2, b=2, f(n)=O(n)\\), so \\(\\log_b a = 1\\) matches case 2 →
\\(T(n) = \\Theta(n \\log n)\\).

### Key observations

- Subproblems should ideally be **independent** — no shared mutable state, so they can even
  be solved in parallel.
- The **combine** step is often the trickiest and most creative part (e.g. merging two sorted
  halves, merging convex hulls, counting cross-inversions).
- D&C differs from plain recursion: it specifically reduces problem *size*, not just problem
  *state*, and typically halves (or divides by a constant factor) each level, giving O(log n) depth.
- Contrast with **Dynamic Programming**: DP also breaks into subproblems but they *overlap*
  and are memoized; classic D&C subproblems are usually disjoint, so no memo table is needed.

### Classic applications

- Sorting: merge sort, quicksort.
- Searching: binary search and its variants.
- Fast exponentiation (a^n in O(log n)).
- Closest pair of points, convex hull.
- Inversion counting, D&C on arrays/trees, D&C optimization for DP.
- Matrix multiplication (Strassen's algorithm), FFT.

### Complexity

Depends on the recurrence; typical shapes are \\(O(n \\log n)\\) (merge sort style) or
\\(O(\\log n)\\) (binary search / fast power style).

### When to use

- The problem naturally splits into independent halves/parts.
- A brute-force combine step is cheap relative to solving the whole problem directly.
- You need to beat quadratic complexity and the problem exhibits recursive structure.

### Small conceptual example: fast exponentiation

To compute \\(a^n\\):

- Divide: \\(a^n = a^{n/2} \\cdot a^{n/2}\\) (times an extra \\(a\\) if n is odd).
- Conquer: compute \\(a^{n/2}\\) recursively.
- Combine: multiply the two halves (and adjust for parity).

This turns an O(n) loop into O(log n) multiplications.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// --- Generic D&C template: fast exponentiation (a^n mod m) ---
long long binPow(long long a, long long n, long long mod) {
    if (n == 0) return 1 % mod;               // base case
    long long half = binPow(a, n / 2, mod);   // divide + conquer
    long long result = (half * half) % mod;   // combine
    if (n % 2 == 1) result = (result * (a % mod)) % mod;
    return result;
}

// --- Generic D&C template: merge sort (classic skeleton) ---
void mergeSort(vector<int>& a, int lo, int hi, vector<int>& buf) {
    if (hi - lo <= 1) return;                 // base case: 0 or 1 element
    int mid = (lo + hi) / 2;
    mergeSort(a, lo, mid, buf);               // conquer left half
    mergeSort(a, mid, hi, buf);               // conquer right half

    // combine: merge two sorted halves [lo,mid) and [mid,hi)
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) buf[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i < mid) buf[k++] = a[i++];
    while (j < hi)  buf[k++] = a[j++];
    for (int t = lo; t < hi; t++) a[t] = buf[t];
}

int main() {
    // fast power demo
    cout << binPow(3, 13, 1000000007) << "\\n"; // 3^13

    // merge sort demo
    vector<int> v = {5, 2, 9, 1, 5, 6};
    vector<int> buf(v.size());
    mergeSort(v, 0, (int)v.size(), buf);
    for (int x : v) cout << x << ' ';
    cout << "\\n";
    return 0;
}
\`\`\`
\`,
};

export default topic;
