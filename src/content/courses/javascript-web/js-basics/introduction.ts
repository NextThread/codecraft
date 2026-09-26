import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-introduction",
  title: "Introduction to JavaScript",
  description: "What JavaScript is, where it runs, and how to include it in a web page.",
  readingTime: 6,
  content: `
# Introduction to JavaScript

## Theory

JavaScript is the programming language of the web. It runs in every browser and (via Node.js) on servers too.

- **Created** in 1995 by Brendan Eich at Netscape.
- **Standardized** as ECMAScript (ES). Modern JS = ES6 (2015) and later yearly releases.
- **Dynamic & interpreted** — no compile step needed in the browser.
- **Multi-paradigm** — supports procedural, object-oriented, and functional styles.

### Where JavaScript runs

| Environment | Engine | Use |
|---|---|---|
| Chrome / Edge | V8 | Web pages |
| Firefox | SpiderMonkey | Web pages |
| Safari | JavaScriptCore | Web pages |
| Node.js | V8 | Servers, CLIs, tooling |

### Including JavaScript in a page

\`\`\`html
<!-- Inline -->
<script>
  console.log("Hello from inline JS");
</script>

<!-- External file (recommended) -->
<script src="app.js" defer></script>
\`\`\`

\`defer\` downloads the script in parallel and runs it after the HTML is parsed — the modern default.

## JavaScript Implementation

Your first program — open the browser console (F12) to see the output:

\`\`\`javascript
// app.js
console.log("Hello, JavaScript!");

// Values and types
const name = "CodeCraft";   // string
let year = 2026;            // number
const isFun = true;         // boolean

console.log(typeof name);   // "string"
console.log(typeof year);   // "number"
console.log(typeof isFun);  // "boolean"
\`\`\`

**Output**
\`\`\`text
Hello, JavaScript!
string
number
boolean
\`\`\`
`,
};

export default topic;
