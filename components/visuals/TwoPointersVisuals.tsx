"use client";
import { useState } from "react";
import { ArrowLeftRight, StepForward } from "lucide-react";

export function TwoPointersVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [1, 2, 3, 4, 6, 8, 9];
  const target = 10;
  
  // Track pointers history
  const history = [
    { left: 0, right: 6 }, // 1+9 = 10 (Found!)
  ];
  
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(6);
  const [found, setFound] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const nextStep = () => {
    if (found || left >= right) return;
    
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      setLogs([...logs, `L=${left}, R=${right} -> ${arr[left]} + ${arr[right]} = ${sum}. MATCH!`]);
      setFound(true);
    } else if (sum < target) {
      setLogs([...logs, `L=${left}, R=${right} -> ${arr[left]} + ${arr[right]} = ${sum}. Too small, move Left.`]);
      setLeft(left + 1);
    } else {
      setLogs([...logs, `L=${left}, R=${right} -> ${arr[left]} + ${arr[right]} = ${sum}. Too big, move Right.`]);
      setRight(right - 1);
    }
  };

  const reset = () => {
    setLeft(0);
    setRight(6);
    setFound(false);
    setLogs([]);
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><ArrowLeftRight className="text-[#196b4b]"/> Two Pointers (Opposing)</h3>
      <p className="mb-4 text-sm text-[#607067]">
        When an array is sorted, you can find a pair that sums to a target in O(N) time.
        Start pointers at both ends. If the sum is too small, increase the left pointer. If it's too big, decrease the right pointer.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Sorted Array (Target: {target})</h4>
          <div className="flex gap-2 mb-2">
            {arr.map((val, idx) => {
              const isLeft = idx === left;
              const isRight = idx === right;
              
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center border-2 rounded ${isLeft || isRight ? 'border-[#196b4b] bg-[#e8f3ec] font-bold text-[#196b4b]' : 'border-gray-200 text-gray-500'}`}>
                    {val}
                  </div>
                  <div className="h-6 mt-1 text-xs font-bold text-[#196b4b]">
                    {isLeft && "L"}
                    {isRight && (isLeft ? ", R" : "R")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Execution Log</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs min-h-[100px] flex flex-col gap-1">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
            {!found && left < right && <div>Waiting for next step...</div>}
            {left >= right && !found && <div className="text-red-400">Pointers crossed. Target not found.</div>}
            {found && <div className="text-white font-bold bg-green-700 inline-block px-2 py-1 mt-1 rounded">Target Found!</div>}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={found || left >= right}>
          <StepForward size={16} /> Next Step
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
