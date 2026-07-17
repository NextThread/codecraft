import type { Category } from '@/content/types';
import v_introduction from './introduction';
import v_program_structure from './program-structure';
import v_first_program from './first-program';

const category: Category = {
  slug: "getting-started",
  title: "Getting Started",
  emoji: "\ud83d\ude80",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Beginner",
  topics: [v_introduction, v_program_structure, v_first_program],
};

export default category;
