"use client";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Info, Search } from "lucide-react";

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

export function DiffArrayVisualizer() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Original", desc: "Start with an array of zeros. The difference array is a copy." },
    { label: "Update 1", desc: "Add +3 to range [2, 5]: set diff[2] += 3 and diff[6] -= 3. Only 2 operations!" },
    { label: "Update 2", desc: "Add +2 to range [0, 3]: set diff[0] += 2 and diff[4] -= 2. Again, just 2 operations!" },
    { label: "Reconstruct", desc: "Prefix-sum the diff array to get the final result. Each cell = previous + diff[i]." },
    { label: "Compare", desc: "Naive: O(n) per update × q updates = O(n×q). Diff array: O(1) per update + O(n) reconstruct = O(n+q). Much faster!" }
  ];

  const diffStates: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, -3, 0],
    [2, 0, 3, 0, -2, 0, -3, 0],
    [2, 0, 3, 0, -2, 0, -3, 0],
    [2, 0, 3, 0, -2, 0, -3, 0],
  ];

  const resultStates: (number[] | null)[] = [
    null,
    null,
    null,
    [2, 2, 5, 5, 3, 3, 0, 0],
    [2, 2, 5, 5, 3, 3, 0, 0],
  ];

  const highlights: Record<number, number[]> = {
    1: [2, 6],
    2: [0, 4],
  };

  const diff = diffStates[step];
  const result = resultStates[step];
  const hl = highlights[step] || [];

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
        <ArrowRight className="text-[#196b4b]" /> Difference Array — Step-by-Step
      </h3>

      {/* Step dots */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`h-3 w-3 rounded-full border-2 transition-all ${i === step ? 'border-[#196b4b] bg-[#196b4b] scale-125' : i < step ? 'border-[#196b4b] bg-[#b8dfc8]' : 'border-gray-300 bg-white'}`}
          />
        ))}
        <span className="ml-2 text-xs font-bold text-[#607067]">{steps[step].label}</span>
      </div>

      {/* Diff array */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Difference Array</h4>
          <div className="flex flex-wrap gap-2">
            {diff.map((val, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-12 h-12 flex items-center justify-center border-2 rounded font-mono text-sm transition-all ${
                  hl.includes(idx)
                    ? 'border-orange-400 bg-orange-50 font-bold text-orange-700 -translate-y-1'
                    : val !== 0
                      ? 'border-[#196b4b] bg-[#e8f3ec] font-bold text-[#196b4b]'
                      : 'border-gray-200'
                }`}>
                  {val > 0 ? `+${val}` : val}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">[{idx}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result array */}
        {result && (
          <div className="fade-up">
            <h4 className="text-sm font-bold text-[#607067] mb-2">Final Array (after prefix-sum reconstruction)</h4>
            <div className="flex flex-wrap gap-2">
              {result.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-12 h-12 flex items-center justify-center border-2 rounded font-mono text-sm font-bold ${
                    val > 0 ? 'border-[#196b4b] bg-[#e8f3ec] text-[#196b4b]' : 'border-gray-200'
                  }`}>
                    {val}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">[{idx}]</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison card at step 4 */}
        {step === 4 && (
          <div className="grid gap-3 md:grid-cols-2 fade-up">
            <div className="rounded border-2 border-red-200 bg-red-50 p-4">
              <p className="font-bold text-red-700">❌ Naive Approach</p>
              <p className="text-sm text-red-600 mt-1">Loop through each range for every update</p>
              <p className="font-mono text-lg font-black text-red-700 mt-2">O(n × q)</p>
            </div>
            <div className="rounded border-2 border-green-200 bg-green-50 p-4">
              <p className="font-bold text-green-700">✅ Difference Array</p>
              <p className="text-sm text-green-600 mt-1">O(1) per update + one O(n) reconstruction</p>
              <p className="font-mono text-lg font-black text-green-700 mt-2">O(n + q)</p>
            </div>
          </div>
        )}
      </div>

      {/* Step explanation */}
      <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm text-[#607067]">
        {steps[step].desc}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex gap-3">
        <button className="btn btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          ← Prev
        </button>
        <button className="btn btn-primary" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

export function ProductExceptSelfVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [1, 2, 3, 4];
  const left = [1, 1, 2, 6];
  const right = [24, 12, 4, 1];
  const result = [24, 12, 8, 6];

  const steps = [
    { label: "Original", desc: "Given array [1, 2, 3, 4]. We need result[i] = product of all elements EXCEPT arr[i]. No division allowed!" },
    { label: "Left Pass →", desc: "Scan left to right. left[i] = product of all elements BEFORE index i. Start with left[0] = 1 (nothing before it)." },
    { label: "← Right Pass", desc: "Scan right to left. right[i] = product of all elements AFTER index i. Start with right[3] = 1 (nothing after it)." },
    { label: "Merge ✓", desc: "result[i] = left[i] × right[i]. Each combines 'everything before' × 'everything after' = everything except self!" }
  ];

  const Cell = ({ val, highlight, color }: { val: number; highlight: boolean; color: string }) => (
    <div className={`w-14 h-14 flex items-center justify-center border-2 rounded font-mono text-sm font-bold transition-all ${
      highlight ? `${color} -translate-y-1` : 'border-gray-200'
    }`}>
      {val}
    </div>
  );

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
        <Info className="text-[#196b4b]" /> Product of Array Except Self — Step-by-Step
      </h3>

      {/* Step dots */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`h-3 w-3 rounded-full border-2 transition-all ${i === step ? 'border-[#196b4b] bg-[#196b4b] scale-125' : i < step ? 'border-[#196b4b] bg-[#b8dfc8]' : 'border-gray-300 bg-white'}`}
          />
        ))}
        <span className="ml-2 text-xs font-bold text-[#607067]">{steps[step].label}</span>
      </div>

      <div className="space-y-4">
        {/* Original array — always visible */}
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Original Array</h4>
          <div className="flex flex-wrap gap-2">
            {arr.map((val, idx) => (
              <div key={idx} className="text-center">
                <Cell val={val} highlight={step === 0} color="border-[#196b4b] bg-[#e8f3ec] text-[#196b4b]" />
                <span className="text-[10px] text-gray-400 mt-1 block">[{idx}]</span>
              </div>
            ))}
          </div>
        </div>

        {/* Left products */}
        {step >= 1 && (
          <div className="fade-up">
            <h4 className="text-sm font-bold text-blue-600 mb-2">← Left Products (product of everything before i)</h4>
            <div className="flex flex-wrap gap-2">
              {left.map((val, idx) => (
                <div key={idx} className="text-center">
                  <Cell val={val} highlight={step === 1} color="border-blue-400 bg-blue-50 text-blue-700" />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {idx === 0 ? '1' : arr.slice(0, idx).join('×')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right products */}
        {step >= 2 && (
          <div className="fade-up">
            <h4 className="text-sm font-bold text-orange-600 mb-2">Right Products → (product of everything after i)</h4>
            <div className="flex flex-wrap gap-2">
              {right.map((val, idx) => (
                <div key={idx} className="text-center">
                  <Cell val={val} highlight={step === 2} color="border-orange-400 bg-orange-50 text-orange-700" />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {idx === arr.length - 1 ? '1' : arr.slice(idx + 1).join('×')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merged result */}
        {step >= 3 && (
          <div className="fade-up">
            <h4 className="text-sm font-bold text-[#196b4b] mb-2">✅ Result = Left × Right</h4>
            <div className="flex flex-wrap gap-2">
              {result.map((val, idx) => (
                <div key={idx} className="text-center">
                  <Cell val={val} highlight={true} color="border-[#196b4b] bg-[#e8f3ec] text-[#196b4b]" />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {left[idx]}×{right[idx]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded border border-[#e8f3ec] bg-[#f8faf9] p-3 text-sm">
                <p className="font-bold text-[#196b4b]">Time: O(n)</p>
                <p className="text-[#607067]">Two passes through the array</p>
              </div>
              <div className="rounded border border-[#e8f3ec] bg-[#f8faf9] p-3 text-sm">
                <p className="font-bold text-[#196b4b]">Space: O(n)</p>
                <p className="text-[#607067]">Can be optimized to O(1) extra space</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step explanation */}
      <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm text-[#607067]">
        {steps[step].desc}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex gap-3">
        <button className="btn btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          ← Prev
        </button>
        <button className="btn btn-primary" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}
