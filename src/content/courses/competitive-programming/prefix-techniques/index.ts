import type { Category } from '@/content/types';
import v_prefix_sum from './prefix-sum';
import v_prefix_xor from './prefix-xor';
import v_diff from './difference-array';
import v_2d from './2d-prefix-sum';
import v_freq from './prefix-frequency';
import v_coord from './coordinate-compression';

const category: Category = {
  slug: "prefix-techniques",
  title: "Prefix Techniques",
  emoji: "\u2795",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Easy",
  topics: [v_prefix_sum, v_prefix_xor, v_diff, v_2d, v_freq, v_coord],
};

export default category;
