import { Shield, Users, DollarSign, Flag, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { KpiCard } from "../components/kpi-card"
import { StatusBadge } from "../components/status-badge"

type Badge = "confirmed" | "pending" | "failed" | "high" | "medium" | "low";
const toBadge = (s: string): Badge =>
  s === "flagged" ? "medium" :
  (["confirmed","pending","failed","high","medium","low"].includes(s) ? (s as Badge) : "low");

const suspiciousTransactions = [
  {
    id: "TX001",
    amount: 5000.0,
    from: "0x1234...5678",
    to: "0x9876...4321",
    date: "2024-01-15 14:30",
    riskLevel: "high" as const,
    reason: "Large amount",
    status: "flagged" as const,
  },
  {
    id: "TX002",
    amount: 1250.5,
    from: "0x2468...1357",
    to: "0x8642...9753",
    date: "2024-01-15 12:15",
    riskLevel: "medium" as const,
    reason: "Unusual pattern",
    status: "pending" as const,
  },
  {
    id: "TX003",
    amount: 750.25,
    from: "0x3691...2580",
    to: "0x7410...8520",
    date: "2024-01-15 09:45",
    riskLevel: "low" as const,
    reason: "New address",
    status: "confirmed" as const,
  },
]

export function Admin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor system performance and compliance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Test Users" value="1,247" sublabel="Active users" icon={Users} />
        <KpiCard title="Daily Volume" value="$45,230" sublabel="Last 24 hours" icon={DollarSign} />
        <KpiCard title="Flagged Transactions" value="23" sublabel="Requires review" icon={Flag} />
        <KpiCard title="System Status" value="Operational" sublabel="All systems normal" icon={Shield} />
      </div>

      {/* Compliance Monitoring */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Compliance Monitoring Active</h3>
              <p className="text-sm text-green-700 mt-1">
                All transactions are being monitored for compliance with regulatory requirements. Automated risk
                assessment is running continuously.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suspicious Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Suspicious Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tx ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspiciousTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                    <TableCell className="font-medium">${tx.amount.toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.from}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.to}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <StatusBadge status={toBadge(tx.riskLevel)} />
                    </TableCell>
                    <TableCell>{tx.reason}</TableCell>
                    <TableCell>
                      <StatusBadge status={toBadge(tx.status)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
