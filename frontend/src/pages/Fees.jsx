import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Fees() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const f = data.fees;

  const rows = [
    ["Tuition Fee", f.tuitionFeeNote],
    ["Government Quota", f.governmentQuota],
    ["Management Quota", f.managementQuota],
    ["Hostel Fee", f.hostelFee],
    ["Bus Fee", f.busFee],
  ];

  return (
    <PageShell title="Fee Structure" subtitle="COST OF EDUCATION">
      <div className="rounded-2xl border border-circuit/10 bg-white overflow-hidden">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4 ${
              i !== rows.length - 1 ? "border-b border-circuit/10" : ""
            }`}
          >
            <span className="font-display font-semibold text-ink w-48 flex-shrink-0">
              {label}
            </span>
            <span className="text-sm">{value}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
