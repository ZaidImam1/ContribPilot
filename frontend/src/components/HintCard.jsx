import { useState } from "react";

import {
  Lightbulb,
  Loader2,
  ChevronDown,
  ChevronUp,
  Focus,
  FileCode2,
  Hash,
  TestTube2,
  Target,
  Braces,
} from "lucide-react";

import { getHint } from "../services/api.js";

function parseHintPayload(raw) {
  if (raw == null) {
    return null;
  }

  if (typeof raw === "object") {
    return raw;
  }

  if (typeof raw !== "string") {
    return {
      focus_summary: String(raw),
    };
  }

  let current = raw.trim();

  if (!current) {
    return null;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    current = current
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    try {
      const parsed = JSON.parse(current);

      if (
        parsed !== null &&
        typeof parsed === "object"
      ) {
        return parsed;
      }

      return {
        focus_summary: String(parsed),
      };
    } catch {
      const firstBrace = current.indexOf("{");
      const lastBrace = current.lastIndexOf("}");

      if (
        firstBrace !== -1 &&
        lastBrace > firstBrace
      ) {
        current = current.slice(
          firstBrace,
          lastBrace + 1
        );

        continue;
      }

      break;
    }
  }

  return {
    focus_summary: current,
  };
}

function formatLabel(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    )
    .replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );
}

function HintValue({ value }) {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    return (
      <p className="text-[15px] text-slate-200 leading-7 whitespace-pre-wrap break-words">
        {value}
      </p>
    );
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return (
      <span className="text-[15px] text-slate-200 leading-7">
        {String(value)}
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1.5 text-[13px] rounded-lg border border-white/10 bg-white/5 text-slate-200 leading-5"
          >
            {typeof item === "object"
              ? JSON.stringify(item)
              : String(item)}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <pre className="text-[13px] text-slate-200 font-mono leading-6 whitespace-pre-wrap break-words overflow-x-auto rounded-lg bg-[#0c0e13] border border-white/10 p-3">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return null;
}

function MiniChipList({
  label,
  items = [],
  icon: Icon,
}) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2.5">
        {Icon && (
          <Icon className="w-4 h-4 text-indigo-300" />
        )}

        <span className="text-sm font-medium text-slate-300">
          {label}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="px-2.5 py-1.5 text-xs font-mono rounded-md border border-white/10 bg-[#0c0e13] text-slate-200 leading-5"
          >
            {typeof item === "string"
              ? item
              : JSON.stringify(item)}
          </span>
        ))}
      </div>
    </div>
  );
}

function renderSpecialField(key, value) {
  const normalizedKey =
    String(key).toLowerCase();

  const fileKeys = [
    "file",
    "files",
    "target_file",
    "files_to_check",
    "files_to_inspect",
  ];

  const symbolKeys = [
    "symbol",
    "symbols",
    "target_symbol",
    "symbols_to_inspect",
    "relevant_symbols",
  ];

  const testKeys = [
    "test",
    "tests",
    "relevant_tests",
  ];

  const areaKeys = [
    "area",
    "areas",
    "areas_of_interest",
    "areas_to_inspect",
  ];

  if (
    fileKeys.some((item) =>
      normalizedKey.includes(item)
    )
  ) {
    const items = Array.isArray(value)
      ? value
      : [value];

    return (
      <MiniChipList
        label={formatLabel(key)}
        items={items}
        icon={FileCode2}
      />
    );
  }

  if (
    symbolKeys.some((item) =>
      normalizedKey.includes(item)
    )
  ) {
    const items = Array.isArray(value)
      ? value
      : [value];

    return (
      <MiniChipList
        label={formatLabel(key)}
        items={items}
        icon={Hash}
      />
    );
  }

  if (
    testKeys.some((item) =>
      normalizedKey.includes(item)
    )
  ) {
    const items = Array.isArray(value)
      ? value
      : [value];

    return (
      <MiniChipList
        label={formatLabel(key)}
        items={items}
        icon={TestTube2}
      />
    );
  }

  if (
    areaKeys.some((item) =>
      normalizedKey.includes(item)
    )
  ) {
    const items = Array.isArray(value)
      ? value
      : [value];

    return (
      <MiniChipList
        label={formatLabel(key)}
        items={items}
        icon={Target}
      />
    );
  }

  return null;
}

