export default function BgmTrack() {
  return (
    <div className="flex h-[100px] bg-[#222] rounded-lg border border-white/5 shadow-inner relative group shrink-0">
      {/* Sidebar */}
      <div className="w-48 bg-[#1e1e1e] border-r border-white/5 rounded-l-lg p-3 flex flex-col justify-between shrink-0 z-20">
        <div className="flex items-center gap-2 mb-2 text-purple-400">
          <span className="material-symbols-outlined text-[18px]">music_note</span>
          <span className="text-xs font-bold tracking-wider">BGM</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-slate-400 text-[9px] hover:text-white">
              M
            </button>
            <button className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-slate-400 text-[9px] hover:text-white">
              S
            </button>
          </div>
          <span className="text-[9px] text-slate-600 font-mono">-12dB</span>
        </div>
      </div>

      {/* Clip + Drop zone */}
      <div className="flex-1 relative bg-[#181818] rounded-r-lg flex items-center">
        <div className="absolute left-4 top-2 bottom-2 w-[35%] bg-purple-600/30 border border-purple-500/50 rounded-md flex items-center px-3 gap-2 overflow-hidden backdrop-blur-sm z-10 group/clip cursor-pointer hover:bg-purple-600/40 transition-colors">
          <span className="material-symbols-outlined text-purple-300 text-[16px]">audio_file</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-purple-100 font-medium truncate">
              intro_theme_v2.mp3
            </span>
            <span className="text-[8px] text-purple-300/70 truncate">00:00 - 02:15</span>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/0 group-hover/clip:bg-purple-400/50 cursor-ew-resize" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500/0 group-hover/clip:bg-purple-400/50 cursor-ew-resize" />
        </div>
        <div className="absolute right-4 top-2 bottom-2 left-[40%] border-2 border-dashed border-slate-700 rounded-md flex items-center justify-center gap-2 group/drop hover:border-slate-500 hover:bg-slate-800/30 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-slate-600 group-hover/drop:text-slate-400 text-[20px]">
            add_circle
          </span>
          <span className="text-xs text-slate-600 group-hover/drop:text-slate-400 font-medium">
            Drop BGM file here
          </span>
        </div>
      </div>
    </div>
  )
}
