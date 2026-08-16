import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sqrt-decomposition",
  title: "Sqrt Decomposition",
  description: "Block-based decomposition for range queries and updates in O(sqrt n).",
  readingTime: 7,
  content: `

# Sqrt Decomposition

## Theory

**Sqrt decomposition** splits an array of size \`n\` into about \`sqrt(n)\` contiguous blocks of size \`~sqrt(n)\`. Each block stores an aggregate (sum, min, max, ...) of its elements. Queries and updates that touch a range are answered by combining:

- **full blocks** entirely inside the range — use the precomputed aggregate, O(1) per block
- **partial blocks** at the two ends — iterate element by element, O(sqrt n) total

Since there are O(sqrt n) blocks, both operations cost **O(sqrt n)**.

### Why it works

Any range \`[l, r]\` touches at most two partial blocks (the first and last) and a contiguous run of full blocks in between. Recomputing a block's aggregate after a point update is O(block size) = O(sqrt n), and scanning full blocks is O(n / block size) = O(sqrt n). Choosing block size = sqrt(n) balances the two costs.

### Key observations

- Simpler to implement and reason about than a segment tree, and very flexible: the "aggregate" can be anything associative, or even something non-associative handled with per-block brute force (e.g. counting distinct values, storing a sorted copy of the block).
- Supports **range update + range query** with lazy tags per block (e.g. a block-level "add x to all" flag).
- Generalizes to 2D grids, to offline query batching (Mo's algorithm), and to "block size tuning" where update block size and query block size differ.
- Complexity: O(sqrt n) per operation, O(n) preprocessing, O(n) memory.

### When to use

- When a segment tree would work but is overkill or hard to make lazy (e.g. per-block brute-force operations like "assign value v to range" combined with "count elements equal to x").
- Offline problems where sqrt-decomposition of the *query order* (Mo's algorithm) is the real technique.
- Quick contest-time implementation when correctness matters more than the extra log factor.

### Small example

Array \`[1,2,3,4,5,6,7,8,9]\`, block size 3 -> blocks \`[1,2,3] [4,5,6] [7,8,9]\` with sums \`6, 15, 24\`.
Query sum(2,7) (1-indexed): partial block1 elements 2,3 (=5) + full block2 (=15) + partial block3 element 7 (=7) => 27.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct SqrtDecomposition {
    int n, blockSize, numBlocks;
    vector<long long> a;       // underlying array (1-indexed unused; 0-indexed here)
    vector<long long> blockSum;

    explicit SqrtDecomposition(vector<long long> arr) : a(move(arr)) {
        n = (int)a.size();
        blockSize = max(1, (int)sqrt((double)n));
        numBlocks = (n + blockSize - 1) / blockSize;
        blockSum.assign(numBlocks, 0);
        for (int i = 0; i < n; ++i) blockSum[i / blockSize] += a[i];
    }

    void update(int idx, long long val) {          // a[idx] = val, 0-indexed
        blockSum[idx / blockSize] += val - a[idx];
        a[idx] = val;
    }

    // sum of a[l..r], inclusive, 0-indexed
    long long query(int l, int r) const {
        long long res = 0;
        int startBlock = l / blockSize, endBlock = r / blockSize;
        if (startBlock == endBlock) {
            for (int i = l; i <= r; ++i) res += a[i];
            return res;
        }
        // left partial block
        for (int i = l; i < (startBlock + 1) * blockSize; ++i) res += a[i];
        // full blocks
        for (int b = startBlock + 1; b < endBlock; ++b) res += blockSum[b];
        // right partial block
        for (int i = endBlock * blockSize; i <= r; ++i) res += a[i];
        return res;
    }
};

int main() {
    vector<long long> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    SqrtDecomposition sd(arr);
    cout << sd.query(1, 6) << '\\n';   // indices 1..6 -> 2+3+4+5+6+7 = 27
    sd.update(3, 100);                 // a[3] = 100 (was 4)
    cout << sd.query(1, 6) << '\\n';   // 2+3+100+5+6+7 = 123
}
\`\`\`
`,
};

export default topic;
