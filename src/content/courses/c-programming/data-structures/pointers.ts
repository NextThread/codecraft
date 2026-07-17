import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "pointers",
  title: "Pointers",
  description: "Variables that store memory addresses.",
  readingTime: 8,
  content: `
# Pointers

A **pointer** is a variable that stores the *address* of another variable. Pointers are what make C powerful — they enable dynamic memory, efficient array/string handling, and pass-by-reference.

## Declaration and use

\`\`\`c
int x = 10;
int *p = &x;    // p holds the address of x

printf("%d\\n", x);    // 10
printf("%p\\n", p);    // address of x
printf("%d\\n", *p);   // 10  (dereference)
*p = 20;              // change x through p
printf("%d\\n", x);    // 20
\`\`\`

- \`&x\` — "address of x"
- \`*p\` — "value at address p" (dereference)

## Pointer arithmetic

Adding 1 to a pointer moves it forward by \`sizeof(*p)\` bytes, not 1 byte.

\`\`\`c
int a[3] = {10, 20, 30};
int *p = a;
printf("%d\\n", *p);       // 10
printf("%d\\n", *(p + 1)); // 20
printf("%d\\n", *(p + 2)); // 30
\`\`\`

## Pointers and arrays

The array name itself is a pointer to the first element:

\`\`\`c
int arr[3] = {10, 20, 30};
int *p = arr;              // same as &arr[0]
\`\`\`

## NULL pointer

\`NULL\` (from \`<stddef.h>\`) is a pointer that points to nothing. Always initialize pointers, and check for \`NULL\` before dereferencing.

## Program 1: swap two numbers

\`\`\`c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 5, y = 9;
    printf("Before: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After : x = %d, y = %d\\n", x, y);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Before: x = 5, y = 9
After : x = 9, y = 5
\`\`\`

## Program 2: pointer to an array

\`\`\`c
#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;

    for (int i = 0; i < 5; i++)
        printf("a[%d] = %d (address %p)\\n", i, *(p + i), (void*)(p + i));
    return 0;
}
\`\`\`

## Program 3: pointer to a pointer

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    int **pp = &p;

    printf("x    = %d\\n", x);
    printf("*p   = %d\\n", *p);
    printf("**pp = %d\\n", **pp);
    return 0;
}
\`\`\`

## Program 4: return multiple values via pointers

\`\`\`c
#include <stdio.h>

void min_max(int a[], int n, int *mn, int *mx) {
    *mn = *mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < *mn) *mn = a[i];
        if (a[i] > *mx) *mx = a[i];
    }
}

int main(void) {
    int a[] = {23, 4, 78, 12, 56, 90, 3};
    int n = sizeof(a) / sizeof(a[0]);
    int mn, mx;
    min_max(a, n, &mn, &mx);
    printf("Min = %d, Max = %d\\n", mn, mx);
    return 0;
}
\`\`\`

:::warning
Never dereference an uninitialized, \`NULL\` or freed pointer — that's undefined behavior and a common source of crashes.
:::
`,
};

export default topic;
