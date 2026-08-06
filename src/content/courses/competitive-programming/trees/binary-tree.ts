import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "binary-tree",
  title: "Binary Tree",
  description: "Structure, properties, representations and basic algorithms.",
  readingTime: 6,
  content: `

# Binary Tree

## Theory

A **binary tree** is a rooted tree where every node has at most two children (`left`, `right`).

### Terminology

- **Root** — topmost node; **leaf** — node with no children.
- **Height** of a node — edges on the longest downward path; height of a leaf = 0.
- **Depth** — edges from the root to the node.
- **Level** — all nodes at the same depth.

### Special shapes

| Type | Property |
|------|----------|
| Full | every node has 0 or 2 children |
| Complete | all levels filled except possibly the last, filled left to right |
| Perfect | all internal nodes have 2 children, all leaves at the same depth |
| Balanced | height is O(log n) |
| Degenerate | each node has one child (behaves like a linked list) |

### Useful facts

- A perfect tree of height `h` has `2^(h+1) - 1` nodes and `2^h` leaves.
- A tree with `n` nodes has `n - 1` edges.
- Minimum height with n nodes = `floor(log2 n)`; maximum = `n - 1`.
- A **complete** binary tree can be stored in an array: children of `i` are `2i + 1`, `2i + 2` (this is what heaps use).

### Common problems

Height, node/leaf count, diameter, mirror/invert, check balanced, level-order (BFS), path sums, serialize/deserialize.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int val;
    Node *left = nullptr, *right = nullptr;
    explicit Node(int v) : val(v) {}
};

int height(Node* r) {
    return r ? 1 + max(height(r->left), height(r->right)) : 0;
}
int countNodes(Node* r) {
    return r ? 1 + countNodes(r->left) + countNodes(r->right) : 0;
}
int countLeaves(Node* r) {
    if (!r) return 0;
    if (!r->left && !r->right) return 1;
    return countLeaves(r->left) + countLeaves(r->right);
}

// diameter = longest path in edges; returns height, updates the answer
int diameterDfs(Node* r, int& best) {
    if (!r) return 0;
    int lh = diameterDfs(r->left, best);
    int rh = diameterDfs(r->right, best);
    best = max(best, lh + rh);
    return 1 + max(lh, rh);
}

vector<vector<int>> levelOrder(Node* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<Node*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        while (sz--) {
            Node* u = q.front(); q.pop();
            level.push_back(u->val);
            if (u->left)  q.push(u->left);
            if (u->right) q.push(u->right);
        }
        res.push_back(level);
    }
    return res;
}

void invert(Node* r) {
    if (!r) return;
    swap(r->left, r->right);
    invert(r->left); invert(r->right);
}

int main() {
    Node* root = new Node(1);
    root->left = new Node(2); root->right = new Node(3);
    root->left->left = new Node(4); root->left->right = new Node(5);

    cout << height(root) << ' ' << countNodes(root) << ' ' << countLeaves(root) << '\n'; // 3 5 3
    int d = 0; diameterDfs(root, d);
    cout << "diameter = " << d << '\n';        // 3
    for (auto& lvl : levelOrder(root)) { for (int v : lvl) cout << v << ' '; cout << "| "; }
    cout << '\n';                               // 1 | 2 3 | 4 5 |
    invert(root);
    cout << root->left->val << '\n';            // 3
}
```
`,
};

export default topic;
