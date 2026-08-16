import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "implicit-treap",
  title: "Implicit Treap",
  description: "A treap keyed by array position (not value), supporting split/merge on ranges for reverse, rotate, and range operations.",
  readingTime: 9,
  content: `

# Implicit Treap

## Theory

An **implicit treap** is a treap where the "key" is not stored explicitly — it is the node's **position (index) in the in-order traversal**, i.e., the array index. This turns the treap into a fully dynamic array supporting **insert/erase/split/merge/reverse/rotate at any position** in O(log n), which a plain array cannot do efficiently.

### Core idea

Every node still has a random priority for heap order, and the BST/positional order is maintained implicitly via **subtree sizes**: the position of a node = size of its left subtree (computed on the fly during traversal, not stored as a key). This is exactly like an **order-statistics tree** used as a sequence container:

- \`split(t, k)\` -> (left, right): left gets the first \`k\` elements (by position), right gets the rest — computed by comparing \`k\` against \`getSize(t->left)\` at each step instead of comparing against an explicit key.
- \`merge(left, right)\`: identical to a regular treap merge (priority-based), just note that afterwards left's elements all precede right's.
- To **insert at position p**: split at p, merge(left, newNode, right).
- To **reverse a range [l, r]**: split out that range as its own subtree, set a lazy "reversed" flag on its root (like lazy propagation in a segment tree — swap children and toggle the flag on push-down), then merge back.

### Why it works

Because position is derived from subtree size rather than stored, splitting/merging by position works exactly like splitting/merging by key in a normal treap, giving the same **O(log n) expected time**. Lazy flags (reverse, add, assign) propagate on push-down exactly as in a lazy segment tree, since the treap's shape (which subtree is on which side) is what encodes order.

### Key observations

- Supports operations an array/segment tree cannot do efficiently: **reverse a subrange, cyclic-shift a subrange, insert/delete in the middle, cut-and-paste a subrange elsewhere** — all in O(log n) (or O(log n) amortized for cut-paste via split/merge).
- Can also carry the same aggregate/lazy machinery as a segment tree (subtree sum, min, add-lazy, assign-lazy) by storing them in each node and combining on \`pull\`/pushing on descent.
- Complexity: O(log n) expected per operation (split, merge, insert, erase, range reverse/update/query).

### When to use

- "Rope"-like data structure needs: text editors, sequences with arbitrary cut/paste/reverse, problems explicitly asking for range reversal combined with range sum/other aggregate queries (a segment tree alone can't reverse ranges).
- When \`std::rotate\`/\`vector::insert\` in the middle would be O(n) and you need O(log n).

### Small example

Array \`[1,2,3,4,5]\`, reverse range \`[1,3]\` (0-indexed, elements 2,3,4) -> \`[1,4,3,2,5]\`, done in O(log n) by cutting out the middle subtree, flipping its lazy-reverse flag, and merging back — no O(n) element-by-element reversal.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int value, priority, size;
    long long sum;
    bool reversed = false;
    Node *left = nullptr, *right = nullptr;
    Node(int v) : value(v), priority(rand()), size(1), sum(v) {}
};

int getSize(Node* t) { return t ? t->size : 0; }
long long getSum(Node* t) { return t ? t->sum : 0; }

void pull(Node* t) {
    if (!t) return;
    t->size = 1 + getSize(t->left) + getSize(t->right);
    t->sum = t->value + getSum(t->left) + getSum(t->right);
}

void pushDown(Node* t) {
    if (!t || !t->reversed) return;
    swap(t->left, t->right);
    if (t->left) t->left->reversed ^= true;
    if (t->right) t->right->reversed ^= true;
    t->reversed = false;
}

// split so that 'left' has the first k elements (0-indexed count), 'right' has the rest
void split(Node* t, int k, Node*& left, Node*& right) {
    if (!t) { left = right = nullptr; return; }
    pushDown(t);
    int leftSize = getSize(t->left);
    if (leftSize < k) { split(t->right, k - leftSize - 1, t->right, right); left = t; }
    else { split(t->left, k, left, t->left); right = t; }
    pull(t);
}

Node* merge(Node* left, Node* right) {
    if (!left || !right) return left ? left : right;
    pushDown(left); pushDown(right);
    if (left->priority > right->priority) { left->right = merge(left->right, right); pull(left); return left; }
    else { right->left = merge(left, right->left); pull(right); return right; }
}

Node* insertAt(Node* t, int pos, int value) {
    Node *l, *r;
    split(t, pos, l, r);
    return merge(merge(l, new Node(value)), r);
}

// reverse the subrange [l, r] (0-indexed, inclusive)
Node* reverseRange(Node* t, int l, int r) {
    Node *left, *mid, *right;
    split(t, l, left, mid);
    split(mid, r - l + 1, mid, right);
    mid->reversed ^= true;
    return merge(merge(left, mid), right);
}

void inorder(Node* t, vector<int>& out) {
    if (!t) return;
    pushDown(t);
    inorder(t->left, out);
    out.push_back(t->value);
    inorder(t->right, out);
}

int main() {
    srand(42);
    Node* root = nullptr;
    for (int v : {1, 2, 3, 4, 5}) root = insertAt(root, getSize(root), v);

    root = reverseRange(root, 1, 3);   // reverse elements at positions 1..3 -> [1,4,3,2,5]
    vector<int> result;
    inorder(root, result);
    for (int x : result) cout << x << " ";
    cout << '\\n';
    cout << "sum = " << getSum(root) << '\\n';
}
\`\`\`
`,
};

export default topic;
