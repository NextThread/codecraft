import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "input-output",
  title: "Input & Output",
  description: "printf, scanf and formatted I/O.",
  readingTime: 6,
  content: `
# Input & Output

C performs I/O through library functions declared in \`<stdio.h>\`. The two workhorses are **\`printf\`** (output) and **\`scanf\`** (input).

## Format specifiers

| Specifier | Type |
|-----------|------|
| \`%d\` / \`%i\` | int |
| \`%u\` | unsigned int |
| \`%ld\` | long |
| \`%f\` | float |
| \`%lf\` | double (scanf) |
| \`%c\` | char |
| \`%s\` | string |
| \`%x\` | hexadecimal |
| \`%o\` | octal |
| \`%e\` | scientific notation |
| \`%%\` | literal \`%\` |

## Width and precision

- \`%5d\` — minimum width 5, right-aligned.
- \`%-5d\` — left-aligned.
- \`%.2f\` — two digits after the decimal.
- \`%8.2f\` — width 8, precision 2.

## Program 1: read and print

\`\`\`c
#include <stdio.h>

int main(void) {
    int   age;
    float weight;
    char  initial;

    printf("Enter your initial: ");
    scanf(" %c", &initial);

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your weight (kg): ");
    scanf("%f", &weight);

    printf("\\nHello %c! You are %d years old and weigh %.2f kg.\\n",
           initial, age, weight);
    return 0;
}
\`\`\`

**Sample run**
\`\`\`text
Enter your initial: A
Enter your age: 22
Enter your weight (kg): 68.5

Hello A! You are 22 years old and weigh 68.50 kg.
\`\`\`

## Program 2: formatted table output

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("%-10s %5s %8s\\n", "Item", "Qty", "Price");
    printf("%-10s %5d %8.2f\\n", "Notebook", 3, 45.50);
    printf("%-10s %5d %8.2f\\n", "Pen",      5, 10.00);
    printf("%-10s %5d %8.2f\\n", "Eraser",   2,  5.75);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Item         Qty    Price
Notebook       3    45.50
Pen            5    10.00
Eraser         2     5.75
\`\`\`

## Program 3: getchar and putchar

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Type a character: ");
    int c = getchar();
    printf("You typed: ");
    putchar(c);
    putchar('\\n');
    return 0;
}
\`\`\`

## Program 4: reading a full line

\`\`\`c
#include <stdio.h>

int main(void) {
    char line[100];
    printf("Enter a sentence: ");
    fgets(line, sizeof(line), stdin);
    printf("You said: %s", line);
    return 0;
}
\`\`\`

:::warning
\`scanf\` needs the **address** of the variable (\`&x\`) — except for strings (arrays), where the name is already an address.
:::
`,
};

export default topic;
