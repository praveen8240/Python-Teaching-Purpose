import { PracticeProblem } from "@/types/lesson";

export const day12_to_15Problems: Record<string, PracticeProblem> = {
  // Day 12 Session 2
  lc215: {
    id: "lc215",
    title: "LC 215 - Kth Largest Element in an Array",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    statement: "Given an integer array nums and an integer k, return the k-th largest element in the array.",
    inputFormat: "Line 1: space-separated integers.\nLine 2: target integer k.",
    outputFormat: "A single integer.",
    constraints: ["1 <= k <= len(nums) <= 10^5"],
    hint: "Use a min-heap of size k. Iterate through the array; push elements onto the heap, and if size > k, pop. The heap's top will contain the k-th largest element.",
    starterCode: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

nums = list(map(int, input().split()))
k = int(input())
print(find_kth_largest(nums, k))`,
    testInput: "3 2 1 5 6 4\n2\n",
    expectedOutput: "5",
    explanation: "Sorted: 1, 2, 3, 4, 5, 6. The 2nd largest is 5.",
    complexity: { time: "O(n log k)", space: "O(k)" },
    commonMistakes: ["Sorting the array (O(n log n)) which is suboptimal compared to the heap approach."]
  },
  lc347: {
    id: "lc347",
    title: "LC 347 - Top K Frequent Elements",
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
    statement: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    inputFormat: "Line 1: space-separated integers.\nLine 2: target integer k.",
    outputFormat: "Space-separated integers sorted for validation.",
    constraints: ["1 <= len(nums) <= 10^5", "k is in range [1, unique elements count]"],
    hint: "Count frequencies of elements using a hash map. Use a min-heap of size k storing tuples of (frequency, element) to find the k highest frequencies.",
    starterCode: `import heapq

def top_k_frequent(nums, k):
    counts = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1
    
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return sorted([x[1] for x in heap])

nums = list(map(int, input().split()))
k = int(input())
print(*top_k_frequent(nums, k))`,
    testInput: "1 1 1 2 2 3\n2\n",
    expectedOutput: "1 2",
    explanation: "Frequencies: 1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time. Top 2 are [1, 2].",
    complexity: { time: "O(n log k)", space: "O(n)" },
    commonMistakes: ["Sorting the entire unique keys array based on frequencies (O(u log u)) instead of using a size k min-heap or bucket sort."]
  },

  // Day 13 Session 1
  lc102: {
    id: "lc102",
    title: "LC 102 - Binary Tree Level Order Traversal",
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    statement: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    inputFormat: "Space-separated nodes in level order representation (null for missing).",
    outputFormat: "Print each level's nodes on a new line.",
    constraints: ["The number of nodes in the tree is in the range [0, 2000]."],
    hint: "Use BFS queue. Loop for the current queue size at each step to process all nodes of the current level together before expanding.",
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if not root: return []
    ans = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        ans.append(level)
    return ans

# Simple tree mock
r = TreeNode(3)
r.left = TreeNode(9)
r.right = TreeNode(20)
r.right.left = TreeNode(15)
r.right.right = TreeNode(7)
for row in level_order(r):
    print(*row)`,
    testInput: "",
    expectedOutput: "3\n9 20\n15 7",
    explanation: "Traversal returns level 1: [3], level 2: [9, 20], level 3: [15, 7].",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Failing to separate levels: ensure you compute level size (len(q)) before starting the level's processing loop."]
  },
  lc104: {
    id: "lc104",
    title: "LC 104 - Maximum Depth of Binary Tree",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    statement: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    inputFormat: "Manual build check.",
    outputFormat: "A single integer height.",
    constraints: ["0 <= number of nodes <= 10^4"],
    hint: "Use recursion: max_depth(root) = 1 + max(max_depth(root.left), max_depth(root.right)) with base case max_depth(None) = 0.",
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

r = TreeNode(3)
r.left = TreeNode(9)
r.right = TreeNode(20)
r.right.left = TreeNode(15)
print(max_depth(r))`,
    testInput: "",
    expectedOutput: "3",
    explanation: "The longest path is 3 -> 20 -> 15 (length 3).",
    complexity: { time: "O(n)", space: "O(h) for call stack" },
    commonMistakes: ["Forgetting the base case (root is None), leading to Infinite Recursion error."]
  },
  lc226: {
    id: "lc226",
    title: "LC 226 - Invert Binary Tree",
    url: "https://leetcode.com/problems/invert-binary-tree/",
    statement: "Given the root of a binary tree, invert the tree, and return its root.",
    inputFormat: "Tree mock verification.",
    outputFormat: "Output root and child nodes to verify inversion.",
    constraints: ["0 <= number of nodes <= 100"],
    hint: "Use recursion. Swap left and right children of current node, then recursively invert the left and right subtrees.",
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root

r = TreeNode(4)
r.left = TreeNode(2)
r.right = TreeNode(7)
invert_tree(r)
print(r.val, r.left.val, r.right.val)`,
    testInput: "",
    expectedOutput: "4 7 2",
    explanation: "Left child 2 and right child 7 are swapped.",
    complexity: { time: "O(n)", space: "O(h) for call stack" },
    commonMistakes: ["Overwriting references before recursively executing (make sure to assign recursively or use tuple unpacking to swap safely)."]
  },

  // Day 13 Session 2
  lc98: {
    id: "lc98",
    title: "LC 98 - Validate Binary Search Tree",
    url: "https://leetcode.com/problems/validate-binary-search-tree/",
    statement: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    inputFormat: "BST tree mock validation.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["The number of nodes in the tree is in the range [1, 10^4]."],
    hint: "Pass validation bounds down recursively. Every node in left subtree must be < node.val, and every node in right subtree must be > node.val.",
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    def validate(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root, float('-inf'), float('inf'))

r = TreeNode(2)
r.left = TreeNode(1)
r.right = TreeNode(3)
print("true" if is_valid_bst(r) else "false")`,
    testInput: "",
    expectedOutput: "true",
    explanation: "Binary search tree conditions are satisfied: left (1) < root (2) < right (3).",
    complexity: { time: "O(n)", space: "O(h) stack" },
    commonMistakes: ["Checking only the immediate parent value (e.g. node.left.val < node.val) rather than validating bounds globally across subtrees."]
  },
  lc200: {
    id: "lc200",
    title: "LC 200 - Number of Islands",
    url: "https://leetcode.com/problems/number-of-islands/",
    statement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    inputFormat: "Line 1: rows m and cols n.\nNext m lines: grid values as a single string.",
    outputFormat: "Print the count of islands.",
    constraints: ["1 <= m, n <= 100"],
    hint: "Use DFS or BFS. Traverse the grid; when you hit '1', increment island count and recursively perform DFS to sink all connected land cells to '0'.",
    starterCode: `def num_islands(grid):
    if not grid: return 0
    m, n = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == '0':
            return
        grid[r][c] = '0' # Sink island
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count

m, n = map(int, input().split())
grid = []
for _ in range(m):
    grid.append(list(input().strip()))
print(num_islands(grid))`,
    testInput: "4 5\n11110\n11010\n11000\n00000\n",
    expectedOutput: "1",
    explanation: "All 1s are connected horizontally or vertically into a single island.",
    complexity: { time: "O(m * n)", space: "O(m * n) worst-case DFS stack" },
    commonMistakes: ["Failing to mark visited cells, resulting in infinite loops/StackOverflow errors."]
  },

  // Day 14 Session 1
  lc70: {
    id: "lc70",
    title: "LC 70 - Climbing Stairs",
    url: "https://leetcode.com/problems/climbing-stairs/",
    statement: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    inputFormat: "A single integer n.",
    outputFormat: "A single integer representing ways.",
    constraints: ["1 <= n <= 45"],
    hint: "The number of ways to reach step n is the sum of ways to reach (n-1) and (n-2) (essentially Fibonacci sequence). Use tabulation or variables to track states.",
    starterCode: `def climb_stairs(n):
    if n <= 2: return n
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second

n = int(input())
print(climb_stairs(n))`,
    testInput: "3\n",
    expectedOutput: "3",
    explanation: "Three ways: 1+1+1, 1+2, 2+1.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using simple recursion without memoization (O(2^n)) which will timeout for n > 30."]
  },
  lc53: {
    id: "lc53",
    title: "LC 53 - Maximum Subarray",
    url: "https://leetcode.com/problems/maximum-subarray/",
    statement: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    inputFormat: "Space-separated integers.",
    outputFormat: "A single integer.",
    constraints: ["1 <= len(nums) <= 10^5"],
    hint: "Use Kadane's algorithm. Maintain a running sum; if it becomes negative, reset it to zero. Track the maximum sum observed.",
    starterCode: `def max_sub_array(nums):
    max_sum = float('-inf')
    curr_sum = 0
    for x in nums:
        curr_sum += x
        max_sum = max(max_sum, curr_sum)
        if curr_sum < 0:
            curr_sum = 0
    return max_sum

nums = list(map(int, input().split()))
print(max_sub_array(nums))`,
    testInput: "-2 1 -3 4 -1 2 1 -5 4\n",
    expectedOutput: "6",
    explanation: "Subarray [4, -1, 2, 1] has the largest sum of 6.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Initializing maximum sum as 0: if the array contains only negative numbers, the answer will be incorrect. Initialize max_sum to float('-inf') or nums[0]."]
  },
  lc198: {
    id: "lc198",
    title: "LC 198 - House Robber",
    url: "https://leetcode.com/problems/house-robber/",
    statement: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. You cannot rob adjacent houses. Return max money.",
    inputFormat: "Space-separated integers representing money in houses.",
    outputFormat: "Max possible money.",
    constraints: ["1 <= len(nums) <= 100"],
    hint: "DP transition: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). You can optimize space to O(1) using two variables.",
    starterCode: `def rob(nums):
    if not nums: return 0
    prev2 = prev1 = 0
    for x in nums:
        temp = max(prev1, prev2 + x)
        prev2 = prev1
        prev1 = temp
    return prev1

nums = list(map(int, input().split()))
print(rob(nums))`,
    testInput: "1 2 3 1\n",
    expectedOutput: "4",
    explanation: "Rob house 1 (money = 1) and house 3 (money = 3), total = 4.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Trying to take only alternate elements (e.g. even indices vs odd indices) which is incorrect: you can skip two adjacent houses if that is more optimal (e.g., [2, 1, 1, 2])."]
  },
  lc322: {
    id: "lc322",
    title: "LC 322 - Coin Change",
    url: "https://leetcode.com/problems/coin-change/",
    statement: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up, return -1.",
    inputFormat: "Line 1: space-separated coin denominations.\nLine 2: target amount.",
    outputFormat: "Fewest coins count or -1.",
    constraints: ["1 <= len(coins) <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    hint: "Use dynamic programming. dp[i] represents fewest coins to make amount i. dp[i] = min(dp[i], dp[i - coin] + 1) for each coin.",
    starterCode: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            if dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

coins = list(map(int, input().split()))
amount = int(input())
print(coin_change(coins, amount))`,
    testInput: "1 2 5\n11\n",
    expectedOutput: "3",
    explanation: "11 = 5 + 5 + 1 (3 coins total).",
    complexity: { time: "O(amount * len(coins))", space: "O(amount)" },
    commonMistakes: ["Using a greedy approach (e.g. taking the largest coin first), which fails for cases like coins = [3, 4] and amount = 6 (where greedy fails, but DP finds 3 + 3 = 6)."]
  },

  // Day 14 Session 2
  lc300: {
    id: "lc300",
    title: "LC 300 - Longest Increasing Subsequence",
    url: "https://leetcode.com/problems/longest-increasing-subsequence/",
    statement: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Print length of LIS.",
    constraints: ["1 <= len(nums) <= 2500"],
    hint: "DP state: dp[i] represents length of LIS ending at index i. For each element at index i, search all previous elements at index j (0 <= j < i) where nums[j] < nums[i], and update dp[i] = max(dp[i], dp[j] + 1).",
    starterCode: `def length_of_lis(nums):
    if not nums: return 0
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

nums = list(map(int, input().split()))
print(length_of_lis(nums))`,
    testInput: "10 9 2 5 3 7 101 18\n",
    expectedOutput: "4",
    explanation: "The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.",
    complexity: { time: "O(n^2)", space: "O(n)" },
    commonMistakes: ["Confusing subsequence (which can skip elements) with subarray (which must be contiguous)."]
  },
  lc62: {
    id: "lc62",
    title: "LC 62 - Unique Paths",
    url: "https://leetcode.com/problems/unique-paths/",
    statement: "There is a robot on an m x n grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time.",
    inputFormat: "Line containing two space-separated integers m and n.",
    outputFormat: "Print the number of unique paths.",
    constraints: ["1 <= m, n <= 100"],
    hint: "The number of paths to cell (i, j) is the sum of paths to (i-1, j) and (i, j-1). Precompute paths row by row.",
    starterCode: `def unique_paths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[-1]

m, n = map(int, input().split())
print(unique_paths(m, n))`,
    testInput: "3 7\n",
    expectedOutput: "28",
    explanation: "Grid of 3 x 7 yields 28 unique paths to bottom-right.",
    complexity: { time: "O(m * n)", space: "O(min(m, n))" },
    commonMistakes: ["Using simple recursion without memoization (O(2^(m+n))) which results in TLE for grid sizes larger than 10."]
  },
  lc416: {
    id: "lc416",
    title: "LC 416 - Partition Equal Subset Sum",
    url: "https://leetcode.com/problems/partition-equal-subset-sum/",
    statement: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of elements in both subsets is equal.",
    inputFormat: "Space-separated integers.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= len(nums) <= 200", "1 <= nums[i] <= 100"],
    hint: "The subset sum target must be exactly sum(nums) // 2. If sum is odd, return False. Solve 0/1 knapsack-like DP to check if target sum can be formed.",
    starterCode: `def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for i in range(target, x - 1, -1):
            if dp[i - x]:
                dp[i] = True
    return dp[target]

nums = list(map(int, input().split()))
print("true" if can_partition(nums) else "false")`,
    testInput: "1 5 11 5\n",
    expectedOutput: "true",
    explanation: "The array can be partitioned as [1, 5, 5] and [11], both summing to 11.",
    complexity: { time: "O(n * target)", space: "O(target)" },
    commonMistakes: ["Not traversing the DP array backward inside the inner loop: iterating forward allows reuse of the same element multiple times (bounded knapsack instead of 0/1)."]
  },

  // Day 15 Session 1 (Mixed Set 2)
  lc155: {
    id: "lc155",
    title: "LC 155 - Min Stack",
    url: "https://leetcode.com/problems/min-stack/",
    statement: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    inputFormat: "Simulated queries.",
    outputFormat: "Verify top and min return validations.",
    constraints: ["Operations: push, pop, top, getMin are all O(1)."],
    hint: "Maintain a secondary stack that stores the minimum element observed so far. When you push, push the min of (current, min_stack's top) onto the min_stack.",
    starterCode: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]

