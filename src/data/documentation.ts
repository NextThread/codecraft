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
  lastUpdated: "2026-07-14",
  content,
});

export const articles: Record<string, DocArticle> = {
  introduction: A(
    "introduction",
    "Introduction to C",
    "Getting Started",
    "getting-started",
    "What C is, why it matters, and where it's used today.",
    5,
    `
# Introduction to C

## What is C?

C is a **general-purpose, procedural, statically-typed** programming language developed by **Dennis Ritchie** at Bell Labs between 1969 and 1973. It was originally created to rewrite the UNIX operating system, which was previously written in assembly. Because of this history, C sits very close to the hardware while still offering the readability of a high-level language.

C is often called the **mother of all modern languages** — C++, Objective-C, Java, JavaScript, C#, Python, PHP, Perl, Go and Rust all borrow syntax, keywords or design ideas directly from C.

## Why learn C?

- **Close to the hardware** — you control memory directly through pointers.
- **Fast and efficient** — minimal runtime, compiles straight to native machine code.
- **Portable** — the same C code runs on almost every CPU and operating system.
- **Foundation for systems programming** — operating systems, embedded firmware, compilers, databases and network stacks are written in C.
- **Great teacher** — learning C makes you understand what higher-level languages hide from you (stack, heap, pointers, memory layout).

## Where C is used today

- Operating systems: Linux kernel, Windows kernel modules, macOS internals
- Embedded systems and microcontrollers (Arduino, STM32, automotive ECUs)
- Game engines and graphics libraries (parts of Unreal, OpenGL, SDL)
- Databases: MySQL, PostgreSQL, SQLite, Redis
- Compilers and interpreters: GCC itself, and Python's CPython runtime
- Networking: routers, switches, TCP/IP stacks

## Key features of C

1. Small, simple core language — only 32 keywords.
2. Rich set of built-in operators.
3. Structured programming via functions.
4. Direct memory access using pointers.
5. Extensible through libraries.
6. Produces highly optimized executables.

## The compilation process

C is a **compiled** language. Turning source code into a running program takes four stages:

1. **Preprocessing** — handles \`#include\`, \`#define\` and other \`#\` directives.
2. **Compilation** — translates C code into assembly.
3. **Assembly** — turns assembly into object code (\`.o\` file).
4. **Linking** — combines object files and libraries into an executable.

\`\`\`text
hello.c  →  preprocessor  →  compiler  →  assembler  →  linker  →  hello (executable)
\`\`\`

## Program: check your compiler

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Welcome to C!\\n");
    printf("Compiled with C standard: %ld\\n", __STDC_VERSION__);
    return 0;
}
\`\`\`

**Sample output**
\`\`\`text
Welcome to C!
Compiled with C standard: 201710
\`\`\`

:::info
\`__STDC_VERSION__\` is a predefined macro that tells you which version of the C standard the compiler follows.
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
    5,
    `
# Structure of a C Program

Every C program — from a two-line "hello" to a full operating system kernel — follows the same basic skeleton.

## The skeleton

\`\`\`c
// 1. Documentation section (optional comments)
/* Program: greet.c
   Purpose: print a friendly greeting */

// 2. Preprocessor / link section
#include <stdio.h>

// 3. Global declarations
#define GREETING "Hello!"

// 4. Function prototypes
void greet(void);

// 5. main() — program entry point
int main(void) {
    greet();
    return 0;
}

// 6. Function definitions
void greet(void) {
    printf("%s\\n", GREETING);
}
\`\`\`

## The six sections explained

1. **Documentation section** — comments describing what the file does.
2. **Preprocessor / link section** — \`#include\` for headers, \`#define\` for macros.
3. **Global declarations** — variables and constants visible to the whole file.
4. **Function prototypes** — tell the compiler what functions exist.
5. **\`main()\`** — every C program must have exactly one \`main\` function. Execution starts here.
6. **Function definitions** — the actual code of your custom functions.

## Comments

\`\`\`c
// single-line comment
/* multi-line
   comment */
\`\`\`

## Statements and semicolons

Every statement in C ends with a semicolon (\`;\`). Blocks of statements are wrapped in braces \`{ }\`.

## Program 1: a simple calculator layout

\`\`\`c
#include <stdio.h>

int add(int a, int b);
int subtract(int a, int b);

int main(void) {
    int a = 10, b = 4;
    printf("Sum        = %d\\n", add(a, b));
    printf("Difference = %d\\n", subtract(a, b));
    return 0;
}

int add(int a, int b)      { return a + b; }
int subtract(int a, int b) { return a - b; }
\`\`\`

**Output**
\`\`\`text
Sum        = 14
Difference = 6
\`\`\`

## Program 2: using a global constant

\`\`\`c
#include <stdio.h>
#define PI 3.14159

float area_of_circle(float r);

int main(void) {
    float r = 7.0f;
    printf("Area = %.2f\\n", area_of_circle(r));
    return 0;
}

float area_of_circle(float r) {
    return PI * r * r;
}
\`\`\`

**Output**
\`\`\`text
Area = 153.94
\`\`\`
`,
  ),

  "first-program": A(
    "first-program",
    "Your First Program",
    "Getting Started",
    "getting-started",
    "Write, compile and run Hello, World in C.",
    4,
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
  ),

  "data-types": A(
    "data-types",
    "Data Types",
    "Basics",
    "basics",
    "Primary, derived and user-defined data types in C.",
    7,
    `
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
  ),

  variables: A(
    "variables",
    "Variables",
    "Basics",
    "basics",
    "Declaring, initializing and using variables.",
    6,
    `
# Variables

A **variable** is a named location in memory that stores a value which can change during program execution.

## Declaration vs initialization

- **Declaration** — tells the compiler about a name and its type.
- **Initialization** — gives the variable its first value.

\`\`\`c
int age;           // declaration
age = 21;          // assignment

int marks = 95;    // declaration + initialization
float pi = 3.14f;
char grade = 'A';
\`\`\`

## Rules for identifier names

- Must start with a letter (A-Z, a-z) or underscore (\`_\`), never a digit.
- May contain letters, digits and underscores.
- Case-sensitive — \`Score\` and \`score\` are different variables.
- Cannot be a C keyword (\`int\`, \`return\`, \`while\`, …).
- No spaces or special characters.

## Scope and lifetime

- **Local variables** live inside a function or block; created when the block starts, destroyed when it ends.
- **Global variables** are declared outside all functions and exist for the whole program.

\`\`\`c
int counter = 0;   // global

void increment(void) {
    int step = 1;  // local
    counter += step;
}
\`\`\`

## Program 1: using variables

\`\`\`c
#include <stdio.h>

int main(void) {
    char name[20] = "Aarav";
    int  age      = 20;
    float height  = 5.9f;

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

## Program 2: swap two variables (without a third)

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 5, b = 9;
    printf("Before: a = %d, b = %d\\n", a, b);

    a = a + b;   // a = 14
    b = a - b;   // b = 5
    a = a - b;   // a = 9

    printf("After : a = %d, b = %d\\n", a, b);
    return 0;
}
\`\`\`

## Program 3: local vs global

\`\`\`c
#include <stdio.h>

int g = 100;   // global

void show(void) {
    int g = 5; // local hides global inside this function
    printf("Inside show: g = %d\\n", g);
}

int main(void) {
    printf("Before call: g = %d\\n", g);
    show();
    printf("After call : g = %d\\n", g);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Before call: g = 100
Inside show: g = 5
After call : g = 100
\`\`\`
`,
  ),

  constants: A(
    "constants",
    "Constants",
    "Basics",
    "basics",
    "Values that never change: literals, #define and const.",
    5,
    `
# Constants

A **constant** is a fixed value that cannot be modified once defined. Constants make your programs safer and easier to read — a magic number like \`3.14159\` becomes a self-documenting \`PI\`.

## Types of constants in C

1. **Integer constants** — \`10\`, \`0xFF\` (hex), \`0755\` (octal), \`42L\` (long).
2. **Floating-point constants** — \`3.14\`, \`2.5e-3\`, \`1.0f\`.
3. **Character constants** — \`'A'\`, \`'\\n'\`, \`'\\0'\`.
4. **String constants** — \`"Hello"\`.
5. **Enumeration constants** — declared with \`enum\`.

## Two ways to define named constants

**Using \`#define\` (preprocessor macro):**

\`\`\`c
#define PI 3.14159
#define MAX 100
#define GREETING "Hello!"
\`\`\`

The preprocessor replaces every occurrence *before* compilation. No memory is used and no type checking is done.

**Using the \`const\` keyword:**

\`\`\`c
const float pi = 3.14159f;
const int   max = 100;
\`\`\`

\`const\` variables are type-checked by the compiler and occupy memory like any other variable.

## Program 1: area and circumference

\`\`\`c
#include <stdio.h>
#define PI 3.14159

int main(void) {
    const float radius = 5.0f;
    float area          = PI * radius * radius;
    float circumference = 2 * PI * radius;

    printf("Area          = %.2f\\n", area);
    printf("Circumference = %.2f\\n", circumference);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Area          = 78.54
Circumference = 31.42
\`\`\`

## Program 2: enum as constants

\`\`\`c
#include <stdio.h>

enum Day { MON = 1, TUE, WED, THU, FRI, SAT, SUN };

int main(void) {
    enum Day today = WED;
    printf("Today is day number %d of the week.\\n", today);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
Today is day number 3 of the week.
\`\`\`

## Program 3: const protects you from mistakes

\`\`\`c
#include <stdio.h>

int main(void) {
    const int MAX_USERS = 50;
    // MAX_USERS = 100;   // ❌ compile error: assignment of read-only variable
    printf("Max users allowed: %d\\n", MAX_USERS);
    return 0;
}
\`\`\`
`,
  ),

  operators: A(
    "operators",
    "Operators",
    "Basics",
    "basics",
    "Arithmetic, relational, logical, bitwise and assignment operators.",
    7,
    `
# Operators

Operators tell the compiler to perform an operation on one or more **operands**.

## Categories

| Category | Examples |
|----------|----------|
| Arithmetic | \`+ - * / %\` |
| Relational | \`== != > < >= <=\` |
| Logical | \`&& || !\` |
| Bitwise | \`& | ^ ~ << >>\` |
| Assignment | \`= += -= *= /= %=\` |
| Increment/Decrement | \`++ --\` |
| Conditional (ternary) | \`? :\` |
| \`sizeof\` | returns size in bytes |
| Comma | \`,\` |

## Precedence highlights

- \`()\` \`[]\` \`->\` — highest
- \`* /\` before \`+ -\`
- Comparisons before \`&&\` before \`||\`
- \`=\` and its family — lowest (right-to-left)

When in doubt, use parentheses.

## Program 1: arithmetic and relational

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 10, b = 3;

    printf("a + b  = %d\\n", a + b);
    printf("a - b  = %d\\n", a - b);
    printf("a * b  = %d\\n", a * b);
    printf("a / b  = %d   (integer division)\\n", a / b);
    printf("a %% b  = %d\\n", a % b);

    printf("a > b  = %d\\n", a > b);   // 1 = true
    printf("a == b = %d\\n", a == b);  // 0 = false
    return 0;
}
\`\`\`

## Program 2: logical and ternary

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 20;
    int has_id = 1;

    if (age >= 18 && has_id) {
        printf("Entry allowed.\\n");
    }

    int a = 15, b = 42;
    int max = (a > b) ? a : b;
    printf("Max = %d\\n", max);
    return 0;
}
\`\`\`

## Program 3: bitwise operations

\`\`\`c
#include <stdio.h>

int main(void) {
    unsigned int a = 12;   // 1100
    unsigned int b = 10;   // 1010

    printf("a & b  = %u   (AND)\\n", a & b);   // 1000 = 8
    printf("a | b  = %u   (OR) \\n", a | b);   // 1110 = 14
    printf("a ^ b  = %u   (XOR)\\n", a ^ b);   // 0110 = 6
    printf("~a     = %u   (NOT)\\n", ~a);
    printf("a << 2 = %u   (left shift)\\n",  a << 2);  // 48
    printf("a >> 1 = %u   (right shift)\\n", a >> 1);  // 6
    return 0;
}
\`\`\`

## Program 4: increment and compound assignment

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 5;

    printf("x++ = %d\\n", x++);   // prints 5, then x becomes 6
    printf("x   = %d\\n", x);     // 6
    printf("++x = %d\\n", ++x);   // x becomes 7, prints 7

    x += 3;                       // x = 10
    x *= 2;                       // x = 20
    printf("Final x = %d\\n", x);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
x++ = 5
x   = 6
++x = 7
Final x = 20
\`\`\`
`,
  ),

  "input-output": A(
    "input-output",
    "Input & Output",
    "Basics",
    "basics",
    "printf, scanf and formatted I/O.",
    6,
    `
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
  ),

  "type-casting": A(
    "type-casting",
    "Type Casting",
    "Basics",
    "basics",
    "Converting a value from one type to another.",
    5,
    `
# Type Casting

Type casting converts a value from one data type to another.

## Two kinds

- **Implicit** — done automatically by the compiler when types mix in an expression. Also called *type promotion*.
- **Explicit** — you write \`(type) value\` yourself.

## Rules of implicit conversion

Whenever operands of different types are combined, the "smaller" one is promoted:

\`\`\`text
char → short → int → long → long long → float → double → long double
\`\`\`

## Program 1: implicit vs explicit

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 7, b = 2;

    float implicit = a / b;             // int/int -> integer division!
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

## Program 2: converting float to int (truncation)

\`\`\`c
#include <stdio.h>

int main(void) {
    float pi = 3.9f;
    int   n  = (int) pi;        // fractional part discarded
    printf("pi = %.2f, n = %d\\n", pi, n);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
pi = 3.90, n = 3
\`\`\`

## Program 3: char to int (ASCII value)

\`\`\`c
#include <stdio.h>

int main(void) {
    char letter = 'A';
    int  ascii  = (int) letter;
    printf("The ASCII code of '%c' is %d\\n", letter, ascii);
    return 0;
}
\`\`\`

**Output**
\`\`\`text
The ASCII code of 'A' is 65
\`\`\`

## Program 4: average of integers

\`\`\`c
#include <stdio.h>

int main(void) {
    int total = 275, count = 4;
    float avg = (float) total / count;
    printf("Average = %.2f\\n", avg);
    return 0;
}
\`\`\`
`,
  ),

  "if-else": A(
    "if-else",
    "If / Else",
    "Control Flow",
    "control-flow",
    "Branching your program with if, else if and else.",
    6,
    `
# If / Else

The \`if\` statement lets your program make decisions and choose which code to run.

## Syntax

\`\`\`c
if (condition) {
    // runs when condition is true (non-zero)
} else if (other_condition) {
    // runs when other_condition is true
} else {
    // runs when nothing above matched
}
\`\`\`

In C, any **non-zero** value is treated as true. Zero is false.

## Nested if

An \`if\` inside another \`if\` — useful when you need to check a second condition only after the first passes.

## Program 1: grading system

\`\`\`c
#include <stdio.h>

int main(void) {
    int marks;
    printf("Enter marks (0-100): ");
    scanf("%d", &marks);

    if (marks >= 90)      printf("Grade: A\\n");
    else if (marks >= 75) printf("Grade: B\\n");
    else if (marks >= 50) printf("Grade: C\\n");
    else                  printf("Grade: F\\n");
    return 0;
}
\`\`\`

**Sample run**
\`\`\`text
Enter marks (0-100): 82
Grade: B
\`\`\`

## Program 2: even or odd

\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    if (n % 2 == 0) printf("%d is even.\\n", n);
    else            printf("%d is odd.\\n", n);
    return 0;
}
\`\`\`

## Program 3: largest of three numbers

\`\`\`c
#include <stdio.h>

int main(void) {
    int a, b, c;
    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    int largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;

    printf("Largest = %d\\n", largest);
    return 0;
}
\`\`\`

## Program 4: leap year checker

\`\`\`c
#include <stdio.h>

int main(void) {
    int y;
    printf("Enter year: ");
    scanf("%d", &y);

    if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0))
        printf("%d is a leap year.\\n", y);
    else
        printf("%d is not a leap year.\\n", y);
    return 0;
}
\`\`\`

**Sample runs**
\`\`\`text
Enter year: 2024
2024 is a leap year.

Enter year: 2100
2100 is not a leap year.
\`\`\`
`,
  ),

  switch: A(
    "switch",
    "Switch Statement",
    "Control Flow",
    "control-flow",
    "A clean multi-way branch based on a single value.",
    5,
    `
# Switch Statement

Use \`switch\` when you want to compare **one variable** against **many constant values**. It is clearer than a long \`if-else if\` chain.

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

**Rules**

- The expression must evaluate to an integer type (\`int\`, \`char\`, \`enum\`).
- \`case\` labels must be **constant** integer expressions.
- \`break\` prevents *fall-through* into the next case.
- \`default\` is optional but recommended.

## Program 1: simple calculator

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

## Program 2: day name from number

\`\`\`c
#include <stdio.h>

int main(void) {
    int day;
    printf("Enter day number (1-7): ");
    scanf("%d", &day);

    switch (day) {
        case 1: printf("Monday\\n");    break;
        case 2: printf("Tuesday\\n");   break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n");  break;
        case 5: printf("Friday\\n");    break;
        case 6: printf("Saturday\\n");  break;
        case 7: printf("Sunday\\n");    break;
        default: printf("Invalid day\\n");
    }
    return 0;
}
\`\`\`

## Program 3: vowel or consonant (fall-through)

\`\`\`c
#include <stdio.h>

int main(void) {
    char ch;
    printf("Enter a letter: ");
    scanf(" %c", &ch);

    switch (ch) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            printf("Vowel\\n");
            break;
        default:
            printf("Consonant\\n");
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
    7,
    `
# Loops

Loops repeat a block of code while a condition is true. C offers three loop forms.

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

## Program 1: multiplication table

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

## Program 2: sum of first N natural numbers

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) sum += i;

    printf("Sum from 1 to %d = %d\\n", n, sum);
    return 0;
}
\`\`\`

## Program 3: reverse a number

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, rev = 0;
    printf("Enter a number: ");
    scanf("%d", &n);

    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed = %d\\n", rev);
    return 0;
}
\`\`\`

## Program 4: menu-driven with do-while

\`\`\`c
#include <stdio.h>

int main(void) {
    int choice;
    do {
        printf("\\n1. Hello\\n2. Bye\\n3. Exit\\nChoice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: printf("Hello!\\n"); break;
            case 2: printf("Goodbye!\\n"); break;
            case 3: printf("Exiting...\\n"); break;
            default: printf("Invalid choice\\n");
        }
    } while (choice != 3);
    return 0;
}
\`\`\`

## Program 5: nested loop — star pyramid

\`\`\`c
#include <stdio.h>

int main(void) {
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
        for (int s = 0; s < rows - i; s++) printf(" ");
        for (int j = 0; j < 2 * i - 1; j++) printf("*");
        printf("\\n");
    }
    return 0;
}
\`\`\`

**Output**
\`\`\`text
    *
   ***
  *****
 *******
*********
\`\`\`
`,
  ),

  "break-continue": A(
    "break-continue",
    "Break & Continue",
    "Control Flow",
    "control-flow",
    "Exit loops early or skip an iteration.",
    5,
    `
# Break & Continue

- **\`break\`** exits the *nearest* loop or switch immediately.
- **\`continue\`** skips the rest of the current iteration and jumps to the next one.

Use them to write cleaner, faster loops — but don't overuse them, because they can make control flow harder to follow.

## Program 1: primes below 20

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

## Program 2: stop reading when zero is entered

\`\`\`c
#include <stdio.h>

int main(void) {
    int n, sum = 0;
    while (1) {
        printf("Enter a number (0 to stop): ");
        scanf("%d", &n);
        if (n == 0) break;
        sum += n;
    }
    printf("Sum = %d\\n", sum);
    return 0;
}
\`\`\`

## Program 3: skip multiples of 3

\`\`\`c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 15; i++) {
        if (i % 3 == 0) continue;
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
1 2 4 5 7 8 10 11 13 14
\`\`\`
`,
  ),

  functions: A(
    "functions",
    "Functions",
    "Functions",
    "functions",
    "Group reusable code into named blocks.",
    7,
    `
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
  ),

  "storage-classes": A(
    "storage-classes",
    "Storage Classes",
    "Functions",
    "functions",
    "auto, register, static and extern.",
    5,
    `
# Storage Classes

A **storage class** defines the **scope** (where a name is visible), **lifetime** (how long it lives) and **linkage** (whether other files can see it) of a variable or function.

| Class | Scope | Lifetime | Default value |
|-------|-------|----------|---------------|
| \`auto\` | Block | Block | garbage |
| \`register\` | Block | Block (hint: keep in CPU register) | garbage |
| \`static\` | Block/File | Whole program | 0 |
| \`extern\` | Global | Whole program (defined elsewhere) | 0 |

## \`auto\`

The default for local variables. You almost never write \`auto\` explicitly.

## \`register\`

A hint to the compiler to keep the variable in a CPU register for speed. Modern compilers usually ignore it — they know better than you.

## \`static\`

- Inside a function: the variable keeps its value **between calls**.
- Outside a function: limits the variable/function to the current file (internal linkage).

## \`extern\`

Declares a variable or function that is **defined in another file**. Used to share globals across multiple source files.

## Program 1: static counter

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

## Program 2: auto vs static side by side

\`\`\`c
#include <stdio.h>

void demo(void) {
    auto   int a = 0;   // resets every call
    static int s = 0;   // keeps its value
    a++; s++;
    printf("auto = %d, static = %d\\n", a, s);
}

int main(void) {
    demo();
    demo();
    demo();
    return 0;
}
\`\`\`

**Output**
\`\`\`text
auto = 1, static = 1
auto = 1, static = 2
auto = 1, static = 3
\`\`\`

## Program 3: extern across a single file

\`\`\`c
#include <stdio.h>

extern int shared;   // declare — defined below

int main(void) {
    printf("shared = %d\\n", shared);
    return 0;
}

int shared = 99;     // definition
\`\`\`
`,
  ),

  recursion: A(
    "recursion",
    "Recursion",
    "Functions",
    "functions",
    "A function that calls itself.",
    6,
    `
# Recursion

**Recursion** is when a function calls itself to solve a smaller version of the same problem.

Every recursive function needs two things:

1. A **base case** — a condition that stops the recursion.
2. A **recursive case** — the call to itself on a smaller input.

Without a proper base case you get infinite recursion and a stack overflow.

## How it works (call stack)

Each call gets its own stack frame with its own local variables. Calls stack on top of each other until the base case is reached, then return one by one.

## Program 1: factorial

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

## Program 2: Fibonacci

\`\`\`c
#include <stdio.h>

int fib(int n) {
    if (n < 2) return n;               // fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 10; i++) printf("%d ", fib(i));
    printf("\\n");
    return 0;
}
\`\`\`

**Output**
\`\`\`text
0 1 1 2 3 5 8 13 21 34
\`\`\`

## Program 3: sum of digits

\`\`\`c
#include <stdio.h>

int sum_digits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sum_digits(n / 10);
}

int main(void) {
    printf("Sum of digits of 12345 = %d\\n", sum_digits(12345));
    return 0;
}
\`\`\`

## Program 4: power (x^n)

\`\`\`c
#include <stdio.h>

long long power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
}

int main(void) {
    printf("2^10 = %lld\\n", power(2, 10));
    return 0;
}
\`\`\`

:::warning
Recursion is elegant, but each call uses stack memory. For deep recursion, prefer iteration or increase the stack size.
:::
`,
  ),

  arrays: A(
    "arrays",
    "Arrays",
    "Data Structures",
    "data-structures",
    "Collections of same-type elements stored contiguously.",
    7,
    `
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
  ),

  strings: A(
    "strings",
    "Strings",
    "Data Structures",
    "data-structures",
    "Character arrays terminated by a null character.",
    6,
    `
# Strings

In C, a **string** is a \`char\` array ending with the null character \`'\\0'\`. Unlike higher-level languages, C has no built-in string type.

\`\`\`c
char name[6] = {'H','e','l','l','o','\\0'};
char name2[] = "Hello";     // shorthand — '\\0' added automatically
\`\`\`

## Reading strings

- \`scanf("%s", str)\` — reads a single word (stops at whitespace).
- \`fgets(str, size, stdin)\` — reads a whole line (safer; keeps the newline).

## Common functions (\`<string.h>\`)

| Function | Purpose |
|----------|---------|
| \`strlen(s)\` | length (excludes \`\\0\`) |
| \`strcpy(a, b)\` | copy b into a |
| \`strncpy(a, b, n)\` | copy at most n characters |
| \`strcat(a, b)\` | append b to a |
| \`strcmp(a, b)\` | compare (0 = equal) |
| \`strchr(s, c)\` | find first occurrence of c |
| \`strstr(a, b)\` | find substring b in a |

## Program 1: string operations

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

## Program 2: length without strlen

\`\`\`c
#include <stdio.h>

int main(void) {
    char s[] = "programming";
    int len = 0;
    while (s[len] != '\\0') len++;
    printf("Length = %d\\n", len);
    return 0;
}
\`\`\`

## Program 3: reverse a string in place

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[100];
    printf("Enter a word: ");
    scanf("%99s", s);

    int n = strlen(s);
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        char t = s[i]; s[i] = s[j]; s[j] = t;
    }
    printf("Reversed: %s\\n", s);
    return 0;
}
\`\`\`

## Program 4: count vowels and consonants

\`\`\`c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[100];
    printf("Enter a sentence: ");
    fgets(s, sizeof(s), stdin);

    int v = 0, c = 0;
    for (int i = 0; s[i]; i++) {
        char ch = tolower(s[i]);
        if (ch >= 'a' && ch <= 'z') {
            if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') v++;
            else c++;
        }
    }
    printf("Vowels = %d, Consonants = %d\\n", v, c);
    return 0;
}
\`\`\`

## Program 5: palindrome check

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[100];
    printf("Enter a word: ");
    scanf("%99s", s);

    int n = strlen(s), ok = 1;
    for (int i = 0; i < n / 2; i++)
        if (s[i] != s[n - 1 - i]) { ok = 0; break; }

    printf("%s is %sa palindrome\\n", s, ok ? "" : "not ");
    return 0;
}
\`\`\`
`,
  ),

  pointers: A(
    "pointers",
    "Pointers",
    "Data Structures",
    "data-structures",
    "Variables that store memory addresses.",
    8,
    `
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
  ),

  "dynamic-memory": A(
    "dynamic-memory",
    "Dynamic Memory",
    "Data Structures",
    "data-structures",
    "Allocate and free memory at runtime.",
    6,
    `
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
  ),

  structures: A(
    "structures",
    "Structures",
    "Data Structures",
    "data-structures",
    "Group different data types under one name.",
    7,
    `
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
  ),

  unions: A(
    "unions",
    "Unions",
    "Data Structures",
    "data-structures",
    "Multiple members sharing the same memory location.",
    6,
    `
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

export interface SearchResult {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

export function getSearchableContent(): SearchResult[] {
  return Object.values(articles).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.description,
  }));
}
