import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const podcastAPI = {
  saveWavFile: (arrayBuffer: ArrayBuffer): Promise<string | null> =>
    ipcRenderer.invoke('save-wav-file', arrayBuffer)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('podcast', podcastAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  // @ts-ignore
  window.podcast = podcastAPI
}
