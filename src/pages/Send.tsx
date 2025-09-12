import { useState } from "react";
import { Card, CardHeader } from "../components/ui/Card";
import { Button, Input, Label, Textarea } from "../components/ui/Fields";
import StatusBadge from "../components/ui/StatusBadge";

export default function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("1.00");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState<"idle"|"pending"|"ok"|"error">("idle");
  const [tx, setTx] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("pending"); setErr(null); setTx(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/pay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, amount, note: memo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");
      setTx(data?.txHash ?? data?.tx ?? "0x…");
      setStatus("ok");
    } catch (e:any) {
      setErr(e?.message ?? "Unknown error");
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader title="Send Payment" subtitle="Demo mode returns a mock tx hash" />
        <form onSubmit={onSend} className="space-y-4">
          <div>
            <Label>Recipient Address</Label>
            <Input value={to} onChange={e=>setTo(e.target.value)} placeholder="0x…" required />
          </div>
          <div>
            <Label>Amount (OG)</Label>
            <Input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} required />
          </div>
          <div>
            <Label>Memo (optional)</Label>
            <Textarea rows={3} value={memo} onChange={e=>setMemo(e.target.value)} />
          </div>
          <Button disabled={status==="pending"}>Send Payment</Button>
          <div className="pt-1">
            {status === "pending" && <StatusBadge status="pending" />}
            {status === "ok" && <StatusBadge status="ok" />}
            {status === "error" && <StatusBadge status="error" />}
          </div>
        </form>
      </Card>

      <Card>
        <CardHeader title="Result" />
        {!tx && !err && <div className="text-slate-500 text-sm">No transaction yet.</div>}
        {tx && (
          <div className="space-y-2">
            <div className="text-sm text-slate-500">Transaction Hash</div>
            <div className="font-mono bg-slate-50 p-3 rounded-xl break-all">{tx}</div>
          </div>
        )}
        {err && (
          <div className="space-y-2">
            <div className="text-sm text-slate-500">Error</div>
            <div className="font-mono bg-rose-50 text-rose-700 p-3 rounded-xl ring-1 ring-rose-200 break-all">{err}</div>
          </div>
        )}
        <p className="text-xs text-slate-500 mt-6">
          * Real testnet transfers can be enabled later via ethers.js + OG RPC.
        </p>
      </Card>
    </div>
  );
}
