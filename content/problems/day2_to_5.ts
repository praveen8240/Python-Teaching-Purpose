import { PracticeProblem } from "@/types/lesson";

export const day2_to_5Problems: Record<string, PracticeProblem> = {
  // Day 2 Session 1
  lc189: {
    id: "lc189",
    title: "LC 189 - Rotate Array",
    url: "https://leetcode.com/problems/rotate-array/",
    statement: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Modifies the array in-place.",
    inputFormat: "Line 1: space-separated integers.\nLine 2: single integer k.",
    outputFormat: "Print the rotated list as space-separated integers.",
    constraints: ["1 <= len(nums) <= 10^5", "0 <= k <= 10^5"],
    hint: "If you reverse the whole array, then reverse the first k elements, and reverse the remaining elements, what happens?",
    starterCode: `def rotate(nums, k):
    # Modify nums in-place
    n = len(nums)
    k %= n
    def reverse(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1
    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)

nums = list(map(int, input().split()))
k = int(input())
rotate(nums, k)
print(*nums)`,
    testInput: "1 2 3 4 5 6 7\n3\n",
    expectedOutput: "5 6 7 1 2 3 4",
    explanation: "Reversing the entire array gives [7, 6, 5, 4, 3, 2, 1]. Reversing the first 3 gives [5, 6, 7, 4, 3, 2, 1]. Reversing the rest gives [5, 6, 7, 1, 2, 3, 4].",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using slicing like nums = nums[-k:] + nums[:-k] which creates a new list instead of in-place modifications.", "Forgetting k %= len(nums) causing index out of bounds."]
  },
  lc26: {
    id: "lc26",
    title: "LC 26 - Remove Duplicates from Sorted Array",
    url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    statement: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements k.",
    inputFormat: "Space-separated sorted integers on a single line.",
    outputFormat: "Line 1: integer k (number of unique elements).\nLine 2: the first k elements of the modified array.",
    constraints: ["1 <= len(nums) <= 3 * 10^4", "nums is sorted in non-decreasing order"],
    hint: "Use a two-pointer approach: a slow pointer to track where the next unique element goes, and a fast pointer to scan.",
    starterCode: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

nums = list(map(int, input().split()))
k = remove_duplicates(nums)
print(k)
print(nums[:k])`,
    testInput: "1 1 2 2 3\n",
    expectedOutput: "3\n[1, 2, 3]",
    explanation: "The unique elements are 1, 2, and 3. The first 3 elements of the array are modified to be [1, 2, 3].",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Creating a new list or using set() which violates the O(1) extra space constraint.", "Incorrectly returning the last index instead of the count (index + 1)."]
  },

  // Day 2 Session 2
  lc303: {
    id: "lc303",
    title: "LC 303 - Range Sum Query Immutable",
    url: "https://leetcode.com/problems/range-sum-query-immutable/",
    statement: "Given an integer array nums, handle multiple queries of calculating the sum of elements of nums between indices left and right inclusive. Optimize for query time.",
    inputFormat: "Line 1: space-separated integers (nums).\nLine 2: integer q (number of queries).\nNext q lines: space-separated left and right indices.",
    outputFormat: "Print the sum for each query on a new line.",
    constraints: ["1 <= len(nums) <= 10^4", "1 <= q <= 10^4", "0 <= left <= right < len(nums)"],
    hint: "Precompute a prefix sum array where prefix[i] = nums[0] + ... + nums[i-1]. Then query sum(L, R) = prefix[R+1] - prefix[L].",
    starterCode: `class NumArray:
    def __init__(self, nums):
        self.pref = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.pref[i+1] = self.pref[i] + nums[i]
            
    def sum_range(self, left, right):
        return self.pref[right+1] - self.pref[left]

nums = list(map(int, input().split()))
q = int(input())
num_arr = NumArray(nums)
for _ in range(q):
    l, r = map(int, input().split())
    print(num_arr.sum_range(l, r))`,
    testInput: "-2 0 3 -5 2 -1\n3\n0 2\n2 5\n0 5\n",
    expectedOutput: "1\n-1\n-3",
    explanation: "Prefix array is [0, -2, -2, 1, -4, -2, -3]. sumRange(0,2) = 1 - 0 = 1. sumRange(2,5) = -3 - (-2) = -1. sumRange(0,5) = -3 - 0 = -3.",
    complexity: { time: "O(1) per query, O(n) initialization", space: "O(n)" },
    commonMistakes: ["Recalculating the sum using a loop in sum_range, resulting in O(n) per query and TLE."]
  },
  lc238: {
    id: "lc238",
    title: "LC 238 - Product of Array Except Self",
    url: "https://leetcode.com/problems/product-of-array-except-self/",
    statement: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",
    inputFormat: "Space-separated integers representing nums.",
    outputFormat: "Space-separated integers representing the answer.",
    constraints: ["2 <= len(nums) <= 10^5", "-30 <= nums[i] <= 30"],
    hint: "Use prefix and suffix products. For any element, the answer is prefix_product[i-1] * suffix_product[i+1].",
    starterCode: `def product_except_self(nums):
    n = len(nums)
    ans = [1] * n
    # Prefix products
    curr = 1
    for i in range(n):
        ans[i] = curr
        curr *= nums[i]
    # Suffix products
    curr = 1
    for i in range(n - 1, -1, -1):
        ans[i] *= curr
        curr *= nums[i]
    return ans

nums = list(map(int, input().split()))
print(*product_except_self(nums))`,
    testInput: "1 2 3 4\n",
    expectedOutput: "24 12 8 6",
    explanation: "Prefix products of [1, 2, 3, 4] are [1, 1, 2, 6] and suffix products are [24, 12, 4, 1] (working backward). Multiplying them yields [24, 12, 8, 6].",
    complexity: { time: "O(n)", space: "O(1) auxiliary" },
    commonMistakes: ["Using division, which fails if the input contains zero and violates the problem constraint.", "Using a nested loop resulting in O(n^2) complexity and TLE."]
  },
  lc27: {
    id: "lc27",
    title: "LC 27 - Remove Element",
    url: "https://leetcode.com/problems/remove-element/",
    statement: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.",
    inputFormat: "Line 1: space-separated integers (nums)\nLine 2: integer val",
    outputFormat: "Line 1: integer k\nLine 2: first k elements of nums",
    constraints: ["0 <= len(nums) <= 100", "0 <= nums[i] <= 50", "0 <= val <= 100"],
    hint: "Use a pointer 'slow' that keeps track of where the next non-val element should be placed while 'fast' iterates through the array.",
    starterCode: `def remove_element(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow

nums = list(map(int, input().split()))
val = int(input())
k = remove_element(nums, val)
print(k)
print(nums[:k])`,
    testInput: "3 2 2 3\n3\n",
    expectedOutput: "2\n[2, 2]",
    explanation: "The elements not equal to 3 are 2 and 2. Thus, k = 2.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Trying to use nums.remove(val) in a loop, which is O(n^2) and causes index shifting bugs."]
  },
  lc88: {
    id: "lc88",
    title: "LC 88 - Merge Sorted Array",
    url: "https://leetcode.com/problems/merge-sorted-array/",
    statement: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\nMerge nums1 and nums2 into a single array sorted in non-decreasing order. Modify nums1 in-place.",
    inputFormat: "Line 1: m elements of nums1 followed by n zeros\nLine 2: integer m\nLine 3: n elements of nums2\nLine 4: integer n",
    outputFormat: "Print the modified nums1 array.",
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 <= m, n <= 200"],
    hint: "If you merge from the front, you might overwrite elements in nums1. Try merging from the back (right to left) using 3 pointers.",
    starterCode: `def merge(nums1, m, nums2, n):
    p1 = m - 1
    p2 = n - 1
    p = m + n - 1
    
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
        
    # If any elements remain in nums2, copy them over
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1

nums1 = list(map(int, input().split()))
m = int(input())
nums2 = list(map(int, input().split()))
n = int(input())
merge(nums1, m, nums2, n)
print(nums1)`,
    testInput: "1 2 3 0 0 0\n3\n2 5 6\n3\n",
    expectedOutput: "[1, 2, 2, 3, 5, 6]",
    explanation: "We merge [1,2,3] and [2,5,6]. Working backwards prevents us from overwriting values in nums1 that we haven't processed yet.",
    complexity: { time: "O(m + n)", space: "O(1)" },
    commonMistakes: ["Merging from the front and having to shift elements O(n^2)", "Forgetting to copy the remaining elements of nums2 if nums1 exhausts first."]
  },
  lc121: {
    id: "lc121",
    title: "LC 121 - Best Time to Buy and Sell Stock",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.",
    inputFormat: "Space-separated integers representing prices.",
    outputFormat: "Integer representing the max profit.",
    constraints: ["1 <= len(prices) <= 10^5", "0 <= prices[i] <= 10^4"],
    hint: "As you iterate through the prices, keep track of the minimum price seen so far. At each step, calculate the profit if you sold today and update the maximum profit.",
    starterCode: `def max_profit(prices):
    if not prices: return 0
    
    min_price = float('inf')
    max_prof = 0
    
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_prof:
            max_prof = price - min_price
            
    return max_prof

prices = list(map(int, input().split()))
print(max_profit(prices))`,
    testInput: "7 1 5 3 6 4\n",
    expectedOutput: "5",
    explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using nested loops to check all pairs of days, which is O(n^2) and gives TLE."]
  },
  lc66: {
    id: "lc66",
    title: "LC 66 - Plus One",
    url: "https://leetcode.com/problems/plus-one/",
    statement: "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. Increment the large integer by one and return the resulting array of digits.",
    inputFormat: "Space-separated digits on a single line.",
    outputFormat: "Space-separated array of resulting digits.",
    constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9"],
    hint: "Start from the rightmost digit. If it is 9, it becomes 0 and you carry 1 to the left. If it is not 9, just add 1 and you are done!",
    starterCode: `def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] == 9:
            digits[i] = 0
        else:
            digits[i] += 1
            return digits
    return [1] + digits

digits = list(map(int, input().split()))
print(*plus_one(digits))`,
    testInput: "1 2 9\n",
    expectedOutput: "1 3 0",
    explanation: "129 + 1 = 130. We iterate from the back, change 9 to 0, then increment 2 to 3 and return.",
    complexity: { time: "O(n)", space: "O(1) in-place, or O(n) if resizing" },
    commonMistakes: ["Converting the array to an integer, adding 1, and converting back to an array (can cause overflow in other languages, though Python handles arbitrarily large ints)."]
  },
  lc977: {
    id: "lc977",
    title: "LC 977 - Squares of a Sorted Array",
    url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
    statement: "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    inputFormat: "Space-separated integers sorted in non-decreasing order.",
    outputFormat: "Space-separated integers representing sorted squares.",
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    hint: "Because the array is sorted, the largest squares will be at the extreme ends (either very negative or very positive). Use two pointers starting at the ends and build the result array from back to front.",
    starterCode: `def sorted_squares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    
    for i in range(n - 1, -1, -1):
        if abs(nums[left]) > abs(nums[right]):
            result[i] = nums[left] ** 2
            left += 1
        else:
            result[i] = nums[right] ** 2
            right -= 1
            
    return result

nums = list(map(int, input().split()))
print(*sorted_squares(nums))`,
    testInput: "-4 -1 0 3 10\n",
    expectedOutput: "0 1 9 16 100",
    explanation: "Squares are 16, 1, 0, 9, 100. After sorting, it becomes 0, 1, 9, 16, 100. The two-pointer approach avoids sorting which would be O(n log n).",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Squaring elements and then using .sort(), which gives O(n log n) time instead of the optimal O(n)."]
  },
  lc1480: {
    id: "lc1480",
    title: "LC 1480 - Running Sum of 1d Array",
    url: "https://leetcode.com/problems/running-sum-of-1d-array/",
    statement: "Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]). Return the running sum of nums.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Space-separated running sum integers.",
    constraints: ["1 <= nums.length <= 1000", "-10^6 <= nums[i] <= 10^6"],
    hint: "You can modify the array in-place or create a new array where each element is the sum of the current element and the previous running sum.",
    starterCode: `def running_sum(nums):
    for i in range(1, len(nums)):
        nums[i] += nums[i-1]
    return nums

nums = list(map(int, input().split()))
print(*running_sum(nums))`,
    testInput: "1 2 3 4\n",
    expectedOutput: "1 3 6 10",
    explanation: "Running sums are: [1, 1+2, 1+2+3, 1+2+3+4] = [1, 3, 6, 10].",
    complexity: { time: "O(n)", space: "O(1) in-place" },
    commonMistakes: ["Re-summing from index 0 to i for every element (O(n^2))."]
  },
  lc724: {
    id: "lc724",
    title: "LC 724 - Find Pivot Index",
    url: "https://leetcode.com/problems/find-pivot-index/",
    statement: "Given an array of integers nums, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right. If no such index exists, return -1.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Integer representing the pivot index.",
    constraints: ["1 <= nums.length <= 10^4", "-1000 <= nums[i] <= 1000"],
    hint: "Total sum = left_sum + pivot_value + right_sum. Thus, right_sum = total_sum - left_sum - pivot_value.",
    starterCode: `def pivot_index(nums):
    total = sum(nums)
    left_sum = 0
    for i, x in enumerate(nums):
        if left_sum == (total - left_sum - x):
            return i
        left_sum += x
    return -1

nums = list(map(int, input().split()))
print(pivot_index(nums))`,
    testInput: "1 7 3 6 5 6\n",
    expectedOutput: "3",
    explanation: "Left sum of index 3 (value 6) is 1+7+3 = 11. Right sum is 5+6 = 11.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Recalculating sum for left and right halves on every iteration (O(n^2))."]
  },
  lc1109: {
    id: "lc1109",
    title: "LC 1109 - Corporate Flight Bookings",
    url: "https://leetcode.com/problems/corporate-flight-bookings/",
    statement: "There are n flights numbered from 1 to n. You are given an array of flight bookings bookings, where bookings[i] = [first_i, last_i, seats_i] represents a booking for flights first_i through last_i (inclusive) with seats_i seats reserved. Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.",
    inputFormat: "Line 1: n\nLine 2: number of bookings\nNext lines: first last seats",
    outputFormat: "Space-separated integers of reserved seats.",
    constraints: ["1 <= n <= 2 * 10^4", "1 <= bookings.length <= 2 * 10^4"],
    hint: "This is a textbook difference array problem! Add seats to 'first', and subtract seats from 'last + 1'. Then run a prefix sum.",
    starterCode: `def corp_flight_bookings(bookings, n):
    diff = [0] * (n + 1)
    
    for first, last, seats in bookings:
        diff[first - 1] += seats
        diff[last] -= seats
        
    for i in range(1, n):
        diff[i] += diff[i-1]
        
    return diff[:-1]

n = int(input())
k = int(input())
bookings = []
for _ in range(k):
    bookings.append(list(map(int, input().split())))
print(*corp_flight_bookings(bookings, n))`,
    testInput: "5\n3\n1 2 10\n2 3 20\n2 5 25\n",
    expectedOutput: "10 55 45 25 25",
    explanation: "Flight 1 gets 10. Flight 2 gets 10+20+25=55. We use a difference array to mark +seats at 'first' and -seats at 'last+1'.",
    complexity: { time: "O(n + bookings.length)", space: "O(n)" },
    commonMistakes: ["Iterating from first to last for every booking, which takes O(n * bookings.length) causing TLE."]
  },

  // Day 3 Session 1
  lc1: {
    id: "lc1",
    title: "LC 1 - Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "Line 1: space-separated integers (nums).\nLine 2: single integer target.",
    outputFormat: "Two space-separated indices in ascending order.",
    constraints: ["2 <= len(nums) <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    hint: "Use a hash map to store elements and their indices. For each element x, look up if (target - x) is already in the map.",
    starterCode: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        diff = target - x
        if diff in seen:
            return [seen[diff], i]
        seen[x] = i
    return []

nums = list(map(int, input().split()))
target = int(input())
ans = two_sum(nums, target)
print(*ans)`,
    testInput: "2 7 11 15\n9\n",
    expectedOutput: "0 1",
    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Using a nested loop O(n^2) brute force which is too slow.", "Reusing the same element (e.g. if target is 8 and we have a 4, we must not match 4 with itself unless there are two 4s)."]
  },
  lc387: {
    id: "lc387",
    title: "LC 387 - First Unique Character in a String",
    url: "https://leetcode.com/problems/first-unique-character-in-a-string/",
    statement: "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    inputFormat: "A single string s.",
    outputFormat: "A single integer index.",
    constraints: ["1 <= len(s) <= 10^5", "s consists of only lowercase English letters."],
    hint: "Count character frequencies first. Then iterate through the string again to find the first character with a frequency of 1.",
    starterCode: `def first_uniq_char(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1

s = input().strip()
print(first_uniq_char(s))`,
    testInput: "leetcode\n",
    expectedOutput: "0",
    explanation: "The first character 'l' occurs only once in the string, at index 0.",
    complexity: { time: "O(n)", space: "O(1) since alphabet size is fixed to 26" },
    commonMistakes: ["Doing repeated string searches like s.count(char) inside a loop, making it O(n^2)."]
  },

  // Day 3 Session 2
  lc49: {
    id: "lc49",
    title: "LC 49 - Group Anagrams",
    url: "https://leetcode.com/problems/group-anagrams/",
    statement: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    inputFormat: "Space-separated strings representing strs.",
    outputFormat: "Print each group of anagrams on a new line (sort groups and elements within them for consistency).",
    constraints: ["1 <= len(strs) <= 10^4", "0 <= len(strs[i]) <= 100"],
    hint: "Represent each string's character signature (e.g., sorted string or frequency array of size 26) as a dictionary key.",
    starterCode: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        # sorted string as key
        key = "".join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    
    # Sort groups for consistent output testing
    res = [sorted(g) for g in groups.values()]
    return sorted(res, key=lambda x: x[0])

strs = input().split()
ans = group_anagrams(strs)
for group in ans:
    print(*group)`,
    testInput: "eat tea tan ate nat bat\n",
    expectedOutput: "ate eat tea\nbat\nnat tan",
    explanation: "Group 1: eat, tea, ate (sorted key: aet). Group 2: tan, nat (sorted key: ant). Group 3: bat (sorted key: abt).",
    complexity: { time: "O(n * k log k) where k is word length", space: "O(n * k)" },
    commonMistakes: ["Using lists directly as dict keys in Python (lists are unhashable, use tuples or strings instead)."]
  },
  lc560: {
    id: "lc560",
    title: "LC 560 - Subarray Sum Equals K",
    url: "https://leetcode.com/problems/subarray-sum-equals-k/",
    statement: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
    inputFormat: "Line 1: space-separated integers.\nLine 2: integer k.",
    outputFormat: "Print a single integer representing the count.",
    constraints: ["1 <= len(nums) <= 2 * 10^4", "-1000 <= nums[i] <= 1000", "-10^7 <= k <= 10^7"],
    hint: "Use a prefix sum and a hash map. If prefix_sum[J] - prefix_sum[I] = k, then the subarray from I+1 to J sums to k. Look up (prefix_sum - k) in your map.",
    starterCode: `def subarray_sum(nums, k):
    counts = {0: 1}
    curr_sum = 0
    ans = 0
    for x in nums:
        curr_sum += x
        if curr_sum - k in counts:
            ans += counts[curr_sum - k]
        counts[curr_sum] = counts.get(curr_sum, 0) + 1
    return ans

nums = list(map(int, input().split()))
k = int(input())
print(subarray_sum(nums, k))`,
    testInput: "1 1 1\n2\n",
    expectedOutput: "2",
    explanation: "The subarrays are [1, 1] at indices [0, 1] and [1, 1] at indices [1, 2].",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Using a sliding window, which fails when the array contains negative numbers.", "Forgetting to initialize the hash map with {0: 1} to account for subarrays starting from index 0."]
  },
  lc136: {
    id: "lc136",
    title: "LC 136 - Single Number",
    url: "https://leetcode.com/problems/single-number/",
    statement: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. Solve in linear time and with O(1) space.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Print the single number.",
    constraints: ["1 <= len(nums) <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4"],
    hint: "XORing a number with itself cancels out: x ^ x = 0, and x ^ 0 = x. What happens if you XOR all elements together?",
    starterCode: `def single_number(nums):
    res = 0
    for x in nums:
        res ^= x
    return res

nums = list(map(int, input().split()))
print(single_number(nums))`,
    testInput: "4 1 2 1 2\n",
    expectedOutput: "4",
    explanation: "1^1 is 0. 2^2 is 0. 4^0 is 4. The result of XORing all numbers is 4.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using a set or hash map, which violates the O(1) space complexity constraint."]
  },
  lc217: {
    id: "lc217",
    title: "LC 217 - Contains Duplicate",
    url: "https://leetcode.com/problems/contains-duplicate/",
    statement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    inputFormat: "Space-separated integers.",
    outputFormat: "True or False.",
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    hint: "Add each number to a set. If a number is already in the set, you found a duplicate!",
    starterCode: `def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

nums = list(map(int, input().split()))
print(contains_duplicate(nums))`,
    testInput: "1 2 3 1\n",
    expectedOutput: "True",
    explanation: "The number 1 appears at indices 0 and 3.",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Using nested loops to compare every pair (O(n^2)).", "Sorting first (O(n log n)) when a set gives O(n)."]
  },
  lc349: {
    id: "lc349",
    title: "LC 349 - Intersection of Two Arrays",
    url: "https://leetcode.com/problems/intersection-of-two-arrays/",
    statement: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.",
    inputFormat: "Line 1: space-separated integers (nums1)\nLine 2: space-separated integers (nums2)",
    outputFormat: "Space-separated unique intersection elements.",
    constraints: ["1 <= nums.length <= 1000", "0 <= nums[i] <= 1000"],
    hint: "Convert both arrays to sets. The intersection of two sets gives you the common unique elements in O(n + m) time.",
    starterCode: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))

nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
result = intersection(nums1, nums2)
result.sort()
print(*result)`,
    testInput: "1 2 2 1\n2 2\n",
    expectedOutput: "2",
    explanation: "The intersection of {1, 2} and {2} is {2}.",
    complexity: { time: "O(n + m)", space: "O(n + m)" },
    commonMistakes: ["Not converting to sets, leading to duplicates in the result.", "Using nested loops for O(n * m) time."]
  },
  lc205: {
    id: "lc205",
    title: "LC 205 - Isomorphic Strings",
    url: "https://leetcode.com/problems/isomorphic-strings/",
    statement: "Given two strings s and t, determine if they are isomorphic. Two strings are isomorphic if the characters in s can be replaced to get t, preserving order. No two characters may map to the same character, but a character may map to itself.",
    inputFormat: "Line 1: string s\nLine 2: string t",
    outputFormat: "True or False.",
    constraints: ["1 <= s.length <= 5 * 10^4", "s.length == t.length"],
    hint: "Use two dictionaries: one mapping s→t and one mapping t→s. If a conflict arises in either direction, they are not isomorphic.",
    starterCode: `def is_isomorphic(s, t):
    s_to_t = {}
    t_to_s = {}
    for c1, c2 in zip(s, t):
        if c1 in s_to_t and s_to_t[c1] != c2:
            return False
        if c2 in t_to_s and t_to_s[c2] != c1:
            return False
        s_to_t[c1] = c2
        t_to_s[c2] = c1
    return True

s = input()
t = input()
print(is_isomorphic(s, t))`,
    testInput: "egg\nadd\n",
    expectedOutput: "True",
    explanation: "e→a, g→d. The mapping is consistent in both directions.",
    complexity: { time: "O(n)", space: "O(1) — at most 256 character mappings" },
    commonMistakes: ["Only checking one direction (s→t) and missing cases like 'ab' → 'aa'.", "Using index-based comparison which is harder to reason about."]
  },
  lc771: {
    id: "lc771",
    title: "LC 771 - Jewels and Stones",
    url: "https://leetcode.com/problems/jewels-and-stones/",
    statement: "You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.",
    inputFormat: "Line 1: string jewels\nLine 2: string stones",
    outputFormat: "Integer count of jewels in stones.",
    constraints: ["1 <= jewels.length, stones.length <= 50", "jewels and stones consist of only English letters", "All characters of jewels are unique"],
    hint: "Convert jewels to a set for O(1) lookup. Then iterate through stones and count matches.",
    starterCode: `def num_jewels_in_stones(jewels, stones):
    jewel_set = set(jewels)
    return sum(1 for s in stones if s in jewel_set)

jewels = input()
stones = input()
print(num_jewels_in_stones(jewels, stones))`,
    testInput: "aA\naAAbbbb\n",
    expectedOutput: "3",
    explanation: "'a' appears once and 'A' appears twice in stones → 3 jewels total.",
    complexity: { time: "O(j + s)", space: "O(j)" },
    commonMistakes: ["Nested loops checking each stone against each jewel character (O(j * s)).", "Forgetting that jewels is case-sensitive."]
  },

  // Day 4 Session 1
  lc344: {
    id: "lc344",
    title: "LC 344 - Reverse String",
    url: "https://leetcode.com/problems/reverse-string/",
    statement: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place.",
    inputFormat: "Space-separated characters.",
    outputFormat: "Space-separated reversed characters.",
    constraints: ["1 <= len(s) <= 10^5"],
    hint: "Use two pointers, one at the start and one at the end. Swap characters and move inwards.",
    starterCode: `def reverse_string(s):
    l, r = 0, len(s) - 1
    while l < r:
        s[l], s[r] = s[r], s[l]
        l += 1
        r -= 1

s = input().split()
reverse_string(s)
print(*s)`,
    testInput: "h e l l o\n",
    expectedOutput: "o l l e h",
    explanation: "We swap 'h' and 'o', then 'e' and 'l', resulting in 'o l l e h'.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Returning a new string or using s[::-1] which creates a copy instead of changing the array in-place."]
  },
  lc125: {
    id: "lc125",
    title: "LC 125 - Valid Palindrome",
    url: "https://leetcode.com/problems/valid-palindrome/",
    statement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    inputFormat: "A line of text representing the string s.",
    outputFormat: 'Print "true" if s is a palindrome, and "false" otherwise.',
    constraints: ["1 <= len(s) <= 2 * 10^5", "s consists only of printable ASCII characters."],
    hint: "Use two pointers. Skip non-alphanumeric characters using .isalnum() before checking for matches.",
    starterCode: `def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True

s = input()
print("true" if is_palindrome(s) else "false")`,
    testInput: "A man, a plan, a canal: Panama\n",
    expectedOutput: "true",
    explanation: "'amanaplanacanalpanama' is a palindrome.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Creating a fully filtered copy of the string first, which takes O(n) memory, instead of doing it in-place using pointers."]
  },

  // Day 4 Session 2
  lc242: {
    id: "lc242",
    title: "LC 242 - Valid Anagram",
    url: "https://leetcode.com/problems/valid-anagram/",
    statement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    inputFormat: "Line 1: string s.\nLine 2: string t.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= len(s), len(t) <= 5 * 10^4", "s and t consist of lowercase English letters."],
    hint: "Count character frequencies of both strings. They must be identical for the strings to be anagrams.",
    starterCode: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
    return True

