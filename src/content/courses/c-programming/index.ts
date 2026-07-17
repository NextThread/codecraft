import type { Course } from '@/content/types';
import getting_started from './getting-started';
import basics from './basics';
import control_flow from './control-flow';
import functions from './functions';
import data_structures from './data-structures';

const course: Course = {
  slug: "c-programming",
  title: "C Programming",
  emoji: "\ud83d\udcbb",
  categories: [getting_started, basics, control_flow, functions, data_structures],
};

export default course;
