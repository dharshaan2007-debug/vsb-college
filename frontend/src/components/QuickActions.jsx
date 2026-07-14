import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  Wallet,
  Award,
  Landmark,
  Phone,
} from "lucide-react";

const actions = [
  { label: "Admissions", icon: GraduationCap, to: "/admissions" },
  { label: "Departments", icon: Building2, to: "/departments" },
  { label: "Placements", icon: BriefcaseBusiness, to: "/placements" },
  { label: "Fees", icon: Wallet, to: "/fees" },
  { label: "Scholarships", icon: Award, to: "/scholarships" },
  { label: "Facilities", icon: Landmark, to: "/facilities" },
  { label: "Contact Us", icon: Phone, to: "/contact" },
];

export default function QuickActions({ onAsk }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {actions.map(({ label, icon: Icon, to }) => (
        <button
          key={label}
          onClick={() => (onAsk ? onAsk(label) : navigate(to))}
          className="group flex flex-col items-start gap-3 rounded-2xl border border-circuit/10 bg-white p-4 text-left shadow-sm hover:shadow-md hover:border-volt/40 transition-all"
        >
          <span className="rounded-xl bg-ink/5 p-2 group-hover:bg-volt/10 transition-colors">
            <Icon className="w-5 h-5 text-circuit group-hover:text-volt" />
          </span>
          <span className="font-display text-sm font-semibold text-ink">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
