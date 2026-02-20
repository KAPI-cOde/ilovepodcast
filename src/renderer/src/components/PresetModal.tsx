interface PresetModalProps {
  onClose: () => void
}

export default function PresetModal({ onClose }: PresetModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-[480px] bg-[#2a2a2a] rounded-lg shadow-2xl border border-white/10 overflow-hidden flex flex-col pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <h1 className="text-white text-[18px] font-semibold tracking-tight">
              Intro & Outro Presets
            </h1>
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors rounded-full p-1 hover:bg-white/5"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px] leading-none">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 flex flex-col gap-6">
            {/* Intro Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#25dabf]">
                <span className="material-symbols-outlined text-[20px]">music_note</span>
                <h2 className="text-sm font-semibold uppercase tracking-wide">Intro</h2>
              </div>
              <div className="bg-[#1e1e1e] rounded-lg p-3 border border-white/5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <button className="shrink-0 size-8 rounded-full bg-[#25dabf]/10 text-[#25dabf] flex items-center justify-center hover:bg-[#25dabf] hover:text-[#12201e] transition-all">
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                  </button>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-slate-200 text-sm font-medium truncate">
                      intro_theme_v2.mp3
                    </span>
                    <span className="text-slate-400 text-xs">00:12 • 2.4 MB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-white/5"
                    title="Remove"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-start">
                <button className="text-xs font-medium text-slate-300 border border-white/20 rounded px-3 py-1.5 hover:bg-white/5 transition-colors">
                  Choose File...
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/5" />

            {/* Outro Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#a78bfa]">
                <span className="material-symbols-outlined text-[20px]">music_note</span>
                <h2 className="text-sm font-semibold uppercase tracking-wide">Outro</h2>
              </div>
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-white/5 border-dashed flex flex-col items-center justify-center gap-2 text-center min-h-[80px]">
                <span className="text-slate-500 text-sm italic">Not set</span>
              </div>
              <div className="flex justify-start">
                <button className="text-xs font-medium text-slate-300 border border-white/20 rounded px-3 py-1.5 hover:bg-white/5 transition-colors">
                  Choose File...
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-2">
            <button className="w-full bg-[#25dabf] hover:bg-[#1fc4ab] text-[#12201e] font-bold text-sm py-3 rounded-lg transition-colors shadow-lg shadow-[#25dabf]/20 flex items-center justify-center gap-2">
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
