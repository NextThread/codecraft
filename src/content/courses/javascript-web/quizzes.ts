import type { QuizQuestion } from '@/content/types';

export const quizzes: Record<string, QuizQuestion[]> = {
  'js-basics': [
    { question: 'Which keyword should you use by default for a variable that is never reassigned?', options: ['var', 'let', 'const', 'static'], answer: 2, explanation: 'const prevents reassignment and is block-scoped.' },
    { question: 'What does "5" + 3 evaluate to?', options: ['8', '"53"', 'NaN', 'TypeError'], answer: 1, explanation: '+ with a string concatenates, so 3 becomes "3".' },
    { question: 'What does 0 ?? 8080 return?', options: ['8080', '0', 'undefined', 'null'], answer: 1, explanation: '?? only falls back on null or undefined, and 0 is neither.' },
    { question: 'Which statement about arrow functions is true?', options: ['They have their own this', 'They are hoisted like declarations', 'They inherit this from the surrounding scope', 'They cannot take parameters'], answer: 2 },
    { question: 'What does [1, 2, 3].map(n => n * 2) return?', options: ['[1, 2, 3]', '[2, 4, 6]', '12', 'undefined'], answer: 1, explanation: 'map returns a new array with each element transformed.' },
  ],
  'dom-events': [
    { question: 'Which method returns the FIRST element matching a CSS selector?', options: ['querySelectorAll', 'getElementsByClassName', 'querySelector', 'findElement'], answer: 2 },
    { question: 'Why is textContent safer than innerHTML for user input?', options: ['It is faster', 'It does not parse HTML, preventing XSS', 'It supports more tags', 'It works in older browsers only'], answer: 1 },
    { question: 'What is event delegation?', options: ['Attaching one listener to a parent and checking event.target', 'Removing all listeners', 'Calling events from a server', 'Using setTimeout for events'], answer: 0 },
    { question: 'How do you stop a form from reloading the page on submit?', options: ['event.stopPropagation()', 'return true', 'event.preventDefault()', 'form.reset()'], answer: 2 },
    { question: 'Why should you still validate on the server?', options: ['Client checks can be bypassed', 'Browsers ignore validation', 'It makes forms faster', 'You shouldn\'t'], answer: 0 },
  ],
  'async-js': [
    { question: 'What are the three states of a Promise?', options: ['start, run, end', 'pending, fulfilled, rejected', 'open, closed, error', 'waiting, done, failed'], answer: 1 },
    { question: 'Which combinator never rejects and waits for every promise?', options: ['Promise.all', 'Promise.race', 'Promise.any', 'Promise.allSettled'], answer: 3 },
    { question: 'Does fetch reject on a 404 response?', options: ['Yes, always', 'No — check res.ok yourself', 'Only for POST', 'Only in Node.js'], answer: 1 },
    { question: 'Where can you use await (without top-level modules)?', options: ['Anywhere', 'Only inside async functions', 'Only in loops', 'Only in callbacks'], answer: 1 },
    { question: 'Is res.json() synchronous?', options: ['Yes', 'No, it returns a Promise', 'Only for small bodies', 'It depends on the browser'], answer: 1 },
  ],
  'modern-web': [
    { question: 'How many default exports can an ES module have?', options: ['Unlimited', 'One', 'Two', 'None'], answer: 1 },
    { question: 'What type of values does localStorage store?', options: ['Any object', 'Strings only', 'Numbers only', 'Binary blobs'], answer: 1, explanation: 'Use JSON.stringify / JSON.parse for objects.' },
    { question: 'In the Todo app, what is the source of truth?', options: ['The DOM', 'The todos state array', 'The form input', 'CSS classes'], answer: 1 },
    { question: 'Which script attribute is needed to use import/export in the browser?', options: ['defer', 'async', 'type="module"', 'lang="es6"'], answer: 2 },
  ],
};
