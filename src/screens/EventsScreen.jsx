import React from 'react'
import { Icon, Photo } from '../primitives'

export function EventsScreen({ event, pastEvents, showToast }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedHeat, setSelectedHeat] = React.useState(event.heats[0].id)

  const target = React.useMemo(() => Date.now() + 14 * 86400 * 1000, [])
  const [now, setNow] = React.useState(Date.now())
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  const heat = event.heats.find(h => h.id === selectedHeat)

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">ARENA</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>EVENTOS<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', marginBottom: 14, minHeight: 460 }}>
        <Photo tag="HÉROE · PISO DE CARRERA" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(204,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div style={{ position: 'relative', padding: '22px 22px 22px', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: 460 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--volt)', color: '#000', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em' }}>
              <Icon.Dot style={{ width: 8, height: 8, animation: 'pulseVolt 1.5s infinite' }} /> TICKETS DISPONIBLES
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>EVT-2026-07</div>
          </div>

          <div style={{ flex: 1 }} />

          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>OPEN VERANO · 2026</div>
          <div className="display" style={{ fontSize: 56, color: '#fff', letterSpacing: '-0.02em' }}>
            CARRERA<br />HÍBRIDA<br /><span style={{ color: 'var(--volt)' }}>SIM.</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 10, letterSpacing: '0.08em' }}>
            {event.subtitle}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: '#fff', letterSpacing: '0.05em' }}>
            <Icon.Pin style={{ width: 12, height: 12, color: 'var(--volt)' }} />
            {event.venue} · {event.city}
          </div>

          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
              { v: d, l: 'DÍAS' },
              { v: h, l: 'HRS' },
              { v: m, l: 'MIN' },
              { v: s, l: 'SEG' },
            ].map((x, i) => (
              <div key={x.l} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 6px', textAlign: 'center' }}>
                <div className="display" style={{ fontSize: 32, color: i === 0 ? 'var(--volt)' : '#fff', textShadow: i === 0 ? '0 0 20px var(--volt-glow)' : 'none' }}>{String(x.v).padStart(2, '0')}</div>
                <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 2, letterSpacing: '0.1em' }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn btn-volt" onClick={() => setDrawerOpen(true)} style={{ width: '100%', marginBottom: 22 }}>
        ASEGURA TU HEAT · DESDE ${event.price.toLocaleString('es-MX')}
        <Icon.Arrow />
      </button>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>8 ESTACIONES · SPLITS 1KM</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {['SKI', 'EMPUJE TRINEO', 'JALE TRINEO', 'BURPEES', 'REMO', 'KB FARMER', 'ESTOCADAS', 'WALL BALL'].map((station, i) => (
            <div key={station} style={{ aspectRatio: 1, background: 'var(--bg-3)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div className="display" style={{ fontSize: 18, color: 'var(--volt)' }}>{String(i + 1).padStart(2, '0')}</div>
              <div className="mono" style={{ fontSize: 7.5, color: 'var(--fg-3)', textAlign: 'center', letterSpacing: '0.05em' }}>{station}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· TU HISTORIAL</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pastEvents.map(p => (
          <div key={p.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div>
                <div className="display" style={{ fontSize: 18, color: 'var(--volt)', lineHeight: 0.9 }}>{p.date.split(' ')[1]}</div>
                <div className="mono" style={{ fontSize: 8, color: 'var(--fg-3)', marginTop: 1 }}>{p.date.split(' ')[0]}</div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>LUGAR <span style={{ color: 'var(--fg)' }}>{p.place}</span></div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>TIEMPO <span style={{ color: 'var(--volt)' }}>{p.time}</span></div>
              </div>
            </div>
            <Icon.Arrow style={{ width: 16, height: 16, color: 'var(--fg-3)' }} />
          </div>
        ))}
      </div>

      {drawerOpen && (
        <TicketDrawer
          event={event}
          heat={heat}
          selectedHeat={selectedHeat}
          setSelectedHeat={setSelectedHeat}
          onClose={() => setDrawerOpen(false)}
          onSecure={() => { setDrawerOpen(false); showToast('TICKET ASEGURADO · REVISA TU CORREO') }}
        />
      )}
    </div>
  )
}

function TicketDrawer({ event, heat, selectedHeat, setSelectedHeat, onClose, onSecure }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">ASEGURAR TICKET</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>ELIGE TU HEAT</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          {event.heats.map(h => {
            const sel = h.id === selectedHeat
            const full = h.spots === 0
            return (
              <button
                key={h.id}
                onClick={() => !full && setSelectedHeat(h.id)}
                disabled={full}
                style={{
                  background: sel ? 'var(--volt)' : 'var(--bg-2)',
                  color: sel ? '#000' : 'var(--fg)',
                  border: sel ? '1px solid var(--volt)' : '1px solid var(--line)',
                  borderRadius: 16, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: full ? 'not-allowed' : 'pointer',
                  opacity: full ? 0.4 : 1,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ width: 56 }}>
                  <div className="display" style={{ fontSize: 22, color: 'inherit' }}>{h.time}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'inherit' }}>{h.label}</div>
                  <div className="mono" style={{ fontSize: 10, color: sel ? 'rgba(0,0,0,0.6)' : 'var(--fg-3)', marginTop: 2 }}>
                    {full ? 'AGOTADO' : `${h.spots} / ${h.total} LUGARES`}
                  </div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: sel ? 'none' : '1.5px solid var(--fg-3)', background: sel ? '#000' : 'transparent', display: 'grid', placeItems: 'center' }}>
                  {sel && <Icon.Check style={{ width: 12, height: 12, color: 'var(--volt)' }} />}
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 18, padding: 16, background: 'var(--bg-2)', borderRadius: 16, border: '1px dashed var(--line-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">TU HEAT</div>
              <div className="display" style={{ fontSize: 18, marginTop: 4, color: 'var(--fg)' }}>{heat.label}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{heat.time} · {event.venue}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display" style={{ fontSize: 32, color: 'var(--volt)' }}>${event.price.toLocaleString('es-MX')}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-3)' }}>INCL. CHIP & FOTOS</div>
            </div>
          </div>
        </div>

        <button className="btn btn-volt" onClick={onSecure} style={{ width: '100%', marginTop: 14 }}>
          ASEGURAR TICKET · ${event.price.toLocaleString('es-MX')} <Icon.Arrow />
        </button>
        <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>REEMBOLSABLE HASTA 7 DÍAS ANTES</div>
      </div>
    </div>
  )
}
