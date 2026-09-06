export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  content: string[];
}

export const posts: Post[] = [
  {
    slug: "approaching-code-reviews",
    title: "Approaching code reviews",
    date: "23 May 2025",
    category: "Engineering",
    description: "Some thoughts and personal experience with code reviews — why prioritizing signal over noise and framing feedback as conversation matters.",
    content: [
      "Disclaimer, this isn't a rigid guide on how to do code reviews, but rather a personal reflection on approaching them thoughtfully as an engineer.",
      "Code reviews are one of the most powerful tools we have as engineers. They're not just for improving code quality, but also for leveling up other engineers, spreading knowledge, and helping build a strong team culture.",
      "Over time, I've realized that code reviews require deliberate care. It's easy to get caught up nitpicking formatting or getting overwhelmed by large diffs. Instead, I've developed this philosophy for approaching reviews:",
      "• Be thoughtful\n• Be collaborative\n• Always consider the bigger picture",
      "### 1. Start with the problem, not the code",
      "One of the biggest mistakes is jumping straight into the diff. A better approach is to step back and ask: what problem is this code actually trying to solve? Understanding the 'why' helps give far more meaningful feedback on the 'how'.",
      "### 2. Prioritize signal over noise",
      "Not all feedback is created equal. Focus on what truly matters:\n- **Correctness**: Are there edge cases, broken logic, or silent regressions?\n- **Clarity**: Is the code understandable to someone seeing it for the first time?\n- **Maintainability**: Will this be clear six months from now?",
      "### 3. Frame feedback as a conversation",
      "Avoid prescriptive language like 'you should' or 'this is wrong.' Instead, ask questions: 'Could this be simplified with X?', 'How does this behave on empty input?' This invites open dialogue instead of defensiveness.",
      "### 4. Acknowledge what is working",
      "A great review doesn't just point out flaws — it highlights wins. When someone writes a clean abstraction or an elegant solution, call it out.",
      "### Final thoughts",
      "The best reviews aren't just about the code. They're about collaboration, trust, and shared standards. When you review, look for ways to support your team's growth, improve understanding, and leave the codebase a little cleaner than you found it."
    ],
  },
  {
    slug: "first-year-dsa",
    title: "First-Year Reflections on Data Structures & C++",
    date: "18 Aug 2025",
    category: "ISE Coursework",
    description: "Transitioning from high-level scripting to low-level memory pointers, computational complexity, and algorithmic thinking in ISE.",
    content: [
      "Coming into my first year of Information Science & Engineering, most of my experience came from high-level languages like Python and JavaScript.",
      "Learning C++ and implementing fundamental data structures from scratch — linked lists, stacks, queues, hash tables, and binary search trees — completely altered how I think about memory, cache locality, and computational bounds.",
      "### Why low-level understanding changes how you write high-level code",
      "When you understand pointers and memory allocation in C++, writing JavaScript or Python feels completely different. You stop taking object garbage collection or memory allocations for granted.",
      "### Key takeaways from semester 1:",
      "• Big-O is not theoretical: it manifests the moment your input scale grows.\n• Write code for clarity first, optimize bottlenecks when profiled.\n• Building things from scratch builds real intuition that tutorials never can.",
    ],
  },
  {
    slug: "minimalist-software",
    title: "Why I Prefer Minimalist Software Systems",
    date: "12 Jan 2026",
    category: "Architecture",
    description: "Why fewer dependencies, simple architectures, and restrained design lead to superior software performance.",
    content: [
      "In modern web development, there is an irresistible gravity pulling developers toward complexity. Installing dozens of heavy libraries for tasks that require fifty lines of standard code has become normal.",
      "### The beauty of restraint",
      "Minimal software does not mean featureless software. It means deliberate software. Every abstraction introduces a cost in mental overhead, bundle size, and debugging friction.",
      "When we strip away unnecessary dependencies and design with intent, products become faster, more reliable, and immensely more pleasant to build and maintain.",
    ],
  },
];
