import type { Category } from '@/content/types';
import v_binary_tree from './binary-tree';
import v_binary_search_tree from './binary-search-tree';
import v_tree_traversals from './tree-traversals';
import v_lowest_common_ancestor from './lowest-common-ancestor';
import v_binary_lifting from './binary-lifting';
import v_euler_tour from './euler-tour';
import v_heavy_light_decomposition from './heavy-light-decomposition';
import v_tree_dp from './tree-dp';
import v_centroid_decomposition from './centroid-decomposition';

const category: Category = {
  slug: "trees",
  title: "Trees",
  emoji: "\ud83c\udf33",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Hard",
  topics: [
    v_binary_tree,
    v_binary_search_tree,
    v_tree_traversals,
    v_lowest_common_ancestor,
    v_binary_lifting,
    v_euler_tour,
    v_heavy_light_decomposition,
    v_tree_dp,
    v_centroid_decomposition,
  ],
};

export default category;
