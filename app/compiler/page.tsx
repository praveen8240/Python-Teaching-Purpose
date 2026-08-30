import { PythonPlayground } from "@/components/PythonPlayground";

export default function CompilerPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 py-12">
      <header className="mb-10">
        <p className="text-xs font-black uppercase text-[#196b4b]">
          Scratchpad
        </p>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">
          Local Compiler
        </h1>
        <p className="mt-3 max-w-2xl text-[#607067]">
          Use this scratchpad to explain general concepts, dry-run custom examples, or write ad-hoc Python code during live sessions.
        </p>
      </header>

      <div className="fade-up">
        <PythonPlayground
          id="compiler-scratchpad"
          initialCode={`# Write your Python code here
# Click the fullscreen button on the right to present on the projector

print("Hello, DSA Placement Mastery!")
`}
        />
      </div>
    </main>
  );
}
