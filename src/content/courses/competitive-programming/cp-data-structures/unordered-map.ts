import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "unordered-map",
  title: "Unordered Map",
  description: "Hash table container, collisions, and anti-hash safety.",
  readingTime: 5,
  content: `

# Unordered Map

## Theory

\`std::unordered_map<K, V>\` is a **hash table**: average **O(1)** insert / find / erase, but **O(n)** in the worst case when many keys collide. Keys are stored in no particular order.

| | \`map\` | \`unordered_map\` |
|---|---|---|
| Structure | red-black tree | hash table |
| Complexity | O(log n) guaranteed | O(1) average, O(n) worst |
| Order | sorted | arbitrary |
| \`lower_bound\` | yes | no |
| Constant factor | higher per op | lower, but rehashing costs |

### Performance tips

- \`reserve(n)\` up front avoids repeated rehashing.
- \`max_load_factor(0.25)\` trades memory for speed.
- For \`pair\` or \`tuple\` keys you must supply a custom hash (or encode into a single \`long long\`: \`x * M + y\`).

### Anti-hash attacks

On Codeforces, hacks exist that feed keys colliding under GCC's identity-like hash for \`int\`, degrading \`unordered_map\` to O(n²). Defenses:

1. Use \`map\` (safe, log n), or
2. Use a **custom hash with a random seed** (splitmix64), shown below.

### Typical uses

- Frequency counting when order does not matter.
- Memoization keyed by state, visited sets in BFS over hashable states.
- Two-sum style lookups, string hashing tables.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// randomized splitmix64 hash — safe against anti-hash tests
struct SafeHash {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t SEED =
            chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + SEED);
    }
};

int main() {
    unordered_map<long long, int, SafeHash> cnt;
    cnt.reserve(1 << 10);
    cnt.max_load_factor(0.25f);

    vector<long long> a = {4, 7, 4, 1, 7, 4};
    for (long long x : a) ++cnt[x];
    for (auto& [k, v] : cnt) cout << k << ':' << v << ' ';
    cout << '\\n';                                  // order is arbitrary

    // two-sum in O(n) average
    unordered_map<long long, int, SafeHash> pos;
    long long target = 8;
    for (int i = 0; i < (int)a.size(); ++i) {
        if (auto it = pos.find(target - a[i]); it != pos.end()) {
            cout << "pair at indices " << it->second << ' ' << i << '\\n';
            break;
        }
        pos[a[i]] = i;
    }

    // pair key encoded into one 64-bit integer
    unordered_map<long long, int, SafeHash> grid;
    auto key = [](int x, int y) { return 1LL * x * 1000000 + y; };
    grid[key(3, 5)] = 42;
    cout << grid[key(3, 5)] << '\\n';               // 42
}
\`\`\`
`,
};

export default topic;
