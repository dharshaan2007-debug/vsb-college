import { NavLink } from "react-router-dom";
import { Cpu } from "lucide-react";

const links = [
  { to: "/", label: "Assistant" },
  { to: "/admissions", label: "Admissions" },
  { to: "/departments", label: "Departments" },
  { to: "/placements", label: "Placements" },
  { to: "/fees", label: "Fees" },
  { to: "/scholarships", label: "Scholarships" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <Cpu className="w-5 h-5 text-volt" />
          <span>VSB Engineering College</span>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-volt/20 text-volt"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* mobile nav */}
      <nav className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2 text-xs">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `whitespace-nowrap px-3 py-1 rounded-full ${
                isActive ? "bg-volt/20 text-volt" : "text-white/60"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
