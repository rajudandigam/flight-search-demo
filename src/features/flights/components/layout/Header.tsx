import { NavLink } from "react-router-dom";

export default function Header() {
  const base =
    "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50";
  const active = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? "bg-white text-blue-700" : "text-white/90 hover:bg-white/10"}`;

  return (
    <header className="sticky top-0 z-40 shadow-sm bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="inner flex items-center justify-between h-14">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white text-blue-700 grid place-items-center text-xs font-extrabold tracking-tight">FS</div>
          <span className="text-base font-semibold text-white tracking-tight">FlightSearch</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/results" className={active}>Trips</NavLink>
          <a href="#" className={`${base} text-white/90 hover:bg-white/10`}>Help</a>
        </nav>
      </div>
    </header>
  );
}
