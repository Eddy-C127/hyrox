import React from 'react'
import { Icon, QRPattern, Photo, StatusBar } from '../primitives'

export function LoginScreen({ onEnter }) {
  const [exiting, setExiting] = React.useState(false)
  const handle = () => {
    setExiting(true)
    setTimeout(() => onEnter(), 450)
  }
  return (
    <div className="login-screen" style={{ opacity: exiting ? 0 : 1, transition: 'opacity 0.4s' }}>
      <div className="login-bg" />
      <div className="scanline" />
      <Photo tag="HÉROE // ATLETA" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, #000 90%)' }} />

      <StatusBar />

      <div style={{ position: 'relative', zIndex: 5, padding: '0 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, animation: 'slideDown 0.6s 0.1s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, background: 'var(--volt)', borderRadius: 6, transform: 'rotate(45deg)', boxShadow: '0 0 18px var(--volt-glow)' }} />
            <div className="display" style={{ fontSize: 22, color: 'var(--fg)' }}>VOLT<span style={{ color: 'var(--volt)' }}>//</span>HPX</div>
          </div>
          <div className="eyebrow" style={{ fontSize: 9 }}>v 2.4</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ animation: 'slideUp 0.7s 0.2s both' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>ALTO RENDIMIENTO · MIEMBROS</div>
          <h1 className="display" style={{ fontSize: 78, margin: 0, color: 'var(--fg)' }}>
            HECHO<br />
            PARA<br />
            <span style={{ color: 'var(--volt)' }}>GUERRA.</span>
          </h1>
        </div>

        <div style={{ height: 24 }} />

        <div className="marquee" style={{ animation: 'fadeIn 1s 0.4s both' }}>
          <div className="marquee-track eyebrow" style={{ color: 'var(--fg-2)' }}>
            {Array(2).fill(0).map((_, i) => (
              <React.Fragment key={i}>
                <span>HANGAR 04 · BERLÍN</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>+1,284 MIEMBROS</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>PRÓXIMA CARRERA · 14D</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>ABIERTO 24/7</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ height: 28 }} />

        <button
          className="btn btn-volt"
          onClick={handle}
          style={{ width: '100%', height: 64, fontSize: 14, animation: 'slideUp 0.7s 0.35s both, pulseVolt 2.5s 1.5s infinite' }}
        >
          ACCESO DEMO · ENTRAR COMO USUARIO
          <Icon.Arrow />
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, marginBottom: 18, animation: 'fadeIn 0.6s 0.5s both' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>SIN CONTRASEÑA · ACCESO INMEDIATO</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>SEGURO ↗</div>
        </div>
      </div>
    </div>
  )
}

export function HomeScreen({ user, onToggleTheme, weeklyVolume }) {
  return (
    <div className="scroll page-enter">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar" />
          <div>
            <div className="eyebrow" style={{ marginBottom: 3 }}>BUENOS DÍAS</div>
            <div className="display" style={{ fontSize: 20, color: 'var(--fg)' }}>{user.name.split(' ')[0].toUpperCase()}.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12, position: 'relative' }}>
            <Icon.Bell style={{ width: 18, height: 18 }} />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--volt)' }} />
          </button>
          <div className="theme-switch" onClick={onToggleTheme} role="button" aria-label="Cambiar tema" />
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', marginBottom: 14 }}>
        <Photo tag="HÉROE · ATLETA EN ACCIÓN" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)' }} />
        <div style={{ position: 'relative', padding: '20px 20px 22px', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>HOY · LUN 24</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
              <Icon.Flame style={{ width: 12, height: 12, color: 'var(--volt)' }} />
              {user.streak} DÍAS RACHA
            </div>
          </div>
          <div style={{ height: 140 }} />
          <div className="display" style={{ fontSize: 52, lineHeight: 0.9, color: '#fff' }}>
            ENGINE<br />ROOM<span style={{ color: 'var(--volt)' }}>.</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 8, letterSpacing: '0.1em' }}>
            18:30 · COACH ALEX · 60 MIN
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginBottom: 10 }}>
        <div className="card" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="eyebrow">CRÉDITOS</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{user.credits}/{user.creditsTotal}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginTop: 6 }}>
            <div className="display" style={{ fontSize: 56, color: 'var(--fg)' }}>{user.credits}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 8 }}>REST.</div>
          </div>
          <div style={{ marginTop: 4, height: 6, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(user.credits / user.creditsTotal) * 100}%`, background: 'var(--volt)', boxShadow: '0 0 8px var(--volt-glow)' }} />
          </div>
        </div>

        <div className="card card-dark" style={{ padding: 16, background: 'var(--volt)', color: '#000', border: 'none' }}>
          <div className="eyebrow" style={{ color: 'rgba(0,0,0,0.5)' }}>PLAN</div>
          <div className="display" style={{ fontSize: 22, marginTop: 6, color: '#000' }}>{user.membership}</div>
          <div className="mono" style={{ fontSize: 9, marginTop: 8, color: 'rgba(0,0,0,0.65)' }}>VEN {user.expires}</div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
            ACTIVO <Icon.Dot style={{ width: 8, height: 8, color: '#000' }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>VOLUMEN SEMANAL</div>
            <div className="display" style={{ fontSize: 22, color: 'var(--fg)' }}>{user.sessionsThisWeek}<span style={{ color: 'var(--fg-3)', fontSize: 16 }}>/{user.weeklyGoal} SESIONES</span></div>
          </div>
          <div className="circle-prog" style={{ '--pct': (user.sessionsThisWeek / user.weeklyGoal) * 100, '--size': '46px', '--thick': '5px' }}>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{Math.round((user.sessionsThisWeek / user.weeklyGoal) * 100)}%</span>
          </div>
        </div>
        <div className="bar-grid">
          {weeklyVolume.map((d) => (
            <div key={d.day} className={'bar ' + (d.day === 'JUE' ? 'active' : '')} style={{ height: `${Math.max(d.val, 4)}%` }}>
              <div className="bar-label">{d.day}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>

      <div className="card" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <div className="display" style={{ fontSize: 11, color: 'var(--volt)' }}>PROX.</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>PRÓXIMA · MAR 17:30</div>
          <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>SIM. CARRERA HÍBRIDA</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>1 lugar disponible · Coach Alex</div>
        </div>
        <Icon.Arrow style={{ width: 18, height: 18, color: 'var(--fg-3)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="card" style={{ padding: 16 }}>
          <Icon.Heart style={{ width: 18, height: 18, color: 'var(--volt)' }} />
          <div className="display" style={{ fontSize: 28, marginTop: 8, color: 'var(--fg)' }}>58<span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>BPM</span></div>
          <div className="eyebrow" style={{ marginTop: 4 }}>FC EN REPOSO</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <Icon.ArrowDown style={{ width: 18, height: 18, color: 'var(--volt)' }} />
          <div className="display" style={{ fontSize: 28, marginTop: 8, color: 'var(--fg)' }}>14<span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>% BF</span></div>
          <div className="eyebrow" style={{ marginTop: 4 }}>-4 PTS / 7 SEM.</div>
        </div>
      </div>

      <div style={{ height: 20 }} />
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.12em' }}>
        MIEMBRO · {user.memberSince} — VOLT//HPX
      </div>
    </div>
  )
}

export function AccessFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 18, bottom: 100,
        width: 56, height: 56, borderRadius: 18,
        background: 'var(--volt)', color: '#000',
        border: 'none', cursor: 'pointer',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 12px 30px -8px var(--volt-glow), 0 0 0 4px rgba(204,255,0,0.12)',
        zIndex: 25,
      }}
      aria-label="Abrir pase de acceso"
    >
      <Icon.QR style={{ width: 24, height: 24 }} />
    </button>
  )
}

export function QROverlay({ user, onClose }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: 28 }}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div>
            <div className="eyebrow">PASE DE ACCESO</div>
            <div className="display" style={{ fontSize: 28, marginTop: 4, color: 'var(--fg)' }}>ESCANEA PARA ENTRAR</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}>
            <Icon.X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div style={{ display: 'grid', placeItems: 'center', marginTop: 22, marginBottom: 22, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-8px', borderRadius: 24, background: 'radial-gradient(circle, var(--volt-glow), transparent 70%)', filter: 'blur(24px)' }} />
          <div style={{ position: 'relative' }}>
            <QRPattern seed={`volt-${user.name}-${user.streak}`} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 44, height: 44, background: 'var(--volt)', borderRadius: 10, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 4px #fff' }}>
              <div className="display" style={{ fontSize: 16, color: '#000' }}>V//</div>
            </div>
          </div>
        </div>

        <div className="mono" style={{ textAlign: 'center', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.14em' }}>
          ID · VLT-AM-2024-{user.streak.toString().padStart(4, '0')}
        </div>

        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Flame style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>{user.streak}</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>RACHA</div>
          </div>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Check style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>{user.credits}</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>CRÉDITOS</div>
          </div>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Coach style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>VIP</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>{user.membership}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
