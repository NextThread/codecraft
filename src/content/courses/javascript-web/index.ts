import type { Course } from '@/content/types';
import v_js_basics from './js-basics';
import v_dom_events from './dom-events';
import v_async_js from './async-js';
import v_modern_web from './modern-web';

const course: Course = {
  slug: "javascript-web",
  title: "JavaScript for Web Development",
  emoji: "\ud83d\udfe8",
  categories: [v_js_basics, v_dom_events, v_async_js, v_modern_web],
};

export default course;
