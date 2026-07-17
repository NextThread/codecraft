import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "unions",
  title: "Unions",
  description: "Multiple members sharing the same memory location.",
  readingTime: 6,
  content: `
# Unions

A **union** looks like a struct, but **all members share the same memory**. A union is only ever holding one of its members at a time, and its size equals the size of its **largest** member.

Unions are useful when a variable can be one of several types, but never more than one at once — for example, an interpreter's "value" cell, or protocol messages with variant fields.

## Declaration

\`\`\`c
union Data {
    int   i;
    float f;
    char  s[20];
};
\`\`\`

## Struct vs Union

| Feature | struct | union |
|---------|--------|-------|
| Memory | sum of all members | size of largest member |
| Active members | all at once | one at a time |
| Use case | records | space-efficient variants |

## Program 1: union in action

\`\`\`c
#include <stdio.h>
#include <string.h>

union Data {
    int   i;
    float f;
    char  s[20];
};

int main(void) {
    union Data d;

    d.i = 42;
    printf("i = %d\\n", d.i);

    d.f = 3.14f;                 // overwrites i
    printf("f = %.2f\\n", d.f);

    strcpy(d.s, "Hello union");  // overwrites f
    printf("s = %s\\n", d.s);

    printf("Size of union = %zu bytes\\n", sizeof(d));
    return 0;
}
\`\`\`

**Output**
\`\`\`text
i = 42
f = 3.14
s = Hello union
Size of union = 20 bytes
\`\`\`

## Program 2: size comparison — struct vs union

\`\`\`c
#include <stdio.h>

struct SBox { int i; float f; char s[20]; };
union  UBox { int i; float f; char s[20]; };

int main(void) {
    printf("struct SBox size = %zu bytes\\n", sizeof(struct SBox));
    printf("union  UBox size = %zu bytes\\n", sizeof(union  UBox));
    return 0;
}
\`\`\`

**Sample output**
\`\`\`text
struct SBox size = 28 bytes
union  UBox size = 20 bytes
\`\`\`

## Program 3: tagged union (safe usage)

Wrap the union in a struct with a *tag* that says which member is currently valid.

\`\`\`c
#include <stdio.h>

enum Kind { INT, FLOAT };

struct Value {
    enum Kind kind;
    union { int i; float f; } data;
};

void print_value(struct Value v) {
    if (v.kind == INT)   printf("int   -> %d\\n",   v.data.i);
    if (v.kind == FLOAT) printf("float -> %.2f\\n", v.data.f);
}

int main(void) {
    struct Value a = { INT,   .data.i = 10   };
    struct Value b = { FLOAT, .data.f = 3.5f };
    print_value(a);
    print_value(b);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
int   -> 10
float -> 3.50
\`\`\`

:::info
Reading a union member other than the one most recently written is generally undefined behavior. Use a tag field, or use a struct if you need all fields at once.
:::
`,
};

export default topic;
