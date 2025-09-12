import { useState } from "react";
import { api } from "../lib/api";

export function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!to || !amount) { setStatus("Enter recipient and amount."); return; }
    setLoading(true);
    setStatus("");
    try {
      const r = await api.payInitiate(to.trim(), amount.trim(), memo.trim() || undefined);
      setStatus(`status: ${r.status} | tx: ${r.txHash}`);
      setMemo("");
    } catch (e: any) {
      setStatus(`error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
      <h1>Send Payment</h1>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <input placeholder="Recipient 0x…" value={to} onChange={e=>setTo(e.target.value)} />
        <input placeholder="Amount e.g. 1.00" value={amount} onChange={e=>setAmount(e.target.value)} />
        <textarea placeholder="Memo (optional)" value={memo} onChange={e=>setMemo(e.target.value)} />
        <button onClick={handleSend} disabled={loading} style={{ padding: "10px 16px" }}>
          {loading ? "Sending…" : "Send Payment"}
        </button>
        {status && <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{status}</div>}
      </div>
    </div>
  );
}
export default Send;
