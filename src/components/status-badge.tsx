import { Badge } from "./ui/badge"
import { cn } from "../lib/utils"

interface StatusBadgeProps {
  status: "confirmed" | "pending" | "failed" | "high" | "medium" | "low"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    failed: "bg-red-100 text-red-800 hover:bg-red-100",
    high: "bg-red-100 text-red-800 hover:bg-red-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    low: "bg-green-100 text-green-800 hover:bg-green-100",
  }

  return (
    <Badge variant="secondary" className={cn(variants[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
