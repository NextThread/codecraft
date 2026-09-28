export type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface TopicMeta {
  difficulty?: Difficulty;
  practiceMinutes?: number;
  prerequisites?: string[]; // slugs
  related?: string[];       // slugs
}

export interface Topic extends TopicMeta {
  slug: string;
  title: string;
  description: string;
  readingTime: number;
  content: string;
  lastUpdated?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // index into options
  explanation?: string;
}

export interface Category {
  slug: string;
  title: string;
  emoji?: string;
  courseSlug: string;
  courseTitle: string;
  defaultDifficulty?: Difficulty;
  topics: Topic[];
  quiz?: QuizQuestion[];
}

export interface Course {
  slug: string;
  title: string;
  emoji?: string;
  categories: Category[];
}
