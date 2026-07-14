import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Facilities() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const f = data.facilities;

  return (
    <PageShell title="Campus Facilities" subtitle="LIFE ON CAMPUS">
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(f).map(([key, value]) => (
          <div key={key} className="rounded-2xl border border-circuit/10 bg-white p-5">
            <h3 className="font-display font-semibold text-ink mb-1 capitalize">
              {key}
            </h3>
            <p className="text-sm">{value}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
