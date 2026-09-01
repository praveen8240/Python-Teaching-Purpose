"use client";
import { useState } from "react";
import { Hash, Play, Zap, Layers } from "lucide-react";

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

export function SetDedupVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [duplicates, setDuplicates] = useState<number[]>([]);

  const nextStep = () => {
    if (step < arr.length) {
      const val = arr[step];
      const newSeen = new Set(seen);
      if (newSeen.has(val)) {
        setDuplicates([...duplicates, val]);
      } else {
        newSeen.add(val);
      }
      setSeen(newSeen);
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setSeen(new Set()); setDuplicates([]); };

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Layers className="text-[#196b4b]"/> Duplicate Detection with set()</h3>
      <p className="mb-4 text-sm text-[#607067]">
        A <code>set</code> stores only unique values. If we try to add a value that already exists, we know it&apos;s a duplicate — <strong>O(1) per check</strong>.
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Input Array</h4>
          <div className="flex flex-wrap gap-2">
            {arr.map((val, idx) => {
              const processed = idx < step;
              const isCurrent = idx === step;
              const isDup = processed && duplicates.includes(val) && arr.indexOf(val) !== idx;
              return (
                <div key={idx} className={`w-10 h-10 flex items-center justify-center rounded font-mono font-bold text-sm border-2 transition-all ${isCurrent ? 'border-[#196b4b] bg-[#e8f3ec] scale-110' : isDup ? 'border-red-400 bg-red-50 text-red-600' : processed ? 'border-gray-300 bg-gray-100' : 'border-gray-200'}`}>
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-bold text-[#607067] mb-2">set(seen) — Unique Values</h4>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-[#f8faf9] rounded border">
              {[...seen].sort((a,b) => a-b).map(v => (
                <span key={v} className="px-2 py-1 bg-[#196b4b] text-white rounded text-sm font-mono">{v}</span>
              ))}
              {seen.size === 0 && <span className="text-gray-400 text-sm italic">empty set</span>}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-600 mb-2">Duplicates Found</h4>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-red-50 rounded border border-red-200">
              {duplicates.map((v, i) => (
                <span key={i} className="px-2 py-1 bg-red-500 text-white rounded text-sm font-mono">{v}</span>
              ))}
              {duplicates.length === 0 && <span className="text-gray-400 text-sm italic">none yet</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={step >= arr.length}>
          <Play size={16} /> Process Next
        </button>
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>

      {step > 0 && step <= arr.length && (
        <div className={`mt-4 p-3 rounded border text-sm font-mono ${seen.has(arr[step-1]) && duplicates.includes(arr[step-1]) ? 'bg-red-50 border-red-200 text-red-700' : 'bg-[#f8faf9] border-[#e8f3ec] text-[#196b4b]'}`}>
          val = {arr[step-1]}<br/>
          {arr.slice(0, step-1).includes(arr[step-1])
            ? <>{arr[step-1]} already in seen → <strong>DUPLICATE!</strong></>
            : <>seen.add({arr[step-1]}) → set size: {seen.size}</>
          }
        </div>
      )}
    </div>
  );
}

export function XORVisualizer() {
  const [step, setStep] = useState(0);
  const arr = [4, 1, 2, 1, 2];
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState<Array<{val: number; before: number; after: number}>>([]);

  const nextStep = () => {
    if (step < arr.length) {
      const before = result;
      const after = result ^ arr[step];
      setResult(after);
      setHistory([...history, { val: arr[step], before, after }]);
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setResult(0); setHistory([]); };

  const toBin = (n: number) => (n >>> 0).toString(2).padStart(4, '0');

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Zap className="text-[#196b4b]"/> XOR Cancellation — Find the Single Number</h3>
      <p className="mb-4 text-sm text-[#607067]">
        XOR has a magical property: <code>A ^ A = 0</code> and <code>A ^ 0 = A</code>. When you XOR all elements, pairs cancel out, leaving only the unique number.
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Input Array</h4>
          <div className="flex flex-wrap gap-2">
            {arr.map((val, idx) => (
              <div key={idx} className={`w-12 h-12 flex flex-col items-center justify-center rounded font-mono border-2 ${idx === step ? 'border-[#196b4b] bg-[#e8f3ec] scale-110' : idx < step ? 'border-gray-300 bg-gray-100' : 'border-gray-200'}`}>
                <span className="text-sm font-bold">{val}</span>
                <span className="text-[10px] text-gray-400">{toBin(val)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f8faf9] rounded border border-[#e8f3ec] p-4">
          <h4 className="text-sm font-bold text-[#607067] mb-3">XOR Trace</h4>
          <div className="space-y-1 font-mono text-sm">
            <div className="text-gray-400">result = 0 ({toBin(0)})</div>
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-500">{toBin(h.before)}</span>
                <span className="text-[#196b4b] font-bold">^</span>
                <span className="text-gray-500">{toBin(h.val)}</span>
                <span className="text-gray-400">=</span>
                <span className="font-bold text-[#196b4b]">{toBin(h.after)}</span>
                <span className="text-gray-400 text-xs ml-2">({h.after})</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#dce4dd]">
            <span className="text-lg font-bold text-[#196b4b]">Result: {result}</span>
            {step === arr.length && <span className="ml-3 text-sm text-orange-600 font-bold">← The single number!</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={step >= arr.length}>
          <Play size={16} /> XOR Next
        </button>
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export function AnagramGroupVisualizer() {
  const [step, setStep] = useState(0);
  const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
  const [groups, setGroups] = useState<Record<string, string[]>>({});

  const nextStep = () => {
    if (step < words.length) {
      const word = words[step];
      const key = word.split('').sort().join('');
      const newGroups = { ...groups };
      if (!newGroups[key]) newGroups[key] = [];
      newGroups[key] = [...newGroups[key], word];
      setGroups(newGroups);
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setGroups({}); };

  const groupColors = ['bg-blue-100 border-blue-300', 'bg-green-100 border-green-300', 'bg-purple-100 border-purple-300', 'bg-orange-100 border-orange-300'];

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Hash className="text-[#196b4b]"/> Anagram Grouping — Derived Keys</h3>
      <p className="mb-4 text-sm text-[#607067]">
        Anagrams share the same <strong>sorted string</strong> as a key. <code>sorted(&quot;eat&quot;) = &quot;aet&quot;</code> and <code>sorted(&quot;tea&quot;) = &quot;aet&quot;</code> — same key → same group!
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Input Words</h4>
          <div className="flex flex-wrap gap-2">
            {words.map((w, idx) => {
              const key = w.split('').sort().join('');
              const keys = Object.keys(groups);
              const colorIdx = keys.indexOf(key);
              return (
                <div key={idx} className={`px-3 py-2 rounded border-2 font-mono text-sm transition-all ${idx === step ? 'border-[#196b4b] bg-[#e8f3ec] scale-110' : idx < step ? `${groupColors[colorIdx] || 'bg-gray-100 border-gray-300'}` : 'border-gray-200'}`}>
                  {w}
                  {idx < step && <div className="text-[10px] text-gray-500 mt-1">key: {key}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Groups (dict[sorted_key] → list)</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(groups).map(([key, vals], i) => (
              <div key={key} className={`p-3 rounded border-2 ${groupColors[i] || 'bg-gray-100 border-gray-300'}`}>
                <div className="text-xs text-gray-500 mb-1">key: &quot;{key}&quot;</div>
                <div className="flex gap-2">
                  {vals.map((v, j) => (
                    <span key={j} className="font-mono font-bold text-sm">{v}</span>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groups).length === 0 && <div className="text-sm text-gray-400 italic">No groups yet</div>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={step >= words.length}>
          <Play size={16} /> Group Next Word
        </button>
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>

      {step > 0 && step <= words.length && (
        <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm font-mono text-[#196b4b]">
          word = &quot;{words[step-1]}&quot;<br/>
          key = sorted(&quot;{words[step-1]}&quot;) = &quot;{words[step-1].split('').sort().join('')}&quot;<br/>
          groups[key].append(&quot;{words[step-1]}&quot;)
        </div>
      )}
    </div>
  );
}
