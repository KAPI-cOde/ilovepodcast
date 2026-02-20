export interface PcmCaptureResult {
  /** キャプチャした生PCMデータ（Float32, -1.0〜1.0） */
  chunks: Float32Array[]
  /** 実際のサンプルレート（AudioContext から取得） */
  sampleRate: number
  /** チャンネル数（常に1） */
  channels: 1
}

/**
 * AudioWorklet を使ってマイクストリームからPCMデータをキャプチャする。
 */
export async function createPcmCapture(
  stream: MediaStream
): Promise<{
  stop: () => PcmCaptureResult
}> {
  const ctx = new AudioContext({ sampleRate: 44100 })

  const processorCode = `
class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.active = true;
    this.port.onmessage = (e) => {
      if (e.data === 'stop') this.active = false;
    };
  }
  process(inputs) {
    if (!this.active) return false;
    const input = inputs[0];
    if (input && input[0] && input[0].length > 0) {
      const samples = new Float32Array(input[0]);
      this.port.postMessage(samples, [samples.buffer]);
    }
    return true;
  }
}
registerProcessor('pcm-capture-processor', PcmCaptureProcessor);
`
  const blob = new Blob([processorCode], { type: 'application/javascript' })
  const url = URL.createObjectURL(blob)
  await ctx.audioWorklet.addModule(url)
  URL.revokeObjectURL(url)

  const source = ctx.createMediaStreamSource(stream)
  const workletNode = new AudioWorkletNode(ctx, 'pcm-capture-processor')
  source.connect(workletNode)

  const chunks: Float32Array[] = []

  workletNode.port.onmessage = (e: MessageEvent<Float32Array>) => {
    chunks.push(e.data)
  }

  return {
    stop(): PcmCaptureResult {
      workletNode.port.postMessage('stop')
      source.disconnect()
      workletNode.disconnect()
      void ctx.close()

      return {
        chunks,
        sampleRate: ctx.sampleRate,
        channels: 1
      }
    }
  }
}
