import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-es-modules",
  title: "ES Modules",
  description: "import/export, named vs default exports, and organizing code into files.",
  readingTime: 6,
  content: `
# ES Modules

## Theory

Modern JavaScript splits code into **modules** — files that explicitly export and import what they need.

### Export styles

\`\`\`javascript
// math.js — named exports (can have many)
export const PI = 3.14159;
export function area(r) { return PI * r * r; }

// logger.js — default export (one per file)
export default function log(msg) { console.log(\`[LOG] \${msg}\`); }
\`\`\`

### Import styles

\`\`\`javascript
import log from "./logger.js";              // default
import { PI, area } from "./math.js";       // named (must match names)
import * as math from "./math.js";          // namespace import
\`\`\`

### In the browser

\`\`\`html
<script type="module" src="app.js"></script>
\`\`\`

\`type="module"\` scripts are deferred by default, run in strict mode, and get their own scope.

## JavaScript Implementation

\`\`\`javascript
// utils/currency.js
export const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

// utils/cart.js
export default class Cart {
  #items = [];                       // private field
  add(item) { this.#items.push(item); }
  total() { return this.#items.reduce((s, i) => s + i.price, 0); }
}

// app.js
import Cart from "./utils/cart.js";
import { formatINR } from "./utils/currency.js";

const cart = new Cart();
cart.add({ name: "Book", price: 450 });
cart.add({ name: "Pen", price: 50 });
console.log(formatINR(cart.total()));   // ₹500.00
\`\`\`
`,
};

export default topic;
