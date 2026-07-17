import type { Category } from '@/content/types';
import number_systems from './number-systems';
import divisibility_rules from './divisibility-rules';
import prime_numbers from './prime-numbers';
import factors_divisors from './factors-divisors';
import prime_factorization from './prime-factorization';
import gcd from './gcd';
import lcm from './lcm';
import euclidean_algorithm from './euclidean-algorithm';
import sieve_of_eratosthenes from './sieve-of-eratosthenes';
import linear_sieve from './linear-sieve';
import binary_exponentiation from './binary-exponentiation';
import modular_arithmetic from './modular-arithmetic';
import modular_inverse from './modular-inverse';
import fermats_little_theorem from './fermats-little-theorem';
import euler_totient from './euler-totient';
import extended_euclidean from './extended-euclidean';
import chinese_remainder_theorem from './chinese-remainder-theorem';
import inclusion_exclusion from './inclusion-exclusion';
import combinatorics from './combinatorics';
import factorials from './factorials';
import permutations from './permutations';
import combinations from './combinations';
import binomial_coefficients from './binomial-coefficients';
import pascal_triangle from './pascal-triangle';
import catalan_numbers from './catalan-numbers';
import matrix_exponentiation from './matrix-exponentiation';
import fibonacci_matrix_exponentiation from './fibonacci-matrix-exponentiation';
import pigeonhole_principle from './pigeonhole-principle';
import probability_basics from './probability-basics';
import expected_value from './expected-value';

const category: Category = {
  slug: "cp-math",
  title: "Math for CP",
  emoji: "\ud83e\uddee",
  courseSlug: "competitive-programming",
  courseTitle: "Competitive Programming",
  defaultDifficulty: "Medium",
  topics: [number_systems, divisibility_rules, prime_numbers, factors_divisors, prime_factorization, gcd, lcm, euclidean_algorithm, sieve_of_eratosthenes, linear_sieve, binary_exponentiation, modular_arithmetic, modular_inverse, fermats_little_theorem, euler_totient, extended_euclidean, chinese_remainder_theorem, inclusion_exclusion, combinatorics, factorials, permutations, combinations, binomial_coefficients, pascal_triangle, catalan_numbers, matrix_exponentiation, fibonacci_matrix_exponentiation, pigeonhole_principle, probability_basics, expected_value],
};

export default category;
