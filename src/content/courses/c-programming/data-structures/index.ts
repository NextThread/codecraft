import type { Category } from '@/content/types';
import arrays from './arrays';
import strings from './strings';
import pointers from './pointers';
import dynamic_memory from './dynamic-memory';
import structures from './structures';
import unions from './unions';

const category: Category = {
  slug: "data-structures",
  title: "Data Structures",
  emoji: "\ud83d\udce6",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Medium",
  topics: [arrays, strings, pointers, dynamic_memory, structures, unions],
};

export default category;
