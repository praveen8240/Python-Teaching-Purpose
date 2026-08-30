"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Clock3,
  Cpu,
  Code2,
} from "lucide-react";
import { Assignment } from "@/content/assignments";
import { PythonPlayground } from "./PythonPlayground";

function RatingBadge({ rating }: { rating: number }) {
  const color =
    rating <= 800
      ? "bg-[#cccccc] text-[#333]"
      : rating <= 1000
        ? "bg-[#77ff77] text-[#1a5c1a]"
        : rating <= 1200
          ? "bg-[#77ddbb] text-[#1a4a3a]"
          : "bg-[#aaaaff] text-[#2a2a6a]";
  return (
    <span className={`badge font-mono font-bold ${color}`}>{rating}</span>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="badge bg-[#edf3ee] text-[#3e6b4e]">{tag}</span>
  );
}

function CountdownTimer({
  initialSeconds,
  onFinish,
}: {
  initialSeconds: number;
  onFinish: () => void;
}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) {
      clear();
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clear();
          setRunning(false);
          onFinish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return clear;
  }, [running, clear, onFinish]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = ((initialSeconds - seconds) / initialSeconds) * 100;

  return (
    <div className="card overflow-hidden border-2 border-[#d4a843]">
      {/* progress bar */}
      <div className="h-2 bg-[#f0e6cc]">
        <div
          className="h-full bg-[#d4a843] transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 p-4">
        <Timer size={22} className="text-[#b26615]" />
        <span className="font-mono text-3xl font-black tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
        {!started ? (
          <button
            onClick={() => {
              setStarted(true);
              setRunning(true);
            }}
            className="btn btn-primary"
          >
            <Play size={15} /> Start Think Time
          </button>
        ) : (
          <>
            <button
              onClick={() => setRunning(!running)}
              className="btn btn-secondary"
            >
              {running ? (
                <Pause size={15} />
              ) : (
                <Play size={15} />
              )}
              {running ? "Pause" : "Resume"}
            </button>
            <button
              onClick={() => {
                clear();
                setSeconds(initialSeconds);
                setRunning(false);
                setStarted(false);
              }}
              className="btn btn-secondary"
            >
              <RotateCcw size={15} /> Reset
            </button>
          </>
        )}
        {seconds === 0 && (
          <span className="font-bold text-[#196b4b]">
            ⏰ Time's up! Let's discuss.
          </span>
        )}
      </div>
    </div>
  );
}

export function AssignmentCard({ a }: { a: Assignment }) {
  const [expanded, setExpanded] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [editorialOpen, setEditorialOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [tryOpen, setTryOpen] = useState(false);

  return (
    <article className="card overflow-hidden">
      {/* Header — always visible */}
      <button
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <RatingBadge rating={a.rating} />
            {a.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
            <span className="badge">
              <Clock3 size={12} /> {a.timeLimit}
            </span>
            <span className="badge">
              <Cpu size={12} /> {a.memoryLimit}
            </span>
          </div>
          <strong className="block text-xl">{a.title}</strong>
          <span className="text-sm text-[#607067]">{a.source}</span>
        </div>
        <ChevronDown
          className={`shrink-0 transition ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-5 border-t border-[#dce4dd] p-5">
          {/* Problem statement */}
          <div className="prose max-w-none">
            <p className="whitespace-pre-line leading-7">{a.statement}</p>
          </div>

          {/* Input / Output format */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-bold">Input</h4>
              <p className="mt-1 text-sm leading-6 text-[#607067]">
                {a.inputFormat}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Output</h4>
              <p className="mt-1 text-sm leading-6 text-[#607067]">
                {a.outputFormat}
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h4 className="font-bold">Examples</h4>
            {a.examples.map((ex, i) => (
              <div
                key={i}
                className="grid gap-[1px] overflow-hidden rounded-lg bg-[#29372d] md:grid-cols-2"
              >
                <div className="bg-[#101713] p-4">
                  <span className="mb-2 block text-xs font-bold uppercase text-[#91a497]">
                    Input
                  </span>
                  <pre className="whitespace-pre-wrap font-mono text-sm text-[#d9f7df]">
                    {ex.input}
                  </pre>
                </div>
                <div className="bg-[#101713] p-4">
                  <span className="mb-2 block text-xs font-bold uppercase text-[#91a497]">
                    Output
                  </span>
                  <pre className="whitespace-pre-wrap font-mono text-sm text-[#dafa96]">
                    {ex.output}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          {a.note && (
            <div className="rounded-md bg-[#f5f7f3] p-4 text-sm leading-6">
              <strong>Note: </strong>
              {a.note}
            </div>
          )}

          {/* Link to Codeforces */}
          {a.url && (
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-flex"
            >
              <ExternalLink size={15} /> Open on Codeforces
            </a>
          )}

          {/* Timer */}
          <CountdownTimer
            initialSeconds={a.thinkTime}
            onFinish={() => {}}
          />

          {/* Hint */}
          <div>
            <button
              onClick={() => setHintOpen(!hintOpen)}
              className="btn btn-secondary"
            >
              <Lightbulb size={16} /> {hintOpen ? "Hide" : "Show"} Hint
            </button>
            {hintOpen && (
              <p className="mt-3 rounded-md bg-[#fff7df] p-4 text-sm leading-6 fade-up">
                {a.hint}
              </p>
            )}
          </div>

          {/* Editorial */}
          <div>
            <button
              onClick={() => setEditorialOpen(!editorialOpen)}
              className="btn btn-secondary"
            >
              <BookOpen size={16} />{" "}
              {editorialOpen ? "Hide" : "Show"} Editorial
            </button>
            {editorialOpen && (
              <div className="mt-3 space-y-3 rounded-md border border-[#dce4dd] p-4 fade-up">
                <p className="whitespace-pre-line text-sm leading-7">
                  {a.editorial}
                </p>
              </div>
            )}
          </div>

          {/* Solution code */}
          <div>
            <button
              onClick={() => setSolutionOpen(!solutionOpen)}
              className="btn btn-secondary"
            >
              <Code2 size={16} />{" "}
              {solutionOpen ? "Hide" : "Show"} Solution Code
            </button>
            {solutionOpen && (
              <div className="mt-3 fade-up">
                <PythonPlayground
                  initialCode={a.solutionCode}
                  initialInput={a.testInput}
                  expected={a.expectedOutput}
                />
              </div>
            )}
          </div>

          {/* Try it yourself */}
          <div>
            <button
              onClick={() => setTryOpen(!tryOpen)}
              className={`btn ${tryOpen ? "btn-secondary" : "btn-primary"}`}
            >
              <Play size={16} /> {tryOpen ? "Hide" : "Try it yourself"}
            </button>
            {tryOpen && (
              <div className="mt-3 fade-up">
                <PythonPlayground
                  initialCode={a.starterCode}
                  initialInput={a.testInput}
                  expected={a.expectedOutput}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
