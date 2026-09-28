import type { Category } from '@/content/types';
import { quizzes } from '../quizzes';
import v_dom_basics from './dom-basics';
import v_events from './events';
import v_forms_validation from './forms-validation';

const category: Category = {
  slug: "dom-events",
  title: "DOM & Events",
  emoji: "\ud83e\ude9c",
  courseSlug: "javascript-web",
  courseTitle: "JavaScript for Web Development",
  defaultDifficulty: "Beginner",
  topics: [v_dom_basics, v_events, v_forms_validation],
  quiz: quizzes['dom-events'],
};

export default category;
