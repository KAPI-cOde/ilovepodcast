import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { mkdir, writeFile } from 'fs/promises'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { detectFfBins, type FfStatus } from './ffmpeg'

let ffStatus: FfStatus | null = null

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    backgroundColor: '#1a1a1a',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// ── IPC ハンドラー ──────────────────────────────

ipcMain.handle(
  'save-wav-file',
  async (_event, arrayBuffer: ArrayBuffer): Promise<string> => {
    const recordingsDir = join(app.getPath('userData'), 'recordings')
    await mkdir(recordingsDir, { recursive: true })

    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const fileName = `rec_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.wav`

    const filePath = join(recordingsDir, fileName)
    await writeFile(filePath, Buffer.from(arrayBuffer))
    return filePath
  }
)

ipcMain.handle('get-ff-status', async (): Promise<FfStatus> => {
  if (!ffStatus) {
    ffStatus = await detectFfBins()
  }
  return ffStatus
})

// ── アプリケーション起動 ───────────────────────────

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.ilovepodcast')

  // ffmpeg パス検出（起動時に1回だけ）
  ffStatus = await detectFfBins()

  app.on('browser-window-created', (_event, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