s = input().strip()
t = input().strip()
print("true" if is_anagram(s, t) else "false")`,
    testInput: "anagram\nnagaram\n",
    expectedOutput: "true",
    explanation: "Both strings contain three 'a's, one 'g', one 'm', one 'n', and one 'r'.",
    complexity: { time: "O(n)", space: "O(1) because size of hash map is limited to 26 characters" },
    commonMistakes: ["Sorting both strings (O(n log n)) which works but is suboptimal compared to counting frequencies (O(n))."]
  },
  lc443: {
    id: "lc443",
    title: "LC 443 - String Compression",
    url: "https://leetcode.com/problems/string-compression/",
    statement: "Given an array of characters chars, compress it in-place. The length after compression must be returned, and the array modified.",
    inputFormat: "Space-separated characters.",
    outputFormat: "Print the length of compressed array, then the compressed array up to that length.",
    constraints: ["1 <= len(chars) <= 2000"],
    hint: "Use read and write pointers. Keep track of consecutive group lengths and write the count digits when a group ends.",
    starterCode: `def compress(chars):
    write = 0
    read = 0
    n = len(chars)
    while read < n:
        char = chars[read]
        count = 0
        while read < n and chars[read] == char:
            read += 1
            count += 1
        
        chars[write] = char
        write += 1
        if count > 1:
            for digit in str(count):
                chars[write] = digit
                write += 1
    return write

