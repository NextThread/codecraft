import type { Category } from '@/content/types';
import v_intro from './introduction-to-searching';
import v_linear from './linear-search';
import v_binary from './binary-search';
import v_lower from './lower-bound';
import v_upper from './upper-bound';
import v_bsa from './binary-search-on-answer';
import v_ternary from './ternary-search';
import v_mitm from './meet-in-the-middle';

const category: Category = {
  slug: "searching",
  title: "Searching",
  emoji: "\ud83d\udd0d",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [v_intro, v_linear, v_binary, v_lower, v_upper, v_bsa, v_ternary, v_mitm],
};

export default category;
