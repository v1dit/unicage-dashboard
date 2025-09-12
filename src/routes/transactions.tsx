import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Input } from "../components/ui/input"
import { StatusBadge } from "../components/status-badge"

type Tx = {
  txHash: string
  type: "send" | "receive"
  amount: string
  currency: string
  status: "pending" | "confirmed" | "failed"
  timestamp: string
}

const DEMO: Tx[] = [
  { txHash: "0xaaa111", type: "send", amount: "1.00", currency: "OGTEST", status: "confirmed", timestamp: new Date().toISOString() },
  { txHash: "0xbbb222", type: "receive", amount: "0.50", currency: "OGTEST", status: "pending", timestamp: new Date(Date.now()-3e5).toISOString() },
  { txHash: "0xccc333", type: "send", amount: "2.25", currency: "OGTEST", status: "failed", timestamp: new Date(Date.now()-9e5).toISOString() },
  { txHash: "0xddd444", type: "send", amount: "0.10", currency: "OGTEST", status: "confirmed", timestamp: new Date(Date.now()-36e5).toISOString() },
  { txHash: "0xeee555", type: "receive", amount: "5.00", currency: "OGTEST", status: "confirmed", timestamp: new Date(Date.now()-72e5).toISOString() },
]

export function Transactions() {
  const [q, setQ] = useState<string>("")

  const rows = useMemo<Tx[]>(() => {
    const query = q.trim().toLowerCase()
    if (!query) return DEMO
    return DEMO.filter((tx: Tx) =>
      tx.txHash.toLowerCase().includes(query) ||
      tx.status.toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query)
    )
  }, [q])

  return (
    <div className="p-6">
      <Card>
        <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-3">
            <Input placeholder="Search by hash/status/type…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((tx: Tx) => (
                <TableRow key={tx.txHash}>
                  <TableCell className="font-mono text-xs">{tx.txHash}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount} {tx.currency}</TableCell>
                  <TableCell><StatusBadge status={tx.status} /></TableCell>
                  <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
export default Transactions
