import type { Category } from '@/content/types';
import v_points from './points';
import v_distance from './distance';
import v_dot_product from './dot-product';
import v_cross_product from './cross-product';
import v_line_intersection from './line-intersection';
import v_orientation from './orientation';
import v_convex_hull from './convex-hull';
import v_polygon_area from './polygon-area';

const category: Category = {
  slug: "geometry",
  title: "Geometry",
  emoji: "\ud83d\udcd0",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [
    v_points,
    v_distance,
    v_dot_product,
    v_cross_product,
    v_line_intersection,
    v_orientation,
    v_convex_hull,
    v_polygon_area,
  ],
};

export default category;
