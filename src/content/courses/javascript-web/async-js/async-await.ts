import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-async-await",
  title: "Async / Await",
  description: "Writing asynchronous code that reads like synchronous code.",
  readingTime: 7,
  content: `
# Async / Await

## Theory

\`async/await\` is syntactic sugar over promises — same machinery, much cleaner code.

- An \`async\` function **always returns a Promise**.
- \`await\` pauses the function until the promise settles (without blocking the thread).
- Errors are handled with plain \`try / catch\`.

### Sequential vs parallel

\`\`\`javascript
// Sequential — slow (2s total)
const a = await wait(1000);
const b = await wait(1000);

// Parallel — fast (1s total)
const [a, b] = await Promise.all([wait(1000), wait(1000)]);
\`\`\`

Start independent operations first, then \`await\` them together.

## JavaScript Implementation

\`\`\`javascript
const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function loadDashboard() {
  try {
    console.log("loading...");
    const [user, stats] = await Promise.all([
      wait(400).then(() => ({ name: "Anurag" })),
      wait(600).then(() => ({ score: 1850 })),
    ]);
    console.log(\`\${user.name} — rating \${stats.score}\`);
  } catch (err) {
    console.error("Failed to load:", err.message);
  } finally {
    console.log("request finished");
  }
}

loadDashboard();

// Top-level style with .then for non-async contexts
(async () => {
  await wait(200);
  console.log("IIFE with await works too");
})();
\`\`\`

**Output**
\`\`\`text
loading...
Anurag — rating 1850
request finished
IIFE with await works too
\`\`\`
`,
};

export default topic;
