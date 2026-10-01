import {
  GitBranch,
  Search,
  Code2,
  Sparkles,
  ListChecks,
  Lightbulb,
  ArrowRight,
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
        <p>
          Open the repository on GitHub. For example:
        </p>

        <div className={codeBox}>
          https://github.com/ejwa/gitinspector
        </div>

        <div className="mt-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-300" />

          <p>
            From the repository URL, copy only the{" "}
            <span className="text-white font-semibold">
              owner/repository
            </span>{" "}
            part:
          </p>
        </div>

        <div className={codeBox}>
          ejwa/gitinspector
        </div>

        <p className="mt-4">
          Paste this value into the{" "}
          <span className="text-white font-semibold">
            Repository
          </span>{" "}
          field in ContribPilot.
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
        <p>
          Enter your skills separated by commas.
        </p>

        <div className={codeBox}>
          python, git, pytest
        </div>

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
        <p>
          After entering the repository and skills, click:
        </p>

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
    description:
      "Review the recommended issues and their match information.",
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
            <div
              key={item}
              className="flex items-center gap-3 text-slate-200"
            >
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
    description:
      "Choose an issue you want to understand and work on.",
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
          If you get stuck, you can request hints from the Issue Details
          page.
        </p>
      </>
    ),
  },
];

function FlowRow({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, index, array) => (
        <div
          key={item}
          className="flex items-center gap-3"
        >
          <span className="rounded-lg border border-white/10 bg-[#0c0e13] px-4 py-2 text-sm text-slate-100">
            {item}
          </span>

          {index !== array.length - 1 && (
            <ArrowRight className="w-4 h-4 text-slate-500" />
          )}
        </div>
      ))}
    </div>
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

        {/* Flow */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#13161d] p-6">
          <FlowRow
            items={[
              "Repository",
              "Skills",
              "Find Issues",
              "Match",
              "Breakdown",
              "Hints",
            ]}
          />
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

        {/* Final flow */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-8">
          <div className="text-sm font-medium text-indigo-300">
            Workflow
          </div>

          <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
            From repository to contribution
          </h2>

          <div className="mt-6">
            <FlowRow
              items={[
                "GitHub Repo",
                "Skills",
                "Issue Matching",
                "Match Score",
                "Issue Breakdown",
                "Hints",
              ]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
