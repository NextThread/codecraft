import type { Category } from '@/content/types';
import v_data_types from './data-types';
import v_variables from './variables';
import v_constants from './constants';
import v_operators from './operators';
import v_input_output from './input-output';
import v_type_casting from './type-casting';

const category: Category = {
  slug: "basics",
  title: "Basics",
  emoji: "\ud83e\uddf1",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Beginner",
  topics: [v_data_types, v_variables, v_constants, v_operators, v_input_output, v_type_casting],
};

export default category;
