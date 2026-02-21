import { useRef, useEffect, useState } from 'react'

interface LiveWaveformProps {
  analyser: AnalyserNode | null
  color?: string
}

export function LiveWaveform({
  analyser,
  color = '#4ade80',
}: LiveWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafIdRef = useRef<number>(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width: Math.floor(width), height: Math.floor(height) })
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !analyser || size.width === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    function draw() {
      rafIdRef.current = requestAnimationFrame(draw)
      analyser!.getByteTimeDomainData(dataArray)
      ctx!.clearRect(0, 0, size.width, size.height)
      ctx!.lineWidth = 2
      ctx!.strokeStyle = color
      ctx!.beginPath()
      const sliceWidth = size.width / bufferLength
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * size.height) / 2
        if (i === 0) { ctx!.moveTo(x, y) } else { ctx!.lineTo(x, y) }
        x += sliceWidth
      }
      ctx!.lineTo(size.width, size.height / 2)
      ctx!.stroke()
    }

    draw()
    return () => { cancelAnimationFrame(rafIdRef.current) }
  }, [analyser, size.width, size.height, color])

  return (
    <div ref={containerRef} className="flex-1 h-full min-w-0">
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        style={{ display: "block", background: "transparent", width: "100%", height: "100%" }}
      />
    </div>
  )
}
