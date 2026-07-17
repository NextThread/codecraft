import type { Course } from '@/content/types';
import v_competitive_programming from './competitive-programming';
import v_cp_math from './cp-math';

const course: Course = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  categories: [v_competitive_programming, v_cp_math],
};

export default course;
