import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "grundy-numbers",
  title: "Grundy Numbers",
  description: "Assigning a Nim-value to every game state with the mex rule.",
  readingTime: 5,
  difficulty: "Medium",
  content: `
# Grundy Numbers

## Theory

A **Grundy number** (also *Nim-value*) turns an arbitrary impartial game state into an equivalent single Nim pile. If we know the Grundy number of a state, we know exactly who wins.

### Definition

For a state \`v\` with moves to states \`u1, u2, ..., uk\`:

\`\`\`
G(v) = mex{ G(u1), G(u2), ..., G(uk) }
\`\`\`

where \`mex\` is the smallest non-negative integer not present in the set. Terminal states (no moves) have \`G = 0\`.

### Key facts

- \`G(v) = 0\` → **losing** position for the player to move.
- \`G(v) > 0\` → **winning**; a move exists to some state with \`G = 0\`.
- A state with \`G(v) = g\` behaves *exactly* like a Nim pile of size \`g\`.

### Worked example — subtraction game

Allowed moves: remove 1, 3, or 4 stones from a pile of \`n\`.

\`\`\`
n : 0  1  2  3  4  5  6  7  8  9
G : 0  1  0  1  2  3  2  0  1  0
\`\`\`

\`G(0)=0\`; \`G(1)=mex{G(0)}=mex{0}=1\`; \`G(2)=mex{G(1)}=mex{1}=0\`; \`G(4)=mex{G(3),G(1),G(0)}=mex{1,1,0}=2\`, and so on. Positions with \`G=0\` (n = 0, 2, 7, 9, ...) are losses for the mover. Notice the pattern repeats with period 7 — very common in subtraction games and useful for large \`n\`.

### How to compute

1. Model states as a DAG (moves are edges; the game must be acyclic to be well-defined).
2. Evaluate in topological / increasing order with memoisation.
3. Look for periodicity when the state space is huge.

### Complexity

Computing Grundy numbers for states \`0..n\` with \`m\` moves each costs **O(n · m)** time and **O(n)** memory.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Smallest non-negative integer missing from s.
int mex(const vector<int>& s) {
    vector<bool> seen(s.size() + 1, false);
    for (int x : s) if (x <= (int)s.size()) seen[x] = true;
    for (int i = 0;; ++i) if (!seen[i]) return i;
}

// Subtraction game: from a pile of size n you may remove any value in `moves`.
vector<int> grundySubtraction(int n, const vector<int>& moves) {
    vector<int> g(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        vector<int> reachable;
        for (int m : moves)
            if (i - m >= 0) reachable.push_back(g[i - m]);
        g[i] = mex(reachable);
    }
    return g;
}

// Generic version for an arbitrary acyclic game defined by a successor function.
vector<int> g_memo;
function<vector<int>(int)> successors;

int grundy(int state) {
    if (g_memo[state] != -1) return g_memo[state];
    g_memo[state] = 0;                       // guard, states are acyclic
    vector<int> vals;
    for (int nxt : successors(state)) vals.push_back(grundy(nxt));
    return g_memo[state] = mex(vals);
}

int main() {
    auto g = grundySubtraction(9, {1, 3, 4});
    for (int i = 0; i <= 9; ++i) cout << g[i] << ' ';
    cout << "\\n";                            // 0 1 0 1 2 3 2 0 1 0

    // Same game through the generic solver.
    g_memo.assign(10, -1);
    successors = [](int s) {
        vector<int> r;
        for (int m : {1, 3, 4}) if (s - m >= 0) r.push_back(s - m);
        return r;
    };
    cout << "G(6) = " << grundy(6) << "\\n";   // 2  -> winning position
}
\`\`\`
`,
};

export default topic;
