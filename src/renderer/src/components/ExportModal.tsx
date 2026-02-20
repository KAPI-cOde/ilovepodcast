import { useState } from 'react'

type ExportState = 'config' | 'progress' | 'complete'

interface ExportModalProps {
  onClose: () => void
}

export default function ExportModal({ onClose }: ExportModalProps) {
  const [exportState] = useState<ExportState>('config')

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-[480px] bg-[#2a2a2a] rounded-xl shadow-2xl border border-white/5 overflow-hidden flex flex-col pointer-events-auto">
          {/* ===== Config State ===== */}
          {exportState === 'config' && (
            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2 className="text-white text-lg font-semibold tracking-tight">Export</h2>
                <button
                  className="text-slate-400 hover:text-white transition-colors flex items-center justify-center rounded-full w-8 h-8 hover:bg-white/10"
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Format */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                    Format
                  </label>
                  <div className="bg-[#1f1f1f] p-1 rounded-lg flex h-10 shadow-inner">
                    <button className="flex-1 bg-[#25dabf] text-slate-900 rounded font-medium text-sm transition-all shadow-sm">
                      WAV
                    </button>
                    <button className="flex-1 text-slate-400 hover:text-white rounded font-medium text-sm transition-all">
                      MP3
                    </button>
                  </div>
                </div>
                {/* Output */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                    Output To
                  </label>
                  <div className="flex w-full items-center rounded-lg bg-[#1f1f1f] border border-transparent shadow-inner h-12">
                    <div className="pl-3 text-slate-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">folder_open</span>
                    </div>
                    <input
                      className="w-full bg-transparent border-none text-white text-sm placeholder:text-slate-500 focus:ring-0 truncate px-3"
                      readOnly
                      value="~/Desktop/Episode 12 — Draft.wav"
                    />
                    <button className="mr-1 px-3 py-1.5 rounded text-xs font-medium text-[#25dabf] hover:bg-[#25dabf]/10 transition-colors whitespace-nowrap">
                      Change...
                    </button>
                  </div>
                </div>
                {/* Export button */}
                <button className="w-full h-11 bg-[#25dabf] hover:bg-[#25dabf]/90 text-[#1f1f1f] text-sm font-bold rounded-lg shadow-lg shadow-[#25dabf]/20 transition-all flex items-center justify-center gap-2">
                  <span>Export Audio</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </>
          )}

          {/* ===== Progress State ===== */}
          {exportState === 'progress' && (
            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2 className="text-white text-lg font-semibold tracking-tight">Exporting...</h2>
                <button
                  className="text-slate-400 hover:text-white transition-colors flex items-center justify-center rounded-full w-8 h-8 hover:bg-white/10"
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-white font-medium text-sm">Rendering Audio</span>
                    <span className="text-[#25dabf] font-bold text-sm">65%</span>
                  </div>
                  <div className="h-2 w-full bg-[#1f1f1f] rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-[#25dabf] w-[65%] rounded-full shadow-[0_0_10px_rgba(37,218,191,0.5)]" />
                  </div>
                  <div className="flex justify-center">
                    <span className="text-slate-500 text-xs font-medium">~12s remaining</span>
                  </div>
                </div>
                <button className="w-full h-11 border border-slate-600 hover:bg-white/5 text-slate-300 text-sm font-medium rounded-lg transition-all">
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ===== Complete State ===== */}
          {exportState === 'complete' && (
            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2 className="text-white text-lg font-semibold tracking-tight">Export</h2>
                <button
                  className="text-slate-400 hover:text-white transition-colors flex items-center justify-center rounded-full w-8 h-8 hover:bg-white/10"
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
              <div className="p-6 space-y-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 flex items-center justify-center mb-1">
                  <span className="material-symbols-outlined text-[#4ade80] text-4xl">check_circle</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[#4ade80] text-xl font-bold">Export complete</h3>
                  <p className="text-slate-400 text-sm">Your file has been successfully saved.</p>
                </div>
                <div className="w-full space-y-3 pt-2">
                  <button className="flex items-center justify-center gap-1.5 text-[#25dabf] text-sm font-medium hover:text-[#25dabf]/80 transition-colors group w-full">
                    <span className="material-symbols-outlined text-lg">folder</span>
                    <span className="group-hover:underline">Reveal in Finder</span>
                  </button>
                  <button
                    className="w-full h-11 bg-[#1f1f1f] hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-all border border-white/5"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
