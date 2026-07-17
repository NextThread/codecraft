import type { Category } from '@/content/types';
import if_else from './if-else';
import switch from './switch';
import loops from './loops';
import break_continue from './break-continue';

const category: Category = {
  slug: "control-flow",
  title: "Control Flow",
  emoji: "\ud83d\udd00",
  courseSlug: "c-programming",
  courseTitle: "C Programming",
  defaultDifficulty: "Easy",
  topics: [if_else, switch, loops, break_continue],
};

export default category;
