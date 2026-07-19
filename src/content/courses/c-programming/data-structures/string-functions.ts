import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "string-functions",
  title: "String Functions",
  description: "Complete guide to all standard C string functions in <string.h> and <ctype.h> with example programs.",
  readingTime: 15,
  difficulty: "Easy",
  prerequisites: ["strings", "pointers"],
  content: `
# String Functions in C

C treats strings as null-terminated \`char\` arrays. The standard library ships a rich set of functions to work with them, spread across two headers:

- \`<string.h>\` — length, copy, concatenation, comparison, searching, tokenizing, memory ops.
- \`<ctype.h>\`  — classify and convert individual characters.

This chapter walks through **every commonly used function**, its signature, behaviour, and a runnable example.

---

## 1. Length — \`strlen\`

\`\`\`c
size_t strlen(const char *s);
\`\`\`
Returns the number of characters before the terminating \`'\\0'\` (the \`\\0\` itself is **not** counted).

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "programming";
    printf("Length = %zu\\n", strlen(s));   // 11
    return 0;
}
\`\`\`

---

## 2. Copy — \`strcpy\`, \`strncpy\`

\`\`\`c
char *strcpy(char *dest, const char *src);
char *strncpy(char *dest, const char *src, size_t n);
\`\`\`
\`strcpy\` copies including \`'\\0'\`. \`strncpy\` copies at most \`n\` chars — it does **not** guarantee a terminator, so append one yourself.

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char src[] = "Hello, World!";
    char dst[50];

    strcpy(dst, src);
    printf("strcpy  : %s\\n", dst);

    char part[6];
    strncpy(part, src, 5);
    part[5] = '\\0';                    // ensure terminator
    printf("strncpy : %s\\n", part);    // Hello
    return 0;
}
\`\`\`

---

## 3. Concatenation — \`strcat\`, \`strncat\`

\`\`\`c
char *strcat(char *dest, const char *src);
char *strncat(char *dest, const char *src, size_t n);
\`\`\`
Appends \`src\` to the end of \`dest\`. \`dest\` must have room for the result plus \`'\\0'\`.

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char greet[50] = "Hello";
    strcat(greet, ", ");
    strcat(greet, "World!");
    printf("%s\\n", greet);              // Hello, World!

    char buf[20] = "abc";
    strncat(buf, "defghij", 3);          // append only "def"
    printf("%s\\n", buf);                 // abcdef
    return 0;
}
\`\`\`

---

## 4. Comparison — \`strcmp\`, \`strncmp\`

\`\`\`c
int strcmp(const char *a, const char *b);
int strncmp(const char *a, const char *b, size_t n);
\`\`\`
Returns \`0\` if equal, negative if \`a < b\`, positive if \`a > b\` (lexicographic).

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    printf("%d\\n", strcmp("apple", "apple"));   // 0
    printf("%d\\n", strcmp("apple", "banana"));  // < 0
    printf("%d\\n", strcmp("cat",   "car"));     // > 0
    printf("%d\\n", strncmp("hello", "help", 3));// 0 (first 3 match)
    return 0;
}
\`\`\`

---

## 5. Searching characters — \`strchr\`, \`strrchr\`

\`\`\`c
char *strchr(const char *s, int c);   // first occurrence
char *strrchr(const char *s, int c);  // last  occurrence
\`\`\`

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "competitive programming";
    char *f = strchr(s,  'p');
    char *l = strrchr(s, 'p');
    printf("first p at index %ld\\n", f - s);   // 5
    printf("last  p at index %ld\\n", l - s);   // 12
    return 0;
}
\`\`\`

---

## 6. Searching substrings — \`strstr\`

\`\`\`c
char *strstr(const char *haystack, const char *needle);
\`\`\`
Returns a pointer to the first occurrence of \`needle\` in \`haystack\`, or \`NULL\`.

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "I love C programming";
    char *p = strstr(s, "C prog");
    if (p) printf("Found at index %ld\\n", p - s);  // 7
    else   printf("Not found\\n");
    return 0;
}
\`\`\`

---

## 7. Tokenizing — \`strtok\`

\`\`\`c
char *strtok(char *str, const char *delim);
\`\`\`
Splits a string in place. Pass the string on the first call, then \`NULL\` to continue.

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char csv[] = "red,green,blue,,yellow";
    char *tok = strtok(csv, ",");
    while (tok != NULL) {
        printf("[%s]\\n", tok);
        tok = strtok(NULL, ",");
    }
    return 0;
}
\`\`\`

---

## 8. Span helpers — \`strspn\`, \`strcspn\`, \`strpbrk\`

\`\`\`c
size_t strspn (const char *s, const char *accept); // length of prefix made only of chars in accept
size_t strcspn(const char *s, const char *reject); // length of prefix without any char in reject
char  *strpbrk(const char *s, const char *accept); // first char of s that is in accept
\`\`\`

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *s = "12345abc";
    printf("digits prefix   = %zu\\n", strspn(s, "0123456789"));  // 5
    printf("upto first alpha= %zu\\n", strcspn(s, "abcdefghij")); // 5

    const char *t = "hello, world!";
    char *p = strpbrk(t, " ,!");
    printf("first delim at index %ld -> '%c'\\n", p - t, *p);     // 5 -> ','
    return 0;
}
\`\`\`

---

## 9. Error message — \`strerror\`

\`\`\`c
char *strerror(int errnum);
\`\`\`
Returns the textual description for an \`errno\` value.

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main(void) {
    FILE *f = fopen("nope.txt", "r");
    if (!f) printf("Error: %s\\n", strerror(errno));
    return 0;
}
\`\`\`

---

## 10. Raw memory helpers (also in \`<string.h>\`)

| Function | Purpose |
|----------|---------|
| \`memcpy(d, s, n)\`  | copy \`n\` bytes (regions must not overlap) |
| \`memmove(d, s, n)\` | copy \`n\` bytes, safe for overlap |
| \`memset(p, c, n)\`  | fill \`n\` bytes with byte \`c\` |
| \`memcmp(a, b, n)\`  | compare \`n\` bytes |
| \`memchr(p, c, n)\`  | find byte \`c\` in the first \`n\` bytes |

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[20] = "abcdefghij";
    char b[20];

    memcpy(b, a, 10);   b[10] = '\\0';
    printf("memcpy  : %s\\n", b);       // abcdefghij

    memset(a, '*', 5);
    printf("memset  : %s\\n", a);       // *****fghij

    memmove(a + 2, a, 5);               // overlapping copy
    printf("memmove : %s\\n", a);
    return 0;
}
\`\`\`

---

## 11. Character classification and conversion — \`<ctype.h>\`

| Function | Returns true when |
|----------|------------------|
| \`isalpha(c)\` | letter |
| \`isdigit(c)\` | digit 0-9 |
| \`isalnum(c)\` | letter or digit |
| \`isspace(c)\` | whitespace |
| \`isupper\` / \`islower\` | case |
| \`ispunct(c)\` | punctuation |
| \`toupper(c)\` / \`tolower(c)\` | convert case |

\`\`\`c
#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main(void) {
    char s[] = "Hello World 2026!";
    int letters = 0, digits = 0, spaces = 0, others = 0;

    for (int i = 0; s[i]; i++) {
        unsigned char c = (unsigned char)s[i];
        if      (isalpha(c)) letters++;
        else if (isdigit(c)) digits++;
        else if (isspace(c)) spaces++;
        else                 others++;
    }
    printf("letters=%d digits=%d spaces=%d others=%d\\n",
            letters, digits, spaces, others);

    char up[64], lo[64];
    strcpy(up, s); strcpy(lo, s);
    for (int i = 0; up[i]; i++) up[i] = toupper((unsigned char)up[i]);
    for (int i = 0; lo[i]; i++) lo[i] = tolower((unsigned char)lo[i]);
    printf("UPPER : %s\\n", up);
    printf("lower : %s\\n", lo);
    return 0;
}
\`\`\`

---

## 12. Numeric conversion — \`atoi\`, \`atof\`, \`strtol\`, \`strtod\`

Declared in \`<stdlib.h>\` but almost always used with strings.

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("%d\\n", atoi("  -42abc"));       // -42
    printf("%f\\n", atof("3.14pi"));         // 3.140000

    char *end;
    long v = strtol("0x2A rest", &end, 16);  // hex parse
    printf("value=%ld, rest=\\"%s\\"\\n", v, end);
    return 0;
}
\`\`\`

:::tip
Prefer \`strtol\` / \`strtod\` over \`atoi\` / \`atof\` — they report errors and where parsing stopped.
:::

---

## Putting it together — a mini text analyzer

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(void) {
    char line[256];
    printf("Enter a sentence: ");
    fgets(line, sizeof(line), stdin);
    line[strcspn(line, "\\n")] = '\\0';       // strip newline

    int words = 0;
    char copy[256];
    strcpy(copy, line);
    for (char *t = strtok(copy, " "); t; t = strtok(NULL, " "))
        words++;

    int upper = 0, lower = 0, digits = 0;
    for (int i = 0; line[i]; i++) {
        unsigned char c = (unsigned char)line[i];
        upper  += !!isupper(c);
        lower  += !!islower(c);
        digits += !!isdigit(c);
    }

    printf("length = %zu\\n", strlen(line));
    printf("words  = %d\\n", words);
    printf("upper  = %d, lower = %d, digits = %d\\n", upper, lower, digits);
    return 0;
}
\`\`\`

:::warning
Classic \`strcpy\`, \`strcat\`, and \`sprintf\` do **no bounds checking**. In production code prefer size-aware variants (\`strncpy\`, \`snprintf\`) and always terminate the destination buffer yourself.
:::
`,
};

export default topic;
