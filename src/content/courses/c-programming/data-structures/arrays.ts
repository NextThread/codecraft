import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "arrays",
  title: "Arrays",
  description: "Collections of same-type elements stored contiguously.",
  readingTime: 7,
  content: `
# Arrays

An **array** stores a fixed-size sequence of elements of the **same type** in **contiguous memory**. Arrays let you group many related values under one name.

## Declaration and access

\`\`\`c
int marks[5] = {90, 85, 78, 92, 88};
printf("%d\\n", marks[0]);   // first element -> 90
printf("%d\\n", marks[4]);   // last element  -> 88
\`\`\`

- Indexes start at **0** and go up to \`size - 1\`.
- C does **not** check array bounds — accessing \`marks[10]\` is undefined behavior.

## Ways to initialize

\`\`\`c
int a[5] = {1, 2, 3, 4, 5};
int b[]  = {10, 20, 30};      // size inferred = 3
int c[5] = {1, 2};            // c = {1, 2, 0, 0, 0}
int d[5] = {0};               // all zeros
\`\`\`

## Two-dimensional arrays

\`\`\`c
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
printf("%d\\n", matrix[1][2]);   // 6
\`\`\`

## Program 1: sum and average

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("How many numbers? ");
    scanf("%d", &n);

    int arr[100];
    int sum = 0;

    for (int i = 0; i < n; i++) {
        printf("arr[%d] = ", i);
        scanf("%d", &arr[i]);
        sum += arr[i];
    }

    printf("Sum     = %d\\n", sum);
    printf("Average = %.2f\\n", (float)sum / n);
    return 0;
}
\`\`\`

## Program 2: find largest element

\`\`\`c
#include <stdio.h>

int main(void) {
    int a[] = {23, 89, 4, 67, 12, 90, 45};
    int n = sizeof(a) / sizeof(a[0]);

    int max = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > max) max = a[i];

    printf("Largest = %d\\n", max);
    return 0;
}
\`\`\`

## Program 3: reverse an array

\`\`\`c
#include <stdio.h>

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    int n = sizeof(a) / sizeof(a[0]);

    for (int i = 0, j = n - 1; i < j; i++, j--) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }

    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
5 4 3 2 1
\`\`\`

## Program 4: matrix addition (2D)

\`\`\`c
#include <stdio.h>

int main(void) {
    int A[2][2] = {{1,2},{3,4}};
    int B[2][2] = {{5,6},{7,8}};
    int C[2][2];

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            C[i][j] = A[i][j] + B[i][j];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%3d ", C[i][j]);
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Output**
\`\`\`text
  6   8 
 10  12 
\`\`\`
`,
};

export default topic;
