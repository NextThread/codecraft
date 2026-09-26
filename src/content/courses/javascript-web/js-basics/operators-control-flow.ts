import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "js-operators-control-flow",
  title: "Operators & Control Flow",
  description: "Arithmetic, comparison, logical operators, if/else, switch, and loops.",
  readingTime: 7,
  content: `
# Operators & Control Flow

## Theory

### Operators

- **Arithmetic:** \`+ - * / % **\` (exponent)
- **Comparison:** \`=== !== < > <= >=\`
- **Logical:** \`&& || !\` and **nullish coalescing** \`??\`
- **Optional chaining:** \`obj?.prop\` — safe access on possibly-null objects

\`??\` vs \`||\`: \`||\` falls back on *any* falsy value (\`0\`, \`""\`), \`??\` only on \`null\`/\`undefined\`.

### Control flow

- \`if / else if / else\`
- \`switch\` with \`break\`
- **Loops:** \`for\`, \`while\`, \`do...while\`, \`for...of\` (values), \`for...in\` (keys)
- \`break\` exits the loop, \`continue\` skips to the next iteration

### Truthy & falsy

Falsy values: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Everything else is truthy — including empty arrays \`[]\` and objects \`{}\`.

## JavaScript Implementation

\`\`\`javascript
// Nullish coalescing vs OR
const port = 0;
console.log(port || 8080);   // 8080 (0 is falsy — wrong!)
console.log(port ?? 8080);   // 0    (correct)

// Optional chaining
const user = { profile: { name: "Roy" } };
console.log(user.profile?.name);    // "Roy"
console.log(user.settings?.theme);  // undefined (no crash)

// switch
const day = "Mon";
switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend!");
    break;
  default:
    console.log("Weekday");
}

// Loops
const skills = ["HTML", "CSS", "JS"];
for (const skill of skills) console.log(skill);

for (let i = 0; i < 3; i++) {
  if (i === 1) continue;
  console.log("i =", i);
}
\`\`\`

**Output**
\`\`\`text
8080
0
Roy
undefined
Weekday
HTML
CSS
JS
i = 0
i = 2
\`\`\`
`,
};

export default topic;
