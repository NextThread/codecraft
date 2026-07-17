import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "functions",
  title: "Functions",
  description: "Group reusable code into named blocks.",
  readingTime: 7,
  content: `
# Functions

A **function** is a named, reusable block of code. Functions let you break a large problem into smaller, testable pieces and reuse logic without copy-pasting.

## Three parts

1. **Declaration (prototype)** — tells the compiler the function exists, its return type and parameter types.
2. **Definition** — the actual body of the function.
3. **Call** — invoke the function by name with arguments.

\`\`\`c
return_type name(parameter_list);        // declaration

return_type name(parameter_list) {       // definition
    // body
    return value;
}
\`\`\`

## Pass by value

C passes arguments **by value** — the function receives a *copy*. Changing the parameter inside the function doesn't affect the caller's variable. To modify the caller's variable, pass a pointer (covered under [Pointers](/docs/pointers)).

## Program 1: add two numbers

\`\`\`c
#include <stdio.h>

int add(int a, int b);       // prototype

int main(void) {
    int result = add(4, 7);
    printf("Sum = %d\\n", result);
    return 0;
}

int add(int a, int b) {      // definition
    return a + b;
}
\`\`\`

**Output**
\`\`\`text
Sum = 11
\`\`\`

## Program 2: void function — no return value

\`\`\`c
#include <stdio.h>

void print_line(int n) {
    for (int i = 0; i < n; i++) putchar('-');
    putchar('\\n');
}

int main(void) {
    print_line(20);
    printf("Report\\n");
    print_line(20);
    return 0;
}
\`\`\`

## Program 3: check prime

\`\`\`c
#include <stdio.h>

int is_prime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d * d <= n; d++)
        if (n % d == 0) return 0;
    return 1;
}

int main(void) {
    for (int i = 2; i <= 20; i++)
        if (is_prime(i)) printf("%d ", i);
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
2 3 5 7 11 13 17 19
\`\`\`

## Program 4: multiple parameters and return

\`\`\`c
#include <stdio.h>

float average(float a, float b, float c) {
    return (a + b + c) / 3.0f;
}

int main(void) {
    printf("Avg = %.2f\\n", average(85.0f, 90.0f, 78.5f));
    return 0;
}
\`\`\`
`,
};

export default topic;
