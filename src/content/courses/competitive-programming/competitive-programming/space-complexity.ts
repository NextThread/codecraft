import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "space-complexity",
  title: "Space Complexity",
  description: "How much extra memory an algorithm needs, and how to shrink it.",
  readingTime: 6,
  content: `
# Space Complexity

## What is Space Complexity?

**Space complexity** measures the **extra memory** an algorithm uses as a function of the input size \`n\`, again expressed with Big-O. It includes:

- **Input storage** (sometimes counted separately).
- **Auxiliary space** — arrays, hash maps, recursion stack, etc.

Judges typically give you **256 MB** of memory. Rough sizing:

| Type in C++     | Bytes | 10⁶ items | 10⁸ items |
|-----------------|-------|-----------|-----------|
| \`int\`         | 4     | 4 MB      | 400 MB ❌ |
| \`long long\`   | 8     | 8 MB      | 800 MB ❌ |
| \`char\` / \`bool\` | 1  | 1 MB      | 100 MB    |
| \`double\`      | 8     | 8 MB      | 800 MB ❌ |

## Common space complexities

### O(1) — in-place

Uses a fixed number of variables regardless of input.

\`\`\`cpp
void reverse_inplace(vector<int>& a) {
    int l = 0, r = a.size() - 1;
    while (l < r) swap(a[l++], a[r--]);
}
\`\`\`

### O(n) — proportional

You allocate an array/hash of size \`n\`.

\`\`\`cpp
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + a[i];
\`\`\`

### O(n²) — 2D tables

Common in DP on strings/grids.

\`\`\`cpp
vector<vector<int>> dp(n, vector<int>(n, 0));
\`\`\`

### O(log n) — recursion stack

Divide-and-conquer where each call halves the input, like binary search implemented recursively.

## Recursion uses memory too

Every recursive call pushes a **stack frame**. A recursion of depth \`n\` costs **O(n)** memory even if you allocate nothing yourself. Deep recursion (\`n = 10⁶\`) can cause **stack overflow** — convert to iteration or increase stack size.

## Time–Space tradeoff

You can often **trade memory for speed** (memoization/DP) or **memory for simpler code** (hash maps instead of clever math).

Example — Fibonacci:

- Naive recursion: **O(2ⁿ) time**, **O(n) space** (call stack).
- Memoized:       **O(n) time**,   **O(n) space**.
- Two variables:  **O(n) time**,   **O(1) space**.

\`\`\`cpp
// O(1) space Fibonacci
long long fib(int n) {
    long long a = 0, b = 1;
    for (int i = 0; i < n; ++i) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return a;
}
\`\`\`

## Rule of thumb

- Prefer \`vector<int>\` over \`vector<vector<int>>\` when a 1D layout works.
- Use \`bitset<N>\` for boolean arrays — **8× less memory** than \`bool[]\`.
- Reuse rolling arrays in DP (\`dp[i]\` only depends on \`dp[i-1]\` → two rows are enough).
`,
};

export default topic;
