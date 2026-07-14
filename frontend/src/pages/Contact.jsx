import { useCollegeData } from "../hooks/useCollegeData.js";
import PageShell, { Loading, ErrorMsg } from "../components/PageShell.jsx";

export default function Contact() {
  const { data, loading, error } = useCollegeData();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg />;
  const c = data.contact;

  return (
    <PageShell title="Contact Us" subtitle="GET IN TOUCH">
      <div className="rounded-2xl border border-circuit/10 bg-white p-6 space-y-3">
        <p><span className="font-display font-semibold text-ink">Address: </span>{c.address}</p>
        <p><span className="font-display font-semibold text-ink">Phone: </span>{c.phone}</p>
        <p><span className="font-display font-semibold text-ink">Email: </span>{c.email}</p>
        <p><span className="font-display font-semibold text-ink">Maps: </span>{c.mapsLink}</p>
      </div>
    </PageShell>
  );
}
