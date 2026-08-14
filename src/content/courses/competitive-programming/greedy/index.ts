import type { Category } from '@/content/types';
import v_greedy_basics from './greedy-basics';
import v_interval_scheduling from './interval-scheduling';
import v_activity_selection from './activity-selection';
import v_huffman_coding from './huffman-coding';
import v_two_pointers from './two-pointers';
import v_sliding_window from './sliding-window';

const category: Category = {
  slug: "greedy",
  title: "Greedy",
  emoji: "\ud83c\udfaf",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [
    v_greedy_basics,
    v_interval_scheduling,
    v_activity_selection,
    v_huffman_coding,
    v_two_pointers,
    v_sliding_window,
  ],
};

export default category;
