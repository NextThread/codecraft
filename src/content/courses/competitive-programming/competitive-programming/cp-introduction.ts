import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "cp-introduction",
  title: "Intro to Competitive Programming",
  description: "What competitive programming is, why it helps, and where to practice.",
  readingTime: 6,
  content: `
# Introduction to Competitive Programming

## What is Competitive Programming?

**Competitive Programming (CP)** is the sport of solving well-defined algorithmic problems within strict **time** and **memory** limits. You are given a problem statement, input/output format, constraints, and you must write a program that produces the correct output for **every** valid input — including the biggest and nastiest ones — fast enough to fit inside the time limit (usually 1–2 seconds).

CP is a mix of three skills:

1. **Math & problem solving** — reduce the problem to a known pattern (greedy, DP, graph, number theory, etc.).
2. **Algorithms & data structures** — pick the right tool with the right complexity.
3. **Fast, clean coding** — usually in **C++** because of its speed and STL (\`vector\`, \`map\`, \`set\`, \`sort\`, \`priority_queue\`, ...).

## Why learn Competitive Programming?

- Sharpens your **problem-solving** and **debugging** brain.
- Builds a strong foundation for **technical interviews** (Google, Meta, Amazon, etc.).
- Teaches you to think about **complexity, edge cases, overflow, and constraints** — not just "does it work on my example".
- It's genuinely fun once you start solving.

## The typical workflow

1. Read the problem carefully. Note constraints (\`N ≤ 10^5\`, values up to \`10^9\`, etc.).
2. Estimate what complexity fits (see the Time Complexity chapter).
3. Design an algorithm on paper.
4. Code it (usually in C++).
5. Test on samples and edge cases.
6. Submit. If **WA / TLE / RE**, debug and retry.

## Language of choice: C++

Most competitive programmers use **C++** because:

- Very fast execution.
- Rich **STL** (Standard Template Library).
- Short, expressive syntax with \`auto\`, range-for, lambdas.

A minimal CP-style C++ template:

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    sort(a.begin(), a.end());

    for (int x : a) cout << x << ' ';
    cout << '\\n';
    return 0;
}
\`\`\`

## Where to practice

Some of the best free judges to practice on:

- [Codeforces](https://codeforces.com/) — regular contests (Div. 4, Div. 3, Div. 2, Div. 1), huge problemset, ratings.
- [AtCoder](https://atcoder.jp/) — beautifully written problems, weekly Beginner Contests (ABC) are perfect for starting.
- [LeetCode](https://leetcode.com/) — great for interview-style problems and daily practice.
- [CSES Problem Set](https://cses.fi/problemset/) — a curated ladder of classic problems by topic.

:::info
**Suggested path:** solve **Codeforces Div. 4 / ABC A–C** problems until they feel easy, then move up to Div. 3 and ABC D. Do not skip the basics.
:::

## What we'll cover next

The following chapters build the exact toolkit you need to start solving:

1. **Time Complexity** — how to estimate if your solution will fit in the time limit.
2. **Space Complexity** — how much memory your algorithm uses.
3. **Bit Manipulation** — a superpower for tricks, sets, and speedups.
`,
};

export default topic;
