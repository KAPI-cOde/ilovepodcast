import { useState } from 'react'
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
    </div>
  )
}
