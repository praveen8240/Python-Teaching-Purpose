"use client";
import { useState } from "react";
import { Layers, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [popped, setPopped] = useState<number | null>(null);

  const push = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setStack([...stack, Number(inputValue)]);
      setInputValue("");
      setPopped(null);
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const newStack = [...stack];
      const val = newStack.pop();
      setStack(newStack);
      if (val !== undefined) setPopped(val);
    }
  };

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2"><Layers className="text-[#196b4b]"/> Stack (LIFO)</h3>
      <p className="mb-4 text-sm text-[#607067]">
        A Stack follows Last-In, First-Out (LIFO). Elements are added (pushed) and removed (popped) from the top only. Useful for reversing, nested structures, or monotonic properties.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center flex-1">
          <div className="flex gap-2 mb-4 w-full max-w-[200px]">
            <input 
              type="number" 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              className="input flex-1"
              placeholder="Value"
              onKeyDown={e => e.key === 'Enter' && push()}
            />
            <button className="btn btn-primary px-3" onClick={push}><ArrowDownToLine size={16}/></button>
          </div>
          
          <button className="btn btn-secondary w-full max-w-[200px] mb-6 flex items-center justify-center gap-2" onClick={pop} disabled={stack.length === 0}>
            <ArrowUpFromLine size={16}/> Pop Top
          </button>
          
          {popped !== null && (
            <div className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded animate-fade-out">
              Popped: {popped}
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-48 border-x-4 border-b-4 border-[#196b4b] rounded-b-lg p-2 min-h-[200px] flex flex-col-reverse justify-start bg-gray-50 relative">
            {stack.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold italic">
                Empty
              </div>
            )}
            {stack.map((val, idx) => (
              <div key={idx} className="w-full bg-[#196b4b] text-white font-bold text-center py-2 mb-1 rounded shadow-sm animate-slide-down">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
