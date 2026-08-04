import {
  Trophy,
  Users,
  Code2,
  GraduationCap,
  Brain,
  Award,
  Rocket,
  Briefcase,
  Globe,
  GitBranch,
  Sparkles,
  Target,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

export const mentor = {
  name: 'Anurag Roy',
  role: 'Software Engineer & Competitive Programming Mentor',
  intro:
    'I have 5+ years of experience teaching and mentoring coding, competitive programming, software development, AI/ML, and related technical skills — working with students and working professionals at every level.',
};

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const primaryStats: Stat[] = [
  { label: 'Students & Professionals Mentored', value: '3100+', icon: Users, featured: true },
  { label: 'DSA & CP Problems Solved', value: '6000+', icon: Code2, featured: true },
  { label: 'Years of Teaching & Mentoring', value: '5+', icon: GraduationCap, featured: true },
];

export const badgeStats: string[] = [
  'Codeforces Expert Rated',
  'Codeforces Top 1%',
  'LeetCode Top 3%',
  'Kaggle Expert',
];

export interface AchievementCard {
  platform: string;
  highlight?: string;
  points: string[];
  icon: LucideIcon;
}

export const cpAchievements: AchievementCard[] = [
  {
    platform: 'LeetCode',
    highlight: 'Top 3%',
    points: ['Top 3% globally'],
    icon: Target,
  },
  {
    platform: 'Codeforces',
    highlight: 'AIR 4',
    points: ['Expert rated', 'Top 1%', 'AIR 4 in Codeforces Round 857'],
    icon: Trophy,
  },
  {
    platform: 'CodeChef',
    highlight: '2033',
    points: ['Ranked #1 in Institute', '5-Star rating of 2033', 'Top 1% globally'],
    icon: Award,
  },
  {
    platform: 'CodeGladiators 2023',
    highlight: 'Finalist',
    points: ['Finalist, selected from a pool of 100K+ participants'],
    icon: Rocket,
  },
  {
    platform: 'CodeGladiators 2024',
    highlight: 'Finalist',
    points: ['Finalist, selected from a pool of 100K+ participants'],
    icon: Rocket,
  },
  {
    platform: 'Problem Solving',
    highlight: '6000+',
    points: [
      'Solved 6000+ DSA and competitive programming problems',
      'Across LeetCode, Codeforces, CodeChef, AtCoder, SPOJ, and others',
    ],
    icon: Code2,
  },
];

export const aiAchievements: AchievementCard[] = [
  { platform: 'Kaggle', highlight: 'Expert', points: ['Kaggle Expert'], icon: Brain },
  {
    platform: 'Kaggle Competitions',
    highlight: 'Top 20',
    points: ['Multiple Kaggle competitions with Global Top 20 finishes'],
    icon: Sparkles,
  },
];

export interface RankAchievement {
  title: string;
  subtitle?: string;
  rank: string;
  icon: LucideIcon;
}

export const otherCompetitions: RankAchievement[] = [
  {
    title: 'The Second IMC Challenge',
    subtitle: 'Sponsored by Huawei',
    rank: 'Global Rank 122',
    icon: Globe,
  },
  {
    title: 'Highland Hackathon',
    rank: 'Global Rank 9',
    icon: Trophy,
  },
];

export const openSourceSummary: string[] = [
  "Contributed to Amazon's official AWS repositories",
  'Contributed to official Node.js organization repositories / Node.js ecosystem projects',
  'Contributed to multiple other major open-source repositories',
];

/**
 * Structured slot for individual contributions.
 * Add entries here later — the UI renders them automatically.
 */
export interface Contribution {
  repository: string;
  organization: string;
  contributionType: string;
  githubUrl?: string;
  pullRequestUrl?: string;
}

export const contributions: Contribution[] = [];

export interface MentoringGoal {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const mentoringGoals: MentoringGoal[] = [
  {
    title: 'Learn Coding From Scratch',
    description:
      'For complete beginners who want to start programming from zero and build strong fundamentals.',
    icon: BookOpen,
  },
  {
    title: 'Master DSA & Competitive Programming',
    description:
      'For students and developers who want to improve problem-solving skills and learn DSA and competitive programming systematically.',
    icon: Code2,
  },
  {
    title: 'Improve Codeforces / LeetCode Rating',
    description:
      'For competitive programmers who want to improve their ratings, contest performance, problem-solving ability, and move toward higher rating levels.',
    icon: Trophy,
  },
  {
    title: 'Prepare for Placements & Switch Jobs',
    description:
      'For students and developers preparing for coding interviews, DSA rounds, product-based companies, placements, or planning a job switch.',
    icon: Briefcase,
  },
  {
    title: 'Learn Web Development',
    description:
      'For beginners and developers who want to learn modern web development and build practical applications.',
    icon: Globe,
  },
  {
    title: 'Build Real-World / Industry Projects',
    description:
      'For people who want to build production-quality projects, improve their development skills, create strong portfolio projects, and understand real-world software engineering practices.',
    icon: Rocket,
  },
  {
    title: 'Start Open Source Development',
    description:
      'For developers who want to learn Git and GitHub, make their first open-source contribution, find suitable repositories, create PRs, and contribute to major open-source projects.',
    icon: GitBranch,
  },
  {
    title: 'Competitive Programming & Olympiad Preparation',
    description:
      'For students preparing for competitive programming contests, coding competitions, programming olympiads, hackathons, and ICPC-style competitions.',
    icon: Target,
  },
  {
    title: 'AI / Machine Learning & Kaggle',
    description:
      'For people who want to learn machine learning, work on ML projects, participate in Kaggle competitions, and improve their competitive ML skills.',
    icon: Brain,
  },
];
