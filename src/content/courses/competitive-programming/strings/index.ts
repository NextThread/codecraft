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
import v_double_hashing from './double-hashing';
import v_aho_corasick from './aho-corasick';
import v_suffix_array from './suffix-array';
import v_lcp_array from './lcp-array';
import v_suffix_automaton from './suffix-automaton';
import v_suffix_tree from './suffix-tree';
import v_palindromic_tree from './palindromic-tree';
import v_advanced_pattern_matching from './advanced-pattern-matching';
import v_advanced_string_applications from './advanced-string-applications';

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
    v_double_hashing,
    v_aho_corasick,
    v_suffix_array,
    v_lcp_array,
    v_suffix_automaton,
    v_suffix_tree,
    v_palindromic_tree,
    v_advanced_pattern_matching,
    v_advanced_string_applications,
  ],
};

export default category;