ms = MinStack()
ms.push(-2)
ms.push(0)
ms.push(-3)
print(ms.getMin())
ms.pop()
print(ms.top())
print(ms.getMin())`,
    testInput: "",
    expectedOutput: "-3\n0\n-2",
    explanation: "Min value updates dynamically and queries return in constant time.",
    complexity: { time: "O(1) all operations", space: "O(n)" },
    commonMistakes: ["Scanning the stack dynamically in O(n) time to find the minimum value in getMin()."]
  },
  lc83: {
    id: "lc83",
    title: "LC 83 - Remove Duplicates from Sorted List",
    url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    statement: "Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted.",
    inputFormat: "Space-separated sorted integers.",
    outputFormat: "Space-separated unique list integers.",
    constraints: ["0 <= node count <= 300", "list is sorted"],
    hint: "Traverse the list. If curr.val == curr.next.val, skip curr.next by setting curr.next = curr.next.next. Otherwise advance curr.",
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def delete_duplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return head

def make_list(vals):
    if not vals: return None
    h = ListNode(vals[0])
    c = h
    for v in vals[1:]:
        c.next = ListNode(v)
        c = c.next
    return h

vals = list(map(int, input().split()))
h = make_list(vals)
res = delete_duplicates(h)
ans = []
while res:
    ans.append(res.val)
    res = res.next
print(*ans)`,
    testInput: "1 1 2 3 3\n",
    expectedOutput: "1 2 3",
    explanation: "Duplicate 1 and 3 instances are deleted, returning [1, 2, 3].",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Failing to handle null inputs or advancing the current pointer too early, which skips consecutive duplicate checks."]
  },
  lc234: {
    id: "lc234",
    title: "LC 234 - Palindrome Linked List",
    url: "https://leetcode.com/problems/palindrome-linked-list/",
    statement: "Given the head of a singly linked list, return true if it is a palindrome or false otherwise. Solve in O(n) time and O(1) space.",
    inputFormat: "Space-separated integers.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= nodes count <= 10^5"],
    hint: "Use slow/fast pointers to find the middle. Reverse the second half of the list in-place. Then compare first half values to reversed second half values.",
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def is_palindrome_list(head):
    # Find mid
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True

