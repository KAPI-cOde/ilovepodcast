import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

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
  async (_event, arrayBuffer: ArrayBuffer): Promise<string | null> => {
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return null

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: '録音を保存',
      defaultPath: `recording-${Date.now()}.wav`,
      filters: [{ name: 'WAV Audio', extensions: ['wav'] }]
    })

    if (canceled || !filePath) return null

    await writeFile(filePath, Buffer.from(arrayBuffer))
    return filePath
  }
)

// ── アプリケーション起動 ───────────────────────────

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.ilovepodcast')
  app.on('browser-window-created', (_, window) => {
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
