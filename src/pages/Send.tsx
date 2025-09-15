import { useState } from "react";
import { api } from "../lib/api";

export default function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const addr = to.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
      setMsg("Invalid recipient address");
      return;
    }
    if (Number(amount) <= 0) {
      setMsg("Amount must be > 0");
      return;
    }

    setBusy(true);
    try {
      const body: { to: string; amount: string; memo?: string } = {
        to: addr, amount: amount.trim(),
      };
      const m = memo.trim();
      if (m) body.memo = m;

      const r = await api.initiate(body);
      setMsg(`Success! Tx: ${r.txHash}`);
    } catch (err: any) {
      setMsg(`Error: ${err?.message || String(err)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="card p-8 bg-green-50">
        <h2 className="text-xl font-semibold mb-4">Send Tokens</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input value={to} onChange={e=>setTo(e.target.value)} placeholder="0x..." className="w-full rounded-xl border p-3"/>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount (OG)" className="w-full rounded-xl border p-3"/>
          <input value={memo} onChange={e=>setMemo(e.target.value)} placeholder="Memo (optional)" className="w-full rounded-xl border p-3"/>

          <p className="text-sm text-yellow-700 bg-yellow-100 rounded-lg p-3">
            ⚠️ Blockchain transactions cannot be reversed. Verify the recipient address carefully.
          </p>

          <button disabled={busy} className="px-6 py-3 rounded-xl bg-green-600 text-white disabled:opacity-60">
            {busy ? "Sending…" : "Send Tokens"}
          </button>
        </form>

        {msg && <p className="mt-4 font-mono text-sm">{msg}</p>}
      </div>
    </div>
  );
}
