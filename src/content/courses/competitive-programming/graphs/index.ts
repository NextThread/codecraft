import type { Category } from '@/content/types';
import v_graph_representation from './graph-representation';
import v_dfs from './dfs';
import v_bfs from './bfs';
import v_connected_components from './connected-components';
import v_bipartite_graph from './bipartite-graph';
import v_topological_sort from './topological-sort';
import v_cycle_detection from './cycle-detection';
import v_dijkstra from './dijkstra';
import v_bellman_ford from './bellman-ford';
import v_floyd_warshall from './floyd-warshall';
import v_zero_one_bfs from './zero-one-bfs';
import v_mst_prim from './mst-prim';
import v_mst_kruskal from './mst-kruskal';
import v_scc from './strongly-connected-components';
import v_bridges from './bridges';
import v_articulation_points from './articulation-points';
import v_euler_path from './euler-path';
import v_functional_graphs from './functional-graphs';
import v_max_flow from './max-flow';
import v_bipartite_matching from './bipartite-matching';

const category: Category = {
  slug: "graphs",
  title: "Graphs",
  emoji: "\ud83c\udf10",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [
    v_graph_representation,
    v_dfs,
    v_bfs,
    v_connected_components,
    v_bipartite_graph,
    v_topological_sort,
    v_cycle_detection,
    v_dijkstra,
    v_bellman_ford,
    v_floyd_warshall,
    v_zero_one_bfs,
    v_mst_prim,
    v_mst_kruskal,
    v_scc,
    v_bridges,
    v_articulation_points,
    v_euler_path,
    v_functional_graphs,
    v_max_flow,
    v_bipartite_matching,
  ],
};

export default category;
