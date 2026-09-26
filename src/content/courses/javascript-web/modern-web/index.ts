import type { Category } from '@/content/types';
import v_es_modules from './es-modules';
import v_local_storage from './local-storage';
import v_todo_app_project from './todo-app-project';

const category: Category = {
  slug: "modern-web",
  title: "Modern Web & Project",
  emoji: "\ud83d\ude80",
  courseSlug: "javascript-web",
  courseTitle: "JavaScript for Web Development",
  defaultDifficulty: "Medium",
  topics: [v_es_modules, v_local_storage, v_todo_app_project],
};

export default category;
