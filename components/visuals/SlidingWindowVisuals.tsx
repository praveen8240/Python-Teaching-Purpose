"use client";
import { useState } from "react";
import { Maximize2, StepForward } from "lucide-react";

export function SlidingWindowVisualizer() {
  const arr = [2, 1, 5, 1, 3, 2];
  const windowSize = 3;
  const [left, setLeft] = useState(0);

  const currentSum = arr.slice(left, left + windowSize).reduce((a, b) => a + b, 0);

  const nextStep = () => {
    if (left < arr.length - windowSize) {
      setLeft(left + 1);
    }
  };

  const reset = () => {
    setLeft(0);
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Maximize2 className="text-[#196b4b]"/> Fixed Sliding Window</h3>
      <p className="mb-4 text-sm text-[#607067]">
        Instead of recalculating the sum of a window from scratch (O(k)), we can subtract the element leaving the window and add the new element entering it (O(1)).
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-4">Array (Window Size: {windowSize})</h4>
          <div className="flex gap-1 relative">
            {arr.map((val, idx) => {
              const inWindow = idx >= left && idx < left + windowSize;
              const isEntering = idx === left + windowSize - 1 && left > 0;
              const isLeaving = idx === left - 1;
              
              return (
                <div key={idx} className={`w-12 h-12 flex items-center justify-center border-2 rounded transition-all duration-300 ${inWindow ? 'border-[#196b4b] bg-[#e8f3ec] font-bold text-[#196b4b] scale-110 z-10' : isLeaving ? 'border-red-300 bg-red-50 text-red-400' : 'border-gray-200 text-gray-400'}`}>
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 p-4 bg-[#f8faf9] rounded border border-[#e8f3ec]">
            <h4 className="text-xs font-bold text-[#607067] uppercase tracking-wider mb-2">Current Window Sum</h4>
            <div className="text-3xl font-black text-[#196b4b]">{currentSum}</div>
          </div>
          
          <div className="flex-2 p-4 bg-gray-900 text-green-400 rounded font-mono text-xs flex flex-col justify-center w-full">
            {left === 0 ? (
              <div>Initial sum = {arr[0]} + {arr[1]} + {arr[2]} = {currentSum}</div>
            ) : (
              <div>
                <span className="text-gray-400">Previous sum:</span> {currentSum - arr[left + windowSize - 1] + arr[left - 1]}<br/>
                <span className="text-red-400">- Subtract outgoing ({arr[left - 1]})</span><br/>
                <span className="text-green-400">+ Add incoming ({arr[left + windowSize - 1]})</span><br/>
                <span className="text-white font-bold">= New sum: {currentSum}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={left >= arr.length - windowSize}>
          <StepForward size={16} /> Slide Window Right
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
