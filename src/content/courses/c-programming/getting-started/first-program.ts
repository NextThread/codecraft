import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "first-program",
  title: "Your First Program",
  description: "Write, compile and run Hello, World in C.",
  readingTime: 4,
  content: `
# Your First Program

## Hello, World

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### Line-by-line

- \`#include <stdio.h>\` — imports the *standard input/output* library so we can use \`printf\`.
- \`int main(void)\` — the entry point of the program. Returns an \`int\` to the operating system.
- \`printf(...)\` — sends formatted text to the screen.
- \`\\n\` — newline escape sequence, moves the cursor to the next line.
- \`return 0;\` — tells the OS the program finished successfully.

## Compile and run

On Linux/macOS with **gcc**:

\`\`\`bash
gcc hello.c -o hello
./hello
\`\`\`

On Windows with **MinGW**:

\`\`\`bash
gcc hello.c -o hello.exe
hello.exe
\`\`\`

**Output**
\`\`\`text
Hello, World!
\`\`\`

## Program 2: greeting with a name

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[50];
    printf("What is your name? ");
    scanf("%49s", name);
    printf("Nice to meet you, %s!\\n", name);
    return 0;
}
\`\`\`

**Sample run**
\`\`\`text
What is your name? Riya
Nice to meet you, Riya!
\`\`\`

## Program 3: print a small pattern

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 4; i++) {
        for (int j = 0; j < i; j++) printf("* ");
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Output**
\`\`\`text
* 
* * 
* * * 
* * * * 
\`\`\`

:::info
Escape sequences: \`\\n\` newline, \`\\t\` tab, \`\\\\\` backslash, \`\\"\` double quote.
:::
`,
};

export default topic;
