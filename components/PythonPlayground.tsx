"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { indentUnit } from "@codemirror/language";
import { EditorView, lineNumbers } from "@codemirror/view";
import { EditorSelection } from "@codemirror/state";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Maximize2,
  Minimize2,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
type Result = {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  timedOut?: boolean;
};
const fontTheme = EditorView.theme({
  "&": { fontSize: "15px" },
  ".cm-gutters": { fontSize: "14px", cursor: "pointer" },
});
const fontThemeFS = EditorView.theme({
  "&": { fontSize: "20px", lineHeight: "1.6" },
  ".cm-gutters": { fontSize: "18px", cursor: "pointer" },
  ".cm-content": { padding: "8px 0" },
});
const myLineNumbers = lineNumbers({
  domEventHandlers: {
    mousedown(view, line) {
      view.dispatch({
        selection: EditorSelection.single(line.from, Math.min(line.to + 1, view.state.doc.length)),
      });
      return true;
    }
  }
});
export function PythonPlayground({
  initialCode,
  solutionCode,
  initialInput = "",
  expected,
  url,
  urlLabel = "Open link",
  id,
}: {
  initialCode: string;
  solutionCode?: string;
  initialInput?: string;
  expected?: string;
  url?: string;
  urlLabel?: string;
  id?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState<Result | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fs, setFs] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [editorTheme, setEditorTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    if (id) {
      const savedCode = localStorage.getItem(`playground-code-${id}`);
      const savedInput = localStorage.getItem(`playground-input-${id}`);
      if (savedCode !== null) setCode(savedCode);
      if (savedInput !== null) setInput(savedInput);
    }
  }, [id]);

  useEffect(() => {
    if (id && mounted) {
      localStorage.setItem(`playground-code-${id}`, code);
      localStorage.setItem(`playground-input-${id}`, input);
    }
  }, [code, input, id, mounted]);
  const toggle = useCallback(() => {
    setFs((v) => {
      document.body.style.overflow = !v ? "hidden" : "";
      return !v;
    });
  }, []);
  useEffect(() => {
    if (!fs) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [fs, toggle]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  async function run() {
    setRunning(true);
    setResult(null);
    try {
      const response = await fetch("/api/run-python", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code, input }),
      });
      const data = await response.json();
      setResult(
        data.error
          ? { stdout: "", stderr: data.error, exitCode: -1, executionTime: 0 }
          : data,
      );
    } catch (e) {
      setResult({
        stdout: "",
        stderr: e instanceof Error ? e.message : "Request failed",
        exitCode: -1,
        executionTime: 0,
      });
    } finally {
      setRunning(false);
    }
  }
  
  const isLight = editorTheme === "light";
  
  const colors = {
    wrapper: isLight ? "border-gray-200 bg-white" : "border-[#29372d] bg-[#101713]",
    fsWrapper: isLight ? "bg-white" : "bg-[#0c100e]",
    header: isLight ? "border-gray-200 text-gray-700 bg-gray-50" : "border-[#29372d] text-[#b8c8bc]",
    iconHover: isLight ? "hover:bg-gray-200" : "hover:bg-[#29372d]",
    toolbar: isLight ? "border-gray-200 bg-gray-50" : "border-[#29372d]",
    btnSecondary: isLight ? "border-gray-300 text-gray-700 hover:bg-gray-100 bg-white" : "border-[#405047] text-white",
    ioDivider: isLight ? "border-gray-200" : "border-[#29372d]",
    ioLabel: isLight ? "text-gray-500" : "text-[#91a497]",
    inputBg: isLight ? "bg-white text-gray-800 border border-gray-200 focus:border-blue-400" : "bg-[#18221c] text-white",
    outputBg: isLight ? "bg-gray-100 border border-gray-200" : "bg-[#0a0e0c]",
    outputSuccess: isLight ? "text-gray-800" : "text-[#dafa96]",
    outputError: isLight ? "text-red-600" : "text-[#ff9f96]",
    expectedCode: isLight ? "text-gray-800 font-bold" : "text-white",
  };

  const ptUrl = `https://pythontutor.com/visualize.html#code=${encodeURIComponent(code)}&cumulative=false&mode=edit&origin=opt-frontend.js&py=3&rawInputLstJSON=${encodeURIComponent(JSON.stringify(input ? input.split("\n") : []))}&textReferences=false`;
  
  const fsView =
    fs &&
    mounted &&
    createPortal(
      <div className={`fixed inset-0 z-[9999] flex flex-col ${colors.fsWrapper}`}>
        <div className={`flex shrink-0 items-center justify-between border-b px-4 py-2 text-sm ${colors.header}`}>
          <span className="flex items-center gap-2">
            <Terminal size={18} />
            Python 3 · Fullscreen
          </span>
          <div className="flex items-center gap-4">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:opacity-80"
              >
                <ExternalLink size={16} />
                {urlLabel}
              </a>
            )}
            {solutionCode && (
              <button
                onClick={() => setCode(solutionCode)}
                className={`text-xs font-bold border px-2 py-1 rounded transition-colors ${isLight ? 'border-gray-300 hover:bg-gray-200' : 'border-[#405047] hover:bg-[#29372d]'}`}
              >
                Load Answer
              </button>
            )}
            <button
              onClick={() => setEditorTheme(isLight ? "dark" : "light")}
              title="Toggle theme"
              className={`grid h-8 w-8 place-items-center rounded ${colors.iconHover}`}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={toggle}
              title="Exit fullscreen (Esc)"
              className={`grid h-8 w-8 place-items-center rounded ${colors.iconHover}`}
            >
              <Minimize2 size={18} />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          <CodeMirror
            value={code}
            height="100%"
            theme={editorTheme}
            extensions={[python(), indentUnit.of("    "), fontThemeFS, myLineNumbers]}
            onChange={setCode}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLine: true,
              autocompletion: true,
            }}
            style={{ height: "100%" }}
          />
        </div>
        <div className={`flex shrink-0 flex-wrap items-center gap-3 border-y p-3 ${colors.toolbar}`}>
          <button
            onClick={run}
            disabled={running}
            className="btn btn-primary text-base px-4 py-3"
          >
            <Play size={18} />
            {running ? "Running..." : "Run"}
          </button>
          <a
            href={ptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn text-base px-4 py-3 border ${colors.btnSecondary}`}
          >
            Visualize (Debug)
          </a>
          <button
            onClick={() => {
              setCode(initialCode);
              setInput(initialInput);
              setResult(null);
              if (id) {
                localStorage.removeItem(`playground-code-${id}`);
                localStorage.removeItem(`playground-input-${id}`);
              }
            }}
            className={`btn text-base px-4 py-3 border ${colors.btnSecondary}`}
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className={`btn text-base px-4 py-3 border ${colors.btnSecondary}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}Copy
          </button>
          <button
            onClick={toggle}
            className={`btn text-base px-4 py-3 ml-auto border ${colors.btnSecondary}`}
          >
            <Minimize2 size={18} />
            Exit fullscreen
          </button>
        </div>
        <div className="grid shrink-0 md:grid-cols-2">
          <label className={`border-b p-3 md:border-r md:border-b-0 ${colors.ioDivider}`}>
            <span className={`mb-2 block text-sm font-bold uppercase ${colors.ioLabel}`}>
              Input / stdin
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`h-32 w-full resize-none rounded p-3 font-mono text-base outline-none ${colors.inputBg}`}
              spellCheck={false}
            />
          </label>
          <div className="p-3">
            <div className={`mb-2 flex justify-between text-sm font-bold uppercase ${colors.ioLabel}`}>
              <span>Output</span>
              {result && (
                <span>
                  {result.executionTime} ms · exit {result.exitCode}
                </span>
              )}
            </div>
            <pre
              className={`h-32 overflow-auto whitespace-pre-wrap rounded p-3 text-base ${colors.outputBg} ${result?.stderr ? colors.outputError : colors.outputSuccess}`}
            >
              {result?.stderr ||
                result?.stdout ||
                "Run the program to see output."}
            </pre>
            {expected && (
              <div className={`mt-2 text-sm ${colors.ioLabel}`}>
                Expected: <code className={colors.expectedCode}>{expected}</code>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body,
    );
  return (
    <>
      {fsView}
      <div className={`overflow-hidden rounded-lg border ${colors.wrapper}`}>
        <div className={`flex items-center justify-between border-b px-4 py-2 text-sm ${colors.header}`}>
          <span className="flex items-center gap-2">
            <Terminal size={15} />
            Python 3
          </span>
          <div className="flex items-center gap-3">
            <span>local runner</span>
            {solutionCode && (
              <button
                onClick={() => setCode(solutionCode)}
                className={`text-[11px] font-bold border px-2 py-0.5 rounded transition-colors ${isLight ? 'border-gray-300 hover:bg-gray-200' : 'border-[#405047] hover:bg-[#29372d]'}`}
              >
                Load Answer
              </button>
            )}
            <button
              onClick={() => setEditorTheme(isLight ? "dark" : "light")}
              title="Toggle theme"
              className={`grid h-7 w-7 place-items-center rounded ${colors.iconHover}`}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={toggle}
              title="Fullscreen — great for projectors"
              className={`grid h-7 w-7 place-items-center rounded ${colors.iconHover}`}
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
        <CodeMirror
          value={code}
          height="260px"
          theme={editorTheme}
          extensions={[python(), indentUnit.of("    "), fontTheme, myLineNumbers]}
          onChange={setCode}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: true,
            autocompletion: true,
          }}
        />
        <div className={`flex flex-wrap gap-2 border-y p-3 ${colors.toolbar}`}>
          <button onClick={run} disabled={running} className="btn btn-primary">
            <Play size={15} />
            {running ? "Running..." : "Run"}
          </button>
          <a
            href={ptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn border ${colors.btnSecondary}`}
          >
            Visualize (Debug)
          </a>
          <button
            onClick={() => {
              setCode(initialCode);
              setInput(initialInput);
              setResult(null);
              if (id) {
                localStorage.removeItem(`playground-code-${id}`);
                localStorage.removeItem(`playground-input-${id}`);
              }
            }}
            className={`btn border ${colors.btnSecondary}`}
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className={`btn border ${colors.btnSecondary}`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}Copy
          </button>
        </div>
        <div className="grid md:grid-cols-2">
          <label className={`border-b p-3 md:border-r md:border-b-0 ${colors.ioDivider}`}>
            <span className={`mb-2 block text-xs font-bold uppercase ${colors.ioLabel}`}>
              Input / stdin
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`h-28 w-full resize-y rounded p-3 font-mono text-sm outline-none ${colors.inputBg}`}
              spellCheck={false}
            />
          </label>
          <div className="p-3">
            <div className={`mb-2 flex justify-between text-xs font-bold uppercase ${colors.ioLabel}`}>
              <span>Output</span>
              {result && (
                <span>
                  {result.executionTime} ms · exit {result.exitCode}
                </span>
              )}
            </div>
            <pre
              className={`h-28 overflow-auto whitespace-pre-wrap rounded p-3 text-sm ${colors.outputBg} ${result?.stderr ? colors.outputError : colors.outputSuccess}`}
            >
              {result?.stderr ||
                result?.stdout ||
                "Run the program to see output."}
            </pre>
            {expected && (
              <div className={`mt-2 text-xs ${colors.ioLabel}`}>
                Expected: <code className={colors.expectedCode}>{expected}</code>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
