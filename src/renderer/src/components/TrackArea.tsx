import VoiceTrack from './VoiceTrack'
import BgmTrack from './BgmTrack'

export default function TrackArea() {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 relative">
      {/* Playhead */}
      <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-primary z-30 pointer-events-none">
        <div className="absolute -top-3 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
      </div>

      {/* Selection overlay */}
      <div className="absolute top-0 bottom-0 left-[20%] w-[30%] bg-teal-500/10 border-l border-r border-teal-500/30 z-10 pointer-events-none backdrop-blur-[1px]">
        <div className="absolute top-2 left-2 text-[10px] font-mono text-teal-400/80 bg-black/40 px-1 rounded">
          Selection: 00:15 - 00:45
        </div>
      </div>

      <VoiceTrack />
      <BgmTrack />
    </div>
  )
}
