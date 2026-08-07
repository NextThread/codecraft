import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "nim",
  title: "Nim",
  description: "The classic impartial game and the XOR (Nim-sum) winning condition.",
  readingTime: 5,
  difficulty: "Medium",
  content: `
# Nim

## Theory

**Nim** is the foundational *impartial* game: both players have exactly the same set of moves from any position, and the player who cannot move loses (this is called *normal play*).

### Rules

- There are \`n\` piles with \`a[0], a[1], ..., a[n-1]\` stones.
- A move: pick **one** pile and remove **any positive number** of stones from it.
- The player who takes the last stone wins (equivalently, the player facing all-empty piles loses).

### Positions

- A position is a **losing position** (P-position, "previous player wins") if *every* move leads to a winning position for the opponent.
- A position is a **winning position** (N-position, "next player wins") if *at least one* move leads to a losing position.

### Bouton's Theorem (the Nim-sum)

Define the **Nim-sum**:

\`\`\`
X = a[0] XOR a[1] XOR ... XOR a[n-1]
\`\`\`

Then:

- \`X == 0\` → the position is **losing** for the player about to move.
- \`X != 0\` → the position is **winning**, and a winning move always exists.

### Why it works

1. *From \`X = 0\`, every move gives \`X != 0\`.* A move changes exactly one pile from \`a\` to \`b\` with \`b < a\`. The new Nim-sum is \`X XOR a XOR b = 0 XOR a XOR b = a XOR b != 0\` since \`a != b\`.

2. *From \`X != 0\`, some move gives \`X = 0\`.* Let \`k\` be the highest set bit of \`X\`. Some pile \`a[i]\` has bit \`k\` set (otherwise \`X\` couldn't). Set \`b = a[i] XOR X\`. Since bit \`k\` flips from 1 to 0 and higher bits are unchanged, \`b < a[i]\`, so removing \`a[i] - b\` stones is legal, and the new Nim-sum is \`X XOR a[i] XOR b = 0\`.

Together these prove that \`X = 0\` positions are exactly the losing ones.

### Example

Piles \`{3, 4, 5}\`: \`3 XOR 4 XOR 5 = 2 != 0\` → first player wins. Highest set bit of 2 is bit 1; pile 3 has it set, so replace 3 with \`3 XOR 2 = 1\`, i.e. remove 2 stones → \`{1, 4, 5}\` with Nim-sum 0.

### Common variants

- **Misère Nim** (taking the last stone *loses*): the first player wins iff either some pile has \`> 1\` stone and \`X != 0\`, or all piles have exactly 1 stone and the number of piles is **even**.
- **Nim with a move limit** (remove at most \`k\` per move from a pile): replace each pile by \`a[i] mod (k + 1)\` and take the XOR.
- **Staircase / Moore's Nim\`_k\`**: generalisations solved by digit-wise sums modulo \`k + 1\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Returns the Nim-sum of the piles.
int nimSum(const vector<int>& piles) {
    int x = 0;
    for (int p : piles) x ^= p;
    return x;
}

// true  -> the player about to move wins (normal play Nim)
bool firstPlayerWins(const vector<int>& piles) {
    return nimSum(piles) != 0;
}

// Finds one winning move: {pileIndex, stonesToRemove}. Returns {-1,-1} if none.
pair<int, int> winningMove(const vector<int>& piles) {
    int x = nimSum(piles);
    if (x == 0) return {-1, -1};                 // losing position
    for (int i = 0; i < (int)piles.size(); ++i) {
        int target = piles[i] ^ x;               // desired new pile size
        if (target < piles[i]) return {i, piles[i] - target};
    }
    return {-1, -1};                             // unreachable
}

// Misere Nim: last player to move LOSES.
bool firstPlayerWinsMisere(const vector<int>& piles) {
    bool anyBig = false;
    for (int p : piles) anyBig |= (p > 1);
    if (anyBig) return nimSum(piles) != 0;
    // All piles are 0 or 1: win iff the count of 1-piles is even.
    int ones = 0;
    for (int p : piles) ones += (p == 1);
    return ones % 2 == 0;
}

int main() {
    vector<int> piles = {3, 4, 5};
    cout << "Nim-sum = " << nimSum(piles) << "\\n";                 // 2
    cout << (firstPlayerWins(piles) ? "First wins\\n" : "Second wins\\n");

    auto [idx, take] = winningMove(piles);
    cout << "Take " << take << " from pile " << idx << "\\n";       // take 2 from pile 0

    cout << (firstPlayerWinsMisere(piles) ? "Misere: first wins\\n"
                                          : "Misere: second wins\\n");
}
\`\`\`
`,
};

export default topic;
