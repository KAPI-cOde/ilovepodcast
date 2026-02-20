export default function VoiceTrack() {
  return (
    <div className="flex h-[200px] bg-[#222] rounded-lg border border-white/5 shadow-inner relative group shrink-0">
      {/* Sidebar */}
      <div className="w-48 bg-[#1e1e1e] border-r border-white/5 rounded-l-lg p-3 flex flex-col justify-between shrink-0 z-20">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
            <span className="text-xs font-bold tracking-wider">VOICE</span>
          </div>
          <div className="flex gap-1 mt-2">
            <button className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 text-slate-400 text-[10px] font-bold hover:text-white border border-transparent hover:border-slate-600">
              M
            </button>
            <button className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 text-slate-400 text-[10px] font-bold hover:text-white border border-transparent hover:border-slate-600">
              S
            </button>
            <button className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white text-[10px] font-bold shadow-sm shadow-red-900/50">
              R
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Vol</span>
            <span>-2dB</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-teal-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Waveform area */}
      <div className="flex-1 relative overflow-hidden bg-[#181818] rounded-r-lg">
        <div className="absolute inset-0 flex items-center justify-center px-4 opacity-80">
          <div className="flex items-center gap-[2px] h-32 w-full justify-center opacity-70">
            {[8,12,6,16,24,10,28,32,20,14,8,20,24,12,32,40,28,16,8,4,12,20,28,14,10,24,32,16,8,4,12,20,28,14,10,24,32,16,8,4,12,20,28,14,10].map(
              (h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-teal-500 rounded-full${
                    h === 40 ? ' shadow-[0_0_10px_rgba(20,184,166,0.5)]' : ''
                  }`}
                  style={{ height: `${h * 4}px` }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
