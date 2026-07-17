import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "pigeonhole-principle",
  title: "Pigeonhole Principle",
  description: "Pigeonhole Principle \u00e2\u0080\u0094 theory and C++17 implementation.",
  readingTime: 4,
  content: `
# Pigeonhole Principle

## Theory

The **pigeonhole principle** (PHP) says: if you put \`n + 1\` items into \`n\` boxes, at least one box has \`>= 2\` items. More generally, if \`n\` items are placed into \`k\` boxes, some box has at least \`ceil(n / k)\` items.

### Why it matters

PHP is a **proof technique**, not usually an algorithm — it lets you argue that certain patterns *must* exist, which then guides the algorithm.

### Classic applications

- **Subarray-sum equals target modulo n:** consider prefix sums \`S_0, S_1, ..., S_n\` modulo \`n\`. There are \`n + 1\` sums and only \`n\` residues, so two are equal — the subarray between them sums to a multiple of \`n\`.
- **Two people with the same number of friends** in any group of \`n\` people.
- **In any 6 people, either 3 are mutual friends or 3 are mutual strangers** — Ramsey R(3,3) = 6, proved with PHP.
- **Birthday paradox** — probability argument built on PHP.
- **Bounding solutions**: in a set of \`n + 1\` integers in \`[1, 2n]\`, two must be coprime; two must be such that one divides the other.

### CP recipe

When a problem says "prove some structure always exists" or asks for such a structure inside guaranteed-large input, think PHP first. The construction is often a **prefix-sum + modular residue** trick.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Given an array of size n, find a contiguous subarray whose sum is divisible by n.
// Existence guaranteed by pigeonhole on prefix sums modulo n.
pair<int, int> subarrayDivisibleByN(const vector<int> &a) {
    int n = a.size();
    vector<int> firstIndex(n, -2);
    firstIndex[0] = -1;              // empty prefix has sum 0
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
        int r = ((s % n) + n) % n;
        if (firstIndex[r] != -2) return {firstIndex[r] + 1, i};
        firstIndex[r] = i;
    }
    return {-1, -1};                 // never happens
}

int main() {
    vector<int> a = {3, 1, 7, 2, 9};
    auto [l, r] = subarrayDivisibleByN(a);
    cout << "subarray [" << l << ", " << r << "] sums to a multiple of "
         << a.size() << "\\n";
}
\`\`\`
`,
};

export default topic;
