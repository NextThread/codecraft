import type { Category } from '@/content/types';
import v_string_basics from './string-basics';
import v_string_frequency_counting from './string-frequency-counting';
import v_string_palindromes from './string-palindromes';
import v_prefix_function_kmp from './prefix-function-kmp';
import v_z_function from './z-function';
import v_rolling_hash from './rolling-hash';
import v_string_trie from './string-trie';
import v_manacher from './manacher';
import v_string_algorithms from './string-algorithms-pattern-matching';

const category: Category = {
  slug: "cp-strings",
  title: "Strings",
  emoji: "\ud83d\udd24",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [
    v_string_basics,
    v_string_frequency_counting,
    v_string_palindromes,
    v_prefix_function_kmp,
    v_z_function,
    v_rolling_hash,
    v_string_trie,
    v_manacher,
    v_string_algorithms,
  ],
};

export default category;
