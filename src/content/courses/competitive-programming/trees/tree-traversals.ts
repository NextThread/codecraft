import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "tree-traversals",
  title: "Tree Traversals",
  description: "Preorder, inorder, postorder, level order \u2014 recursive and iterative.",
  readingTime: 6,
  content: `

# Tree Traversals

## Theory

### Depth-first orders

| Order | Visit sequence | Typical use |
|-------|----------------|-------------|
| **Preorder** | root, left, right | copy/serialize a tree, prefix expression |
| **Inorder** | left, root, right | sorted output of a BST |
| **Postorder** | left, right, root | free/delete nodes, compute subtree values, postfix expression |

All three are O(n) time, O(h) stack space.

### Breadth-first order

**Level order** uses a queue and visits nodes depth by depth — O(n) time, O(width) memory. Variants: zigzag/spiral, right-side view, level averages.

### Iterative versions

- Preorder: push root; pop, output, push right then left.
- Inorder: descend pushing left children; pop, output, move to the right child.
- Postorder: run "root, right, left" and reverse, or use two stacks.
- **Morris traversal** does inorder in O(1) extra space by temporarily linking predecessors.

### Reconstruction

- preorder + inorder → unique tree.
- postorder + inorder → unique tree.
- preorder + postorder → unique only for full binary trees.

In competitive programming the same three orders on a general (rooted) tree give the **Euler tour**, used for subtree ranges and LCA.

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int val;
    Node *left = nullptr, *right = nullptr;
    explicit Node(int v) : val(v) {}
};

void preorder(Node* r, vector<int>& out) {
    if (!r) return;
    out.push_back(r->val); preorder(r->left, out); preorder(r->right, out);
}
void inorder(Node* r, vector<int>& out) {
    if (!r) return;
    inorder(r->left, out); out.push_back(r->val); inorder(r->right, out);
}
void postorder(Node* r, vector<int>& out) {
    if (!r) return;
    postorder(r->left, out); postorder(r->right, out); out.push_back(r->val);
}

vector<int> iterativeInorder(Node* root) {
    vector<int> out;
    stack<Node*> st;
    Node* cur = root;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }
        cur = st.top(); st.pop();
        out.push_back(cur->val);
        cur = cur->right;
    }
    return out;
}

vector<int> iterativePreorder(Node* root) {
    vector<int> out;
    if (!root) return out;
    stack<Node*> st; st.push(root);
    while (!st.empty()) {
        Node* u = st.top(); st.pop();
        out.push_back(u->val);
        if (u->right) st.push(u->right);
        if (u->left)  st.push(u->left);
    }
    return out;
}

vector<int> levelOrder(Node* root) {
    vector<int> out;
    if (!root) return out;
    queue<Node*> q; q.push(root);
    while (!q.empty()) {
        Node* u = q.front(); q.pop();
        out.push_back(u->val);
        if (u->left)  q.push(u->left);
        if (u->right) q.push(u->right);
    }
    return out;
}

// rebuild from preorder + inorder
Node* build(const vector<int>& pre, const vector<int>& in,
            int pl, int pr, int il, int ir, unordered_map<int,int>& pos) {
    if (pl > pr) return nullptr;
    Node* root = new Node(pre[pl]);
    int k = pos[pre[pl]], leftSize = k - il;
    root->left  = build(pre, in, pl + 1, pl + leftSize, il, k - 1, pos);
    root->right = build(pre, in, pl + leftSize + 1, pr, k + 1, ir, pos);
    return root;
}

int main() {
    Node* root = new Node(1);
    root->left = new Node(2); root->right = new Node(3);
    root->left->left = new Node(4); root->left->right = new Node(5);

    vector<int> a, b, c;
    preorder(root, a); inorder(root, b); postorder(root, c);
    for (int x : a) cout << x << ' '; cout << '\n';   // 1 2 4 5 3
    for (int x : b) cout << x << ' '; cout << '\n';   // 4 2 5 1 3
    for (int x : c) cout << x << ' '; cout << '\n';   // 4 5 2 3 1
    for (int x : iterativeInorder(root)) cout << x << ' '; cout << '\n';
    for (int x : levelOrder(root)) cout << x << ' ';  cout << '\n';   // 1 2 3 4 5

    unordered_map<int,int> pos;
    for (int i = 0; i < (int)b.size(); ++i) pos[b[i]] = i;
    Node* rebuilt = build(a, b, 0, a.size()-1, 0, b.size()-1, pos);
    for (int x : levelOrder(rebuilt)) cout << x << ' '; cout << '\n';  // 1 2 3 4 5
}
```
`,
};

export default topic;
