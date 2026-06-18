import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition",
      isActive
        ? "bg-[#0089f7] text-white shadow-[0_12px_30px_rgba(0,137,247,0.25)]"
        : "text-[#252525] hover:bg-[#eef6ff] hover:text-[#0089f7]",
    ].join(" ");

  return (
    <header className="sticky top-0  z-50 border-b border-[#fcfcfc] bg-white/85 backdrop-blur-xl">
      <div className="ml-4 mr-4 flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-black text-white shadow-[0_16px_30px_rgba(0,137,247,0.25)]">
            C
          </div>

          <div>
            <p className="text-base font-bold leading-none text-text">
              Trackflow
            </p>
            <p className="mt-1 text-xs font-medium text-text-secondary">
              Analytics Dashboard
            </p>
          </div>
        </NavLink>

        <nav className="flex items-center gap-2 rounded-full border border-[#fcfcfc] bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <NavLink to="/" className={linkClass}>
            Sessions
          </NavLink>

          <NavLink to="/heatmap" className={linkClass}>
            Heatmap
          </NavLink>

          <a
            href="/demo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm font-semibold text-text transition hover:bg-[#eef6ff] hover:text-primary"
          >
            Track SDK
          </a>
        </nav>
      </div>
    </header>
  );
}
