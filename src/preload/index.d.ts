import { ElectronAPI } from '@electron-toolkit/preload'

interface PodcastAPI {
  getFfStatus: () => Promise<{ paths: { ffmpeg: string | null; ffprobe: string | null }; ok: boolean; missing: string[] }>

  saveWavFile: (arrayBuffer: ArrayBuffer) => Promise<string | null>
}

declare global {
  interface Window {
    electron: ElectronAPI
    podcast: PodcastAPI
  }
}
