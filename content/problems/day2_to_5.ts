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
