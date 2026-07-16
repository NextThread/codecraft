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
    title: "Competitive Programming",
    slug: "competitive-programming",
    emoji: "🏆",
    articles: [
      { title: "Intro to Competitive Programming", slug: "cp-introduction" },
      { title: "Time Complexity", slug: "time-complexity" },
      { title: "Space Complexity", slug: "space-complexity" },
      { title: "Bit Manipulation", slug: "bit-manipulation" },
    ],
  },
  {
    title: "Math for CP",
    slug: "cp-math",
    emoji: "🧮",
    articles: [
      { title: "Number Systems", slug: "number-systems" },
      { title: "Divisibility Rules", slug: "divisibility-rules" },
      { title: "Prime Numbers", slug: "prime-numbers" },
      { title: "Factors and Divisors", slug: "factors-divisors" },
      { title: "Prime Factorization", slug: "prime-factorization" },
      { title: "GCD", slug: "gcd" },
      { title: "LCM", slug: "lcm" },
      { title: "Euclidean Algorithm", slug: "euclidean-algorithm" },
      { title: "Sieve of Eratosthenes", slug: "sieve-of-eratosthenes" },
      { title: "Linear Sieve (SPF)", slug: "linear-sieve" },
      { title: "Binary Exponentiation", slug: "binary-exponentiation" },
      { title: "Modular Arithmetic", slug: "modular-arithmetic" },
      { title: "Modular Inverse", slug: "modular-inverse" },
      { title: "Fermat's Little Theorem", slug: "fermats-little-theorem" },
      { title: "Euler Totient Function", slug: "euler-totient" },
      { title: "Extended Euclidean", slug: "extended-euclidean" },
      { title: "Chinese Remainder Theorem", slug: "chinese-remainder-theorem" },
      { title: "Inclusion-Exclusion", slug: "inclusion-exclusion" },
      { title: "Combinatorics", slug: "combinatorics" },
      { title: "Factorials", slug: "factorials" },
      { title: "Permutations", slug: "permutations" },
      { title: "Combinations", slug: "combinations" },
      { title: "Binomial Coefficients (nCr)", slug: "binomial-coefficients" },
      { title: "Pascal Triangle", slug: "pascal-triangle" },
      { title: "Catalan Numbers", slug: "catalan-numbers" },
      { title: "Matrix Exponentiation", slug: "matrix-exponentiation" },
      { title: "Fibonacci via Matrix Exp", slug: "fibonacci-matrix-exponentiation" },
      { title: "Pigeonhole Principle", slug: "pigeonhole-principle" },
      { title: "Probability Basics", slug: "probability-basics" },
      { title: "Expected Value", slug: "expected-value" },
    ],
  },
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

  "cp-introduction": A(
    "cp-introduction",
    "Intro to Competitive Programming",
    "Competitive Programming",
    "competitive-programming",
    "What competitive programming is, why it helps, and where to practice.",
    6,
    `
# Introduction to Competitive Programming

## What is Competitive Programming?

**Competitive Programming (CP)** is the sport of solving well-defined algorithmic problems within strict **time** and **memory** limits. You are given a problem statement, input/output format, constraints, and you must write a program that produces the correct output for **every** valid input — including the biggest and nastiest ones — fast enough to fit inside the time limit (usually 1–2 seconds).

CP is a mix of three skills:

1. **Math & problem solving** — reduce the problem to a known pattern (greedy, DP, graph, number theory, etc.).
2. **Algorithms & data structures** — pick the right tool with the right complexity.
3. **Fast, clean coding** — usually in **C++** because of its speed and STL (\`vector\`, \`map\`, \`set\`, \`sort\`, \`priority_queue\`, ...).

## Why learn Competitive Programming?

- Sharpens your **problem-solving** and **debugging** brain.
- Builds a strong foundation for **technical interviews** (Google, Meta, Amazon, etc.).
- Teaches you to think about **complexity, edge cases, overflow, and constraints** — not just "does it work on my example".
- It's genuinely fun once you start solving.

## The typical workflow

1. Read the problem carefully. Note constraints (\`N ≤ 10^5\`, values up to \`10^9\`, etc.).
2. Estimate what complexity fits (see the Time Complexity chapter).
3. Design an algorithm on paper.
4. Code it (usually in C++).
5. Test on samples and edge cases.
6. Submit. If **WA / TLE / RE**, debug and retry.

## Language of choice: C++

Most competitive programmers use **C++** because:

- Very fast execution.
- Rich **STL** (Standard Template Library).
- Short, expressive syntax with \`auto\`, range-for, lambdas.

A minimal CP-style C++ template:

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;

    sort(a.begin(), a.end());

    for (int x : a) cout << x << ' ';
    cout << '\\n';
    return 0;
}
\`\`\`

## Where to practice

Some of the best free judges to practice on:

- [Codeforces](https://codeforces.com/) — regular contests (Div. 4, Div. 3, Div. 2, Div. 1), huge problemset, ratings.
- [AtCoder](https://atcoder.jp/) — beautifully written problems, weekly Beginner Contests (ABC) are perfect for starting.
- [LeetCode](https://leetcode.com/) — great for interview-style problems and daily practice.
- [CSES Problem Set](https://cses.fi/problemset/) — a curated ladder of classic problems by topic.

:::info
**Suggested path:** solve **Codeforces Div. 4 / ABC A–C** problems until they feel easy, then move up to Div. 3 and ABC D. Do not skip the basics.
:::

## What we'll cover next

The following chapters build the exact toolkit you need to start solving:

1. **Time Complexity** — how to estimate if your solution will fit in the time limit.
2. **Space Complexity** — how much memory your algorithm uses.
3. **Bit Manipulation** — a superpower for tricks, sets, and speedups.
`,
  ),

  "time-complexity": A(
    "time-complexity",
    "Time Complexity",
    "Competitive Programming",
    "competitive-programming",
    "Big-O, all common growth rates, and how to estimate if your solution fits.",
    10,
    `
# Time Complexity

## What is Time Complexity?

**Time complexity** describes how the number of basic operations an algorithm performs **grows with the input size \`n\`**. We don't care about exact seconds — hardware changes. We care about the **shape** of the growth.

We express it using **asymptotic notation**, most commonly **Big-O**.

## Asymptotic notations

| Notation | Meaning | Bound |
|----------|---------|-------|
| **O(f(n))** | Upper bound — worst case grows *at most* like f(n) | ≤ |
| **Ω(f(n))** | Lower bound — grows *at least* like f(n) | ≥ |
| **Θ(f(n))** | Tight bound — grows *exactly* like f(n) | = |
| **o(f(n))** | Strictly smaller than f(n) | < |

In CP we almost always use **Big-O** for the worst case.

## Rules of thumb

1. Drop constants: \`O(3n) = O(n)\`.
2. Drop lower-order terms: \`O(n^2 + n) = O(n^2)\`.
3. Different inputs get different variables: \`O(n + m)\`, not \`O(n)\`.
4. Nested loops multiply. Sequential loops add.

## All common time complexities

Ordered from fastest to slowest:

### 1. O(1) — Constant

Runs in the same time regardless of input.

\`\`\`cpp
int first = a[0];        // O(1)
int sum   = a + b;       // O(1)
\`\`\`

### 2. O(log n) — Logarithmic

Cuts the input roughly in half every step. Classic example: **binary search**.

\`\`\`cpp
int binary_search(vector<int>& a, int x) {
    int lo = 0, hi = a.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] == x) return mid;
        if (a[mid] < x) lo = mid + 1;
        else            hi = mid - 1;
    }
    return -1;
}
\`\`\`

### 3. O(√n) — Square root

Common in prime checks and factorization.

\`\`\`cpp
bool is_prime(int n) {
    if (n < 2) return false;
    for (int i = 2; (long long)i * i <= n; ++i)
        if (n % i == 0) return false;
    return true;
}
\`\`\`

### 4. O(n) — Linear

One pass through the input.

\`\`\`cpp
int sum = 0;
for (int x : a) sum += x;   // O(n)
\`\`\`

### 5. O(n log n) — Linearithmic

The complexity of good sorting algorithms: **merge sort, heap sort, std::sort**.

\`\`\`cpp
sort(a.begin(), a.end());   // O(n log n)
\`\`\`

### 6. O(n²) — Quadratic

Two nested loops over the input. Bubble sort, selection sort, checking all pairs.

\`\`\`cpp
for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j)
        if (a[i] + a[j] == target) { /* ... */ }
\`\`\`

### 7. O(n³) — Cubic

Three nested loops. Floyd–Warshall all-pairs shortest paths.

\`\`\`cpp
for (int k = 0; k < n; ++k)
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
\`\`\`

### 8. O(2ⁿ) — Exponential

Trying every subset. Naive recursion for the Fibonacci numbers.

\`\`\`cpp
int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);   // O(2^n)
}
\`\`\`

### 9. O(n!) — Factorial

Trying every permutation. Brute-force TSP.

\`\`\`cpp
do {
    // evaluate permutation
} while (next_permutation(a.begin(), a.end()));
\`\`\`

## Comparing growth rates

\`\`\`text
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
\`\`\`

## What fits in 1 second? (competitive rule of thumb)

Modern judges execute roughly **10⁸ simple operations per second** for C++.

| n (input size) | Max feasible complexity |
|----------------|-------------------------|
| n ≤ 10        | O(n!) , O(2ⁿ · n)      |
| n ≤ 20        | O(2ⁿ · n)               |
| n ≤ 500       | O(n³)                   |
| n ≤ 5 000     | O(n²)                   |
| n ≤ 10⁶      | O(n log n)              |
| n ≤ 10⁸      | O(n) — barely           |
| n up to 10¹⁸ | O(log n) or O(1)        |

:::info
Always **look at the constraints first**. They tell you which complexity you're allowed.
:::

## Best / Average / Worst case

- **Best case** — the input that makes the algorithm finish fastest.
- **Average case** — expected behavior on random input.
- **Worst case** — the input that makes it slowest. **This is what Big-O usually describes.**

Example — **Quick Sort**:

- Best / average: **O(n log n)**
- Worst: **O(n²)** (bad pivot on already-sorted data)

## Amortized complexity

Sometimes a single operation is expensive, but if you average it over many operations it becomes cheap. Classic example: appending to a **dynamic array** (\`std::vector::push_back\`) is **O(1) amortized**, even though occasional resizes cost O(n).

## Program: measuring complexity empirically

\`\`\`cpp
#include <bits/stdc++.h>
#include <chrono>
using namespace std;
using namespace chrono;

int main() {
    for (int n : {1000, 2000, 4000, 8000}) {
        vector<int> a(n);
        iota(a.begin(), a.end(), 0);
        random_shuffle(a.begin(), a.end());

        auto t1 = high_resolution_clock::now();
        sort(a.begin(), a.end());
        auto t2 = high_resolution_clock::now();

        cout << "n = " << n << "  time = "
             << duration_cast<microseconds>(t2 - t1).count()
             << " us\\n";
    }
}
\`\`\`

Notice the time roughly **doubles** when \`n\` doubles — that's the signature of **O(n log n)**.
`,
  ),

  "space-complexity": A(
    "space-complexity",
    "Space Complexity",
    "Competitive Programming",
    "competitive-programming",
    "How much extra memory an algorithm needs, and how to shrink it.",
    6,
    `
# Space Complexity

## What is Space Complexity?

**Space complexity** measures the **extra memory** an algorithm uses as a function of the input size \`n\`, again expressed with Big-O. It includes:

- **Input storage** (sometimes counted separately).
- **Auxiliary space** — arrays, hash maps, recursion stack, etc.

Judges typically give you **256 MB** of memory. Rough sizing:

| Type in C++     | Bytes | 10⁶ items | 10⁸ items |
|-----------------|-------|-----------|-----------|
| \`int\`         | 4     | 4 MB      | 400 MB ❌ |
| \`long long\`   | 8     | 8 MB      | 800 MB ❌ |
| \`char\` / \`bool\` | 1  | 1 MB      | 100 MB    |
| \`double\`      | 8     | 8 MB      | 800 MB ❌ |

## Common space complexities

### O(1) — in-place

Uses a fixed number of variables regardless of input.

\`\`\`cpp
void reverse_inplace(vector<int>& a) {
    int l = 0, r = a.size() - 1;
    while (l < r) swap(a[l++], a[r--]);
}
\`\`\`

### O(n) — proportional

You allocate an array/hash of size \`n\`.

\`\`\`cpp
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + a[i];
\`\`\`

### O(n²) — 2D tables

Common in DP on strings/grids.

\`\`\`cpp
vector<vector<int>> dp(n, vector<int>(n, 0));
\`\`\`

### O(log n) — recursion stack

Divide-and-conquer where each call halves the input, like binary search implemented recursively.

## Recursion uses memory too

Every recursive call pushes a **stack frame**. A recursion of depth \`n\` costs **O(n)** memory even if you allocate nothing yourself. Deep recursion (\`n = 10⁶\`) can cause **stack overflow** — convert to iteration or increase stack size.

## Time–Space tradeoff

You can often **trade memory for speed** (memoization/DP) or **memory for simpler code** (hash maps instead of clever math).

Example — Fibonacci:

- Naive recursion: **O(2ⁿ) time**, **O(n) space** (call stack).
- Memoized:       **O(n) time**,   **O(n) space**.
- Two variables:  **O(n) time**,   **O(1) space**.

\`\`\`cpp
// O(1) space Fibonacci
long long fib(int n) {
    long long a = 0, b = 1;
    for (int i = 0; i < n; ++i) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return a;
}
\`\`\`

## Rule of thumb

- Prefer \`vector<int>\` over \`vector<vector<int>>\` when a 1D layout works.
- Use \`bitset<N>\` for boolean arrays — **8× less memory** than \`bool[]\`.
- Reuse rolling arrays in DP (\`dp[i]\` only depends on \`dp[i-1]\` → two rows are enough).
`,
  ),

  "bit-manipulation": A(
    "bit-manipulation",
    "Bit Manipulation",
    "Competitive Programming",
    "competitive-programming",
    "Bitwise operators, tricks, Brian Kernighan's algorithm, and classic problems.",
    14,
    `
# Bit Manipulation

## Why bits?

Every integer in a computer is stored as a sequence of **bits** (0s and 1s). Manipulating those bits directly lets us:

- Do things **extremely fast** (a single CPU instruction).
- Encode **sets of up to 64 elements** in a single \`long long\`.
- Solve problems that look hard with clever one-liners.

## Bitwise operators

| Operator | Name | Example (\`a=6=110\`, \`b=3=011\`) | Result |
|----------|------|------------------------------------|--------|
| \`&\`  | AND         | \`6 & 3\`   | \`010 = 2\` |
| \`|\`  | OR          | \`6 \\| 3\` | \`111 = 7\` |
| \`^\`  | XOR         | \`6 ^ 3\`   | \`101 = 5\` |
| \`~\`  | NOT         | \`~6\`      | flips all bits |
| \`<<\` | Left shift  | \`6 << 1\`  | \`1100 = 12\` (× 2) |
| \`>>\` | Right shift | \`6 >> 1\`  | \`011 = 3\`  (÷ 2) |

## Essential bit tricks

Assume \`x\` is a non-negative integer and \`i\` is a bit position (0 = least significant).

### 1. Check if the i-th bit is set
\`\`\`cpp
bool bit_set = (x >> i) & 1;
\`\`\`

### 2. Set the i-th bit
\`\`\`cpp
x |= (1 << i);
\`\`\`

### 3. Clear the i-th bit
\`\`\`cpp
x &= ~(1 << i);
\`\`\`

### 4. Toggle the i-th bit
\`\`\`cpp
x ^= (1 << i);
\`\`\`

### 5. Check if x is a power of two
A power of two has exactly one bit set. \`x & (x - 1)\` clears the lowest set bit; if the result is 0 and x > 0, x was a power of two.

\`\`\`cpp
bool pow2 = x > 0 && (x & (x - 1)) == 0;
\`\`\`

### 6. Isolate the lowest set bit
\`\`\`cpp
int lowest = x & -x;   // two's complement magic
\`\`\`

### 7. Turn off the lowest set bit
\`\`\`cpp
x &= (x - 1);
\`\`\`

### 8. Multiply / divide by powers of two
\`\`\`cpp
int y = x << 3;   // x * 8
int z = x >> 2;   // x / 4  (for non-negative x)
\`\`\`

### 9. Swap two numbers without a temp
\`\`\`cpp
a ^= b; b ^= a; a ^= b;
\`\`\`

### 10. XOR properties (memorize these)
- \`a ^ a = 0\`
- \`a ^ 0 = a\`
- XOR is **commutative** and **associative**

Used in the classic *"find the number that appears once when all others appear twice"* trick:

\`\`\`cpp
int single = 0;
for (int x : a) single ^= x;   // O(n) time, O(1) space
\`\`\`

## Counting set bits (popcount)

### Naive: loop through 32 bits
\`\`\`cpp
int popcount_naive(unsigned x) {
    int c = 0;
    while (x) { c += x & 1; x >>= 1; }
    return c;
}
\`\`\`
Runs in **O(bits)**, i.e. 32 iterations.

### Brian Kernighan's Algorithm

Key insight: \`x & (x - 1)\` removes the **lowest set bit** of \`x\`. So we loop exactly **as many times as there are set bits** — much faster when the number is sparse.

\`\`\`cpp
int popcount_bk(unsigned x) {
    int c = 0;
    while (x) {
        x &= (x - 1);   // drop the lowest set bit
        ++c;
    }
    return c;
}
\`\`\`

**Complexity:** O(k) where k = number of set bits (≤ 32). This is Brian Kernighan's algorithm.

### Built-in (fastest)
\`\`\`cpp
__builtin_popcount(x);        // for unsigned int
__builtin_popcountll(x);      // for unsigned long long
\`\`\`

Other useful GCC builtins:

| Builtin | Meaning |
|---------|---------|
| \`__builtin_clz(x)\`  | leading zeros |
| \`__builtin_ctz(x)\`  | trailing zeros |
| \`__builtin_parity(x)\` | parity of set bits |

## Iterating over subsets of a set (bitmask trick)

Given a bitmask \`m\`, iterate over **every non-empty subset** of \`m\`:

\`\`\`cpp
for (int s = m; s > 0; s = (s - 1) & m) {
    // s is a subset of m
}
\`\`\`
Runs in **O(3^n)** total across all masks — the standard trick for subset DP.

## Full-featured program: bit toolkit demo

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    unsigned x = 29;   // 11101

    cout << "x            = " << bitset<8>(x) << " (" << x << ")\\n";
    cout << "bit 2 set?   = " << ((x >> 2) & 1) << "\\n";
    cout << "set   bit 1  = " << bitset<8>(x | (1 << 1)) << "\\n";
    cout << "clear bit 0  = " << bitset<8>(x & ~(1u << 0)) << "\\n";
    cout << "toggle bit 3 = " << bitset<8>(x ^ (1 << 3)) << "\\n";
    cout << "lowest set   = " << (x & -x) << "\\n";
    cout << "popcount     = " << __builtin_popcount(x) << "\\n";
    cout << "is pow of 2? = " << (x && !(x & (x - 1))) << "\\n";
    return 0;
}
\`\`\`

## Checking power of k (general idea)

- **Power of 2:** \`x > 0 && (x & (x - 1)) == 0\`.
- **Power of 4:** power of 2 **and** the single set bit is at an even position → \`x > 0 && (x & (x - 1)) == 0 && (x & 0x55555555) != 0\`.
- **Power of 3:** no direct bit trick — use the fact that the largest power of 3 that fits in an \`int\` is \`3^19 = 1162261467\`, so \`x > 0 && 1162261467 % x == 0\`.

## Practice problems

Solve these in order — they cover every trick above:

1. [Codeforces 579A — Raising Bacteria](https://codeforces.com/problemset/problem/579/A) — the answer is literally \`__builtin_popcount(n)\`.
2. [LeetCode — Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/description/) — implement popcount, then optimize with Brian Kernighan.
3. [LeetCode — Power of Two](https://leetcode.com/problems/power-of-two/) — one-line trick with \`x & (x - 1)\`.
4. [LeetCode — Power of Three](https://leetcode.com/problems/power-of-three/) — the divisibility trick above.
5. [LeetCode — Power of Four](https://leetcode.com/problems/power-of-four/) — combine "power of two" with an odd/even bit mask.
6. [LeetCode — Check if Number is a Sum of Powers of Three](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/) — write \`n\` in base 3 and check every digit is 0 or 1.

:::info
Once these feel easy, hunt tags like **bitmasks**, **dp**, **constructive** on [Codeforces](https://codeforces.com/problemset?tags=bitmasks) and [AtCoder](https://atcoder.jp/) to keep leveling up.
:::
`,
  ),
  "number-systems": A(
    "number-systems",
    "Number Systems",
    "Math for Competitive Programming",
    "cp-math",
    "Number Systems — theory and C++17 implementation.",
    4,
    `
# Number Systems

## Theory

Number systems define how we represent quantities using a set of digits and a base (or radix). In competitive programming and computer science, four bases dominate: **decimal (base 10)**, **binary (base 2)**, **octal (base 8)**, and **hexadecimal (base 16)**.

Every positional number system represents a value as a weighted sum of powers of its base. For a base \`b\` number with digits \`d_k d_{k-1} ... d_1 d_0\`:

value = d_k * b^k + d_{k-1} * b^(k-1) + ... + d_1 * b + d_0

### Common bases

- **Decimal (base 10):** digits 0-9. Human-friendly. Example: \`345 = 3*100 + 4*10 + 5\`.
- **Binary (base 2):** digits 0, 1. Native to computers. Example: \`1011 = 8 + 2 + 1 = 11\`.
- **Octal (base 8):** digits 0-7. Each octal digit = 3 binary bits.
- **Hexadecimal (base 16):** digits 0-9, A-F. Each hex digit = 4 binary bits. Example: \`0x1F = 31\`.

### Conversions

**Any base to decimal** — expand using powers of the base.
**Decimal to any base** — repeatedly divide by the base and collect remainders (read bottom-up).
**Binary <-> Hex** — group 4 bits at a time (right to left).

### Why it matters in CP

- Bitmask problems live in **base 2**.
- Digit DP problems often generalize to any base.
- Some problems require detecting whether \`n\` has a "nice" representation in some base (e.g. sum of powers of 3).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Convert a number in base \`b\` (given as a string) to decimal (long long).
long long toDecimal(const string &num, int b) {
    long long value = 0;
    for (char c : num) {
        int digit = isdigit(c) ? c - '0' : toupper(c) - 'A' + 10;
        value = value * b + digit;
    }
    return value;
}

// Convert a decimal number to base \`b\` (2 <= b <= 16), returned as string.
string fromDecimal(long long n, int b) {
    if (n == 0) return "0";
    string s;
    while (n > 0) {
        int d = n % b;
        s += (d < 10) ? char('0' + d) : char('A' + d - 10);
        n /= b;
    }
    reverse(s.begin(), s.end());
    return s;
}

int main() {
    cout << toDecimal("1011", 2) << "\\n";   // 11
    cout << toDecimal("1F", 16) << "\\n";    // 31
    cout << fromDecimal(255, 16) << "\\n";   // FF
    cout << fromDecimal(11, 2) << "\\n";     // 1011
}
\`\`\`
`,
  ),
  "divisibility-rules": A(
    "divisibility-rules",
    "Divisibility Rules",
    "Math for Competitive Programming",
    "cp-math",
    "Divisibility Rules — theory and C++17 implementation.",
    4,
    `
# Divisibility Rules

## Theory

A **divisibility rule** is a shortcut to check whether an integer \`n\` is divisible by some small integer \`d\` without doing the full division. In CP these rules are used inside digit-DP problems, big-integer checks, and constructive tasks.

### Classic rules (base 10)

- **Divisible by 2** — last digit is even (0, 2, 4, 6, 8).
- **Divisible by 3** — sum of digits divisible by 3.
- **Divisible by 4** — last two digits form a number divisible by 4.
- **Divisible by 5** — last digit is 0 or 5.
- **Divisible by 6** — divisible by 2 AND by 3.
- **Divisible by 7** — take last digit, double it, subtract from the rest; repeat until small.
- **Divisible by 8** — last three digits divisible by 8.
- **Divisible by 9** — sum of digits divisible by 9.
- **Divisible by 10** — last digit is 0.
- **Divisible by 11** — alternating sum of digits (from right) divisible by 11.

### Why the digit-sum rules work

In base 10, \`10 ≡ 1 (mod 9)\`, so any power \`10^k ≡ 1 (mod 9)\`. That means a number equals the sum of its digits modulo 9, which is why divisibility by 3 and 9 reduces to digit sums.

Similarly \`10 ≡ -1 (mod 11)\`, so alternating sums decide divisibility by 11.

### Generalization

For any modulus \`m\`, if you can compute \`10^k mod m\` cheaply, you can turn a digit-based test into a per-digit weighted sum — the foundation of **digit DP**.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Generic: check divisibility of a very large number (as string) by m.
// Works because we compute n mod m one digit at a time.
bool divisibleBy(const string &num, int m) {
    int r = 0;
    for (char c : num) r = (r * 10 + (c - '0')) % m;
    return r == 0;
}

// Digit-sum shortcut for 3 and 9.
int digitSum(long long n) {
    int s = 0;
    while (n) { s += n % 10; n /= 10; }
    return s;
}

// Alternating digit sum (right to left) — rule for 11.
int altSum(long long n) {
    int s = 0, sign = 1;
    while (n) { s += sign * (int)(n % 10); sign = -sign; n /= 10; }
    return s;
}

int main() {
    cout << boolalpha;
    cout << divisibleBy("123456789123456789", 3) << "\\n"; // true
    cout << (digitSum(729) % 9 == 0) << "\\n";             // true
    cout << (altSum(1210) % 11 == 0) << "\\n";             // true
}
\`\`\`
`,
  ),
  "prime-numbers": A(
    "prime-numbers",
    "Prime Numbers",
    "Math for Competitive Programming",
    "cp-math",
    "Prime Numbers — theory and C++17 implementation.",
    4,
    `
# Prime Numbers

## Theory

A **prime number** is an integer \`p > 1\` whose only positive divisors are \`1\` and \`p\`. Numbers greater than 1 that are not prime are called **composite**. \`1\` is neither prime nor composite by convention.

### Key facts

- \`2\` is the only even prime.
- Every integer \`n > 1\` has a **unique** prime factorization (Fundamental Theorem of Arithmetic).
- There are infinitely many primes (Euclid's proof).
- Primes thin out but never stop: the number of primes ≤ N is roughly \`N / ln N\` (Prime Number Theorem).

### Primality test — trial division

If \`n\` has a divisor \`d\` with \`1 < d < n\`, then it also has a divisor ≤ \`sqrt(n)\`. So we only test divisors up to \`sqrt(n)\`. Complexity **O(sqrt(n))**.

Optimization: after checking 2 and 3, test only numbers of the form \`6k ± 1\`, because every prime > 3 has that form.

### Faster tests

- **Miller-Rabin** — probabilistic, extremely fast; with well-chosen bases it is deterministic for \`n < 3.3 * 10^24\`.
- **Sieve of Eratosthenes** — precompute primality of every number up to N in \`O(N log log N)\`.

### Where primes appear in CP

Modular arithmetic (\`10^9 + 7\` is prime), hashing, cryptography, number-theoretic transforms, and any problem involving factorization.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Trial-division primality test — O(sqrt(n)).
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n < 4) return true;             // 2, 3
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// Deterministic Miller-Rabin for 64-bit integers.
using u128 = __int128;
long long mulmod(long long a, long long b, long long m) {
    return (long long)((u128)a * b % m);
}
long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = mulmod(r, a, m); a = mulmod(a, a, m); e >>= 1; }
    return r;
}
bool millerRabin(long long n) {
    if (n < 2) return false;
    for (long long p : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37})
        if (n % p == 0) return n == p;
    long long d = n - 1; int r = 0;
    while ((d & 1) == 0) { d >>= 1; r++; }
    for (long long a : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}) {
        long long x = powmod(a, d, n);
        if (x == 1 || x == n - 1) continue;
        bool composite = true;
        for (int i = 0; i < r - 1; i++) {
            x = mulmod(x, x, n);
            if (x == n - 1) { composite = false; break; }
        }
        if (composite) return false;
    }
    return true;
}

int main() {
    cout << boolalpha << isPrime(97) << " " << millerRabin(1000000007LL) << "\\n";
}
\`\`\`
`,
  ),
  "factors-divisors": A(
    "factors-divisors",
    "Factors and Divisors",
    "Math for Competitive Programming",
    "cp-math",
    "Factors and Divisors — theory and C++17 implementation.",
    4,
    `
# Factors and Divisors

## Theory

A **divisor** (or **factor**) of an integer \`n\` is an integer \`d\` such that \`n % d == 0\`. The set of positive divisors of \`n\` is denoted \`D(n)\`.

### Finding all divisors in O(sqrt(n))

Divisors come in pairs: if \`d\` divides \`n\`, then so does \`n / d\`. Iterate \`i\` from \`1\` to \`sqrt(n)\`; whenever \`i | n\`, record both \`i\` and \`n / i\` (avoiding duplicates when \`i * i == n\`).

### Counting divisors

If \`n = p1^a1 * p2^a2 * ... * pk^ak\`, then the number of divisors is:

\`d(n) = (a1 + 1)(a2 + 1) ... (ak + 1)\`

### Sum of divisors

\`sigma(n) = product over i of (p_i^(a_i + 1) - 1) / (p_i - 1)\`

### Highly composite numbers

Numbers with many divisors grow slowly: even up to \`10^18\`, no number has more than ~ **103,680** divisors. In CP this bound is often used to argue that "iterating over divisors" is safe.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// All positive divisors of n, sorted — O(sqrt(n)).
vector<long long> divisors(long long n) {
    vector<long long> small, large;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            small.push_back(i);
            if (i != n / i) large.push_back(n / i);
        }
    }
    reverse(large.begin(), large.end());
    small.insert(small.end(), large.begin(), large.end());
    return small;
}

// Number of divisors from prime factorization.
long long countDivisors(long long n) {
    long long cnt = 1;
    for (long long p = 2; p * p <= n; p++) {
        int e = 0;
        while (n % p == 0) { n /= p; e++; }
        cnt *= (e + 1);
    }
    if (n > 1) cnt *= 2;   // remaining prime factor
    return cnt;
}

int main() {
    for (long long d : divisors(36)) cout << d << ' ';   // 1 2 3 4 6 9 12 18 36
    cout << "\\n" << countDivisors(36) << "\\n";           // 9
}
\`\`\`
`,
  ),
  "prime-factorization": A(
    "prime-factorization",
    "Prime Factorization",
    "Math for Competitive Programming",
    "cp-math",
    "Prime Factorization — theory and C++17 implementation.",
    4,
    `
# Prime Factorization

## Theory

Every integer \`n > 1\` can be written **uniquely** as a product of primes (Fundamental Theorem of Arithmetic):

\`n = p1^a1 * p2^a2 * ... * pk^ak\`

### Trial-division factorization — O(sqrt(n))

Iterate \`p\` from 2 upward. While \`p\` divides \`n\`, keep dividing and record the exponent. Stop when \`p * p > n\`. If a remainder \`> 1\` is left, it is itself a prime.

### Faster factorization with a smallest-prime-factor sieve

If we precompute \`spf[x]\` = smallest prime factor of \`x\` for all \`x <= N\` (see **Linear Sieve**), we can factorize any \`x <= N\` in **O(log x)** by repeatedly dividing by \`spf[x]\`.

### Pollard's rho

For very large \`n\` (up to \`10^18\`) that we cannot sieve, **Pollard's rho** combined with Miller-Rabin factors in roughly \`O(n^{1/4})\`.

### Uses

- Counting/summing divisors
- Computing Euler's totient
- GCD/LCM relationships
- Number theory constructions

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Trial-division prime factorization — O(sqrt(n)).
// Returns pairs (prime, exponent).
vector<pair<long long, int>> factorize(long long n) {
    vector<pair<long long, int>> f;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            int e = 0;
            while (n % p == 0) { n /= p; e++; }
            f.push_back({p, e});
        }
    }
    if (n > 1) f.push_back({n, 1});
    return f;
}

// Factor using precomputed smallest-prime-factor table — O(log n) per query.
vector<pair<int, int>> factorizeWithSPF(int n, const vector<int> &spf) {
    vector<pair<int, int>> f;
    while (n > 1) {
        int p = spf[n], e = 0;
        while (n % p == 0) { n /= p; e++; }
        f.push_back({p, e});
    }
    return f;
}

int main() {
    for (auto [p, e] : factorize(360)) cout << p << "^" << e << ' ';
    // 2^3 3^2 5^1
}
\`\`\`
`,
  ),
  "gcd": A(
    "gcd",
    "GCD",
    "Math for Competitive Programming",
    "cp-math",
    "GCD — theory and C++17 implementation.",
    4,
    `
# GCD

## Theory

The **greatest common divisor** \`gcd(a, b)\` of two non-negative integers is the largest integer that divides both. By convention, \`gcd(a, 0) = a\`.

### Properties

- \`gcd(a, b) = gcd(b, a)\`
- \`gcd(a, b) = gcd(a - b, b)\` for \`a >= b\` (subtraction form)
- \`gcd(a, b) = gcd(b, a mod b)\` (Euclidean form — much faster)
- \`gcd(a, b) * lcm(a, b) = a * b\`
- \`gcd\` is associative: \`gcd(a, b, c) = gcd(gcd(a, b), c)\`

### Euclidean algorithm

Repeatedly replace \`(a, b)\` with \`(b, a mod b)\` until \`b == 0\`. Complexity: **O(log(min(a, b)))**. This is one of the oldest algorithms still in daily use.

### Binary GCD (Stein's algorithm)

Uses only shifts, subtractions, and parity checks. Sometimes faster on hardware without cheap division. Complexity still \`O(log)\`.

### In C++17

\`std::gcd(a, b)\` is available in \`<numeric>\` and works with any integer type.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Recursive Euclidean algorithm.
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Iterative form — avoids recursion stack.
long long gcdIter(long long a, long long b) {
    while (b) { a %= b; swap(a, b); }
    return a;
}

// Binary GCD (Stein's algorithm).
long long binaryGcd(long long a, long long b) {
    if (!a || !b) return a | b;
    int shift = __builtin_ctzll(a | b);
    a >>= __builtin_ctzll(a);
    do {
        b >>= __builtin_ctzll(b);
        if (a > b) swap(a, b);
        b -= a;
    } while (b);
    return a << shift;
}

int main() {
    cout << gcd(48, 18) << "\\n";                 // 6
    cout << std::gcd(48, 18) << "\\n";            // 6 (C++17 <numeric>)
    cout << binaryGcd(1000000000LL, 750) << "\\n";
}
\`\`\`
`,
  ),
  "lcm": A(
    "lcm",
    "LCM",
    "Math for Competitive Programming",
    "cp-math",
    "LCM — theory and C++17 implementation.",
    4,
    `
# LCM

## Theory

The **least common multiple** \`lcm(a, b)\` is the smallest positive integer that is a multiple of both \`a\` and \`b\`.

### Key identity

\`lcm(a, b) = a * b / gcd(a, b)\`

Compute \`gcd\` first, then divide **before** multiplying to avoid overflow: \`a / gcd(a, b) * b\`.

### Properties

- \`lcm(a, 0) = 0\` by convention
- \`lcm\` is associative
- For a prime factorization view: take the **maximum** exponent of each prime across \`a\` and \`b\`
- \`lcm(a1, a2, ..., an)\` can grow astronomically — often kept modulo a prime in CP

### Overflow warning

Even for 64-bit ints, \`lcm\` can overflow easily. Use \`__int128\` or reduce modulo when accumulating LCMs.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }

// Safe LCM — divide first, then multiply.
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return a / gcd(a, b) * b;
}

// LCM of an array.
long long lcmAll(const vector<long long> &v) {
    long long r = 1;
    for (long long x : v) r = lcm(r, x);
    return r;
}

int main() {
    cout << lcm(12, 18) << "\\n";                            // 36
    cout << lcmAll({4, 6, 8, 9}) << "\\n";                   // 72
    cout << std::lcm(4LL, 6LL) << "\\n";                     // C++17: 12
}
\`\`\`
`,
  ),
  "euclidean-algorithm": A(
    "euclidean-algorithm",
    "Euclidean Algorithm",
    "Math for Competitive Programming",
    "cp-math",
    "Euclidean Algorithm — theory and C++17 implementation.",
    4,
    `
# Euclidean Algorithm

## Theory

The **Euclidean algorithm** computes \`gcd(a, b)\` using the identity:

\`gcd(a, b) = gcd(b, a mod b)\`,  with \`gcd(a, 0) = a\`.

### Correctness

Any common divisor of \`a\` and \`b\` also divides \`a mod b = a - floor(a/b) * b\`, and vice versa. So \`gcd(a, b) = gcd(b, a mod b)\`. Each step strictly decreases the smaller argument, so the process terminates.

### Complexity

At every two steps the smaller number is **at least halved**, so the number of iterations is \`O(log(min(a, b)))\`. The worst case is consecutive Fibonacci numbers — this is Lame's theorem.

### Recursive vs iterative

Both are \`O(log)\` in time, but iterative uses O(1) space.

### Extended Euclidean

A generalization also finds integers \`x, y\` such that \`a*x + b*y = gcd(a, b)\` (Bezout's identity). See the dedicated topic.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Recursive form.
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

// Iterative form — same complexity, O(1) stack.
long long gcdIterative(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    cout << gcd(1071, 462) << "\\n";           // 21
    cout << gcdIterative(1071, 462) << "\\n";  // 21
    // Fibonacci worst case: gcd(F_{n+1}, F_n) does n iterations.
    cout << gcd(89, 55) << "\\n";              // 1
}
\`\`\`
`,
  ),
  "sieve-of-eratosthenes": A(
    "sieve-of-eratosthenes",
    "Sieve of Eratosthenes",
    "Math for Competitive Programming",
    "cp-math",
    "Sieve of Eratosthenes — theory and C++17 implementation.",
    4,
    `
# Sieve of Eratosthenes

## Theory

The **Sieve of Eratosthenes** finds all primes up to \`N\` in **O(N log log N)** time and **O(N)** memory.

### Idea

Start with an array \`isPrime[0..N]\` all set to true. For each \`i\` from 2 up to \`sqrt(N)\`, if \`isPrime[i]\` is still true, mark every multiple \`i*i, i*i + i, i*i + 2i, ...\` as composite. Start from \`i*i\` because smaller multiples (\`2i, 3i, ..., (i-1)*i\`) were already crossed out by smaller primes.

### Why \`O(N log log N)\`

The sum \`sum over primes p <= N of N/p\` is \`~ N * ln(ln N)\`.

### Segmented Sieve

If \`N\` is too large to fit in memory (e.g. \`10^12\`), sieve small primes up to \`sqrt(N)\` first, then process the range \`[L, R]\` in blocks — this is the **segmented sieve**.

### CP uses

- Primality queries in O(1) after preprocessing
- Iterating over primes
- Combined with **smallest prime factor** to factor numbers in O(log)

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Returns a boolean array: isPrime[i] is true iff i is prime, for 0 <= i <= N.
vector<char> sieve(int N) {
    vector<char> isPrime(N + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; (long long)i * i <= N; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= N; j += i) isPrime[j] = false;
        }
    }
    return isPrime;
}

// Collect all primes up to N.
vector<int> primesUpTo(int N) {
    auto p = sieve(N);
    vector<int> out;
    for (int i = 2; i <= N; i++) if (p[i]) out.push_back(i);
    return out;
}

int main() {
    for (int x : primesUpTo(50)) cout << x << ' ';
    // 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
}
\`\`\`
`,
  ),
  "linear-sieve": A(
    "linear-sieve",
    "Linear Sieve (Smallest Prime Factor)",
    "Math for Competitive Programming",
    "cp-math",
    "Linear Sieve (Smallest Prime Factor) — theory and C++17 implementation.",
    4,
    `
# Linear Sieve (Smallest Prime Factor)

## Theory

The **linear sieve** computes both the list of primes and the **smallest prime factor** \`spf[x]\` for every \`x <= N\` in **O(N)** time — each composite is crossed out exactly once.

### Idea

Iterate \`i\` from 2 to \`N\`. If \`spf[i]\` is 0, \`i\` is prime; add it to the prime list and set \`spf[i] = i\`. Then, for each prime \`p\` in the list, mark \`spf[i * p] = p\`, but **break** as soon as \`p\` divides \`i\`. This break ensures every composite \`c\` is marked exactly once — by its smallest prime factor.

### Why exactly O(N)

Each composite \`c = spf[c] * (c / spf[c])\` is written down at the unique iteration \`i = c / spf[c]\`, \`p = spf[c]\`.

### Fast factorization

Given \`spf\`, factor any \`x <= N\` in **O(log x)**:

\`\`\`
while (x > 1) { record spf[x]; x /= spf[x]; }
\`\`\`

### CP uses

- Massive precomputation of prime factors
- Multiplicative-function sieves (totient, mobius, sigma) — you can compute \`phi[i]\` alongside the sieve in O(N).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Linear sieve. Returns (primes, spf) where spf[x] = smallest prime factor of x.
pair<vector<int>, vector<int>> linearSieve(int N) {
    vector<int> spf(N + 1, 0), primes;
    for (int i = 2; i <= N; i++) {
        if (spf[i] == 0) {            // i is prime
            spf[i] = i;
            primes.push_back(i);
        }
        for (int p : primes) {
            if ((long long)i * p > N) break;
            spf[i * p] = p;
            if (i % p == 0) break;    // ensures O(N) total work
        }
    }
    return {primes, spf};
}

// Factor x using spf in O(log x).
vector<pair<int,int>> factor(int x, const vector<int> &spf) {
    vector<pair<int,int>> f;
    while (x > 1) {
        int p = spf[x], e = 0;
        while (x % p == 0) { x /= p; e++; }
        f.push_back({p, e});
    }
    return f;
}

int main() {
    auto [primes, spf] = linearSieve(50);
    for (auto [p, e] : factor(84, spf)) cout << p << "^" << e << ' ';
    // 2^2 3^1 7^1
}
\`\`\`
`,
  ),
  "binary-exponentiation": A(
    "binary-exponentiation",
    "Binary Exponentiation",
    "Math for Competitive Programming",
    "cp-math",
    "Binary Exponentiation — theory and C++17 implementation.",
    4,
    `
# Binary Exponentiation

## Theory

**Binary exponentiation** (a.k.a. fast exponentiation, exponentiation by squaring) computes \`a^n\` in **O(log n)** multiplications, instead of the naive O(n).

### Idea

Write \`n\` in binary. Then

\`a^n = product over set bits i of a^(2^i)\`

We iterate through the bits of \`n\`, keeping a running "current square" that doubles each step (\`a, a^2, a^4, a^8, ...\`). Whenever the current bit of \`n\` is 1, we multiply it into the result.

### Modular version

Everything works modulo \`m\`, keeping numbers small. Use \`__int128\` (or \`mulmod\`) when \`m\` fits in 64 bits but \`m * m\` would overflow.

### Generalization

The same "log-n combine" trick works for any associative operation:

- Multiplying matrices — \`O(k^3 log n)\` recurrences
- Composing permutations
- Applying a linear recurrence
- Repeated function composition

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Compute (a^e) mod m using binary exponentiation.
long long powmod(long long a, long long e, long long m) {
    long long result = 1 % m;
    a %= m;
    if (a < 0) a += m;
    while (e > 0) {
        if (e & 1) result = result * a % m;
        a = a * a % m;
        e >>= 1;
    }
    return result;
}

// Non-modular version — beware of overflow for large exponents.
long long power(long long a, long long e) {
    long long r = 1;
    while (e > 0) {
        if (e & 1) r *= a;
        a *= a;
        e >>= 1;
    }
    return r;
}

int main() {
    cout << powmod(2, 62, 1000000007) << "\\n";   // 2^62 mod (10^9+7)
    cout << power(3, 10) << "\\n";                 // 59049
}
\`\`\`
`,
  ),
  "modular-arithmetic": A(
    "modular-arithmetic",
    "Modular Arithmetic",
    "Math for Competitive Programming",
    "cp-math",
    "Modular Arithmetic — theory and C++17 implementation.",
    4,
    `
# Modular Arithmetic

## Theory

**Modular arithmetic** works with remainders modulo some positive integer \`m\`. Two integers \`a, b\` are **congruent** modulo \`m\`, written \`a ≡ b (mod m)\`, if \`m | (a - b)\`.

### Rules that preserve congruence

- \`(a + b) mod m = ((a mod m) + (b mod m)) mod m\`
- \`(a - b) mod m = ((a mod m) - (b mod m) + m) mod m\`  ← add m to keep result non-negative
- \`(a * b) mod m = ((a mod m) * (b mod m)) mod m\`
- Division is **not** direct; use modular inverse (only exists when \`gcd(a, m) = 1\`).

### Common prime moduli

\`10^9 + 7\`, \`10^9 + 9\`, \`998244353\` are all prime — they play well with Fermat's little theorem for inverses and with NTT.

### Overflow

For \`m\` up to \`~ 3 * 10^9\`, \`long long * long long\` overflows. Use \`__int128\` or a custom \`mulmod\`.

### Negative numbers

Always normalize: \`((x % m) + m) % m\`.

### CP idioms

- Store counts / DP values modulo \`10^9 + 7\`
- Precompute factorials + inverse factorials for \`nCr\`
- Combine with matrix exponentiation for fast recurrences

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using u128 = __int128;

const long long MOD = 1'000'000'007LL;

long long addm(long long a, long long b, long long m = MOD) {
    return (a + b) % m;
}
long long subm(long long a, long long b, long long m = MOD) {
    return (a - b % m + m) % m;
}
long long mulm(long long a, long long b, long long m = MOD) {
    return (long long)((u128)a * b % m);
}
long long powm(long long a, long long e, long long m = MOD) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = mulm(r, a, m); a = mulm(a, a, m); e >>= 1; }
    return r;
}

int main() {
    cout << addm(999999999LL, 999999999LL) << "\\n";   // works modulo 1e9+7
    cout << mulm(123456789LL, 987654321LL) << "\\n";
    cout << powm(2, 1000000, MOD) << "\\n";
}
\`\`\`
`,
  ),
  "modular-inverse": A(
    "modular-inverse",
    "Modular Inverse",
    "Math for Competitive Programming",
    "cp-math",
    "Modular Inverse — theory and C++17 implementation.",
    4,
    `
# Modular Inverse

## Theory

The **modular inverse** of \`a\` modulo \`m\` is an integer \`x\` such that

\`a * x ≡ 1 (mod m)\`.

It exists **iff** \`gcd(a, m) = 1\`. It lets us "divide by \`a\`" in modular arithmetic.

### Two ways to compute it

1. **Fermat's little theorem** — when \`m\` is prime and \`a\` is not a multiple of \`m\`:
   \`a^(m-2) ≡ a^(-1) (mod m)\`. Compute with binary exponentiation in \`O(log m)\`.

2. **Extended Euclidean algorithm** — works whenever \`gcd(a, m) = 1\`, even for composite \`m\`. Find \`x, y\` with \`a*x + m*y = 1\`; then \`x mod m\` is the inverse.

### Precomputing many inverses

To get inverses of \`1..n\` mod prime \`p\` in **O(n)** total, use the recurrence:

\`inv[1] = 1\`
\`inv[i] = (p - (p / i) * inv[p % i] % p) % p\`

### Uses

- Dividing in \`nCr mod p\`
- Rational-number DP over prime modulus
- CRT reconstruction

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// Fermat inverse — MOD must be prime, a not a multiple of MOD.
long long invFermat(long long a, long long m = MOD) {
    return powmod(a, m - 2, m);
}

// Extended Euclidean — general case.
long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extGcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}
long long invExt(long long a, long long m) {
    long long x, y;
    long long g = extGcd(a, m, x, y);
    if (g != 1) return -1; // no inverse
    return (x % m + m) % m;
}

// Linear-time table of inverses mod prime p.
vector<long long> inversesUpTo(int n, long long p = MOD) {
    vector<long long> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) inv[i] = (p - (p / i) * inv[p % i] % p) % p;
    return inv;
}

int main() {
    cout << invFermat(2) << "\\n";        // 500000004
    cout << invExt(3, 11) << "\\n";       // 4 (since 3*4 = 12 = 1 mod 11)
}
\`\`\`
`,
  ),
  "fermats-little-theorem": A(
    "fermats-little-theorem",
    "Fermat's Little Theorem",
    "Math for Competitive Programming",
    "cp-math",
    "Fermat's Little Theorem — theory and C++17 implementation.",
    4,
    `
# Fermat's Little Theorem

## Theory

**Fermat's little theorem (FLT).** If \`p\` is prime and \`a\` is any integer, then

\`a^p ≡ a (mod p)\`.

If additionally \`gcd(a, p) = 1\`, then

\`a^(p - 1) ≡ 1 (mod p)\`, equivalently \`a^(p - 2) ≡ a^(-1) (mod p)\`.

### Consequences in CP

- **Modular inverse** modulo a prime: \`inv(a) = pow(a, p - 2, p)\`.
- **Reducing exponents modulo p - 1** when the base is coprime with \`p\`: \`a^e ≡ a^(e mod (p-1)) (mod p)\`.
- **Fermat primality test** — probabilistic, but composite Carmichael numbers can fool it. In practice we use Miller-Rabin (a stronger variant).

### Why it is true (sketch)

Multiplying the residues \`{1, 2, ..., p - 1}\` by \`a\` just permutes them modulo \`p\`. Taking the product on both sides and canceling \`(p - 1)!\` gives \`a^(p-1) ≡ 1 (mod p)\`.

### Generalization

Euler's theorem: for general \`m\`, \`a^phi(m) ≡ 1 (mod m)\` when \`gcd(a, m) = 1\`. FLT is the special case \`m = p\` prime with \`phi(p) = p - 1\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// Modular inverse via Fermat — requires MOD prime and a % MOD != 0.
long long modInverse(long long a, long long p = MOD) {
    return powmod(a, p - 2, p);
}

// Reduce a huge exponent using a^(p-1) = 1 (mod p) for coprime a.
long long powBig(long long a, long long e, long long p = MOD) {
    return powmod(a, e % (p - 1), p);
}

int main() {
    cout << modInverse(7) << "\\n";                    // 7^(p-2) mod p
    cout << (7LL * modInverse(7) % MOD) << "\\n";      // 1
    cout << powBig(2, (long long)1e18, MOD) << "\\n";  // fast
}
\`\`\`
`,
  ),
  "euler-totient": A(
    "euler-totient",
    "Euler Totient Function",
    "Math for Competitive Programming",
    "cp-math",
    "Euler Totient Function — theory and C++17 implementation.",
    4,
    `
# Euler Totient Function

## Theory

**Euler's totient function** \`phi(n)\` counts the positive integers \`k <= n\` with \`gcd(k, n) = 1\`.

### Formula from prime factorization

If \`n = p1^a1 * ... * pk^ak\`, then

\`phi(n) = n * product over i of (1 - 1/p_i)\`.

Examples: \`phi(1) = 1\`, \`phi(p) = p - 1\` for prime \`p\`, \`phi(p^k) = p^k - p^(k-1)\`, \`phi(m*n) = phi(m) * phi(n)\` when \`gcd(m, n) = 1\` (multiplicative).

### Euler's theorem

For any \`a\` coprime with \`n\`: \`a^phi(n) ≡ 1 (mod n)\`. This gives modular inverses for composite moduli: \`a^(-1) ≡ a^(phi(n) - 1) (mod n)\`.

### Computing phi

- **Single value**: factor \`n\` (O(sqrt(n))), then apply the product formula.
- **Table up to N**: modify the sieve. Initialize \`phi[i] = i\`; for each prime \`p\`, for each multiple \`m\` of \`p\`, do \`phi[m] -= phi[m] / p\`. Runs in **O(N log log N)**.

### CP uses

- Modular exponents modulo composite \`n\`
- Counting coprime pairs
- Mobius / Dirichlet identities

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Single-value Euler's totient — O(sqrt(n)).
long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

// Totient table up to N — O(N log log N).
vector<int> totientTable(int N) {
    vector<int> phi(N + 1);
    iota(phi.begin(), phi.end(), 0);        // phi[i] = i initially
    for (int i = 2; i <= N; i++) {
        if (phi[i] == i) {                  // i is prime
            for (int j = i; j <= N; j += i) phi[j] -= phi[j] / i;
        }
    }
    return phi;
}

int main() {
    cout << phi(36) << "\\n";                            // 12
    auto t = totientTable(20);
    for (int i = 1; i <= 20; i++) cout << t[i] << ' ';
}
\`\`\`
`,
  ),
  "extended-euclidean": A(
    "extended-euclidean",
    "Extended Euclidean Algorithm",
    "Math for Competitive Programming",
    "cp-math",
    "Extended Euclidean Algorithm — theory and C++17 implementation.",
    4,
    `
# Extended Euclidean Algorithm

## Theory

The **Extended Euclidean Algorithm (EEA)** computes not only \`g = gcd(a, b)\` but also integers \`x, y\` such that

\`a * x + b * y = g\`  (Bezout's identity).

### Derivation

Base case: \`gcd(a, 0) = a\`, with \`x = 1\`, \`y = 0\`.
Recursive step: \`gcd(a, b) = gcd(b, a mod b)\`. If \`b * x1 + (a mod b) * y1 = g\`, then, since \`a mod b = a - (a / b) * b\`,

\`b * x1 + (a - (a/b) * b) * y1 = g\`
\`a * y1 + b * (x1 - (a/b) * y1) = g\`

so \`x = y1\`, \`y = x1 - (a/b) * y1\`.

### Solving \`a*x ≡ c (mod m)\`

A solution exists iff \`gcd(a, m) | c\`. Use EEA on \`(a, m)\` to get \`a*x0 + m*y0 = g\`; then \`x = x0 * (c / g)\` mod \`m/g\`.

### Modular inverse for composite modulus

\`inv(a) mod m\` exists iff \`gcd(a, m) = 1\`; then \`x\` from EEA is the inverse (normalize to \`[0, m)\`).

### Chinese Remainder Theorem

EEA is the workhorse that combines two congruences into one.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Extended Euclidean — returns gcd(a, b) and sets x, y with a*x + b*y = gcd.
long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extGcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// Modular inverse for any modulus m (requires gcd(a, m) == 1).
long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extGcd((a % m + m) % m, m, x, y);
    if (g != 1) return -1;             // no inverse
    return (x % m + m) % m;
}

// Solve a*x = c (mod m). Returns true on success and one solution in x.
bool solveLinear(long long a, long long c, long long m, long long &x) {
    long long x0, y0;
    long long g = extGcd(a, m, x0, y0);
    if (c % g != 0) return false;
    long long M = m / g;
    x = ((x0 * (c / g)) % M + M) % M;  // smallest non-negative solution
    return true;
}

int main() {
    cout << modInverse(3, 11) << "\\n";       // 4
    long long x;
    if (solveLinear(14, 30, 100, x)) cout << x << "\\n"; // e.g. 45
}
\`\`\`
`,
  ),
  "chinese-remainder-theorem": A(
    "chinese-remainder-theorem",
    "Chinese Remainder Theorem",
    "Math for Competitive Programming",
    "cp-math",
    "Chinese Remainder Theorem — theory and C++17 implementation.",
    4,
    `
# Chinese Remainder Theorem

## Theory

The **Chinese Remainder Theorem (CRT)** solves a system of congruences

\`x ≡ r1 (mod m1)\`
\`x ≡ r2 (mod m2)\`
\`...\`
\`x ≡ rk (mod mk)\`

**Classical CRT.** If \`m1, m2, ..., mk\` are **pairwise coprime**, there is a unique solution modulo \`M = m1 * m2 * ... * mk\`.

**Generalized CRT.** If some \`mi, mj\` share factors, a solution exists iff for every pair \`ri ≡ rj (mod gcd(mi, mj))\`. The combined solution is unique modulo \`lcm(m1, ..., mk)\`.

### Merging two congruences

Given \`x ≡ r1 (mod m1)\` and \`x ≡ r2 (mod m2)\`:

- Let \`g = gcd(m1, m2)\`. If \`(r2 - r1) mod g != 0\`, no solution.
- Use extended Euclidean to find \`p, q\` with \`m1*p + m2*q = g\`.
- Then \`x = r1 + m1 * p * (r2 - r1) / g\` modulo \`lcm(m1, m2)\`.

Merge congruences pairwise to combine \`k\` of them.

### Uses in CP

- Recovering big answers from several small prime moduli (hashing, avoiding overflow)
- Number theory tasks with mixed moduli
- Combining sub-problem answers under different constraints

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
using i128 = __int128;

long long extGcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1; y = 0; return a; }
    long long x1, y1, g = extGcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1;
    return g;
}

// Merge x = r1 (mod m1) and x = r2 (mod m2).
// Returns {true, (r, m)} where r is the merged remainder modulo m = lcm(m1, m2).
pair<bool, pair<long long, long long>>
crt2(long long r1, long long m1, long long r2, long long m2) {
    long long p, q;
    long long g = extGcd(m1, m2, p, q);
    long long diff = r2 - r1;
    if (diff % g != 0) return {false, {0, 0}};
    long long lcm = m1 / g * m2;
    i128 mult = (i128)(diff / g) * p % (m2 / g);
    long long r = (long long)(((i128)r1 + (i128)m1 * mult) % lcm);
    if (r < 0) r += lcm;
    return {true, {r, lcm}};
}

// Merge k congruences.
pair<bool, pair<long long, long long>>
crt(const vector<long long> &r, const vector<long long> &m) {
    long long R = 0, M = 1;
    for (size_t i = 0; i < r.size(); i++) {
        auto res = crt2(R, M, r[i], m[i]);
        if (!res.first) return {false, {0, 0}};
        R = res.second.first; M = res.second.second;
    }
    return {true, {R, M}};
}

int main() {
    // x = 2 (mod 3), x = 3 (mod 5), x = 2 (mod 7) -> x = 23 (mod 105)
    auto res = crt({2, 3, 2}, {3, 5, 7});
    cout << res.second.first << " (mod " << res.second.second << ")\\n";
}
\`\`\`
`,
  ),
  "inclusion-exclusion": A(
    "inclusion-exclusion",
    "Inclusion-Exclusion Principle",
    "Math for Competitive Programming",
    "cp-math",
    "Inclusion-Exclusion Principle — theory and C++17 implementation.",
    4,
    `
# Inclusion-Exclusion Principle

## Theory

The **Inclusion-Exclusion Principle (IEP)** counts the size of a union by alternately adding and subtracting intersection sizes.

### Two-set form

\`|A ∪ B| = |A| + |B| - |A ∩ B|\`

### Three-set form

\`|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|\`

### General form

\`|A_1 ∪ ... ∪ A_n| = sum over non-empty S ⊆ {1..n} of (-1)^(|S|+1) * |intersection over i in S of A_i|\`

### Complement form (more common in CP)

Count elements in **none** of the sets:

\`|U| - |A_1 ∪ ... ∪ A_n| = sum over S ⊆ {1..n} of (-1)^|S| * |intersection of A_i for i in S|\`

### Classic applications

- **Count integers in [1, N] coprime with a set of primes** — subtract multiples, add pairwise intersections, etc.
- **Derangements** \`!n\` (permutations with no fixed point) — closed form using IEP.
- **Surjections** from an n-set to a k-set: \`sum_{i=0..k} (-1)^i * C(k, i) * (k-i)^n\`.

Iterating over subsets makes IEP an **O(2^n)** algorithm — works when \`n <= ~20\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Count integers in [1, N] divisible by at least one of the given (pairwise
// coprime enough for the LCM to fit) numbers, via inclusion-exclusion.
long long countDivisibleByAny(long long N, const vector<long long> &nums) {
    int n = nums.size();
    long long total = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        long long lcm = 1;
        bool overflow = false;
        for (int i = 0; i < n; i++) if (mask >> i & 1) {
            long long g = __gcd(lcm, nums[i]);
            long long step = nums[i] / g;
            if (lcm > N / step) { overflow = true; break; }
            lcm *= step;
        }
        if (overflow) continue;
        long long cnt = N / lcm;
        int bits = __builtin_popcount(mask);
        total += (bits % 2 ? +cnt : -cnt);
    }
    return total;
}

// Number of derangements of size n via IEP: !n = sum_{k=0..n} (-1)^k * n!/k!
long long derangements(int n) {
    vector<long long> f(n + 1, 1);
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i;
    long long r = 0;
    for (int k = 0; k <= n; k++) r += (k % 2 ? -1 : 1) * (f[n] / f[k]);
    return r;
}

int main() {
    cout << countDivisibleByAny(30, {2, 3, 5}) << "\\n";  // 22
    cout << derangements(5) << "\\n";                     // 44
}
\`\`\`
`,
  ),
  "combinatorics": A(
    "combinatorics",
    "Combinatorics",
    "Math for Competitive Programming",
    "cp-math",
    "Combinatorics — theory and C++17 implementation.",
    4,
    `
# Combinatorics

## Theory

**Combinatorics** studies counting, arrangement, and selection of objects. Almost every counting-heavy CP problem reduces to a small vocabulary of formulas.

### Fundamental principles

- **Rule of sum** — disjoint choices add: \`|A| + |B|\`.
- **Rule of product** — independent choices multiply: \`|A| * |B|\`.
- **Bijection principle** — count set A by mapping it 1-1 to a set B that is easier to count.

### Core counts

- **Permutations of \`n\`**: \`n!\`
- **k-permutations of \`n\`** (order matters, no repetition): \`P(n, k) = n! / (n-k)!\`
- **Combinations** (order does not matter): \`C(n, k) = n! / (k! (n-k)!)\`
- **With repetition** — combinations with repetition: \`C(n + k - 1, k)\`
- **Stars and bars** — number of non-negative integer solutions of \`x1 + ... + xk = n\` is \`C(n + k - 1, k - 1)\`.
- **Multinomial coefficient**: \`n! / (a1! a2! ... am!)\` with \`a1 + ... + am = n\`.

### Sequences everyone should recognize

- **Factorials**: 1, 1, 2, 6, 24, 120, ...
- **Binomial coefficients** — Pascal's triangle
- **Catalan numbers** — \`C_n = C(2n, n) / (n + 1)\`
- **Bell / Stirling numbers** — set partitions

### Modular counting

Precompute \`fact[0..N]\` and \`invFact[0..N]\` modulo a prime once; then any \`nCk\` costs O(1).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

struct Combo {
    vector<long long> f, invf;
    Combo(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
        invf[n] = powmod(f[n], MOD - 2, MOD);
        for (int i = n; i > 0; i--) invf[i - 1] = invf[i] * i % MOD;
    }
    long long C(int n, int k) const {
        if (k < 0 || k > n) return 0;
        return f[n] * invf[k] % MOD * invf[n - k] % MOD;
    }
    long long P(int n, int k) const {
        if (k < 0 || k > n) return 0;
        return f[n] * invf[n - k] % MOD;
    }
    // Stars and bars: non-negative solutions of x1+...+xk = n.
    long long stars(int n, int k) const { return C(n + k - 1, k - 1); }
};

int main() {
    Combo c(1'000'000);
    cout << c.C(10, 3) << "\\n";     // 120
    cout << c.P(10, 3) << "\\n";     // 720
    cout << c.stars(5, 3) << "\\n";  // C(7,2) = 21
}
\`\`\`
`,
  ),
  "factorials": A(
    "factorials",
    "Factorials",
    "Math for Competitive Programming",
    "cp-math",
    "Factorials — theory and C++17 implementation.",
    4,
    `
# Factorials

## Theory

The **factorial** \`n!\` is the product \`1 * 2 * ... * n\`, with \`0! = 1\` by convention.

### Growth

\`n!\` grows faster than any exponential. Rough sizes: \`10! ≈ 3.6 * 10^6\`, \`20! ≈ 2.4 * 10^18\` (still fits in \`unsigned long long\`), \`25!\` already needs a big integer.

### Stirling's approximation

\`n! ~ sqrt(2 * pi * n) * (n / e)^n\`. Useful for asymptotic analysis.

### Modular factorials

For a prime modulus \`p\`, precompute:

- \`fact[i] = i! mod p\` for \`i = 0..N\`
- \`invFact[N] = pow(fact[N], p - 2, p)\`, then \`invFact[i - 1] = invFact[i] * i mod p\`

This lets you answer \`n! mod p\`, \`1/n! mod p\`, and hence \`nCr mod p\` in O(1) after \`O(N)\` preprocessing.

### Wilson's theorem

\`(p - 1)! ≡ -1 (mod p)\` iff \`p\` is prime — a rarely-used but neat characterization.

### Legendre's formula

The exponent of a prime \`p\` in \`n!\` is \`sum_{i>=1} floor(n / p^i)\`. Answers questions like "how many trailing zeros does \`n!\` have in base 10?" (count of 5's).

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Precomputed factorial and inverse-factorial tables mod prime MOD.
struct FactTable {
    vector<long long> f, invf;
    FactTable(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
        auto pw = [](long long a, long long e) {
            long long r = 1;
            while (e) { if (e & 1) r = r * a % MOD; a = a * a % MOD; e >>= 1; }
            return r;
        };
        invf[n] = pw(f[n], MOD - 2);
        for (int i = n; i > 0; i--) invf[i - 1] = invf[i] * i % MOD;
    }
};

// Legendre's formula: exponent of prime p in n!.
long long expInFactorial(long long n, long long p) {
    long long e = 0;
    for (long long q = p; q <= n; q *= p) {
        e += n / q;
        if (q > n / p) break;   // avoid overflow
    }
    return e;
}

int main() {
    FactTable ft(1'000'000);
    cout << ft.f[10] << "\\n";                   // 3628800
    cout << expInFactorial(25, 5) << "\\n";      // 6 (25! has 6 trailing zeros)
}
\`\`\`
`,
  ),
  "permutations": A(
    "permutations",
    "Permutations",
    "Math for Competitive Programming",
    "cp-math",
    "Permutations — theory and C++17 implementation.",
    4,
    `
# Permutations

## Theory

A **permutation** is an ordered arrangement of a set of objects.

### Counting

- Permutations of \`n\` distinct items: \`n!\`
- k-permutations of \`n\`: \`P(n, k) = n! / (n - k)!\` — pick \`k\` items and order them.
- With repetition allowed, choosing \`k\` out of \`n\` types with order: \`n^k\`.
- Permutations of a multiset with counts \`a1, a2, ...\`: \`n! / (a1! a2! ... )\`.

### Generating permutations

- **\`std::next_permutation\`** — walks lexicographically in \`O(n)\` per step. Great for brute-force over small \`n\`.
- **Heap's algorithm** — generates all \`n!\` permutations with a single swap per step; useful when you must visit each.

### Cycle decomposition

Every permutation of \`{1..n}\` decomposes into disjoint **cycles**. The order (as a group element) is the LCM of cycle lengths — useful for problems that ask "after how many applications does everything return to its start?"

### Random permutation

**Fisher-Yates shuffle** produces a uniformly random permutation in \`O(n)\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Enumerate all permutations of a vector using next_permutation.
void printAllPermutations(vector<int> v) {
    sort(v.begin(), v.end());
    do {
        for (int x : v) cout << x << ' ';
        cout << '\\n';
    } while (next_permutation(v.begin(), v.end()));
}

// Fisher-Yates shuffle — uniform random permutation.
void shuffle(vector<int> &v) {
    static mt19937 rng((uint32_t)chrono::steady_clock::now().time_since_epoch().count());
    for (int i = (int)v.size() - 1; i > 0; i--) {
        int j = uniform_int_distribution<int>(0, i)(rng);
        swap(v[i], v[j]);
    }
}

// Order of a permutation = LCM of cycle lengths.
long long permutationOrder(const vector<int> &p) {
    int n = p.size();
    vector<char> seen(n, false);
    long long order = 1;
    for (int i = 0; i < n; i++) if (!seen[i]) {
        int len = 0, j = i;
        while (!seen[j]) { seen[j] = true; j = p[j]; len++; }
        order = order / __gcd(order, (long long)len) * len;
    }
    return order;
}

int main() {
    printAllPermutations({1, 2, 3});
    cout << permutationOrder({1, 2, 0, 4, 3}) << "\\n"; // lcm(3,2)=6
}
\`\`\`
`,
  ),
  "combinations": A(
    "combinations",
    "Combinations",
    "Math for Competitive Programming",
    "cp-math",
    "Combinations — theory and C++17 implementation.",
    4,
    `
# Combinations

## Theory

A **combination** is a **selection** of items without regard to order.

### Formula

\`C(n, k) = n! / (k! (n - k)!)\` (also written \`nCk\` or \`binomial(n, k)\`).

### Symmetry & identities

- \`C(n, k) = C(n, n - k)\`
- \`C(n, 0) = C(n, n) = 1\`
- Pascal's identity: \`C(n, k) = C(n - 1, k - 1) + C(n - 1, k)\`
- Vandermonde's identity: \`sum_{i} C(m, i) * C(n, k - i) = C(m + n, k)\`
- Sum along a row: \`sum_{k=0..n} C(n, k) = 2^n\`

### Combinations with repetition

Choosing \`k\` items from \`n\` types, repetition allowed, order irrelevant: \`C(n + k - 1, k)\`.

### Computation strategies

- **Small \`n\`, \`k\`**: Pascal DP \`O(n^2)\` fills a triangle.
- **Modular, up to 10^6**: precompute factorials + inverse factorials for O(1) queries.
- **Very large \`n\`, small \`k\`**: \`C(n, k) = n * (n-1) * ... * (n-k+1) / k!\` — do it with big ints or with a modular inverse when needed.
- **Very large \`n, k\`, prime modulus**: **Lucas' theorem**.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Pascal DP (small n).
vector<vector<long long>> pascal(int n) {
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
    return C;
}

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// Big-n C(n, k) modulo prime — O(k).
long long binomLargeN(long long n, long long k) {
    if (k < 0 || k > n) return 0;
    if (k > n - k) k = n - k;
    long long num = 1, den = 1;
    for (long long i = 0; i < k; i++) {
        num = num * ((n - i) % MOD) % MOD;
        den = den * ((i + 1) % MOD) % MOD;
    }
    return num * powmod(den, MOD - 2, MOD) % MOD;
}

int main() {
    auto C = pascal(10);
    cout << C[10][3] << "\\n";                          // 120
    cout << binomLargeN(1'000'000'000LL, 5) << "\\n";
}
\`\`\`
`,
  ),
  "binomial-coefficients": A(
    "binomial-coefficients",
    "Binomial Coefficients (nCr)",
    "Math for Competitive Programming",
    "cp-math",
    "Binomial Coefficients (nCr) — theory and C++17 implementation.",
    4,
    `
# Binomial Coefficients (nCr)

## Theory

**Binomial coefficients** \`C(n, r)\` (also \`nCr\`) count the number of \`r\`-subsets of an \`n\`-set. They are the coefficients in the expansion

\`(x + y)^n = sum_{k=0..n} C(n, k) * x^(n-k) * y^k\`.

### Fundamental identities

- \`C(n, r) = C(n, n - r)\`
- Pascal: \`C(n, r) = C(n - 1, r - 1) + C(n - 1, r)\`
- Hockey stick: \`sum_{i=r..n} C(i, r) = C(n + 1, r + 1)\`
- \`sum_{k} C(n, k) = 2^n\`
- \`sum_{k} (-1)^k C(n, k) = 0\` for \`n >= 1\`

### Computing \`nCr mod p\` (p prime, n <= 10^6)

Precompute factorials + inverse factorials, then

\`C(n, r) = fact[n] * invFact[r] * invFact[n - r] mod p\`

Each query is O(1).

### Lucas' theorem (huge \`n\`, small prime \`p\`)

Write \`n\` and \`r\` in base \`p\`. Then

\`C(n, r) mod p = product over digits i of C(n_i, r_i) mod p\`

using Pascal for the small digit-level coefficients.

### Overflow-free tricks

Compute \`C(n, r)\` iteratively: \`C(n, r) = C(n, r - 1) * (n - r + 1) / r\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

struct Binom {
    vector<long long> f, invf;
    Binom(int n) : f(n + 1), invf(n + 1) {
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i-1] * i % MOD;
        invf[n] = powmod(f[n], MOD - 2, MOD);
        for (int i = n; i > 0; i--) invf[i-1] = invf[i] * i % MOD;
    }
    long long C(int n, int r) const {
        if (r < 0 || r > n) return 0;
        return f[n] * invf[r] % MOD * invf[n - r] % MOD;
    }
};

// Lucas' theorem for prime p (small).
long long lucas(long long n, long long r, long long p) {
    if (r == 0) return 1;
    long long ni = n % p, ri = r % p;
    if (ri > ni) return 0;
    // small nCr mod p via factorials on-the-fly
    long long num = 1, den = 1;
    for (long long i = 0; i < ri; i++) {
        num = num * ((ni - i) % p) % p;
        den = den * ((i + 1) % p) % p;
    }
    long long small = num * powmod(den, p - 2, p) % p;
    return small * lucas(n / p, r / p, p) % p;
}

int main() {
    Binom b(1'000'000);
    cout << b.C(20, 10) << "\\n";                    // 184756
    cout << lucas(1'000'000'000LL, 12345LL, 13) << "\\n";
}
\`\`\`
`,
  ),
  "pascal-triangle": A(
    "pascal-triangle",
    "Pascal Triangle",
    "Math for Competitive Programming",
    "cp-math",
    "Pascal Triangle — theory and C++17 implementation.",
    4,
    `
# Pascal Triangle

## Theory

**Pascal's triangle** is the triangular array where entry \`(n, k)\` (0-indexed) equals \`C(n, k)\`. Row \`n\` has \`n + 1\` entries and sums to \`2^n\`.

\`\`\`
Row 0:            1
Row 1:          1   1
Row 2:        1   2   1
Row 3:      1   3   3   1
Row 4:    1   4   6   4   1
Row 5:  1   5  10  10   5   1
\`\`\`

### Pascal's rule

\`C(n, k) = C(n - 1, k - 1) + C(n - 1, k)\`

Directly gives a bottom-up DP in \`O(n^2)\` time and \`O(n^2)\` (or \`O(n)\` with rolling) space. Perfect for \`n <= 5000\`.

### Cool patterns

- **Row sum** = \`2^n\`
- **Alternating row sum** = 0 for \`n >= 1\`
- **Fibonacci** = sum of shallow diagonals
- **Sierpinski triangle** — highlight odd entries; you get the fractal
- **Hockey stick**: \`sum_{i=r..n} C(i, r) = C(n+1, r+1)\`

### When to use Pascal vs. factorial method

Pascal is faster and simpler when \`n <= ~5000\`. Beyond that, factorial + inverse factorial precomputation (see nCr) is the way.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Full Pascal's triangle up to row n — O(n^2).
vector<vector<long long>> pascal(int n) {
    vector<vector<long long>> T(n + 1);
    for (int i = 0; i <= n; i++) {
        T[i].assign(i + 1, 1);
        for (int j = 1; j < i; j++) T[i][j] = (T[i-1][j-1] + T[i-1][j]) % MOD;
    }
    return T;
}

// One row at a time — O(n) space if you only need the current row.
vector<long long> pascalRow(int n) {
    vector<long long> row(n + 1, 0);
    row[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = i; j > 0; j--) row[j] = (row[j] + row[j-1]) % MOD;
    return row;
}

int main() {
    auto T = pascal(6);
    for (auto &r : T) { for (auto x : r) cout << x << ' '; cout << '\\n'; }
    auto r = pascalRow(10);
    for (auto x : r) cout << x << ' ';   // 1 10 45 120 210 252 210 120 45 10 1
}
\`\`\`
`,
  ),
  "catalan-numbers": A(
    "catalan-numbers",
    "Catalan Numbers",
    "Math for Competitive Programming",
    "cp-math",
    "Catalan Numbers — theory and C++17 implementation.",
    4,
    `
# Catalan Numbers

## Theory

The **Catalan numbers** \`C_n\` are one of the most reused sequences in combinatorics:

\`1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, ...\`

### Formulas

- Closed form: \`C_n = C(2n, n) / (n + 1)\`
- Equivalent: \`C_n = C(2n, n) - C(2n, n + 1)\`
- Recurrence: \`C_{n+1} = sum_{i=0..n} C_i * C_{n-i}\`, with \`C_0 = 1\`
- Ratio: \`C_{n+1} = C_n * 2*(2n + 1) / (n + 2)\`

### Things Catalan numbers count

- Number of **balanced parentheses** with \`n\` pairs
- Number of **binary search trees** with \`n\` distinct keys
- Number of full binary trees with \`n + 1\` leaves
- **Monotonic lattice paths** from \`(0,0)\` to \`(n,n)\` that never rise above the diagonal
- Number of ways to **triangulate** a convex \`(n + 2)\`-gon
- Number of **Dyck words** of length \`2n\`

### Modular computation

Use \`C_n = C(2n, n) * inv(n + 1) mod p\`, with the standard factorial + inverse-factorial precomputation.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}

// DP via convolution recurrence — O(n^2).
vector<long long> catalanDP(int n) {
    vector<long long> C(n + 1, 0);
    C[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            C[i] = (C[i] + C[j] * C[i - 1 - j]) % MOD;
    return C;
}

// Closed form using factorials — O(n) preprocessing, O(1) per query.
struct CatalanFast {
    vector<long long> f, invf;
    CatalanFast(int n) : f(2 * n + 1), invf(2 * n + 1) {
        f[0] = 1;
        for (int i = 1; i <= 2 * n; i++) f[i] = f[i-1] * i % MOD;
        invf[2*n] = powmod(f[2*n], MOD - 2, MOD);
        for (int i = 2*n; i > 0; i--) invf[i-1] = invf[i] * i % MOD;
    }
    long long C(int n) const {
        long long binom = f[2*n] * invf[n] % MOD * invf[n] % MOD;
        return binom * powmod(n + 1, MOD - 2, MOD) % MOD;
    }
};

int main() {
    for (long long x : catalanDP(9)) cout << x << ' ';
    // 1 1 2 5 14 42 132 429 1430 4862
    cout << "\\n" << CatalanFast(100).C(10) << "\\n";  // 16796
}
\`\`\`
`,
  ),
  "matrix-exponentiation": A(
    "matrix-exponentiation",
    "Matrix Exponentiation",
    "Math for Competitive Programming",
    "cp-math",
    "Matrix Exponentiation — theory and C++17 implementation.",
    4,
    `
# Matrix Exponentiation

## Theory

**Matrix exponentiation** raises a \`k x k\` matrix to a large power \`n\` in **O(k^3 log n)** time using binary exponentiation.

### Why it matters

Linear recurrences of order \`k\` — \`f(n) = c1 * f(n-1) + c2 * f(n-2) + ... + ck * f(n-k)\` — can be expressed as \`v_n = M * v_{n-1}\` for a fixed \`k x k\` matrix \`M\`. Then \`v_n = M^n * v_0\`, computable in \`O(k^3 log n)\`.

### Steps

1. Write the recurrence as a state vector \`v\`.
2. Build the **transition matrix** \`M\` so that \`v_{i+1} = M * v_i\`.
3. Use binary exponentiation on matrices (identity matrix as the base case).
4. Multiply \`M^n\` by the initial vector \`v_0\`.

### Applications

- Fibonacci and general linear recurrences modulo a prime for \`n\` up to \`10^18\`.
- Counting paths of length exactly \`n\` in a graph (adjacency matrix \`A\`, answer is \`A^n\`).
- Counting strings avoiding certain patterns (via a DFA transition matrix).

### Watch out

- Multiplication is **not commutative** — order of factors matters.
- Always reduce modulo after every multiplication to avoid overflow.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

using Matrix = vector<vector<long long>>;

Matrix multiply(const Matrix &A, const Matrix &B) {
    int n = A.size(), m = B[0].size(), k = B.size();
    Matrix C(n, vector<long long>(m, 0));
    for (int i = 0; i < n; i++)
        for (int p = 0; p < k; p++) if (A[i][p])
            for (int j = 0; j < m; j++)
                C[i][j] = (C[i][j] + A[i][p] * B[p][j]) % MOD;
    return C;
}

Matrix identity(int n) {
    Matrix I(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) I[i][i] = 1;
    return I;
}

Matrix matpow(Matrix A, long long e) {
    Matrix R = identity(A.size());
    while (e) { if (e & 1) R = multiply(R, A); A = multiply(A, A); e >>= 1; }
    return R;
}

int main() {
    // Example: count length-n walks between nodes in a small graph.
    Matrix A = {{0, 1, 1}, {1, 0, 1}, {1, 1, 0}};
    Matrix P = matpow(A, 5);
    for (auto &row : P) { for (auto x : row) cout << x << ' '; cout << '\\n'; }
}
\`\`\`
`,
  ),
  "fibonacci-matrix-exponentiation": A(
    "fibonacci-matrix-exponentiation",
    "Fibonacci using Matrix Exponentiation",
    "Math for Competitive Programming",
    "cp-math",
    "Fibonacci using Matrix Exponentiation — theory and C++17 implementation.",
    4,
    `
# Fibonacci using Matrix Exponentiation

## Theory

Fibonacci is the classic use case for matrix exponentiation. The identity

\`\`\`
[ F(n+1) ]   [ 1 1 ]^n   [ F(1) ]
[  F(n)  ] = [ 1 0 ]   * [ F(0) ]
\`\`\`

lets us compute \`F(n) mod p\` in **O(log n)** matrix multiplications, i.e. \`O(log n)\` because the matrix is 2 x 2.

### Correctness

\`[[1,1],[1,0]] * [F(n+1), F(n)]^T = [F(n+1) + F(n), F(n+1)]^T = [F(n+2), F(n+1)]^T\`. Induction.

### Fast doubling (an equivalent, often-faster approach)

Instead of raw matrix multiplication, use the identities

\`F(2k)   = F(k) * (2 F(k+1) - F(k))\`
\`F(2k+1) = F(k)^2 + F(k+1)^2\`

Still \`O(log n)\` and avoids the constant overhead of matrix operations.

### Handling \`n\` up to \`10^18\`

Everything is modulo a prime \`p\` (typically \`10^9 + 7\`). Watch for overflow — use \`__int128\` or make sure operands fit within \`long long\` after each \`% p\`.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

// Matrix exponentiation approach.
using M = array<array<long long, 2>, 2>;
M mul(const M &A, const M &B) {
    M C{};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}
long long fibMatrix(long long n) {
    M base = {{{1, 1}, {1, 0}}};
    M result = {{{1, 0}, {0, 1}}};    // identity
    while (n) { if (n & 1) result = mul(result, base); base = mul(base, base); n >>= 1; }
    return result[0][1];              // F(n)
}

// Fast doubling — pair (F(n), F(n+1)).
pair<long long, long long> fibFast(long long n) {
    if (n == 0) return {0, 1};
    auto [a, b] = fibFast(n >> 1);          // F(k), F(k+1)
    long long c = a * ((2 * b - a + MOD) % MOD) % MOD;   // F(2k)
    long long d = (a * a + b * b) % MOD;                 // F(2k+1)
    if (n & 1) return {d, (c + d) % MOD};
    else       return {c, d};
}

int main() {
    cout << fibMatrix(1000000000000LL) << "\\n";
    cout << fibFast(1000000000000LL).first << "\\n";
}
\`\`\`
`,
  ),
  "pigeonhole-principle": A(
    "pigeonhole-principle",
    "Pigeonhole Principle",
    "Math for Competitive Programming",
    "cp-math",
    "Pigeonhole Principle — theory and C++17 implementation.",
    4,
    `
# Pigeonhole Principle

## Theory

The **pigeonhole principle** (PHP) says: if you put \`n + 1\` items into \`n\` boxes, at least one box has \`>= 2\` items. More generally, if \`n\` items are placed into \`k\` boxes, some box has at least \`ceil(n / k)\` items.

### Why it matters

PHP is a **proof technique**, not usually an algorithm — it lets you argue that certain patterns *must* exist, which then guides the algorithm.

### Classic applications

- **Subarray-sum equals target modulo n:** consider prefix sums \`S_0, S_1, ..., S_n\` modulo \`n\`. There are \`n + 1\` sums and only \`n\` residues, so two are equal — the subarray between them sums to a multiple of \`n\`.
- **Two people with the same number of friends** in any group of \`n\` people.
- **In any 6 people, either 3 are mutual friends or 3 are mutual strangers** — Ramsey R(3,3) = 6, proved with PHP.
- **Birthday paradox** — probability argument built on PHP.
- **Bounding solutions**: in a set of \`n + 1\` integers in \`[1, 2n]\`, two must be coprime; two must be such that one divides the other.

### CP recipe

When a problem says "prove some structure always exists" or asks for such a structure inside guaranteed-large input, think PHP first. The construction is often a **prefix-sum + modular residue** trick.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

// Given an array of size n, find a contiguous subarray whose sum is divisible by n.
// Existence guaranteed by pigeonhole on prefix sums modulo n.
pair<int, int> subarrayDivisibleByN(const vector<int> &a) {
    int n = a.size();
    vector<int> firstIndex(n, -2);
    firstIndex[0] = -1;              // empty prefix has sum 0
    long long s = 0;
    for (int i = 0; i < n; i++) {
        s += a[i];
        int r = ((s % n) + n) % n;
        if (firstIndex[r] != -2) return {firstIndex[r] + 1, i};
        firstIndex[r] = i;
    }
    return {-1, -1};                 // never happens
}

int main() {
    vector<int> a = {3, 1, 7, 2, 9};
    auto [l, r] = subarrayDivisibleByN(a);
    cout << "subarray [" << l << ", " << r << "] sums to a multiple of "
         << a.size() << "\\n";
}
\`\`\`
`,
  ),
  "probability-basics": A(
    "probability-basics",
    "Probability Basics",
    "Math for Competitive Programming",
    "cp-math",
    "Probability Basics — theory and C++17 implementation.",
    4,
    `
# Probability Basics

## Theory

**Probability** measures how likely an event is, as a number in \`[0, 1]\`.

### Sample space, events

A **sample space** \`S\` is the set of all outcomes. An **event** \`A\` is a subset of \`S\`. For finite equally-likely outcomes:

\`P(A) = |A| / |S|\`

### Axioms

1. \`P(A) >= 0\`
2. \`P(S) = 1\`
3. For disjoint events, \`P(A ∪ B) = P(A) + P(B)\`

### Rules

- Complement: \`P(not A) = 1 - P(A)\`
- Union: \`P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\`
- Conditional: \`P(A | B) = P(A ∩ B) / P(B)\`
- Independence: \`A\` and \`B\` are independent iff \`P(A ∩ B) = P(A) * P(B)\`
- Bayes: \`P(A | B) = P(B | A) * P(A) / P(B)\`
- Total probability: \`P(B) = sum_i P(B | A_i) * P(A_i)\` over a partition \`A_i\`.

### In CP

Answers are usually given as \`P mod (10^9 + 7)\` — treat \`p / q\` as \`p * q^{-1} mod p\`. Precompute inverses if many queries.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}
long long invMod(long long a) { return powmod(a, MOD - 2, MOD); }

// Simulate probability of "at least one shared birthday" among k people.
// Real answer: 1 - product_{i=0..k-1} (365 - i) / 365.
double birthdayCollision(int k) {
    double p = 1.0;
    for (int i = 0; i < k; i++) p *= (365.0 - i) / 365.0;
    return 1.0 - p;
}

// Modular version of a probability p/q: report the value modulo MOD.
long long asModular(long long p, long long q) {
    return p % MOD * invMod(q % MOD) % MOD;
}

int main() {
    cout << birthdayCollision(23) << "\\n";       // ~0.507
    cout << asModular(1, 6) << "\\n";             // 1/6 mod p
}
\`\`\`
`,
  ),
  "expected-value": A(
    "expected-value",
    "Expected Value",
    "Math for Competitive Programming",
    "cp-math",
    "Expected Value — theory and C++17 implementation.",
    4,
    `
# Expected Value

## Theory

The **expected value** (mean) of a random variable \`X\` is the weighted average of its possible values:

\`E[X] = sum_x x * P(X = x)\`  (discrete)
\`E[X] = integral of x * f(x) dx\`  (continuous, density \`f\`)

### Fundamental properties

- **Linearity of expectation** (holds even if variables are dependent):
  \`E[X + Y] = E[X] + E[Y]\`
  \`E[a * X + b] = a * E[X] + b\`
- **Products**: \`E[X * Y] = E[X] * E[Y]\` only if \`X, Y\` are independent.
- **Indicator trick**: for events \`A_i\`, \`E[number of A_i that occur] = sum_i P(A_i)\`. This is the single most useful CP tool for expected-value problems.

### Examples

- Expected value of a fair die: \`(1 + 2 + ... + 6) / 6 = 3.5\`.
- Expected number of coin flips until first head (geometric with \`p = 1/2\`): \`1 / p = 2\`.
- Expected number of fixed points of a random permutation of \`n\` elements: \`1\` (sum of indicators, \`P(i is fixed) = 1/n\`, \`n * 1/n = 1\`).

### CP idioms

- Set up **indicators** for the quantities you want to count.
- Use **linearity** to break the sum into independent pieces.
- Represent answers as rational numbers modulo a prime (\`p * q^{-1} mod m\`).
- For process-like problems, set up recurrences on expected values (\`E[state] = 1 + sum_children p_i * E[child_i]\`) and solve as a linear system or DP.

## C++ Implementation

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1'000'000'007LL;

long long powmod(long long a, long long e, long long m) {
    long long r = 1; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}
long long invMod(long long a) { return powmod(a, MOD - 2, MOD); }

// Expected value of a fair die.
double dieExpectation(int faces) {
    return (faces + 1) / 2.0;
}

// Expected number of rolls of a fair die until we see all \`faces\` values.
// Classic coupon collector: n * H_n where H_n = 1 + 1/2 + ... + 1/n.
double couponCollector(int faces) {
    double H = 0;
    for (int i = 1; i <= faces; i++) H += 1.0 / i;
    return faces * H;
}

// Modular version of coupon collector: answer = n * sum(1/i) mod p.
long long couponCollectorMod(int n) {
    long long ans = 0;
    for (int i = 1; i <= n; i++) ans = (ans + invMod(i)) % MOD;
    return ans * n % MOD;
}

int main() {
    cout << dieExpectation(6) << "\\n";               // 3.5
    cout << couponCollector(6) << "\\n";              // 14.7
    cout << couponCollectorMod(6) << "\\n";
}
\`\`\`
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
