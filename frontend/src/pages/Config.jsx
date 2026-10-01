import { useState } from "react";

import {
  Eye,
  EyeOff,
  Code,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const cardClass =
  "rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-8";

const labelClass =
  "block text-sm font-medium text-slate-300 mb-2";

const inputClass =
  "w-full px-4 py-3 pr-14 rounded-xl bg-[#0c0e13] border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 transition font-mono text-sm";

const eyeBtnClass =
  "absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white active:scale-95 transition z-10";

const saveBtnClass =
  "inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors active:scale-[0.98]";

export default function Config() {
  const [githubToken, setGithubToken] = useState("");
  const [llmKey, setLlmKey] = useState("");

  const [showGithub, setShowGithub] = useState(false);
  const [showLlm, setShowLlm] = useState(false);

  const [savedGithub, setSavedGithub] = useState(false);
  const [savedLlm, setSavedLlm] = useState(false);

  const handleSaveGithub = () => {
    if (!githubToken.trim()) return;

    setSavedGithub(true);

    setTimeout(() => {
      setSavedGithub(false);
    }, 2000);
  };

  const handleSaveLlm = () => {
    if (!llmKey.trim()) return;

    setSavedLlm(true);

    setTimeout(() => {
      setSavedLlm(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-2xl mx-auto px-5">

        {/* ---------- Page Header ---------- */}
        <div className="mb-8 text-center">
          <span className="text-sm font-medium text-indigo-300">
            Configuration
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight text-white">
            Connect your developer tools.
          </h1>

          <p className="text-base text-slate-300 mt-4 max-w-xl mx-auto leading-7">
            Configure your credentials to enable AI analysis and GitHub access.
          </p>
        </div>

        {/* ---------- GitHub Token Card ---------- */}
        <div className={cardClass}>
          <div className="flex items-center gap-2.5 mb-6">
            <Code className="w-5 h-5 text-indigo-300" />

            <h2 className="text-base font-semibold text-white">
              GitHub Configuration
            </h2>
          </div>

          <label className={labelClass}>
            Personal Access Token
          </label>

          <div className="relative">
            <input
              type={showGithub ? "text" : "password"}
              value={githubToken}
              onChange={(e) =>
                setGithubToken(e.target.value)
              }
              placeholder="github_pat_••••••••••••••••"
              autoComplete="off"
              spellCheck={false}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() =>
                setShowGithub((v) => !v)
              }
              aria-label={
                showGithub
                  ? "Hide GitHub token"
                  : "Show GitHub token"
              }
              className={eyeBtnClass}
            >
              {showGithub ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <p className="text-sm text-slate-400 mt-3 leading-6">
            Required for accessing GitHub repositories and issues.
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSaveGithub}
              className={saveBtnClass}
            >
              Save Token
            </button>

            {savedGithub && (
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                Token saved
              </span>
            )}
          </div>
        </div>

        {/* ---------- LLM API Key Card ---------- */}
        <div className={`mt-6 ${cardClass}`}>
          <div className="flex items-center gap-2.5 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-300" />

            <h2 className="text-base font-semibold text-white">
              AI Configuration
            </h2>
          </div>

          <label className={labelClass}>
            LLM API Key
          </label>

          <div className="relative">
            <input
              type={showLlm ? "text" : "password"}
              value={llmKey}
              onChange={(e) =>
                setLlmKey(e.target.value)
              }
              placeholder="gsk_••••••••••••••••••••••••"
              autoComplete="off"
              spellCheck={false}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() =>
                setShowLlm((v) => !v)
              }
              aria-label={
                showLlm
                  ? "Hide LLM API key"
                  : "Show LLM API key"
              }
              className={eyeBtnClass}
            >
              {showLlm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <p className="text-sm text-slate-400 mt-3 leading-6">
            Used for AI-powered issue analysis, breakdowns, and hints.
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSaveLlm}
              className={saveBtnClass}
            >
              Save Key
            </button>

            {savedLlm && (
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                Key saved
              </span>
            )}
          </div>
        </div>

        {/* ---------- Security Notice ---------- */}
        <div className={`mt-6 ${cardClass}`}>
          <h2 className="text-base font-semibold text-white mb-4">
            🔒 Credential Security
          </h2>

          <ul className="text-sm text-slate-300 space-y-2 leading-6 list-disc pl-5 marker:text-slate-500">
            <li>
              Never share your API keys or tokens publicly.
            </li>

            <li>
              Never commit credentials to a repository.
            </li>

            <li>
              Use tokens with the minimum required permissions.
            </li>

            <li>
              ContribPilot does not display saved credentials.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
