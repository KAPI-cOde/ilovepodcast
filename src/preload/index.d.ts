import { ElectronAPI } from '@electron-toolkit/preload'

interface PodcastAPI {
  saveWavFile: (arrayBuffer: ArrayBuffer) => Promise<string | null>
}

declare global {
  interface Window {
    electron: ElectronAPI
    podcast: PodcastAPI
  }
}
