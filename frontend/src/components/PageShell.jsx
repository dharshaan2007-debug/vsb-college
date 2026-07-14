export default function PageShell({ title, subtitle, children }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <p className="text-xs tracking-widest font-semibold text-volt mb-2">
        {subtitle}
      </p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
        {title}
      </h1>
      <div className="space-y-6 text-steel">{children}</div>
    </div>
  );
}

export function Loading() {
  return <div className="max-w-4xl mx-auto px-5 py-16 text-steel">Loading college data...</div>;
}

export function ErrorMsg() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-16 text-red-500">
      Couldn't reach the backend. Make sure it's running at the API URL configured in .env.
    </div>
  );
}
