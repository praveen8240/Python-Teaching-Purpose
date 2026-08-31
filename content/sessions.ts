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
      }
    ],
    quiz: [
      {
        question: "What is the final output of this code?\n\nnums = [1, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)",
        options: ["[1, 3]", "[1, 2, 3, 4]", "[1, 3, 4]", "Raises an Error"],
        answer: 2,
        explanation: "Never modify a list while iterating over it! When 2 is removed, the remaining elements shift left. The iterator moves to the next index, entirely skipping 3! The safe way is to iterate over a copy: `for n in nums[:]`."
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
        intro: "Apply prefix sums and product accumulation techniques.",
        problems: [day2_to_5Problems.lc303, day2_to_5Problems.lc238]
      }
    ]
  },

  // Day 3
  {
    id: 5,
    day: 3,
    title: "Hashing - Frequency Maps & Sets",
    duration: "2 hours",
    description: "Master fast elements lookup using hash tables, sets, and frequency counters.",
    focus: ["dict, set, Counter", "duplicate detection", "first non-repeating", "fixed-slot list"],
    objectives: ["Leverage O(1) average lookup times", "Detect duplicates in linear time", "Utilize Counter for element counts"],
    sections: [
      {
        id: "overview",
        title: "Hash Tables under the hood",
        kind: "hashing",
        intro: "Python's dict and set use hash tables to search, insert, and delete elements in constant O(1) average time.",
        bullets: [
          "Sets contain only unique items, checking membership in O(1).",
          "Dicts store key-value pairs, tracking frequencies easily.",
          "Alphabet frequency can be tracked using a size-26 list for speed."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Hashing in Python",
        kind: "worked",
        intro: "Understand how to implement frequency maps and unique lookups.",
        examples: [
          {
            title: "Frequency Map with dict.get()",
            code: "arr = ['apple', 'banana', 'apple']\nfreq = {}\nfor item in arr:\n    freq[item] = freq.get(item, 0) + 1\nprint('Frequencies:', freq)",
            expected: "Frequencies: {'apple': 2, 'banana': 1}",
            explanation: "The .get(item, 0) safely returns 0 if the key doesn't exist yet, avoiding a KeyError."
          },
          {
            title: "Two Sum with a Dictionary",
            code: "arr = [2, 7, 11, 15]\ntarget = 9\nseen = {}\nfor i, num in enumerate(arr):\n    complement = target - num\n    if complement in seen:\n        print(f'Found indices: {seen[complement]} and {i}')\n        break\n    seen[num] = i",
            expected: "Found indices: 0 and 1",
            explanation: "Instead of searching the array again (O(n)), we just check if the complement exists in our dictionary (O(1))."
          }
        ]
      },
      {
        id: "basics",
        title: "Practice Problems",
        kind: "practice",
        intro: "Basic lookup and hashing drills.",
        problems: [day2_to_5Problems.lc1, day2_to_5Problems.lc387]
      }
    ]
  },
  {
    id: 6,
    day: 3,
    title: "Hashing - Applied Techniques",
    duration: "2 hours",
    description: "Solve complex array problems by combining hashing with prefix sums and XOR math.",
    focus: ["Derived-key hashing", "prefix sum with dict", "XOR cancellation"],
    objectives: ["Represent complex collections as dictionary keys", "Find subarrays summing to K in O(n)", "Find single odd-occurrence elements"],
    sections: [
      {
        id: "overview",
        title: "Advanced Keys & Prefix Hashes",
        kind: "text",
        intro: "Using sorted strings or tuples as dictionary keys enables grouping related sets of items.",
        bullets: [
          "Group items with identical signatures (like sorted anagrams).",
          "Store previous prefix sums in a dictionary to count matching ranges.",
          "XOR logic cancels identical element pairs: A ^ A = 0."
        ]
      },
      {
        id: "applied",
        title: "Practice Problems",
        kind: "practice",
        intro: "Group anagrams, check prefix target ranges, and apply bitwise logic.",
        problems: [day2_to_5Problems.lc49, day2_to_5Problems.lc560, day2_to_5Problems.lc136]
      }
    ]
  },

  // Day 4
  {
    id: 7,
    day: 4,
    title: "Strings - Core Operations",
    duration: "2 hours",
    description: "Understand string structures in Python, including immutability and character math.",
    focus: ["str immutability", "concat O(n^2)", "list-and-join", "ord/chr arithmetic", "palindromes"],
    objectives: ["Avoid quadratic concatenation traps", "Perform numeric offsets using ord() and chr()", "Implement efficient two-pointer palindrome checkers"],
    sections: [
      {
        id: "overview",
        title: "Python String Architecture",
        kind: "strings",
        intro: "Strings in Python are immutable. Every concatenation 's += char' creates a brand new string.",
        bullets: [
          "Concatenating in a loop takes O(n^2). Use list-and-join instead.",
          "Character math: ord('a') returns 97, chr(97) returns 'a'.",
          "Skip irrelevant whitespace and punctuation using alphanumeric checks."
        ]
      },
      {
        id: "worked",
        title: "Worked Examples: Strings",
        kind: "worked",
        intro: "Let's see the right way to manipulate strings.",
        examples: [
          {
            title: "O(n) String Building",
            code: "words = ['Hello', 'World', 'Python']\nchars = []\nfor w in words:\n    chars.append(w)\nresult = ' '.join(chars)\nprint(result)",
            expected: "Hello World Python",
            explanation: "Appending to a list and joining at the end is O(n), avoiding the O(n^2) trap of string concatenation."
          },
          {
            title: "Character Math",
            code: "char = 'c'\noffset = ord(char) - ord('a')\nprint(f'{char} is offset by {offset} from a')\nnext_char = chr(ord(char) + 1)\nprint(f'Next character is {next_char}')",
            expected: "c is offset by 2 from a\nNext character is d",
            explanation: "ord() gets the ASCII value. You can use it to map 'a'-'z' to 0-25."
          }
        ]
      },
      {
        id: "strings_core",
        title: "Practice Problems",
        kind: "practice",
        intro: "Perform in-place character swaps and string structure analysis.",
        problems: [day2_to_5Problems.lc344, day2_to_5Problems.lc125]
      }
    ]
  },
  {
    id: 8,
    day: 4,
    title: "Strings - Pattern Problems",
    duration: "2 hours",
    description: "Solve common string manipulation problems using frequency signatures and pointers.",
    focus: ["Anagram checks", "frequency signatures", "run-length compression", "format parsing"],
    objectives: ["Compress strings in-place", "Compare string prefixes efficiently", "Design string frequency mappings"],
    sections: [
      {
        id: "overview",
        title: "String Patterns",
        kind: "text",
        intro: "Solving string puzzles requires maintaining pointers for reading, writing, or matching patterns.",
        bullets: [
          "Group occurrences in-place by writing characters and their counts.",
          "Check multiple prefixes vertically to find matching characters.",
          "Build frequency signatures to quickly evaluate structural equality."
        ]
      },
      {
        id: "strings_patterns",
        title: "Practice Problems",
        kind: "practice",
        intro: "Work with string compression, anagram validity, and prefix searches.",
        problems: [day2_to_5Problems.lc242, day2_to_5Problems.lc443, day2_to_5Problems.lc14]
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