chars = input().split()
length = compress(chars)
print(length)
print(chars[:length])`,
    testInput: "a a b b c c c\n",
    expectedOutput: "6\n['a', '2', 'b', '2', 'c', '3']",
    explanation: "The groups are 'aa', 'bb', and 'ccc'. Compressed version is 'a2b2c3'.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Writing group counts greater than 9 as a single string instead of split individual digits."]
  },
  lc14: {
    id: "lc14",
    title: "LC 14 - Longest Common Prefix",
    url: "https://leetcode.com/problems/longest-common-prefix/",
    statement: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    inputFormat: "Space-separated strings.",
    outputFormat: "Print the prefix string (empty if none).",
    constraints: ["1 <= len(strs) <= 200", "0 <= len(strs[i]) <= 200"],
    hint: "Use vertical scanning: compare characters at index 0 of all strings, then index 1, and so on, until a mismatch occurs.",
    starterCode: `def longest_common_prefix(strs):
    if not strs:
        return ""
    for i in range(len(strs[0])):
        char = strs[0][i]
        for s in strs[1:]:
            if i >= len(s) or s[i] != char:
                return strs[0][:i]
    return strs[0]

strs = input().split()
print(longest_common_prefix(strs))`,
    testInput: "flower flow flight\n",
    expectedOutput: "fl",
    explanation: "The longest prefix shared by flower, flow, and flight is 'fl'.",
    complexity: { time: "O(s) where s is sum of characters in all strings", space: "O(1)" },
    commonMistakes: ["Not checking index out of bound conditions when checking strings of varying lengths."]
  },
  lc28: {
    id: "lc28",
    title: "LC 28 - Find Index of First Occurrence",
    url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    statement: "Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    inputFormat: "Line 1: haystack string\nLine 2: needle string",
    outputFormat: "Integer index.",
    constraints: ["1 <= haystack.length, needle.length <= 10^4"],
    hint: "Slide a window of length len(needle) across haystack and compare substrings.",
    starterCode: `def str_str(haystack, needle):
    n, m = len(haystack), len(needle)
    for i in range(n - m + 1):
        if haystack[i:i+m] == needle:
            return i
    return -1

