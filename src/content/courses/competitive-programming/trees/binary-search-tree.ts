import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-search-tree",
  title: "Binary Search Tree",
  description: "Ordered binary tree: search, insert, delete and validation.",
  readingTime: 6,
  content: `

# Binary Search Tree

## Theory

A **binary search tree (BST)** keeps the invariant

```
all keys in left subtree  <  node key  <  all keys in right subtree
```

Therefore an **in-order traversal produces sorted keys** — the defining test of a BST.

| Operation | Average | Worst (degenerate) |
|-----------|---------|--------------------|
| search / insert / delete | O(log n) | O(n) |

Worst case happens with sorted insertions; **self-balancing** trees (AVL, red-black — used by `std::set` / `std::map`, treap, splay) keep the height at O(log n).

### Deletion — three cases

1. **Leaf** — remove it.
2. **One child** — replace the node by its child.
3. **Two children** — replace the key by its **in-order successor** (minimum of the right subtree), then delete that successor.

### Validation

Checking `left < root < right` locally is *not* enough. Either pass down a valid `(low, high)` range, or verify that the in-order traversal is strictly increasing.

### Uses

Ordered dictionaries, predecessor/successor queries, floor/ceil, k-th smallest (with subtree sizes), range counting, interval scheduling.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key;
    Node *left = nullptr, *right = nullptr;
    explicit Node(int k) : key(k) {}
};

Node* insert(Node* r, int k) {
    if (!r) return new Node(k);
    if (k < r->key)      r->left  = insert(r->left, k);
    else if (k > r->key) r->right = insert(r->right, k);
    return r;                                   // duplicates ignored
}

bool search(Node* r, int k) {
    while (r) {
        if (k == r->key) return true;
        r = k < r->key ? r->left : r->right;
    }
    return false;
}

Node* minNode(Node* r) { while (r->left) r = r->left; return r; }

Node* erase(Node* r, int k) {
    if (!r) return nullptr;
    if (k < r->key)       r->left  = erase(r->left, k);
    else if (k > r->key)  r->right = erase(r->right, k);
    else {
        if (!r->left)  { Node* t = r->right; delete r; return t; }
        if (!r->right) { Node* t = r->left;  delete r; return t; }
        Node* succ = minNode(r->right);         // two children
        r->key = succ->key;
        r->right = erase(r->right, succ->key);
    }
    return r;
}

void inorder(Node* r, vector<int>& out) {
    if (!r) return;
    inorder(r->left, out); out.push_back(r->key); inorder(r->right, out);
}

bool isBst(Node* r, long low = LLONG_MIN, long high = LLONG_MAX) {
    if (!r) return true;
    if (r->key <= low || r->key >= high) return false;
    return isBst(r->left, low, r->key) && isBst(r->right, r->key, high);
}

// largest key <= x
int floorKey(Node* r, int x) {
    int best = INT_MIN;
    while (r) {
        if (r->key == x) return x;
        if (r->key < x) { best = r->key; r = r->right; }
        else r = r->left;
    }
    return best;
}

int main() {
    Node* root = nullptr;
    for (int k : {50, 30, 70, 20, 40, 60, 80}) root = insert(root, k);

    cout << search(root, 40) << ' ' << search(root, 45) << '\n';   // 1 0
    cout << floorKey(root, 65) << '\n';                            // 60
    root = erase(root, 30);

    vector<int> v; inorder(root, v);
    for (int x : v) cout << x << ' ';                              // 20 40 50 60 70 80
    cout << '\n' << boolalpha << isBst(root) << '\n';              // true
}
```
`,
};

export default topic;
