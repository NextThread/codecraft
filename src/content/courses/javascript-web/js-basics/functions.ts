import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-functions",
  title: "Functions & Arrow Functions",
  description: "Declarations, expressions, arrow functions, default params, rest & spread.",
  readingTime: 8,
  content: `
# Functions & Arrow Functions

## Theory

### Three ways to define a function

\`\`\`javascript
// 1. Declaration — hoisted, can be called before definition
function add(a, b) { return a + b; }

// 2. Expression — not hoisted
const multiply = function (a, b) { return a * b; };

// 3. Arrow function — concise, no own 'this'
const square = (x) => x * x;
\`\`\`

### Arrow functions

- Omit \`function\` keyword; \`=> \` separates params and body.
- Single expression bodies return implicitly (no \`return\` needed).
- **No own \`this\`** — they inherit \`this\` from the surrounding scope, which makes them ideal for callbacks.

### Modern parameter features

- **Default params:** \`function greet(name = "guest")\`
- **Rest params:** \`function sum(...nums)\` collects arguments into an array
- **Spread:** \`f(...arr)\` expands an array into arguments

## JavaScript Implementation

\`\`\`javascript
// Default parameters
function greet(name = "guest") {
  return \`Hello, \${name}!\`;
}
console.log(greet());          // Hello, guest!
console.log(greet("Anurag"));  // Hello, Anurag!

// Rest parameters
const sum = (...nums) => nums.reduce((total, n) => total + n, 0);
console.log(sum(1, 2, 3, 4));  // 10

// Spread
const nums = [3, 7, 1];
console.log(Math.max(...nums)); // 7

// Arrow functions in callbacks
const doubled = [1, 2, 3].map(n => n * 2);
console.log(doubled);           // [2, 4, 6]

// Immediately Invoked Function Expression (IIFE)
(() => {
  console.log("Runs immediately!");
})();
\`\`\`

**Output**
\`\`\`text
Hello, guest!
Hello, Anurag!
10
7
[ 2, 4, 6 ]
Runs immediately!
\`\`\`
`,
};

export default topic;
