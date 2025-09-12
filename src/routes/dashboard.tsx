import { useEffect, useState } from "react";
import { api, type Health } from "../lib/api";

export function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.health().then(setHealth).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: "40px auto", padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Backend health</p>
      <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8, overflowX: "auto" }}>
        {loading ? "Loading…" : JSON.stringify(health, null, 2)}
      </pre>
    </div>
  );
}
export default Dashboard;
