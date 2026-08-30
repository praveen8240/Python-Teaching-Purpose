"use client";
import { useState } from "react";
import { Search, SplitSquareHorizontal } from "lucide-react";

export function BinarySearchVisualizer() {
  const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  const target = 22;
  
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(arr.length - 1);
  const [mid, setMid] = useState(Math.floor((arr.length - 1) / 2));
  const [found, setFound] = useState(false);
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (found || low > high) return;

    if (arr[mid] === target) {
      setFound(true);
    } else if (arr[mid] < target) {
      const newLow = mid + 1;
      setLow(newLow);
      setMid(Math.floor((newLow + high) / 2));
    } else {
      const newHigh = mid - 1;
      setHigh(newHigh);
      setMid(Math.floor((low + newHigh) / 2));
    }
    setStep(step + 1);
  };

  const reset = () => {
    setLow(0);
    setHigh(arr.length - 1);
    setMid(Math.floor((arr.length - 1) / 2));
    setFound(false);
    setStep(0);
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><SplitSquareHorizontal className="text-[#196b4b]"/> Binary Search (O(log n))</h3>
      <p className="mb-4 text-sm text-[#607067]">
        To find {target}, check the middle element. If it's too small, discard the left half. If it's too large, discard the right half.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex gap-1 overflow-x-auto pb-4">
            {arr.map((val, idx) => {
              const isDiscarded = idx < low || idx > high;
              const isMid = idx === mid && !found;
              const isFound = found && idx === mid;
              
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-10 h-10 flex flex-shrink-0 items-center justify-center border-2 rounded transition-all ${isFound ? 'border-orange-500 bg-orange-100 font-black text-orange-600 scale-110' : isMid ? 'border-blue-500 bg-blue-100 font-bold' : isDiscarded ? 'border-gray-100 bg-gray-50 text-gray-300 opacity-50' : 'border-[#196b4b] bg-[#e8f3ec] text-[#196b4b]'}`}>
                    {val}
                  </div>
                  <div className="h-4 mt-1 text-[10px] font-bold">
                    {idx === low && !isDiscarded && <span className="text-[#196b4b]">L</span>}
                    {idx === mid && !isDiscarded && <span className="text-blue-500">M</span>}
                    {idx === high && !isDiscarded && <span className="text-[#196b4b]">R</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-gray-900 text-green-400 rounded font-mono text-xs flex flex-col gap-1 min-h-[80px]">
          {found ? (
            <div className="text-white font-bold bg-green-700 px-2 py-1 rounded inline-block self-start">
              Found {target} at index {mid} in {step} steps!
            </div>
          ) : low <= high ? (
            <>
              <div>Step {step}: Searching bounds [{low}, {high}]. Mid = {mid} (Value: {arr[mid]}).</div>
              <div className="text-gray-400">
                {arr[mid]} {arr[mid] < target ? '<' : '>'} {target}. 
                {arr[mid] < target ? ' Discard left half.' : ' Discard right half.'}
              </div>
            </>
          ) : (
            <div className="text-red-400">Target {target} not found in array.</div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={found || low > high}>
          <Search size={16} /> Check Midpoint
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
