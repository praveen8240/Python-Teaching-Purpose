import { assignments } from "@/content/assignments";
import { AssignmentCard } from "@/components/AssignmentCard";
import { Swords, Trophy } from "lucide-react";

export default function AssignmentsPage() {
  const r800 = assignments.filter((a) => a.rating <= 800);
  const r900 = assignments.filter((a) => a.rating > 800);

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-12">
      <header className="mb-10">
        <p className="text-xs font-black uppercase text-[#196b4b]">
          Tricky Questions
        </p>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">
          Assignments
        </h1>
        <p className="mt-3 max-w-2xl text-[#607067]">
          Competitive programming questions for classroom practice. Open a
          problem, start the timer, give students time to think, then walk
          through the solution together.
        </p>
      </header>

      {/* 800 rated */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#cccccc] text-[#333]">
            <Swords size={18} />
          </span>
          <div>
            <h2 className="text-xl font-black">Rated 800 — Warm-Up</h2>
            <p className="text-sm text-[#607067]">
              {r800.length} problems · Fundamentals
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {r800.map((a) => (
            <AssignmentCard key={a.id} a={a} />
          ))}
        </div>
      </section>

      {/* 900 rated */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#77ff77] text-[#1a5c1a]">
            <Trophy size={18} />
          </span>
          <div>
            <h2 className="text-xl font-black">Rated 900 — Challenge</h2>
            <p className="text-sm text-[#607067]">
              {r900.length} problem{r900.length > 1 ? "s" : ""} · Needs careful
              math
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {r900.map((a) => (
            <AssignmentCard key={a.id} a={a} />
          ))}
        </div>
      </section>

      <div className="border-t border-dashed border-[#bfcbbf] py-8 text-center text-sm text-[#607067]">
        More problems will be added as the curriculum grows. Problems are
        sourced from Codeforces and are for educational use.
      </div>
    </main>
  );
}
