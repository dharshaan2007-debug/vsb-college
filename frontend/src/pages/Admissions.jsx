import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Admissions() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const { admissions } = data;

  return (
    <PageShell title="Admissions" subtitle="HOW TO JOIN">
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Process</h3>
        <p>{admissions.process}</p>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Eligibility</h3>
        <p>{admissions.eligibility}</p>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Required Documents</h3>
        <ul className="list-disc list-inside space-y-1">
          {admissions.documents.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Timeline</h3>
        <p>{admissions.timeline}</p>
      </div>
    </PageShell>
  );
}
