import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "permutations",
  title: "Permutations",
  description: "Permutations \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Permutations

## Theory

A **permutation** is an ordered arrangement of a set of objects.

### Counting

- Permutations of \`n\` distinct items: \`n!\`
- k-permutations of \`n\`: \`P(n, k) = n! / (n - k)!\` — pick \`k\` items and order them.
- With repetition allowed, choosing \`k\` out of \`n\` types with order: \`n^k\`.
- Permutations of a multiset with counts \`a1, a2, ...\`: \`n! / (a1! a2! ... )\`.

### Generating permutations

- **\`std::next_permutation\`** — walks lexicographically in \`O(n)\` per step. Great for brute-force over small \`n\`.
- **Heap's algorithm** — generates all \`n!\` permutations with a single swap per step; useful when you must visit each.

### Cycle decomposition

Every permutation of \`{1..n}\` decomposes into disjoint **cycles**. The order (as a group element) is the LCM of cycle lengths — useful for problems that ask "after how many applications does everything return to its start?"

### Random permutation

**Fisher-Yates shuffle** produces a uniformly random permutation in \`O(n)\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Enumerate all permutations of a vector using next_permutation.
void printAllPermutations(vector<int> v) {
    sort(v.begin(), v.end());
    do {
        for (int x : v) cout << x << ' ';
        cout << '\\n';
    } while (next_permutation(v.begin(), v.end()));
}

// Fisher-Yates shuffle — uniform random permutation.
void shuffle(vector<int> &v) {
    static mt19937 rng((uint32_t)chrono::steady_clock::now().time_since_epoch().count());
    for (int i = (int)v.size() - 1; i > 0; i--) {
        int j = uniform_int_distribution<int>(0, i)(rng);
        swap(v[i], v[j]);
    }
}

// Order of a permutation = LCM of cycle lengths.
long long permutationOrder(const vector<int> &p) {
    int n = p.size();
    vector<char> seen(n, false);
    long long order = 1;
    for (int i = 0; i < n; i++) if (!seen[i]) {
        int len = 0, j = i;
        while (!seen[j]) { seen[j] = true; j = p[j]; len++; }
        order = order / __gcd(order, (long long)len) * len;
    }
    return order;
}

int main() {
    printAllPermutations({1, 2, 3});
    cout << permutationOrder({1, 2, 0, 4, 3}) << "\\n"; // lcm(3,2)=6
}
\`\`\`
`,
};

export default topic;
