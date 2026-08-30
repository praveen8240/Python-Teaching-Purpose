import { PracticeProblem } from "@/types/lesson";

export const day6_to_8Problems: Record<string, PracticeProblem> = {
  // Day 6 Session 1
  lc204: {
    id: "lc204",
    title: "LC 204 - Count Primes",
    url: "https://leetcode.com/problems/count-primes/",
    statement: "Given an integer n, return the number of prime numbers that are strictly less than n.",
    inputFormat: "A single integer n.",
    outputFormat: "A single integer count.",
    constraints: ["0 <= n <= 5 * 10^6"],
    hint: "Use the Sieve of Eratosthenes algorithm. Maintain a boolean list representing whether indices are prime. Mark multiples of each prime composite starting from its square.",
    starterCode: `def count_primes(n):
    if n <= 2:
        return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n, i):
                is_prime[j] = False
    return sum(is_prime)

n = int(input())
print(count_primes(n))`,
    testInput: "10\n",
    expectedOutput: "4",
    explanation: "There are 4 prime numbers less than 10, which are 2, 3, 5, 7.",
    complexity: { time: "O(n log log n)", space: "O(n)" },
    commonMistakes: ["Using simple trial division O(n sqrt(n)) inside a loop which results in TLE for large values of n."]
  },
  lc1979: {
    id: "lc1979",
    title: "LC 1979 - Find Greatest Common Divisor of Array",
    url: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
    statement: "Given an integer array nums, return the greatest common divisor of the smallest number and the largest number in nums.",
    inputFormat: "Space-separated integers representing nums.",
    outputFormat: "A single integer GCD.",
    constraints: ["2 <= len(nums) <= 1000", "1 <= nums[i] <= 1000"],
    hint: "Find the min and max of the array. Then use Euclid's recursive algorithm: gcd(a, b) = gcd(b, a % b) until b is 0.",
    starterCode: `def find_gcd(nums):
    mn = min(nums)
    mx = max(nums)
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a
    return gcd(mn, mx)

nums = list(map(int, input().split()))
print(find_gcd(nums))`,
    testInput: "2 5 6 9 10\n",
    expectedOutput: "2",
    explanation: "The smallest number is 2, the largest is 10. The greatest common divisor of 2 and 10 is 2.",
    complexity: { time: "O(n + log(min_val))", space: "O(1)" },
    commonMistakes: ["Implementing linear searches for the common divisor instead of using the log-time Euclid's algorithm."]
  },

  // Day 6 Session 2
  lc7: {
    id: "lc7",
    title: "LC 7 - Reverse Integer",
    url: "https://leetcode.com/problems/reverse-integer/",
    statement: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    inputFormat: "A single integer x.",
    outputFormat: "Print the reversed integer (or 0 if it overflows).",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    hint: "Extract digits using modulo and division. Multiply the accumulated result by 10 before adding the next digit. Handle signs and clamp boundaries.",
    starterCode: `def reverse(x):
    limit = 2**31
    sign = -1 if x < 0 else 1
    x = abs(x)
    res = 0
    while x:
        res = res * 10 + x % 10
        x //= 10
    res *= sign
    if res < -limit or res >= limit:
        return 0
    return res

x = int(input())
print(reverse(x))`,
    testInput: "-123\n",
    expectedOutput: "-321",
    explanation: "-123 reversed becomes -321, which falls within 32-bit limits.",
    complexity: { time: "O(log10(x))", space: "O(1)" },
    commonMistakes: ["Not checking the overflow boundaries, resulting in returning values exceeding 32-bit bounds."]
  },
  lc9: {
    id: "lc9",
    title: "LC 9 - Palindrome Number",
    url: "https://leetcode.com/problems/palindrome-number/",
    statement: "Given an integer x, return true if x is a palindrome, and false otherwise. Try to solve without converting the integer to a string.",
    inputFormat: "A single integer x.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    hint: "Negative numbers can never be palindromes. You can reverse the second half of the number and compare it to the first half to avoid full overflow issues.",
    starterCode: `def is_palindrome(x):
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    reverted = 0
    while x > reverted:
        reverted = reverted * 10 + x % 10
        x //= 10
    return x == reverted or x == reverted // 10

x = int(input())
print("true" if is_palindrome(x) else "false")`,
    testInput: "121\n",
    expectedOutput: "true",
    explanation: "121 reads as 121 from left to right and from right to left.",
    complexity: { time: "O(log10(x))", space: "O(1)" },
    commonMistakes: ["Converting the integer to string which violates the extra follow-up constraint."]
  },
  lc172: {
    id: "lc172",
    title: "LC 172 - Factorial Trailing Zeroes",
    url: "https://leetcode.com/problems/factorial-trailing-zeroes/",
    statement: "Given an integer n, return the number of trailing zeroes in n!. Note: solve in logarithmic time complexity.",
    inputFormat: "A single integer n.",
    outputFormat: "A single integer count.",
    constraints: ["0 <= n <= 10^4"],
    hint: "Trailing zeroes are produced by factors of 10, which come from prime pairs (2 * 5). Since factors of 2 are abundant, count factors of 5: n/5 + n/25 + n/125 + ...",
    starterCode: `def trailing_zeroes(n):
    count = 0
    while n >= 5:
        count += n // 5
        n //= 5
    return count

n = int(input())
print(trailing_zeroes(n))`,
    testInput: "5\n",
    expectedOutput: "1",
    explanation: "5! = 120, which has 1 trailing zero.",
    complexity: { time: "O(log5(n))", space: "O(1)" },
    commonMistakes: ["Calculating the actual factorial n! first, which runs in O(n) and causes overflow / memory blowouts."]
  },

  // Day 7 Session 1
  lc867: {
    id: "lc867",
    title: "LC 867 - Transpose Matrix",
    url: "https://leetcode.com/problems/transpose-matrix/",
    statement: "Given a 2D integer array matrix, return the transpose of matrix. The transpose of a matrix is the matrix flipped over its main diagonal, switching the row and column indices.",
    inputFormat: "Line 1: rows r and cols c.\nNext r lines: space-separated integers for each row.",
    outputFormat: "Output the transposed matrix row-by-row, space separated.",
    constraints: ["1 <= r, c <= 1000"],
    hint: "Create a new grid of dimensions c x r. For every cell (i, j) in the original, assign to transposed[j][i].",
    starterCode: `def transpose(matrix):
    r = len(matrix)
    c = len(matrix[0])
    ans = [[0] * r for _ in range(c)]
    for i in range(r):
        for j in range(c):
            ans[j][i] = matrix[i][j]
    return ans

r, c = map(int, input().split())
matrix = []
for _ in range(r):
    matrix.append(list(map(int, input().split())))
ans = transpose(matrix)
for row in ans:
    print(*row)`,
    testInput: "2 3\n1 2 3\n4 5 6\n",
    expectedOutput: "1 4\n2 5\n3 6",
    explanation: "Flipping over main diagonal switches rows [1,2,3] and [4,5,6] into columns.",
    complexity: { time: "O(r * c)", space: "O(r * c) for output matrix" },
    commonMistakes: ["Trying to transpose a non-square matrix in-place (in-place transposition only works on square matrices r == c)."]
  },
  lc48: {
    id: "lc48",
    title: "LC 48 - Rotate Image",
    url: "https://leetcode.com/problems/rotate-image/",
    statement: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.",
    inputFormat: "Line 1: single integer n.\nNext n lines: space-separated integers representing the matrix rows.",
    outputFormat: "Print the rotated matrix row-by-row, space separated.",
    constraints: ["1 <= n <= 20", "matrix.length == n", "matrix[i].length == n"],
    hint: "Flipping a matrix clockwise by 90 degrees is mathematically equivalent to: Transposing the matrix first, then reversing each row.",
    starterCode: `def rotate(matrix):
    n = len(matrix)
    # Step 1: Transpose in-place
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()

n = int(input())
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))
rotate(matrix)
for row in matrix:
    print(*row)`,
    testInput: "3\n1 2 3\n4 5 6\n7 8 9\n",
    expectedOutput: "7 4 1\n8 5 2\n9 6 3",
    explanation: "Transposing results in [[1,4,7], [2,5,8], [3,6,9]]. Reversing each row gives [[7,4,1], [8,5,2], [9,6,3]].",
    complexity: { time: "O(n^2)", space: "O(1)" },
    commonMistakes: ["Creating an extra matrix (O(n^2) space) instead of mutating in-place."]
  },
  lc54: {
    id: "lc54",
    title: "LC 54 - Spiral Matrix",
    url: "https://leetcode.com/problems/spiral-matrix/",
    statement: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    inputFormat: "Line 1: rows m and cols n.\nNext m lines: space-separated integers for each row.",
    outputFormat: "Output elements in spiral order, space separated.",
    constraints: ["1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    hint: "Define boundaries: top, bottom, left, right. Traverse right on top row, down on right col, left on bottom row, and up on left col, adjusting boundaries each time.",
    starterCode: `def spiral_order(matrix):
    if not matrix:
        return []
    m, n = len(matrix), len(matrix[0])
    top, bottom = 0, m - 1
    left, right = 0, n - 1
    res = []
    while top <= bottom and left <= right:
        # Traverse right
        for j in range(left, right + 1):
            res.append(matrix[top][j])
        top += 1
        
        # Traverse down
        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Traverse left
            for j in range(right, left - 1, -1):
                res.append(matrix[bottom][j])
            bottom -= 1
            
        if left <= right:
            # Traverse up
            for i in range(bottom, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
    return res

m, n = map(int, input().split())
matrix = []
for _ in range(m):
    matrix.append(list(map(int, input().split())))
print(*spiral_order(matrix))`,
    testInput: "3 3\n1 2 3\n4 5 6\n7 8 9\n",
    expectedOutput: "1 2 3 6 9 8 7 4 5",
    explanation: "Traversing border clockwise inwards: 1->2->3, then down 6->9, then left 8->7, then up 4, then right 5.",
    complexity: { time: "O(m * n)", space: "O(1) auxiliary" },
    commonMistakes: ["Double printing elements in single-row/column matrices due to missing boundary checks before left/up runs."]
  },

  // Day 7 Session 2
  lc912: {
    id: "lc912",
    title: "LC 912 - Sort an Array",
    url: "https://leetcode.com/problems/sort-an-array/",
    statement: "Given an array of integers nums, sort the array in ascending order and return it. Solve without using built-in sort functions, in O(n log n) time.",
    inputFormat: "Space-separated integers representing nums.",
    outputFormat: "Space-separated sorted integers.",
    constraints: ["1 <= len(nums) <= 5 * 10^4", "-5 * 10^4 <= nums[i] <= 5 * 10^4"],
    hint: "Use Merge Sort or Quick Sort. Merge Sort is stable and guarantees O(n log n) even in worst cases.",
    starterCode: `def sort_array(nums):
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        
        res = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                res.append(left[i])
                i += 1
            else:
                res.append(right[j])
                j += 1
        res.extend(left[i:])
        res.extend(right[j:])
        return res
    return merge_sort(nums)

nums = list(map(int, input().split()))
print(*sort_array(nums))`,
    testInput: "5 2 3 1\n",
    expectedOutput: "1 2 3 5",
    explanation: "Merge sort recursively divides [5, 2, 3, 1] into [1, 2] and [3, 5], then merges them sorted.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    commonMistakes: ["Using bubble/selection/insertion sort which runs in O(n^2) time and hits Time Limit Exceeded (TLE) limits."]
  },
  lc75: {
    id: "lc75",
    title: "LC 75 - Sort Colors",
    url: "https://leetcode.com/problems/sort-colors/",
    statement: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue (represented as 0, 1, and 2).",
    inputFormat: "Space-separated integers containing 0, 1, and 2.",
    outputFormat: "Space-separated sorted colors.",
    constraints: ["1 <= len(nums) <= 300"],
    hint: "Use the Dutch National Flag algorithm. Maintain three pointers: low, mid, high. Swap 0s to low, 2s to high, and increment mid for 1s.",
    starterCode: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else: # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

nums = list(map(int, input().split()))
sort_colors(nums)
print(*nums)`,
    testInput: "2 0 2 1 1 0\n",
    expectedOutput: "0 0 1 1 2 2",
    explanation: "Dutch national flag organizes elements to [0, 0, 1, 1, 2, 2] in a single pass.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using standard sorting (O(n log n)) or a two-pass counting sort, rather than the optimal single-pass Dutch National Flag algorithm."]
  },

  // Day 8 Session 1
  lc704: {
    id: "lc704",
    title: "LC 704 - Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    statement: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    inputFormat: "Line 1: space-separated sorted integers.\nLine 2: target integer.",
    outputFormat: "Print the index (or -1 if not found).",
    constraints: ["1 <= len(nums) <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    hint: "Define search boundaries low and high. Find mid. Compare nums[mid] to target and half the remaining scope each step.",
    starterCode: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

nums = list(map(int, input().split()))
target = int(input())
print(search(nums, target))`,
    testInput: "-1 0 3 5 9 12\n9\n",
    expectedOutput: "4",
    explanation: "9 exists in nums and its index is 4.",
    complexity: { time: "O(log n)", space: "O(1)" },
    commonMistakes: ["Writing mid calculation as (low + high) // 2 which in languages like C++/Java can cause integer overflow (use low + (high - low) // 2 instead)."]
  },
  lc34: {
    id: "lc34",
    title: "LC 34 - Find First and Last Position of Element in Sorted Array",
    url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    statement: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. Solve in O(log n) time.",
    inputFormat: "Line 1: space-separated sorted integers.\nLine 2: target integer.",
    outputFormat: "Two space-separated indices.",
    constraints: ["0 <= len(nums) <= 10^5", "-10^9 <= nums[i], target <= 10^9"],
    hint: "Use binary search twice. Modify the target matching check: when you find target, continue searching left to find starting bound, and search right to find ending bound.",
    starterCode: `def search_range(nums, target):
    def find_bound(is_first):
        low, high = 0, len(nums) - 1
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                ans = mid
                if is_first:
                    high = mid - 1
                else:
                    low = mid + 1
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return ans
    return [find_bound(True), find_bound(False)]

nums = list(map(int, input().split()))
# Handle empty input line
if not nums:
    nums = []
target = int(input())
print(*search_range(nums, target))`,
    testInput: "5 7 7 8 8 10\n8\n",
    expectedOutput: "3 4",
    explanation: "The first occurrence of 8 is at index 3, and the last is at index 4.",
    complexity: { time: "O(log n)", space: "O(1)" },
    commonMistakes: ["Using linear scan after finding the element, which degenerates to O(n) worst-case when all array elements match target."]
  },
  lc33: {
    id: "lc33",
    title: "LC 33 - Search in Rotated Sorted Array",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    statement: "There is an integer array nums sorted in ascending order (with distinct values) rotated at an unknown pivot. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not.",
    inputFormat: "Line 1: space-separated integers.\nLine 2: target integer.",
    outputFormat: "Print target index or -1.",
    constraints: ["1 <= len(nums) <= 5000", "all elements are unique"],
    hint: "In a rotated sorted array, one half (either left or right) is always normally sorted. Figure out which half is sorted and check if target lies within its boundaries.",
    starterCode: `def search_rotated(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid
        # Left half is sorted
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1
    return -1

nums = list(map(int, input().split()))
target = int(input())
print(search_rotated(nums, target))`,
    testInput: "4 5 6 7 0 1 2\n0\n",
    expectedOutput: "4",
    explanation: "Target 0 is located at index 4 in the rotated array.",
    complexity: { time: "O(log n)", space: "O(1)" },
    commonMistakes: ["Not properly validating boundaries on target checks or confusing pivot partitions."]
  },

  // Day 8 Session 2 (Mixed Set 1)
  lc217: {
    id: "lc217",
    title: "LC 217 - Contains Duplicate",
    url: "https://leetcode.com/problems/contains-duplicate/",
    statement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    inputFormat: "Space-separated integers.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= len(nums) <= 10^5"],
    hint: "Use a hash set. Traverse the array and check if the element is already in the set. If it is, return True. Otherwise add it.",
    starterCode: `def contains_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False

nums = list(map(int, input().split()))
print("true" if contains_duplicate(nums) else "false")`,
    testInput: "1 2 3 1\n",
    expectedOutput: "true",
    explanation: "The element 1 occurs twice in the array.",
    complexity: { time: "O(n)", space: "O(n)" },
    commonMistakes: ["Using nested loops O(n^2) which leads to TLE on large arrays."]
  },
  lc88: {
    id: "lc88",
    title: "LC 88 - Merge Sorted Array",
    url: "https://leetcode.com/problems/merge-sorted-array/",
    statement: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n representing the number of elements in nums1 and nums2 respectively. Merge nums2 into nums1 as one sorted array in-place.",
    inputFormat: "Line 1: space-separated integers for nums1 (padded with trailing zeroes to length m+n).\nLine 2: m.\nLine 3: space-separated integers for nums2.\nLine 4: n.",
    outputFormat: "Print the merged nums1 as space-separated integers.",
    constraints: ["len(nums1) == m + n", "len(nums2) == n"],
    hint: "Start merging from the back of the arrays to utilize the empty buffer space in nums1 without overwriting unmerged elements.",
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
    # add leftovers from nums2
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1

nums1 = list(map(int, input().split()))
m = int(input())
nums2 = list(map(int, input().split()))
n = int(input())
merge(nums1, m, nums2, n)
print(*nums1)`,
    testInput: "1 2 3 0 0 0\n3\n2 5 6\n3\n",
    expectedOutput: "1 2 2 3 5 6",
    explanation: "Merging [1,2,3] and [2,5,6] into nums1 yields [1, 2, 2, 3, 5, 6].",
    complexity: { time: "O(m + n)", space: "O(1)" },
    commonMistakes: ["Sorting the array after appending nums2 (O((m+n) log(m+n))) instead of linear O(m+n) merging."]
  },
  lc66: {
    id: "lc66",
    title: "LC 66 - Plus One",
    url: "https://leetcode.com/problems/plus-one/",
    statement: "You are given a large integer represented as an integer array digits, where each digits[i] is the i-th digit of the integer. Increment the large integer by one and return the resulting array.",
    inputFormat: "Space-separated single digits.",
    outputFormat: "Space-separated incremented digits.",
    constraints: ["1 <= len(digits) <= 100", "0 <= digits[i] <= 9"],
    hint: "Start from the rightmost digit. If it is 9, turn it to 0 and carry over. If all digits are 9, prepend 1 to the array.",
    starterCode: `def plus_one(digits):
    n = len(digits)
    for i in range(n - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits

digits = list(map(int, input().split()))
print(*plus_one(digits))`,
    testInput: "1 2 3\n",
    expectedOutput: "1 2 4",
    explanation: "123 incremented by one is 124.",
    complexity: { time: "O(n)", space: "O(1) auxiliary" },
    commonMistakes: ["Converting to integer and back to list in programming languages with standard integer limits (though Python handles arbitrary-precision, this fails in interviews)."]
  },
  lc268: {
    id: "lc268",
    title: "LC 268 - Missing Number",
    url: "https://leetcode.com/problems/missing-number/",
    statement: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    inputFormat: "Space-separated integers.",
    outputFormat: "Print the missing number.",
    constraints: ["n == len(nums)", "1 <= n <= 10^4", "All elements are unique"],
    hint: "Use the sum formula: expected_sum = n * (n + 1) // 2. The missing number is expected_sum - sum(nums).",
    starterCode: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)

nums = list(map(int, input().split()))
print(missing_number(nums))`,
    testInput: "3 0 1\n",
    expectedOutput: "2",
    explanation: "n = 3, since there are 3 numbers. Expected sum is 6, actual sum is 4. The missing number is 2.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using nested searches O(n^2) or sorting O(n log n) instead of arithmetic O(n) time and O(1) space."]
  },
  lc350: {
    id: "lc350",
    title: "LC 350 - Intersection of Two Arrays II",
    url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
    statement: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.",
    inputFormat: "Line 1: space-separated integers (nums1).\nLine 2: space-separated integers (nums2).",
    outputFormat: "Space-separated integers in intersection (sort for testing consistency).",
    constraints: ["1 <= len(nums1), len(nums2) <= 1000"],
    hint: "Use a hash map to count character frequencies of one array. Traverse the second; if it is in the map and count > 0, append to result and decrement count.",
    starterCode: `def intersect(nums1, nums2):
    counts = {}
    for x in nums1:
        counts[x] = counts.get(x, 0) + 1
    res = []
    for x in nums2:
        if counts.get(x, 0) > 0:
            res.append(x)
            counts[x] -= 1
    return sorted(res)

nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
print(*intersect(nums1, nums2))`,
    testInput: "1 2 2 1\n2 2\n",
    expectedOutput: "2 2",
    explanation: "The element 2 appears twice in both lists, so we return [2, 2].",
    complexity: { time: "O(n + m)", space: "O(min(n, m))" },
    commonMistakes: ["Using standard sets which remove duplicate intersection instances (returning [2] instead of [2, 2])."]
  },
  lc205: {
    id: "lc205",
    title: "LC 205 - Isomorphic Strings",
    url: "https://leetcode.com/problems/isomorphic-strings/",
    statement: "Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t.",
    inputFormat: "Line 1: string s.\nLine 2: string t.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["1 <= len(s) == len(t) <= 5 * 10^4"],
    hint: "Keep track of mappings from s to t and t to s. Both mappings must be one-to-one (bijective).",
    starterCode: `def is_isomorphic(s, t):
    map_s, map_t = {}, {}
    for char_s, char_t in zip(s, t):
        if char_s in map_s and map_s[char_s] != char_t:
            return False
        if char_t in map_t and map_t[char_t] != char_s:
            return False
        map_s[char_s] = char_t
        map_t[char_t] = char_s
    return True

s = input().strip()
t = input().strip()
print("true" if is_isomorphic(s, t) else "false")`,
    testInput: "egg\nadd\n",
    expectedOutput: "true",
    explanation: "'e' maps to 'a' and 'g' maps to 'd'. Egg and add are isomorphic.",
    complexity: { time: "O(n)", space: "O(1) alphabet size is fixed" },
    commonMistakes: ["Mapping s->t only, which fails on cases like 'badc' and 'baba' (where both 'd' and 'b' map to 'a')."]
  },
  lc74: {
    id: "lc74",
    title: "LC 74 - Search a 2D Matrix",
    url: "https://leetcode.com/problems/search-a-2d-matrix/",
    statement: "You are given an m x n integer matrix with properties where each row is sorted and the first element of each row is greater than the last of the previous. Find if target exists.",
    inputFormat: "Line 1: rows m and cols n.\nNext m lines: space-separated integers.\nLast line: target integer.",
    outputFormat: 'Print "true" or "false".',
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100"],
    hint: "Treat the 2D matrix as a flat sorted 1D array of size m * n. Use binary search where index mid corresponds to matrix[mid // n][mid % n].",
    starterCode: `def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    m, n = len(matrix), len(matrix[0])
    l, r = 0, m * n - 1
    while l <= r:
        mid = (l + r) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            return True
        elif val < target:
            l = mid + 1
        else:
            r = mid - 1
    return False

m, n = map(int, input().split())
matrix = []
for _ in range(m):
    matrix.append(list(map(int, input().split())))
target = int(input())
print("true" if search_matrix(matrix, target) else "false")`,
    testInput: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3\n",
    expectedOutput: "true",
    explanation: "3 exists in the matrix, so we return true.",
    complexity: { time: "O(log(m * n))", space: "O(1)" },
    commonMistakes: ["Searching row-by-row linearly (O(m * log n)) instead of the global flat binary search O(log(m*n))."]
  },
  lc121: {
    id: "lc121",
    title: "LC 121 - Best Time to Buy and Sell Stock",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy and a different day to sell. Return max profit.",
    inputFormat: "Space-separated integers representing prices.",
    outputFormat: "Print the maximum profit.",
    constraints: ["1 <= len(prices) <= 10^5"],
    hint: "Traverse the array, maintaining the minimum price seen so far. At each step, calculate the profit if you sell at the current price and update max profit.",
    starterCode: `def max_profit(prices):
    min_price = float('inf')
    max_prof = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_prof:
            max_prof = p - min_price
    return max_prof

prices = list(map(int, input().split()))
print(max_profit(prices))`,
    testInput: "7 1 5 3 6 4\n",
    expectedOutput: "5",
    explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    complexity: { time: "O(n)", space: "O(1)" },
    commonMistakes: ["Using nested loops O(n^2) to try all buy-sell combinations, which times out."]
  }
};
