import type { Category } from '@/content/types';
import v_callbacks_promises from './callbacks-promises';
import v_async_await from './async-await';
import v_fetch_api from './fetch-api';

const category: Category = {
  slug: "async-js",
  title: "Asynchronous JavaScript",
  emoji: "\u23f3",
  courseSlug: "javascript-web",
  courseTitle: "JavaScript for Web Development",
  defaultDifficulty: "Medium",
  topics: [v_callbacks_promises, v_async_await, v_fetch_api],
};

export default category;
