import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Placements() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const p = data.placements;

  const stats = [
    { label: "Highest Package", value: p.highestPackage },
    { label: "Average Package", value: p.averagePackage },
    { label: "Placement %", value: p.placementPercentage },
  ];

  return (
    <PageShell title="Placements" subtitle="CAREER OUTCOMES">
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-circuit/10 bg-white p-5 text-center">
            <p className="text-xl font-display font-bold text-ink">{s.value}</p>
            <p className="text-xs text-steel mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-2">Recruiting Companies</h3>
        <div className="flex flex-wrap gap-2">
          {p.recruiters.map((r) => (
            <span key={r} className="text-sm bg-ink/5 px-3 py-1 rounded-full">{r}</span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Training</h3>
        <p>{p.training}</p>
      </div>
    </PageShell>
  );
}
