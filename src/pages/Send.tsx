import { useState } from "react";

export default function Send() {
  const API = import.meta.env.VITE_API_BASE;
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const r = await fetch(`${API}/pay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, amount }),
      });
      setResult(await r.json());
    } catch (err: any) {
      setResult({ ok: false, error: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl bg-green-50 p-6 border border-green-100 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Send Tokens</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Recipient Address</label>
          <input value={to} onChange={e=>setTo(e.target.value)} placeholder="0x..." 
            className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Amount (OG)</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" 
            className="w-full rounded-xl border px-3 py-2" />
          <div className="text-sm text-gray-500 mt-1">Estimated fee: 0.001 OG</div>
        </div>
        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          ⚠ Blockchain transactions cannot be reversed. Please verify the recipient address carefully.
        </div>
        <button disabled={busy} 
          className="w-full rounded-xl bg-green-600 text-white py-3 font-semibold hover:bg-green-700">
          {busy ? "Sending..." : "Send Tokens"}
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm">
          {result.ok
            ? <>✅ Tx: <a className="underline" href={`https://chainscan-galileo.0g.ai/tx/${result.hash}`} target="_blank">{result.hash}</a></>
            : <>❌ {result.error}</>}
        </div>
      )}
    </div>
  );
}
