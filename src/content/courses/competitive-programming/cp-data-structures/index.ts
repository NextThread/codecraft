import type { Category } from '@/content/types';
import v_linked_list from './linked-list';
import v_stack from './stack';
import v_queue from './queue';
import v_deque from './deque';
import v_priority_queue from './priority-queue';
import v_set from './set';
import v_multiset from './multiset';
import v_map from './map';
import v_unordered_map from './unordered-map';
import v_ordered_set_pbds from './ordered-set-pbds';
import v_fenwick_tree from './fenwick-tree';
import v_segment_tree from './segment-tree';
import v_lazy_propagation from './lazy-propagation';
import v_sparse_table from './sparse-table';
import v_trie from './trie';
import v_dsu from './dsu';

const category: Category = {
  slug: "cp-data-structures",
  title: "Data Structures (CP)",
  emoji: "\ud83d\udce6",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [
    v_linked_list,
    v_stack,
    v_queue,
    v_deque,
    v_priority_queue,
    v_set,
    v_multiset,
    v_map,
    v_unordered_map,
    v_ordered_set_pbds,
    v_fenwick_tree,
    v_segment_tree,
    v_lazy_propagation,
    v_sparse_table,
    v_trie,
    v_dsu,
  ],
};

export default category;
