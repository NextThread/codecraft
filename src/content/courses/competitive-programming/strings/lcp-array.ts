import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "lcp-array",
  title: "LCP Array",
  description: "Longest common prefix between consecutive suffixes in a suffix array, computed in O(n) via Kasai's algorithm.",
  readingTime: 10,
  content: `
# LCP Array

## Theory

### What it is
Given a suffix array SA of string s, the **LCP array** stores, for each i from 1 to n-1, the length of the longest common prefix (LCP) between the suffixes \`s[SA[i-1]..]\` and \`s[SA[i]..]\` (adjacent suffixes in sorted order). By convention \`lcp[0] = 0\` (or undefined). This is the crucial companion structure to a suffix array -- it turns a sorted list of suffixes into a tool for computing arbitrary-pair LCPs, counting distinct substrings, and much more.

### Why it matters
Adjacent suffixes in sorted order tend to share long prefixes, and crucially, the LCP of *any two* suffixes (not just adjacent ones) equals the **minimum** of the LCP array over the range between their positions in the SA:
\`LCP(suffix at rank i, suffix at rank j) = min(lcp[i+1], lcp[i+2], ..., lcp[j])\` for i < j.
This is because sorted order means any suffix strictly between two others in rank shares at least the common prefix of the endpoints. So with an LCP array plus a **sparse table for range-minimum queries (RMQ)**, you can answer LCP between arbitrary suffix pairs in O(1) after O(n log n) preprocessing.

### Core idea: Kasai's algorithm (O(n))
Computing LCP naively (comparing each adjacent SA pair by re-walking characters) is O(n^2) worst case. **Kasai's algorithm** computes it in O(n) using the key insight: if suffix i has LCP h with its predecessor in sorted order, then suffix i+1's LCP with its own predecessor is at least h-1. So we process suffixes in **original index order** (i = 0..n-1, not SA order), maintaining a running height h that only decreases by at most 1 each step (never reset to 0 unnecessarily), giving amortized O(n) total character comparisons.

Steps:
1. Compute \`rank[i]\` = position of suffix i in the SA (inverse of SA).
2. For i = 0 to n-1: if \`rank[i] > 0\`, let j = SA[rank[i]-1] (the suffix right before i in sorted order). Extend h by comparing \`s[i+h]\` and \`s[j+h]\` while they match. Set \`lcp[rank[i]] = h\`. Decrease h by 1 (if h>0) before moving to next i.
3. If \`rank[i] == 0\`, reset h = 0 (suffix i is the lexicographically smallest, no predecessor).

### Key observations
- The "h decreases by at most 1 per step" trick is what makes total work O(n): h can increase arbitrarily within a step but the total decrease across all steps is bounded by n, so total increase is also bounded by n + n.
- LCP array + RMQ sparse table => O(1) LCP(i, j) for any two suffixes given their ranks -- foundation for many advanced suffix-array algorithms (longest common substring of many strings, counting occurrences, finding repeats, suffix array-based longest palindromic substring, string matching).
- Longest repeated substring in s = maximum value anywhere in the LCP array (and the actual substring can be recovered from the corresponding SA position and length).
- Number of distinct substrings of s = \`sum_i (n - SA[i]) - sum_i lcp[i]\` -- each suffix contributes (n - SA[i]) possible prefixes (substrings starting there), minus the overlap already counted via shared prefixes with the previous suffix in sorted order.
- Building LCP array requires SA and its inverse (rank array) already computed.

### Complexity
- Kasai's algorithm: O(n) time, O(n) space, given SA and rank arrays.
- RMQ sparse table on top: O(n log n) preprocessing, O(1) per query.

### When to use
- Any time you have a suffix array and need LCP between suffixes: distinct substring counting, longest repeated substring, longest common substring (via generalized SA on concatenated strings with separators + LCP + tracking source string), pattern matching counts, suffix-array based string algorithms in general.

### Small example
s = "banana", SA = [5,3,1,0,4,2] (suffixes "a","ana","anana","banana","na","nana"). LCP array (aligned to SA order) = [0,1,3,0,0,2]: e.g., LCP("ana","anana") = 3 ("ana" is a full prefix match length 3).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Assumes you already have: string s, suffix array sa (size n, permutation of 0..n-1).
// Kasai's algorithm computes lcp[i] = LCP(s[sa[i-1]..], s[sa[i]..]) for i = 1..n-1, lcp[0] = 0.
vector<int> kasaiLCP(const string &s, const vector<int> &sa) {
    int n = (int)s.size();
    vector<int> rank_(n), lcp(n, 0);
    for (int i = 0; i < n; i++) rank_[sa[i]] = i;

    int h = 0;
    for (int i = 0; i < n; i++) {
        if (rank_[i] > 0) {
            int j = sa[rank_[i] - 1];
            while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
            lcp[rank_[i]] = h;
            if (h > 0) h--;
        } else {
            h = 0;
        }
    }
    return lcp;
}

// Sparse table for O(1) range-minimum queries on the LCP array,
// enabling O(1) LCP(rank_i, rank_j) for arbitrary suffix pairs.
struct SparseTableMin {
    vector<vector<int>> table;
    vector<int> logTable;

    void build(const vector<int> &arr) {
        int n = (int)arr.size();
        logTable.assign(n + 1, 0);
        for (int i = 2; i <= n; i++) logTable[i] = logTable[i / 2] + 1;
        int K = logTable[n] + 1;
        table.assign(K, vector<int>(n));
        table[0] = arr;
        for (int k = 1; k < K; k++) {
            for (int i = 0; i + (1 << k) <= n; i++) {
                table[k][i] = min(table[k - 1][i], table[k - 1][i + (1 << (k - 1))]);
            }
        }
    }

    // min over arr[l..r] inclusive
    int query(int l, int r) {
        int k = logTable[r - l + 1];
        return min(table[k][l], table[k][r - (1 << k) + 1]);
    }
};

// Naive O(n log^2 n) suffix array builder for a self-contained demo.
vector<int> buildSuffixArray(string s) {
    s += '\\0';
    int n = (int)s.size();
    vector<int> sa(n), rnk(n), tmp(n);
    for (int i = 0; i < n; i++) { sa[i] = i; rnk[i] = s[i]; }
    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rnk[a] != rnk[b]) return rnk[a] < rnk[b];
            int ra = (a + k < n) ? rnk[a + k] : -1;
            int rb = (b + k < n) ? rnk[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0);
        rnk = tmp;
        if (rnk[sa[n - 1]] == n - 1) break;
    }
    sa.erase(sa.begin()); // drop sentinel suffix
    return sa;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    int n = (int)s.size();

    vector<int> sa = buildSuffixArray(s);
    vector<int> lcp = kasaiLCP(s, sa);

    cout << "SA: ";
    for (int x : sa) cout << x << " ";
    cout << "\\nLCP: ";
    for (int x : lcp) cout << x << " ";
    cout << "\\n";

    // Longest repeated substring: max lcp value, recovered from corresponding SA entry.
    int bestLen = 0, bestPos = 0;
    for (int i = 1; i < n; i++) {
        if (lcp[i] > bestLen) { bestLen = lcp[i]; bestPos = sa[i]; }
    }
    if (bestLen > 0) cout << "Longest repeated substring: " << s.substr(bestPos, bestLen) << "\\n";

    // Distinct substring count.
    long long distinctCount = 0;
    for (int i = 0; i < n; i++) distinctCount += n - sa[i];
    for (int v : lcp) distinctCount -= v;
    cout << "Distinct substrings: " << distinctCount << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
