import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-callbacks-promises",
  title: "Callbacks & Promises",
  description: "Asynchronous JavaScript: the event loop, callbacks, and the Promise API.",
  readingTime: 9,
  content: `
# Callbacks & Promises

## Theory

JavaScript is **single-threaded** — one thing runs at a time. Long operations (network, timers) are handed to the browser, and your callback runs later via the **event loop**.

### Callbacks

A function passed to be called when an operation finishes:

\`\`\`javascript
setTimeout(() => console.log("1 second later"), 1000);
\`\`\`

Nested callbacks lead to "callback hell" — hard to read and handle errors.

### Promises

A **Promise** represents a value that will exist *later*. Three states: **pending → fulfilled** or **rejected**.

\`\`\`javascript
fetch("/api/user")
  .then(res => res.json())     // runs on success
  .then(user => console.log(user))
  .catch(err => console.error(err))  // any failure lands here
  .finally(() => console.log("done"));
\`\`\`

### Creating a promise

\`\`\`javascript
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
\`\`\`

### Combinators

- \`Promise.all([...])\` — all must succeed; fails fast
- \`Promise.allSettled([...])\` — waits for all, never rejects
- \`Promise.race([...])\` — first to settle wins
- \`Promise.any([...])\` — first to *succeed* wins

## JavaScript Implementation

\`\`\`javascript
const wait = (ms) => new Promise(res => setTimeout(res, ms));

// Chaining
wait(500)
  .then(() => {
    console.log("half a second passed");
    return wait(500);
  })
  .then(() => console.log("one second total"));

// Promise.all — run in parallel
const p1 = wait(300).then(() => "A");
const p2 = wait(100).then(() => "B");
Promise.all([p1, p2]).then(results => console.log(results)); // ["A", "B"]

// Handling rejection
Promise.reject(new Error("boom"))
  .catch(err => console.log("caught:", err.message));
\`\`\`

**Output**
\`\`\`text
caught: boom
half a second passed
[ 'A', 'B' ]
one second total
\`\`\`
`,
};

export default topic;
