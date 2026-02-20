import { useRef, useState, useCallback } from 'react'
import { createRecorder, type RecorderState } from '../lib/recorder'

export default function ControlBar() {
  const [recorderState, setRecorderState] = useState<RecorderState>('idle')

  const recorderRef = useRef(
    createRecorder({
      onStateChange: (s) => setRecorderState(s),
      onError: (err) => {
        console.error('[Recorder]', err.message)
        // TODO: #2.3 でトーストUIに置き換え
        alert(err.message)
      },
      onSaved: (filePath) => {
        console.log('[Recorder] Saved:', filePath)
      }
    })
  )

  const handleRecordClick = useCallback(async () => {
    const recorder = recorderRef.current
    if (recorder.state === 'idle') {
      await recorder.start()
    } else if (recorder.state === 'recording') {
      await recorder.stop()
    }
  }, [])

  return (
    <footer className="h-20 bg-[#2a2a2a] border-t border-black/20 px-6 flex items-center justify-between shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-40">
      {/* Left — Record + Punch In */}
      <div className="flex items-center gap-4">
        <button
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-[#2a2a2a] ring-2 transition-all active:scale-95 group ${
            recorderState === 'recording'
              ? 'bg-red-600 ring-red-400/40 shadow-red-900/60 animate-pulse'
              : 'bg-primary hover:bg-red-600 ring-primary/20 shadow-red-900/40'
          }`}
          title={recorderState === 'recording' ? 'Stop Recording' : 'Record'}
          onClick={handleRecordClick}
          disabled={recorderState === 'saving'}
        >
          <div
            className={`w-4 h-4 bg-white transition-all duration-300 ${
              recorderState === 'recording' ? 'rounded-sm' : 'rounded-full group-hover:rounded-sm'
            }`}
          />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
          title="Punch In"
        >
          <span className="material-symbols-outlined text-[18px]">push_pin</span>
        </button>
      </div>

      {/* Center — Transport */}
      <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
        <button className="text-slate-400 hover:text-white transition-colors" title="Skip Back">
          <span className="material-symbols-outlined text-[24px]">skip_previous</span>
        </button>
        <button
          className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white shadow-lg transition-all active:scale-95 border border-white/5"
          title="Play/Pause"
        >
          <span className="material-symbols-outlined text-[28px] ml-1">play_arrow</span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors" title="Stop">
          <span className="material-symbols-outlined text-[24px]">stop</span>
        </button>
      </div>

      {/* Right — Edit tools + Zoom */}
      <div className="flex items-center gap-4">
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/5 mr-4">
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Trim">
            <span className="material-symbols-outlined text-[20px]">content_paste_off</span>
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Cut (X)">
            <span className="material-symbols-outlined text-[20px]">content_cut</span>
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Denoise">
            <span className="material-symbols-outlined text-[20px]">blur_on</span>
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Grid">
            <span className="material-symbols-outlined text-[20px]">grid_on</span>
          </button>
        </div>
        <div className="flex items-center gap-2 border-l border-white/5 pl-4">
          <span className="material-symbols-outlined text-slate-500 text-[18px]">zoom_out</span>
          <input
            className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            max={100}
            min={1}
            type="range"
            defaultValue={40}
          />
          <span className="material-symbols-outlined text-slate-500 text-[18px]">zoom_in</span>
        </div>
      </div>
    </footer>
  )
}