haystack = input()
needle = input()
print(str_str(haystack, needle))`,
    testInput: "sadbutsad\nsad\n",
    expectedOutput: "0",
    explanation: "'sad' first occurs at index 0 in 'sadbutsad'.",
    complexity: { time: "O(n * m)", space: "O(m) for substring" },
    commonMistakes: ["Using haystack.find() or haystack.index() which hides the algorithmic thinking.", "Off-by-one: iterating up to len(haystack) instead of len(haystack) - len(needle) + 1."]
  },
  lc392: {
    id: "lc392",
    title: "LC 392 - Is Subsequence",
    url: "https://leetcode.com/problems/is-subsequence/",
    statement: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise. A subsequence is formed by deleting some (or no) characters from t without changing the order of the remaining characters.",
    inputFormat: "Line 1: string s\nLine 2: string t",
    outputFormat: "True or False.",
    constraints: ["0 <= s.length <= 100", "0 <= t.length <= 10^4"],
    hint: "Use a pointer for s. Scan through t; whenever t[j] matches s[i], advance i. If i reaches len(s), it's a subsequence.",
    starterCode: `def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and ch == s[i]:
            i += 1
    return i == len(s)

s = input()
t = input()
print(is_subsequence(s, t))`,
    testInput: "abc\nahbgdc\n",
    expectedOutput: "True",
    explanation: "'a', 'b', 'c' appear in order within 'ahbgdc'.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Trying to use 'in' operator which checks for substring, not subsequence."]
  },
  lc409: {
    id: "lc409",
    title: "LC 409 - Longest Palindrome",
    url: "https://leetcode.com/problems/longest-palindrome/",
    statement: "Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.",
    inputFormat: "A single string.",
    outputFormat: "Integer — max palindrome length.",
    constraints: ["1 <= s.length <= 2000"],
    hint: "Count character frequencies. Every character with an even count contributes fully. Odd counts contribute count-1. If any odd count exists, add 1 for the center.",
    starterCode: `from collections import Counter