function HintContent({ payload }) {
  if (!payload) {
    return (
      <p className="text-sm text-slate-400 italic">
        No hint content provided.
      </p>
    );
  }

  if (
    typeof payload === "string" ||
    typeof payload === "number"
  ) {
    return (
      <p className="text-[15px] text-slate-200 leading-7 whitespace-pre-wrap break-words">
        {String(payload)}
      </p>
    );
  }

  const entries = Object.entries(payload);

  if (!entries.length) {
    return (
      <p className="text-sm text-slate-400 italic">
        No hint content provided.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === ""
        ) {
          return null;
        }

        if (key === "guidance_level") {
          return (
            <div
              key={key}
              className="flex items-center gap-2.5"
            >
              <Braces className="w-4 h-4 text-indigo-300" />

              <span className="text-sm font-medium text-slate-300">
                Guidance Level
              </span>

              <span className="text-sm text-white px-2 py-0.5 rounded-md bg-white/10">
                {String(value)}
              </span>
            </div>
          );
        }

        const special = renderSpecialField(
          key,
          value
        );

        if (special) {
          return (
            <div key={key}>
              {special}
            </div>
          );
        }

        return (
          <div
            key={key}
            className="space-y-2"
          >
            <div className="flex items-center gap-2.5">
              <Focus className="w-4 h-4 text-indigo-300" />

              <span className="text-sm font-medium text-slate-300">
                {formatLabel(key)}
              </span>
            </div>

            <div className="pl-6">
              <HintValue value={value} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HintCard({
  issueId,
  issueContext = {},
  currentProgress = {},
}) {
  const [openLevels, setOpenLevels] =
    useState({});

  const [hints, setHints] = useState({});

  const [loading, setLoading] =
    useState(null);

  const [error, setError] =
    useState(null);

  const handleHintClick = async (level) => {
    setError(null);

    const alreadyLoaded =
      Boolean(hints[level]);

    if (alreadyLoaded) {
      setOpenLevels((prev) => ({
        ...prev,
        [level]: !prev[level],
      }));

      return;
    }

    setLoading(level);

    try {
      console.log(
        `[ContribPilot] Requesting hint ${level}`,
        {
          issueId,
          issueContext,
          currentProgress,
        }
      );

      const data = await getHint({
        level,
        issue_context: issueContext,
        current_progress:
          currentProgress || {},
      });

      console.log(
        `[ContribPilot] Hint ${level} response`,
        data
      );

      const raw = data?.hint_text;

      if (
        raw === null ||
        raw === undefined ||
        String(raw).trim() === ""
      ) {
        throw new Error(
          `Hint ${level} returned empty content.`
        );
      }

      const parsed =
        parseHintPayload(raw);

      if (!parsed) {
        throw new Error(
          `Unable to parse Hint ${level}.`
        );
      }

      setHints((prev) => ({
        ...prev,
        [level]: parsed,
      }));

      setOpenLevels((prev) => ({
        ...prev,
        [level]: true,
      }));
    } catch (e) {
      console.error(
        `[ContribPilot] Hint ${level} failed`,
        e
      );

      setError(
        e instanceof Error
          ? e.message
          : `Failed to generate Hint ${level}.`
      );
    } finally {
      setLoading(null);
    }
  };

  const levels = [1, 2, 3];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13161d] p-6 sm:p-7">
      <div className="flex items-center gap-2.5 mb-5">
        <Lightbulb className="w-5 h-5 text-amber-300" />

        <h2 className="text-base font-semibold text-white">
          Guided Hints
        </h2>
      </div>

      <div className="space-y-3">
        {levels.map((level) => {
          const isOpen =
            Boolean(openLevels[level]);

          const isLoading =
            loading === level;

          const hasHint =
            Boolean(hints[level]);

          return (
            <div
              key={level}
              className="rounded-xl border border-white/10 bg-[#0c0e13] overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  handleHintClick(level)
                }
                disabled={isLoading}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors disabled:opacity-60"
              >
                <div className="flex items-center gap-2.5">
                  <Focus className="w-4 h-4 text-indigo-300" />

                  <span className="text-sm font-medium text-slate-100">
                    Hint {level}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isLoading && (
                    <Loader2 className="w-4 h-4 text-slate-300 animate-spin" />
                  )}

                  {!isLoading &&
                    (isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ))}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-white/10 px-5 sm:px-6 py-6">
                  {hasHint ? (
                    <HintContent
                      payload={hints[level]}
                    />
                  ) : isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating hint...
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mt-5 text-sm text-amber-300 leading-6 whitespace-pre-wrap">
          {error}
        </p>
      )}
    </div>
  );
}
