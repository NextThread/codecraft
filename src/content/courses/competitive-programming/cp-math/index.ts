import type { Category } from '@/content/types';
import v_number_systems from './number-systems';
import v_divisibility_rules from './divisibility-rules';
import v_prime_numbers from './prime-numbers';
import v_factors_divisors from './factors-divisors';
import v_prime_factorization from './prime-factorization';
import v_gcd from './gcd';
import v_lcm from './lcm';
import v_euclidean_algorithm from './euclidean-algorithm';
import v_sieve_of_eratosthenes from './sieve-of-eratosthenes';
import v_linear_sieve from './linear-sieve';
import v_binary_exponentiation from './binary-exponentiation';
import v_modular_arithmetic from './modular-arithmetic';
import v_modular_inverse from './modular-inverse';
import v_fermats_little_theorem from './fermats-little-theorem';
import v_euler_totient from './euler-totient';
import v_extended_euclidean from './extended-euclidean';
import v_chinese_remainder_theorem from './chinese-remainder-theorem';
import v_inclusion_exclusion from './inclusion-exclusion';
import v_combinatorics from './combinatorics';
import v_factorials from './factorials';
import v_permutations from './permutations';
import v_combinations from './combinations';
import v_binomial_coefficients from './binomial-coefficients';
import v_pascal_triangle from './pascal-triangle';
import v_catalan_numbers from './catalan-numbers';
import v_matrix_exponentiation from './matrix-exponentiation';
import v_fibonacci_matrix_exponentiation from './fibonacci-matrix-exponentiation';
import v_pigeonhole_principle from './pigeonhole-principle';
import v_probability_basics from './probability-basics';
import v_expected_value from './expected-value';

const category: Category = {
  slug: "cp-math",
  title: "Math for CP",
  emoji: "\ud83e\uddee",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [v_number_systems, v_divisibility_rules, v_prime_numbers, v_factors_divisors, v_prime_factorization, v_gcd, v_lcm, v_euclidean_algorithm, v_sieve_of_eratosthenes, v_linear_sieve, v_binary_exponentiation, v_modular_arithmetic, v_modular_inverse, v_fermats_little_theorem, v_euler_totient, v_extended_euclidean, v_chinese_remainder_theorem, v_inclusion_exclusion, v_combinatorics, v_factorials, v_permutations, v_combinations, v_binomial_coefficients, v_pascal_triangle, v_catalan_numbers, v_matrix_exponentiation, v_fibonacci_matrix_exponentiation, v_pigeonhole_principle, v_probability_basics, v_expected_value],
};

export default category;
