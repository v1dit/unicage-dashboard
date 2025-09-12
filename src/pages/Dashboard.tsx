import { useEffect, useState } from "react";
import { Card, CardHeader, CardSection } from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";

type Health = { ok: boolean; version: string; chainId: number };

export default function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/health`);
        const data = await res.json();
        setHealth(data);
      } catch (e:any) {
        setErr(e?.message ?? "Failed to load");
      }
    })();
  }, []);

  const status: "ok"|"pending"|"error"|"unknown" =
    err ? "error" : health ? (health.ok ? "ok" : "unknown") : "pending";

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader title="Backend Health" subtitle="Live ping to your Render API" />
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          <div className="text-sm text-slate-500">
            {health ? "Connected" : err ? "Error" : "Checking…"}
          </div>
        </div>
        <CardSection>
          <pre className="bg-slate-50 rounded-xl p-4 overflow-x-auto text-sm">
{JSON.stringify(health ?? { error: err ?? "Loading…" }, null, 2)}
          </pre>
        </CardSection>
      </Card>

      <Card>
        <CardHeader title="Quick Facts" />
        <ul className="space-y-2 text-sm">
          <li>• Chain ID: <span className="font-mono">{health?.chainId ?? "—"}</span></li>
          <li>• Version: <span className="font-mono">{health?.version ?? "—"}</span></li>
          <li>• API Base: <span className="font-mono break-all">{import.meta.env.VITE_API_BASE}</span></li>
        </ul>
      </Card>

      {/* Static placeholder table for demo – wire later */}
      <Card className="xl:col-span-3">
        <CardHeader title="Recent Activity" subtitle="Static sample for demo (real data later)" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="py-2 pr-4">Tx Hash</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROWS.map(r => (
                <tr key={r.tx}>
                  <td className="py-2 pr-4 font-mono truncate max-w-[220px]">{r.tx}</td>
                  <td className="py-2 pr-4 capitalize">{r.type}</td>
                  <td className="py-2 pr-4">{r.amount} <span className="text-slate-500">OG</span></td>
                  <td className="py-2 pr-4"><StatusBadge status={r.status as any} /></td>
                  <td className="py-2">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const ROWS = [
  { tx: "0xaaa111…", type: "send",    amount: "1.00", status: "ok",      time: "2025-09-10 10:00Z" },
  { tx: "0xbbb222…", type: "receive", amount: "2.75", status: "ok",      time: "2025-09-09 18:32Z" },
  { tx: "0xccc333…", type: "send",    amount: "1.00", status: "pending", time: "2025-09-09 16:05Z" },
  { tx: "0xddd444…", type: "send",    amount: "0.50", status: "error",   time: "2025-09-08 23:01Z" },
];
