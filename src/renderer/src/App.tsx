import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Timeline from './components/Timeline'
import TrackArea from './components/TrackArea'
import ControlBar from './components/ControlBar'
import PresetModal from './components/PresetModal'
import ExportModal from './components/ExportModal'

export default function App() {
  const [showPresetModal, setShowPresetModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] relative shadow-2xl overflow-hidden h-screen w-screen font-display text-slate-100 selection:bg-primary/30">
      <Header
        onOpenPresets={() => setShowPresetModal(true)}
        onOpenExport={() => setShowExportModal(true)}
      />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Timeline />
        <TrackArea />
      </main>
      <ControlBar />

      {showPresetModal && (
        <PresetModal onClose={() => setShowPresetModal(false)} />
      )}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e1e',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#4ade80', secondary: '#1e1e1e' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#1e1e1e' },
            duration: 5000,
          },
        }}
      />
    </div>
  )
}
