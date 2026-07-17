import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "variables",
  title: "Variables",
  description: "Declaring, initializing and using variables.",
  readingTime: 6,
  content: `
# Variables

A **variable** is a named location in memory that stores a value which can change during program execution.

## Declaration vs initialization

- **Declaration** — tells the compiler about a name and its type.
- **Initialization** — gives the variable its first value.

\`\`\`c
int age;           // declaration
age = 21;          // assignment

int marks = 95;    // declaration + initialization
float pi = 3.14f;
char grade = 'A';
\`\`\`

## Rules for identifier names

- Must start with a letter (A-Z, a-z) or underscore (\`_\`), never a digit.
- May contain letters, digits and underscores.
- Case-sensitive — \`Score\` and \`score\` are different variables.
- Cannot be a C keyword (\`int\`, \`return\`, \`while\`, …).
- No spaces or special characters.

## Scope and lifetime

- **Local variables** live inside a function or block; created when the block starts, destroyed when it ends.
- **Global variables** are declared outside all functions and exist for the whole program.

\`\`\`c
int counter = 0;   // global

void increment(void) {
    int step = 1;  // local
    counter += step;
}
\`\`\`

## Program 1: using variables

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[20] = "Aarav";
    int  age      = 20;
    float height  = 5.9f;

    printf("Name:   %s\\n", name);
    printf("Age:    %d\\n", age);
    printf("Height: %.1f ft\\n", height);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Name:   Aarav
Age:    20
Height: 5.9 ft
\`\`\`

## Program 2: swap two variables (without a third)

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 5, b = 9;
    printf("Before: a = %d, b = %d\\n", a, b);

    a = a + b;   // a = 14
    b = a - b;   // b = 5
    a = a - b;   // a = 9

    printf("After : a = %d, b = %d\\n", a, b);
    return 0;
}
\`\`\`

## Program 3: local vs global

\`\`\`c
#include <stdio.h>

int g = 100;   // global

void show(void) {
    int g = 5; // local hides global inside this function
    printf("Inside show: g = %d\\n", g);
}

int main(void) {
    printf("Before call: g = %d\\n", g);
    show();
    printf("After call : g = %d\\n", g);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Before call: g = 100
Inside show: g = 5
After call : g = 100
\`\`\`
`,
};

export default topic;
