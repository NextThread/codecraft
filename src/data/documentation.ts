export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  content: string;
  lastUpdated: string;
  readingTime: number;
}

export interface DocCategory {
  title: string;
  slug: string;
  emoji?: string;
  articles: { title: string; slug: string }[];
}

export const navigation: DocCategory[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    emoji: "🚀",
    articles: [
      { title: "Introduction to C", slug: "introduction" },
      { title: "Structure of a C Program", slug: "program-structure" },
      { title: "Your First Program", slug: "first-program" },
    ],
  },
  {
    title: "Basics",
    slug: "basics",
    emoji: "🧱",
    articles: [
      { title: "Data Types", slug: "data-types" },
      { title: "Variables", slug: "variables" },
      { title: "Constants", slug: "constants" },
      { title: "Operators", slug: "operators" },
      { title: "Input & Output", slug: "input-output" },
      { title: "Type Casting", slug: "type-casting" },
    ],
  },
  {
    title: "Control Flow",
    slug: "control-flow",
    emoji: "🔀",
    articles: [
      { title: "If / Else", slug: "if-else" },
      { title: "Switch Statement", slug: "switch" },
      { title: "Loops", slug: "loops" },
      { title: "Break & Continue", slug: "break-continue" },
    ],
  },
  {
    title: "Functions",
    slug: "functions",
    emoji: "🧩",
    articles: [
      { title: "Functions", slug: "functions" },
      { title: "Storage Classes", slug: "storage-classes" },
      { title: "Recursion", slug: "recursion" },
    ],
  },
  {
    title: "Data Structures",
    slug: "data-structures",
    emoji: "📦",
    articles: [
      { title: "Arrays", slug: "arrays" },
      { title: "Strings", slug: "strings" },
      { title: "Pointers", slug: "pointers" },
      { title: "Dynamic Memory", slug: "dynamic-memory" },
      { title: "Structures", slug: "structures" },
      { title: "Unions", slug: "unions" },
    ],
  },
];

const A = (
  slug: string,
  title: string,
  category: string,
  categorySlug: string,
  description: string,
  readingTime: number,
  content: string,
): DocArticle => ({
  slug,
  title,
  category,
  categorySlug,
  description,
  readingTime,
  lastUpdated: "2026-07-13",
  content,
});

