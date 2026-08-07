import type { Category } from '@/content/types';
import v_nim from './nim';
import v_grundy_numbers from './grundy-numbers';
import v_sprague_grundy from './sprague-grundy';
import v_mex from './mex';

const category: Category = {
  slug: "game-theory",
  title: "Game Theory",
  emoji: "\ud83c\udfae",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [v_nim, v_grundy_numbers, v_sprague_grundy, v_mex],
};

export default category;
