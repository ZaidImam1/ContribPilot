import { useNavigate } from "react-router-dom";

import {
  GitPullRequest,
  ArrowRight,
  Sparkles,
  Code2,
} from "lucide-react";

import { setActiveIssueId } from "../utils/sessions.js";

export default function IssueCard({ issue, repo: repoProp }) {
  const navigate = useNavigate();

  if (!issue) return null;

  const id = issue.issue_id ?? issue.id;

  const repo =
    issue.repo ??
    repoProp ??
    "unknown/repo";

  const title =
    issue.title ??
    `Issue #${id}`;

  const language =
    issue.language ??
    issue.required_technologies?.[0] ??
    null;

  const difficulty =
    issue.difficulty ??
    issue.complexity_level ??
    null;

  const matchScore =
    issue.matchScore ??
    issue.match_score ??
    0;

  const aiReason =
    issue.aiReason ??
    issue.reasoning ??
    null;

  const labels = Array.from(
    new Set([
      ...(issue.labels || []),
      ...(issue.is_beginner_friendly
        ? ["good first issue"]
        : []),
      ...(issue.matching_skills || []),
    ])
  );

  const radius = 18;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (matchScore / 100) *
      circumference;

  const isHighMatch =
    matchScore >= 90;

  const handleNavigate = () => {
    setActiveIssueId(id);
    navigate(
      `/contrib/issue/${id}`
    );
  };

  const tagClass =
    "px-2.5 py-1 text-xs font-medium rounded-md border border-white/10 bg-white/5 text-slate-200 leading-5";

  return (
    <div
      onClick={handleNavigate}
      className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl border border-white/10 bg-[#13161d] hover:border-indigo-400/40 hover:bg-[#161a22] transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg border border-white/10 bg-[#0c0e13] grid place-items-center shrink-0">
          {language === "Python" ||
          language === "python" ? (
            <Code2 className="w-5 h-5 text-indigo-300" />
          ) : (
            <GitPullRequest className="w-5 h-5 text-indigo-300" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="truncate font-mono">
              {repo}
            </span>

            <span className="text-slate-600">
              •
            </span>

            <span className="font-mono text-slate-300">
              #{id}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mt-1.5 leading-snug group-hover:text-indigo-200 transition-colors">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {difficulty && (
              <span className={tagClass}>
                {difficulty}
              </span>
            )}

            {language && (
              <span className={tagClass}>
                {language}
              </span>
            )}

            {labels.map(
              (label, index) => (
                <span
                  key={`${label}-${index}`}
                  className={tagClass}
                >
                  {label}
                </span>
              )
            )}
          </div>

          {aiReason && (
            <div className="flex items-start gap-2 mt-3 text-sm text-slate-400 leading-6">
              <Sparkles className="w-4 h-4 text-indigo-300 shrink-0 mt-1" />

              <span className="line-clamp-2">
                {aiReason}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto w-full border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 40 40"
            >
              <circle
                cx="20"
                cy="20"
                r={radius}
                fill="transparent"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="3"
              />

              <circle
                cx="20"
                cy="20"
                r={radius}
                fill="transparent"
                stroke={
                  isHighMatch
                    ? "#22c55e"
                    : "#818cf8"
                }
                strokeWidth="3"
                strokeDasharray={
                  circumference
                }
                strokeDashoffset={
                  strokeDashoffset
                }
                strokeLinecap="round"
              />
            </svg>

            <span
              className={`absolute text-xs font-bold ${
                isHighMatch
                  ? "text-green-400"
                  : "text-indigo-300"
              }`}
            >
              {matchScore}%
            </span>
          </div>

          <span className="text-xs text-slate-400 mt-1 hidden md:block">
            Match
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate();
          }}
        >
          <span className="hidden sm:inline">
            Start Issue
          </span>

          <span className="sm:hidden">
            Start
          </span>

          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
