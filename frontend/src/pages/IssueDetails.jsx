import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  FileCode2,
  ListChecks,
  Lightbulb,
  Target,
  AlertCircle,
  CheckCircle2,
  GitBranch,
  Hash,
  Loader2,
  ArrowLeft,
  Inbox,
} from "lucide-react";

import { getIssueBreakdown } from "../services/api.js";

import {
  getMatchCriteria,
  getActiveIssueId,
} from "../utils/sessions.js";

import HintCard from "../components/HintCard.jsx";

function SectionCard({
  icon: Icon,
  title,
  children,
  glow = "violet",
}) {
  const iconColor =
    glow === "cyan"
      ? "text-cyan-300"
      : glow === "green"
        ? "text-emerald-300"
        : "text-indigo-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-7">
      <div className="flex items-center gap-2.5 mb-4">
        {Icon && (
          <Icon className={`w-5 h-5 ${iconColor}`} />
        )}

        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

function TextBlock({ children }) {
  return (
    <p className="text-[15px] sm:text-base text-slate-300 leading-7 whitespace-pre-wrap break-words">
      {children}
    </p>
  );
}

function BulletList({ items = [] }) {
  if (!items.length) return null;

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15px] sm:text-base text-slate-300 leading-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-3 shrink-0" />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items = [] }) {
  if (!items.length) return null;

  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3"
        >
          <span className="shrink-0 w-7 h-7 rounded-md border border-indigo-400/30 bg-indigo-500/10 grid place-items-center text-xs font-semibold text-indigo-200 mt-0.5">
            {i + 1}
          </span>

          <span className="text-[15px] sm:text-base text-slate-300 leading-7">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ChipRow({
  items = [],
  icon: Icon,
  emptyText,
}) {
  if (!items.length) {
    if (!emptyText) return null;

    return (
      <p className="text-sm text-slate-400 italic">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-white/5 text-slate-100"
        >
          {Icon && (
            <Icon className="w-3.5 h-3.5 text-slate-400" />
          )}

          {item}
        </span>
      ))}
    </div>
  );
}

