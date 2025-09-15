import { useEffect, useState } from "react";

export default function Dashboard() {
  const API = import.meta.env.VITE_API_BASE;
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    fetch(`${API}/wallet/balance`)
      .then(r => r.json())
      .then(d => setBalance(d.balance || "0.00"))
      .catch(() => setBalance("0.00"));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Unicage Payments</h1>
      <p className="text-gray-500">Powered by 0g.ai</p>

      <div className="rounded-2xl bg-green-600 text-white p-6 shadow-lg">
        <div className="text-sm opacity-90 mb-2">Total Balance</div>
        <div className="text-5xl font-bold tracking-tight">
          {balance} <span className="text-2xl">OG</span>
        </div>
        <div className="opacity-90 mt-2">≈ ${balance} USD</div>
        <div className="mt-1 text-sm opacity-90">↗ +5.2% vs last month</div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <a href="/wallet" className="rounded-2xl bg-green-700/70 px-4 py-3 text-center">Wallet</a>
          <a href="/send" className="rounded-2xl bg-white text-green-700 border border-white/50 px-4 py-3 text-center">Send</a>
        </div>
      </div>
    </div>
  );
}
