"use client";
import { useState } from "react";
import { ArrowRight, Info, Search } from "lucide-react";

export function PrefixSumVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [3, 1, 4, 1, 5, 9, 2, 6];
  const [prefix, setPrefix] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const nextStep = () => {
    if (step < arr.length) {
      const newPrefix = [...prefix];
      newPrefix[step + 1] = newPrefix[step] + arr[step];
      setPrefix(newPrefix);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setPrefix([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Info className="text-[#196b4b]"/> Interactive Prefix Sum Builder</h3>
      <p className="mb-4 text-sm text-[#607067]">
        A prefix sum array <code>P</code> stores the cumulative sum of the original array up to a certain index.
        Notice how <code>P[i+1] = P[i] + A[i]</code>.
      </p>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Original Array A</h4>
          <div className="flex flex-wrap gap-2">
            {arr.map((val, idx) => (
              <div key={idx} className={`w-12 h-12 flex items-center justify-center border-2 rounded ${step === idx ? 'border-[#196b4b] bg-[#e8f3ec]' : 'border-gray-200'}`}>
                <span className="font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Prefix Sum Array P</h4>
          <div className="flex flex-wrap gap-2">
            {prefix.map((val, idx) => (
              <div key={idx} className={`w-12 h-12 flex items-center justify-center border-2 rounded ${idx === step ? 'border-[#196b4b] bg-[#e8f3ec] text-[#196b4b] font-bold' : idx < step ? 'border-[#196b4b] bg-gray-50' : 'border-gray-200 text-gray-400'}`}>
                <span className="font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary" onClick={nextStep} disabled={step >= arr.length}>
          Step Forward
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {step > 0 && (
        <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm">
          <p className="font-mono text-[#196b4b]">
            P[{step}] = P[{step-1}] + A[{step-1}]<br/>
            {prefix[step]} = {prefix[step-1]} + {arr[step-1]}
          </p>
        </div>
      )}
    </div>
  );
}

export function RangeQueryVisualizer() {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6];
  const prefix = [0, 3, 4, 8, 9, 14, 23, 25, 31];
  const [l, setL] = useState(1);
  const [r, setR] = useState(4);

  const total = prefix[r + 1] - prefix[l];

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Search className="text-[#196b4b]"/> Range Sum O(1) Query</h3>
      <p className="mb-4 text-sm text-[#607067]">
        To find the sum from index L to R (inclusive), you just compute <code>P[R+1] - P[L]</code>.
      </p>
      
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold mb-1 text-[#607067]">L Index</label>
          <input type="number" min={0} max={r} value={l} onChange={(e) => setL(Number(e.target.value))} className="input w-24" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 text-[#607067]">R Index</label>
          <input type="number" min={l} max={arr.length-1} value={r} onChange={(e) => setR(Number(e.target.value))} className="input w-24" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {arr.map((val, idx) => {
            const inRange = idx >= l && idx <= r;
            return (
              <div key={idx} className={`w-8 h-8 flex items-center justify-center border rounded text-xs ${inRange ? 'border-orange-400 bg-orange-50 font-bold' : 'border-gray-200 text-gray-400'}`}>
                {val}
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-4 bg-[#f8faf9] rounded border border-[#e8f3ec]">
        <div className="font-mono text-sm">
          <p>Sum(L={l}, R={r}) = P[{r+1}] - P[{l}]</p>
          <p className="mt-1 font-bold text-lg text-[#196b4b]">
            = {prefix[r+1]} - {prefix[l]} = {total}
          </p>
        </div>
      </div>
    </div>
  );
}
