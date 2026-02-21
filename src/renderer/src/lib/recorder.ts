import { getMicStream, releaseMicStream, MicError } from './mic'
import { createPcmCapture, type PcmCaptureResult } from './pcm-capture-node'
import { encodeWav } from './wav-encoder'

export type RecorderState = 'idle' | 'recording' | 'paused' | 'saving'

export interface RecorderCallbacks {
  onStateChange?: (state: RecorderState) => void
  onError?: (error: Error) => void
  onSaved?: (filePath: string) => void
}

export function createRecorder(callbacks: RecorderCallbacks = {}) {
  let state: RecorderState = 'idle'
  let micStream: MediaStream | null = null
  let capture: { stop: () => PcmCaptureResult; analyserNode: AnalyserNode } | null = null

  function setState(next: RecorderState): void {
    state = next
    callbacks.onStateChange?.(state)
  }

  return {
    get state() { return state },

    get analyserNode(): AnalyserNode | null {
      return capture?.analyserNode ?? null
    },

    async start(): Promise<void> {
      if (state !== 'idle') return
      try {
        micStream = await getMicStream()
        capture = await createPcmCapture(micStream)
        setState('recording')
      } catch (err) {
        if (micStream) {
          releaseMicStream(micStream)
          micStream = null
        }
        callbacks.onError?.(err instanceof Error ? err : new Error(String(err)))
      }
    },

    async pause(): Promise<void> {
      if (state !== 'recording' || !capture) return
      try {
        const ctx = capture.analyserNode.context as AudioContext
        await ctx.suspend()
        setState('paused')
      } catch (err) {
        callbacks.onError?.(err instanceof Error ? err : new Error(String(err)))
      }
    },

    async resume(): Promise<void> {
      if (state !== 'paused' || !capture) return
      try {
        const ctx = capture.analyserNode.context as AudioContext
        await ctx.resume()
        setState('recording')
      } catch (err) {
        callbacks.onError?.(err instanceof Error ? err : new Error(String(err)))
      }
    },

    async stop(): Promise<void> {
      if ((state !== 'recording' && state !== 'paused') || !capture || !micStream) return
      try {
        if (state === 'paused') {
          const ctx = capture.analyserNode.context as AudioContext
          await ctx.resume()
        }
        setState('saving')
        const pcmResult = capture.stop()
        capture = null
        releaseMicStream(micStream)
        micStream = null
        const wavBlob = encodeWav(pcmResult)
        const arrayBuffer = await wavBlob.arrayBuffer()
        const filePath = await window.podcast.saveWavFile(arrayBuffer)
        if (filePath) { callbacks.onSaved?.(filePath) }
      } catch (err) {
        callbacks.onError?.(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setState('idle')
      }
    }
  }
}

export { MicError }
