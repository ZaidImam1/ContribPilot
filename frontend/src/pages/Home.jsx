import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles, Lightbulb } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Find the right issue",
    text: "Enter a repository and your skills to get issues that match your level.",
  },
  {
    icon: Sparkles,
    title: "Understand it quickly",
    text: "Get a clear breakdown: files to inspect, concepts and investigation steps.",
  },
  {
    icon: Lightbulb,
    title: "Get guided hints",
    text: "Ask for hints in three levels whenever you get stuck.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-5 w-full">

        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white"
          >
            ContribPilot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-xl mx-auto text-slate-300 text-lg leading-8 mt-6"
          >
            AI-powered GitHub contribution assistant for issue discovery,
            breakdown and guided hints.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mt-9"
          >
            <button
              onClick={() => navigate("/match")}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Find My First Issue <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-[#13161d] p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/15 grid place-items-center mb-4">
                <Icon className="w-5 h-5 text-indigo-300" />
              </div>

              <h3 className="text-base font-semibold text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
