"use client";
import { useState } from "react";
import { Type, Play } from "lucide-react";

export function StringImmutabilityVisualizer() {
  const [step, setStep] = useState(0);
  const words = ["Hello", " ", "World", "!"];
  const [memoryStrings, setMemoryStrings] = useState<string[]>([]);
  const [currentString, setCurrentString] = useState("");

  const nextStep = () => {
    if (step < words.length) {
      const newStr = currentString + words[step];
      setCurrentString(newStr);
      setMemoryStrings([...memoryStrings, newStr]);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setCurrentString("");
    setMemoryStrings([]);
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Type className="text-[#196b4b]"/> String Immutability Trap</h3>
      <p className="mb-4 text-sm text-[#607067]">
        In Python, strings are immutable. Every time you do <code>s += word</code>, Python has to create a brand new string in memory and copy all the characters over.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Code Execution</h4>
          <div className="p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm font-mono">
            s = ""<br/>
            for word in ["Hello", " ", "World", "!"]:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#196b4b] font-bold">s += word</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Memory Allocations (O(N²) overhead)</h4>
          <div className="flex flex-col gap-2">
            {memoryStrings.map((str, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-16">Step {idx + 1}</span>
                <div className="px-3 py-1 bg-red-50 border border-red-200 text-red-800 font-mono text-sm rounded shadow-sm">
                  "{str}" <span className="text-xs text-red-500 ml-2">(new copy allocated)</span>
                </div>
              </div>
            ))}
            {step === 0 && (
              <div className="text-sm text-gray-400 italic">No strings allocated yet.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={step >= words.length}>
          <Play size={16} /> Loop Iteration
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {step === words.length && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded border border-green-200 text-sm">
          <strong>The Solution:</strong> Use <code>"".join(list_of_strings)</code> instead, which calculates total length once and allocates memory exactly once (O(N)).
        </div>
      )}
    </div>
  );
}
