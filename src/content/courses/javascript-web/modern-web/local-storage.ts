import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-local-storage",
  title: "Web Storage (localStorage)",
  description: "Persisting data in the browser with localStorage and sessionStorage.",
  readingTime: 6,
  content: `
# Web Storage (localStorage)

## Theory

Browsers offer simple key-value storage that survives page reloads:

| API | Lifetime | Capacity |
|---|---|---|
| \`localStorage\` | until cleared | ~5–10 MB |
| \`sessionStorage\` | until tab closes | ~5 MB |

### API

\`\`\`javascript
localStorage.setItem("key", "value");   // strings only!
localStorage.getItem("key");            // null if missing
localStorage.removeItem("key");
localStorage.clear();
\`\`\`

### Storing objects

Values must be strings — serialize with \`JSON.stringify\` / \`JSON.parse\`:

\`\`\`javascript
localStorage.setItem("user", JSON.stringify({ name: "Roy" }));
const user = JSON.parse(localStorage.getItem("user") ?? "{}");
\`\`\`

**Never store passwords or tokens here** — any script on the page can read it.

## JavaScript Implementation

A persistent todo list:

\`\`\`html
<input id="todo-input" placeholder="New task" />
<button id="save-btn">Save</button>
<ul id="todos"></ul>

<script>
  const KEY = "my-todos";
  const input = document.querySelector("#todo-input");
  const list = document.querySelector("#todos");

  // Load saved todos (or start empty)
  let todos = JSON.parse(localStorage.getItem(KEY) ?? "[]");

  function render() {
    list.innerHTML = todos.map(t => \`<li>\${t}</li>\`).join("");
  }

  document.querySelector("#save-btn").addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    todos.push(text);
    localStorage.setItem(KEY, JSON.stringify(todos));  // persist!
    input.value = "";
    render();
  });

  render();  // show saved todos on page load
</script>
\`\`\`

Reload the page — your tasks are still there.
`,
};

export default topic;
