import type { Category } from '@/content/types';
import v_if_else from './if-else';
import v_switch from './switch';
import v_loops from './loops';
import v_break_continue from './break-continue';

const category: Category = {
  slug: "control-flow",
  title: "Control Flow",
  emoji: "\ud83d\udd00",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Easy",
  topics: [v_if_else, v_switch, v_loops, v_break_continue],
};

export default category;
