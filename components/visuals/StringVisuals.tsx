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

export function PalindromeVisualizer() {
  const [input, setInput] = useState("A man, a plan, a canal: Panama");
  const [step, setStep] = useState(-1);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [cleaned, setCleaned] = useState("");

  const startCheck = () => {
    const c = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    setCleaned(c);
    setLeft(0);
    setRight(c.length - 1);
    setStep(0);
    setResult(null);
  };

  const nextStep = () => {
    if (result !== null) return;
    if (left >= right) { setResult(true); return; }
    if (cleaned[left] !== cleaned[right]) { setResult(false); return; }
    setLeft(left + 1);
    setRight(right - 1);
    setStep(step + 1);
  };

  const reset = () => { setStep(-1); setLeft(0); setRight(0); setResult(null); setCleaned(""); };

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Type className="text-[#196b4b]"/> Two-Pointer Palindrome Checker</h3>
      <p className="mb-4 text-sm text-[#607067]">
        After cleaning (lowercase + remove non-alphanumeric), use two pointers from opposite ends. If they always match → palindrome!
      </p>

      <div className="mb-4">
        <input value={input} onChange={e => { setInput(e.target.value); reset(); }}
          className="w-full p-2 border border-gray-300 rounded font-mono text-sm" placeholder="Enter a string..." />
      </div>

      {cleaned && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-[#607067] mb-2">Cleaned: &quot;{cleaned}&quot;</h4>
          <div className="flex flex-wrap gap-1">
            {cleaned.split('').map((ch, idx) => (
              <div key={idx} className={`w-8 h-8 flex items-center justify-center rounded font-mono text-sm border-2 transition-all ${
                idx === left && idx === right ? 'border-purple-500 bg-purple-100 scale-110' :
                idx === left ? 'border-blue-500 bg-blue-100 scale-110' :
                idx === right ? 'border-orange-500 bg-orange-100 scale-110' :
                (idx > left && idx < right && step >= 0) ? 'border-gray-200' :
                (idx < left || idx > right) ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200'
              }`}>
                {ch}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span className="text-blue-600">↑ left={left}</span>
            <span className="text-orange-600">↑ right={right}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {step === -1 ? (
          <button className="btn btn-primary" onClick={startCheck}>Clean & Start</button>
        ) : (
          <button className="btn btn-primary" onClick={nextStep} disabled={result !== null}>
            <Play size={16} /> Compare Next Pair
          </button>
        )}
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>

      {step >= 0 && result === null && left < right && (
        <div className="mt-4 p-3 bg-[#f8faf9] rounded border border-[#e8f3ec] text-sm font-mono text-[#196b4b]">
          s[{left}] = &apos;{cleaned[left]}&apos; vs s[{right}] = &apos;{cleaned[right]}&apos; → {cleaned[left] === cleaned[right] ? '✅ Match!' : '❌ Mismatch!'}
        </div>
      )}

      {result !== null && (
        <div className={`mt-4 p-3 rounded border text-sm font-bold ${result ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {result ? '✅ It IS a palindrome!' : '❌ NOT a palindrome — mismatch found.'}
        </div>
      )}
    </div>
  );
}

export function OrdChrExplorer() {
  const [char, setChar] = useState("a");

  const asciiVal = char.length > 0 ? char.charCodeAt(0) : 0;
  const offset = char.length > 0 && char >= 'a' && char <= 'z' ? asciiVal - 97 : char >= 'A' && char <= 'Z' ? asciiVal - 65 : -1;

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Type className="text-[#196b4b]"/> ord() / chr() Explorer</h3>
      <p className="mb-4 text-sm text-[#607067]">
        <code>ord(char)</code> → ASCII number. <code>chr(number)</code> → character. This is how you map letters to array indices!
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-[#607067] block mb-1">Enter a character:</label>
          <input value={char} onChange={e => setChar(e.target.value.slice(-1))} maxLength={1}
            className="w-16 h-12 text-center text-2xl font-mono border-2 border-[#196b4b] rounded" />
        </div>
        <div className="text-4xl text-gray-300">→</div>
        <div className="grid gap-2">
          <div className="px-4 py-2 bg-[#e8f3ec] rounded border border-[#196b4b] font-mono">
            ord(&apos;{char || '?'}&apos;) = <span className="font-bold text-[#196b4b]">{char ? asciiVal : '?'}</span>
          </div>
          {offset >= 0 && (
            <div className="px-4 py-2 bg-blue-50 rounded border border-blue-300 font-mono text-sm">
              offset from &apos;{char >= 'a' ? 'a' : 'A'}&apos; = <span className="font-bold text-blue-700">{offset}</span>
              <span className="text-xs text-gray-500 ml-2">(array index)</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-[#607067] mb-2">ASCII Reference: a-z</h4>
        <div className="flex flex-wrap gap-1">
          {Array.from({length: 26}, (_, i) => (
            <div key={i} className={`w-10 flex flex-col items-center rounded border text-xs py-1 ${String.fromCharCode(97 + i) === char ? 'border-[#196b4b] bg-[#e8f3ec] font-bold' : 'border-gray-200'}`}>
              <span className="font-mono font-bold">{String.fromCharCode(97 + i)}</span>
              <span className="text-gray-400">{97 + i}</span>
              <span className="text-blue-500 text-[10px]">[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StringCompressionVisualizer() {
  const [step, setStep] = useState(0);
  const chars = ['a','a','b','b','c','c','c'];
  const [read, setRead] = useState(0);
  const [write, setWrite] = useState(0);
  const [output, setOutput] = useState<string[]>([...chars]);
  const [groups, setGroups] = useState<Array<{char: string; count: number}>>([]);
  const [done, setDone] = useState(false);

  const nextStep = () => {
    if (done || read >= chars.length) { setDone(true); return; }
    const ch = chars[read];
    let count = 0;
    let r = read;
    while (r < chars.length && chars[r] === ch) { r++; count++; }

    const newOutput = [...output];
    let w = write;
    newOutput[w] = ch;
    w++;
    if (count > 1) {
      for (const d of String(count)) { newOutput[w] = d; w++; }
    }
    setOutput(newOutput);
    setGroups([...groups, { char: ch, count }]);
    setRead(r);
    setWrite(w);
    setStep(step + 1);
    if (r >= chars.length) setDone(true);
  };

  const reset = () => { setStep(0); setRead(0); setWrite(0); setOutput([...chars]); setGroups([]); setDone(false); };

  return (
    <div className="card p-5 mt-4">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Type className="text-[#196b4b]"/> Run-Length Compression (LC 443)</h3>
      <p className="mb-4 text-sm text-[#607067]">
        Two pointers: <span className="text-blue-600 font-bold">read</span> scans consecutive groups, <span className="text-orange-600 font-bold">write</span> overwrites the array in-place with char + count.
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Original Array</h4>
          <div className="flex gap-1">
            {chars.map((ch, i) => (
              <div key={i} className={`w-10 h-10 flex items-center justify-center rounded font-mono font-bold border-2 ${
                i >= read ? 'border-gray-200' :
                'border-gray-300 bg-gray-100 text-gray-400'
              } ${i === read ? 'border-blue-500 bg-blue-100' : ''}`}>
                {ch}
              </div>
            ))}
            {read < chars.length && <span className="text-xs text-blue-600 self-end ml-1">↑ read</span>}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#607067] mb-2">Output Array (in-place)</h4>
          <div className="flex gap-1">
            {output.slice(0, Math.max(write, chars.length)).map((ch, i) => (
              <div key={i} className={`w-10 h-10 flex items-center justify-center rounded font-mono font-bold border-2 ${
                i < write ? 'border-[#196b4b] bg-[#e8f3ec] text-[#196b4b]' :
                'border-gray-200 text-gray-300'
              } ${i === write ? 'border-orange-500 bg-orange-50' : ''}`}>
                {i < write ? ch : '·'}
              </div>
            ))}
            <span className="text-xs text-orange-600 self-end ml-1">↑ write={write}</span>
          </div>
        </div>

        {groups.length > 0 && (
          <div className="p-3 bg-[#f8faf9] rounded border border-[#e8f3ec]">
            <h4 className="text-sm font-bold text-[#607067] mb-2">Groups Found</h4>
            <div className="flex gap-3 flex-wrap">
              {groups.map((g, i) => (
                <span key={i} className="px-3 py-1 bg-white rounded border shadow-sm font-mono text-sm">
                  &apos;{g.char}&apos; × {g.count}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn btn-primary flex items-center gap-2" onClick={nextStep} disabled={done}>
          <Play size={16} /> Process Next Group
        </button>
        <button className="btn btn-secondary" onClick={reset}>Reset</button>
      </div>

      {done && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded border border-green-200 text-sm font-bold">
          ✅ Compressed length = {write}. Result: [{output.slice(0, write).map(c => `'${c}'`).join(', ')}]
        </div>
      )}
    </div>
  );
}
