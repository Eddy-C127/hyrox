import React from 'react'
import VOLT_DATA from './data'
import { Icon } from './primitives'
import { LoginScreen, HomeScreen, AccessFAB, QROverlay } from './screens/HomeScreen'
import { BookScreen } from './screens/BookScreen'
import { FuelScreen } from './screens/FuelScreen'
import { HealthScreen } from './screens/HealthScreen'
import { EventsScreen } from './screens/EventsScreen'

export default function App() {
  const D = VOLT_DATA
  const [entered, setEntered] = React.useState(false)
  const [tab, setTab] = React.useState('home')
  const [theme, setTheme] = React.useState('dark')
  const [qrOpen, setQrOpen] = React.useState(false)
  const [user, setUser] = React.useState(D.user)
  const [booked, setBooked] = React.useState(new Set())
  const [cart, setCart] = React.useState([])
  const [toast, setToast] = React.useState(null)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(window._toastT)
    window._toastT = setTimeout(() => setToast(null), 2800)
  }

  const handleBook = (id) => {
    setBooked(prev => new Set([...prev, id]))
    setUser(u => ({ ...u, credits: Math.max(0, u.credits - 1), sessionsThisWeek: u.sessionsThisWeek + 1 }))
    showToast('CLASE RESERVADA · 1 CRÉDITO USADO')
  }

  const handleBuyCredits = (amount, label) => {
    setUser(u => ({ ...u, credits: u.credits + amount, creditsTotal: u.creditsTotal + amount }))
    showToast(`+${amount} CRÉDITO${amount > 1 ? 'S' : ''} · ${label}`)
  }

  const tabs = [
    { id: 'home', label: 'INICIO', icon: Icon.Home },
    { id: 'book', label: 'CLASES', icon: Icon.Schedule },
    { id: 'fuel', label: 'FUEL', icon: Icon.Fuel },
    { id: 'health', label: 'SALUD', icon: Icon.Health },
    { id: 'events', label: 'EVENTOS', icon: Icon.Events },
  ]

  return (
    <div className="app-shell">
      {!entered ? (
        <LoginScreen onEnter={() => setEntered(true)} />
      ) : (
        <>
          <div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {tab === 'home' && (
              <HomeScreen
                user={user}
                theme={theme}
                onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                onShowQR={() => setQrOpen(true)}
                weeklyVolume={D.weeklyVolume}
                onBuyCredits={handleBuyCredits}
              />
            )}
            {tab === 'book' && (
              <BookScreen
                classes={D.classes}
                credits={user.credits}
                bookedIds={booked}
                onBook={handleBook}
              />
            )}
            {tab === 'fuel' && (
              <FuelScreen menu={D.menu} cart={cart} setCart={setCart} showToast={showToast} />
            )}
            {tab === 'health' && (
              <HealthScreen
                biometrics={D.biometrics}
                prescription={D.prescription}
                consultants={D.consultants}
              />
            )}
            {tab === 'events' && (
              <EventsScreen event={D.event} pastEvents={D.pastEvents} showToast={showToast} />
            )}
          </div>

          {tab === 'home' && <AccessFAB onClick={() => setQrOpen(true)} />}

          <nav className="bottom-nav">
            {tabs.map(t => {
              const I = t.icon
              return (
                <button
                  key={t.id}
                  className={'nav-tab ' + (tab === t.id ? 'active' : '')}
                  onClick={() => setTab(t.id)}
                  aria-label={t.label}
                >
                  <I />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </nav>

          {qrOpen && <QROverlay user={user} onClose={() => setQrOpen(false)} />}

          {toast && (
            <div className="toast">
              <Icon.Check style={{ width: 16, height: 16 }} />
              {toast}
            </div>
          )}
        </>
      )}
    </div>
  )
}
