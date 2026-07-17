import type { Course } from '@/content/types';
import competitive_programming from './competitive-programming';
import cp_math from './cp-math';

const course: Course = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  categories: [competitive_programming, cp_math],
};

export default course;
