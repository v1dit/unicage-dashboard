import { useEffect, useState } from "react";
import { api, type BalanceResp } from "../lib/api";

export default function Dashboard() {
  const [data, setData] = useState<BalanceResp | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.balance()
      .then((d) => setData(d))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="bg-white rounded-2xl ring-1 ring-zinc-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-3">Wallet Balance</h2>

        {loading && <p className="text-zinc-500">Loading…</p>}
        {err && <p className="text-red-600">Error: {err}</p>}

        {data && (
          <>
            <div className="text-4xl font-bold">
              {Number(data.balance).toFixed(2)} <span className="text-zinc-500 text-2xl">0G</span>
            </div>
            <p className="text-sm text-zinc-600 mt-2">
              Address: <span className="font-mono">{data.address}</span>
            </p>

            <pre className="text-xs bg-zinc-50 rounded-xl p-4 mt-4 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
