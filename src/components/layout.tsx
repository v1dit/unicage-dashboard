import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, padding: 16, borderRight: "1px solid #eee" }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Unicage Payments</div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/send">Send</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        {children ?? <div>children missing</div>}
      </main>
    </div>
  );
}

export default Layout;
