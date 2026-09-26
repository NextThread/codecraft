import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-fetch-api",
  title: "Fetch API & JSON",
  description: "Making HTTP requests, parsing JSON, and rendering API data in the page.",
  readingTime: 8,
  content: `
# Fetch API & JSON

## Theory

\`fetch(url)\` performs HTTP requests and returns a Promise resolving to a \`Response\`.

### The two-step dance

\`\`\`javascript
const res = await fetch("https://api.example.com/users");
const data = await res.json();   // parsing the body is ALSO async
\`\`\`

### Important gotchas

- \`fetch\` only rejects on **network failure** — a 404 or 500 still "succeeds". Check \`res.ok\` yourself.
- Always handle errors and loading states in real apps.

### POST requests

\`\`\`javascript
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New post" }),
});
\`\`\`

## JavaScript Implementation

\`\`\`html
<ul id="users">Loading...</ul>

<script>
  async function loadUsers() {
    const list = document.querySelector("#users");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=5");
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

      const users = await res.json();
      list.innerHTML = "";  // clear "Loading..."
      for (const user of users) {
        const li = document.createElement("li");
        li.textContent = \`\${user.name} — \${user.email}\`;
        list.append(li);
      }
    } catch (err) {
      list.textContent = \`Failed to load: \${err.message}\`;
    }
  }

  loadUsers();
</script>
\`\`\`

### POST example

\`\`\`javascript
async function createPost(title) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId: 1 }),
  });
  const created = await res.json();
  console.log("Created post id:", created.id);
}
\`\`\`
`,
};

export default topic;
