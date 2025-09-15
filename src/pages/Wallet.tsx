import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Wallet() {
  const [addr, setAddr] = useState<string>("");
  const [bal, setBal] = useState<string>("0.00");

  useEffect(() => {
    api.balance()
      .then((r) => {
        if (r.address) setAddr(r.address);
        setBal(Number(r.balance).toFixed(2));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="card p-8">
        <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
        {addr && (
          <p className="mb-1 text-sm text-gray-500 break-all">
            <span className="font-medium text-gray-700">Address:</span> {addr}
          </p>
        )}
        <p className="text-3xl font-bold">{bal} OG</p>
        <p className="text-gray-500">≈ ${bal} USD</p>

        <button
          className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white"
          onClick={() => window.alert("MetaMask connect stub — optional")}
        >
          Connect MetaMask Wallet
        </button>
      </div>
    </div>
  );
}
