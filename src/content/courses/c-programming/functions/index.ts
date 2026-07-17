import type { Category } from '@/content/types';
import v_functions from './functions';
import v_storage_classes from './storage-classes';
import v_recursion from './recursion';

const category: Category = {
  slug: "functions",
  title: "Functions",
  emoji: "\ud83e\udde9",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Easy",
  topics: [v_functions, v_storage_classes, v_recursion],
};

export default category;
