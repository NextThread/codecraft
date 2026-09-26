import type { Category } from '@/content/types';
import v_introduction from './introduction';
import v_variables_types from './variables-types';
import v_operators_control_flow from './operators-control-flow';
import v_functions from './functions';
import v_arrays_objects from './arrays-objects';

const category: Category = {
  slug: "js-basics",
  title: "JavaScript Basics",
  emoji: "\ud83d\udfe1",
  courseSlug: "javascript-web",
  courseTitle: "JavaScript for Web Development",
  defaultDifficulty: "Beginner",
  topics: [v_introduction, v_variables_types, v_operators_control_flow, v_functions, v_arrays_objects],
};

export default category;
