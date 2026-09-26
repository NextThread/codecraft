import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-dom-basics",
  title: "DOM Basics",
  description: "Selecting, creating, and modifying elements in the Document Object Model.",
  readingTime: 8,
  content: `
# DOM Basics

## Theory

The **DOM (Document Object Model)** is the browser's live tree representation of your HTML. JavaScript can read and change it — that's how pages become interactive.

### Selecting elements

| Method | Returns | Example |
|---|---|---|
| \`querySelector(css)\` | first match | \`document.querySelector(".btn")\` |
| \`querySelectorAll(css)\` | NodeList | \`document.querySelectorAll("li")\` |
| \`getElementById(id)\` | element | legacy but fast |

### Reading & changing

- \`el.textContent\` — plain text (safe)
- \`el.innerHTML\` — HTML string (beware XSS with user input!)
- \`el.classList.add/remove/toggle("cls")\`
- \`el.setAttribute("href", url)\`, \`el.style.color = "red"\`

### Creating & inserting

\`document.createElement(tag)\` → set content → \`parent.append(child)\`.

## JavaScript Implementation

\`\`\`html
<ul id="todo-list"></ul>
<button id="add-btn">Add item</button>

<script>
  const list = document.querySelector("#todo-list");
  const btn = document.querySelector("#add-btn");
  let count = 0;

  btn.addEventListener("click", () => {
    count++;
    const li = document.createElement("li");
    li.textContent = \`Task #\${count}\`;
    li.classList.add("task");
    list.append(li);
  });
</script>
\`\`\`

Each click appends a new \`<li>Task #N</li>\` to the list — no page reload.

### Traversal example

\`\`\`javascript
const first = list.firstElementChild;
console.log(first?.textContent);          // "Task #1"
console.log(list.children.length);        // number of tasks
\`\`\`
`,
};

export default topic;