def make_list(vals):
    h = ListNode(vals[0])
    c = h
    for v in vals[1:]:
        c.next = ListNode(v)
        c = c.next
    return h

vals = list(map(int, input().split()))
print("true" if is_palindrome_list(make_list(vals)) else "false")`,
    testInput: "1 2 2 1\n",
    expectedOutput: "true",
    explanation: "Linked list 1->2->2->1 is a palindrome.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Copying all values to an array (O(n) auxiliary space) which fails the O(1) space follow-up requirement."]
  },
  lc39: {
    id: "lc39",
    title: "LC 39 - Combination Sum",
    url: "https://leetcode.com/problems/combination-sum/",
    statement: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen unlimited times.",
    inputFormat: "Line 1: space-separated candidates.\nLine 2: target integer.",
    outputFormat: "Print each combination on a new line (sort values inside combinations, and sorting results overall for validation consistency).",
    constraints: ["1 <= len(candidates) <= 30", "1 <= candidates[i] <= 200", "1 <= target <= 500"],
    hint: "Use backtracking. For the candidate at index i, you can choose to include it (and stay on index i since reuse is allowed) or skip it (and move to index i+1).",
    starterCode: `def combination_sum(candidates, target):
    res = []
    combo = []
    def dfs(i, current_sum):
        if current_sum == target:
            res.append(combo.copy())
            return
        if i >= len(candidates) or current_sum > target:
            return
        # Option 1: Choose candidates[i]
        combo.append(candidates[i])
        dfs(i, current_sum + candidates[i])
        combo.pop() # backtrack
        # Option 2: Skip candidates[i]
        dfs(i + 1, current_sum)
    dfs(0, 0)
    return [sorted(x) for x in res]

