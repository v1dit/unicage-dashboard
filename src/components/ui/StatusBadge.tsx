export default function StatusBadge({ status }: { status: "ok"|"pending"|"error"|"unknown" }) {
  const map: Record<string,string> = {
    ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    error: "bg-rose-50 text-rose-700 ring-rose-200",
    unknown: "bg-slate-50 text-slate-700 ring-slate-200",
  };
  return <span className={`inline-flex items-center gap-2 rounded-full ring-1 px-3 py-1 text-sm ${map[status]}`}> 
    <span className="h-2 w-2 rounded-full bg-current/70" /> {status}
  </span>;
}
