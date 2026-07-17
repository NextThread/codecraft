import type { Category } from '@/content/types';
import cp_introduction from './cp-introduction';
import time_complexity from './time-complexity';
import space_complexity from './space-complexity';
import bit_manipulation from './bit-manipulation';

const category: Category = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [cp_introduction, time_complexity, space_complexity, bit_manipulation],
};

export default category;
