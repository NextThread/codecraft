import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "greedy-basics",
  title: "Greedy Basics",
  description: "When a locally optimal choice leads to a globally optimal answer.",
  readingTime: 6,
  content: `

# Greedy Basics

## Theory

A **greedy algorithm** builds the answer step by step, always taking the choice that looks best *right now*, and never reconsidering it.

It is correct only when the problem has:

1. **Greedy choice property** — some optimal solution contains the locally best choice.
2. **Optimal substructure** — after fixing that choice, the rest of the problem is the same problem, smaller.

### How to find the greedy

- Sort by something (value, weight, ratio, deadline, end time) and scan.
- Use a heap to always pull the current best.
- Think in **exchange arguments**: take an optimal solution, swap in your greedy choice, show it is no worse. That is the standard proof technique.

### When greedy fails

0/1 Knapsack with weights — the ratio greedy breaks (need DP). Coin change with arbitrary coin sets — greedy fails for \`{1,3,4}\`, amount 6 (greedy 4+1+1 = 3 coins, optimal 3+3 = 2). Always test small counterexamples before trusting a greedy.

### Classic greedy patterns

| Problem | Greedy rule |
|---|---|
| Fractional knapsack | highest value/weight first |
| Interval scheduling | earliest finishing time |
| Minimum platforms | sweep over sorted events |
| Huffman coding | merge two smallest frequencies |
| Minimize sum of |a_i - x| | pick the median |
| Job sequencing with deadlines | highest profit, latest free slot |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// fractional knapsack: value/weight greedy is provably optimal
double fractionalKnapsack(vector<pair<int,int>> items, double cap) { // (value, weight)
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.first / a.second > (double)b.first / b.second;
    });
    double total = 0;
    for (auto [v, w] : items) {
        if (cap <= 0) break;
        double take = min<double>(w, cap);
        total += v * (take / w);
        cap -= take;
    }
    return total;
}

// minimum number of coins, canonical systems only
int coinsGreedy(vector<int> coins, int amount) {
    sort(coins.rbegin(), coins.rend());
    int cnt = 0;
    for (int c : coins) { cnt += amount / c; amount %= c; }
    return amount == 0 ? cnt : -1;
}

int main() {
    cout << fractionalKnapsack({{60,10},{100,20},{120,30}}, 50) << '\\n'; // 240
    cout << coinsGreedy({1,2,5,10,20,50,100}, 93) << '\\n';              // 5
}
\`\`\`
`,
};

export default topic;
