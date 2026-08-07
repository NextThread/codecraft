import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "sprague-grundy",
  title: "Sprague-Grundy",
  description: "Every impartial game equals a Nim pile; sums of games XOR their Grundy values.",
  readingTime: 5,
  difficulty: "Hard",
  content: `
# Sprague-Grundy

## Theory

The **Sprague–Grundy theorem** is the bridge between arbitrary impartial games and Nim.

> Every finite impartial game under normal play is equivalent to a single Nim pile of size \`G\`, where \`G\` is the game's Grundy number.

### Sum of games

If a position consists of several **independent** sub-games played simultaneously (a move affects exactly one sub-game), the Grundy number of the whole is the XOR of the parts:

\`\`\`
G(g1 + g2 + ... + gk) = G(g1) XOR G(g2) XOR ... XOR G(gk)
\`\`\`

Hence:

- XOR \`= 0\` → the player to move **loses**.
- XOR \`!= 0\` → the player to move **wins**, and a winning move is found exactly as in Nim: pick a component whose Grundy value has the top set bit of the total, and move it to Grundy value \`G(gi) XOR total\`.

Nim itself is the special case where a pile of \`k\` stones has Grundy number \`k\`.

### Recipe for contest problems

1. Check the game is *impartial* (same moves for both) and *finite/acyclic*, normal play.
2. Split the position into independent components.
3. Compute each component's Grundy number (brute force small values, then look for a pattern/period or closed form).
4. XOR them; non-zero means the first player wins.

### Classic examples

- **Staircase Nim**: only coins on odd-indexed steps matter; XOR them.
- **Green Hackenbush on trees**: Grundy of a branch = XOR of \`(child Grundy + 1)\`.
- **Cutting/splitting games**: a move may split one component into two — the resulting Grundy value is the XOR of the two pieces, then take the mex over all options.

### Caveats

- The theorem needs **normal play**. Misère games need separate theory (e.g. misère Nim).
- It needs **impartial** games; partizan games use Surreal/Combinatorial Game Theory instead.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int mex(const vector<int>& s) {
    vector<bool> seen(s.size() + 1, false);
    for (int x : s) if (x <= (int)s.size()) seen[x] = true;
    for (int i = 0;; ++i) if (!seen[i]) return i;
}

// Example game: a pile of n may either lose 1..3 stones,
// or be SPLIT into two non-empty piles (a composite move).
const int N = 60;
vector<int> g(N + 1, -1);

int grundy(int n) {
    if (n == 0) return 0;
    if (g[n] != -1) return g[n];
    g[n] = 0;                                   // recursion guard
    vector<int> opts;
    for (int take = 1; take <= 3 && take <= n; ++take)
        opts.push_back(grundy(n - take));
    for (int a = 1; a < n; ++a)                 // split n -> a + (n-a)
        opts.push_back(grundy(a) ^ grundy(n - a));
    return g[n] = mex(opts);
}

// Sum of independent games: XOR of their Grundy values.
int totalGrundy(const vector<int>& piles) {
    int x = 0;
    for (int p : piles) x ^= grundy(p);
    return x;
}

// Winning move in the sum: {componentIndex, targetGrundyValue}.
pair<int, int> winningComponent(const vector<int>& piles) {
    int total = totalGrundy(piles);
    if (total == 0) return {-1, -1};
    for (int i = 0; i < (int)piles.size(); ++i) {
        int gi = grundy(piles[i]);
        if ((gi ^ total) < gi) return {i, gi ^ total};
    }
    return {-1, -1};
}

int main() {
    for (int n = 0; n <= 10; ++n) cout << grundy(n) << ' ';
    cout << "\\n";

    vector<int> piles = {4, 7, 9};
    int total = totalGrundy(piles);
    cout << "XOR of Grundy values = " << total << "\\n";
    cout << (total ? "First player wins\\n" : "Second player wins\\n");

    auto [idx, target] = winningComponent(piles);
    if (idx >= 0)
        cout << "Move component " << idx << " to Grundy value " << target << "\\n";
}
\`\`\`
`,
};

export default topic;
