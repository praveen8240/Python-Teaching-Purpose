### Time Complexity vs. Input Size (N) Reference Guide

To avoid TLE (Time Limit Exceeded) on LeetCode and in CP, design your algorithm based on the maximum value of **N** given in the problem constraints:

*   **N ≤ 11**: $O(N!)$ or $O(N^2 \cdot N!)$ — Permutations, brute-force backtracking.
*   **N ≤ 20**: $O(2^N)$ — Subset generation, bitmask DP.
*   **N ≤ 500**: $O(N^3)$ — Matrix multiplication, Floyd-Warshall.
*   **N ≤ 5,000**: $O(N^2)$ — Nested loops, basic dynamic programming.
*   **N ≤ 10⁵ to 10⁶**: $O(N \log N)$ or $O(N)$ — Sorting, binary search, sliding window, heaps, two pointers.
*   **N ≤ 10⁹**: $O(\sqrt{N})$ or $O(\log N)$ — Primality testing, basic math, binary search on answer.

### Language Considerations
*   **The 10⁸ Rule:** Safest to calculate assuming **C++** speed (10⁸ operations per second).
*   **Java / Python:** LeetCode scales up the total time limit or allows more overhead for these interpreted/managed languages. However, a sub-optimal complexity tier (like an $O(N^2)$ approach where $N = 10^5$) will still fail across all languages.
