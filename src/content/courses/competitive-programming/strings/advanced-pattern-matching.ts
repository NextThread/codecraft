import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "advanced-pattern-matching",
  title: "Advanced Pattern Matching",
  description: "Techniques beyond exact matching: wildcards, approximate matching, and FFT/bitset-accelerated pattern search.",
  readingTime: 13,
  content: `
# Advanced Pattern Matching

## Theory

### What it is
Beyond exact single-pattern matching (KMP/Z-function) and multi-pattern matching (Aho-Corasick), competitive programming problems often demand richer matching: patterns with **wildcards** (a character matching anything), **approximate matching** allowing a bounded number of mismatches, and matching accelerated with **bitset tricks** or the **Fast Fourier Transform (FFT)** for problems where a naive O(nm) approach is too slow but the structure allows convolution-based speedups.

### Wildcard matching via FFT
Problem: does pattern P (length m, may contain a wildcard character '*' matching anything) match text T (length n) starting at some position, or at every position? Define a mismatch indicator function: for alignment starting at shift k, define
\`C(k) = sum_{i=0}^{m-1} (T[k+i] - P[i])^2 * [P[i] != '*']\`
This sum is 0 exactly when P matches T at shift k (ignoring wildcard positions). Expanding \`(T[k+i]-P[i])^2 = T[k+i]^2 - 2*T[k+i]*P[i] + P[i]^2\`, each of the three terms is a **correlation/convolution** of sequences derived from T and P (treating wildcard positions as contributing 0), computable for ALL shifts k simultaneously via **three FFT-based convolutions** in O((n+m) log(n+m)) total, instead of O(nm) naive. This is the classic "wildcard pattern matching with FFT" technique.
- For matching against a numeric alphabet where '*' = 0 sentinel is used, define \`P'[i] = P[i]\` if not '*' else 0, and compute the three convolution sums using polynomial multiplication (reverse one sequence to turn correlation into convolution, since convolution naturally computes \`sum P[i] T[k+i]\` via reversed-P times T).

### Approximate matching (bounded mismatches / edit distance)
- **Hamming distance matching** (count mismatches, no insertions/deletions): for a fixed threshold k, can be solved via FFT-based approach above generalized (compute mismatch counts at every shift via convolution over an expanded alphabet using indicator vectors per character, sum threshold-checked). For a small alphabet size, mismatch count at shift s = m - sum_over_alphabet_letters(convolution of indicator(T==letter) with reversed indicator(P==letter)) -- O(alphabet * (n+m) log(n+m)) total.
- **Edit distance (Levenshtein) pattern matching**, i.e. "does P appear in T with at most k edits," is generally solved with a banded DP (Ukkonen's edit-distance-with-cutoff algorithm) in O(nk) or bitset-accelerated DP (Myers' bit-parallel algorithm) achieving O(n * ceil(m/64)) for exact/approximate matching with small edit budgets, extremely fast in practice due to word-level parallelism.
- **Bitset/bitap algorithm (Shift-And / Shift-Or)**: represent, for each character c, a bitmask of positions in P where c occurs. Maintain a running bitmask R where bit j means "the first j+1 characters of P match ending at the current text position." Update: \`R = ((R << 1) | 1) & mask[T[i]]\` (Shift-And variant for exact matching); extending with extra bitmask layers per allowed error count gives the **bitap algorithm** for k-mismatch/k-edit approximate matching in O(n * ceil(m/64) * k) time using bitwise word operations, very fast for m <= 64 (or a few words for longer patterns).

### Key observations
- FFT-based wildcard matching turns an O(nm) mismatch counting problem into O((n+m) log(n+m)), crucial when n, m are both up to 1e5-1e6.
- Bit-parallel algorithms (Shift-And/Shift-Or, Myers' algorithm, bitap) exploit machine word parallelism (typically 64 bits at a time) to get large constant-factor speedups; ideal when pattern length fits in a small number of machine words.
- These techniques often combine with earlier structures: e.g., run Aho-Corasick for the "exact multi-pattern" part of a problem, then patch in FFT or bitap for a "with wildcards" or "with k mismatches" twist.
- Watch numeric precision with FFT (use NTT -- number theoretic transform -- with a suitable modulus, or double FFT with rounding, depending on constraints and required exactness) since pattern matching demands exact integer correlation counts.

### Complexity
- FFT wildcard matching: O((n+m) log(n+m)).
- Hamming-distance-at-every-shift via FFT: O(sigma * (n+m) log(n+m)) where sigma = alphabet size.
- Bitap / Shift-And exact or k-mismatch matching: O(n * ceil(m/64)) or O(n * ceil(m/64) * k).
- Myers' bit-vector edit distance: O(n * ceil(m/64)) for full edit distance computation, or with cutoff for "found match with <= k edits."

### When to use
- Pattern matching with wildcard characters (e.g., matching with "don't care" positions), common in bioinformatics-flavored CP problems.
- Counting/matching allowing a small number of mismatches or edits (fuzzy matching, near-duplicate detection).
- When pattern length fits comfortably in machine words (<=64 or a few hundred), bitset techniques often outperform more "theoretically elegant" but heavier structures.
- As a toolkit to combine with suffix structures/Aho-Corasick for compound problems (e.g., "find all positions where a text matches any of k patterns with at most 1 mismatch each").

### Small example
T = "abcabc", P = "a?c" ('?' = wildcard). Exact-with-wildcard matching should report matches at shift 0 ("abc" -> a,?,c matches a,b,c) and shift 3 similarly. FFT-based correlation over all shifts computes this in one pass rather than checking each shift independently in O(m).

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
typedef complex<double> cd;
const double PI = acos(-1);

// Standard iterative FFT.
void fft(vector<cd> &a, bool invert) {
    int n = (int)a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) for (cd &x : a) x /= n;
}

vector<double> multiply(vector<double> a, vector<double> b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int resultSize = (int)a.size() + (int)b.size() - 1;
    int n = 1;
    while (n < resultSize) n <<= 1;
    fa.resize(n); fb.resize(n);
    fft(fa, false); fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);
    vector<double> result(resultSize);
    for (int i = 0; i < resultSize; i++) result[i] = fa[i].real();
    return result;
}

// Wildcard pattern matching: text T (0..n-1), pattern P (0..m-1) with wildcard value = 0
// meaning "matches anything". Non-wildcard characters are mapped to distinct positive doubles
// (e.g., 'a'-'z' -> 1..26). Returns, for every valid shift k (0 <= k <= n-m), whether P matches
// T starting at k considering wildcards, using the classic 3-convolution mismatch-count trick:
//   C(k) = sum_i [P[i] != wildcard] * (T[k+i] - P[i])^2
// C(k) == 0 (up to floating rounding) means a full match at shift k.
vector<bool> wildcardMatch(const vector<double> &T, const vector<double> &P, double wildcard = 0.0) {
    int n = (int)T.size(), m = (int)P.size();
    vector<double> Pmask(m), Prev(m), P2rev(m), Trev? ;
    // Build indicator: mask[i] = 1 if P[i] is not wildcard, else 0. Reverse P for convolution-as-correlation.
    vector<double> mask(m), Pval(m);
    for (int i = 0; i < m; i++) {
        mask[i] = (P[i] == wildcard) ? 0.0 : 1.0;
        Pval[i] = (P[i] == wildcard) ? 0.0 : P[i];
    }
    // Reverse pattern-derived arrays so convolution(T, reverse(X)) gives correlation sum_i T[k+i]*X[i].
    vector<double> maskRev(mask.rbegin(), mask.rend());
    vector<double> PvalRev(Pval.rbegin(), Pval.rend());
    vector<double> Psq(m);
    for (int i = 0; i < m; i++) Psq[i] = Pval[i] * Pval[i];
    vector<double> PsqRev(Psq.rbegin(), Psq.rend());

    vector<double> Tsq(n);
    for (int i = 0; i < n; i++) Tsq[i] = T[i] * T[i];

    // term1[k] = sum_i mask[i] * T[k+i]^2   -> convolution(Tsq, maskRev) at index k+m-1
    // term2[k] = sum_i mask[i] * T[k+i]*P[i] -> convolution(T, PvalRev) at index k+m-1
    // term3[k] = sum_i mask[i] * P[i]^2      -> convolution(mask, PsqRev) at index k+m-1  (constant per pattern, but computed generally)
    vector<double> conv1 = multiply(Tsq, maskRev);
    vector<double> conv2 = multiply(T, PvalRev);
    vector<double> conv3 = multiply(mask, PsqRev);

    vector<bool> matches(max(0, n - m + 1), false);
    for (int k = 0; k + m <= n; k++) {
        int idx = k + m - 1;
        double C = conv1[idx] - 2.0 * conv2[idx] + conv3[idx];
        matches[k] = (C < 0.5); // rounding tolerance; exact zero expected for true matches
    }
    return matches;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string text, pattern; // pattern may contain '?' as wildcard
    cin >> text >> pattern;

    int n = (int)text.size(), m = (int)pattern.size();
    vector<double> T(n), P(m);
    for (int i = 0; i < n; i++) T[i] = text[i] - 'a' + 1;
    for (int i = 0; i < m; i++) P[i] = (pattern[i] == '?') ? 0.0 : (pattern[i] - 'a' + 1);

    vector<bool> matches = wildcardMatch(T, P, 0.0);
    cout << "Matches at shifts: ";
    for (int k = 0; k < (int)matches.size(); k++) if (matches[k]) cout << k << " ";
    cout << "\\n";

    return 0;
}
\`\`\`
`,
};

export default topic;
