import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "storage-classes",
  title: "Storage Classes",
  description: "auto, register, static and extern.",
  readingTime: 5,
  content: `
# Storage Classes

A **storage class** defines the **scope** (where a name is visible), **lifetime** (how long it lives) and **linkage** (whether other files can see it) of a variable or function.

| Class | Scope | Lifetime | Default value |
|-------|-------|----------|---------------|
| \`auto\` | Block | Block | garbage |
| \`register\` | Block | Block (hint: keep in CPU register) | garbage |
| \`static\` | Block/File | Whole program | 0 |
| \`extern\` | Global | Whole program (defined elsewhere) | 0 |

## \`auto\`

The default for local variables. You almost never write \`auto\` explicitly.

## \`register\`

A hint to the compiler to keep the variable in a CPU register for speed. Modern compilers usually ignore it — they know better than you.

## \`static\`

- Inside a function: the variable keeps its value **between calls**.
- Outside a function: limits the variable/function to the current file (internal linkage).

## \`extern\`

Declares a variable or function that is **defined in another file**. Used to share globals across multiple source files.

## Program 1: static counter

\`\`\`c
#include <stdio.h>

void counter(void) {
    static int count = 0;   // keeps its value between calls
    count++;
    printf("Called %d time(s)\\n", count);
}

int main(void) {
    counter();
    counter();
    counter();
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Called 1 time(s)
Called 2 time(s)
Called 3 time(s)
\`\`\`

## Program 2: auto vs static side by side

\`\`\`c
#include <stdio.h>

void demo(void) {
    auto   int a = 0;   // resets every call
    static int s = 0;   // keeps its value
    a++; s++;
    printf("auto = %d, static = %d\\n", a, s);
}

int main(void) {
    demo();
    demo();
    demo();
    return 0;
}
\`\`\`

**Output**
\`\`\`text
auto = 1, static = 1
auto = 1, static = 2
auto = 1, static = 3
\`\`\`

## Program 3: extern across a single file

\`\`\`c
#include <stdio.h>

extern int shared;   // declare — defined below

int main(void) {
    printf("shared = %d\\n", shared);
    return 0;
}

int shared = 99;     // definition
\`\`\`
`,
};

export default topic;
