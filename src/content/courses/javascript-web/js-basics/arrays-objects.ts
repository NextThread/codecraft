import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-arrays-objects",
  title: "Arrays & Objects",
  description: "Array methods (map, filter, reduce), object literals, destructuring, and spread.",
  readingTime: 9,
  content: `
# Arrays & Objects

## Theory

### Essential array methods

| Method | Returns | Purpose |
|---|---|---|
| \`map(fn)\` | new array | transform each element |
| \`filter(fn)\` | new array | keep elements passing a test |
| \`reduce(fn, init)\` | single value | fold array into one result |
| \`find(fn)\` | element | first match |
| \`some / every\` | boolean | any / all pass a test |
| \`sort(fn)\` | same array (mutates!) | ordering — always pass a comparator for numbers |

These methods are the backbone of everyday JavaScript — master them early.

### Objects

Key-value collections. Keys are strings (or symbols); values can be anything, including functions (then called *methods*).

### Destructuring & spread

\`\`\`javascript
const [first, ...rest] = [1, 2, 3];       // array destructuring
const { name, age = 18 } = person;         // object destructuring + default
const copy = { ...person, city: "Kolkata" }; // spread + override
\`\`\`

## JavaScript Implementation

\`\`\`javascript
const products = [
  { name: "Laptop", price: 55000 },
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1500 },
];

// map + filter + reduce pipeline
const expensiveNames = products
  .filter(p => p.price > 1000)
  .map(p => p.name);
console.log(expensiveNames);              // ["Laptop", "Keyboard"]

const total = products.reduce((sum, p) => sum + p.price, 0);
console.log("Total:", total);             // Total: 57000

// Object destructuring
const { name, price } = products[0];
console.log(\`\${name} costs \${price}\`);

// Spread to merge
const defaults = { theme: "dark", lang: "en" };
const settings = { ...defaults, lang: "bn" };
console.log(settings);                    // { theme: "dark", lang: "bn" }

// Numeric sort needs a comparator
console.log([10, 1, 5].sort((a, b) => a - b)); // [1, 5, 10]
\`\`\`

**Output**
\`\`\`text
[ 'Laptop', 'Keyboard' ]
Total: 57000
Laptop costs 55000
{ theme: 'dark', lang: 'bn' }
[ 1, 5, 10 ]
\`\`\`
`,
};

export default topic;
