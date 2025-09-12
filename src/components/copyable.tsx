import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface CopyableProps {
  value: string
  className?: string
  placeholder?: string
}

export function Copyable({ value, className, placeholder }: CopyableProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Input value={value} readOnly placeholder={placeholder} className="font-mono text-sm" />
      <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0 bg-transparent">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
