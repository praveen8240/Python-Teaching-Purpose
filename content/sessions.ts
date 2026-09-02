import { Session, QuizQuestion } from "@/types/lesson";
import { ioProblems } from "./problems";
import { day2_to_5Problems } from "./problems/day2_to_5";
import { day6_to_8Problems } from "./problems/day6_to_8";
import { day9_to_11Problems } from "./problems/day9_to_11";
import { day12_to_15Problems } from "./problems/day12_to_15";

const complexityExamples = [
  {
    title: "Single loop",
    code: "n = int(input())\nfor i in range(n):\n    print(i)",
    input: "4\n",
    expected: "0\n1\n2\n3",
    explanation: "The loop performs n iterations.",
    complexity: { time: "O(n)", space: "O(1)" }
  },
  {
    title: "Nested loops",
    code: "n = int(input())\nfor i in range(n):\n    for j in range(n):\n        print(i, j)",
    input: "2\n",
    expected: "0 0\n0 1\n1 0\n1 1",
    explanation: "n work is repeated n times.",
    complexity: { time: "O(n^2)", space: "O(1)" }
  },
  {
    title: "Doubling",
    code: "n = int(input())\ni = 1\nwhile i < n:\n    print(i)\n    i *= 2",
    input: "10\n",
    expected: "1\n2\n4\n8",
    explanation: "Each step doubles i, so only log2(n) steps occur.",
    complexity: { time: "O(log n)", space: "O(1)" }
  },
  {
    title: "Triangular loop",
    code: "n = int(input())\nfor i in range(n):\n    for j in range(i):\n        print(i, j)",
    input: "3\n",
    expected: "1 0\n2 0\n2 1",
    explanation: "0 + 1 + ... + (n-1) = n(n-1)/2, which is O(n^2).",
    complexity: { time: "O(n^2)", space: "O(1)" }
  }
];

const generalQuiz: QuizQuestion[] = [
  {
    question: "A direct dictionary lookup is usually classified as?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: 0,
    explanation: "Average-case hash lookup is constant time."
  },
  {
    question: "Which loop is logarithmic?",
    options: ["i += 1", "i *= 2", "Two nested loops", "Loop over every item"],
    answer: 1,
    explanation: "Multiplying the progress variable reduces the remaining scale geometrically."
  },
  {
    question: "At n=10, O(n^2) is approximately?",
    options: ["10", "20", "100", "1024"],
    answer: 2,
    explanation: "10 squared is 100."
  }
];

