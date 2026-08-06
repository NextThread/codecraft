import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "map",
  title: "Map",
  description: "Ordered key-value container backed by a balanced BST.",
  readingTime: 5,
  content: `

# Map

## Theory

\`std::map<K, V>\` stores **unique keys in sorted order**, each mapped to a value. Red-black tree → O(log n) for insert, erase, find, \`lower_bound\`.

### Access patterns

\`\`\`cpp
m[key]                 // inserts a default value if key is absent (careful!)
m.at(key)              // throws if absent
m.count(key) / m.contains(key)   // existence check, no insertion
m.find(key)            // iterator or end()
\`\`\`

Because \`operator[]\` *creates* missing entries, never use it inside a read-only check — it silently grows the map.

### Iteration and ranges

Iteration yields \`pair<const K, V>\` in ascending key order, so a map doubles as a sorted structure:

- \`m.begin()\` — smallest key, \`m.rbegin()\` — largest.
- \`m.lower_bound(k)\` — first entry with key \`>= k\`, ideal for "which interval contains x?".

\`std::multimap\` allows duplicate keys (same API, no \`operator[]\`).

### Typical uses

- Frequency tables when the order of keys matters.
- Sparse arrays / coordinate → value lookups with huge coordinates.
- Interval maps: key = start of an interval, \`lower_bound\` locates the covering interval.
- Grouping and prefix-sum counting (\`map<long long,int>\` of prefix sums).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    map<string, int> freq;
    for (string w : {"apple", "pear", "apple", "fig"}) ++freq[w];
    for (auto& [word, cnt] : freq) cout << word << " = " << cnt << '\\n';
    // apple = 2 / fig = 1 / pear = 1  (sorted by key)

    // safe existence check
    if (freq.count("fig")) cout << "fig present\\n";
    if (auto it = freq.find("kiwi"); it == freq.end()) cout << "kiwi absent\\n";

    // ordered queries
    map<int, string> events = {{10, "start"}, {25, "pause"}, {40, "stop"}};
    int t = 30;
    auto it = events.upper_bound(t);          // first event strictly after t
    if (it != events.begin()) cout << "at t=30 state is " << prev(it)->second << '\\n';  // pause

    // structured update with try_emplace (no overwrite, no default construction)
    events.try_emplace(25, "ignored");
    cout << events[25] << '\\n';               // pause

    // count subarrays with sum k using a map of prefix sums
    vector<int> a = {1, 2, 3, -2, 2};
    long long k = 3, sum = 0, ans = 0;
    map<long long, int> seen{{0, 1}};
    for (int x : a) { sum += x; ans += seen[sum - k]; ++seen[sum]; }
    cout << "subarrays with sum 3: " << ans << '\\n';
}
\`\`\`
`,
};

export default topic;
