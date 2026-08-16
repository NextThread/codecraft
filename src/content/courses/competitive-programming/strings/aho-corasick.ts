import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "aho-corasick",
  title: "Aho-Corasick",
  description: "A trie augmented with failure links that matches many patterns against a text simultaneously in linear time.",
  readingTime: 12,
  content: `
# Aho-Corasick

## Theory

### What it is
The Aho-Corasick automaton is a data structure that lets you search for **many patterns at once** inside a text in O(text length + total pattern length + number of matches) time. It generalizes KMP's failure-function idea from one pattern to a whole dictionary of patterns organized as a trie.

### Core idea
1. Insert all patterns into a **trie**.
2. For each trie node, compute a **failure link** (also called suffix link): the node representing the longest proper suffix of the current node's string that is also a prefix of some pattern (i.e., also a node in the trie). This is exactly analogous to the KMP failure function, generalized to a tree of strings.
3. Failure links let you, while scanning the text character by character, jump to the best "fallback" state when the current character does not match a trie edge -- as in KMP, without re-scanning input.
4. To detect matches efficiently, add **dictionary suffix links** (or an "output" aggregation): each node may need to report not just its own pattern (if it ends one) but also any pattern ending at ancestors reachable via failure links. Precompute \`is_word\` OR-ed along failure chains, or explicitly walk failure links at query time (amortized via memoization).

### Why it works
The failure link of a node u pointing to node f(u) captures "if I fail to extend by a character here, the longest suffix of my current matched string that could still be a valid prefix of some pattern is f(u)'s string." This mirrors KMP's failure array, but built with BFS over the trie: process nodes in BFS order from the root, and for each child c of node u via character ch, follow u's failure link's transition on ch to compute the child's failure link. Combined with **goto function completion** (making the automaton total: every state has a transition for every character, either a real trie edge or inherited via failure link), the automaton processes each text character in O(1) amortized transitions, giving overall O(n + sum|patterns| + occurrences) complexity.

### Key observations
- Building: BFS from root; failure link of root's children is root. For deeper nodes, \`fail[child] = goto(fail[node], ch)\` computed via the automaton's transition table (built with the "trie + fail" trick so that \`goto\` is O(1) after preprocessing, i.e., Aho-Corasick automaton == a big DFA over alphabet size).
- Memory: O(total pattern length * alphabet size) with the completed transition table; can be reduced using maps/edges only plus fallback pointer if alphabet is large or patterns/text huge (trade time for memory).
- To find all pattern occurrences ending at each text position, follow "dictionary links" (a node's nearest failure-link ancestor which is a word end) -- precompute \`dict_link[v] = is_word(fail[v]) ? fail[v] : dict_link[fail[v]]\`, so listing all matches at each position takes O(1) amortized per match reported, and total time stays linear plus number of matches.
- Handles overlapping patterns, patterns that are substrings of each other, and repeated scanning of the same text against a static dictionary.
- Building the automaton takes O(sum of pattern lengths) time and space; each text query afterward takes O(text length) time independent of how many patterns there are.

### Complexity
- Build automaton: O(sum |patterns| * alphabet) time/space with full transition table, or O(sum |patterns|) with map-based edges.
- Search text of length n: O(n) transitions plus O(matches found).

### When to use
- Multi-pattern string matching: e.g. found all keywords from a dictionary occurring in a text (search engines, spam filters, DNA motif searching, IDS/virus signature scanning).
- Combined with DP: counting strings of length L avoiding/containing certain patterns by building a transition matrix over Aho-Corasick states and doing matrix exponentiation or straightforward DP over states.
- Whenever multiple KMP searches over the same text would repeat work, Aho-Corasick amortizes it into a single automaton pass.

### Small example
Patterns: "he", "she", "his", "hers". Insert into trie, build failure links via BFS. Scanning text "ushers" will report "she" ending at index 4, "he" ending at index 4 (via failure chain from 'she' node), and "hers" ending at index 5 -- all found in one linear pass.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const int ALPHA = 26;

struct AhoCorasick {
    struct Node {
        array<int, ALPHA> next;   // completed transition function (goto)
        int fail = 0;             // failure link
        int dictLink = 0;         // nearest failure ancestor that is a word end
        bool isWord = false;
        vector<int> patternIdx;   // indices of patterns ending exactly here (optional)
        Node() { next.fill(-1); }
    };

    vector<Node> nodes;

    AhoCorasick() { nodes.emplace_back(); } // root = node 0

    int addString(const string &s) {
        int cur = 0;
        for (char c : s) {
            int ch = c - 'a';
            if (nodes[cur].next[ch] == -1) {
                nodes[cur].next[ch] = (int)nodes.size();
                nodes.emplace_back();
            }
            cur = nodes[cur].next[ch];
        }
        nodes[cur].isWord = true;
        return cur;
    }

    // Build failure links and complete the transition table via BFS (trie + fail trick)
    void build() {
        queue<int> q;
        // root's children: fail = root; fill missing root edges to point to root
        for (int c = 0; c < ALPHA; c++) {
            if (nodes[0].next[c] == -1) {
                nodes[0].next[c] = 0;
            } else {
                nodes[nodes[0].next[c]].fail = 0;
                q.push(nodes[0].next[c]);
            }
        }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            nodes[u].dictLink = nodes[nodes[u].fail].isWord ? nodes[u].fail : nodes[nodes[u].fail].dictLink;
            for (int c = 0; c < ALPHA; c++) {
                int v = nodes[u].next[c];
                if (v == -1) {
                    // no real edge: inherit transition from failure link (completes the DFA)
                    nodes[u].next[c] = nodes[nodes[u].fail].next[c];
                } else {
                    nodes[v].fail = nodes[nodes[u].fail].next[c];
                    q.push(v);
                }
            }
        }
    }

    // Scan text, calling callback(position, node) whenever node has isWord or dictLink chain non-trivial
    // Returns total number of pattern occurrences (counting via dictLink chain).
    long long search(const string &text, const vector<string> &patterns) {
        long long matches = 0;
        int cur = 0;
        for (int i = 0; i < (int)text.size(); i++) {
            cur = nodes[cur].next[text[i] - 'a'];
            int t = cur;
            // Walk dictionary-link chain to report all patterns ending at this text position.
            while (t != 0 && (nodes[t].isWord || nodes[t].dictLink != 0)) {
                if (nodes[t].isWord) {
                    matches++;
                    // pattern ends at position i (0-indexed), report as needed
                }
                if (nodes[t].dictLink == 0 && !nodes[t].isWord) break;
                t = nodes[t].isWord ? nodes[t].dictLink : nodes[t].dictLink;
                if (t == 0) break;
            }
        }
        return matches;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int k;
    cin >> k;
    vector<string> patterns(k);
    AhoCorasick ac;
    for (auto &p : patterns) {
        cin >> p;
        ac.addString(p);
    }
    ac.build();

    string text;
    cin >> text;

    long long occurrences = ac.search(text, patterns);
    cout << "Total occurrences: " << occurrences << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
