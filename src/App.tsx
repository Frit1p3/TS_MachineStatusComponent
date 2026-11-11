import { useState } from 'react'
import { LiveMachineFeed } from './components/LiveMachineFeed'
import { ManualTester } from './components/ManualTester'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'live' | 'manual'>('live')

  return (
    <main className="app-main">
      <header className="app-header">
        <div className="app-header__badge">Validation de Données Industrielles</div>
        <h1 className="app-header__title">Composant de supervision de machines</h1>
        <p className="app-header__subtitle">
          Supervision de l&apos;état machine, modélisation stricte et validation de schéma avec Zod
        </p>

        {/* Navigation par onglets */}
        <nav className="app-tabs" aria-label="Modes d'affichage" role="tablist">
          <button
            type="button"
            id="live-tab"
            role="tab"
            aria-selected={activeTab === 'live'}
            aria-controls="live-panel"
            className={`tab-btn ${activeTab === 'live' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            📡 Flux API en direct
          </button>
          <button
            type="button"
            id="manual-tab"
            role="tab"
            aria-selected={activeTab === 'manual'}
            aria-controls="manual-panel"
            className={`tab-btn ${activeTab === 'manual' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            🧪 Bac à sable de test manuel
          </button>
        </nav>
      </header>

      <section id="live-panel" role="tabpanel" aria-labelledby="live-tab" hidden={activeTab !== 'live'}>
        {activeTab === 'live' && <LiveMachineFeed />}
      </section>
      <section id="manual-panel" role="tabpanel" aria-labelledby="manual-tab" hidden={activeTab !== 'manual'}>
        {activeTab === 'manual' && <ManualTester />}
      </section>
    </main>
  )
}

export default App
