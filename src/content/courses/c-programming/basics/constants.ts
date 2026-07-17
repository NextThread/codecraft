import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "constants",
  title: "Constants",
  description: "Values that never change: literals, #define and const.",
  readingTime: 5,
  content: `
# Constants

A **constant** is a fixed value that cannot be modified once defined. Constants make your programs safer and easier to read — a magic number like \`3.14159\` becomes a self-documenting \`PI\`.

## Types of constants in C

1. **Integer constants** — \`10\`, \`0xFF\` (hex), \`0755\` (octal), \`42L\` (long).
2. **Floating-point constants** — \`3.14\`, \`2.5e-3\`, \`1.0f\`.
3. **Character constants** — \`'A'\`, \`'\\n'\`, \`'\\0'\`.
4. **String constants** — \`"Hello"\`.
5. **Enumeration constants** — declared with \`enum\`.

## Two ways to define named constants

**Using \`#define\` (preprocessor macro):**

\`\`\`c
#define PI 3.14159
#define MAX 100
#define GREETING "Hello!"
\`\`\`

The preprocessor replaces every occurrence *before* compilation. No memory is used and no type checking is done.

**Using the \`const\` keyword:**

\`\`\`c
const float pi = 3.14159f;
const int   max = 100;
\`\`\`

\`const\` variables are type-checked by the compiler and occupy memory like any other variable.

## Program 1: area and circumference

\`\`\`c
#include <stdio.h>
#define PI 3.14159

int main(void) {
    const float radius = 5.0f;
    float area          = PI * radius * radius;
    float circumference = 2 * PI * radius;

    printf("Area          = %.2f\\n", area);
    printf("Circumference = %.2f\\n", circumference);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Area          = 78.54
Circumference = 31.42
\`\`\`

## Program 2: enum as constants

\`\`\`c
#include <stdio.h>

enum Day { MON = 1, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    enum Day today = WED;
    printf("Today is day number %d of the week.\\n", today);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Today is day number 3 of the week.
\`\`\`

## Program 3: const protects you from mistakes

\`\`\`c
#include <stdio.h>

int main(void) {
    const int MAX_USERS = 50;
    // MAX_USERS = 100;   // ❌ compile error: assignment of read-only variable
    printf("Max users allowed: %d\\n", MAX_USERS);
    return 0;
}
\`\`\`
`,
};

export default topic;
