import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "data-types",
  title: "Data Types",
  description: "Primary, derived and user-defined data types in C.",
  readingTime: 7,
  content: `
# Data Types

A **data type** tells the compiler:

1. What *kind* of value a variable holds (integer, character, decimal…).
2. How much *memory* to reserve.
3. What *operations* are legal on that value.

## Categories

- **Primary (built-in):** \`int\`, \`char\`, \`float\`, \`double\`, \`void\`
- **Derived:** arrays, pointers, functions
- **User-defined:** \`struct\`, \`union\`, \`enum\`, \`typedef\`

## Primary types (typical sizes on a 64-bit machine)

| Type | Size | Range | Format specifier |
|------|------|-------|------------------|
| \`char\` | 1 byte | -128 to 127 | \`%c\` |
| \`unsigned char\` | 1 byte | 0 to 255 | \`%c\` |
| \`short\` | 2 bytes | -32,768 to 32,767 | \`%hd\` |
| \`int\` | 4 bytes | ±2.1 billion | \`%d\` |
| \`unsigned int\` | 4 bytes | 0 to 4.29 billion | \`%u\` |
| \`long\` | 4/8 bytes | platform dependent | \`%ld\` |
| \`long long\` | 8 bytes | ±9.2 quintillion | \`%lld\` |
| \`float\` | 4 bytes | ~6 decimal digits | \`%f\` |
| \`double\` | 8 bytes | ~15 decimal digits | \`%lf\` |
| \`void\` | — | no value | — |

## Modifiers

Types can be tuned with \`short\`, \`long\`, \`signed\`, \`unsigned\`:

- \`unsigned int\` — 0 to 4,294,967,295
- \`long long\` — at least 8 bytes
- \`short\` — at least 2 bytes
- \`signed char\` vs \`unsigned char\` — same size, different range

## Program 1: sizes of data types

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("char:        %zu bytes\\n", sizeof(char));
    printf("short:       %zu bytes\\n", sizeof(short));
    printf("int:         %zu bytes\\n", sizeof(int));
    printf("long:        %zu bytes\\n", sizeof(long));
    printf("long long:   %zu bytes\\n", sizeof(long long));
    printf("float:       %zu bytes\\n", sizeof(float));
    printf("double:      %zu bytes\\n", sizeof(double));
    printf("long double: %zu bytes\\n", sizeof(long double));
    return 0;
}
\`\`\`

**Sample output**
\`\`\`text
char:        1 bytes
short:       2 bytes
int:         4 bytes
long:        8 bytes
long long:   8 bytes
float:       4 bytes
double:      8 bytes
long double: 16 bytes
\`\`\`

## Program 2: ranges using \`<limits.h>\` and \`<float.h>\`

\`\`\`c
#include <stdio.h>
#include <limits.h>
#include <float.h>

int main(void) {
    printf("int    range: %d to %d\\n", INT_MIN, INT_MAX);
    printf("uint   max  : %u\\n",       UINT_MAX);
    printf("char   range: %d to %d\\n", CHAR_MIN, CHAR_MAX);
    printf("float  max  : %e\\n",       FLT_MAX);
    printf("double max  : %e\\n",       DBL_MAX);
    return 0;
}
\`\`\`

## Program 3: overflow demo

\`\`\`c
#include <stdio.h>
#include <limits.h>

int main(void) {
    int max = INT_MAX;
    printf("max         = %d\\n", max);
    printf("max + 1     = %d   (wraps around!)\\n", max + 1);
    return 0;
}
\`\`\`

**Output (typical)**
\`\`\`text
max         = 2147483647
max + 1     = -2147483648   (wraps around!)
\`\`\`

:::info
\`sizeof\` is an **operator** (not a function) that returns the size in bytes of any type or variable at compile time.
:::
`,
};

export default topic;
