import type { PcmCaptureResult } from './pcm-capture-node'

/**
 * Float32 PCM チャンクを連結し、WAV (RIFF) 形式の Blob を返す。
 */
export function encodeWav(pcm: PcmCaptureResult): Blob {
  const { chunks, sampleRate, channels } = pcm

  const totalSamples = chunks.reduce((sum, c) => sum + c.length, 0)
  const int16 = new Int16Array(totalSamples)
  let offset = 0
  for (const chunk of chunks) {
    for (let i = 0; i < chunk.length; i++) {
      const s = Math.max(-1, Math.min(1, chunk[i]))
      int16[offset++] = s < 0 ? s * 0x8000 : s * 0x7fff
    }
  }

  const bitsPerSample = 16
  const byteRate = sampleRate * channels * (bitsPerSample / 8)
  const blockAlign = channels * (bitsPerSample / 8)
  const dataSize = int16.length * (bitsPerSample / 8)
  const headerSize = 44
  const fileSize = headerSize + dataSize

  const buffer = new ArrayBuffer(fileSize)
  const view = new DataView(buffer)

  writeString(view, 0, 'RIFF')
  view.setUint32(4, fileSize - 8, true)
  writeString(view, 8, 'WAVE')

  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, channels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)

  writeString(view, 36, 'data')
  view.setUint32(40, dataSize, true)

  const int16View = new Int16Array(buffer, headerSize)
  int16View.set(int16)

  return new Blob([buffer], { type: 'audio/wav' })
}

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i))
  }
}
