import type { Topic } from '@/content/types';

const topic: Topic = {
  slug: "strings",
  title: "Strings",
  description: "Character arrays terminated by a null character.",
  readingTime: 6,
  content: `
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
};

export default topic;
