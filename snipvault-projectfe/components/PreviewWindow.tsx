import { useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toPng } from 'html-to-image';
import { SnippetConfig } from "@/types";

interface Props {
    config: SnippetConfig;
    setConfig: (config: SnippetConfig) => void;
}

export default function PreviewWindow({ config, setConfig }: Props) {
    const exportRef = useRef<HTMLDivElement>(null);
    const glowMap: Record<string, string> = {
        blue: 'shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] border-blue-500/40 from-blue-500/5',
        purple: 'shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] border-purple-500/40 from-purple-500/5',
        pink: 'shadow-[0_0_50px_-10px_rgba(236,72,153,0.3)] border-pink-500/40 from-pink-500/5',
        orange: 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.3)]  border-orange-500/40 from-orange-500/5',
        green: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]  border-emerald-500/40 from-emerald-500/5',
        red: 'shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)]    border-red-500/40 from-red-500/5',
    };

    const downloadImage = async () => {
        if (!exportRef.current) return;
        try {
            const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 3 });
            const link = document.createElement('a');
            link.download = 'snipgraph.png';
            link.href = dataUrl;
            link.click();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto items-center">

            {/* 1. AREA PREVIEW UTAMA */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#000000]">

                {/* Padding Container */}
                <div
                    ref={exportRef}
                    className="relative transition-all duration-300 ease-out bg-[#0B0E14]" // Background utama tetap gelap elegan
                    style={{ padding: `${config.padding}px` }}
                >
                    {/* Ambient Light (Background Gradient di belakang window) */}
                    <div className={`absolute inset-0 bg-linear-to-br from-${config.theme}-500/20 via-transparent to-transparent opacity-40`} />

                    {/* WINDOW EDITOR
             - bg-gradient-to-b: Gradasi vertikal biar bagian atas agak terang (efek kaca)
             - backdrop-blur-3xl: Efek blur kuat
             - glowMap: Mengambil border & shadow dinamis
          */}
                    <div
                        className={`
                relative rounded-xl overflow-hidden min-w-75 
                bg-linear-to-b via-[#0d0d0d]/80 to-[#050505]/90 backdrop-blur-3xl
                border transition-all duration-500 
                ${glowMap[config.theme]}
            `}
                    >

                        {/* WINDOW HEADER */}
                        <div className="px-10 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between relative z-20">
                            {/* Controls Kiri */}
                            <div className="flex items-center w-1/3">
                                {config.windowType === 'mac' && (
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
                                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                                        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
                                    </div>
                                )}
                                {config.windowType === 'windows' && (
                                    <div className="flex gap-3 text-zinc-500 opacity-70">
                                        <div className="w-3 h-3 bg-zinc-500" />
                                        <div className="w-3 h-3 bg-zinc-500" />
                                    </div>
                                )}
                            </div>

                            {/* Title Tengah */}
                            <div className="w-1/3 text-center">
                                <span className="text-[10px] font-bold text-zinc-500/50 uppercase tracking-widest">Editor</span>
                            </div>

                            {/* FIX DROPDOWN LANGUAGE */}
                            <div className="w-1/3 flex justify-end">
                                <div className="relative group">
                                    <select
                                        value={config.language}
                                        onChange={(e) => setConfig({ ...config, language: e.target.value })}
                                        className="appearance-none bg-transparent text-[10px] font-bold text-zinc-400 uppercase tracking-widest cursor-pointer focus:outline-none hover:text-white transition-colors text-right pr-4 z-10 relative"
                                    >
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="javascript">JAVASCRIPT</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="typescript">TYPESCRIPT</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="python">PYTHON</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="html">HTML</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="css">CSS</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="sql">SQL</option>
                                        <option className="bg-[#1e1e1e] text-zinc-300" value="java">JAVA</option>
                                    </select>
                                    {/* Custom Arrow Icon */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-white transition-colors">
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 10l5 5 5-5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AREA EDITOR */}
                        <div className="relative group min-h-50">

                            {/* Visual Layer */}
                            <div className="relative z-0 pointer-events-none" aria-hidden="true">
                                <SyntaxHighlighter
                                    language={config.language}
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        padding: '24px',
                                        background: 'transparent', // Transparan biar gradient window kelihatan
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word'
                                    }}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                >
                                    {config.code || ' '}
                                </SyntaxHighlighter>
                            </div>

                            {/* Input Layer */}
                            <textarea
                                value={config.code}
                                onChange={(e) => setConfig({ ...config, code: e.target.value })}
                                className="absolute inset-0 z-10 w-full h-full bg-transparent text-transparent caret-white p-6 outline-none resize-none font-mono text-sm leading-normal"
                                spellCheck={false}
                                style={{
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    paddingLeft: '3.5em',
                                    paddingTop: '24px',
                                    paddingBottom: '24px',
                                    paddingRight: '24px'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* TOMBOL EXPORT */}
            <button
                onClick={downloadImage}
                className="neon-button px-6 py-2 flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-20"
            >
                <span className="text-xl">✨</span> Export PNG
            </button>
        </div>
    );
}