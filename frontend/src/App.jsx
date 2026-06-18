import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sessions from "./pages/Sessions";
import Heatmap from "./pages/Heatmap";
export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-white text-text">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-30 -top-30 -z-10 h-80 w-[320px] rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-35 top-45 -z-10 h-90 w-90 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-95 w-95 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <Navbar />

      <main className="relative z-10 py-6 md:py-10">
        <div className="border border-[#fcfcfc] bg-white/95 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur md:p-8">
          <Routes>
            <Route path="/" element={<Sessions />} />
            <Route path="/heatmap" element={<Heatmap />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
