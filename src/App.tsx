import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Send from "./pages/Send";

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Routes>
          {/* Dashboard page (main landing) */}
          <Route path="/" element={<Dashboard />} />

          {/* Wallet info page */}
          <Route path="/wallet" element={<Wallet />} />

          {/* Send tokens page */}
          <Route path="/send" element={<Send />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
