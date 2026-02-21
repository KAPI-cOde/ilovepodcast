import { execFile } from 'node:child_process'
import { access, constants } from 'node:fs/promises'

// ---------- 型 ----------
export interface FfBinPaths {
  ffmpeg: string | null
  ffprobe: string | null
}

export interface FfStatus {
  paths: FfBinPaths
  ok: boolean
  missing: string[]
}

// ---------- 既知パス定義 ----------
const KNOWN_DIRS = [
  '/opt/homebrew/bin',
  '/usr/local/bin',
]

// ---------- 内部ユーティリティ ----------

function which(bin: string): Promise<string | null> {
  return new Promise((resolve) => {
    execFile('which', [bin], (error, stdout) => {
      if (error || !stdout.trim()) {
        resolve(null)
        return
      }
      resolve(stdout.trim())
    })
  })
}

async function fallback(bin: string): Promise<string | null> {
  for (const dir of KNOWN_DIRS) {
    const p = `${dir}/${bin}`
    try {
      await access(p, constants.X_OK)
      return p
    } catch {
      // 次へ
    }
  }
  return null
}

async function detect(bin: string): Promise<string | null> {
  const fromWhich = await which(bin)
  if (fromWhich) return fromWhich
  return fallback(bin)
}

// ---------- パブリックAPI ----------

export async function detectFfBins(): Promise<FfStatus> {
  const [ffmpeg, ffprobe] = await Promise.all([
    detect('ffmpeg'),
    detect('ffprobe'),
  ])

  const paths: FfBinPaths = { ffmpeg, ffprobe }
  const missing: string[] = []

  if (!ffmpeg) missing.push('ffmpeg')
  if (!ffprobe) missing.push('ffprobe')

  if (missing.length > 0) {
    console.warn(
      `[ffmpeg] 未検出: ${missing.join(', ')}\n` +
      `  brew install ffmpeg でインストールしてください`
    )
  } else {
    console.log(`[ffmpeg] 検出成功: ffmpeg=${ffmpeg}, ffprobe=${ffprobe}`)
  }

  return { paths, ok: missing.length === 0, missing }
}
