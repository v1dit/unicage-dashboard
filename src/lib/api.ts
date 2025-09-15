// src/lib/api.ts
const BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") ||
  "";

async function j<T>(p: Promise<Response>): Promise<T> {
  const r = await p;
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json() as Promise<T>;
}

export type BalanceResp = { address: string; balance: string };
export type InitiateResp = { txHash?: string; status?: string; error?: string };

export const api = {
  health: () => j<{ ok: boolean; version: string; chainId: number }>(
    fetch(`${BASE}/health`)
  ),
  balance: () => j<BalanceResp>(fetch(`${BASE}/wallet/balance`)),
  initiate: (to: string, amount: string) =>
    j<InitiateResp>(
      fetch(`${BASE}/pay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, amount }),
      })
    ),
};
// src/lib/api.ts
export type Health = { ok: boolean; version: string; chainId: number };

type WalletBalanceRes = {
  address?: string;          // some backends include this
  balance: string;           // "1250.75"
  symbol?: string;           // "OG"
};

type PayInitReq = { to: string; amount: string; memo?: string };
type PayInitRes = { txHash: string };

const BASE =
  import.meta.env.VITE_API_BASE?.trim() ||
  "https://unicage-deaios-payments-online-1.onrender.com";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json() as Promise<T>;
}

export const api = {
  health: () => http<Health>("/health"),
  balance: () => http<WalletBalanceRes>("/wallet/balance"),
  initiate: (body: PayInitReq) =>
    http<PayInitRes>("/pay/initiate", { method: "POST", body: JSON.stringify(body) }),
};
