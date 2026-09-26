import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-events",
  title: "Events & Event Delegation",
  description: "addEventListener, the event object, bubbling, and delegation patterns.",
  readingTime: 8,
  content: `
# Events & Event Delegation

## Theory

### Listening for events

\`\`\`javascript
element.addEventListener("click", (event) => {
  console.log("Clicked:", event.target);
});
\`\`\`

Common events: \`click\`, \`input\`, \`change\`, \`submit\`, \`keydown\`, \`mouseover\`, \`DOMContentLoaded\`.

### The event object

- \`event.target\` — the element that triggered the event
- \`event.currentTarget\` — the element the listener is attached to
- \`event.preventDefault()\` — stop default behavior (e.g. form submit navigation)
- \`event.stopPropagation()\` — stop the event from bubbling up

### Bubbling & delegation

Events **bubble** from the target up to \`document\`. Instead of attaching 100 listeners to 100 list items, attach **one** listener to the parent and inspect \`event.target\` — this is **event delegation**. It also works for elements added later dynamically.

## JavaScript Implementation

\`\`\`html
<ul id="menu">
  <li data-action="edit">Edit</li>
  <li data-action="delete">Delete</li>
  <li data-action="share">Share</li>
</ul>
<form id="login">
  <input name="email" placeholder="email" />
  <button>Log in</button>
</form>

<script>
  // ONE listener handles all current AND future <li> items
  document.querySelector("#menu").addEventListener("click", (e) => {
    const item = e.target.closest("li");
    if (!item) return;
    console.log("Action:", item.dataset.action);
  });

  // Prevent a form from reloading the page
  document.querySelector("#login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    console.log("Logging in:", email);
  });

  // Keyboard events
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") console.log("Escape pressed");
  });
</script>
\`\`\`
`,
};

export default topic;
