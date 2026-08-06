import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "stack",
  title: "Stack",
  description: "LIFO container and the monotonic-stack pattern.",
  readingTime: 5,
  content: `

# Stack

## Theory

A **stack** is a Last-In-First-Out container: you only touch the top.

- `push(x)` — add on top — O(1)
- `pop()` — remove top — O(1)
- `top()` — inspect top — O(1)

It can be implemented over an array (index of the top) or a linked list. In C++ use `std::stack<T>` (adapter over `deque` by default) or simply a `vector` with `push_back`/`pop_back`, which is faster.

### Where stacks appear

- **Function calls / recursion** — the call stack; any recursion can be simulated with an explicit stack.
- **Balanced brackets**, expression parsing, infix → postfix (shunting-yard), postfix evaluation.
- **Monotonic stack** — keep elements in increasing or decreasing order to answer, in total **O(n)**:
  - Next / previous greater or smaller element
  - Largest rectangle in a histogram
  - Stock span, trapping rain water, sum of subarray minimums
- **DFS**, iterative tree traversals, undo history.

### Monotonic stack idea

Scan left to right; before pushing `a[i]`, pop everything that can no longer be an answer (e.g. all elements `<= a[i]` when looking for the next greater element). Each element is pushed and popped at most once → amortized O(1) per element.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// next strictly greater element to the right; -1 if none
vector<int> nextGreater(const vector<int>& a) {
    int n = a.size();
    vector<int> res(n, -1);
    stack<int> st;                       // stores indices, values decreasing
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && a[st.top()] < a[i]) {
            res[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}

bool balanced(const string& s) {
    stack<char> st;
    string open = "([{", close = ")]}";
    for (char c : s) {
        if (open.find(c) != string::npos) st.push(c);
        else {
            size_t k = close.find(c);
            if (k == string::npos) continue;
            if (st.empty() || st.top() != open[k]) return false;
            st.pop();
        }
    }
    return st.empty();
}

// largest rectangle in a histogram — O(n)
long long largestRectangle(vector<int> h) {
    h.push_back(0);                      // sentinel flushes the stack
    stack<int> st;
    long long best = 0;
    for (int i = 0; i < (int)h.size(); ++i) {
        while (!st.empty() && h[st.top()] >= h[i]) {
            int height = h[st.top()]; st.pop();
            int left = st.empty() ? -1 : st.top();
            best = max(best, 1LL * height * (i - left - 1));
        }
        st.push(i);
    }
    return best;
}

int main() {
    vector<int> a = {2, 1, 5, 6, 2, 3};
    for (int x : nextGreater(a)) cout << x << ' ';    // 5 5 6 -1 3 -1
    cout << '\n';
    cout << balanced("{[()]}") << '\n';               // 1
    cout << largestRectangle(a) << '\n';              // 10
}
```
`,
};

export default topic;
