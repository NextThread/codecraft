import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "structures",
  title: "Structures",
  description: "Group different data types under one name.",
  readingTime: 7,
  content: `
# Structures (\`struct\`)

A **structure** groups variables of **different types** under a single name. It is C's way of building a custom record type — think of it as a small object without methods.

## Declaration

\`\`\`c
struct Student {
    int   roll;
    char  name[50];
    float marks;
};
\`\`\`

## Creating and using variables

\`\`\`c
struct Student s1;
s1.roll = 1;
strcpy(s1.name, "Aarav");
s1.marks = 92.5f;
\`\`\`

Or initialize directly:

\`\`\`c
struct Student s2 = {2, "Meera", 88.0f};
\`\`\`

## typedef shortcut

\`\`\`c
typedef struct {
    int   roll;
    char  name[50];
    float marks;
} Student;

Student s = {3, "Kavya", 91.0f};   // no need to write "struct" every time
\`\`\`

## Pointer to structure

Use the arrow operator \`->\` to access members through a pointer:

\`\`\`c
struct Student *p = &s1;
printf("%s\\n", p->name);   // same as (*p).name
\`\`\`

## Nested structures

\`\`\`c
struct Address {
    char city[30];
    int  pincode;
};

struct Person {
    char name[50];
    struct Address addr;
};
\`\`\`

## Program 1: student record

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Student {
    int   roll;
    char  name[50];
    float marks;
};

int main(void) {
    struct Student s;

    s.roll = 101;
    strcpy(s.name, "Ravi");
    s.marks = 87.5f;

    printf("Roll : %d\\n", s.roll);
    printf("Name : %s\\n", s.name);
    printf("Marks: %.2f\\n", s.marks);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Roll : 101
Name : Ravi
Marks: 87.50
\`\`\`

## Program 2: array of structures

\`\`\`c
#include <stdio.h>

struct Book {
    char title[30];
    float price;
};

int main(void) {
    struct Book library[3] = {
        {"Let Us C",      399.0f},
        {"K&R C",         599.0f},
        {"Modern C",      499.0f},
    };

    for (int i = 0; i < 3; i++)
        printf("%-15s Rs. %.2f\\n", library[i].title, library[i].price);
    return 0;
}
\`\`\`

## Program 3: passing struct to a function

\`\`\`c
#include <stdio.h>

struct Point { int x, y; };

int distance_sq(struct Point a, struct Point b) {
    int dx = a.x - b.x, dy = a.y - b.y;
    return dx*dx + dy*dy;
}

int main(void) {
    struct Point p = {0, 0}, q = {3, 4};
    printf("Distance^2 = %d\\n", distance_sq(p, q));
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Distance^2 = 25
\`\`\`

## Program 4: nested struct

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Address { char city[30]; int pincode; };
struct Person  { char name[50]; struct Address addr; };

int main(void) {
    struct Person p;
    strcpy(p.name, "Ishaan");
    strcpy(p.addr.city, "Pune");
    p.addr.pincode = 411001;

    printf("%s lives in %s - %d\\n", p.name, p.addr.city, p.addr.pincode);
    return 0;
}
\`\`\`
`,
};

export default topic;
