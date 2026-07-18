import type { Course } from '@/content/types';
import v_competitive_programming from './competitive-programming';
import v_cp_math from './cp-math';
import v_searching from './searching';
import v_sorting from './sorting';
import v_prefix_techniques from './prefix-techniques';

const course: Course = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  categories: [v_competitive_programming, v_cp_math, v_searching, v_sorting, v_prefix_techniques],
};

export default course;
