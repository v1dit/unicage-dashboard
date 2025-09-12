"use client";

import { useEffect, useState } from "react";
import { api, type Health } from "../lib/api";
import { Button } from "../components/ui/button";

export function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    api.health().then(setHealth).catch(() => setHealth(null));
  }, []);

  async function ping() {
    setPinging(true);
    try {
      const h = await api.health();
      setHealth(h);
    } finally {
      setPinging(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      {/* Top summary stays static until you add endpoints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Total Balance</div>
          <div className="h-6 mt-2">—</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Payments Today</div>
          <div className="h-6 mt-2">0</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Pending</div>
          <div className="h-6 mt-2">0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-2">Backend health</div>
          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
            {health ? JSON.stringify(health, null, 2) : "…"}
          </pre>
        </div>

        <div className="rounded-xl border p-4">
          <div className="font-medium mb-2">Quick checks</div>
          <Button onClick={ping} disabled={pinging}>
            {pinging ? "Pinging…" : "Ping API /health"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
