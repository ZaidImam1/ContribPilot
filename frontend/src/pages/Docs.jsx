import {
  GitBranch,
  Search,
  Code2,
  Target,
  Sparkles,
  ListChecks,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: GitBranch,
    title: "Choose a GitHub Repository",
    description:
      "Start by opening the GitHub repository where you want to contribute.",
    content: (
      <>
        <p className="text-white">
          Open the repository on GitHub. For example:
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-[#05070d]/95 px-4 py-3 font-mono text-base text-white break-all">
          https://github.com/ejwa/gitinspector
        </div>

        <div className="mt-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-1 shrink-0 text-emerald-300" />

          <p className="text-white">
            From the repository URL, copy only the{" "}
            <span className="text-white font-semibold">
              owner/repository
            </span>{" "}
            part:
          </p>
        </div>

        <div className="mt-3 rounded-xl border border-cyan-500/20 bg-[#05070d]/95 px-4 py-3 font-mono text-base text-white">
          ejwa/gitinspector
        </div>

        <p className="mt-4 text-white">
          Paste this value into the{" "}
          <span className="text-white font-semibold">Repository</span> field
          in ContribPilot.
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
        <p className="text-white">
          Enter your skills separated by commas.
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-[#05070d]/95 px-4 py-3 font-mono text-base text-white">
          python, git, pytest
        </div>

        <p className="mt-4 text-white">
          These skills are used to understand which repository issues are
          relevant to your technical background.
        </p>
      </>
    ),
  },

  {
    number: "03",
    icon: Target,
    title: "Choose Your Experience Level",
    description:
      "Select the level that best represents your current experience.",
    content: (
      <>
        <div className="grid sm:grid-cols-3 gap-4 mt-3">
          {[
            ["Beginner", "Starting with open source"],
            ["Intermediate", "Comfortable building projects"],
            ["Advanced", "Experienced with larger codebases"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#05070d]/95 p-5"
            >
              <div className="font-mono text-base text-white font-semibold">
                {title}
              </div>

              <div className="mt-2 text-sm leading-6 text-white">
                {text}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-white">
          Your selected level is passed to the issue matching system along
          with your skills.
        </p>
      </>
    ),
  },

  {
    number: "04",
    icon: Search,
    title: "Find Issues",
    description:
      "Click Find Issue to let ContribPilot search for contribution opportunities.",
    content: (
      <>
        <p className="text-white">
          After entering the repository, skills, and experience level, click:
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-[#05070d]/95 px-5 py-3 font-mono text-base text-white">
          <Search className="w-5 h-5 text-white" />
          Find Issue
        </div>

        <p className="mt-5 text-white">
          ContribPilot then returns a list of issues that you can explore and
          choose from.
        </p>
      </>
    ),
  },

  {
    number: "05",
    icon: ListChecks,
    title: "Explore Issue Matches",
    description:
      "Review the recommended issues and their match information.",
    content: (
      <>
        <p className="text-white">
          Each issue card gives you important information about the
          contribution opportunity.
        </p>

        <div className="mt-6 space-y-4">
          {[
            "Issue title",
            "Repository information",
            "Programming language",
            "Difficulty / experience level",
            "Matching skills",
            "AI-generated reasoning",
            "Match Score",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-base text-white"
            >
              <span className="w-2 h-2 rounded-full bg-violet-300 shrink-0" />
              <span className="text-white">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-amber-400/20 bg-[#05070d]/95 p-5">
          <div className="font-mono text-sm uppercase tracking-[0.15em] text-white">
            Match Score
          </div>

          <p className="mt-3 text-base leading-7 text-white">
            The Match Score helps you understand how closely an issue matches
            the skills and experience you entered.
          </p>
        </div>
      </>
    ),
  },

  {
    number: "06",
    icon: BookOpen,
    title: "Open an Issue",
    description:
      "Choose an issue you want to understand and work on.",
    content: (
      <>
        <p className="text-white">
          Select an issue from the results. ContribPilot opens the issue
          details and starts the understanding phase.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-[#05070d]/95 p-6">
          <div className="font-mono text-sm uppercase tracking-[0.15em] text-white">
            Issue Details
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {[
              "Problem Summary",
              "Confirmed Facts",
              "Files to Inspect",
              "Relevant Symbols",
              "Concepts to Understand",
              "Investigation Steps",
              "Verification Target",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-[#05070d]/95 px-4 py-3 text-base text-white"
              >
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },

  {
    number: "07",
    icon: Sparkles,
    title: "Understand the Issue",
    description:
      "Use the AI-generated issue breakdown to understand what needs to be investigated.",
    content: (
      <>
        <p className="text-white">
          The Issue Breakdown gives you a structured view of the problem
          instead of requiring you to understand the entire repository
          immediately.
        </p>

        <p className="mt-5 text-white">
          It highlights the important parts of the issue and points you
          towards relevant files, symbols, concepts, and investigation steps.
        </p>
      </>
    ),
  },

  {
    number: "08",
    icon: Lightbulb,
    title: "Use Hints When You Need Help",
    description:
      "ContribPilot provides hints to help you move forward while investigating the issue.",
    content: (
      <>
        <p className="text-white">
          If you get stuck, you can request hints from the Issue Details
          page.
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            [
              "Level 1",
              "Starting direction",
              "Where to look and what to inspect.",
            ],
            [
              "Level 2",
              "Logic direction",
              "Understand the relevant implementation and behavior.",
            ],
            [
              "Level 3",
              "Solution direction",
              "A more concrete approach towards fixing the issue.",
            ],
          ].map(([level, title, text]) => (
            <div
              key={level}
              className="rounded-xl border border-white/10 bg-[#05070d]/95 p-5"
            >
              <div className="font-mono text-sm text-white font-semibold">
                {level}
              </div>

              <div className="mt-2 text-base font-semibold text-white">
                {title}
              </div>

              <p className="mt-2 text-sm leading-6 text-white">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 mt-1 shrink-0 text-amber-200" />

          <p className="text-base leading-7 text-white">
            You can request the hint level that you need directly.
          </p>
        </div>
      </>
    ),
  },
];

export default function Docs() {
  return (
    <div className="relative isolate min-h-screen bg-transparent pt-28 pb-24 text-white">
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-white">
            <BookOpen className="w-4 h-4 text-white" />
            Documentation
          </div>

          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            How ContribPilot works.
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-8 text-white font-mono">
            From choosing a GitHub repository to understanding an issue and
            getting guided hints, follow the workflow step by step.
          </p>
        </div>

        {/* Flow */}
        <div className="relative z-10 isolate mb-12 rounded-2xl border border-white/10 bg-[#05070d]/95 backdrop-blur-md p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            {[
              "Repository",
              "Skills",
              "Level",
              "Find Issues",
              "Match",
              "Breakdown",
              "Hints",
            ].map((item, index, array) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="rounded-lg border border-white/10 bg-[#05070d]/95 px-4 py-2.5 font-mono text-sm text-white">
                  {item}
                </span>

                {index !== array.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="relative z-10 isolate space-y-5">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <section
                key={step.number}
                className="relative z-10 isolate rounded-2xl border border-white/10 bg-[#05070d]/95 backdrop-blur-md overflow-hidden"
              >
                <div className="p-7 sm:p-9">

                  {/* Step heading */}
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl border border-violet-500/25 bg-[#05070d]/95 grid place-items-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-mono text-xs tracking-[0.2em] text-white">
                        STEP {step.number}
                      </div>

                      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                        {step.title}
                      </h2>

                      <p className="mt-3 text-base sm:text-lg leading-7 text-white">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="mt-8 ml-0 sm:ml-[68px] text-base sm:text-lg leading-8 text-white">
                    {step.content}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Final flow */}
        <div className="relative z-10 isolate mt-8 rounded-2xl border border-cyan-500/15 bg-[#05070d]/95 backdrop-blur-md p-7 sm:p-9">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-white">
            Workflow
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
            From repository to contribution
          </h2>

          <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-sm">
            {[
              "GitHub Repo",
              "Skills",
              "Experience",
              "Issue Matching",
              "Match Score",
              "Issue Breakdown",
              "Hints",
            ].map((item, index, array) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="rounded-lg border border-white/10 bg-[#05070d]/95 px-4 py-2.5 text-white">
                  {item}
                </span>

                {index < array.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}