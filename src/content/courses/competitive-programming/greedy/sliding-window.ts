import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sliding-window",
  title: "Sliding Window",
  description: "Fixed and variable windows, monotonic deque, and window counting tricks.",
  readingTime: 7,
  content: `

# Sliding Window

## Theory

A window \`[l, r]\` slides over the array; you maintain an aggregate incrementally so each step is O(1) amortised.

### Fixed size k

Add \`a[r]\`, remove \`a[r-k]\`. Used for max/avg sum of k consecutive elements, and with a **monotonic deque** for the window minimum/maximum in O(n).

### Variable size (shrinkable)

\`\`\`text
for r in 0..n-1:
    add a[r]
    while window invalid:
        remove a[l]; l++
    answer = max(answer, r - l + 1)
\`\`\`

Works when the predicate is **monotone**: if a window is valid, every sub-window is valid too (or vice-versa). Examples: longest substring without repeats, smallest subarray with sum >= S, at most k distinct characters, longest subarray with at most k zeros.

**Requires non-negative contributions** for the sum variants. With negative numbers use prefix sums + a set/deque instead.

### Counting trick

"Exactly k distinct" = "at most k" − "at most k−1". Same trick for "sum in \`[L, R]\`" and many CF problems.

### Complexity

Each pointer only advances → O(n) time, O(1) or O(alphabet) memory.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// maximum sum of a window of size k
long long maxSumK(const vector<int>& a, int k) {
    long long sum = 0, best = LLONG_MIN;
    for (int i = 0; i < (int)a.size(); ++i) {
        sum += a[i];
        if (i >= k) sum -= a[i - k];
        if (i >= k - 1) best = max(best, sum);
    }
    return best;
}

// smallest window with sum >= S (positive numbers), 0 if none
int minWindowSum(const vector<int>& a, long long S) {
    long long sum = 0;
    int best = INT_MAX, l = 0;
    for (int r = 0; r < (int)a.size(); ++r) {
        sum += a[r];
        while (sum >= S) { best = min(best, r - l + 1); sum -= a[l++]; }
    }
    return best == INT_MAX ? 0 : best;
}

// longest substring with at most k distinct characters
int longestAtMostKDistinct(const string& s, int k) {
    unordered_map<char,int> cnt;
    int l = 0, best = 0;
    for (int r = 0; r < (int)s.size(); ++r) {
        ++cnt[s[r]];
        while ((int)cnt.size() > k)
            if (--cnt[s[l++]] == 0) cnt.erase(s[l - 1]);
        best = max(best, r - l + 1);
    }
    return best;
}

// window maximum with a monotonic deque
vector<int> windowMax(const vector<int>& a, int k) {
    deque<int> dq; vector<int> res;
    for (int i = 0; i < (int)a.size(); ++i) {
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) res.push_back(a[dq.front()]);
    }
    return res;
}

int main() {
    vector<int> a = {2, 1, 5, 1, 3, 2};
    cout << maxSumK(a, 3) << '\\n';                    // 9
    cout << minWindowSum(a, 8) << '\\n';               // 3
    cout << longestAtMostKDistinct("eceba", 2) << '\\n'; // 3
    for (int x : windowMax(a, 3)) cout << x << ' ';    // 5 5 5 3
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