export const sessions: Session[] = [
  // Day 1
  {
    id: 1,
    day: 1,
    title: "Orientation, Complexity & Test-Pattern Map",
    duration: "2 hours",
    description: "Build the constraint-first thinking used in interviews and judges.",
    focus: ["Big-O", "10^8 budget", "Pattern map", "Python toolchain"],
    objectives: ["Read constraints before choosing an approach", "Compare common complexity classes", "Estimate whether an algorithm is feasible", "Run a complete Python program"],
    quiz: generalQuiz,
    sections: [
      {
        id: "intro",
        title: "Session overview",
        kind: "text",
        intro: "DSA is the practice of organizing information and choosing repeatable steps that solve a problem within its limits.",
        bullets: [
          "Data structures organize values for useful operations.",
          "Algorithms are precise steps that transform input into output.",
          "Interviewers evaluate reasoning, correctness, complexity, and edge cases."
        ]
      },
      {
        id: "dsa",
        title: "What is DSA?",
        kind: "dsa-flow",
        intro: "Syntax lets you express a solution. DSA helps you select a solution that still works when the input becomes large."
      },
      {
        id: "big-o",
        title: "Big-O from zero",
        kind: "complexity",
        intro: "Big-O describes how work grows as input size n grows. It focuses on the dominant growth, not an exact stopwatch time."
      },
      {
        id: "budget",
        title: "The 10^8 operations rule",
        kind: "budget",
        intro: "A rough competitive-programming guideline says about 100 million simple operations may take around a second. Treat it as an estimate, never a promise."
      },
      {
        id: "worked",
        title: "Worked complexity examples",
        kind: "worked",
        intro: "Predict the answer, reveal the explanation, then run the actual program.",
        examples: complexityExamples
      },
      {
        id: "patterns",
        title: "Common test-pattern map",
        kind: "patterns",
        intro: "These are common topic-to-clue associations across placement and interview environments, not claims about any company’s proprietary process."
      },
      {
        id: "toolchain",
        title: "Python toolchain",
        kind: "toolchain",
        intro: "A judge starts your full program, sends hidden text to standard input, and compares standard output."
      }
    ]
  },
  {
    id: 2,
    day: 1,
    title: "Full-Program I/O & Judge Discipline",
    duration: "2 hours",
    description: "Turn solution logic into exact, robust programs accepted by online judges.",
    focus: ["input()", "fast I/O", "test cases", "WA / RE / TLE"],
    objectives: ["Parse common input shapes", "Produce exact output", "Diagnose judge verdicts", "Convert function stubs into full programs"],
    sections: [
      {
        id: "overview",
        title: "How online judges work",
        kind: "judge-flow",
        intro: "A judge executes your program against private test files. It sees only program behavior, not your intention."
      },
      {
        id: "input",
        title: "input()",
        kind: "io",
        intro: "input() reads one line and removes its ending newline.",
        examples: [
          {
            title: "One integer",
            code: "n = int(input())\nprint(n)",
            input: "5\n",
            expected: "5",
            explanation: "input returns text; int converts it."
          },
          {
            title: "Array and sum",
            code: "n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))",
            input: "5\n1 2 3 4 5\n",
            expected: "15",
            explanation: "split creates tokens and map converts them."
          }
        ]
      },
      {
        id: "readline",
        title: "sys.stdin.readline() and read()",
        kind: "io",
        intro: "readline is useful for many lines; read consumes all remaining input and is convenient for token-based parsing.",
        examples: [
          {
            title: "Fast line",
            code: "import sys\nn = int(sys.stdin.readline())\nprint(n)",
            input: "9\n",
            expected: "9"
          },
          {
            title: "Read all tokens",
            code: "import sys\nvalues = list(map(int, sys.stdin.read().split()))\nprint(sum(values))",
            input: "1 2\n3 4\n",
            expected: "10"
          }
        ]
      },
      {
        id: "test-cases",
        title: "Multiple inputs and test cases",
        kind: "io",
        intro: "The first value often tells you how many independent cases follow.",
        examples: [
          {
            title: "T test cases",
            code: "t = int(input())\nfor _ in range(t):\n    n = int(input())\n    print(n * 2)",
            input: "3\n5\n10\n20\n",
            expected: "10\n20\n40"
          }
        ]
      },
      {
        id: "exact",
        title: "Exact output",
        kind: "text",
        intro: "Judges compare characters. Capitalization, separators, spaces, and line breaks can change an accepted answer into Wrong Answer.",
        bullets: [
          "Correct: Case 1: 10",
          "Wrong capitalization: case 1: 10",
          "Wrong spacing: Case 1 : 10",
          "Never print prompts such as Enter n:"
        ]
      },
      {
        id: "verdicts",
        title: "WA, RE, and TLE",
        kind: "verdicts",
        intro: "A verdict narrows the kind of failure. Use it as debugging evidence."
      },
      {
        id: "drills",
        title: "Stub to full-program drills",
        kind: "practice",
        intro: "Each drill includes a real editor, stdin, expected output, hints, and completion tracking.",
        problems: ioProblems
      }
    ]
  },

  // Day 2
  {
    id: 3,
    day: 2,
    title: "Arrays - Traversal & Manipulation",
    duration: "2 hours",
    description: "See exactly how indices, shifts, copies, slices, and two pointers change a list.",
    focus: ["Traversal", "in-place operations", "rotation", "two pointers"],
    objectives: ["Traverse without off-by-one errors", "Explain list aliasing and slicing", "Perform core list mutations", "Apply reversal and two-pointer patterns"],
    sections: [
      {
        id: "overview",
        title: "Array mental model",
        kind: "text",
        intro: "A Python list stores an ordered sequence. Indices are positions; valid positive indices run from 0 through len(arr)-1.",
        bullets: [
          "Access by index is O(1) — Python lists use a contiguous array of pointers internally.",
          "Insert/delete in the middle shifts all subsequent elements → O(n). Append is amortized O(1).",
          "In-place operations (reverse, sort, swap) modify the original list object directly.",
          "Negative indices count from the end: arr[-1] is the last element, arr[-2] is second-to-last.",
          "Slicing arr[a:b] creates a NEW list — changes to the slice do NOT affect the original."
        ]
      },
      {
        id: "visualizer",
        title: "Array visualizer",
        kind: "array",
        intro: "Access, update, insert, delete, swap, reverse, and rotate a live array."
      },
      {
        id: "indexing",
        title: "Traversal and indexing",
        kind: "indexing",
        intro: "Walk the list one index at a time and connect positive and negative indices."
      },
      {
        id: "offbyone",
        title: "Off-by-one visualizer",
        kind: "offbyone",
        intro: "range(start, stop) includes start but excludes stop. One missing endpoint can silently skip data."
      },
      {
        id: "aliasing",
        title: "List aliasing trap",
        kind: "aliasing",
        intro: "Assignment copies a reference, not the list. copy() creates a separate shallow list."
      },
      {
        id: "slicing",
        title: "Slicing traps",
        kind: "slicing",
        intro: "Choose start, stop, and step. A slice produces a new list, so changing it does not update the original."
      },
      {
        id: "array-ops",
        title: "Hands-on: Insert, Delete & Reverse",
        kind: "worked",
        intro: "Practice the fundamental list mutations before tackling algorithm problems.",
        examples: [
          {
            title: "Insert & Delete — see the shift",
            code: "arr = [10, 20, 30, 40, 50]\nprint('Before insert:', arr)\narr.insert(2, 99)  # insert 99 at index 2\nprint('After insert:', arr)\n\narr.pop(2)  # remove element at index 2\nprint('After delete:', arr)",
            expected: "Before insert: [10, 20, 30, 40, 50]\nAfter insert: [10, 20, 99, 30, 40, 50]\nAfter delete: [10, 20, 30, 40, 50]",
            explanation: "insert(i, val) pushes everything at index i and beyond one position right — O(n). pop(i) shifts everything left — also O(n). Both are expensive in the middle but cheap at the end.",
            complexity: { time: "O(n)", space: "O(1)" }
          },
          {
            title: "Reverse a subarray with two pointers",
            code: "arr = [1, 2, 3, 4, 5, 6, 7]\n# Reverse elements from index 2 to 5\nleft, right = 2, 5\nwhile left < right:\n    arr[left], arr[right] = arr[right], arr[left]\n    left += 1\n    right -= 1\nprint('After reversing [2:6]:', arr)",
            expected: "After reversing [2:6]: [1, 2, 6, 5, 4, 3, 7]",
            explanation: "The two-pointer swap pattern is the building block of many array algorithms (rotation, palindrome check, partitioning). It runs in O(n/2) = O(n) time and O(1) space.",
            complexity: { time: "O(n)", space: "O(1)" }
          }
        ]
      },
      {
        id: "tricky_quiz",
        title: "Brain Teasers: Python Traps",
        kind: "quiz",
        intro: "Let's see if you can spot the common Python array traps that catch most beginners!"
      },
      {
        id: "rotate",
        title: "LC 189 - Rotate Array",
        kind: "rotate",
        intro: "Compare repeated shifts, extra storage, and the optimal three-reversal method.",
        problems: [day2_to_5Problems.lc189]
      },
      {
        id: "dedupe",
        title: "LC 26 - Remove Duplicates",
        kind: "dedupe",
        intro: "A fast pointer scans; a slow pointer owns the compact unique prefix.",
        problems: [day2_to_5Problems.lc26]
      },
      {
        id: "extra_practice",
        title: "Extra Practice: Core Array Patterns",
        kind: "practice",
        intro: "A solid 3-hour session needs extra drilling! Practice removing elements, merging from the back, squaring extremes, and finding max profit.",
        problems: [day2_to_5Problems.lc27, day2_to_5Problems.lc88, day2_to_5Problems.lc121, day2_to_5Problems.lc66, day2_to_5Problems.lc977]
      }
    ],
    quiz: [
      {
        question: "What is the final output of this code?\n\nnums = [1, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)",
        options: ["[1, 3]", "[1, 2, 3, 4]", "[1, 3, 4]", "Raises an Error"],
        answer: 0,
        explanation: "Never modify a list while iterating over it! When 2 is removed, the remaining elements shift left. The iterator moves to index 2, which is now 4, entirely skipping 3! It then processes and removes 4, leaving [1, 3]."
      },
      {
        question: "What is the final output of this code?\n\ngrid = [[0]] * 3\ngrid[0].append(1)\nprint(grid)",
        options: ["[[0, 1], [0], [0]]", "[[0, 1], [0, 1], [0, 1]]", "Raises an Error", "[[0]]"],
        answer: 1,
        explanation: "The `*` operator on a list containing a mutable object (like another list) copies the REFERENCE, not the object. All three rows point to the exact same list in memory! Use a list comprehension instead: `[[0] for _ in range(3)]`."
      }
    ]
  },
  {
    id: 4,
    day: 2,
    title: "Prefix Sums & Range Queries",
    duration: "2 hours",
    description: "Learn precomputation methods to solve range-sum queries in O(1) time, handle range updates efficiently, and compute products without division.",
    focus: ["Running totals", "O(1) range sums", "difference arrays", "prefix/suffix products"],
    objectives: ["Build and query prefix sum arrays", "Implement 1D range modifications with difference arrays", "Solve products except self using prefix/suffix tracking", "Compare naive vs precomputed approaches"],
    sections: [
      {
        id: "motivation",
        title: "Why Prefix Sums?",
        kind: "text",
        intro: "Imagine you have an array of 100,000 numbers and 50,000 queries asking 'what is the sum from index L to R?' Without precomputation, each query scans the range — O(n) per query, O(n×q) total. With a prefix sum array built once in O(n), every query answers in O(1).",
        bullets: [
          "Naive approach: loop from L to R for each query → O(n) per query → too slow for large inputs.",
          "Prefix sum P[i] = sum of elements from index 0 to i-1. Build once in O(n).",
          "Range sum formula: Sum(L, R) = P[R+1] − P[L]. Just one subtraction → O(1)!",
          "This 'precompute once, query many times' pattern appears everywhere in competitive programming."
        ]
      },
      {
        id: "builder",
        title: "Interactive Prefix Sum Builder",
        kind: "prefix-sum",
        intro: "Step through building a prefix sum array one element at a time. Watch how P[i+1] = P[i] + A[i] accumulates."
      },
      {
        id: "worked_prefix",
        title: "Worked Examples: Prefix Sums",
        kind: "worked",
        intro: "Run these examples to see prefix sums in action.",
        examples: [
          {
            title: "Build Prefix Array",
            code: "arr = [3, 1, 4, 1, 5]\nprefix = [0] * (len(arr) + 1)\nfor i in range(len(arr)):\n    prefix[i+1] = prefix[i] + arr[i]\nprint('Original:', arr)\nprint('Prefix:  ', prefix)\nprint()\n# Quick check: sum of entire array\nprint('Sum of all:', prefix[-1])",
            expected: "Original: [3, 1, 4, 1, 5]\nPrefix:   [0, 3, 4, 8, 9, 14]\n\nSum of all: 14",
            explanation: "We allocate an array of size n+1 initialized to 0. We iteratively add the current element to the previous prefix sum. P[0]=0 acts as a sentinel so the range formula works cleanly.",
            complexity: { time: "O(n)", space: "O(n)" }
          },
          {
            title: "O(1) Range Query",
            code: "arr = [3, 1, 4, 1, 5]\nprefix = [0, 3, 4, 8, 9, 14]\n\n# Query 1: sum of indices 1 to 3 (elements: 1, 4, 1)\nL, R = 1, 3\nprint(f'Sum[{L}..{R}] = P[{R+1}] - P[{L}] = {prefix[R+1]} - {prefix[L]} = {prefix[R+1] - prefix[L]}')\n\n# Query 2: sum of indices 0 to 4 (entire array)\nL, R = 0, 4\nprint(f'Sum[{L}..{R}] = P[{R+1}] - P[{L}] = {prefix[R+1]} - {prefix[L]} = {prefix[R+1] - prefix[L]}')\n\n# Query 3: single element at index 2\nL, R = 2, 2\nprint(f'Sum[{L}..{R}] = P[{R+1}] - P[{L}] = {prefix[R+1]} - {prefix[L]} = {prefix[R+1] - prefix[L]}')",
            expected: "Sum[1..3] = P[4] - P[1] = 9 - 3 = 6\nSum[0..4] = P[5] - P[0] = 14 - 0 = 14\nSum[2..2] = P[3] - P[2] = 8 - 4 = 4",
            explanation: "Each query is just ONE subtraction regardless of range size. Even querying a single element works: P[i+1] - P[i] = arr[i].",
            complexity: { time: "O(1) per query", space: "O(n) for prefix array" }
          }
        ]
      },
      {
        id: "diff_array",
        title: "Difference Array — O(1) Range Updates",
        kind: "diff-array",
        intro: "What if instead of querying ranges, you need to UPDATE ranges? Adding +3 to every element from index 2 to 5 normally takes O(n). With a difference array, it takes O(1) per update!"
      },
      {
        id: "worked_diff",
        title: "Worked Example: Difference Array",
        kind: "worked",
        intro: "See difference arrays applied to a real problem.",
        examples: [
          {
            title: "Range increment with difference array",
            code: "# Add +3 to range [2,5] and +2 to range [0,3]\nn = 8\ndiff = [0] * (n + 1)\n\n# Update 1: add +3 to indices 2..5\ndiff[2] += 3\ndiff[6] -= 3\nprint('After update 1 (add 3 to [2..5]):', diff)\n\n# Update 2: add +2 to indices 0..3\ndiff[0] += 2\ndiff[4] -= 2\nprint('After update 2 (add 2 to [0..3]):', diff)\n\n# Reconstruct: prefix sum of diff array\nresult = [0] * n\nresult[0] = diff[0]\nfor i in range(1, n):\n    result[i] = result[i-1] + diff[i]\nprint('Final array:', result)",
            expected: "After update 1 (add 3 to [2..5]): [0, 0, 3, 0, 0, 0, -3, 0, 0]\nAfter update 2 (add 2 to [0..3]): [2, 0, 3, 0, -2, 0, -3, 0, 0]\nFinal array: [2, 2, 5, 5, 3, 3, 0, 0]",
            explanation: "Each range update is just 2 operations: diff[L] += val and diff[R+1] -= val. After all updates, one prefix-sum pass reconstructs the final array. Total: O(q + n) instead of O(q × n).",
            complexity: { time: "O(n + q)", space: "O(n)" }
          }
        ]
      },
      {
        id: "product",
        title: "Product of Array Except Self",
        kind: "product-except-self",
        intro: "LC 238: Given an array, return an array where result[i] is the product of all elements EXCEPT arr[i] — without using division. The trick: precompute left-products and right-products, then multiply them."
      },
      {
        id: "practice",
        title: "Practice Problems",
        kind: "practice",
        intro: "Apply prefix sums, difference arrays, and product accumulation techniques.",
        problems: [day2_to_5Problems.lc1480, day2_to_5Problems.lc303, day2_to_5Problems.lc724, day2_to_5Problems.lc1109, day2_to_5Problems.lc238]
      }
    ]
  },

  // Day 3
  {
    id: 5,
    day: 3,
    title: "Hashing - Frequency Maps & Sets",
    duration: "2 hours",
    description: "Master fast element lookup using hash tables, sets, and frequency counters. Understand when O(1) average-time lookup transforms a brute-force O(n²) into elegant O(n).",
    focus: ["dict, set, Counter", "duplicate detection", "first non-repeating", "fixed-slot list"],
    objectives: ["Leverage O(1) average lookup times", "Detect duplicates in linear time", "Utilize Counter for element counts", "Know when a fixed-size list beats a dict"],
    sections: [
      {
        id: "overview",
        title: "Hash Tables under the hood",
        kind: "hashing",
        intro: "Python's dict and set use hash tables to search, insert, and delete elements in constant O(1) average time. This single fact turns many O(n²) brute-force solutions into clean O(n) algorithms.",
        bullets: [
          "dict: maps keys → values. Checking 'if key in d' is O(1) average, not O(n) like a list.",
          "set: stores only unique items. Adding duplicates silently does nothing. 'in' check is O(1).",
          "collections.Counter: a dict subclass that counts hashable objects. Counter('aab') → {'a': 2, 'b': 1}.",
          "For alphabet-only problems, a size-26 list can be faster than a dict since no hashing is needed.",
          "Gotcha: dict keys must be hashable (immutable). Lists can't be keys, but tuples and strings can."
        ]
      },
      {
        id: "set_dedup",
        title: "Interactive: Duplicate Detection with set()",
        kind: "set-dedup",
        intro: "Watch how a set catches duplicates in real-time. Each 'in' check is O(1) — no scanning needed!"
      },
      {
        id: "worked",
        title: "Worked Examples: Hashing Patterns",
        kind: "worked",
        intro: "Build intuition for the three most common hashing patterns you'll use in interviews.",
        examples: [
          {
            title: "Pattern 1: Frequency Map with dict",
            code: "from collections import Counter\n\narr = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']\n\n# Method 1: Manual counting with dict.get()\nfreq = {}\nfor item in arr:\n    freq[item] = freq.get(item, 0) + 1\nprint('Manual:', freq)\n\n# Method 2: Counter (one-liner!)\nprint('Counter:', dict(Counter(arr)))\n\n# Most common element\nprint('Most common:', Counter(arr).most_common(1)[0])",
            expected: "Manual: {'apple': 3, 'banana': 2, 'cherry': 1}\nCounter: {'apple': 3, 'banana': 2, 'cherry': 1}\nMost common: ('apple', 3)",
            explanation: "dict.get(key, default) avoids KeyError. Counter is a shortcut that does the same thing internally. most_common(k) returns the k most frequent elements.",
            complexity: { time: "O(n)", space: "O(k) where k = unique elements" }
          },
          {
            title: "Pattern 2: First Non-Repeating Character",
            code: "from collections import Counter\n\ndef first_unique(s):\n    count = Counter(s)\n    for i, ch in enumerate(s):\n        if count[ch] == 1:\n            return i\n    return -1\n\nprint(first_unique('leetcode'))   # 0 → 'l'\nprint(first_unique('loveleetcode'))  # 2 → 'v'\nprint(first_unique('aabb'))       # -1",
            expected: "0\n2\n-1",
            explanation: "First pass: count all characters in O(n). Second pass: find the first character with count == 1. Total: O(n) time, O(1) space (at most 26 lowercase letters).",
            complexity: { time: "O(n)", space: "O(1) for lowercase alphabet" }
          },
          {
            title: "Pattern 3: Two Sum with a Dictionary",
            code: "arr = [2, 7, 11, 15]\ntarget = 9\nseen = {}  # value → index\n\nfor i, num in enumerate(arr):\n    complement = target - num\n    if complement in seen:      # O(1) lookup!\n        print(f'Indices: {seen[complement]} and {i}')\n        print(f'Values: {complement} + {num} = {target}')\n        break\n    seen[num] = i               # Store for future lookups",
            expected: "Indices: 0 and 1\nValues: 2 + 7 = 9",
            explanation: "Instead of nested loops (O(n²)), we check if target-current exists in our hash map — O(1) per check. One pass through the array: O(n) total.",
            complexity: { time: "O(n)", space: "O(n)" }
          },
          {
            title: "When a fixed-size list wins over dict",
            code: "# Count lowercase letter frequencies\ndef char_freq_dict(s):\n    freq = {}\n    for ch in s:\n        freq[ch] = freq.get(ch, 0) + 1\n    return freq\n\ndef char_freq_list(s):\n    freq = [0] * 26\n    for ch in s:\n        freq[ord(ch) - ord('a')] += 1\n    return freq\n\ns = 'helloworld'\nprint('Dict:', char_freq_dict(s))\nprint('List:', char_freq_list(s))\nprint('\\nList is faster: no hashing overhead, just index math!')",
            expected: "Dict: {'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}\nList: [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 3, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]\n\nList is faster: no hashing overhead, just index math!",
            explanation: "When the key space is small and fixed (26 letters, 10 digits), a plain list is faster than a dict. ord('c') - ord('a') maps 'a'→0, 'b'→1, ..., 'z'→25.",
            complexity: { time: "O(n)", space: "O(1) — always 26 slots" }
          }
        ]
      },
      {
        id: "basics",
        title: "Practice Problems: Basics",
        kind: "practice",
        intro: "Apply frequency maps and set lookups to classic interview problems.",
        problems: [day2_to_5Problems.lc1, day2_to_5Problems.lc387, day2_to_5Problems.lc217, day2_to_5Problems.lc349, day2_to_5Problems.lc771]
      }
    ]
  },
  {
    id: 6,
    day: 3,
    title: "Hashing - Applied Techniques",
    duration: "2 hours",
    description: "Go beyond basic lookups: use derived keys to group related items, combine prefix sums with dicts for subarray counting, and discover XOR's magical cancellation property.",
    focus: ["Derived-key hashing", "prefix sum with dict", "XOR cancellation"],
    objectives: ["Represent complex collections as dictionary keys", "Find subarrays summing to K in O(n)", "Find single odd-occurrence elements", "Map strings to canonical forms for grouping"],
    sections: [
      {
        id: "overview",
        title: "Advanced Hashing Strategies",
        kind: "text",
        intro: "Three powerful patterns that combine hashing with other techniques to solve problems that seem impossible at first glance.",
        bullets: [
          "Derived keys: sorted('eat') = 'aet' = sorted('tea'). Same key → same anagram group. Use tuple or frozenset as dict keys.",
          "Prefix sum + dict: store running sums as keys. If prefix[j] - prefix[i] = K, then subarray [i+1..j] sums to K. Check if (current_sum - K) is in the dict.",
          "XOR cancellation: A ^ A = 0, A ^ 0 = A. XOR all elements → pairs cancel, only the unique one survives. O(1) space!"
        ]
      },
      {
        id: "anagram_viz",
        title: "Interactive: Anagram Grouping with Derived Keys",
        kind: "anagram-group",
        intro: "Watch how sorting each word creates a 'canonical key' that groups anagrams together. The dict does the heavy lifting!"
      },
      {
        id: "xor_viz",
        title: "Interactive: XOR Cancellation — Find the Single Number",
        kind: "xor",
        intro: "Step through XORing all elements in an array. Pairs cancel to 0, leaving only the number that appears once. Pure bit magic!"
      },
      {
        id: "worked_applied",
        title: "Worked Examples: Applied Techniques",
        kind: "worked",
        intro: "Detailed walkthroughs of the three advanced patterns.",
        examples: [
          {
            title: "Subarray Sum Equals K (Prefix Sum + Dict)",
            code: `from collections import defaultdict
def subarray_sum(nums,k):
    # sum(i..j)=k -> count+=1
    # prefix[j]-prefix[i-1]=k -> count+=1
    # prefix[j]-k == prefix[i-1]
    count=0
    p_counts=defaultdict(int)
    p_counts[0]=1
    curr_sum=0
    for num in nums:
        curr_sum+=num
        c = curr_sum -k
        count+=p_counts[c]
        p_counts[curr_sum]+=1
    return count
    
    
nums = [1, 1, 1]
k = 2
print(f'Subarrays summing to {k}:', subarray_sum(nums, k))

nums2 = [1, 2, 3]
k2 = 3
print(f'Subarrays summing to {k2}:', subarray_sum(nums2, k2))`,
            expected: "Subarrays summing to 2: 2\nSubarrays summing to 3: 2",
            explanation: "Key insight: if prefix_sum[j] - prefix_sum[i] = k, then sum(nums[i+1..j]) = k. We store prefix sums in a dict and check if (current - k) was seen before. The {0: 1} initialization handles subarrays starting from index 0.",
            complexity: { time: "O(n)", space: "O(n)" }
          },
          {
            title: "Isomorphic String Mapping (Two-Way Dict)",
            code: "def is_isomorphic(s, t):\n    s_to_t = {}\n    t_to_s = {}\n    for c1, c2 in zip(s, t):\n        if c1 in s_to_t and s_to_t[c1] != c2:\n            return False\n        if c2 in t_to_s and t_to_s[c2] != c1:\n            return False\n        s_to_t[c1] = c2\n        t_to_s[c2] = c1\n    return True\n\nprint('egg ↔ add:', is_isomorphic('egg', 'add'))    # True\nprint('foo ↔ bar:', is_isomorphic('foo', 'bar'))    # False\nprint('paper ↔ title:', is_isomorphic('paper', 'title'))  # True",
            expected: "egg ↔ add: True\nfoo ↔ bar: False\npaper ↔ title: True",
            explanation: "Two dicts enforce a bijective mapping. If 'o' maps to 'a', and we later see 'o' → 'r', that's a conflict → False. Checking both directions prevents 'ab' → 'aa' from passing.",
            complexity: { time: "O(n)", space: "O(1)" }
          }
        ]
      },
      {
        id: "applied",
        title: "Practice Problems: Applied Hashing",
        kind: "practice",
        intro: "Group anagrams, count subarrays, apply XOR, and test string mappings.",
        problems: [day2_to_5Problems.lc49, day2_to_5Problems.lc560, day2_to_5Problems.lc136, day2_to_5Problems.lc205, day2_to_5Problems.lc242]
      }
    ]
  },

  // Day 4
  {
    id: 7,
    day: 4,
    title: "Strings - Core Operations",
    duration: "2 hours",
    description: "Understand Python's string architecture — immutability, the O(n²) concatenation trap, character math with ord/chr, and the two-pointer palindrome pattern.",
    focus: ["str immutability", "concat O(n^2)", "list-and-join", "ord/chr arithmetic", "palindromes"],
    objectives: ["Avoid quadratic concatenation traps", "Perform numeric offsets using ord() and chr()", "Implement efficient two-pointer palindrome checkers", "Know split/strip/join inside out"],
    sections: [
      {
        id: "overview",
        title: "Python String Architecture",
        kind: "strings",
        intro: "Strings in Python are immutable. Every concatenation 's += char' creates a brand new string, copying ALL characters. This innocent-looking pattern is actually O(n²)!",
        bullets: [
          "IMMUTABLE: s[0] = 'X' → TypeError! Once created, a string cannot be changed in place.",
          "s += 'a' in a loop → O(n²) total because each += creates a new string of length 1+2+3+...+n.",
          "The fix: append to a list, then ''.join(list) at the end → O(n) total. One allocation!",
          "split() breaks a string into a list of words. strip() removes leading/trailing whitespace.",
          "Strings are hashable → can be dict keys and set elements. Lists cannot!"
        ]
      },
      {
        id: "ordchr",
        title: "Interactive: ord() / chr() Character Math",
        kind: "ordchr",
        intro: "Type any character to see its ASCII value and array index. This is the foundation for frequency-counting with a size-26 list instead of a dict."
      },
      {
        id: "worked",
        title: "Worked Examples: String Fundamentals",
        kind: "worked",
        intro: "Master the essential string patterns that appear in every coding interview.",
        examples: [
          {
            title: "O(n²) Trap vs O(n) Fix",
            code: "import time\n\n# BAD: O(n^2) concatenation\ndef build_bad(n):\n    s = ''\n    for i in range(n):\n        s += str(i % 10)\n    return s\n\n# GOOD: O(n) list-and-join\ndef build_good(n):\n    parts = []\n    for i in range(n):\n        parts.append(str(i % 10))\n    return ''.join(parts)\n\nn = 50000\nstart = time.time()\nbuild_bad(n)\nprint(f'Bad (s += char): {time.time()-start:.4f}s')\n\nstart = time.time()\nbuild_good(n)\nprint(f'Good (join):      {time.time()-start:.4f}s')",
            expected: "Bad (s += char): ~0.02s\nGood (join):      ~0.01s",
            explanation: "For small n, both are fast. But at n=1,000,000 the bad version takes seconds while join stays instant. Always use list-and-join!",
            complexity: { time: "O(n) with join, O(n²) with +=", space: "O(n)" }
          },
          {
            title: "Character Math: Caesar Cipher",
            code: "def caesar_encrypt(text, shift):\n    result = []\n    for ch in text:\n        if ch.isalpha():\n            base = ord('A') if ch.isupper() else ord('a')\n            # Shift within 0-25, then convert back\n            new_ch = chr((ord(ch) - base + shift) % 26 + base)\n            result.append(new_ch)\n        else:\n            result.append(ch)\n    return ''.join(result)\n\nprint(caesar_encrypt('Hello, World!', 3))\nprint(caesar_encrypt('Khoor, Zruog!', -3))  # Decrypt",
            expected: "Khoor, Zruog!\nHello, World!",
            explanation: "ord(ch) - ord('a') gives 0-25 index. Add shift, mod 26 to wrap around, add base back. This pattern is used in many string manipulation problems.",
            complexity: { time: "O(n)", space: "O(n)" }
          },
          {
            title: "split(), strip(), and join() Mastery",
            code: "# split() — break string into list\nsentence = '  Hello   World  Python  '\nwords = sentence.split()  # splits on ANY whitespace\nprint('Words:', words)\n\n# strip() — remove leading/trailing whitespace\nprint('Stripped:', repr(sentence.strip()))\n\n# join() — combine list into string\nprint('Joined:', '-'.join(words))\n\n# split with delimiter\ncsv = 'alice,bob,charlie'\nprint('CSV split:', csv.split(','))",
            expected: "Words: ['Hello', 'World', 'Python']\nStripped: 'Hello   World  Python'\nJoined: Hello-World-Python\nCSV split: ['alice', 'bob', 'charlie']",
            explanation: "split() without args splits on any whitespace and removes empty strings. split(',') splits on exactly that delimiter. strip() only removes from edges, not middle.",
            complexity: { time: "O(n)", space: "O(n)" }
          }
        ]
      },
      {
        id: "palindrome_viz",
        title: "Interactive: Two-Pointer Palindrome Checker",
        kind: "palindrome",
        intro: "Type any string and watch the two-pointer technique check it character by character. The algorithm cleans the input first (lowercase + remove non-alphanumeric), then compares from both ends."
      },
      {
        id: "string_quiz",
        title: "Brain Teasers: String Traps",
        kind: "quiz",
        intro: "Can you spot the common string traps that catch most Python beginners?"
      },
      {
        id: "strings_core",
        title: "Practice Problems: String Fundamentals",
        kind: "practice",
        intro: "Reverse strings in-place, check palindromes, find substrings, and verify subsequences.",
        problems: [day2_to_5Problems.lc344, day2_to_5Problems.lc125, day2_to_5Problems.lc28, day2_to_5Problems.lc392]
      }
    ],
    quiz: [
      {
        question: "What is the output?\n\ns = 'hello'\ns[0] = 'H'\nprint(s)",
        options: ["Hello", "hello", "TypeError: 'str' object does not support item assignment", "H"],
        answer: 2,
        explanation: "Strings in Python are IMMUTABLE. You cannot modify a character in-place. s[0] = 'H' raises a TypeError."
      },
      {
        question: "What is the output?\n\ns = 'hello world'\nprint(s.split('l'))",
        options: ["['he', '', 'o wor', 'd']", "['he', 'o wor', 'd']", "['hello', 'world']", "Error"],
        answer: 0,
        explanation: "split('l') splits at every 'l'. Between the two consecutive l's, there's an empty string. Result: ['he', '', 'o wor', 'd']."
      },
      {
        question: "Which builds a string of n characters FASTER?\n\nA: s = ''; for c in chars: s += c\nB: s = ''.join(chars)",
        options: ["B is faster — O(n) vs O(n²)", "A is faster — direct concatenation", "Both are equal — Python optimizes +=", "Depends on the string length"],
        answer: 0,
        explanation: "Option A creates a new string on every iteration, copying all previous characters → O(1+2+...+n) = O(n²). Option B calculates total length once, allocates once → O(n)."
      },
      {
        question: "What is ord('a') - ord('A')?",
        options: ["32", "26", "0", "65"],
        answer: 0,
        explanation: "ord('a') = 97, ord('A') = 65. The difference is 32. This is why s.lower() works — it adds 32 to uppercase ASCII values."
      }
    ]
  },
  {
    id: 8,
    day: 4,
    title: "Strings - Pattern Problems",
    duration: "2 hours",
    description: "Solve pattern-based string problems: anagram checking with frequency signatures, in-place run-length compression, longest common prefix, and building longest palindromes from character counts.",
    focus: ["Anagram checks", "frequency signatures", "run-length compression", "prefix scanning", "palindrome building"],
    objectives: ["Compare strings via frequency counts in O(n)", "Compress strings in-place with read/write pointers", "Scan prefixes vertically across multiple strings", "Build palindromes from character frequency analysis"],
    sections: [
      {
        id: "overview",
        title: "String Pattern Toolkit",
        kind: "text",
        intro: "Most string pattern problems boil down to one of these core techniques. Master them and you'll recognize the pattern instantly in interviews.",
        bullets: [
          "Frequency signature: two strings are anagrams iff they have identical character counts. Compare with Counter or a size-26 list.",
          "Read/write pointers: scan with 'read', overwrite with 'write'. Perfect for in-place compression and deduplication.",
          "Vertical scanning: for prefix problems, compare all strings at position 0, then position 1, etc. Stop at first mismatch.",
          "Character budget: to build the longest palindrome, use all even counts + (count-1) for odd counts + 1 center character."
        ]
      },
      {
        id: "compress_viz",
        title: "Interactive: Run-Length String Compression",
        kind: "str-compress",
        intro: "Step through the read/write pointer technique. The 'read' pointer finds groups of consecutive characters, the 'write' pointer overwrites the array in-place with char + count."
      },
      {
        id: "worked_patterns",
        title: "Worked Examples: String Patterns",
        kind: "worked",
        intro: "Detailed walkthroughs of the key string patterns.",
        examples: [
          {
            title: "Anagram Check: Frequency Counting",
            code: "from collections import Counter\n\ndef is_anagram(s, t):\n    # Method 1: Counter comparison\n    return Counter(s) == Counter(t)\n\ndef is_anagram_manual(s, t):\n    # Method 2: Size-26 list (faster, no hashing)\n    if len(s) != len(t): return False\n    freq = [0] * 26\n    for c in s: freq[ord(c) - ord('a')] += 1\n    for c in t: freq[ord(c) - ord('a')] -= 1\n    return all(f == 0 for f in freq)\n\nprint(is_anagram('anagram', 'nagaram'))  # True\nprint(is_anagram('rat', 'car'))          # False\nprint(is_anagram_manual('listen', 'silent'))  # True",
            expected: "True\nFalse\nTrue",
            explanation: "Counter comparison is clean but involves hashing. The size-26 list method is faster: increment for s, decrement for t, check all zeros. Both are O(n).",
            complexity: { time: "O(n)", space: "O(1) — at most 26 counters" }
          },
          {
            title: "Longest Common Prefix: Vertical Scan",
            code: "def longest_common_prefix(strs):\n    if not strs: return ''\n    \n    # Compare character by character across ALL strings\n    for i in range(len(strs[0])):\n        char = strs[0][i]\n        for s in strs[1:]:\n            if i >= len(s) or s[i] != char:\n                return strs[0][:i]\n    return strs[0]\n\nprint(longest_common_prefix(['flower', 'flow', 'flight']))\nprint(longest_common_prefix(['dog', 'racecar', 'car']))\nprint(longest_common_prefix(['interspecies', 'interstellar', 'interstate']))",
            expected: "fl\n\ninters",
            explanation: "We scan vertically: check index 0 of all strings, then index 1, etc. The moment any string is too short or has a different character, we stop.",
            complexity: { time: "O(S) where S = total chars in all strings", space: "O(1)" }
          },
          {
            title: "Building Longest Palindrome from Characters",
            code: "from collections import Counter\n\ndef longest_palindrome(s):\n    counts = Counter(s)\n    length = 0\n    has_odd = False\n    \n    for c in counts.values():\n        # Use pairs: floor(c/2) * 2\n        length += (c // 2) * 2\n        if c % 2 == 1:\n            has_odd = True\n    \n    # One odd character can go in the center\n    return length + (1 if has_odd else 0)\n\nprint('abccccdd →', longest_palindrome('abccccdd'))\nprint('aA →', longest_palindrome('aA'))",
            expected: "abccccdd → 7\naA → 1",
            explanation: "For 'abccccdd': a(1), b(1), c(4), d(2). Pairs: c gives 4, d gives 2 = 6. One odd char can sit in center = 7. Result: something like 'dccaccd'.",
            complexity: { time: "O(n)", space: "O(1)" }
          }
        ]
      },
      {
        id: "pattern_quiz",
        title: "Brain Teasers: String Patterns",
        kind: "quiz",
        intro: "Test your understanding of string pattern concepts!"
      },
      {
        id: "strings_patterns",
        title: "Practice Problems: String Patterns",
        kind: "practice",
        intro: "Validate anagrams, compress strings, find common prefixes, and build palindromes.",
        problems: [day2_to_5Problems.lc242, day2_to_5Problems.lc443, day2_to_5Problems.lc14, day2_to_5Problems.lc409]
      }
    ],
    quiz: [
      {
        question: "What is the output?\n\nfrom collections import Counter\nprint(Counter('banana'))",
        options: ["Counter({'a': 3, 'n': 2, 'b': 1})", "Counter({'b': 1, 'a': 3, 'n': 2})", "{'b': 1, 'a': 3, 'n': 2}", "Error: strings are not iterable"],
        answer: 0,
        explanation: "Counter counts each character. 'banana' has a:3, n:2, b:1. Counter orders by most common first."
      },
      {
        question: "Are 'Listen' and 'Silent' anagrams?",
        options: ["No — 'L' ≠ 'S', case matters", "Yes — after converting both to lowercase", "Depends on the implementation", "Error — strings have different lengths"],
        answer: 0,
        explanation: "Without .lower(), 'L' and 'S' are different characters. Most interview problems specify 'lowercase only' to avoid this. Always clarify constraints!"
      },
      {
        question: "What does 'abc' + 'def' cost in terms of time complexity?",
        options: ["O(n) where n is total length", "O(1) — just pointer concatenation", "O(n²) — strings are immutable", "O(n log n) — sorting involved"],
        answer: 0,
        explanation: "A single concatenation of two strings of lengths a and b costs O(a + b) because Python must allocate a new string and copy both. The O(n²) trap only occurs in LOOPS."
      }
    ]
  },

  // Day 5
  {
    id: 9,
    day: 5,
    title: "Two Pointers",
    duration: "2 hours",
    description: "Use multiple pointers scanning from opposite ends or at varying speeds to search sorted data.",
    focus: ["Opposite-end convergence", "fast and slow pointers", "in-place partition", "duplicate skipping"],
    objectives: ["Solve target sum pairs on sorted inputs", "Move values in-place inside an array", "Implement 3-pointer unique target checks"],
    sections: [
      {
        id: "overview",
        title: "The Pointers Method",
        kind: "two-pointers",
        intro: "Pointers allow scanning sequences with minimal space, shifting indices based on matching conditions.",
        bullets: [
          "Converge pointers left and right to find target pairs in sorted lists.",
          "Separate elements in-place by keeping write-trackers.",
          "Skip repeated values to ensure unique combination results."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Two Pointers",
        kind: "worked",
        intro: "Code templates for common two-pointer scenarios.",
        examples: [
          {
            title: "Two Sum on Sorted Array",
            code: "arr = [2, 7, 11, 15]\ntarget = 9\nL, R = 0, len(arr) - 1\nwhile L < R:\n    curr = arr[L] + arr[R]\n    if curr == target:\n        print(f'Match found at {L} and {R}')\n        break\n    elif curr < target:\n        L += 1\n    else:\n        R -= 1",
            expected: "Match found at 0 and 1",
            explanation: "Because the array is sorted, if the sum is too small, we must move L right. If too big, move R left."
          }
        ]
      },
      {
        id: "pointers",
        title: "Practice Problems",
        kind: "practice",
        intro: "Work with two-pointer targets, swaps, and 3Sum searches.",
        problems: [day2_to_5Problems.lc167, day2_to_5Problems.lc283, day2_to_5Problems.lc15]
      }
    ]
  },
  {
    id: 10,
    day: 5,
    title: "Sliding Window",
    duration: "2 hours",
    description: "Maintain a dynamic or fixed subarray range to track windows of data efficiently.",
    focus: ["Fixed vs variable windows", "expand-contract template", "window state in Counter"],
    objectives: ["Manage start and end bounds of dynamic ranges", "Implement window size optimizations", "Verify window constraints using frequency states"],
    sections: [
      {
        id: "overview",
        title: "Windowing Concepts",
        kind: "sliding-window",
        intro: "Sliding windows optimize nested-loop array tasks from O(n^2) to linear O(n) time.",
        bullets: [
          "Expand the window by advancing the right pointer.",
          "Contract the window from the left when current state violates constraints.",
          "Track elements inside the window using map keys or counter states."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Sliding Window",
        kind: "worked",
        intro: "Fixed size and variable size sliding window implementations.",
        examples: [
          {
            title: "Fixed Size Window Sum",
            code: "arr = [2, 1, 5, 1, 3, 2]\nk = 3\nwindow_sum = sum(arr[:k])\nmax_sum = window_sum\nfor i in range(k, len(arr)):\n    window_sum += arr[i] - arr[i-k]\n    max_sum = max(max_sum, window_sum)\nprint('Max sum of size 3:', max_sum)",
            expected: "Max sum of size 3: 9",
            explanation: "We add the incoming element arr[i] and subtract the outgoing element arr[i-k] to maintain O(1) transitions."
          }
        ]
      },
      {
        id: "windows",
        title: "Practice Problems",
        kind: "practice",
        intro: "Apply sliding window templates to strings and positive array subsets.",
        problems: [day2_to_5Problems.lc3, day2_to_5Problems.lc209]
      }
    ]
  },

  // Day 6
  {
    id: 11,
    day: 6,
    title: "Number Theory - Primes, Factors & GCD",
    duration: "2 hours",
    description: "Understand primary math algorithms, factors, divisor loops, and prime generation.",
    focus: ["Trial division to sqrt", "Sieve", "factorisation", "Euclid GCD/LCM"],
    objectives: ["Check primality in square root time", "Generate prime numbers using Eratosthenes Sieve", "Solve greatest common divisor queries in log time"],
    sections: [
      {
        id: "overview",
        title: "Math & Divisibility",
        kind: "text",
        intro: "Optimizing math code requires understanding prime boundaries and divisor mappings.",
        bullets: [
          "Primes can be checked up to sqrt(n) because factors repeat.",
          "Sieve of Eratosthenes generates primes up to limit n in O(n log log n).",
          "Euclid GCD runs in logarithmic time by repeating modulo remainders."
        ]
      },
      {
        id: "number_theory",
        title: "Practice Problems",
        kind: "practice",
        intro: "Sieve arrays and array GCD calculations.",
        problems: [day6_to_8Problems.lc204, day6_to_8Problems.lc1979]
      }
    ]
  },
  {
    id: 12,
    day: 6,
    title: "Digit Manipulation & Number Patterns",
    duration: "2 hours",
    description: "Extract digits from numbers arithmetic-first, without conversion to strings.",
    focus: ["Digit extraction/reversal", "Armstrong/perfect/Krishnamurthy", "base conversion", "trailing zeros"],
    objectives: ["Reverse numeric digits in-place", "Verify numerical patterns", "Analyze trailing zeros of factorials"],
    sections: [
      {
        id: "overview",
        title: "Digit Extraction",
        kind: "text",
        intro: "Extract digits using modulo 10 and integer division to avoid string allocations.",
        bullets: [
          "Extract units digit using 'x % 10', remove using 'x //= 10'.",
          "Compare reversed numeric digits to check palindrome properties.",
          "Trailing zeros of N! are decided by counting factors of 5."
        ]
      },
      {
        id: "digits",
        title: "Practice Problems",
        kind: "practice",
        intro: "Implement numeric reverses, integer palindromes, and zero counts.",
        problems: [day6_to_8Problems.lc7, day6_to_8Problems.lc9, day6_to_8Problems.lc172]
      }
    ]
  },

  // Day 7
  {
    id: 13,
    day: 7,
    title: "Matrix & Pattern Printing",
    duration: "2 hours",
    description: "Navigate 2D arrays, matrix transformations, and circular boundary traversals.",
    focus: ["Transpose", "in-place 90-degree rotate", "spiral & diagonal order", "nested loop patterns"],
    objectives: ["Transpose 2D structures", "Rotate matrix columns and rows in-place", "Traverse matrices in spiral patterns"],
    sections: [
      {
        id: "overview",
        title: "Matrix Transformations",
        kind: "text",
        intro: "Manipulating grids requires tracking row and column index swaps.",
        bullets: [
          "Transpose matrix by swapping values at row/col indices (i, j) -> (j, i).",
          "Rotate 90 deg clockwise by transposing first, then reversing each row.",
          "Implement boundaries (top, bottom, left, right) to print spiral paths."
        ]
      },
      {
        id: "matrices",
        title: "Practice Problems",
        kind: "practice",
        intro: "Perform matrix rotations, transpositions, and spiral runs.",
        problems: [day6_to_8Problems.lc867, day6_to_8Problems.lc48, day6_to_8Problems.lc54]
      }
    ]
  },
  {
    id: 14,
    day: 7,
    title: "Sorting",
    duration: "2 hours",
    description: "Understand key sorting behaviors, stable/unstable splits, and custom comparator keys.",
    focus: ["Bubble/selection/insertion", "merge & quick", "stability", "sorted() with key"],
    objectives: ["Understand difference between O(n^2) and O(n log n) sorters", "Differentiate stable sorting characteristics", "Implement custom key sorting in Python"],
    sections: [
      {
        id: "overview",
        title: "Sorting Paradigms",
        kind: "text",
        intro: "Sorting is a core utility. Understanding partition pivots and merge loops is critical.",
        bullets: [
          "Merge Sort splits arrays recursively, merging in O(n log n) with O(n) space.",
          "Dutch National Flag partitions values in-place in linear O(n) time.",
          "Stable sorts preserve the original order of elements with equivalent keys."
        ]
      },
      {
        id: "sorting",
        title: "Practice Problems",
        kind: "practice",
        intro: "Work with array sorting and Dutch National Flag pivots.",
        problems: [day6_to_8Problems.lc912, day6_to_8Problems.lc75]
      }
    ]
  },

  // Day 8
  {
    id: 15,
    day: 8,
    title: "Binary Search",
    duration: "2 hours",
    description: "Use logarithmic partition searches on sorted data arrays.",
    focus: ["Loop invariants", "lower/upper bound templates", "first/last occurrence", "rotated sorted search"],
    objectives: ["Develop binary search loop invariants", "Find starting and ending bounds of targets", "Search within rotated sorted intervals"],
    sections: [
      {
        id: "overview",
        title: "Logarithmic Partitioning",
        kind: "binary-search",
        intro: "Binary search targets values by halving remaining bounds, operating in O(log n) time.",
        bullets: [
          "Invariant: Maintain low <= high boundaries safely.",
          "Lower bound matches first match; upper bound matches last match.",
          "Check which split half is sorted when searching rotated vectors."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Binary Search",
        kind: "worked",
        intro: "Binary Search implementation template.",
        examples: [
          {
            title: "Standard Binary Search",
            code: "arr = [2, 4, 6, 8, 10, 12, 14]\ntarget = 10\nlow, high = 0, len(arr) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n        print(f'Found at index {mid}')\n        break\n    elif arr[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1",
            expected: "Found at index 4",
            explanation: "Each step halves the search space. With N=1,000,000, this takes at most 20 steps!"
          }
        ]
      },
      {
        id: "binary_search",
        title: "Practice Problems",
        kind: "practice",
        intro: "Apply binary search variations to target offsets.",
        problems: [day6_to_8Problems.lc704, day6_to_8Problems.lc34, day6_to_8Problems.lc33]
      }
    ]
  },
  {
    id: 16,
    day: 8,
    title: "Practice Set 1 - Mixed, Untagged",
    duration: "2 hours",
    description: "Challenge yourself with unsorted, unlabeled questions to identify approaches.",
    focus: ["Untagged mixed problems", "array/string/hash/window/search", "approach selection"],
    objectives: ["Select optimal algorithm formats based on constraints", "Identify duplicates and missing integers", "Analyze buying stock profiles"],
    sections: [
      {
        id: "overview",
        title: "Mixed Challenge Sets",
        kind: "text",
        intro: "Real interviews don't tell you the topic. Learn to map constraints directly to appropriate structures.",
        bullets: [
          "Check values using sets, indices, or arithmetic sums.",
          "Process array queries using flat binary ranges.",
          "Maintain running min/max values to evaluate single-pass profits."
        ]
      },
      {
        id: "mixed_1",
        title: "Practice Problems",
        kind: "practice",
        intro: "Mixed untagged questions covering arrays, hashing, search, and strings.",
        problems: [
          day6_to_8Problems.lc217,
          day6_to_8Problems.lc88,
          day6_to_8Problems.lc66,
          day6_to_8Problems.lc268,
          day6_to_8Problems.lc350,
          day6_to_8Problems.lc205,
          day6_to_8Problems.lc74,
          day6_to_8Problems.lc121
        ]
      }
    ]
  },

  // Day 9
  {
    id: 17,
    day: 9,
    title: "Stacks",
    duration: "2 hours",
    description: "Learn LIFO (Last In First Out) operations, bracket checking, and monotonic trends.",
    focus: ["list as stack", "balanced parens", "postfix eval", "next greater element O(n)"],
    objectives: ["Implement LIFO workflows", "Evaluate RPN expressions arithmetic-first", "Manage monotonic decreasing stack indices"],
    sections: [
      {
        id: "overview",
        title: "Stack structures",
        kind: "stack",
        intro: "Stacks process nested or local updates in constant O(1) time.",
        bullets: [
          "Verify balanced brackets using matching stack pops.",
          "Evaluate postfix notation using stacks to store operands.",
          "Find next greater elements by maintaining monotonic bounds."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Stacks",
        kind: "worked",
        intro: "Using a Python list as a LIFO stack.",
        examples: [
          {
            title: "Valid Parentheses Checker",
            code: "s = '({[]})'\nstack = []\nmatching = {')': '(', ']': '[', '}': '{'}\nvalid = True\nfor char in s:\n    if char in '({[':\n        stack.append(char)\n    else:\n        if not stack or stack.pop() != matching[char]:\n            valid = False\n            break\nif stack:\n    valid = False\nprint('Is valid:', valid)",
            expected: "Is valid: True",
            explanation: "Push opening brackets. When seeing a closing bracket, pop the top and check if it matches."
          }
        ]
      },
      {
        id: "stacks",
        title: "Practice Problems",
        kind: "practice",
        intro: "Bracket validation, RPN execution, and monotonic greater offsets.",
        problems: [day9_to_11Problems.lc20, day9_to_11Problems.lc496, day9_to_11Problems.lc150]
      }
    ]
  },
  {
    id: 18,
    day: 9,
    title: "Queues & Deques",
    duration: "2 hours",
    description: "Master FIFO circular arrays, deque imports, and two-stack queue layouts.",
    focus: ["Circular queue", "deque", "two-stack queue", "buffering & scheduling"],
    objectives: ["Build circular arrays to represent buffer rings", "Leverage collections.deque for O(1) left pops", "Build queue structures using stack nodes"],
    sections: [
      {
        id: "overview",
        title: "FIFO structures",
        kind: "text",
        intro: "Queues maintain data chronologically, supporting arrival-first operations.",
        bullets: [
          "Circular queue pointers wrap using modulo operations.",
          "Python's list.pop(0) takes O(n). Always use collections.deque for O(1) shifts.",
          "Two stacks can build a queue by flipping LIFO into FIFO."
        ]
      },
      {
        id: "queues",
        title: "Practice Problems",
        kind: "practice",
        intro: "Implement queues using stacks, and construct circular deques.",
        problems: [day9_to_11Problems.lc232, day9_to_11Problems.lc641]
      }
    ]
  },

  // Day 10
  {
    id: 19,
    day: 10,
    title: "Linked Lists",
    duration: "2 hours",
    description: "Learn custom node chains, iterative link updates, and cycle detectors.",
    focus: ["Node class", "insert/delete/traverse", "reverse list", "Floyd cycle", "merge sorted"],
    objectives: ["Understand custom node references", "Reverse linked list links in-place", "Detect loops without extra memory"],
    sections: [
      {
        id: "overview",
        title: "Chained memory",
        kind: "text",
        intro: "Linked lists allocate nodes dynamically, connecting elements via pointers.",
        bullets: [
          "Reverse list links by shifting prev, curr, and nxt variables.",
          "Floyd's algorithm uses fast and slow pointers to detect cycles.",
          "Dummy nodes help merge or partition chains without null checks."
        ]
      },
      {
        id: "linked_lists",
        title: "Practice Problems",
        kind: "practice",
        intro: "Apply in-place reversals, cycle checks, and sorted merges.",
        problems: [day9_to_11Problems.lc206, day9_to_11Problems.lc141, day9_to_11Problems.lc21]
      }
    ]
  },
  {
    id: 20,
    day: 10,
    title: "Recursion Fundamentals",
    duration: "2 hours",
    description: "Break complex tasks down to base cases and recursive call structures.",
    focus: ["Call stack", "base case", "factorial/Fibonacci/Hanoi", "recursion-to-iteration"],
    objectives: ["Understand stack frame mechanics", "Define proper base cases", "Differentiate power values recursively"],
    sections: [
      {
        id: "overview",
        title: "Recursive Thinking",
        kind: "text",
        intro: "Recursion solves tasks by calling smaller instances of themselves, winding up stack frames.",
        bullets: [
          "Every recursive call requires a base case to stop.",
          "Avoid duplicate subproblem calls using DP/iteration.",
          "Recursion limits in Python are adjustable using sys.setrecursionlimit."
        ]
      },
      {
        id: "recursion",
        title: "Practice Problems",
        kind: "practice",
        intro: "Simple recursive-base arithmetic and check loops.",
        problems: [day9_to_11Problems.lc509, day9_to_11Problems.lc231]
      }
    ]
  },

  // Day 11
  {
    id: 21,
    day: 11,
    title: "Recursion & Backtracking - Basics",
    duration: "2 hours",
    description: "Explore search trees recursively, making selections and undoing state.",
    focus: ["Include-exclude trees", "subsets/permutations", "undo step", "duplicate handling", "pruning"],
    objectives: ["Generate complete subsets", "Swap list elements to get permutations", "Apply backtracking pop/swap undos"],
    sections: [
      {
        id: "overview",
        title: "Backtracking Search Trees",
        kind: "text",
        intro: "Backtracking systematically traverses combination states, backtracking when paths fail.",
        bullets: [
          "State decisions create paths of inclusion or exclusion.",
          "Always undo state changes (e.g. popping appended items) before backtracking.",
          "Prune unviable sub-paths early to prevent exponential TLE timeouts."
        ]
      },
      {
        id: "backtracking",
        title: "Practice Problems",
        kind: "practice",
        intro: "Generate subsets and full permutations.",
        problems: [day9_to_11Problems.lc78, day9_to_11Problems.lc46]
      }
    ]
  },
  {
    id: 22,
    day: 11,
    title: "Greedy & Interval Logic",
    duration: "2 hours",
    description: "Select locally optimal choices to achieve globally correct solutions.",
    focus: ["Exchange argument", "activity selection", "merging overlaps", "greedy vs DP"],
    objectives: ["Solve interval overlap checks", "Sort data vectors to support greedy selections", "Understand differences between greedy and DP"],
    sections: [
      {
        id: "overview",
        title: "Greedy Optimizations",
        kind: "text",
        intro: "Greedy algorithms make optimal local choices, which works only if subproblems don't conflict.",
        bullets: [
          "Sort intervals by start or end times to evaluate overlap paths.",
          "Combine small inputs with matching subsets (greedy assigning).",
          "If local choices restrict future steps, use Dynamic Programming instead."
        ]
      },
      {
        id: "greedy",
        title: "Practice Problems",
        kind: "practice",
        intro: "Solve cookie assignments, stock profile accumulations, and interval merges.",
        problems: [day9_to_11Problems.lc455, day9_to_11Problems.lc122, day9_to_11Problems.lc56]
      }
    ]
  },

  // Day 12
  {
    id: 23,
    day: 12,
    title: "Pseudocode, Code Tracing & Output Prediction",
    duration: "2 hours",
    description: "Verify your code reading and logical execution trace abilities.",
    focus: ["MCQs", "code tracing", "dry-runs", "mutable default traps", "integer division"],
    objectives: ["Identify output of complex nested loops", "Recognize reference and default parameters issues", "Trace complexity rates correctly"],
    quiz: [
      {
        question: "What is the output of: x = [[]] * 3; x[0].append(5); print(x)?",
        options: ["[[5], [], []]", "[[5], [5], [5]]", "[[], [], [5]]", "[[5]]"],
        answer: 1,
        explanation: "Multiplying list copies the inner list reference. All three slots reference the same list."
      },
      {
        question: "What does -5 // 2 evaluate to in Python?",
        options: ["-2", "-3", "-2.5", "2"],
        answer: 1,
        explanation: "Integer division floors toward negative infinity. -2.5 floored is -3."
      },
      {
        question: "For n elements, building a frequency map of an array of characters takes?",
        options: ["O(n log n) time, O(n) space", "O(n) time, O(1) space", "O(n^2) time, O(n) space", "O(1) time, O(1) space"],
        answer: 1,
        explanation: "Traversing once is O(n). Since there are only 26 lowercase characters, the hash map/array is O(1) auxiliary space."
      }
    ],
    sections: [
      {
        id: "overview",
        title: "Logical Code Tracing",
        kind: "text",
        intro: "Technical evaluations often include paper tracing. Avoid common Python-specific code pitfalls.",
        bullets: [
          "Default arguments in functions are evaluated once when defined (mutable default traps).",
          "Division '//' floors while '/' yields floats.",
          "Slicing lists 'a[:]' creates shallow copies, allocating new memory."
        ]
      },
      {
        id: "mcq_drill",
        title: "Mini tracing quiz",
        kind: "quiz",
        intro: "Check your tracing and complexity fundamentals."
      }
    ]
  },
  {
    id: 24,
    day: 12,
    title: "Heaps & Top-K",
    duration: "2 hours",
    description: "Implement Priority Queues using binary heaps to query top values.",
    focus: ["heapq", "max-heap negation", "tuples for custom order", "top-K", "heap vs sorting"],
    objectives: ["Implement min-heaps in Python", "Negate integer inputs to form max-heaps", "Solve top-K frequency problems in O(n log k) time"],
    sections: [
      {
        id: "overview",
        title: "Heaps / Priority Queues",
        kind: "text",
        intro: "Heaps provide constant-time O(1) retrieval of the minimum element, and O(log n) updates.",
        bullets: [
          "Python's heapq module implements min-heaps.",
          "Multiply integers by -1 to simulate max-heap behavior.",
          "Solve K-largest questions in O(N log K) using a heap of size K."
        ]
      },
      {
        id: "heaps",
        title: "Practice Problems",
        kind: "practice",
        intro: "Heaps and Priority Queue problem targets.",
        problems: [day12_to_15Problems.lc215, day12_to_15Problems.lc347]
      }
    ]
  },

  // Day 13
  {
    id: 25,
    day: 13,
    title: "Trees - Traversal & Basics",
    duration: "2 hours",
    description: "Understand recursive traversals and binary node tree structures.",
    focus: ["Recursive & iterative traversals", "BFS level order", "height", "mirror", "counting"],
    objectives: ["Write inorder, preorder, and postorder traversals", "Implement queue-based level order traversals", "Compute tree heights recursively"],
    sections: [
      {
        id: "overview",
        title: "Hierarchical Nodes",
        kind: "text",
        intro: "Binary trees are non-linear structures consisting of nodes with left and right children.",
        bullets: [
          "Recursive traversals visit nodes in DFS fashion (in/pre/post order).",
          "BFS level-order traversal uses queues to evaluate trees level-by-level.",
          "Invert a tree by swapping left and right references recursively."
        ]
      },
      {
        id: "trees_core",
        title: "Practice Problems",
        kind: "practice",
        intro: "Traverse, invert, and calculate tree depths.",
        problems: [day12_to_15Problems.lc102, day12_to_15Problems.lc104, day12_to_15Problems.lc226]
      }
    ]
  },
  {
    id: 26,
    day: 13,
    title: "BST & Graph Traversal Basics",
    duration: "2 hours",
    description: "Verify BST properties and explore linked adjacency maps.",
    focus: ["BST range validation", "adjacency list/matrix", "BFS/DFS", "grids as implicit graphs"],
    objectives: ["Validate binary search trees", "Represent graphs via adjacency lists", "Search 2D grid matrix islands"],
    sections: [
      {
        id: "overview",
        title: "BST & Grid Traversals",
        kind: "text",
        intro: "BSTs require left < root < right values. Graphs generalize grid coordinates.",
        bullets: [
          "BST validation requires updating bounds dynamically across recursion.",
          "Implicit graphs (like 2D grids) are traversed using step offsets.",
          "Mark grid locations as visited (sink them) during DFS sweeps."
        ]
      },
      {
        id: "bst_graphs",
        title: "Practice Problems",
        kind: "practice",
        intro: "Verify BST limits and traverse grid islands.",
        problems: [day12_to_15Problems.lc98, day12_to_15Problems.lc200]
      }
    ]
  },

  // Day 14
  {
    id: 27,
    day: 14,
    title: "DP - Foundations",
    duration: "2 hours",
    description: "Learn to memoize repetitive subproblems to optimize runtime.",
    focus: ["State, transition, base case", "memoization/tabulation", "1D DP", "Kadane's"],
    objectives: ["Define DP subproblem states", "Transition recursively using memo maps", "Build bottom-up tabulation vectors"],
    sections: [
      {
        id: "overview",
        title: "Dynamic Programming Basis",
        kind: "text",
        intro: "DP solves complex problems by combining solved overlapping subproblems.",
        bullets: [
          "State: Define parameters that completely represent a subproblem.",
          "Transition: Establish mathematical relationships between states.",
          "Space can often be optimized from O(n) to O(1) using variables."
        ]
      },
      {
        id: "dp_basics",
        title: "Practice Problems",
        kind: "practice",
        intro: "Climbing stairs, subarray Kadane sums, non-adjacent robberies, and change counts.",
        problems: [
          day12_to_15Problems.lc70,
          day12_to_15Problems.lc53,
          day12_to_15Problems.lc198,
          day12_to_15Problems.lc322
        ]
      }
    ]
  },
  {
    id: 28,
    day: 14,
    title: "DP - Common Placement Patterns",
    duration: "2 hours",
    description: "Solve key dynamic programming patterns including subsequences and subsets.",
    focus: ["LIS", "subset sum & partition", "grid paths", "DP vs greedy"],
    objectives: ["Solve O(n^2) Longest Increasing Subsequence layouts", "Verify equal sum subsets", "Count unique grid traversal paths"],
    sections: [
      {
        id: "overview",
        title: "DP Patterns",
        kind: "text",
        intro: "Familiarity with standard DP models helps you adapt transitions quickly.",
        bullets: [
          "LIS state: dp[i] tracks maximum sequence length ending at index i.",
          "Subset partitions run 0/1 Knapsack models backwards.",
          "Unique paths are computed by summing top and left grid cells."
        ]
      },
      {
        id: "dp_patterns",
        title: "Practice Problems",
        kind: "practice",
        intro: "Check increasing sequences, path sums, and partition targets.",
        problems: [day12_to_15Problems.lc300, day12_to_15Problems.lc62, day12_to_15Problems.lc416]
      }
    ]
  },

  // Day 15
  {
    id: 29,
    day: 15,
    title: "Practice Set 2 - Mixed, Untagged",
    duration: "2 hours",
    description: "Solve unlabeled tasks covering lists, recursion, trees, and DP.",
    focus: ["Untagged mixed problems (stack/list/recursion/trees/graphs/DP)", "no labels approach"],
    objectives: ["Diagnose problems without helper tags", "Combine list, stack, and search logic", "Apply trees and DP targets"],
    sections: [
      {
        id: "overview",
        title: "Placement Mixed Challenge",
        kind: "text",
        intro: "Review standard patterns by solving diverse questions.",
        bullets: [
          "Track local minimum values in stacks.",
          "Process linked list cycles, duplicates, and palindromes.",
          "Evaluate recursion combinations, tree paths, and coordinate grids."
        ]
      },
      {
        id: "mixed_2",
        title: "Practice Problems",
        kind: "practice",
        intro: "Advanced mixed challenge set.",
        problems: [
          day12_to_15Problems.lc155,
          day12_to_15Problems.lc83,
          day12_to_15Problems.lc234,
          day12_to_15Problems.lc39,
          day12_to_15Problems.lc100,
          day12_to_15Problems.lc543,
          day12_to_15Problems.lc733,
          day12_to_15Problems.lc746
        ]
      }
    ]
  },
  {
    id: 30,
    day: 15,
    title: "Consolidation & Technical Interview Drill",
    duration: "2 hours",
    description: "Consolidate learning and prep for placement technical rounds.",
    focus: ["Constraint size to technique map", "answering when stuck", "DSA viva", "30-day revision"],
    objectives: ["Estimate bounds for O(1) to O(2^n) algorithms", "Answering standard DSA viva questions", "Implement a structured revision schedule"],
    quiz: [
      {
        question: "If constraints state n <= 20, what is the most likely acceptable complexity?",
        options: ["O(n^2)", "O(2^n)", "O(n log n)", "O(n^3)"],
        answer: 1,
        explanation: "Exponential O(2^n) is practical when input size is extremely small (n <= 20)."
      },
      {
        question: "When constraints show n <= 10^5, what complexity class will pass?",
        options: ["O(n^2)", "O(n log n) or O(n)", "O(2^n)", "O(n^3)"],
        answer: 1,
        explanation: "10^5 elements require O(n log n) or O(n) to run within 1 second (~10^8 operations limit)."
      }
    ],
    sections: [
      {
        id: "overview",
        title: "Interview Strategies",
        kind: "text",
        intro: "Succeeding in technical interviews requires speaking your thoughts clearly while writing code.",
        bullets: [
          "Constraint Map: n <= 10 -> O(n!), n <= 20 -> O(2^n), n <= 1000 -> O(n^2), n <= 10^5 -> O(n log n).",
          "If stuck: talk out loud, write brute force first, then optimize.",
          "DSA Viva: understand difference between hash maps (O(1)) and balanced trees (O(log n))."
        ]
      },
      {
        id: "viva_drill",
        title: "Consolidation Quiz",
        kind: "quiz",
        intro: "Final check on placement constraints matching."
      }
    ]
  }
];

export const getSession = (id: number) => sessions.find((s) => s.id === id);
