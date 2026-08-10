import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dp-optimization",
  title: "DP Optimization",
  description: "Convex hull trick, divide & conquer, Knuth, monotonic deque and matrix exponentiation.",
  readingTime: 10,
  content: `

# DP Optimization

## Theory

When \`states × transitions\` is too slow, optimise the **transition**, not the recurrence. Pick the technique by the shape of the cost.

### 1. Monotonic deque (sliding-window DP)

\`\`\`
dp[i] = a[i] + min{ dp[j] : i-k <= j < i }
\`\`\`

Keep a deque of indices with increasing \`dp\` values → **O(n)**. Also used for bounded knapsack and "jump at most k" problems.

### 2. Convex Hull Trick (CHT) / Li Chao tree

\`\`\`
dp[i] = min over j<i of ( dp[j] + b[j] * x[i] )
\`\`\`

Each \`j\` is a **line** \`y = m·x + c\` with \`m = b[j]\`, \`c = dp[j]\`. Query = minimum of lines at \`x[i]\`.

- Slopes added in monotone order and queries monotone → **monotonic CHT**, O(n).
- Arbitrary order → **Li Chao tree**, O(n log C), or \`LineContainer\` (dynamic hull), O(n log n).

### 3. Divide & Conquer optimisation

For layered DP

\`\`\`
dp[k][i] = min over j<i of ( dp[k-1][j] + C(j, i) )
\`\`\`

if the optimal split \`opt[k][i]\` is **non-decreasing in i**, solve each layer by recursion on \`(lo, hi, optLo, optHi)\` → **O(k · n log n)**.

### 4. Knuth optimisation

For interval DP \`dp[l][r] = min_{l≤k<r}(dp[l][k] + dp[k+1][r]) + w(l,r)\` where \`w\` satisfies the quadrangle inequality and monotonicity, then

\`\`\`
opt[l][r-1] <= opt[l][r] <= opt[l+1][r]
\`\`\`

restricting the \`k\` loop gives **O(n²)** instead of O(n³) (optimal BST, merging stones).

### 5. Aliens trick (Lagrangian relaxation)

"Exactly k parts" with a convex cost in k: binary-search a penalty λ added per part, solve the unconstrained DP, adjust λ until the part count hits k. O(n log C).

### 6. Matrix exponentiation / Kitamasa

Linear recurrences with tiny state and huge \`n\`:

\`\`\`
dp[n] = A * dp[n-1]   ⇒   dp[n] = A^n * dp[0]      O(s³ log n)
\`\`\`

Also counts walks of length n in a graph, tilings with periodic structure, and DP with mod.

### 7. Cheap but effective

- Reorder loops for cache locality; flatten 2D arrays.
- Use \`bitset\` for boolean DP → 64× speedup.
- Prune unreachable states; use \`int\` instead of \`long long\` when safe.
- \`std::array\` over \`vector\` in hot inner loops.

### Choosing quickly

| Transition shape | Technique |
|---|---|
| window of last k | monotonic deque |
| \`dp[j] + b[j]·x[i]\` | CHT / Li Chao |
| layered, monotone opt | divide & conquer |
| interval + quadrangle | Knuth |
| exactly k parts, convex | Aliens |
| linear, huge n | matrix power |

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = 4e18;

// ---------- 1) sliding window DP with a monotonic deque ----------
// dp[i] = a[i] + min(dp[i-k..i-1]);  dp[0] = a[0]
ll slidingWindowDP(const vector<ll>& a, int k) {
    int n = a.size();
    vector<ll> dp(n);
    deque<int> dq;
    dp[0] = a[0]; dq.push_back(0);
    for (int i = 1; i < n; ++i) {
        while (!dq.empty() && dq.front() < i - k) dq.pop_front();
        dp[i] = a[i] + dp[dq.front()];
        while (!dq.empty() && dp[dq.back()] >= dp[i]) dq.pop_back();
        dq.push_back(i);
    }
    return dp[n-1];
}

// ---------- 2) monotonic convex hull trick (minimum) ----------
struct CHT {                       // slopes added in decreasing order, queries increasing
    vector<ll> m, c;
    size_t ptr = 0;
    bool bad(size_t l, size_t mid, size_t r) {
        return (long double)(c[r] - c[l]) * (m[l] - m[mid])
             < (long double)(c[mid] - c[l]) * (m[l] - m[r]);
    }
    void add(ll slope, ll inter) {
        m.push_back(slope); c.push_back(inter);
        while (m.size() >= 3 && bad(m.size()-3, m.size()-2, m.size()-1)) {
            m.erase(m.end()-2); c.erase(c.end()-2);
        }
        if (ptr >= m.size()) ptr = m.size() - 1;
    }
    ll query(ll x) {
        if (ptr >= m.size()) ptr = m.size() - 1;
        while (ptr + 1 < m.size() && m[ptr+1]*x + c[ptr+1] <= m[ptr]*x + c[ptr]) ++ptr;
        return m[ptr] * x + c[ptr];
    }
};

// dp[i] = min over j<i of ( dp[j] + (x[i]-x[j])^2 )  -> classic CHT demo
vector<ll> cutCost(const vector<ll>& x) {
    int n = x.size();
    vector<ll> dp(n, INF);
    dp[0] = 0;
    CHT h;
    h.add(-2 * x[0], dp[0] + x[0] * x[0]);
    for (int i = 1; i < n; ++i) {
        dp[i] = x[i] * x[i] + h.query(x[i]);
        h.add(-2 * x[i], dp[i] + x[i] * x[i]);
    }
    return dp;
}

// ---------- 3) divide & conquer optimisation ----------
int N, K;
vector<vector<ll>> D;              // layers
function<ll(int,int)> Cost;

void solveLayer(int k, int lo, int hi, int optLo, int optHi) {
    if (lo > hi) return;
    int mid = (lo + hi) / 2, opt = optLo;
    ll best = INF;
    for (int j = optLo; j <= min(mid - 1, optHi); ++j) {
        ll cand = D[k-1][j] + Cost(j, mid);
        if (cand < best) { best = cand; opt = j; }
    }
    D[k][mid] = best;
    solveLayer(k, lo, mid - 1, optLo, opt);
    solveLayer(k, mid + 1, hi, opt, optHi);
}

// ---------- 4) matrix exponentiation for Fibonacci mod p ----------
using Mat = array<array<ll,2>,2>;
const ll MOD = 1000000007;
Mat mul(const Mat& A, const Mat& B) {
    Mat C{};
    for (int i = 0; i < 2; ++i)
        for (int k = 0; k < 2; ++k) if (A[i][k])
            for (int j = 0; j < 2; ++j)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}
ll fibFast(ll n) {
    Mat R{{{1,0},{0,1}}}, A{{{1,1},{1,0}}};
    while (n) { if (n & 1) R = mul(R, A); A = mul(A, A); n >>= 1; }
    return R[0][1];
}

int main() {
    cout << slidingWindowDP({1, 5, 3, 2, 9, 4}, 2) << '\\n';

    auto dp = cutCost({0, 3, 7, 12});
    cout << dp.back() << '\\n';

    // divide & conquer demo: split prefix costs into K groups
    N = 6; K = 2;
    vector<ll> pre = {0, 2, 5, 9, 14, 20, 27};
    Cost = [&](int j, int i) { ll len = pre[i] - pre[j]; return len * len; };
    D.assign(K + 1, vector<ll>(N + 1, INF));
    D[0][0] = 0;
    for (int k = 1; k <= K; ++k) solveLayer(k, 1, N, 0, N);
    cout << D[K][N] << '\\n';

    cout << fibFast(1000000000) << '\\n';
}
\`\`\`
`,
};


export default topic;
