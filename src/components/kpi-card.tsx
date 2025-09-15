import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  sublabel?: string
  icon: LucideIcon
  className?: string
}

export function KpiCard({ title, value, sublabel, icon: Icon, className }: KpiCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {sublabel && <CardDescription className="text-xs text-muted-foreground mt-1">{sublabel}</CardDescription>}
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
