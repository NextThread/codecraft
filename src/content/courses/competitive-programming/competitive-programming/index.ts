import type { Category } from '@/content/types';
import v_cp_introduction from './cp-introduction';
import v_time_complexity from './time-complexity';
import v_space_complexity from './space-complexity';
import v_bit_manipulation from './bit-manipulation';

const category: Category = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [v_cp_introduction, v_time_complexity, v_space_complexity, v_bit_manipulation],
};

export default category;
