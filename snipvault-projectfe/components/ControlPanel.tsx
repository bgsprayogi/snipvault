import { ThemeColor, PaddingSize, WindowType } from "@/types";

interface Props {
    config: any;
    setConfig: (newConfig: any) => void;
}

export default function ControlPanel({ config, setConfig }: Props) {

    const themes = [
        { name: 'blue', color: '#3b82f6' },
        { name: 'purple', color: '#a855f7' },
        { name: 'pink', color: '#ec4899' },
        { name: 'green', color: '#10b981' },
        { name: 'orange', color: '#f97316' },
        { name: 'red', color: '#ef4444' },
    ];

    // Mapping nilai padding untuk tombol Preset
    const paddingValues: Record<PaddingSize, number> = {
        tight: 32,
        normal: 64,
        relaxed: 128
    };

    // Hitung persentase untuk Slider Fill (Min 16, Max 128)
    const sliderPercentage = ((config.padding - 16) / (128 - 16)) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl mx-auto mb-8">

            {/* 1. THEME COLOR */}
            <div className="md:col-span-4 figma-panel p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🎨</span>
                    <label className="text-sm font-semibold text-zinc-300">Theme Color</label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {themes.map((t) => (
                        <button
                            key={t.name}
                            onClick={() => setConfig({ ...config, theme: t.name })}
                            className={`h-12 w-full rounded-xl transition-all duration-200 relative overflow-hidden group ${config.theme === t.name
                                    ? 'ring-2 ring-white scale-[1.02]'
                                    : 'hover:opacity-80'
                                }`}
                            style={{ backgroundColor: t.color }}
                        >
                            {config.theme === t.name && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. BACKGROUND PADDING */}
            <div className="md:col-span-4 figma-panel p-6 flex flex-col gap-5 justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg">📐</span>
                    <label className="text-sm font-semibold text-zinc-300">Background Padding</label>
                </div>

                {/* Preset Buttons */}
                <div className="flex bg-[#0f1115] p-1 rounded-xl w-full border border-white/5">
                    {(Object.keys(paddingValues) as PaddingSize[]).map((p) => {
                        const isActive = config.padding === paddingValues[p];
                        return (
                            <button
                                key={p}
                                onClick={() => setConfig({ ...config, padding: paddingValues[p] })}
                                className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all ${isActive
                                        ? 'bg-linear-to-r from-[#0ea5e9] to-[#22d3ee] text-white shadow-lg'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>

                {/* SLIDER DENGAN DYNAMIC FILL COLOR */}
                <div className="flex items-center gap-3 relative">
                    <input
                        type="range"
                        min="16"
                        max="128"
                        step="8"
                        value={config.padding}
                        onChange={(e) => setConfig({ ...config, padding: Number(e.target.value) })}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                            // INI RAHASIANYA: Linear Gradient dinamis berdasarkan value
                            background: `linear-gradient(to right, #0ea5e9 0%, #22d3ee ${sliderPercentage}%, #334155 ${sliderPercentage}%, #334155 100%)`
                        }}
                    />
                    <span className="text-xs font-mono text-zinc-500 w-8 text-right">{config.padding}px</span>
                </div>
            </div>

            {/* 3. WINDOW CONTROLS */}
            <div className="md:col-span-4 figma-panel p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    <span className="text-lg">💻</span>
                    <label className="text-sm font-semibold text-zinc-300">Window Controls</label>
                </div>

                <div className="flex bg-[#0f1115] p-1 rounded-xl w-full border border-white/5">
                    {(['mac', 'windows', 'none'] as WindowType[]).map((w) => (
                        <button
                            key={w}
                            onClick={() => setConfig({ ...config, windowType: w })}
                            className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all ${config.windowType === w
                                    ? 'bg-linear-to-r from-[#0ea5e9] to-[#22d3ee] text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {w === 'mac' ? 'macOS' : w}
                        </button>
                    ))}
                </div>

                {/* Hiasan Dot Window */}
                <div className="bg-[#0f1115] h-10 rounded-xl flex items-center px-4 w-full border border-white/5">
                    {config.windowType === 'mac' && (
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                    )}
                    {config.windowType === 'windows' && (
                        <div className="flex gap-2 ml-auto">
                            <div className="w-3 h-3 border border-zinc-600 rounded-[1px]" />
                            <div className="w-3 h-3 border border-zinc-600 rounded-[1px]" />
                            <div className="w-3 h-3 bg-zinc-600 rounded-[1px]" />
                        </div>
                    )}
                    {config.windowType === 'none' && (
                        <span className="text-xs text-zinc-600 italic">No controls</span>
                    )}
                </div>
            </div>
        </div>
    );
}