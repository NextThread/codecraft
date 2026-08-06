import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "queue",
  title: "Queue",
  description: "FIFO container, circular buffer and BFS usage.",
  readingTime: 4,
  content: `

# Queue

## Theory

A **queue** is First-In-First-Out: you push at the back and pop from the front. All operations are O(1).

- \`push(x)\` / \`enqueue\`
- \`pop()\` / \`dequeue\`
- \`front()\`, \`back()\`, \`size()\`, \`empty()\`

### Implementations

- **Circular buffer** over an array: keep \`head\`, \`tail\` indices modulo capacity — no shifting.
- **Linked list**: keep pointers to both ends.
- \`std::queue<T>\` (adapter over \`std::deque\`) in C++.

### Where queues appear

- **BFS** on graphs and grids — shortest path in unweighted graphs.
- **0-1 BFS** with a deque, **Dijkstra** with a priority queue (a "best-first" queue).
- Multi-source BFS (rotting oranges, nearest-zero distance), topological sort (Kahn's algorithm).
- Producer/consumer buffers, task scheduling, sliding-window problems (with a deque).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// fixed-capacity circular queue
struct CircularQueue {
    vector<int> buf;
    int head = 0, cnt = 0;
    explicit CircularQueue(int cap) : buf(cap) {}

    bool push(int v) {
        if (cnt == (int)buf.size()) return false;      // full
        buf[(head + cnt) % buf.size()] = v;
        ++cnt;
        return true;
    }
    bool pop() {
        if (!cnt) return false;
        head = (head + 1) % buf.size();
        --cnt;
        return true;
    }
    int front() const { return buf[head]; }
    bool empty() const { return cnt == 0; }
};

// BFS shortest distances from a source
vector<int> bfs(const vector<vector<int>>& g, int src) {
    vector<int> dist(g.size(), -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u])
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
    return dist;
}

int main() {
    CircularQueue cq(3);
    cq.push(1); cq.push(2); cq.push(3);
    cout << cq.front() << '\\n';          // 1
    cq.pop(); cq.push(4);                // wraps around
    while (!cq.empty()) { cout << cq.front() << ' '; cq.pop(); }
    cout << '\\n';                        // 2 3 4

    vector<vector<int>> g = {{1,2},{0,3},{0},{1,4},{3}};
    for (int d : bfs(g, 0)) cout << d << ' ';   // 0 1 1 2 3
    cout << '\\n';
}
\`\`\`
`,
};

export default topic;
