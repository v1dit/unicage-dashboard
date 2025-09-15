import { useState } from "react";
import { api, type InitiateResp } from "../lib/api";

export default function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [resp, setResp] = useState<InitiateResp | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResp(null); setErr(null); setLoading(true);
    try {
      const r = await api.initiate(to.trim(), amount.trim());
      setResp(r);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  const explorer =
    resp?.txHash ? `https://chainscan-galileo.0g.ai/tx/${resp.txHash}` : null;

  return (
    <div className="mx-auto max-w-5xl p-6 grid gap-6 md:grid-cols-2">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl ring-1 ring-zinc-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Send Payment</h2>

        <div>
          <label className="block text-sm mb-1">Recipient</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="0x…"
            className="w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Amount (0G)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1.00"
            className="w-full rounded-xl ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-indigo-600 text-white px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send"}
        </button>

        {err && <p className="text-red-600 text-sm">Error: {err}</p>}
      </form>

      <div className="bg-white rounded-2xl ring-1 ring-zinc-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-3">Response</h2>
        {resp ? (
          <>
            {explorer && (
              <a
                href={explorer}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline text-sm"
              >
                View on ChainScan
              </a>
            )}
            <pre className="text-sm bg-zinc-50 rounded-xl p-4 overflow-auto mt-3">
              {JSON.stringify(resp, null, 2)}
            </pre>
          </>
        ) : (
          <p className="text-zinc-600">No response yet</p>
        )}
      </div>
    </div>
  );
}
