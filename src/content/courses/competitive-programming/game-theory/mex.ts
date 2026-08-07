import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "mex",
  title: "Mex",
  description: "Minimum excludant: definition, O(n) computation, and dynamic mex with a multiset.",
  readingTime: 4,
  difficulty: "Easy",
  content: `
# Mex

## Theory

**mex** (*minimum excludant*) of a finite set of non-negative integers is the smallest non-negative integer **not** in the set.

\`\`\`
mex({})        = 0
mex({0,1,2})   = 3
mex({1,2,3})   = 0
mex({0,1,3,4}) = 2
\`\`\`

### Why it matters

- It is the core of the Grundy/Sprague–Grundy recursion: \`G(v) = mex{G(u) : v -> u}\`.
- It also appears directly in many array problems ("mex of a subarray", "maximise the mex after operations").

### Key observation for arrays

For \`n\` elements, the answer is always in \`[0, n]\`, so values \`> n\` can be ignored. That gives a simple **O(n)** algorithm with a boolean array of size \`n + 1\` — no sorting or hashing needed.

### Dynamic mex (insertions / deletions)

Keep the *candidate* values in a structure of absent numbers:

- Maintain \`cnt[x]\` for \`x <= n\` and a \`set<int> missing\` initialised with \`0..n\`.
- Insert \`x\`: \`++cnt[x]\`; if it became 1, erase \`x\` from \`missing\`.
- Erase \`x\`: \`--cnt[x]\`; if it became 0, insert \`x\` into \`missing\`.
- \`mex = *missing.begin()\` in **O(log n)** per update.

### Complexity summary

| Task | Complexity |
|---|---|
| mex of a static array | O(n) time, O(n) memory |
| mex with insert/erase | O(log n) per operation |
| mex over sliding window / offline queries | O((n + q) log n) with the above + sorting queries |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Static mex in O(n): values greater than n can never be the answer.
int mexOf(const vector<int>& a) {
    int n = a.size();
    vector<bool> seen(n + 2, false);
    for (int x : a)
        if (x >= 0 && x <= n) seen[x] = true;
    for (int i = 0;; ++i)
        if (!seen[i]) return i;
}

// Dynamic mex supporting insert / erase in O(log n).
struct DynamicMex {
    int n;                       // upper bound on tracked values
    vector<int> cnt;
    set<int> missing;

    explicit DynamicMex(int n) : n(n), cnt(n + 2, 0) {
        for (int i = 0; i <= n + 1; ++i) missing.insert(i);
    }

    void insert(int x) {
        if (x < 0 || x > n) return;            // irrelevant for the mex
        if (++cnt[x] == 1) missing.erase(x);
    }

    void erase(int x) {
        if (x < 0 || x > n) return;
        if (--cnt[x] == 0) missing.insert(x);
    }

    int mex() const { return *missing.begin(); }
};

int main() {
    cout << mexOf({0, 1, 2})    << "\\n";       // 3
    cout << mexOf({1, 2, 3})    << "\\n";       // 0
    cout << mexOf({0, 1, 3, 4}) << "\\n";       // 2

    DynamicMex dm(5);
    for (int x : {0, 1, 2, 4}) dm.insert(x);
    cout << dm.mex() << "\\n";                  // 3
    dm.erase(1);
    cout << dm.mex() << "\\n";                  // 1
    dm.insert(1); dm.insert(3);
    cout << dm.mex() << "\\n";                  // 5
}
\`\`\`
`,
};

export default topic;
