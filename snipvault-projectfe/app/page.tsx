"use client";
import { useState } from "react";
import ControlPanel from "@/components/ControlPanel";
import PreviewWindow from "@/components/PreviewWindow";
import { SnippetConfig } from "@/types";

export default function Home() {
  const [config, setConfig] = useState<SnippetConfig>({
    theme: 'blue',
    padding: 64,
    windowType: 'mac',
    language: 'javascript',
    code: `function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n  return 'Welcome to SnipGraph';\n}`
  });

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500/30 flex flex-col">

      {/* --- APP BAR BARU --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0E14]/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">

          {/* Logo Kiri */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-3.7 2.881-8.199 5.264-13.254 5.264a.75.75 0 01-.75-.75c0-5.055 2.383-9.555 6.084-12.436z" clipRule="evenodd" />
                <path d="M4.75 6a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75v-10.5a.75.75 0 00-.75-.75H4.75z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              SnipGraph
            </span>
          </div>

          {/* Menu Kanan (Opsional) */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              How it works
            </button>
            <a
              href="https://github.com/bgsprayogi"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 w-full px-4 flex flex-col items-center gap-10 py-10">
        <ControlPanel config={config} setConfig={setConfig} />
        <PreviewWindow config={config} setConfig={setConfig} />
      </main>

      <footer className="py-8 text-center text-zinc-600 text-xs">
        &copy; 2026 SnipGraph. Built with Next.js & Tailwind.
      </footer>
    </div>
  );
}