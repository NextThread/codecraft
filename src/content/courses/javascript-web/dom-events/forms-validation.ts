import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-forms-validation",
  title: "Forms & Validation",
  description: "Reading form values, FormData, and client-side validation patterns.",
  readingTime: 7,
  content: `
# Forms & Validation

## Theory

### Reading values

- \`input.value\` — current text of an input
- \`checkbox.checked\` — boolean
- \`new FormData(form)\` — all fields at once, keyed by \`name\` attributes

### Validation strategies

1. **HTML attributes:** \`required\`, \`minlength\`, \`type="email"\`, \`pattern\` — free, but limited styling.
2. **Constraint Validation API:** \`input.checkValidity()\`, \`input.setCustomValidity(msg)\`.
3. **Custom JS:** full control — validate on \`submit\` and/or \`input\` events.

Always validate **again on the server** — client-side validation is for UX, not security.

## JavaScript Implementation

\`\`\`html
<form id="signup" novalidate>
  <input name="username" placeholder="Username" />
  <input name="password" type="password" placeholder="Password" />
  <p id="error" style="color:red"></p>
  <button>Sign up</button>
</form>

<script>
  const form = document.querySelector("#signup");
  const error = document.querySelector("#error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const username = data.get("username").trim();
    const password = data.get("password");

    // Custom validation
    if (username.length < 3) {
      error.textContent = "Username must be at least 3 characters.";
      return;
    }
    if (password.length < 8) {
      error.textContent = "Password must be at least 8 characters.";
      return;
    }

    error.textContent = "";
    console.log("Signed up:", username);
    form.reset();
  });
</script>
\`\`\`

### Live validation on input

\`\`\`javascript
form.username.addEventListener("input", (e) => {
  const ok = e.target.value.trim().length >= 3;
  e.target.style.borderColor = ok ? "green" : "red";
});
\`\`\`
`,
};

export default topic;
