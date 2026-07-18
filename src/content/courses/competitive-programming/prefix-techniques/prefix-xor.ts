import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "prefix-xor",
  title: "Prefix XOR",
  description: "Range XOR queries in O(1) using the XOR-cancellation trick.",
  readingTime: 3,
  content: `
# Prefix XOR

## Theory

Because \`x XOR x = 0\` and XOR is associative and commutative, prefix sums work for XOR too:

\`\`\`
p[0] = 0
p[i] = a[0] ^ a[1] ^ ... ^ a[i - 1]
xorRange(l, r) = p[r + 1] ^ p[l]
\`\`\`

- Preprocessing: **O(n)**.
- Query: **O(1)**.

### Uses

- Range XOR queries.
- Counting subarrays whose XOR equals \`k\` (equivalent to \`prefix[i] ^ prefix[j] = k\` — solvable with a hash map).
- Basic step for Gaussian elimination over GF(2), linear basis problems.
- CTF-style "find the missing/duplicated value in the array".

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {5, 2, 9, 4, 1};
    int n = a.size();
    vector<int> p(n + 1, 0);
    for (int i = 0; i < n; ++i) p[i + 1] = p[i] ^ a[i];

    auto rangeXor = [&](int l, int r) { return p[r + 1] ^ p[l]; };
    cout << rangeXor(1, 3) << "\\n";      // 2 ^ 9 ^ 4 = 15

    // Number of subarrays with XOR == k.
    int k = 6;
    unordered_map<int, long long> cnt{{0, 1}};
    long long ans = 0;
    for (int i = 0; i < n; ++i) {
        ans += cnt[p[i + 1] ^ k];
        ++cnt[p[i + 1]];
    }
    cout << ans << "\\n";
}
\`\`\`
`,
};

export default topic;
