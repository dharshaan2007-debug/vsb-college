import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Scholarships() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const s = data.scholarships;

  return (
    <PageShell title="Scholarships" subtitle="FINANCIAL SUPPORT">
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Eligibility</h3>
        <p>{s.eligibility}</p>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Tuition Fee Waiver</h3>
        <p>{s.tuitionWaiver}</p>
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink mb-1">Government Schemes</h3>
        <ul className="list-disc list-inside space-y-1">
          {s.governmentSchemes.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
