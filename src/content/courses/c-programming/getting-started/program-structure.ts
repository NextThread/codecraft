import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "program-structure",
  title: "Structure of a C Program",
  description: "The anatomy of every C program: preprocessor, main, statements.",
  readingTime: 5,
  content: `
# Structure of a C Program

Every C program — from a two-line "hello" to a full operating system kernel — follows the same basic skeleton.

## The skeleton

\`\`\`c
// 1. Documentation section (optional comments)
/* Program: greet.c
   Purpose: print a friendly greeting */

// 2. Preprocessor / link section
#include <stdio.h>

// 3. Global declarations
#define GREETING "Hello!"

// 4. Function prototypes
void greet(void);

// 5. main() — program entry point
int main(void) {
    greet();
    return 0;
}

// 6. Function definitions
void greet(void) {
    printf("%s\\n", GREETING);
}
\`\`\`

## The six sections explained

1. **Documentation section** — comments describing what the file does.
2. **Preprocessor / link section** — \`#include\` for headers, \`#define\` for macros.
3. **Global declarations** — variables and constants visible to the whole file.
4. **Function prototypes** — tell the compiler what functions exist.
5. **\`main()\`** — every C program must have exactly one \`main\` function. Execution starts here.
6. **Function definitions** — the actual code of your custom functions.

## Comments

\`\`\`c
// single-line comment
/* multi-line
   comment */
\`\`\`

## Statements and semicolons

Every statement in C ends with a semicolon (\`;\`). Blocks of statements are wrapped in braces \`{ }\`.

## Program 1: a simple calculator layout

\`\`\`c
#include <stdio.h>

int add(int a, int b);
int subtract(int a, int b);

int main(void) {
    int a = 10, b = 4;
    printf("Sum        = %d\\n", add(a, b));
    printf("Difference = %d\\n", subtract(a, b));
    return 0;
}

int add(int a, int b)      { return a + b; }
int subtract(int a, int b) { return a - b; }
\`\`\`

**Output**
\`\`\`text
Sum        = 14
Difference = 6
\`\`\`

## Program 2: using a global constant

\`\`\`c
#include <stdio.h>
#define PI 3.14159

float area_of_circle(float r);

int main(void) {
    float r = 7.0f;
    printf("Area = %.2f\\n", area_of_circle(r));
    return 0;
}

float area_of_circle(float r) {
    return PI * r * r;
}
\`\`\`

**Output**
\`\`\`text
Area = 153.94
\`\`\`
`,
};

export default topic;