candidates = list(map(int, input().split()))
target = int(input())
ans = sorted(combination_sum(candidates, target))
for item in ans:
    print(item)`,
    testInput: "2 3 6 7\n7\n",
    expectedOutput: "[2, 2, 3]\n[7]",
    explanation: "2 and 3 sum to 7. 7 sums to 7. These are the unique combinations.",
    complexity: { time: "O(2^target)", space: "O(target)" },
    commonMistakes: ["Failing to branch properly or not copy()ing the combo array before append, leading to empty results."]
  },
  lc100: {
    id: "lc100",
    title: "LC 100 - Same Tree",
    url: "https://leetcode.com/problems/same-tree/",
    statement: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    inputFormat: "Manual build mock verification.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["The number of nodes in both trees is in the range [0, 100]."],
    hint: "Use recursion. If both nodes are None, return True. If only one is None or values differ, return False. Recursively validate left and right subtrees.",
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)

# Mock trees
p = TreeNode(1, TreeNode(2), TreeNode(3))
q = TreeNode(1, TreeNode(2), TreeNode(3))
print("true" if is_same_tree(p, q) else "false")`,
    testInput: "",
    expectedOutput: "true",
    explanation: "Both trees have identical structures and node values.",
    complexity: { time: "O(n)", space: "O(h)" },
    commonMistakes: ["Not validating p.val == q.val before doing recursive calls, leading to potential AttributeErrors."]
  },
  lc543: {
    id: "lc543",
    title: "LC 543 - Diameter of Binary Tree",
    url: "https://leetcode.com/problems/diameter-of-binary-tree/",
    statement: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
    inputFormat: "Tree build verification.",
    outputFormat: "A single integer length.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^4]."],
    hint: "At each node, compute left and right subtree heights. The diameter passing through this node is left_height + right_height. Return 1 + max(left_height, right_height) recursively to propagate heights.",
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root):
    ans = 0
    def height(node):
        nonlocal ans
        if not node:
            return 0
        lh = height(node.left)
        rh = height(node.right)
        ans = max(ans, lh + rh)
        return 1 + max(lh, rh)
    height(root)
    return ans

r = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(diameter_of_binary_tree(r))`,
    testInput: "",
    expectedOutput: "3",
    explanation: "The longest path is 4 -> 2 -> 5 or 4 -> 2 -> 1 -> 3 (both have length 3).",
    complexity: { time: "O(n)", space: "O(h)" },
    commonMistakes: ["Assuming the longest path must always pass through the root of the tree."]
  },
  lc733: {
    id: "lc733",
    title: "LC 733 - Flood Fill",
    url: "https://leetcode.com/problems/flood-fill/",
    statement: "An image is represented by an m x n integer grid image. You are also given three integers sr, sc, and color. Perform a flood fill on the image starting from the pixel image[sr][sc].",
    inputFormat: "Line 1: rows m and cols n.\nNext m lines: space-separated integers.\nLast line: sr, sc, and color.",
    outputFormat: "Print the modified image row-by-row, space separated.",
    constraints: ["1 <= m, n <= 50"],
    hint: "Use DFS starting at (sr, sc). Record the starting pixel color. If it differs from the target color, recursively replace color of adjacent pixels sharing the same starting color.",
    starterCode: `def flood_fill(image, sr, sc, color):
    start_color = image[sr][sc]
    if start_color == color:
        return image
    m, n = len(image), len(image[0])
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or image[r][c] != start_color:
            return
        image[r][c] = color
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    dfs(sr, sc)
    return image

