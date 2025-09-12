const API = import.meta.env.VITE_API_BASE as string;

export type Health = { ok: boolean; version: string; chainId: number };
export type InitiateResp = { txHash: string; status: "pending" | "confirmed" | "failed" };

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  health: () => fetch(`${API}/health`).then(j<Health>),
  payInitiate: (to: string, amount: string, memo?: string) =>
    fetch(`${API}/pay/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, amount, memo }),
    }).then(j<InitiateResp>),
};
export default api;
