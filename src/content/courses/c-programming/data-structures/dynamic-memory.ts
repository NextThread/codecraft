import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "dynamic-memory",
  title: "Dynamic Memory",
  description: "Allocate and free memory at runtime.",
  readingTime: 6,
  content: `
# Dynamic Memory Allocation

Static arrays have a **fixed size** decided at compile time. When you need memory whose size is only known at runtime, use the allocation functions in \`<stdlib.h>\`.

## The four functions

| Function | Purpose |
|----------|---------|
| \`malloc(size)\` | allocate \`size\` bytes (uninitialized) |
| \`calloc(n, size)\` | allocate \`n * size\` bytes, initialized to 0 |
| \`realloc(ptr, size)\` | resize an existing block |
| \`free(ptr)\` | release memory back to the OS |

Always check the returned pointer against \`NULL\` — allocation can fail.

## Program 1: array of any size

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    printf("How many elements? ");
    scanf("%d", &n);

    int *arr = (int *) malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    printf("Values: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);   // always free what you malloc
    return 0;
}
\`\`\`

**Sample run (n = 4)**
\`\`\`text
Values: 10 20 30 40
\`\`\`

## Program 2: calloc initializes to zero

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *a = (int *) calloc(n, sizeof(int));
    if (!a) return 1;

    for (int i = 0; i < n; i++) printf("%d ", a[i]);   // all zeros
    printf("\\n");

    free(a);
    return 0;
}
\`\`\`

## Program 3: grow with realloc

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(3 * sizeof(int));
    for (int i = 0; i < 3; i++) a[i] = i + 1;

    a = realloc(a, 6 * sizeof(int));   // grow to 6
    for (int i = 3; i < 6; i++) a[i] = i + 1;

    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    free(a);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
1 2 3 4 5 6
\`\`\`

## Program 4: dynamic string

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *s = malloc(20);
    if (!s) return 1;
    strcpy(s, "dynamic!");
    printf("%s\\n", s);
    free(s);
    return 0;
}
\`\`\`

:::info
Every \`malloc\` / \`calloc\` / \`realloc\` must be matched by exactly one \`free\` — otherwise you leak memory.
:::
`,
};

export default topic;
