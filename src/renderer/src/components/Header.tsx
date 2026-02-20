interface HeaderProps {
  onOpenPresets: () => void
  onOpenExport: () => void
}

export default function Header({ onOpenPresets, onOpenExport }: HeaderProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-white/5 bg-[#1a1a1a]/50 backdrop-blur-sm z-20 shrink-0">
      {/* Traffic light spacer */}
      <div className="w-[60px] shrink-0" />

      <div className="flex items-center gap-2 group cursor-text">
        <span className="material-symbols-outlined text-slate-400 text-sm">mic</span>
        <h1 className="text-sm font-medium text-slate-200 tracking-wide group-hover:text-white transition-colors">
          Episode 12 — Draft
        </h1>
        <span className="text-xs text-slate-500 font-normal px-1.5 py-0.5 rounded border border-slate-700 ml-2">
          Edited
        </span>
      </div>

      <div className="flex items-center gap-3 w-auto justify-end">
        <button
          className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Presets"
          onClick={onOpenPresets}
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
          <span className="text-xs font-medium">Presets</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1 bg-primary hover:bg-red-600 text-white text-xs font-semibold rounded shadow-lg shadow-red-900/20 transition-all"
          title="Export"
          onClick={onOpenExport}
        >
          <span>Export</span>
          <span className="material-symbols-outlined text-[16px]">ios_share</span>
        </button>
      </div>
    </header>
  )
}
