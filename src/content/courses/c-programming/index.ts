import type { Course } from '@/content/types';
import v_getting_started from './getting-started';
import v_basics from './basics';
import v_control_flow from './control-flow';
import v_functions from './functions';
import v_data_structures from './data-structures';

const course: Course = {
  slug: "c-programming",
  title: "C Programming",
  emoji: "\ud83d\udcbb",
  categories: [v_getting_started, v_basics, v_control_flow, v_functions, v_data_structures],
};

export default course;
