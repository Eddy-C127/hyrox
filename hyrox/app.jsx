// ============================================
// MAIN APP SHELL
// ============================================
function App() {
  const D = window.VOLT_DATA;
  const [entered, setEntered] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [theme, setTheme] = React.useState('dark');
  const [qrOpen, setQrOpen] = React.useState(false);
  const [user, setUser] = React.useState(D.user);
  const [booked, setBooked] = React.useState(new Set());
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(window._toastT);
    window._toastT = setTimeout(() => setToast(null), 2800);
  };

  const handleBook = (id) => {
    setBooked(prev => new Set([...prev, id]));
    showToast('CLASS BOOKED · 1 CREDIT USED');
  };
  const handleSpend = () => {
    setUser(u => ({ ...u, credits: Math.max(0, u.credits - 1), sessionsThisWeek: u.sessionsThisWeek + 1 }));
  };

  const tabs = [
    { id: 'home', label: 'HOME', icon: Icon.Home },
    { id: 'book', label: 'CLASSES', icon: Icon.Schedule },
    { id: 'fuel', label: 'FUEL', icon: Icon.Fuel },
    { id: 'health', label: 'HEALTH', icon: Icon.Health },
    { id: 'events', label: 'EVENTS', icon: Icon.Events },
  ];

  return (
    <div className="device-wrap">
      <div className="device">
        <div className="device-label">VOLT // HPX — DEMO BUILD 2.4</div>
        <div className="device-screen">
          {!entered ? (
            <LoginScreen onEnter={() => setEntered(true)} />
          ) : (
            <>
              <StatusBar />
              <div className="island" />
              <div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {tab === 'home' && (
                  <HomeScreen
                    user={user}
                    theme={theme}
                    onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    onShowQR={() => setQrOpen(true)}
                    weeklyVolume={D.weeklyVolume}
                  />
                )}
                {tab === 'book' && (
                  <BookScreen
                    classes={D.classes}
                    credits={user.credits}
                    bookedIds={booked}
                    onBook={handleBook}
                    onSpend={handleSpend}
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

              {/* Bottom nav */}
              <nav className="bottom-nav">
                {tabs.map(t => {
                  const I = t.icon;
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
                  );
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
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
