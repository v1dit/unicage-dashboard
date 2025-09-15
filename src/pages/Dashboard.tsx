import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [balance, setBalance] = useState<string>("0.00");

  useEffect(() => {
    api.balance()
      .then((r) => setBalance(Number(r.balance).toFixed(2)))
      .catch(() => setBalance("0.00"));
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Unicage Payments</h1>
      <p className="text-sm text-gray-500 mb-6">Powered by 0g.ai</p>

      <div className="card bg-green-700 text-white p-8">
        <p className="text-sm opacity-90">Total Balance</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{balance}</span>
          <span className="text-2xl font-semibold">OG</span>
        </div>
        <p className="mt-2 opacity-90">≈ ${balance} USD</p>

        <div className="mt-6 flex gap-4">
          <a className="px-6 py-3 bg-green-800 rounded-xl" href="/wallet">Wallet</a>
          <a className="px-6 py-3 bg-white text-green-800 rounded-xl" href="/send">Send</a>
        </div>
      </div>
    </div>
  );
}