export const articles: Record<string, DocArticle> = {
  introduction: A(
    "introduction",
    "Introduction to C",
    "Getting Started",
    "getting-started",
    "What C is, why it matters, and where it's used today.",
    3,
    `
# Introduction to C

C is a general-purpose, procedural programming language developed by **Dennis Ritchie** at Bell Labs in 1972. It is often called the *mother of all modern languages* because languages like C++, Java, Python and Go borrow heavily from its syntax and ideas.

## Why learn C?

- **Close to the hardware** — you control memory directly through pointers.
- **Fast and efficient** — minimal runtime, compiles to native machine code.
- **Portable** — the same C code runs on almost every platform.
- **Foundation for systems programming** — operating systems, embedded devices, compilers and databases are written in C.

## Where C is used

- Operating systems (Linux, Windows kernel modules, macOS internals)
- Embedded systems and microcontrollers
- Game engines and graphics libraries
- Databases (MySQL, PostgreSQL, SQLite)
- Compilers and interpreters (including Python's CPython)

## Key features

1. Simple and small core language
2. Rich set of built-in operators
3. Structured programming via functions
4. Direct memory access using pointers
5. Extensible through libraries

:::info
C is a compiled language: you write source code (\`.c\` file), a compiler like **gcc** or **clang** turns it into an executable, and then you run it.
:::

Continue to [Structure of a C Program](/docs/program-structure).
`,
  ),

  "program-structure": A(
    "program-structure",
    "Structure of a C Program",
    "Getting Started",
    "getting-started",
    "The anatomy of every C program: preprocessor, main, statements.",
    3,
    `
# Structure of a C Program

Every C program follows the same basic skeleton.

## The skeleton

\`\`\`c
#include <stdio.h>          // 1. Preprocessor directive

int main(void) {            // 2. main() — entry point
    printf("Hello!\\n");    // 3. Statement
    return 0;               // 4. Return value to OS
}
\`\`\`

## The four pieces

1. **Preprocessor directives** — lines starting with \`#\`. They run *before* compilation. \`#include\` pulls in header files that declare functions like \`printf\`.
2. **The \`main\` function** — execution starts here. Every C program must have exactly one \`main\`.
3. **Statements** — instructions ending with a semicolon.
4. **Return value** — \`0\` tells the OS the program ran successfully.

## Example: a slightly bigger program

\`\`\`c
#include <stdio.h>

// Function declaration
int square(int n);

int main(void) {
    int number = 5;
    int result = square(number);
    printf("Square of %d is %d\\n", number, result);
    return 0;
}

// Function definition
int square(int n) {
    return n * n;
}
\`\`\`

**Output**
\`\`\`text
Square of 5 is 25
\`\`\`
`,
  ),

  "first-program": A(
    "first-program",
    "Your First Program",
    "Getting Started",
    "getting-started",
    "Write, compile and run Hello, World in C.",
    2,
    `
# Your First Program

## Hello, World

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

## Compile and run

On Linux/macOS with gcc:

\`\`\`bash
gcc hello.c -o hello
./hello
\`\`\`

**Output**
\`\`\`text
Hello, World!
\`\`\`

:::info
\`\\n\` is the *newline* escape sequence — it moves the cursor to the next line.
:::
`,
  ),

  "data-types": A(
    "data-types",
    "Data Types",
    "Basics",
    "basics",
    "Primary, derived and user-defined data types in C.",
    5,
    `
# Data Types

A **data type** tells the compiler what kind of value a variable holds and how much memory it needs.

## Categories

- **Primary (built-in):** \`int\`, \`char\`, \`float\`, \`double\`, \`void\`
- **Derived:** arrays, pointers, functions
- **User-defined:** \`struct\`, \`union\`, \`enum\`, \`typedef\`

## Primary types (typical sizes)

| Type | Size | Range |
|------|------|-------|
| \`char\` | 1 byte | -128 to 127 |
| \`int\` | 4 bytes | -2,147,483,648 to 2,147,483,647 |
| \`float\` | 4 bytes | ~6 decimal digits |
| \`double\` | 8 bytes | ~15 decimal digits |
| \`void\` | — | represents "no value" |

## Modifiers

Types can be modified with \`short\`, \`long\`, \`signed\`, \`unsigned\`:

- \`unsigned int\` — 0 to 4,294,967,295
- \`long long\` — at least 8 bytes
- \`short\` — at least 2 bytes

## Program: sizes of data types

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("char:        %zu bytes\\n", sizeof(char));
    printf("int:         %zu bytes\\n", sizeof(int));
    printf("float:       %zu bytes\\n", sizeof(float));
    printf("double:      %zu bytes\\n", sizeof(double));
    printf("long long:   %zu bytes\\n", sizeof(long long));
    return 0;
}
\`\`\`

**Sample output**
\`\`\`text
char:        1 bytes
int:         4 bytes
float:       4 bytes
double:      8 bytes
long long:   8 bytes
\`\`\`

:::info
\`sizeof\` is an operator (not a function) that returns the size in bytes of any type or variable.
:::
`,
  ),

  variables: A(
    "variables",
    "Variables",
    "Basics",
    "basics",
    "Declaring, initializing and using variables.",
    4,
    `
# Variables

A **variable** is a named location in memory that stores a value which can change.

## Declaration and initialization

\`\`\`c
int age;           // declaration
age = 21;          // assignment

int marks = 95;    // declaration + initialization
float pi = 3.14f;
char grade = 'A';
\`\`\`

## Rules for names

- Start with a letter or underscore (\`_\`), never a digit.
- May contain letters, digits, underscores.
- Case-sensitive — \`Score\` and \`score\` are different.
- Cannot be a C keyword (\`int\`, \`return\`, \`while\`, ...).

## Program: using variables

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[20] = "Aarav";
    int age = 20;
    float height = 5.9f;

    printf("Name:   %s\\n", name);
    printf("Age:    %d\\n", age);
    printf("Height: %.1f ft\\n", height);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Name:   Aarav
Age:    20
Height: 5.9 ft
\`\`\`
`,
  ),

  constants: A(
    "constants",
    "Constants",
    "Basics",
    "basics",
    "Values that never change: literals, #define and const.",
    3,
    `
# Constants

A **constant** is a fixed value that cannot be modified once defined.

## Two ways to define constants

**Using \`#define\` (preprocessor macro):**
\`\`\`c
#define PI 3.14159
#define MAX 100
\`\`\`

**Using the \`const\` keyword:**
\`\`\`c
const float pi = 3.14159f;
const int max = 100;
\`\`\`

\`const\` is type-safe; \`#define\` is a raw text replacement.

## Program: area of a circle

\`\`\`c
#include <stdio.h>
#define PI 3.14159

int main(void) {
    const float radius = 5.0f;
    float area = PI * radius * radius;
    printf("Area = %.2f\\n", area);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Area = 78.54
\`\`\`
`,
  ),

  operators: A(
    "operators",
    "Operators",
    "Basics",
    "basics",
    "Arithmetic, relational, logical, bitwise and assignment operators.",
    5,
    `
# Operators

Operators tell the compiler to perform an operation on operands.

## Categories

| Category | Examples |
|----------|----------|
| Arithmetic | \`+ - * / %\` |
| Relational | \`== != > < >= <=\` |
| Logical | \`&& || !\` |
| Bitwise | \`& | ^ ~ << >>\` |
| Assignment | \`= += -= *= /=\` |
| Increment/Decrement | \`++ --\` |
| Conditional (ternary) | \`? :\` |

## Program: operators in action

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;

    printf("a + b  = %d\\n", a + b);
    printf("a - b  = %d\\n", a - b);
    printf("a * b  = %d\\n", a * b);
    printf("a / b  = %d\\n", a / b);   // integer division
    printf("a %% b  = %d\\n", a % b);

    printf("a > b  = %d\\n", a > b);   // 1 = true
    printf("a && b = %d\\n", a && b);
    printf("a & b  = %d\\n", a & b);   // bitwise AND

    int max = (a > b) ? a : b;
    printf("max    = %d\\n", max);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
a + b  = 13
a - b  = 7
a * b  = 30
a / b  = 3
a % b  = 1
a > b  = 1
a && b = 1
a & b  = 2
max    = 10
\`\`\`
`,
  ),

  "input-output": A(
    "input-output",
    "Input & Output",
    "Basics",
    "basics",
    "printf, scanf and formatted I/O.",
    4,
    `
# Input & Output

C uses **\`printf\`** to print and **\`scanf\`** to read input. Both live in \`<stdio.h>\`.

## Format specifiers

| Specifier | Type |
|-----------|------|
| \`%d\` | int |
| \`%f\` | float |
| \`%lf\` | double |
| \`%c\` | char |
| \`%s\` | string |
| \`%x\` | hexadecimal |

## Program: read and print

\`\`\`c
#include <stdio.h>

int main(void) {
    int age;
    float weight;
    char initial;

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

:::warning
\`scanf\` needs the **address** of the variable, so remember the \`&\` — except for strings (arrays), where the name is already an address.
:::
`,
  ),

  "type-casting": A(
    "type-casting",
    "Type Casting",
    "Basics",
    "basics",
    "Converting a value from one type to another.",
    3,
    `
# Type Casting

Type casting converts a value from one data type to another.

## Two kinds

- **Implicit** — done automatically by the compiler.
- **Explicit** — you write \`(type) value\`.

## Program: implicit vs explicit

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 7, b = 2;

    float implicit = a / b;             // both ints -> integer division
    float explicit = (float)a / b;      // one cast -> real division

    printf("implicit = %.2f\\n", implicit);
    printf("explicit = %.2f\\n", explicit);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
implicit = 3.00
explicit = 3.50
\`\`\`
`,
  ),

  "if-else": A(
    "if-else",
    "If / Else",
    "Control Flow",
    "control-flow",
    "Branching your program with if, else if and else.",
    4,
    `
# If / Else

The \`if\` statement lets your program make decisions.

## Syntax

\`\`\`c
if (condition) {
    // runs when condition is true
} else if (other_condition) {
    // runs when other_condition is true
} else {
    // runs when nothing above matched
}
\`\`\`

## Program: grading system

\`\`\`c
#include <stdio.h>

int main(void) {
    int marks;
    printf("Enter marks (0-100): ");
    scanf("%d", &marks);

    if (marks >= 90) {
        printf("Grade: A\\n");
    } else if (marks >= 75) {
        printf("Grade: B\\n");
    } else if (marks >= 50) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }
    return 0;
}
\`\`\`

**Sample run**
\`\`\`text
Enter marks (0-100): 82
Grade: B
\`\`\`
`,
  ),

  switch: A(
    "switch",
    "Switch Statement",
    "Control Flow",
    "control-flow",
    "A clean multi-way branch based on a single value.",
    3,
    `
# Switch Statement

Use \`switch\` when you want to compare one variable against many constant values.

## Syntax

\`\`\`c
switch (expression) {
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    default:
        // runs if no case matches
}
\`\`\`

\`break\` prevents *fall-through* into the next case.

## Program: simple calculator

\`\`\`c
#include <stdio.h>

int main(void) {
    char op;
    double x, y;

    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);
    printf("Enter two numbers: ");
    scanf("%lf %lf", &x, &y);

    switch (op) {
        case '+': printf("= %.2f\\n", x + y); break;
        case '-': printf("= %.2f\\n", x - y); break;
        case '*': printf("= %.2f\\n", x * y); break;
        case '/':
            if (y != 0) printf("= %.2f\\n", x / y);
            else        printf("Cannot divide by zero.\\n");
            break;
        default:  printf("Unknown operator.\\n");
    }
    return 0;
}
\`\`\`
`,
  ),

  loops: A(
    "loops",
    "Loops",
    "Control Flow",
    "control-flow",
    "for, while and do-while loops.",
    5,
    `
# Loops

Loops repeat a block of code while a condition is true.

## The three loops

**\`for\` — when you know how many times:**
\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
\`\`\`

**\`while\` — check condition first:**
\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

**\`do-while\` — run at least once:**
\`\`\`c
int i = 0;
do {
    printf("%d ", i);
    i++;
} while (i < 5);
\`\`\`

## Program: multiplication table

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}
\`\`\`

**Sample run (n = 3)**
\`\`\`text
3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30
\`\`\`
`,
  ),

  "break-continue": A(
    "break-continue",
    "Break & Continue",
    "Control Flow",
    "control-flow",
    "Exit loops early or skip an iteration.",
    3,
    `
# Break & Continue

- **\`break\`** exits the loop immediately.
- **\`continue\`** skips the rest of the current iteration and jumps to the next one.

## Program: primes below 20

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int n = 2; n < 20; n++) {
        int is_prime = 1;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) { is_prime = 0; break; }
        }
        if (!is_prime) continue;   // skip non-primes
        printf("%d ", n);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
2 3 5 7 11 13 17 19
\`\`\`
`,
  ),

  functions: A(
    "functions",
    "Functions",
    "Functions",
    "functions",
    "Group reusable code into named blocks.",
    5,
    `
# Functions

A **function** is a named, reusable block of code. Functions break large problems into smaller pieces.

## Three parts

1. **Declaration (prototype)** — tells the compiler the function exists.
2. **Definition** — the actual body.
3. **Call** — invoke the function by name.

\`\`\`c
return_type name(parameter_list);   // declaration

return_type name(parameter_list) {  // definition
    // body
    return value;
}
\`\`\`

## Pass by value

C passes arguments **by value** — the function gets a copy.

## Program: add two numbers

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
`,
  ),

  "storage-classes": A(
    "storage-classes",
    "Storage Classes",
    "Functions",
    "functions",
    "auto, register, static and extern.",
    3,
    `
# Storage Classes

A storage class defines the **scope**, **lifetime** and **linkage** of a variable.

| Class | Scope | Lifetime |
|-------|-------|----------|
| \`auto\` | Block | Block |
| \`register\` | Block | Block (hint: keep in CPU register) |
| \`static\` | Block/File | Whole program |
| \`extern\` | Global | Whole program (defined elsewhere) |

## Program: static counter

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
`,
  ),

  recursion: A(
    "recursion",
    "Recursion",
    "Functions",
    "functions",
    "A function that calls itself.",
    3,
    `
# Recursion

**Recursion** is when a function calls itself to solve a smaller version of the same problem. Every recursion needs:

1. A **base case** — when to stop.
2. A **recursive case** — the call to itself.

## Program: factorial

\`\`\`c
#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;              // base case
    return n * factorial(n - 1);       // recursive case
}

int main(void) {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    printf("%d! = %lld\\n", n, factorial(n));
    return 0;
}
\`\`\`

**Sample run (n = 5)**
\`\`\`text
5! = 120
\`\`\`
`,
  ),

  arrays: A(
    "arrays",
    "Arrays",
    "Data Structures",
    "data-structures",
    "Collections of same-type elements stored contiguously.",
    5,
    `
# Arrays

An **array** stores a fixed-size sequence of elements of the same type in contiguous memory.

## Declaration and access

\`\`\`c
int marks[5] = {90, 85, 78, 92, 88};
printf("%d\\n", marks[0]);   // first element
printf("%d\\n", marks[4]);   // last element
\`\`\`

Indexes start at **0** and go up to \`size - 1\`.

## Two-dimensional arrays

\`\`\`c
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
\`\`\`

## Program: sum and average

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
`,
  ),

  strings: A(
    "strings",
    "Strings",
    "Data Structures",
    "data-structures",
    "Character arrays terminated by a null character.",
    4,
    `
# Strings

In C, a **string** is a \`char\` array ending with the null character \`'\\0'\`.

\`\`\`c
char name[6] = {'H','e','l','l','o','\\0'};
char name2[] = "Hello";   // shorthand, \\0 added automatically
\`\`\`

## Common functions (\`<string.h>\`)

| Function | Purpose |
|----------|---------|
| \`strlen(s)\` | length |
| \`strcpy(a, b)\` | copy b into a |
| \`strcat(a, b)\` | append b to a |
| \`strcmp(a, b)\` | compare (0 = equal) |

## Program: string operations

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char first[50] = "Hello";
    char last[]    = "World";

    printf("Length of first: %zu\\n", strlen(first));

    strcat(first, ", ");
    strcat(first, last);
    strcat(first, "!");

    printf("Result: %s\\n", first);

    if (strcmp("abc", "abc") == 0) {
        printf("Strings are equal\\n");
    }
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Length of first: 5
Result: Hello, World!
Strings are equal
\`\`\`
`,
  ),

  pointers: A(
    "pointers",
    "Pointers",
    "Data Structures",
    "data-structures",
    "Variables that store memory addresses.",
    6,
    `
# Pointers

A **pointer** is a variable that stores the *address* of another variable. Pointers are what make C powerful (and famous for being tricky).

## Declaration and use

\`\`\`c
int x = 10;
int *p = &x;    // p holds address of x

printf("%d\\n", x);    // 10
printf("%p\\n", p);    // address of x
printf("%d\\n", *p);   // 10  (dereference)
*p = 20;              // change x through p
printf("%d\\n", x);    // 20
\`\`\`

- \`&x\` — "address of x"
- \`*p\` — "value at address p" (dereference)

## Pointers and arrays

The array name is itself a pointer to its first element:

\`\`\`c
int arr[3] = {10, 20, 30};
int *p = arr;
printf("%d\\n", *(p + 1));   // 20
\`\`\`

## Program: swap two numbers

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

:::warning
Never dereference an uninitialized or freed pointer — that's undefined behavior.
:::
`,
  ),

  "dynamic-memory": A(
    "dynamic-memory",
    "Dynamic Memory",
    "Data Structures",
    "data-structures",
    "Allocate and free memory at runtime.",
    5,
    `
# Dynamic Memory Allocation

Static arrays have a fixed size. For memory whose size you decide at runtime, use functions from \`<stdlib.h>\`.

| Function | Purpose |
|----------|---------|
| \`malloc(size)\` | allocate uninitialized bytes |
| \`calloc(n, size)\` | allocate n * size bytes, zeroed |
| \`realloc(ptr, size)\` | resize an existing block |
| \`free(ptr)\` | release memory |

## Program: array of any size

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

:::info
Every \`malloc\`/\`calloc\` must be matched by exactly one \`free\` — otherwise you leak memory.
:::
`,
  ),

  structures: A(
    "structures",
    "Structures",
    "Data Structures",
    "data-structures",
    "Group different data types under one name.",
    5,
    `
# Structures (\`struct\`)

A **structure** groups variables of different types under a single name. It is C's way of building a custom record type.

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

## Pointer to structure

\`\`\`c
struct Student *p = &s1;
printf("%s\\n", p->name);   // arrow operator
\`\`\`

## Program: student record

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
`,
  ),

  unions: A(
    "unions",
    "Unions",
    "Data Structures",
    "data-structures",
    "Multiple members sharing the same memory location.",
    4,
    `
# Unions

A **union** looks like a struct, but **all members share the same memory**. A union is only ever holding one of its members at a time, and its size equals the size of its largest member.

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

## Program: union in action

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

:::info
Reading a union member other than the one most recently written is generally undefined behavior. Use structs when you need all fields at once.
:::
`,
  ),
};

export function getArticle(slug: string): DocArticle | undefined {
  return articles[slug];
}

export function getNextPrevArticles(slug: string) {
  const flat: { title: string; slug: string }[] = [];
  navigation.forEach((cat) => cat.articles.forEach((a) => flat.push(a)));
  const idx = flat.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