m, n = map(int, input().split())
image = []
for _ in range(m):
    image.append(list(map(int, input().split())))
sr, sc, color = map(int, input().split())
ans = flood_fill(image, sr, sc, color)
for row in ans:
    print(*row)`,
    testInput: "3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2\n",
    expectedOutput: "2 2 2\n2 2 0\n2 0 1",
    explanation: "All connected pixels starting at (1,1) with color 1 are repainted to 2.",
    complexity: { time: "O(m * n)", space: "O(m * n) stack" },
    commonMistakes: ["Failing to add `start_color == color` check, which causes infinite loops/recursion if the starting pixel is already the target color."]
  },
  lc746: {
    id: "lc746",
    title: "LC 746 - Min Cost Climbing Stairs",
    url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    statement: "You are given an integer array cost where cost[i] is the cost of i-th step on a staircase. Once you pay the cost, you can climb one or two steps. Find minimum cost to reach top.",
    inputFormat: "Space-separated integers representing step costs.",
    outputFormat: "A single integer minimum cost.",
    constraints: ["2 <= len(cost) <= 1000", "0 <= cost[i] <= 999"],
    hint: "DP state: dp[i] represents min cost to reach step i. dp[i] = cost[i] + min(dp[i-1], dp[i-2]). The final step is past the end of the array: return min(dp[-1], dp[-2]).",
    starterCode: `def min_cost_climbing_stairs(cost):
    n = len(cost)
    dp = [0] * n
    dp[0], dp[1] = cost[0], cost[1]
    for i in range(2, n):
        dp[i] = cost[i] + min(dp[i-1], dp[i-2])
    return min(dp[-1], dp[-2])

cost = list(map(int, input().split()))
print(min_cost_climbing_stairs(cost))`,
    testInput: "10 15 20\n",
    expectedOutput: "15",
    explanation: "Start on index 1 (cost = 15) and pay 15 to climb directly to the top.",
    complexity: { time: "O(n)", space: "O(1) if optimized, O(n) standard" },
    commonMistakes: ["Including the cost of the final step after the end of the array, rather than returning the min of the last two steps."]
  }
};
