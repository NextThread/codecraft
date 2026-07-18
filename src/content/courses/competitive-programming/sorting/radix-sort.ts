import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "radix-sort",
  title: "Radix Sort",
  description: "Sort integers digit by digit using stable counting sort.",
  readingTime: 4,
  content: `
# Radix Sort

## Theory

**Radix sort** sorts integers by processing them digit-by-digit, from the least significant digit (LSD) to the most significant, using a **stable** sort (usually counting sort) at each digit.

- Time: **O(d * (n + b))** where \`d\` is the number of digits and \`b\` is the base.
- Space: **O(n + b)**.
- **Stable**.
- Very fast for 32/64-bit integers when implemented with byte-sized radix.

### Choosing the base

- \`b = 10\` — easy to understand, slow.
- \`b = 256\` (one byte) — 4 passes for 32-bit ints, extremely fast.
- \`b = 65536\` — 2 passes for 32-bit but needs a big counting array.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

void countingByDigit(vector<int>& a, int exp) {
    int n = a.size();
    vector<int> out(n), cnt(10, 0);
    for (int x : a) ++cnt[(x / exp) % 10];
    for (int i = 1; i < 10; ++i) cnt[i] += cnt[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        int d = (a[i] / exp) % 10;
        out[--cnt[d]] = a[i];
    }
    a = move(out);
}

void radixSort(vector<int>& a) {
    if (a.empty()) return;
    int mx = *max_element(a.begin(), a.end());
    for (int exp = 1; mx / exp > 0; exp *= 10)
        countingByDigit(a, exp);
}

int main() {
    vector<int> a = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(a);
    for (int x : a) cout << x << ' ';   // 2 24 45 66 75 90 170 802
}
\`\`\`
`,
};

export default topic;
