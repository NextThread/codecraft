import type { Category } from '@/content/types';
import v_arrays from './arrays';
import v_strings from './strings';
import v_string_functions from './string-functions';
import v_pointers from './pointers';
import v_dynamic_memory from './dynamic-memory';
import v_structures from './structures';
import v_unions from './unions';

const category: Category = {
  slug: "data-structures",
  title: "Data Structures",
  emoji: "\ud83d\udce6",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Medium",
  topics: [v_arrays, v_strings, v_string_functions, v_pointers, v_dynamic_memory, v_structures, v_unions],
};

export default category;