def longest_palindrome(s):
    counts = Counter(s)
    length = 0
    has_odd = False
    for c in counts.values():
        length += c // 2 * 2
        if c % 2 == 1:
            has_odd = True
    return length + (1 if has_odd else 0)

s = input()
print(longest_palindrome(s))`,
    testInput: "abccccdd\n",
    expectedOutput: "7",
    explanation: "Use all 4 c's and 2 d's (6), plus 1 odd char in the center = 7 ('dccaccd').",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Forgetting the +1 for the center character when odd counts exist.", "Trying to actually construct the palindrome instead of just computing the length."]
  },

  // Day 5 Session 1
  lc167: {
    id: "lc167",
    title: "LC 167 - Two Sum II - Input Array Is Sorted",
    url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    statement: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
    inputFormat: "Line 1: space-separated sorted integers.\nLine 2: target integer.",
    outputFormat: "Two space-separated 1-based indices.",
    constraints: ["2 <= len(numbers) <= 3 * 10^4", "-1000 <= numbers[i] <= 1000", "numbers is sorted"],
    hint: "Since the array is sorted, initialize one pointer at the start and one at the end. Adjust them depending on whether the current sum is too small or too large.",
    starterCode: `def two_sum_ii(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        curr = numbers[l] + numbers[r]
        if curr == target:
            return [l + 1, r + 1]
        elif curr < target:
            l += 1
        else:
            r -= 1
    return []

numbers = list(map(int, input().split()))
target = int(input())
print(*two_sum_ii(numbers, target))`,
    testInput: "2 7 11 15\n9\n",
    expectedOutput: "1 2",
    explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using a hash map (O(n) auxiliary space) which works but doesn't take advantage of the constant space potential of sorted inputs."]
  },
  lc283: {
    id: "lc283",
    title: "LC 283 - Move Zeroes",
    url: "https://leetcode.com/problems/move-zeroes/",
    statement: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Must modify in-place.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Space-separated modified integers.",
    constraints: ["1 <= len(nums) <= 10^4"],
    hint: "Use a pointer to track the last positioned non-zero element. Scan the array; whenever you see a non-zero, swap it with the element at the non-zero tracker.",
    starterCode: `def move_zeroes(nums):
    last_non_zero = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[last_non_zero], nums[i] = nums[i], nums[last_non_zero]
            last_non_zero += 1

nums = list(map(int, input().split()))
move_zeroes(nums)
print(*nums)`,
    testInput: "0 1 0 3 12\n",
    expectedOutput: "1 3 12 0 0",
    explanation: "After moving zeroes to the end, the order of non-zeroes 1, 3, 12 is preserved.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using an extra list or removing items inside a loop (which shifts later elements and makes it O(n^2))."]
  },
  lc15: {
    id: "lc15",
    title: "LC 15 - 3Sum",
    url: "https://leetcode.com/problems/3sum/",
    statement: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and sum is zero. Triplets must be unique.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Print each triplet on a new line (sort triplets and elements inside them for consistency).",
    constraints: ["3 <= len(nums) <= 3000", "-10^5 <= nums[i] <= 10^5"],
    hint: "Sort the array first. Iterate through the array; for each element, use two pointers on the remaining elements to find pairs summing to its negation. Skip duplicate values.",
    starterCode: `def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]:
                    l += 1
                while l < r and nums[r] == nums[r-1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res

nums = list(map(int, input().split()))
ans = three_sum(nums)
ans = [sorted(t) for t in ans]
ans = sorted(ans)
for triplet in ans:
    print(*triplet)`,
    testInput: "-1 0 1 2 -1 -4\n",
    expectedOutput: "-1 -1 2\n-1 0 1",
    explanation: "The unique triplets summing to 0 are [-1, -1, 2] and [-1, 0, 1].",
    complexity: { time: "O(n^2)", space: "O(log n) to O(n) for sorting" },
    commonMistakes: ["Using a set of tuples to filter duplicates, which is memory intensive, instead of pointer duplicate-skipping."]
  },

  // Day 5 Session 2
  lc3: {
    id: "lc3",
    title: "LC 3 - Longest Substring Without Repeating Characters",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    inputFormat: "A single line containing s.",
    outputFormat: "Print a single integer representing length.",
    constraints: ["0 <= len(s) <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    hint: "Use sliding window with a hash map of character indices. If you find a duplicate char at index j, slide the start pointer i to max(i, last_seen_index + 1).",
    starterCode: `def length_of_longest_substring(s):
    char_map = {}
    l = 0
    ans = 0
    for r in range(len(s)):
        if s[r] in char_map:
            l = max(l, char_map[s[r]] + 1)
        char_map[s[r]] = r
        ans = max(ans, r - l + 1)
    return ans

s = input()
# Handline blank lines in input
if s.endswith('\\n'):
    s = s[:-1]
print(length_of_longest_substring(s))`,
    testInput: "abcabcbb\n",
    expectedOutput: "3",
    explanation: "The answer is 'abc', with the length of 3.",
    complexity: { time: "O(n)", space: "O(min(m, a)) where a is alphabet size" },
    commonMistakes: ["Not updating the left pointer correctly (e.g. setting left to raw character index without checking if it lies within current window)."]
  },
  lc209: {
    id: "lc209",
    title: "LC 209 - Minimum Size Subarray Sum",
    url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
    statement: "Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If none exists, return 0.",
    inputFormat: "Line 1: space-separated positive integers.\nLine 2: target integer.",
    outputFormat: "Print a single integer representing minimal length.",
    constraints: ["1 <= len(nums) <= 10^5", "1 <= nums[i] <= 10^4", "1 <= target <= 10^9"],
    hint: "Use a sliding window. Expand the window by moving the right pointer. Once sum >= target, contract the window from the left to find the minimum valid width.",
    starterCode: `def min_sub_array_len(target, nums):
    l = 0
    curr_sum = 0
    ans = float('inf')
    for r in range(len(nums)):
        curr_sum += nums[r]
        while curr_sum >= target:
            ans = min(ans, r - l + 1)
            curr_sum -= nums[l]
            l += 1
    return ans if ans != float('inf') else 0

nums = list(map(int, input().split()))
target = int(input())
print(min_sub_array_len(target, nums))`,
    testInput: "2 3 1 2 4 3\n7\n",
    expectedOutput: "2",
    explanation: "Subarray [4, 3] has sum 7 which satisfies the target, and length 2 is the minimum possible.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Trying to solve with binary search O(n log n) without realizing the O(n) sliding window is optimal since nums contains only positive integers."]
  }
};
