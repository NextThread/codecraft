import type { Category } from '@/content/types';
import v_intro from './introduction-to-sorting';
import v_bubble from './bubble-sort';
import v_selection from './selection-sort';
import v_insertion from './insertion-sort';
import v_merge from './merge-sort';
import v_quick from './quick-sort';
import v_heap from './heap-sort';
import v_counting from './counting-sort';
import v_radix from './radix-sort';
import v_bucket from './bucket-sort';
import v_stable from './stable-vs-unstable';
import v_stl from './stl-sort';
import v_cmp from './custom-comparator';
import v_partial from './partial-sort';
import v_nth from './nth-element';

const category: Category = {
  slug: "sorting",
  title: "Sorting",
  emoji: "\ud83d\udd22",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [v_intro, v_bubble, v_selection, v_insertion, v_merge, v_quick, v_heap, v_counting, v_radix, v_bucket, v_stable, v_stl, v_cmp, v_partial, v_nth],
};

export default category;
