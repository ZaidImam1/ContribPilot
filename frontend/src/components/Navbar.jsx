import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const STEPS = [
  "Match",
  "Understand",
  "Reproduce",
  "Fix",
  "Verify",
  "PR Ready",
];

function stepFromPath(pathname) {
  if (pathname.startsWith("/contrib/issue/")) return 1;
  if (pathname.startsWith("/issue")) return 1;
  if (pathname.startsWith("/pr-ready")) return 5;

  return -1;
}

export default function Navbar({
  currentStep,
  blurOnScroll = false,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const derived = currentStep ?? stepFromPath(pathname);

  useEffect(() => {
    if (!blurOnScroll) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [blurOnScroll]);

  // Solid navbar so page content never shows through the text
  const shellClass = [
    "sticky top-0 z-50",
    "bg-[#0c0e13]/95 backdrop-blur-md",
    "border-b border-white/10",
    blurOnScroll && scrolled ? "shadow-lg shadow-black/30" : "",
    "transition-shadow duration-300",
  ]
    .filter(Boolean)
    .join(" ");

  // --------------------------------------------------
  // Base navigation styles
  // --------------------------------------------------

  const baseLink =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors";

  const activeLink =
    "text-white bg-white/10";

  const inactiveLink =
    "text-slate-400 hover:text-white hover:bg-white/5";

  const linkClass = ({ isActive }) =>
    [
      baseLink,
      isActive ? activeLink : inactiveLink,
    ].join(" ");

  // --------------------------------------------------
  // Contributions active state
  // --------------------------------------------------

  const contributionsActive =
    pathname.startsWith("/contrib") ||
    pathname.startsWith("/issue");

  return (
    <header className={shellClass}>
      <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 shrink-0"
          aria-label="ContribPilot home"
        >
          <div className="text-left">
            <b className="block text-lg leading-none text-white font-semibold">
              ContribPilot
            </b>

            <div className="text-[11px] text-slate-400 mt-1">
              Verified contribution
            </div>
          </div>
        </button>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/match" className={linkClass}>
            Explore Issues
          </NavLink>

          <NavLink
            to="/contrib"
            className={[
              baseLink,
              contributionsActive
                ? activeLink
                : inactiveLink,
            ].join(" ")}
          >
            Contributions
          </NavLink>

          <NavLink to="/config" className={linkClass}>
            Configuration
          </NavLink>

          <NavLink to="/docs" className={linkClass}>
            Docs
          </NavLink>
        </nav>

        {/* Current Contribution Step */}
        {derived >= 0 && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#13161d]">
            <span className="text-xs text-slate-400">
              Step
            </span>

            <span className="text-xs font-semibold text-indigo-300">
              {String(derived + 1).padStart(2, "0")}
            </span>

            <span className="text-sm text-slate-200">
              {STEPS[derived]}
            </span>
          </div>
        )}

        {/* Right Cluster */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            GitHub Connected
          </span>

          <button
            onClick={() => navigate("/config")}
            className={`w-9 h-9 rounded-lg grid place-items-center border transition-colors ${
              pathname.startsWith("/config")
                ? "border-indigo-400/60 bg-indigo-500/15"
                : "border-white/10 bg-[#13161d] hover:bg-white/10"
            }`}
            aria-label="Settings"
          >
            <Settings
              className={`w-4 h-4 transition-colors ${
                pathname.startsWith("/config")
                  ? "text-indigo-300"
                  : "text-slate-300"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
