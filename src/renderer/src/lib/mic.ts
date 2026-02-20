export class MicError extends Error {
  constructor(
    message: string,
    public readonly reason: 'permission-denied' | 'not-found' | 'unknown'
  ) {
    super(message)
    this.name = 'MicError'
  }
}

/**
 * マイクストリームを取得する
 * @returns MediaStream（モノラル音声）
 * @throws MicError 権限拒否・デバイス未検出時
 */
export async function getMicStream(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 44100,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    })
    return stream
  } catch (err) {
    if (err instanceof DOMException) {
      switch (err.name) {
        case 'NotAllowedError':
          throw new MicError(
            'マイクの使用が許可されていません。システム環境設定からマイクへのアクセスを許可してください。',
            'permission-denied'
          )
        case 'NotFoundError':
          throw new MicError(
            'マイクが見つかりません。マイクが接続されているか確認してください。',
            'not-found'
          )
        default:
          throw new MicError(
            `マイクの取得に失敗しました（${err.name}）`,
            'unknown'
          )
      }
    }
    throw new MicError('マイクの取得に失敗しました', 'unknown')
  }
}

/**
 * マイクストリームを解放する
 */
export function releaseMicStream(stream: MediaStream): void {
  stream.getTracks().forEach((track) => track.stop())
}
