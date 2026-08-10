import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-basics",
  title: "String Basics",
  description: "std::string essentials for contests: I/O, substr, find, compare, conversion, streams.",
  readingTime: 7,
  content: `

# String Basics

## Theory

In C++ contests, \`std::string\` replaces C char arrays almost everywhere: it owns its memory, grows automatically and works with the whole STL.

### Creation and I/O

\`\`\`cpp
string s;            cin >> s;          // one token, whitespace-delimited
getline(cin, s);                        // a whole line (including spaces)
string t(5, 'a');                       // "aaaaa"
string u = s;                           // deep copy
\`\`\`

After \`cin >> n\`, a following \`getline\` reads the leftover newline — consume it with \`cin.ignore()\`.

### Core operations

| Operation | Cost |
|---|---|
| \`s.size()\`, \`s[i]\`, \`s.back()\` | O(1) |
| \`s += c\`, \`push_back\` | amortised O(1) |
| \`s + t\` | O(n+m) — avoid inside loops |
| \`s.substr(pos, len)\` | O(len) — **copies** |
| \`s.find(t)\` | O(n·m) worst case |
| \`s == t\`, \`s < t\` | O(n), lexicographic |
| \`sort(s.begin(), s.end())\` | O(n log n) |
| \`reverse\`, \`count\` | O(n) |

\`s.find\` returns \`string::npos\` when absent. Other useful members: \`rfind\`, \`find_first_of\`, \`insert\`, \`erase\`, \`replace\`, \`compare\`, \`starts_with\` / \`ends_with\` (C++20).

### Conversions

\`\`\`cpp
int x = stoi(s); long long y = stoll(s); double d = stod(s);
string s2 = to_string(42);
\`\`\`

### Character helpers (\`<cctype>\`)

\`isalpha\`, \`isdigit\`, \`isalnum\`, \`isspace\`, \`isupper\`, \`islower\`, \`toupper\`, \`tolower\`.
Handy arithmetic: \`c - 'a'\` → 0..25, \`'a' + i\` → letter.

### Splitting and building

Use \`stringstream\` to split on whitespace or a delimiter, and \`ostringstream\` (or \`+=\`) to build. Building with \`+=\` and one final print is much faster than many \`cout\` calls.

### Performance rules for contests

- \`ios::sync_with_stdio(false); cin.tie(nullptr);\`
- Pass strings as \`const string&\`.
- Avoid \`substr\` inside loops — compare with indices or use hashing.
- \`reserve()\` when the final length is known.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

vector<string> split(const string& s, char sep) {
    vector<string> out;
    string cur;
    stringstream ss(s);
    while (getline(ss, cur, sep)) out.push_back(cur);
    return out;
}

string join(const vector<string>& v, const string& sep) {
    string out;
    for (size_t i = 0; i < v.size(); ++i) {
        if (i) out += sep;
        out += v[i];
    }
    return out;
}

string toLower(string s) {
    for (char& c : s) c = tolower((unsigned char)c);
    return s;
}

bool isPalindrome(const string& s) {
    for (int i = 0, j = s.size() - 1; i < j; ++i, --j)
        if (s[i] != s[j]) return false;
    return true;
}

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);

    string s = "Competitive Programming";
    cout << s.size() << ' ' << s[0] << ' ' << s.back() << '\\n';   // 23 C g
    cout << s.substr(12) << '\\n';                                 // Programming
    cout << (s.find("Prog") != string::npos) << '\\n';             // 1
    cout << toLower(s) << '\\n';

    auto parts = split("10,20,30,40", ',');
    long long sum = 0;
    for (auto& p : parts) sum += stoll(p);
    cout << "sum = " << sum << '\\n';                              // 100
    cout << join(parts, " | ") << '\\n';

    string w = "level";
    cout << isPalindrome(w) << '\\n';                              // 1

    string sorted = w;
    sort(sorted.begin(), sorted.end());
    cout << sorted << '\\n';                                       // eervl -> "eelvl"

    // building output fast
    string out;
    for (int i = 1; i <= 5; ++i) out += to_string(i) + ' ';
    cout << out << '\\n';                                          // 1 2 3 4 5
}
\`\`\`
`,
};

export default topic;
