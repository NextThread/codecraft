import type { Category } from '@/content/types';
import v_two_d_difference_array from './two-d-difference-array';
import v_advanced_coordinate_compression from './advanced-coordinate-compression';
import v_offline_queries from './offline-queries';
import v_mos_algorithm_rq from './mos-algorithm-rq';
import v_mos_algorithm_updates_rq from './mos-algorithm-updates-rq';
import v_parallel_binary_search from './parallel-binary-search';
import v_sweep_line from './sweep-line';
import v_offline_dynamic_connectivity_rq from './offline-dynamic-connectivity-rq';

const category: Category = {
  slug: "range-queries",
  title: "Range Queries & Offline Techniques",
  emoji: "\ud83d\udcca",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Hard",
  topics: [
    v_two_d_difference_array,
    v_advanced_coordinate_compression,
    v_offline_queries,
    v_mos_algorithm_rq,
    v_mos_algorithm_updates_rq,
    v_parallel_binary_search,
    v_sweep_line,
    v_offline_dynamic_connectivity_rq,
  ],
};

export default category;
