import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Dashboard } from "./routes/dashboard";
import { Send } from "./routes/send";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header style={{ borderBottom: "1px solid #eee" }}>
          <nav style={{ maxWidth: 860, margin: "0 auto", padding: 12, display: "flex", gap: 12 }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/send">Send</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
