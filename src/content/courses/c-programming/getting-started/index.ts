import type { Category } from '@/content/types';
import introduction from './introduction';
import program_structure from './program-structure';
import first_program from './first-program';

const category: Category = {
  slug: "getting-started",
  title: "Getting Started",
  emoji: "\ud83d\ude80",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Beginner",
  topics: [introduction, program_structure, first_program],
};

export default category;
