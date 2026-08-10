import type { Category } from '@/content/types';
import v_dp_1d from './dp-1d';
import v_dp_grid from './dp-grid';
import v_knapsack from './knapsack';
import v_dp_subsequence from './dp-subsequence';
import v_dp_string from './dp-string';
import v_dp_interval from './dp-interval';
import v_dp_bitmask from './dp-bitmask';
import v_dp_digit from './dp-digit';
import v_dp_tree from './dp-tree';
import v_dp_optimization from './dp-optimization';

const category: Category = {
  slug: "dynamic-programming",
  title: "Dynamic Programming",
  emoji: "\ud83e\udde9",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Hard",
  topics: [
    v_dp_1d,
    v_dp_grid,
    v_knapsack,
    v_dp_subsequence,
    v_dp_string,
    v_dp_interval,
    v_dp_bitmask,
    v_dp_digit,
    v_dp_tree,
    v_dp_optimization,
  ],
};

export default category;
