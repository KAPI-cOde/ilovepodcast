// ⚠️ このファイルは設計資料。実際は pcm-capture-node.ts 内で
// Blob方式により動的に AudioWorklet スレッドへ登録される。

class PcmCaptureProcessor extends AudioWorkletProcessor {
  private active = true

  constructor() {
    super()
    this.port.onmessage = (e: MessageEvent) => {
      if (e.data === 'stop') {
        this.active = false
      }
    }
  }

  process(inputs: Float32Array[][]): boolean {
    if (!this.active) return false

    const input = inputs[0]
    if (input && input[0] && input[0].length > 0) {
      const samples = new Float32Array(input[0])
      this.port.postMessage(samples, [samples.buffer])
    }

    return true
  }
}

registerProcessor('pcm-capture-processor', PcmCaptureProcessor)
