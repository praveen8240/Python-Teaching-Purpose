import { PracticeProblem } from "@/types/lesson";

export const day9_to_11Problems: Record<string, PracticeProblem> = {
  // Day 9 Session 1
  lc20: {
    id: "lc20",
    title: "LC 20 - Valid Parentheses",
    url: "https://leetcode.com/problems/valid-parentheses/",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    inputFormat: "A single string s.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= len(s) <= 10^4", "s consists of parentheses only."],
    hint: "Use a stack. For every opening bracket, push its corresponding closing bracket onto the stack. For every closing bracket, pop from the stack and verify it matches.",
    starterCode: `def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

s = input().strip()
print("true" if is_valid(s) else "false")`,
    testInput: "()[]{}\n",
    expectedOutput: "true",
    explanation: "Opening brackets match their closing brackets in proper order.",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Popping from an empty stack without safety checks, causing runtime crashes."]
  },
  lc496: {
    id: "lc496",
    title: "LC 496 - Next Greater Element I",
    url: "https://leetcode.com/problems/next-greater-element-i/",
    statement: "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Find all next greater elements of nums1 in nums2.",
    inputFormat: "Line 1: space-separated integers (nums1).\nLine 2: space-separated integers (nums2).",
    outputFormat: "Space-separated next greater integers (or -1 if none).",
    constraints: ["1 <= len(nums1) <= len(nums2) <= 1000", "All integers in nums1 and nums2 are unique"],
    hint: "Scan nums2 from left to right using a monotonic decreasing stack. When you find an element x greater than the stack's top, pop it and register x as the next greater element in a hash map.",
    starterCode: `def next_greater_element(nums1, nums2):
    stack = []
    nxt_greater = {}
    for num in nums2:
        while stack and stack[-1] < num:
            nxt_greater[stack.pop()] = num
        stack.append(num)
    return [nxt_greater.get(num, -1) for num in nums1]

nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
print(*next_greater_element(nums1, nums2))`,
    testInput: "4 1 2\n1 3 4 2\n",
    expectedOutput: "-1 3 -1",
    explanation: "For 4: no greater element in nums2. For 1: next greater is 3. For 2: no greater element to its right.",
    complexity: { time: "O(n + m) where n=len(nums1), m=len(nums2)", space: "O(m)" },
    commonMistakes: ["Using nested loops which runs in O(n * m) instead of the stack-based O(n + m) linear approach."]
  },
  lc150: {
    id: "lc150",
    title: "LC 150 - Evaluate Reverse Polish Notation",
    url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    statement: "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are '+', '-', '*', and '/'. division should truncate toward zero.",
    inputFormat: "Space-separated tokens.",
    outputFormat: "A single integer result.",
    constraints: ["1 <= len(tokens) <= 10^4", "division truncates toward zero (e.g. int(a / b) in Python)."],
    hint: "Use a stack. Traverse tokens. If token is a number, push it. If it is an operator, pop two operands, apply the operator, and push the result back.",
    starterCode: `def eval_rpn(tokens):
    stack = []
    for token in tokens:
        if token in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(token))
    return stack[0]

tokens = input().split()
print(eval_rpn(tokens))`,
    testInput: "2 1 + 3 *\n",
    expectedOutput: "9",
    explanation: "((2 + 1) * 3) = 9.",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Confusing the operand order: the first popped element is the right operand (b), and the second is the left operand (a).", "Using integer floor division (a // b) instead of floating-point truncation division int(a / b) for negative results in Python (e.g., -6 // 132 is -1, but int(-6 / 132) is 0)."]
  },

  // Day 9 Session 2
  lc232: {
    id: "lc232",
    title: "LC 232 - Implement Queue using Stacks",
    url: "https://leetcode.com/problems/implement-queue-using-stacks/",
    statement: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
    inputFormat: "Queries representing queue operations: push X, pop, peek, empty.",
    outputFormat: "Print the output for each pop, peek, or empty query.",
    constraints: ["At most 100 queries"],
    hint: "Maintain two stacks: instack and outstack. Push always goes to instack. To pop/peek: if outstack is empty, pop everything from instack into outstack, then pop/peek from outstack.",
    starterCode: `class MyQueue:
    def __init__(self):
        self.instack = []
        self.outstack = []
        
    def push(self, x: int) -> None:
        self.instack.append(x)
        
    def pop(self) -> int:
        self.peek()
        return self.outstack.pop()
        
    def peek(self) -> int:
        if not self.outstack:
            while self.instack:
                self.outstack.append(self.instack.pop())
        return self.outstack[-1]
        
    def empty(self) -> bool:
        return not self.instack and not self.outstack

q = MyQueue()
# Simple simulated inputs
q.push(1)
q.push(2)
print(q.peek())
print(q.pop())
print("true" if q.empty() else "false")`,
    testInput: "",
    expectedOutput: "1\n1\nfalse",
    explanation: "Simulated sequence: push 1, push 2, peek (1), pop (1), empty (false, since 2 remains).",
    complexity: { time: "O(1) amortized", space: "O(n)" },
    commonMistakes: ["Moving elements back and forth on every push, making push O(n) instead of the optimal O(1) amortized."]
  },
  lc641: {
    id: "lc641",
    title: "LC 641 - Design Circular Deque",
    url: "https://leetcode.com/problems/design-circular-deque/",
    statement: "Design your implementation of the circular double-ended queue (deque). Support insertion, deletion, front/rear retrieval, capacity checks.",
    inputFormat: "Manual instantiation checks.",
    outputFormat: "Expected output validations.",
    constraints: ["1 <= k <= 1000"],
    hint: "Use an array of size k, keeping track of front and rear index positions. Track size explicitly to distinguish between empty and full states.",
    starterCode: `class MyCircularDeque:
    def __init__(self, k: int):
        self.k = k
        self.arr = [0] * k
        self.front = 0
        self.rear = 0
        self.size = 0

    def insertFront(self, value: int) -> bool:
        if self.isFull(): return False
        self.front = (self.front - 1 + self.k) % self.k
        self.arr[self.front] = value
        self.size += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.isFull(): return False
        self.arr[self.rear] = value
        self.rear = (self.rear + 1) % self.k
        self.size += 1
        return True

    def deleteFront(self) -> bool:
        if self.isEmpty(): return False
        self.front = (self.front + 1) % self.k
        self.size -= 1
        return True

    def deleteLast(self) -> bool:
        if self.isEmpty(): return False
        self.rear = (self.rear - 1 + self.k) % self.k
        self.size -= 1
        return True

    def getFront(self) -> int:
        return -1 if self.isEmpty() else self.arr[self.front]

    def getRear(self) -> int:
        return -1 if self.isEmpty() else self.arr[(self.rear - 1 + self.k) % self.k]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.k

dq = MyCircularDeque(3)
print(dq.insertLast(1))
print(dq.insertLast(2))
print(dq.insertFront(3))
print(dq.insertFront(4)) # fails, full
print(dq.getRear())
print(dq.isFull())
`,
    testInput: "",
    expectedOutput: "True\nTrue\nTrue\nFalse\n2\nTrue",
    explanation: "Simulated Circular Deque tests.",
    complexity: { time: "O(1) all operations", space: "O(k)" },
    commonMistakes: ["Off-by-one errors when dealing with circular pointer wrapping arithmetic."]
  },

  // Day 10 Session 1
  lc206: {
    id: "lc206",
    title: "LC 206 - Reverse Linked List",
    url: "https://leetcode.com/problems/reverse-linked-list/",
    statement: "Given the head of a singly linked list, reverse the list, and return the reversed list. Solve iteratively.",
    inputFormat: "Space-separated values representing the linked list.",
    outputFormat: "Space-separated reversed linked list values.",
    constraints: ["0 <= number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
    hint: "Maintain three pointers: prev (starts at None), curr (starts at head), and next_node. At each step, record next_node = curr.next, flip curr.next = prev, slide prev = curr, and move curr = next_node.",
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

# Helpers to build and print lists
values = list(map(int, input().split()))
if not values:
    print("")
else:
    head = ListNode(values[0])
    curr = head
    for val in values[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    
    rev = reverse_list(head)
    ans = []
    while rev:
        ans.append(rev.val)
        rev = rev.next
    print(*ans)`,
    testInput: "1 2 3 4 5\n",
    expectedOutput: "5 4 3 2 1",
    explanation: "Iteratively updating links flips 1->2->3->4->5 into 5->4->3->2->1.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Losing reference to the remaining list: ensure you record curr.next in a temp variable before re-assigning it."]
  },
  lc141: {
    id: "lc141",
    title: "LC 141 - Linked List Cycle",
    url: "https://leetcode.com/problems/linked-list-cycle/",
    statement: "Given head, the head of a linked list, determine if the linked list has a cycle in it. Solve in O(1) memory.",
    inputFormat: "Simulated test inputs.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["0 <= number of nodes <= 10^4"],
    hint: "Use Floyd's Cycle Finding Algorithm (two pointers). The slow pointer moves one step at a time, and the fast pointer moves two steps. If there is a cycle, they will meet.",
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def has_cycle(head):
    if not head or not head.next:
        return False
    slow = head
    fast = head.next
    while slow != fast:
        if not fast or not fast.next:
            return False
        slow = slow.next
        fast = fast.next.next
    return True

# Simple simulated cycle tests
h = ListNode(3)
h.next = ListNode(2)
h.next.next = ListNode(0)
h.next.next.next = ListNode(-4)
h.next.next.next.next = h.next # cycle back to node 2
print("true" if has_cycle(h) else "false")`,
    testInput: "",
    expectedOutput: "true",
    explanation: "A cycle exists linking the tail back to node 2.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using a hash set (which takes O(n) memory) instead of the Floyd cycle detection O(1) space constraint."]
  },
  lc21: {
    id: "lc21",
    title: "LC 21 - Merge Two Sorted Lists",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    statement: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
    inputFormat: "Line 1: space-separated integers for list1.\nLine 2: space-separated integers for list2.",
    outputFormat: "Space-separated merged sorted list values.",
    constraints: ["0 <= number of nodes <= 50", "nodes are sorted"],
    hint: "Use a dummy head node. Compare list1.val and list2.val. Attach the smaller node to the dummy's tail, and advance that list's pointer.",
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    dummy = ListNode(-1)
    curr = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    curr.next = list1 if list1 else list2
    return dummy.next

def make_list(vals):
    if not vals: return None
    h = ListNode(vals[0])
    c = h
    for v in vals[1:]:
        c.next = ListNode(v)
        c = c.next
    return h

v1 = list(map(int, input().split()))
v2 = list(map(int, input().split()))
l1 = make_list(v1)
l2 = make_list(v2)
res = merge_two_lists(l1, l2)
ans = []
while res:
    ans.append(res.val)
    res = res.next
print(*ans)`,
    testInput: "1 2 4\n1 3 4\n",
    expectedOutput: "1 1 2 3 4 4",
    explanation: "Merging [1,2,4] and [1,3,4] yields [1,1,2,3,4,4].",
    complexity: { time: "O(n + m)", space: "O(1)" },
    commonMistakes: ["Creating new nodes instead of simply rearranging pointer attachments."]
  },

  // Day 10 Session 2
  lc509: {
    id: "lc509",
    title: "LC 509 - Fibonacci Number",
    url: "https://leetcode.com/problems/fibonacci-number/",
    statement: "Calculate the n-th Fibonacci number. Solve recursively, then optimize.",
    inputFormat: "A single integer n.",
    outputFormat: "A single integer output.",
    constraints: ["0 <= n <= 30"],
    hint: "F(n) = F(n-1) + F(n-2). Use memoization to avoid redundant calls.",
    starterCode: `def fib(n):
    if n <= 1:
        return n
    # DP solution
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

n = int(input())
print(fib(n))`,
    testInput: "4\n",
    expectedOutput: "3",
    explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using simple exponential recursion O(2^n) without memoization, causing stack overflows or TLE for larger n."]
  },
  lc231: {
    id: "lc231",
    title: "LC 231 - Power of Two",
    url: "https://leetcode.com/problems/power-of-two/",
    statement: "Given an integer n, return true if it is a power of two. Otherwise, return false.",
    inputFormat: "A single integer n.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    hint: "A power of two in binary representation has exactly one bit set to 1. Check: n > 0 and (n & (n - 1)) == 0.",
    starterCode: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

n = int(input())
print("true" if is_power_of_two(n) else "false")`,
    testInput: "16\n",
    expectedOutput: "true",
    explanation: "16 = 2^4.",
    complexity: { time: "O(1)", space: "O(1)" },
    commonMistakes: ["Using loops or floating division which are slow and can introduce precision bugs."]
  },

  // Day 11 Session 1
  lc78: {
    id: "lc78",
    title: "LC 78 - Subsets",
    url: "https://leetcode.com/problems/subsets/",
    statement: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    inputFormat: "Space-separated integers representing nums.",
    outputFormat: "Print each subset on a new line (sort subsets and values inside them for output testing).",
    constraints: ["1 <= len(nums) <= 10", "All elements of nums are unique"],
    hint: "Use backtracking. For each element, you have two choices: include it in the current subset, or exclude it.",
    starterCode: `def subsets(nums):
    res = []
    subset = []
    def dfs(i):
        if i >= len(nums):
            res.append(subset.copy())
            return
        # Choice 1: include nums[i]
        subset.append(nums[i])
        dfs(i + 1)
        # Choice 2: exclude nums[i] (backtrack)
        subset.pop()
        dfs(i + 1)
    
    dfs(0)
    return [sorted(s) for s in res]

nums = list(map(int, input().split()))
ans = subsets(nums)
ans = sorted(ans, key=lambda x: (len(x), x))
for s in ans:
    print(s)`,
    testInput: "1 2 3\n",
    expectedOutput: "[]\n[1]\n[2]\n[3]\n[1, 2]\n[1, 3]\n[2, 3]\n[1, 2, 3]",
    explanation: "The subsets are generated by choosing to include/exclude elements recursively.",
    complexity: { time: "O(n * 2^n)", space: "O(n)" },
    commonMistakes: ["Forgetting to append a copy (subset.copy()) to the result array: if you append subset, you append a reference that will change as you backtrack."]
  },
  lc46: {
    id: "lc46",
    title: "LC 46 - Permutations",
    url: "https://leetcode.com/problems/permutations/",
    statement: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Print each permutation on a new line.",
    constraints: ["1 <= len(nums) <= 6"],
    hint: "Use backtracking. Swap elements in-place to choose which one goes at the current position, recurse for the remainder, and swap back to backtrack.",
    starterCode: `def permute(nums):
    res = []
    def backtrack(start):
        if start == len(nums):
            res.append(nums.copy())
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start] # undo
    backtrack(0)
    return sorted(res)

nums = list(map(int, input().split()))
ans = permute(nums)
for p in ans:
    print(p)`,
    testInput: "1 2 3\n",
    expectedOutput: "[1, 2, 3]\n[1, 3, 2]\n[2, 1, 3]\n[2, 3, 1]\n[3, 1, 2]\n[3, 2, 1]",
    explanation: "Backtracking swaps generate all 6 permutations.",
    complexity: { time: "O(n * n!)", space: "O(n)" },
    commonMistakes: ["Failing to backtrack (not restoring state by swapping back), which breaks search correctness."]
  },

  // Day 11 Session 2
  lc455: {
    id: "lc455",
    title: "LC 455 - Assign Cookies",
    url: "https://leetcode.com/problems/assign-cookies/",
    statement: "Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Maximize content children.",
    inputFormat: "Line 1: space-separated integers g (greed factors).\nLine 2: space-separated integers s (cookie sizes).",
    outputFormat: "Print count of content children.",
    constraints: ["1 <= len(g), len(s) <= 3 * 10^4"],
    hint: "Sort both greed factors and cookie sizes. Use a greedy approach: try to satisfy the child with the smallest greed factor using the smallest possible cookie.",
    starterCode: `def find_content_children(g, s):
    g.sort()
    s.sort()
    child_i = cookie_i = 0
    while child_i < len(g) and cookie_i < len(s):
        if s[cookie_i] >= g[child_i]:
            child_i += 1
        cookie_i += 1
    return child_i

g = list(map(int, input().split()))
s = list(map(int, input().split()))
print(find_content_children(g, s))`,
    testInput: "1 2 3\n1 1\n",
    expectedOutput: "1",
    explanation: "Two cookies are size 1. Child 1 has greed 1, gets satisfied. Child 2 and 3 can't be satisfied. Result is 1.",
    complexity: { time: "O(n log n + m log m)", space: "O(1) auxiliary" },
    commonMistakes: ["Checking cookies unsorted, which fails to guarantee optimal allocations."]
  },
  lc122: {
    id: "lc122",
    title: "LC 122 - Best Time to Buy and Sell Stock II",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    statement: "You are given an integer array prices where prices[i] is the price of a given stock on the i-th day. You can buy and sell multiple times. Find max profit.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Max profit.",
    constraints: ["1 <= len(prices) <= 3 * 10^4"],
    hint: "Since you can buy and sell on the same day, you can accumulate profit from every upward price slope. Sum up all instances where prices[i] > prices[i-1].",
    starterCode: `def max_profit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit

prices = list(map(int, input().split()))
print(max_profit(prices))`,
    testInput: "7 1 5 3 6 4\n",
    expectedOutput: "7",
    explanation: "Buy prices[1]=1, sell prices[2]=5 (profit = 4). Buy prices[3]=3, sell prices[4]=6 (profit = 3). Total is 7.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Trying to find the single global buy and sell day (which is the solution to Buy and Sell Stock I, not II)."]
  },
  lc56: {
    id: "lc56",
    title: "LC 56 - Merge Intervals",
    url: "https://leetcode.com/problems/merge-intervals/",
    statement: "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals.",
    inputFormat: "Line 1: integer n (number of intervals).\nNext n lines: space-separated start and end of intervals.",
    outputFormat: "Print merged intervals on new lines.",
    constraints: ["1 <= n <= 10^4"],
    hint: "Sort the intervals by their start times first. Iterate through the sorted intervals; if the current interval overlaps with the last merged one, merge them by updating the end time.",
    starterCode: `def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    return merged

n = int(input())
intervals = []
for _ in range(n):
    intervals.append(list(map(int, input().split())))
ans = merge_intervals(intervals)
for interval in ans:
    print(*interval)`,
    testInput: "4\n1 3\n2 6\n8 10\n15 18\n",
    expectedOutput: "1 6\n8 10\n15 18",
    explanation: "Intervals [1,3] and [2,6] overlap; they are merged into [1,6].",
    complexity: { time: "O(n log n)", space: "O(log n) or O(n) for sorting" },
    commonMistakes: ["Forgetting to sort intervals by start time before merging, resulting in incorrect merges."]
  }
};
