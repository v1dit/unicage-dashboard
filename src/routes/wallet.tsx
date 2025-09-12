import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Copy } from "lucide-react"

export function Wallet() {
  // Static placeholders until you add real endpoints
  const [addr] = useState("0xDEMOcafe...beef")
  const [bal] = useState("0 OGTEST")

  return (
    <div className="p-6">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">Address:</span>
            <code className="text-xs md:text-sm">{addr}</code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigator.clipboard.writeText(addr)}
              title="Copy address"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <span className="font-medium">Balance:</span> {bal}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default Wallet