function ContextBadge({ status }) {
  if (!status) return null;

  const map = {
    sufficient: {
      label: "Context Sufficient",
      cls: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
      Icon: CheckCircle2,
    },

    insufficient: {
      label: "Context Insufficient",
      cls: "border-amber-500/30 text-amber-300 bg-amber-500/10",
      Icon: AlertCircle,
    },

    partial: {
      label: "Context Partial",
      cls: "border-amber-500/30 text-amber-300 bg-amber-500/10",
      Icon: AlertCircle,
    },
  };

  const cfg =
    map[String(status).toLowerCase()] ?? {
      label: status,
      cls: "border-white/15 text-slate-300 bg-white/5",
      Icon: AlertCircle,
    };

  const { Icon } = cfg;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${cfg.cls}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const effectiveId =
    id || getActiveIssueId();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!effectiveId) {
        if (!cancelled) {
          setLoading(false);
          setData(null);
        }

        return;
      }

      const criteria = getMatchCriteria();

      if (!criteria) {
        if (!cancelled) {
          setError(
            "Match criteria missing. Please search for issues first."
          );

          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const json =
          await getIssueBreakdown({
            issueId: effectiveId,
            repo: criteria.repo,
            skills: criteria.skills,
            experience: criteria.experience,
          });

        if (!cancelled) {
          setData(json);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.message ||
              "Something went wrong"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [effectiveId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] pt-12 pb-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-300" />
          Loading issue breakdown…
        </div>
      </div>
    );
  }

  if (!effectiveId && !data && !error) {
    return (
      <div className="min-h-screen pt-12 pb-24">
        <div className="max-w-2xl mx-auto px-5">
          <div className="mb-8 text-center">
            <span className="text-sm font-medium text-indigo-300">
              Contributions
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight text-white">
              No active contribution.
            </h1>

            <p className="text-base text-slate-300 mt-4 max-w-xl mx-auto leading-7">
              Pick an issue to start working on it — its breakdown will appear here.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#13161d] p-10 sm:p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-xl border border-white/10 bg-[#0c0e13] grid place-items-center mb-5">
              <Inbox className="w-6 h-6 text-slate-300" />
            </div>

            <h2 className="text-lg font-semibold text-white mb-2">
              Nothing selected
            </h2>

            <p className="text-sm text-slate-400 max-w-md mx-auto leading-6">
              Explore issues that match your skills to begin.
            </p>

            <button
              onClick={() =>
                navigate("/match")
              }
              className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Explore Issues
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-12 pb-24">
        <div className="max-w-2xl mx-auto px-5">
          <div className="rounded-2xl border border-red-500/30 bg-[#1a1215] p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-300" />

              <h2 className="text-base font-semibold text-red-200">
                Failed to load
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-6">
              {error}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() =>
                  navigate(-1)
                }
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back
              </button>

              <button
                onClick={() =>
                  navigate("/match")
                }
                className="inline-flex items-center gap-2 text-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
              >
                Search again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const responseData = data || {};

  const breakdown =
    responseData.breakdown || {};

  const issueData =
    responseData.issue || {};

  const title =
    breakdown.title ||
    issueData.title ||
    responseData.title ||
    "";

  const body =
    breakdown.body ||
    issueData.body ||
    responseData.body ||
    "";

  const language =
    breakdown.language ||
    issueData.language ||
    responseData.language ||
    "";

  const labels =
    breakdown.labels ||
    issueData.labels ||
    responseData.labels ||
    [];

  const repo =
    responseData.repo ||
    breakdown.repo ||
    issueData.repo ||
    "";

  const issue_id =
    responseData.issue_id ||
    breakdown.issue_id ||
    issueData.issue_id ||
    effectiveId;

  const primary_entry_point =
    breakdown.primary_entry_point ||
    issueData.primary_entry_point ||
    responseData.primary_entry_point ||
    "";

  const problem_summary =
    breakdown.problem_summary || "";

  const confirmed_facts =
    Array.isArray(
      breakdown.confirmed_facts
    )
      ? breakdown.confirmed_facts
      : [];

  const files_to_inspect =
    Array.isArray(
      breakdown.files_to_inspect
    )
      ? breakdown.files_to_inspect
      : [];

  const relevant_symbols =
    Array.isArray(
      breakdown.relevant_symbols
    )
      ? breakdown.relevant_symbols
      : [];

  const concepts_to_understand =
    Array.isArray(
      breakdown.concepts_to_understand
    )
      ? breakdown.concepts_to_understand
      : [];

  const investigation_steps =
    Array.isArray(
      breakdown.investigation_steps
    )
      ? breakdown.investigation_steps
      : [];

  const verification_target =
    breakdown.verification_target || "";

  const context_status =
    breakdown.context_status || "";

  const issueContext = {
    repo,
    issue_id,
    title,
    body,
    labels,
    language,
    primary_entry_point,
    problem_summary,
    confirmed_facts,
    files_to_inspect,
    relevant_symbols,
    concepts_to_understand,
    investigation_steps,
    verification_target,
    context_status,
  };

  return (
    <div className="min-h-screen pt-10 pb-24">
      <div className="max-w-3xl mx-auto px-5 space-y-5">

        <div className="mb-3">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-3">
            <GitBranch className="w-4 h-4" />

            <span className="font-mono text-slate-300">
              {repo}
            </span>

            <span className="text-slate-600">
              •
            </span>

            <Hash className="w-4 h-4" />

            <span className="font-mono text-slate-300">
              {issue_id}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Issue Breakdown
          </h1>

          {title && (
            <p className="mt-3 text-base text-slate-300 leading-7">
              {title}
            </p>
          )}

          {context_status && (
            <div className="mt-4">
              <ContextBadge
                status={context_status}
              />
            </div>
          )}
        </div>

        {problem_summary && (
          <SectionCard
            icon={Lightbulb}
            title="Problem Summary"
            glow="violet"
          >
            <TextBlock>
              {problem_summary}
            </TextBlock>
          </SectionCard>
        )}

        {confirmed_facts.length > 0 && (
          <SectionCard
            icon={ListChecks}
            title="Confirmed Facts"
          >
            <BulletList
              items={confirmed_facts}
            />
          </SectionCard>
        )}

        {files_to_inspect.length > 0 && (
          <SectionCard
            icon={FileCode2}
            title="Files to Inspect"
          >
            <div className="flex flex-col gap-2.5">
              {files_to_inspect.map(
                (file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#0c0e13] font-mono text-[13px] text-slate-200"
                  >
                    <FileCode2 className="w-4 h-4 text-slate-400 shrink-0" />

                    <span className="truncate">
                      {file}
                    </span>
                  </div>
                )
              )}
            </div>
          </SectionCard>
        )}

        <SectionCard
          icon={Hash}
          title="Relevant Symbols"
        >
          <ChipRow
            items={relevant_symbols}
            icon={Hash}
            emptyText="No specific symbols identified."
          />
        </SectionCard>

        {concepts_to_understand.length > 0 && (
          <SectionCard
            icon={Lightbulb}
            title="Concepts to Understand"
          >
            <ChipRow
              items={
                concepts_to_understand
              }
            />
          </SectionCard>
        )}

        {investigation_steps.length > 0 && (
          <SectionCard
            icon={ListChecks}
            title="Investigation Steps"
          >
            <NumberedList
              items={
                investigation_steps
              }
            />
          </SectionCard>
        )}

        {verification_target && (
          <SectionCard
            icon={Target}
            title="Verification Target"
            glow="green"
          >
            <TextBlock>
              {verification_target}
            </TextBlock>
          </SectionCard>
        )}

        <HintCard
          key={`hint-${issue_id}`}
          issueId={issue_id}
          issueContext={issueContext}
          currentProgress={{}}
        />

      </div>
    </div>
  );
}
