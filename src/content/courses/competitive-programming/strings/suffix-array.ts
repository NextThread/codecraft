import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "suffix-array",
  title: "Suffix Array",
  description: "A sorted array of all suffixes of a string, built in O(n log n), enabling fast substring queries.",
  readingTime: 12,
  content: `
# Suffix Array

## Theory

### What it is
A **suffix array** SA of a string \`s\` of length n is a permutation of \`0..n-1\` such that \`s[SA[0]..]\`, \`s[SA[1]..]\`, ..., \`s[SA[n-1]..]\` are the suffixes of s sorted in lexicographic order. It's a compact alternative to a suffix tree: same power for many problems, but simpler to implement and more memory-efficient (just an array of ints, plus an LCP array).

### Why it works / core idea
Naive construction: sort all n suffixes with a comparator, O(n^2 log n) since each comparison is O(n). We speed this up with **doubling (prefix doubling)**: 
1. Rank suffixes by their first character (radix sort), giving rank arrays \`rank[i]\` = rank of suffix i by 1-character prefix.
2. At step k (starting k=1, doubling each iteration), rank suffixes by the pair \`(rank[i], rank[i+k])\` (using rank of previous half-length prefix comparison, treating out-of-bounds as -1). Two suffixes' 2k-length prefixes compare exactly as this pair compares, because a 2k-prefix is the concatenation of two k-prefixes.
3. Sort by this pair using radix sort (or just \`sort\` with pair comparator for O(n log^2 n)), assign new ranks; if all ranks are already unique, stop early.
4. After O(log n) doublings, ranks fully order all suffixes -- read off SA from sorted order.

This gives O(n log n) (with radix sort per step) or O(n log^2 n) (with std::sort per step, using a pair comparator) construction. There's also the O(n) SA-IS algorithm, more complex to implement, typically unnecessary in contests.

### Key observations
- Suffix array alone answers: is string P a substring of S? Binary search over SA using suffix comparisons: O(|P| log n).
- Combine with **LCP array** (see LCP Array topic) to get O(1)-amortized answers to longest common prefix between any two suffixes (via sparse table + RMQ), unlocking many advanced queries: counting distinct substrings, finding longest repeated substring, longest common substring between multiple strings (concatenate with separators), string matching, lexicographically smallest rotation, etc.
- To build suffix arrays for multiple strings jointly (e.g., LCS of many strings), concatenate them with distinct separator characters smaller than all alphabet characters, and track which original string each suffix belongs to.
- SA construction is comparison/rank-based, so it naturally supports large alphabets too (treat characters as integers, radix sort accordingly).

### Complexity
- Construction: O(n log n) with radix sort per doubling step (careful implementation), or O(n log^2 n) with std::sort (simpler, fine for n up to ~2*10^5 typically).
- Substring search via binary search: O(|P| log n).
- With LCP + sparse table: O(1) LCP queries after O(n log n) preprocessing.

### When to use
- Substring search (single query pattern against fixed text, or many queries against fixed text -- amortizes better than repeated KMP if text is static and huge).
- Counting distinct substrings: sum over suffixes of (n - SA[i] - LCP[i]).
- Longest repeated substring: max value in LCP array.
- Longest common substring between two/many strings via concatenation trick.
- Lexicographic string comparisons, string sorting problems, Burrows-Wheeler transform, string compression tasks.

### Small example
s = "banana". Suffixes sorted: "a" (i=5), "ana" (i=3), "anana" (i=1), "banana" (i=0), "na" (i=4), "nana" (i=2). SA = [5,3,1,0,4,2]. This ordering plus LCP array unlocks fast substring analytics.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Builds suffix array in O(n log^2 n) using prefix doubling + sort with rank pairs.
// Simple, robust, and fast enough for n up to ~2*10^5 in typical contest time limits.
struct SuffixArray {
    int n;
    string s;
    vector<int> sa, rnk;

    SuffixArray(const string &str) : s(str) {
        n = (int)s.size();
        s += '\\0'; // sentinel smaller than all chars, simplifies boundary handling implicitly
        build();
    }

    void build() {
        int N = (int)s.size(); // includes sentinel
        sa.resize(N);
        rnk.resize(N);
        vector<int> tmp(N);

        for (int i = 0; i < N; i++) {
            sa[i] = i;
            rnk[i] = s[i];
        }

        for (int k = 1; k < N; k <<= 1) {
            auto cmp = [&](int a, int b) {
                if (rnk[a] != rnk[b]) return rnk[a] < rnk[b];
                int ra = (a + k < N) ? rnk[a + k] : -1;
                int rb = (b + k < N) ? rnk[b + k] : -1;
                return ra < rb;
            };
            sort(sa.begin(), sa.end(), cmp);

            tmp[sa[0]] = 0;
            for (int i = 1; i < N; i++) {
                tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0);
            }
            rnk = tmp;

            if (rnk[sa[N - 1]] == N - 1) break; // all ranks distinct, fully sorted
        }

        // remove the sentinel entry (rank 0, index n) from the array we expose
        sa.erase(sa.begin()); // sentinel's suffix (just the sentinel char) is always smallest, index n
        n = (int)s.size() - 1;
        rnk.pop_back(); // not strictly needed but keeps sizes consistent conceptually
    }

    // LCP array using Kasai's algorithm: lcp[i] = LCP(suffix at sa[i-1], suffix at sa[i])
    vector<int> buildLCP() {
        vector<int> lcpArr(n, 0);
        vector<int> rank2(n);
        for (int i = 0; i < n; i++) rank2[sa[i]] = i;

        int h = 0;
        for (int i = 0; i < n; i++) {
            if (rank2[i] > 0) {
                int j = sa[rank2[i] - 1];
                while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
                lcpArr[rank2[i]] = h;
                if (h > 0) h--;
            } else {
                h = 0;
            }
        }
        return lcpArr;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;

    SuffixArray SA(s);
    cout << "Suffix array:\\n";
    for (int idx : SA.sa) cout << idx << " ";
    cout << "\\n";

    vector<int> lcp = SA.buildLCP();
    cout << "LCP array:\\n";
    for (int v : lcp) cout << v << " ";
    cout << "\\n";

    // Example: count distinct substrings = sum(n - sa[i]) - sum(lcp[i])
    long long total = 0;
    int n = (int)s.size();
    for (int i = 0; i < n; i++) total += n - SA.sa[i];
    for (int v : lcp) total -= v;
    cout << "Distinct substrings: " << total << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
