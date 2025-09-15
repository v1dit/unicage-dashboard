const BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/,"") || "";

export type Health = { ok: boolean; version: string; chainId: number|string };
export type PayInitReq = { to: string; amount: string };
export type PayInitRes = Record<string, unknown>;

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    credentials: "omit",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  health: () => http<Health>("/health"),
  initiate: (body: PayInitReq) =>
    http<PayInitRes>("/pay/initiate", { method: "POST", body: JSON.stringify(body) }),
};
