import type { Course } from '@/content/types';
import v_competitive_programming from './competitive-programming';
import v_cp_math from './cp-math';
import v_searching from './searching';
import v_sorting from './sorting';
import v_prefix_techniques from './prefix-techniques';
import v_cp_data_structures from './cp-data-structures';
import v_trees from './trees';
import v_dynamic_programming from './dynamic-programming';
import v_cp_strings from './strings';
import v_game_theory from './game-theory';
import v_geometry from './geometry';

const course: Course = {
  slug: "competitive-programming",
  title: "Competitive Programming",
  emoji: "\ud83c\udfc6",
  categories: [v_competitive_programming, v_cp_math, v_searching, v_sorting, v_prefix_techniques, v_cp_data_structures, v_trees, v_dynamic_programming, v_cp_strings, v_game_theory, v_geometry],
};

export default course;
