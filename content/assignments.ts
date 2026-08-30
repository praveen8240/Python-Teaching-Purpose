export type Example = { input: string; output: string };
export type Assignment = {
  id: string;
  title: string;
  source: string;
  url?: string;
  rating: number;
  tags: string[];
  timeLimit: string;
  memoryLimit: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  examples: Example[];
  note?: string;
  thinkTime: number;
  hint: string;
  editorial: string;
  solutionCode: string;
  starterCode: string;
  testInput: string;
  expectedOutput: string;
};

export const assignments: Assignment[] = [
  {
    id: "watermelon",
    title: "A. Watermelon",
    source: "Codeforces 4A",
    url: "https://codeforces.com/problemset/problem/4/A",
    rating: 800,
    tags: ["math", "brute force"],
    timeLimit: "1 second",
    memoryLimit: "64 megabytes",
    statement: `Pete and Billy have a watermelon that weighs w kg. They want to divide it into two parts, each part weighing an even number of kilograms.\n\nDetermine if they can do so. Each part must weigh at least 1 kg.\n\nNote that each part should weigh an even positive number of kilograms.`,
    inputFormat: "A single integer w (1 ≤ w ≤ 100) — the weight of the watermelon.",
    outputFormat: 'Print "YES" if they can divide the watermelon as described, and "NO" otherwise.',
    examples: [
      { input: "8", output: "YES" },
    ],
    note: "For w = 8, they can split it into 2 + 6, 4 + 4, etc.",
    thinkTime: 120,
    hint: "If w is even and greater than 2, can you always split it into two even parts? Think about the simplest split: 2 and (w-2).",
    editorial: `Key insight: We need two even positive integers that sum to w.\n\nThe smallest even positive integer is 2. If we take 2, the other part is w − 2.\n\nFor both parts to be even and positive:\n• w must be even (so w − 2 is also even)\n• w must be > 2 (so both parts ≥ 2)\n\nThat's it! Just check: w > 2 and w is even.\n\nTime: O(1) | Space: O(1)`,
    solutionCode: `w = int(input())
if w > 2 and w % 2 == 0:
    print("YES")
else:
    print("NO")`,
    starterCode: `def solve():
    w = int(input())
    # Your code here
    pass

solve()`,
    testInput: "8\n",
    expectedOutput: "YES",
  },
  {
    id: "way-too-long-words",
    title: "A. Way Too Long Words",
    source: "Codeforces 71A",
    url: "https://codeforces.com/problemset/problem/71/A",
    rating: 800,
    tags: ["strings", "implementation"],
    timeLimit: "1 second",
    memoryLimit: "256 megabytes",
    statement: `Sometimes some words like "localization" or "internationalization" are so long that writing them many times in one text is quite tiresome.\n\nSo a word that is more than 10 characters long should be abbreviated. The abbreviation is: the first letter, then the number of characters between the first and last letters, then the last letter.\n\nIf the word has at most 10 characters, print it as-is.`,
    inputFormat: "The first line contains an integer n (1 ≤ n ≤ 100). Each of the following n lines contains one word (lowercase Latin letters, length 1 to 100).",
    outputFormat: "For each word, print its abbreviation (or the word itself if length ≤ 10).",
    examples: [
      { input: "4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis", output: "word\nl10n\ni18n\np43s" },
    ],
    thinkTime: 120,
    hint: "Check the length of each word. If it's > 10, you need: first_char + str(len - 2) + last_char.",
    editorial: `Simple string manipulation:\n\nFor each word:\n• If len(word) ≤ 10 → print as-is\n• Otherwise → first letter + count of middle chars + last letter\n\nThe count of middle characters = len(word) - 2.\n\nTime: O(n) per word | Space: O(1)`,
    solutionCode: `n = int(input())
for _ in range(n):
    word = input()
    if len(word) <= 10:
        print(word)
    else:
        print(f"{word[0]}{len(word) - 2}{word[-1]}")`,
    starterCode: `def solve():
    n = int(input())
    for _ in range(n):
        word = input()
        # Your code here
        pass

solve()`,
    testInput: "4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis\n",
    expectedOutput: "word\nl10n\ni18n\np43s",
  },
  {
    id: "team",
    title: "A. Team",
    source: "Codeforces 231A",
    url: "https://codeforces.com/problemset/problem/231/A",
    rating: 800,
    tags: ["brute force", "greedy"],
    timeLimit: "2 seconds",
    memoryLimit: "256 megabytes",
    statement: `One day three best friends Petya, Vasya and Tonya decided to form a team and take part in programming contests.\n\nFor each problem they discuss whether at least two of them are sure about the solution. If at least two of them are sure, they implement the solution. Otherwise they skip the problem.\n\nYou are given the list of problems. For each problem, you know which friends are sure about the solution. Determine the number of problems the friends will implement.`,
    inputFormat: "The first line contains n (1 ≤ n ≤ 1000). Each of the next n lines contains three integers, each 0 or 1, describing whether Petya, Vasya, and Tonya are sure about the i-th problem.",
    outputFormat: "Print the number of problems the friends will implement.",
    examples: [
      { input: "3\n1 1 0\n1 0 1\n0 0 0", output: "2" },
    ],
    note: "In the first problem, Petya and Vasya are sure (2 ≥ 2 ✓). In the second, Petya and Tonya (2 ≥ 2 ✓). In the third, nobody is sure (0 < 2 ✗).",
    thinkTime: 90,
    hint: "For each problem, sum the three values. If the sum is ≥ 2, they solve it.",
    editorial: `For each problem, sum the three confidence values.\n\nIf sum ≥ 2, at least two friends are sure → count it.\n\nAnswer = number of rows where sum ≥ 2.\n\nTime: O(n) | Space: O(1)`,
    solutionCode: `n = int(input())
count = 0
for _ in range(n):
    a, b, c = map(int, input().split())
    if a + b + c >= 2:
        count += 1
print(count)`,
    starterCode: `def solve():
    n = int(input())
    # Your code here
    pass

solve()`,
    testInput: "3\n1 1 0\n1 0 1\n0 0 0\n",
    expectedOutput: "2",
  },
  {
    id: "next-round",
    title: "A. Next Round",
    source: "Codeforces 158A",
    url: "https://codeforces.com/problemset/problem/158/A",
    rating: 800,
    tags: ["implementation"],
    timeLimit: "3 seconds",
    memoryLimit: "256 megabytes",
    statement: `"Contestant who earns a score equal to or greater than the k-th place finisher's score will advance to the next round, as long as the contestant earns a positive score..." — anass(i)stant to the head of the Berland Olympiad in Informatics.\n\nThe게 were n participants in the Berland Olympiad. Determine how many participants will advance to the next round.\n\nA participant advances if their score is ≥ the score of the k-th place finisher AND their score is strictly positive (> 0).`,
    inputFormat: "The first line contains two integers n and k (1 ≤ k ≤ n ≤ 50). The second line contains n scores in non-increasing order (0 ≤ score ≤ 100).",
    outputFormat: "Print the number of participants who advance to the next round.",
    examples: [
      { input: "8 5\n10 9 8 7 7 7 5 5", output: "6" },
      { input: "4 2\n0 0 0 0", output: "0" },
    ],
    note: "In the first example, the 5th place score is 7. Scores ≥ 7 and > 0: there are 6 such participants.",
    thinkTime: 90,
    hint: "Find the k-th score (index k-1). Count how many scores are ≥ that value AND > 0.",
    editorial: `The scores are already sorted in non-increasing order.\n\nThe k-th place score is scores[k-1].\n\nA participant advances if:\n• score ≥ scores[k-1] (at least as good as k-th place)\n• score > 0 (must have a positive score)\n\nJust count how many scores satisfy both conditions.\n\nTime: O(n) | Space: O(n)`,
    solutionCode: `n, k = map(int, input().split())
scores = list(map(int, input().split()))
threshold = scores[k - 1]
count = 0
for s in scores:
    if s >= threshold and s > 0:
        count += 1
print(count)`,
    starterCode: `def solve():
    n, k = map(int, input().split())
    scores = list(map(int, input().split()))
    # Your code here
    pass

solve()`,
    testInput: "8 5\n10 9 8 7 7 7 5 5\n",
    expectedOutput: "6",
  },
  {
    id: "domino-piling",
    title: "A. Domino Piling",
    source: "Codeforces 50A",
    url: "https://codeforces.com/problemset/problem/50/A",
    rating: 800,
    tags: ["math", "greedy"],
    timeLimit: "2 seconds",
    memoryLimit: "256 megabytes",
    statement: `You are given an M × N board. Determine the maximum number of dominoes (2 × 1 tiles) that can be placed on the board.\n\nEach domino covers exactly two cells. Dominoes can be placed horizontally or vertically. Dominoes must not overlap and must stay within the board.`,
    inputFormat: "A single line contains two integers M and N (1 ≤ M, N ≤ 16).",
    outputFormat: "Print the maximum number of dominoes that can be placed.",
    examples: [
      { input: "2 4", output: "4" },
      { input: "3 3", output: "4" },
    ],
    note: "A 2×4 board has 8 cells; each domino covers 2, so 4 dominoes fit perfectly. A 3×3 board has 9 cells; at most 4 dominoes cover 8 cells, with 1 cell left over.",
    thinkTime: 90,
    hint: "Each domino covers exactly 2 cells. The total number of cells is M × N. Can you always tile floor(M*N / 2) dominoes?",
    editorial: `Each domino covers exactly 2 cells.\n\nTotal cells = M × N.\n\nMaximum dominoes = M × N ÷ 2 (integer division).\n\nThis always works because we can tile row by row. If a row has an odd cell left, the next row's start covers it.\n\nTime: O(1) | Space: O(1)`,
    solutionCode: `m, n = map(int, input().split())
print(m * n // 2)`,
    starterCode: `def solve():
    m, n = map(int, input().split())
    # Your code here
    pass

solve()`,
    testInput: "2 4\n",
    expectedOutput: "4",
  },
  {
    id: "avtobus",
    title: "A. AvtoBus",
    source: "Codeforces 1700A",
    url: "https://codeforces.com/problemset/problem/1679/A",
    rating: 900,
    tags: ["math", "number theory"],
    timeLimit: "1 second",
    memoryLimit: "256 megabytes",
    statement: `Spring has come, and the management of the AvtoBus bus fleet has given the order to replace winter tires with summer tires on all buses.\n\nYou own a small bus service business and you have just received an order to replace n tires. You know that the bus fleet owns two types of buses: with two axles (these buses have 4 wheels) and with three axles (these buses have 6 wheels).\n\nYou don't know how many buses of which type the AvtoBus bus fleet owns, so you wonder how many buses the fleet might have. You have to determine the minimum and the maximum number of buses that can be in the fleet if you know that the total number of wheels for all buses is n.`,
    inputFormat: "The first line contains an integer t (1 ≤ t ≤ 1000) — the number of test cases.\n\nThe only line of each test case contains one integer n (1 ≤ n ≤ 10^18) — the total number of wheels for all buses.",
    outputFormat: "For each test case print two integers x and y (1 ≤ x ≤ y) — the minimum and the maximum number of buses. If there is no suitable number of buses for the given n, print −1.",
    examples: [
      { input: "4\n4\n7\n24\n998244353998244352", output: "1 1\n-1\n4 6\n166374058999707392 249561088499561088" },
    ],
    note: "For n = 4: only one 4-wheel bus. For n = 7: impossible (not representable as 4a + 6b). For n = 24: min is four 6-wheel buses (4), max is six 4-wheel buses (6).",
    thinkTime: 300,
    hint: "We need 4a + 6b = n where a, b ≥ 0. For maximum buses, use as many 4-wheel buses as possible. For minimum, use as many 6-wheel buses as possible. When is it impossible?",
    editorial: `We need non-negative integers a, b such that 4a + 6b = n.\n\nFirst, n must be even (both 4 and 6 are even). Also n must be ≥ 4.\n\nFor maximum buses (maximize a + b): use as many 4-wheel buses as possible.\n• If n % 4 == 0 → all 4-wheel: max = n / 4\n• If n % 4 == 2 → one 6-wheel, rest 4-wheel: max = 1 + (n - 6) / 4 = (n - 2) / 4\n\nFor minimum buses (minimize a + b): use as many 6-wheel buses as possible.\n• If n % 6 == 0 → all 6-wheel: min = n / 6\n• If n % 6 == 2 → impossible with only 6-wheel, need two 4-wheel to make 8, then rest 6-wheel. Need n ≥ 8: min = 2 + (n - 8) / 6\n• If n % 6 == 4 → one 4-wheel, rest 6-wheel: min = 1 + (n - 4) / 6\n\nSpecial case: n < 4 → impossible. n = 4 → (1, 1). n = 6 → (1, 1). n = 2 → impossible.\n\nTime: O(1) per test case | Space: O(1)`,
    solutionCode: `t = int(input())
for _ in range(t):
    n = int(input())
    if n < 4 or n % 2 != 0:
        print(-1)
    else:
        # Maximum: use as many 4-wheel buses as possible
        if n % 4 == 0:
            mx = n // 4
        else:
            # n % 4 == 2, use one 6-wheel bus
            mx = 1 + (n - 6) // 4
        
        # Minimum: use as many 6-wheel buses as possible
        r = n % 6
        if r == 0:
            mn = n // 6
        elif r == 2:
            # Need at least 2 four-wheelers (8 wheels)
            if n >= 8:
                mn = 2 + (n - 8) // 6
            else:
                print(-1)
                continue
        else:  # r == 4
            mn = 1 + (n - 4) // 6
        
        print(mn, mx)`,
    starterCode: `def solve():
    t = int(input())
    for _ in range(t):
        n = int(input())
        # Your code here
        pass

solve()`,
    testInput: "4\n4\n7\n24\n998244353998244352\n",
    expectedOutput: "1 1\n-1\n4 6\n166374058999707392 249561088499561088",
  },
];
