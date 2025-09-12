export interface HealthResponse {
  ok: boolean
  version: string
  chainId: number
}

export interface WalletDemoResponse {
  address: string
  network: string
}

export interface BalanceResponse {
  balance: number
  symbol: string
}

export interface PaymentInitiateRequest {
  to: string
  amount: number
}

export interface PaymentInitiateResponse {
  intentId: string
}

export interface PaymentStatusResponse {
  status: "pending" | "confirmed" | "failed"
  txHash?: string
}

export interface Transaction {
  type: "sent" | "received"
  amount: number
  symbol: string
  address: string
  timestamp: string
  status: "pending" | "confirmed" | "failed"
  hash?: string
  fee?: number
}

export interface AppState {
  wallet: WalletDemoResponse | null
  balance: BalanceResponse | null
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
  fetchWalletData: () => Promise<void>
  fetchTransactions: () => Promise<void>
  clearError: () => void
}
