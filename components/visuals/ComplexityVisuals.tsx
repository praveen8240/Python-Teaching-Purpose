"use client";import {useState} from "react";import {AlertTriangle,CheckCircle2} from "lucide-react";
const kinds=["O(1)","O(log n)","O(n)","O(n log n)","O(n^2)","O(2^n)"] as const;type Kind=typeof kinds[number];
function operations(k:Kind,n:number){if(k==="O(1)")return 1;if(k==="O(log n)")return Math.ceil(Math.log2(Math.max(1,n)));if(k==="O(n)")return n;if(k==="O(n log n)")return Math.ceil(n*Math.log2(Math.max(1,n)));if(k==="O(n^2)")return n*n;return n>1023?Infinity:2**n}
const fmt=(v:number)=>v===Infinity?"astronomical":Intl.NumberFormat("en",{notation:v>999999?"compact":"standard",maximumFractionDigits:1}).format(v);
export function ComplexityVisualizer(){const [n,setN]=useState(10),[selected,setSelected]=useState<Kind>("O(n)");const values=kinds.map(k=>operations(k,n)),cap=Math.max(...values.filter(Number.isFinite),1);return <div className="card overflow-hidden p-5"><div className="flex flex-wrap items-end justify-between gap-4"><label className="min-w-48 flex-1 sm:min-w-64"><span className="font-bold">Input size n = {n}</span><input className="mt-3 w-full accent-[#196b4b]" type="range" min="1" max="1000" value={n} onChange={e=>setN(+e.target.value)}/></label><select value={selected} onChange={e=>setSelected(e.target.value as Kind)} className="rounded-md border border-[#dce4dd] bg-white p-2 font-bold">{kinds.map(k=><option key={k}>{k}</option>)}</select></div><div className="mt-6 grid gap-2">{kinds.map((k,i)=>{const width=values[i]===Infinity?100:Math.max(1,Math.log10(values[i]+1)/Math.log10(cap+1)*100);return <button onClick={()=>setSelected(k)} key={k} className={`flex items-center gap-2 rounded-md p-2 text-left sm:gap-3 ${selected===k?"bg-[#edf3ee]":""}`}><strong className="shrink-0 text-xs sm:text-sm" style={{width:"72px"}}>{k}</strong><span className="h-5 min-w-0 flex-1 overflow-hidden rounded-sm bg-[#e7ece7]"><span className={`block h-full transition-all duration-500 ${k.includes("2^")?"bg-[#ba3e36]":k.includes("^2")?"bg-[#d49232]":"bg-[#3e8b62]"}`} style={{width:`${width}%`}}/></span><span className="shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-right font-mono text-xs" style={{maxWidth:"100px"}}>{fmt(values[i])}</span></button>})}</div><p className="mt-4 rounded-md bg-[#f5f7f3] p-3 text-sm"><strong>{selected}:</strong> approximately {fmt(operations(selected,n))} operations at n={n}. Bars use a logarithmic display scale so smaller classes remain visible.</p></div>}

export function ComplexityGraph() {
  const width = 600;
  const height = 300;
  const padding = 40;
  const graphW = width - padding * 2;
  const graphH = height - padding * 2;
  const maxN = 50; // We chart up to n=50 to show the curves nicely without exploding O(2^n) too much

  const colors: Record<Kind, string> = {
    "O(1)": "#3e8b62",
    "O(log n)": "#6cb68f",
    "O(n)": "#2b5640",
    "O(n log n)": "#b38827",
    "O(n^2)": "#d49232",
    "O(2^n)": "#ba3e36"
  };

  // Generate points
  const generatePath = (k: Kind) => {
    let path = "";
    const capY = 2500; // Cap visual y-axis at n^2 for n=50 (50*50=2500)
    for (let x = 1; x <= maxN; x++) {
      let yValue = operations(k, x);
      if (yValue > capY * 1.5) yValue = capY * 1.5; // Let it run slightly off chart
      
      const px = padding + ((x - 1) / (maxN - 1)) * graphW;
      const py = height - padding - (yValue / capY) * graphH;
      
      if (x === 1) path += `M ${px} ${py} `;
      else path += `L ${px} ${py} `;
    }
    return path;
  };

  return (
    <div className="card overflow-hidden p-5 mt-5">
      <h3 className="font-bold mb-4 flex items-center gap-2">Time Complexity Growth Rates</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px] border border-gray-100 rounded bg-white">
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd6cd" strokeWidth="2" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd6cd" strokeWidth="2" />
          
          {/* Y-axis label */}
          <text x={padding - 10} y={padding + 10} fontSize="12" fill="#607067" textAnchor="end" transform={`rotate(-90 ${padding-10} ${padding+10})`}>
            Operations
          </text>
          
          {/* X-axis label */}
          <text x={width - padding} y={height - padding + 20} fontSize="12" fill="#607067" textAnchor="end">
            Input Size (n)
          </text>

          {/* Paths */}
          {kinds.map(k => (
            <path 
              key={k} 
              d={generatePath(k)} 
              fill="none" 
              stroke={colors[k]} 
              strokeWidth={k === "O(2^n)" || k === "O(n^2)" ? "3" : "2"} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          ))}

          {/* Legend */}
          <g transform={`translate(${padding + 20}, ${padding})`}>
            {kinds.map((k, i) => (
              <g key={k} transform={`translate(0, ${i * 20})`}>
                <line x1="0" y1="4" x2="20" y2="4" stroke={colors[k]} strokeWidth="3" />
                <text x="28" y="8" fontSize="12" fill="#333" fontWeight="bold">{k}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <p className="mt-4 text-sm text-[#607067]">
        Notice how rapidly <code>O(n^2)</code> and <code>O(2^n)</code> grow compared to linear and logarithmic times. As <strong>n</strong> increases, the gap becomes astronomical.
      </p>
    </div>
  );
}

export function OperationsBudget(){const [raw,setRaw]=useState("100000"),[kind,setKind]=useState<Kind>("O(n)");const n=Math.max(1,Math.min(100000000,parseInt(raw)||1));const count=operations(kind,n),reasonable=count<=1e8;return <div className="card grid gap-5 overflow-hidden p-5 md:grid-cols-2"><div className="min-w-0"><label className="text-sm font-bold">n<input type="number" min="1" max="100000000" value={raw} onChange={e=>{const v=e.target.value;if(v===""||/^\d+$/.test(v))setRaw(v)}} onBlur={()=>setRaw(String(n))} className="mt-2 block w-full rounded-md border border-[#dce4dd] p-3 text-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/></label><label className="mt-4 block text-sm font-bold">Complexity<select value={kind} onChange={e=>setKind(e.target.value as Kind)} className="mt-2 block w-full rounded-md border border-[#dce4dd] bg-white p-3">{kinds.slice(2).map(k=><option key={k}>{k}</option>)}</select></label></div><div className={`grid min-w-0 place-items-center rounded-md border p-6 text-center ${reasonable?"border-[#8fc8a2] bg-[#edf8f0]":"border-[#e5a19a] bg-[#fff0ee]"}`}><div className="w-full overflow-hidden">{reasonable?<CheckCircle2 className="mx-auto text-[#196b4b]" size={34}/>:<AlertTriangle className="mx-auto text-[#ba3e36]" size={34}/>}<strong className="mt-3 block break-all text-xl sm:text-2xl">{fmt(count)} operations</strong><span className="mt-1 block">{reasonable?"Likely reasonable":"Likely too slow"}</span><p className="mt-3 max-w-sm text-xs text-[#607067]">A rough classroom estimate only. Language, machine, judge load, allocation, and operation type all affect runtime.</p></div></div></div>}
