import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "linked-list",
  title: "Linked List",
  description: "Nodes linked by pointers: singly, doubly, and STL list.",
  readingTime: 6,
  content: `

# Linked List

## Theory

A **linked list** stores elements in separately allocated nodes; each node keeps the data plus a pointer to the next (and optionally previous) node.

\`\`\`
head -> [1|*] -> [2|*] -> [3|null]
\`\`\`

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Random access | O(1) | O(n) |
| Insert/erase at known position | O(n) | **O(1)** |
| Push front | O(n) | **O(1)** |
| Cache friendliness | excellent | poor |

### Variants

- **Singly linked** — one \`next\` pointer. Minimal memory.
- **Doubly linked** — \`next\` + \`prev\`, allows backward traversal and O(1) erase given an iterator (\`std::list\`).
- **Circular** — last node points back to head; useful for round-robin (Josephus problem).

### Classic techniques

- **Two pointers (slow/fast)** — find middle, detect a cycle (Floyd), find k-th from end.
- **Reversal** — iteratively rewire \`next\` pointers; base of "reverse in groups of k".
- **Dummy head** — removes special-casing when inserting/deleting the first node.

In competitive programming raw linked lists are rare (arrays with index "pointers" are faster), but the *idea* powers \`std::list\`, LRU caches and offline "delete element" tricks.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* next;
    explicit Node(int v) : data(v), next(nullptr) {}
};

// push at the front: O(1)
void pushFront(Node*& head, int v) {
    Node* node = new Node(v);
    node->next = head;
    head = node;
}

// push at the back: O(n)
void pushBack(Node*& head, int v) {
    Node* node = new Node(v);
    if (!head) { head = node; return; }
    Node* cur = head;
    while (cur->next) cur = cur->next;
    cur->next = node;
}

// iterative reversal: O(n) time, O(1) extra space
Node* reverseList(Node* head) {
    Node* prev = nullptr;
    while (head) {
        Node* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}

// middle node via slow/fast pointers
Node* middle(Node* head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow;
}

// Floyd's cycle detection
bool hasCycle(Node* head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

void print(Node* head) {
    for (Node* c = head; c; c = c->next) cout << c->data << " -> ";
    cout << "null\\n";
}

int main() {
    Node* head = nullptr;
    for (int v : {4, 3, 2, 1}) pushFront(head, v);   // 1 2 3 4
    pushBack(head, 5);
    print(head);                                     // 1 -> 2 -> 3 -> 4 -> 5 -> null

    cout << "middle = " << middle(head)->data << '\\n';
    head = reverseList(head);
    print(head);                                     // 5 -> 4 -> 3 -> 2 -> 1 -> null
    cout << "cycle? " << boolalpha << hasCycle(head) << '\\n';

    // STL doubly linked list
    list<int> l = {1, 2, 3};
    l.push_front(0);
    auto it = next(l.begin(), 2);
    l.erase(it);                                     // O(1) with an iterator
    for (int x : l) cout << x << ' ';                // 0 1 3
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
