import { useEffect, useState } from "react";

export default function Wallet() {
  const API = import.meta.env.VITE_API_BASE;
  const [data, setData] = useState({ address: "", balance: "0.00" });

  useEffect(() => {
    fetch(`${API}/wallet/balance`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ address: "", balance: "0.00" }));
  }, []);

  return (
    <div className="rounded-2xl bg-white border p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Wallet Information</h2>
      <div className="text-sm break-all">{data.address}</div>
      <div className="text-3xl font-bold">{data.balance} OG</div>
      <div className="text-gray-500">≈ ${data.balance} USD</div>
      <div className="rounded-lg bg-green-50 text-green-700 px-3 py-2 text-sm">
        ● Wallet Connected & Secure
      </div>
      <button className="w-full rounded-lg bg-green-600 text-white py-3 font-semibold hover:bg-green-700">
        Connect MetaMask Wallet
      </button>
    </div>
  );
}
