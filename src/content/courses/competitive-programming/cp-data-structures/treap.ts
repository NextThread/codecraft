import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "treap",
  title: "Treap",
  description: "A randomized balanced BST combining tree ordering by key with heap ordering by random priority.",
  readingTime: 8,
  content: `

# Treap

## Theory

A **treap** ("tree" + "heap") is a binary search tree where each node also has a random **priority**. It maintains BST order on keys and heap order on priorities (max-heap: every node's priority >= its children's), which forces the shape to be that of a **random BST**, giving **O(log n) expected height** regardless of insertion order.

### Core idea

Two building blocks let you implement all BST operations without manual rebalancing:

- **split(t, key)** -> (left, right): splits treap \`t\` into two treaps, \`left\` containing all keys \`< key\`, \`right\` containing the rest.
- **merge(left, right)** -> t: merges two treaps where every key in \`left\` is less than every key in \`right\`, preserving heap order by always attaching the treap with higher root priority as the outer root.

\`insert(key)\`: split at key, merge left + newNode + right. \`erase(key)\`: find node, merge its two children, splice into parent. \`find\`: standard BST search.

### Why it works

Random priorities make the tree shape equivalent (in distribution) to a tree built by inserting keys in random order into a plain BST — a classical result gives **O(log n) expected depth**. Split/merge run in time proportional to the depth traversed, so all operations are O(log n) expected.

### Key observations

- Simpler to implement than AVL/Red-Black trees for competitive programming because there's no complex rotation-based rebalancing logic — just split/merge.
- Naturally supports **order statistics** (k-th element, rank of a key) by storing subtree size in each node.
- Generalizes to **implicit treap** (keyed by position instead of value) for array operations like reverse/rotate a range — see that topic.
- Complexity: O(log n) expected per operation; O(n) memory.

### When to use

- Need a balanced BST with split/merge as first-class operations (e.g. merging two sorted sets, or maintaining a dynamic sorted multiset with order-statistics).
- Alternative to \`std::set\`/policy-based order-statistics tree when you need custom merge/split semantics not available in STL.

### Small example

Insert 5, 3, 8, 1 into an empty treap: BST order stays 1,3,5,8 in an in-order traversal, while priorities (random) determine which node ends up at the root, keeping the tree balanced on average.

## C++17 Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key, priority, size;
    Node *left, *right;
    Node(int key) : key(key), priority(rand()), size(1), left(nullptr), right(nullptr) {}
};

int getSize(Node* t) { return t ? t->size : 0; }
void pull(Node* t) { if (t) t->size = 1 + getSize(t->left) + getSize(t->right); }

// split t into (l, r): l has all keys < key, r has the rest
void split(Node* t, int key, Node*& l, Node*& r) {
    if (!t) { l = r = nullptr; return; }
    if (t->key < key) { split(t->right, key, t->right, r); l = t; }
    else { split(t->left, key, l, t->left); r = t; }
    pull(t);
}

// merge l and r (all keys in l < all keys in r) into one treap
Node* merge(Node* l, Node* r) {
    if (!l || !r) return l ? l : r;
    if (l->priority > r->priority) { l->right = merge(l->right, r); pull(l); return l; }
    else { r->left = merge(l, r->left); pull(r); return r; }
}

Node* insert(Node* t, int key) {
    Node *l, *r;
    split(t, key, l, r);
    Node* mid = new Node(key);
    return merge(merge(l, mid), r);
}

Node* erase(Node* t, int key) {
    if (!t) return nullptr;
    if (t->key == key) { Node* res = merge(t->left, t->right); delete t; return res; }
    if (key < t->key) t->left = erase(t->left, key); else t->right = erase(t->right, key);
    pull(t);
    return t;
}

bool contains(Node* t, int key) {
    if (!t) return false;
    if (t->key == key) return true;
    return key < t->key ? contains(t->left, key) : contains(t->right, key);
}

int kth(Node* t, int k) {                 // 0-indexed k-th smallest key
    int leftSize = getSize(t->left);
    if (k < leftSize) return kth(t->left, k);
    if (k == leftSize) return t->key;
    return kth(t->right, k - leftSize - 1);
}

int main() {
    srand(12345);
    Node* root = nullptr;
    for (int k : {5, 3, 8, 1, 9}) root = insert(root, k);

    cout << boolalpha << contains(root, 8) << '\\n';   // true
    root = erase(root, 8);
    cout << contains(root, 8) << '\\n';                // false

    for (int i = 0; i < getSize(root); ++i) cout << kth(root, i) << " ";  // sorted keys
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
