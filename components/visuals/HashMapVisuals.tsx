"use client";
import { useState } from "react";
import { Hash, Play } from "lucide-react";

export function FrequencyMapVisualizer() {
  const [step, setStep] = useState(0);
  const arr = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
  const [freqMap, setFreqMap] = useState<Record<string, number>>({});

  const nextStep = () => {
    if (step < arr.length) {
      const item = arr[step];
      const newMap = { ...freqMap };
      newMap[item] = (newMap[item] || 0) + 1;
      setFreqMap(newMap);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setFreqMap({});
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Hash className="text-[#196b4b]"/> Building a Frequency Map</h3>
      <p className="mb-4 text-sm text-[#607067]">
        A dictionary (hash map) allows you to count frequencies of elements in O(N) total time, checking and updating each element in O(1) average time.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Input Sequence</h4>
          <div className="flex flex-wrap gap-2">
            {arr.map((val, idx) => (
              <div key={idx} className={`px-3 py-1 flex items-center justify-center border-2 rounded ${idx === step ? 'border-[#196b4b] bg-[#e8f3ec]' : idx < step ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'}`}>
                <span className="font-mono text-sm">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Hash Map (Dictionary) State</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(freqMap).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-white border border-[#dce4dd] rounded shadow-sm">
                <span className="font-mono text-sm font-bold">{key}</span>
                <span className="bg-[#196b4b] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{val}</span>
              </div>
            ))}
            {Object.keys(freqMap).length === 0 && (
              <div className="text-sm text-gray-400 italic">Empty dictionary {"{}"}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={step >= arr.length}>
          <Play size={16} /> Process Next Item
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      
      {step > 0 && (
        <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm font-mono text-[#196b4b]">
          item = "{arr[step-1]}"<br/>
          freq_map[item] = freq_map.get(item, 0) + 1
        </div>
      )}
    </div>
  );
}

export function TwoSumVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [2, 7, 11, 15];
  const target = 9;
  const [seen, setSeen] = useState<Record<number, number>>({});
  const [found, setFound] = useState<[number, number] | null>(null);

  const nextStep = () => {
    if (found || step >= arr.length) return;
    
    const num = arr[step];
    const complement = target - num;
    
    if (complement in seen) {
      setFound([seen[complement], step]);
    } else {
      const newSeen = { ...seen };
      newSeen[num] = step;
      setSeen(newSeen);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setSeen({});
    setFound(null);
  };

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Hash className="text-[#196b4b]"/> Two Sum with Hash Map</h3>
      <p className="mb-4 text-sm text-[#607067]">
        To find two numbers that add up to {target}, we iterate through the array. For each number, we check if <code>target - number</code> is already in our hash map.
      </p>

      <div className="flex gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[#607067] mb-2">Array</h4>
          <div className="flex flex-col gap-2">
            {arr.map((val, idx) => {
              const isCurrent = idx === step && !found;
              const isFound = found && (idx === found[0] || idx === found[1]);
              
              return (
                <div key={idx} className={`p-2 flex justify-between border-2 rounded ${isFound ? 'border-orange-500 bg-orange-50' : isCurrent ? 'border-[#196b4b] bg-[#e8f3ec]' : 'border-gray-200'}`}>
                  <span className="text-xs text-gray-400">index {idx}</span>
                  <span className="font-mono font-bold">{val}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-bold text-[#607067] mb-2">Seen Hash Map</h4>
          <div className="border border-gray-200 rounded min-h-[150px] p-2 bg-gray-50 flex flex-col gap-1">
            <div className="text-xs text-gray-400 mb-1 flex justify-between border-b pb-1">
              <span>Value (Key)</span>
              <span>Index (Value)</span>
            </div>
            {Object.entries(seen).map(([val, idx]) => (
              <div key={val} className="flex justify-between font-mono text-sm bg-white p-1 rounded border shadow-sm">
                <span>{val}</span>
                <span className="text-gray-500">{idx}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn btn-primary" onClick={nextStep} disabled={!!found || step >= arr.length}>
          Step Forward
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      {step < arr.length && !found && (
        <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm">
          <p className="font-mono">
            current = {arr[step]}<br/>
            complement = {target} - {arr[step]} = <span className="font-bold text-[#196b4b]">{target - arr[step]}</span><br/>
            Is {target - arr[step]} in Seen? {target - arr[step] in seen ? 'Yes!' : 'No, add current to Seen.'}
          </p>
        </div>
      )}

      {found && (
        <div className="mt-4 p-3 bg-orange-100 text-orange-800 rounded border border-orange-200 text-sm font-bold">
          Found Match! Indices [{found[0]}, {found[1]}] sum to {target}.
        </div>
      )}
    </div>
  );
}
