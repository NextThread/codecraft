import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "recursion-basics",
  title: "Recursion Basics",
  description: "Understand how functions calling themselves solve problems, with base cases, call stacks, and complexity.",
  readingTime: 8,
  content: `
# Recursion Basics

## Theory

### What is recursion?

Recursion is a technique where a function solves a problem by calling itself on smaller subproblems, until it reaches a case simple enough to solve directly (the **base case**). Every recursive solution has two parts:

1. **Base case(s)** — the smallest input(s) that can be answered directly, without further recursive calls. Without this, recursion never stops.
2. **Recursive case** — the function expresses the answer for the current input in terms of the answer(s) to smaller input(s), then combines them.

### Why it works

Recursion works because of **mathematical induction**: if you can solve the base case, and you can build a solution for size \`n\` assuming you already have solutions for smaller sizes, then by induction you can solve every size. The computer implements this using a **call stack**: each call to the function pushes a new stack frame (local variables, return address) on top of the stack. When a call hits the base case, it returns a value, and each pending frame resumes, combines results, and returns in turn (LIFO order).

### Core idea

Think "trust the recursion": assume the recursive call already correctly solves the smaller subproblem, and just focus on how to combine that result with the current level's work. Do not try to mentally unroll the entire call tree.

### Key observations

- Every recursive call must move strictly toward the base case (e.g., decreasing \`n\`, shrinking an array, removing an element) or it will recurse forever (stack overflow).
- The call stack has a size limit (typically default stack lets you go a few times 10^4 to 10^5 deep in C++ depending on frame size); very deep recursion needs iterative conversion or increased stack size.
- Recursion trades memory (call stack space) for simpler code that maps directly onto a problem's recursive structure (trees, divide and conquer, backtracking).
- **Time complexity**: count total number of calls times work per call. For linear recursion (one recursive call per level) touching each element once, it's O(n). For recursion with multiple branches (like Fibonacci naive), complexity can blow up exponentially unless memoized.
- **Space complexity**: dominated by maximum recursion depth (the "height" of the call tree), since only one root-to-leaf path is on the stack at any moment.

### When to use

- Problems with a naturally recursive/self-similar structure: trees, divide-and-conquer (merge sort, quicksort), backtracking/exhaustive search, mathematical recurrences (factorial, Fibonacci, GCD), and traversing nested structures.
- When an iterative version would need you to manually manage a stack anyway — recursion often reads cleaner.

### Conceptual example

Factorial: \`fact(n) = 1\` if \`n == 0\` (base case), otherwise \`fact(n) = n * fact(n-1)\`.

Call stack for \`fact(4)\`:
\`\`\`
fact(4) calls fact(3) calls fact(2) calls fact(1) calls fact(0) -> returns 1
fact(1) returns 1*1 = 1
fact(2) returns 2*1 = 2
fact(3) returns 3*2 = 6
fact(4) returns 4*6 = 24
\`\`\`
Each frame waits for its child to finish, then does its own combining work (multiplication) before returning.

### Complexity summary

| Aspect | Factorial-style linear recursion |
|---|---|
| Time | O(n) |
| Space (call stack) | O(n) |

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Simple linear recursion: factorial
long long fact(int n) {
    if (n == 0) return 1;          // base case
    return (long long)n * fact(n - 1); // recursive case: trust fact(n-1)
}

// Recursion over an array: sum of elements
long long sumArray(const vector<int>& a, int idx) {
    if (idx == (int)a.size()) return 0;     // base case: past the end
    return a[idx] + sumArray(a, idx + 1);   // combine current element with rest
}

// Recursion with two branches: naive Fibonacci (exponential time, shown for contrast)
long long fibNaive(int n) {
    if (n <= 1) return n;                   // base cases: fib(0)=0, fib(1)=1
    return fibNaive(n - 1) + fibNaive(n - 2); // two recursive calls -> O(2^n)
}

int main() {
    cout << "5! = " << fact(5) << "\\n";

    vector<int> a = {1, 2, 3, 4, 5};
    cout << "sum = " << sumArray(a, 0) << "\\n";

    cout << "fib(10) = " << fibNaive(10) << "\\n";
    return 0;
}
\`\`\`
`,
};

export default topic;
