import type { Category } from '@/content/types';
import v_points from './points';
import v_distance from './distance';
import v_dot_product from './dot-product';
import v_cross_product from './cross-product';
import v_line_intersection from './line-intersection';
import v_orientation from './orientation';
import v_convex_hull from './convex-hull';
import v_polygon_area from './polygon-area';
import v_point_in_polygon from './point-in-polygon';
import v_segment_intersection_applications from './segment-intersection-applications';
import v_closest_pair_of_points from './closest-pair-of-points';
import v_sweep_line_geometry from './sweep-line-geometry';
import v_circle_geometry from './circle-geometry';
import v_circle_line_intersection from './circle-line-intersection';
import v_circle_circle_intersection from './circle-circle-intersection';
import v_polygon_intersection from './polygon-intersection';
import v_rotating_calipers from './rotating-calipers';
import v_half_plane_intersection from './half-plane-intersection';

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
    v_point_in_polygon,
    v_segment_intersection_applications,
    v_closest_pair_of_points,
    v_sweep_line_geometry,
    v_circle_geometry,
    v_circle_line_intersection,
    v_circle_circle_intersection,
    v_polygon_intersection,
    v_rotating_calipers,
    v_half_plane_intersection,
  ],
};

export default category;
