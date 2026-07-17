import type { Category } from '@/content/types';
import data_types from './data-types';
import variables from './variables';
import constants from './constants';
import operators from './operators';
import input_output from './input-output';
import type_casting from './type-casting';

const category: Category = {
  slug: "basics",
  title: "Basics",
  emoji: "\ud83e\uddf1",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Beginner",
  topics: [data_types, variables, constants, operators, input_output, type_casting],
};

export default category;
