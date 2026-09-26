import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-todo-app-project",
  title: "Mini Project: Todo App",
  description: "Combine DOM, events, and localStorage into a complete working app.",
  readingTime: 10,
  content: `
# Mini Project: Todo App

## Theory

Let's combine everything from this course — DOM manipulation, event delegation, and localStorage — into one complete, persistent todo app.

### Architecture

1. **State:** a single array of todo objects (\`{ id, text, done }\`).
2. **Render:** one function redraws the list from state — the source of truth is data, not the DOM.
3. **Persistence:** every change saves to \`localStorage\`.
4. **Events:** one delegated listener handles toggle + delete.

This "state → render" loop is the same idea behind React and every modern framework.

## JavaScript Implementation

\`\`\`html
<form id="add-form">
  <input name="text" placeholder="What needs doing?" required />
  <button>Add</button>
</form>
<ul id="todos"></ul>

<script>
  const KEY = "todo-app-v1";
  let todos = JSON.parse(localStorage.getItem(KEY) ?? "[]");

  const list = document.querySelector("#todos");
  const form = document.querySelector("#add-form");

  const save = () => localStorage.setItem(KEY, JSON.stringify(todos));

  function render() {
    list.innerHTML = "";
    for (const todo of todos) {
      const li = document.createElement("li");
      li.dataset.id = todo.id;
      li.innerHTML = \`
        <label>
          <input type="checkbox" \${todo.done ? "checked" : ""} />
          <span style="\${todo.done ? "text-decoration:line-through" : ""}">
            \${todo.text}
          </span>
        </label>
        <button data-del>✕</button>\`;
      list.append(li);
    }
  }

  // Add
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = new FormData(form).get("text").trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, done: false });
    save(); render(); form.reset();
  });

  // Toggle & delete — ONE delegated listener
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.matches("[data-del]")) {
      todos = todos.filter(t => t.id !== id);
    } else if (e.target.matches("input[type=checkbox]")) {
      const todo = todos.find(t => t.id === id);
      todo.done = !todo.done;
    }
    save(); render();
  });

  render();
</script>
\`\`\`

**What you built:** add, complete, and delete tasks — all persisted across reloads, in under 60 lines.
`,
};

export default topic;
