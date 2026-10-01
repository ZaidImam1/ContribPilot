import { useState } from "react";

import { Search } from "lucide-react";

import IssueCard from "../components/IssueCard.jsx";

import { findIssues } from "../services/api.js";

import { saveMatchCriteria } from "../utils/sessions.js";

const LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#0c0e13] border border-white/10 text-slate-100 placeholder:text-slate-500 text-[15px] focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 transition";

const labelClass =
  "block text-sm font-medium text-slate-300 mb-2";

export default function Matchmaker() {
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState("");
  const [repo, setRepo] = useState("");

  const [issues, setIssues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFindIssue = async () => {
    if (
      !skills.trim() ||
      !level ||
      !repo.trim()
    ) {
      return;
    }

    const skillsArr = skills
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const experience = level.toLowerCase();

    try {
      setLoading(true);
      setError(null);

      saveMatchCriteria({
        skills: skillsArr,
        experience,
        repo,
      });

      const data = await findIssues({
        skills: skillsArr,
        experience,
        repo,
        limit: 10,
      });

      setIssues(data.issues || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (issues !== null) {
    return (
      <div className="min-h-screen pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-5">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-sm font-medium text-indigo-300">
                Results
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mt-1 tracking-tight text-white">
                {issues.length} issue
                {issues.length !== 1 ? "s" : ""} found
              </h1>

              <p className="text-sm text-slate-400 mt-2 font-mono break-all">
                {repo}
              </p>
            </div>

            <button
              onClick={() => setIssues(null)}
              className="shrink-0 text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-white/10 bg-[#13161d] hover:bg-white/10 transition-colors"
            >
              ← New search
            </button>
          </div>

          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueCard
                key={issue.issue_id}
                issue={issue}
                repo={repo}
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-2xl mx-auto px-5">

        <div className="mb-8 text-center">
          <span className="text-sm font-medium text-indigo-300">
            Issue Matchmaker
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight text-white">
            Find an issue worth solving.
          </h1>

          <p className="text-base text-slate-300 mt-4 max-w-xl mx-auto leading-7">
            Tell ContribPilot what you know. We'll surface issues that fit your skills.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-8 space-y-6">

          <div>
            <label className={labelClass}>
              Repository
            </label>

            <input
              value={repo}
              onChange={(e) =>
                setRepo(e.target.value)
              }
              placeholder="e.g. ejwa/gitinspector"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Your Skills
            </label>

            <input
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="e.g. python, react"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate skills with commas.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Your Level
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() =>
                    setLevel(lvl)
                  }
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    level === lvl
                      ? "border-indigo-400 bg-indigo-500/15 text-white"
                      : "border-white/10 bg-[#0c0e13] text-slate-300 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleFindIssue}
              disabled={
                loading ||
                !skills ||
                !level ||
                !repo
              }
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4" />

              <span>
                {loading
                  ? "Searching…"
                  : "Find Issue"}
              </span>
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-300 leading-6 text-center">
                {error}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
