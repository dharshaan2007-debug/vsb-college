import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Departments() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;

  return (
    <PageShell title="Departments" subtitle="UG & PG PROGRAMS">
      <div className="grid sm:grid-cols-2 gap-4">
        {data.departments.map((d) => (
          <div
            key={d.name}
            className="rounded-2xl border border-circuit/10 bg-white p-5"
          >
            <h3 className="font-display font-semibold text-ink mb-2">{d.name}</h3>
            <p className="text-sm mb-3">{d.overview}</p>
            {d.career && (
              <div className="flex flex-wrap gap-1.5">
                {d.career.map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-volt/10 text-circuit px-2 py-1 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
