import type { Category } from '@/content/types';
import functions from './functions';
import storage_classes from './storage-classes';
import recursion from './recursion';

const category: Category = {
  slug: "functions",
  title: "Functions",
  emoji: "\ud83e\udde9",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Easy",
  topics: [functions, storage_classes, recursion],
};

export default category;
