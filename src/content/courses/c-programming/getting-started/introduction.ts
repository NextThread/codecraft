import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "introduction",
  title: "Introduction to C",
  description: "What C is, why it matters, and where it's used today.",
  readingTime: 5,
  content: `
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
};

export default topic;
