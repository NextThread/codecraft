import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-variables-types",
  title: "Variables & Data Types",
  description: "let, const, var, and the seven primitive types plus objects.",
  readingTime: 7,
  content: `
# Variables & Data Types

## Theory

### Declaring variables

| Keyword | Reassignable | Redeclarable | Scope | Hoisting |
|---|---|---|---|---|
| \`const\` | No | No | Block | TDZ (error before init) |
| \`let\` | Yes | No | Block | TDZ |
| \`var\` | Yes | Yes | Function | \`undefined\` |

**Rule of thumb:** use \`const\` by default, \`let\` when you must reassign, never \`var\`.

### Primitive types (7)

\`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`

Everything else — objects, arrays, functions — is an **object**. Primitives are compared by value; objects by reference.

### Type coercion

JavaScript converts types automatically, sometimes surprisingly:

\`\`\`text
"5" + 3     // "53"   (number -> string)
"5" - 3     // 2      (string -> number)
"" == 0     // true   (loose equality coerces)
"" === 0    // false  (strict: no coercion)
\`\`\`

Always use \`===\` / \`!==\`.

## JavaScript Implementation

\`\`\`javascript
const PI = 3.14159;
let score = 0;
score = 10;               // OK, let is reassignable

// Template literals
const user = "Anurag";
console.log(\`Welcome, \${user}! Score = \${score}\`);

// BigInt for huge integers
const huge = 9007199254740991n + 2n;
console.log(huge);        // 9007199254740993n

// null vs undefined
let a;                    // undefined (not assigned yet)
let b = null;             // null (intentionally empty)
console.log(a, b);

// Reference vs value
const arr1 = [1, 2, 3];
const arr2 = arr1;        // same reference!
arr2.push(4);
console.log(arr1);        // [1, 2, 3, 4]
\`\`\`

**Output**
\`\`\`text
Welcome, Anurag! Score = 10
9007199254740993n
undefined null
[ 1, 2, 3, 4 ]
\`\`\`
`,
};

export default topic;
