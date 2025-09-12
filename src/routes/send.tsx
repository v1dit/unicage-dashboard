import { useState } from "react"
import { api } from "../lib/api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { useToast } from "../components/ui/use-toast"

export function Send() {
  const { toast } = useToast()
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    if (!to || !amount) {
      toast({ title: "Missing fields", description: "Enter recipient and amount." })
      return
    }
    setLoading(true)
    try {
      const r = await api.payInitiate(to.trim(), amount.trim(), memo.trim() || undefined)
      toast({
        title: "Payment initiated",
        description: `Status: ${r.status}\nTx: ${r.txHash}`,
      })
      setMemo("")
    } catch (e: any) {
      toast({ title: "Send failed", description: String(e.message) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-4">
      <div>
        <label className="block text-sm mb-1">Recipient Address</label>
        <Input placeholder="0x…" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Amount</label>
        <Input placeholder="1.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Memo (optional)</label>
        <Textarea placeholder="Note…" value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
      <Button onClick={handleSend} disabled={loading}>
        {loading ? "Sending…" : "Send Payment"}
      </Button>
    </div>
  )
}
export default Send
