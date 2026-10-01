import {
  GitBranch,
  Search,
  Code2,
  Sparkles,
  ListChecks,
  Lightbulb,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const codeBox =
  "mt-4 rounded-xl border border-white/10 bg-[#0c0e13] px-4 py-3 font-mono text-sm text-slate-100 break-all";

const STEPS = [
  {
    number: "01",
    icon: GitBranch,
    title: "Choose a GitHub Repository",
    description:
      "Start by opening the GitHub repository where you want to contribute.",
    content: (
      <>
        <p>Open the repository on GitHub. For example:</p>

        <div className={codeBox}>https://github.com/ejwa/gitinspector</div>

        <div className="mt-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-300" />

          <p>
            From the repository URL, copy only the{" "}
            <span className="text-white font-semibold">owner/repository</span>{" "}
            part:
          </p>
        </div>

        <div className={codeBox}>ejwa/gitinspector</div>

        <p className="mt-4">
          Paste this value into the{" "}
          <span className="text-white font-semibold">Repository</span> field in
          ContribPilot.
        </p>
      </>
    ),
  },

  {
    number: "02",
    icon: Code2,
    title: "Enter Your Tech Stack",
    description:
      "Tell ContribPilot which technologies and programming skills you already know.",
    content: (
      <>
        <p>Enter your skills separated by commas.</p>

        <div className={codeBox}>python, git, pytest</div>

        <p className="mt-4">
          These skills are used to understand which repository issues are
          relevant to your technical background.
        </p>
      </>
    ),
  },

  {
    number: "03",
    icon: Search,
    title: "Find Issues",
    description:
      "Click Find Issue to let ContribPilot search for contribution opportunities.",
    content: (
      <>
        <p>After entering the repository and skills, click:</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
          <Search className="w-4 h-4" />
          Find Issue
        </div>

        <p className="mt-4">
          ContribPilot then returns a list of issues that you can explore and
          choose from.
        </p>
      </>
    ),
  },

  {
    number: "04",
    icon: ListChecks,
    title: "Explore Issue Matches",
    description: "Review the recommended issues and their match information.",
    content: (
      <>
        <p>
          Each issue card gives you important information about the
          contribution opportunity.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Issue title",
            "Repository information",
            "Programming language",
            "Matching skills",
            "AI-generated reasoning",
            "Match Score",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-500/5 p-5">
          <div className="text-sm font-semibold text-amber-200">
            Match Score
          </div>

          <p className="mt-2 leading-7 text-slate-300">
            The Match Score helps you understand how closely an issue matches
            the skills you entered.
          </p>
        </div>
      </>
    ),
  },

  {
    number: "05",
    icon: BookOpen,
    title: "Open an Issue",
    description: "Choose an issue you want to understand and work on.",
    content: (
      <>
        <p>
          Select an issue from the results. ContribPilot opens the issue
          details and starts the understanding phase.
        </p>
      </>
    ),
  },

  {
    number: "06",
    icon: Sparkles,
    title: "Understand the Issue",
    description:
      "Use the AI-generated issue breakdown to understand what needs to be investigated.",
    content: (
      <>
        <p>
          The Issue Breakdown gives you a structured view of the problem
          instead of requiring you to understand the entire repository
          immediately.
        </p>

        <p className="mt-4">
          It highlights the important parts of the issue and points you
          towards relevant files, symbols, concepts, and investigation steps.
        </p>
      </>
    ),
  },

  {
    number: "07",
    icon: Lightbulb,
    title: "Use Hints When You Need Help",
    description:
      "ContribPilot provides hints to help you move forward while investigating the issue.",
    content: (
      <>
        <p>
          If you get stuck, you can request hints from the Issue Details page.
        </p>
      </>
    ),
  },
];

/* ---------- Top: horizontal stepper ---------- */

const OVERVIEW = [
  { label: "Repository", icon: GitBranch },
  { label: "Skills", icon: Code2 },
  { label: "Find Issues", icon: Search },
  { label: "Match", icon: ListChecks },
  { label: "Breakdown", icon: Sparkles },
  { label: "Hints", icon: Lightbulb },
];

function FlowStepper() {
  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-[640px] items-start">
        {OVERVIEW.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === OVERVIEW.length - 1;

          return (
            <li key={item.label} className="relative flex-1">
              {/* connecting line */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 h-px w-full bg-gradient-to-r from-indigo-400/60 to-indigo-400/20"
                />
              )}

              <div className="relative flex flex-col items-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-indigo-400/40 bg-[#1a1e2e] ring-4 ring-[#13161d]">
                  <Icon className="h-5 w-5 text-indigo-300" />
                </span>

                <span className="mt-3 text-sm font-medium text-slate-100">
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Bottom: vertical timeline ---------- */

const JOURNEY = [
  {
    title: "GitHub Repo",
    text: "Pick the project you want to contribute to.",
  },
  {
    title: "Skills",
    text: "Add the technologies you already know.",
  },
  {
    title: "Issue Matching",
    text: "ContribPilot finds issues that fit your skills.",
  },
  {
    title: "Match Score",
    text: "See how closely each issue matches you.",
  },
  {
    title: "Issue Breakdown",
    text: "Get a clear, structured view of the problem.",
  },
  {
    title: "Hints",
    text: "Ask for help whenever you get stuck.",
  },
];

function FlowTimeline() {
  return (
    <ol className="relative">
      {/* vertical line */}
      <span
        aria-hidden="true"
        className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-400/60 via-indigo-400/25 to-emerald-400/50"
      />

      {JOURNEY.map((item, index) => {
        const isLast = index === JOURNEY.length - 1;

        return (
          <li key={item.title} className="relative flex gap-5 pb-6 last:pb-0">
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold ring-4 ring-[#13161d] ${
                isLast
                  ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
                  : "border-indigo-400/40 bg-[#1a1e2e] text-indigo-300"
              }`}
            >
              {isLast ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </span>

            <div className="min-w-0 pt-0.5">
              <div className="text-base font-semibold text-white">
                {item.title}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Docs() {
  return (
    <div className="min-h-screen pt-12 pb-24 text-slate-100">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
            <BookOpen className="w-4 h-4" />
            Documentation
          </div>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            How ContribPilot works.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            From choosing a GitHub repository to understanding an issue and
            getting guided hints, follow the workflow step by step.
          </p>
        </div>

        {/* Flow (top) */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#13161d] px-6 py-8">
          <FlowStepper />
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <section
                key={step.number}
                className="rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-8"
              >
                {/* Step heading */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 grid place-items-center">
                    <Icon className="w-5 h-5 text-indigo-300" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-medium text-indigo-300">
                      Step {step.number}
                    </div>

                    <h2 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-base leading-7 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step content */}
                <div className="mt-6 sm:ml-[60px] text-base leading-7 text-slate-300">
                  {step.content}
                </div>
              </section>
            );
          })}
        </div>

        {/* Final flow (bottom) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-8">
          <div className="text-sm font-medium text-indigo-300">Workflow</div>

          <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
            From repository to contribution
          </h2>

          <div className="mt-8">
            <FlowTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}