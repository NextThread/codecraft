import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "two-pointers",
  title: "Two Pointers",
  description: "Linear scans with two indices: pair sums, dedup, merging, partitioning.",
  readingTime: 6,
  content: `

# Two Pointers

## Theory

Keep **two indices** moving over one or two sequences so that the total work stays O(n) instead of O(n^2). Two flavours:

### Opposite ends (converging)

Requires a **sorted** array or a monotone predicate.

- Pair with a given sum: if \`a[i] + a[j] > target\` decrease \`j\`, else increase \`i\`.
- Container with most water, palindrome check, reverse in place, 3-sum (fix one, two-point the rest → O(n^2)).

### Same direction (fast/slow)

- **Remove duplicates / partition in place** (\`slow\` writes, \`fast\` reads).
- **Merge two sorted arrays**, intersection of sorted lists, \`std::merge\`-like sweeps.
- **Cycle detection in a linked list** (Floyd tortoise and hare).
- Sliding window is the same-direction variant with a shrink loop (its own topic).

### Correctness intuition

Each pointer moves only forward (or only backward), so at most \`2n\` moves. Prove that skipping a state can never discard the optimum — typically because the array is sorted or the objective is monotone in the pointer.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// pair with given sum in a sorted array
pair<int,int> twoSumSorted(const vector<int>& a, int target) {
    int i = 0, j = a.size() - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s == target) return {i, j};
        s < target ? ++i : --j;
    }
    return {-1, -1};
}

// count pairs with a[i] + a[j] <= limit
long long countPairs(vector<int> a, int limit) {
    sort(a.begin(), a.end());
    long long cnt = 0;
    for (int i = 0, j = a.size() - 1; i < j; ) {
        if (a[i] + a[j] <= limit) { cnt += j - i; ++i; }
        else --j;
    }
    return cnt;
}

// in-place dedup of a sorted array, returns new length
int dedup(vector<int>& a) {
    if (a.empty()) return 0;
    int slow = 0;
    for (int fast = 1; fast < (int)a.size(); ++fast)
        if (a[fast] != a[slow]) a[++slow] = a[fast];
    return slow + 1;
}

// merge two sorted vectors
vector<int> mergeSorted(const vector<int>& a, const vector<int>& b) {
    vector<int> res;
    size_t i = 0, j = 0;
    while (i < a.size() && j < b.size()) res.push_back(a[i] <= b[j] ? a[i++] : b[j++]);
    while (i < a.size()) res.push_back(a[i++]);
    while (j < b.size()) res.push_back(b[j++]);
    return res;
}

int main() {
    vector<int> a = {1, 2, 4, 7, 11, 15};
    auto [i, j] = twoSumSorted(a, 15);
    cout << i << ' ' << j << '\\n';                       // 1 5
    cout << countPairs({1,2,3,4,5}, 6) << '\\n';           // 7
    vector<int> d = {1,1,2,2,2,3};
    cout << dedup(d) << '\\n';                             // 3
    for (int x : mergeSorted({1,4,9}, {2,3,10})) cout << x << ' ';
    cout << '\\n';                                          // 1 2 3 4 9 10
}
\`\`\`
`,
};

export default topic;
