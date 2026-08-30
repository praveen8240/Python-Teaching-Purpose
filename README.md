# DSA Placement Mastery

An interactive classroom-style DSA platform built with Next.js, TypeScript, Tailwind CSS, CodeMirror, and the Python installed on the host computer. The current curriculum contains Sessions 1-3 only; typed lesson data and reusable renderers are designed for later sessions.

## Requirements

- Node.js 20.9 or newer (Node 24 is supported)
- npm 10 or newer
- Python 3.10+ available as `python`, or an explicit interpreter path
- A local machine. The runner is intentionally not a hosted sandbox.

## Install and run

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`. On systems where `npm` works normally, `npm install` and `npm run dev` are equivalent.

If Python is not on PATH, set its full path before starting Next.js:

```powershell
$env:PYTHON_EXECUTABLE = "C:\Path\To\python.exe"
npm.cmd run dev
```

Verify the interpreter first with `& $env:PYTHON_EXECUTABLE --version`.

## Python execution

The editor sends `{ code, input }` to `POST /api/run-python`. The Node.js API starts only the configured Python executable with fixed `-I -S -c` arguments, writes the provided input to stdin, and returns stdout, stderr, exit code, execution time, and timeout state.

Boundaries in `app/api/run-python/route.ts`:

- 3-second execution timeout and forced process termination
- 50 KB code and stdin limits
- 100 KB output limit
- isolated Python mode and no site initialization
- fixed executable and arguments; the request cannot select a shell command
- production execution disabled unless `ENABLE_LOCAL_PYTHON=true`

This reduces accidental damage but is **not a security sandbox**. Python code can still use Python APIs to access resources available to the local OS account. Run only trusted classroom code. For untrusted public users, replace this route with a container/VM sandbox that has filesystem, network, memory, CPU, and syscall isolation.

## Routes

- `/` dashboard
- `/sessions` current curriculum
- `/session/1` complexity and orientation
- `/session/2` full-program I/O and judge discipline
- `/session/3` arrays and manipulation

## Project structure

```text
app/                  App Router pages, layout, styles, Python API
components/           Lesson renderer, editor, quiz, practice UI
components/visuals/   Reusable interactive teaching visualizers
content/              Typed session and practice-problem data
lib/                  Browser progress persistence
types/                Curriculum contracts
```

Progress (completed sections, quiz scores, and practice completion) is stored in browser `localStorage` under `dsa-progress`. No account is required.

## Adding Session 4

1. Add a `Session` object to `content/sessions.ts` using the contracts in `types/lesson.ts`.
2. Compose it from existing section kinds such as `text`, `io`, `practice`, or `worked`.
3. Add new `PracticeProblem` objects in `content/problems.ts` when needed.
4. Only when the topic needs a genuinely new interaction, create a visualizer under `components/visuals` and add its section kind to `LessonSection.tsx`.
5. The dashboard, `/sessions`, static route generation, sidebar, and progress calculation update from the data automatically.

## Adding a practice problem

Create a typed object with statement, formats, constraints, hint, starter code, test input, expected output, explanation, complexity, and common mistakes. Attach it to a section whose kind is `practice`, or to a visualization section that renders practice problems.

## Teaching content included

Session 1 covers DSA reasoning, animated solution flow, Big-O comparison, an operations-budget calculator, four runnable worked examples, common pattern clues, Python toolchain, and a nine-question quiz.

Session 2 covers judge flow, `input`, `readline`, `read`, arrays of input, multiple test cases, exact formatting, interactive WA/RE/TLE diagnosis, and six complete stub-to-program drills.

Session 3 includes a mutable array visualizer, animated traversal and indexing, off-by-one comparison, list aliasing, slicing controls, LC 189's reversal sequence, LC 26's slow/fast pointer trace, and runnable practice editors for both problems.
