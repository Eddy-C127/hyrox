import React from 'react'
import { Icon, LineChart } from '../primitives'

export function HealthScreen({ biometrics, prescription, consultants }) {
  const [metric, setMetric] = React.useState('weight')
  const [selectedConsultant, setSelectedConsultant] = React.useState(null)

  const metrics = {
    weight: { label: 'PESO', unit: 'kg', values: biometrics.weight, color: '#CCFF00' },
    bodyFat: { label: 'GRASA CORP.', unit: '%', values: biometrics.bodyFat, color: '#FF7A3D' },
    muscle: { label: 'MASA MUSCULAR', unit: '%', values: biometrics.muscle, color: '#5BC0FF' },
    rhr: { label: 'FC EN REPOSO', unit: 'BPM', values: biometrics.rhr, color: '#F472B6' },
  }
  const cur = metrics[metric]
  const start = cur.values[0]
  const end = cur.values[cur.values.length - 1]
  const delta = (end - start).toFixed(1)
  const isImprovement = metric === 'muscle' ? delta > 0 : delta < 0

  if (selectedConsultant) {
    return (
      <AppointmentView
        consultant={selectedConsultant}
        onBack={() => setSelectedConsultant(null)}
      />
    )
  }

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">SALUD & NUTRICIÓN</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>PROGRESO<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginLeft: -20, paddingLeft: 20, paddingRight: 20, marginBottom: 14, scrollbarWidth: 'none' }}>
        {Object.entries(metrics).map(([k, m]) => (
          <button
            key={k}
            onClick={() => setMetric(k)}
            className={'btn-pill ' + (metric === k ? 'active' : '')}
            style={{ flex: '0 0 auto', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >{m.label}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 12, padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div className="eyebrow">{cur.label} · 7 SEMANAS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <div className="display" style={{ fontSize: 56, color: 'var(--fg)' }}>{end}</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--fg-3)' }}>{cur.unit}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: isImprovement ? 'var(--volt-soft)' : 'rgba(255,87,87,0.1)', borderRadius: 8 }}>
              {(metric === 'muscle' ? delta > 0 : delta < 0) ? <Icon.ArrowUp style={{ width: 12, height: 12, color: 'var(--volt)' }} /> : <Icon.ArrowDown style={{ width: 12, height: 12, color: '#FF5757' }} />}
              <span className="mono" style={{ fontSize: 11, color: isImprovement ? 'var(--volt)' : '#FF5757', fontWeight: 700 }}>{delta > 0 ? '+' : ''}{delta}{cur.unit}</span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 6 }}>vs. {start}{cur.unit}</div>
          </div>
        </div>
        <div style={{ marginTop: 14, color: 'var(--fg)' }}>
          <LineChart values={cur.values} color={cur.color} height={140} unit={cur.unit} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 8 }}>
          {biometrics.weeks.map(w => (
            <div key={w} className="mono" style={{ fontSize: 9, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.06em' }}>{w}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 22 }}>
        <MiniStat label="GRASA CORP." value="14%" delta="-4.0" good />
        <MiniStat label="MÚSCULO" value="45%" delta="+3.0" good />
        <MiniStat label="FC REPOSO" value="58" delta="-4 bpm" good />
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· AGENDAR CONSULTA</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {consultants.map((c) => (
          <div
            key={c.name}
            className="card"
            style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: c.avail ? 'pointer' : 'default' }}
            onClick={() => c.avail && setSelectedConsultant(c)}
          >
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)', border: '1.5px solid var(--volt)', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 14, color: 'var(--fg)' }}>
              {c.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{c.name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.role}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 10, color: c.avail ? 'var(--volt)' : 'var(--fg-3)', fontWeight: 700, letterSpacing: '0.08em' }}>{c.avail ? 'PROX.' : 'OCUPADO'}</div>
              <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{c.next}</div>
            </div>
            <button className="btn-ghost" style={{ width: 36, height: 36, padding: 0, borderRadius: 10, opacity: c.avail ? 1 : 0.4 }}><Icon.Arrow style={{ width: 14, height: 14 }} /></button>
          </div>
        ))}
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· PRESCRIPCIÓN · HOY</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {prescription.map((p, i) => {
          const isLast = i === prescription.length - 1
          const isDone = p.status === 'done'
          const isNow = p.status === 'now'
          const isLocked = p.status === 'locked'
          return (
            <div key={p.phase} style={{ display: 'flex', alignItems: 'stretch', borderBottom: isLast ? 'none' : '1px solid var(--line)' }}>
              <div style={{ width: 56, position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: 'var(--line)' }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 28, height: 28, borderRadius: '50%',
                  background: isDone ? 'var(--volt)' : isNow ? 'transparent' : 'var(--bg-3)',
                  border: isNow ? '2px solid var(--volt)' : 'none',
                  display: 'grid', placeItems: 'center',
                  boxShadow: isNow ? '0 0 18px var(--volt-glow)' : 'none',
                  animation: isNow ? 'pulseVolt 2s infinite' : 'none',
                  color: isDone ? '#000' : 'var(--volt)',
                }}>
                  {isDone && <Icon.Check style={{ width: 14, height: 14 }} />}
                  {isNow && <Icon.Dot style={{ width: 12, height: 12 }} />}
                  {isLocked && <Icon.Lock style={{ width: 12, height: 12, color: 'var(--fg-3)' }} />}
                </div>
              </div>
              <div style={{ flex: 1, padding: '16px 16px 16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="eyebrow" style={{ color: isLocked ? 'var(--fg-4)' : 'var(--fg-3)' }}>{p.phase}</div>
                  <div className="mono" style={{ fontSize: 10, color: isLocked ? 'var(--fg-4)' : 'var(--fg-3)' }}>{p.time}</div>
                </div>
                <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: isLocked ? 'var(--fg-3)' : 'var(--fg)', marginTop: 4, opacity: isLocked ? 0.6 : 1 }}>{p.item}</div>
                {isNow && <div style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 700, color: 'var(--volt)', letterSpacing: '0.1em' }}>· TOMAR AHORA</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.1em', marginTop: 18 }}>
        PRESCRITO POR · DRA. LENA PARK · 14 MAY 2026
      </div>
    </div>
  )
}

function MiniStat({ label, value, delta, good }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="eyebrow" style={{ fontSize: 9 }}>{label}</div>
      <div className="display" style={{ fontSize: 26, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      <div className="mono" style={{ fontSize: 10, color: good ? 'var(--volt)' : '#FF5757', marginTop: 2 }}>{delta}</div>
    </div>
  )
}

const MONTH_NAMES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
const DAY_NAMES = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
const UNAVAILABLE = new Set([1, 2, 9, 10, 16, 23])

function AppointmentView({ consultant, onBack }) {
  const today = new Date()
  const [viewYear, setViewYear] = React.useState(today.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(today.getMonth())
  const [selectedDay, setSelectedDay] = React.useState(null)
  const [selectedTime, setSelectedTime] = React.useState(null)
  const [confirmed, setConfirmed] = React.useState(false)

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelectedDay(null); setSelectedTime(null)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelectedDay(null); setSelectedTime(null)
  }

  const isPast = (d) => {
    const date = new Date(viewYear, viewMonth, d)
    const t = new Date(today); t.setHours(0, 0, 0, 0)
    return date < t
  }

  if (confirmed) {
    return (
      <div className="scroll page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80%', textAlign: 'center', padding: '0 28px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--volt)', display: 'grid', placeItems: 'center', marginBottom: 24, boxShadow: '0 0 40px var(--volt-glow)' }}>
          <Icon.Check style={{ width: 36, height: 36, color: '#000' }} />
        </div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>CITA CONFIRMADA</div>
        <div className="display" style={{ fontSize: 42, color: 'var(--fg)', marginBottom: 8 }}>¡LISTO<span style={{ color: 'var(--volt)' }}>!</span></div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 6, letterSpacing: '0.08em' }}>
          {consultant.name}
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-2)', marginBottom: 4 }}>
          {selectedDay} {MONTH_NAMES[viewMonth]} · {selectedTime}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 32 }}>
          Confirmación enviada a tu correo
        </div>
        <button className="btn btn-volt" onClick={onBack} style={{ width: '100%' }}>
          VOLVER AL INICIO <Icon.Arrow />
        </button>
      </div>
    )
  }

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-2)', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16, padding: 0 }}
        >
          <Icon.ChevronLeft style={{ width: 18, height: 18 }} /> VOLVER
        </button>
        <div className="eyebrow">AGENDAR CONSULTA</div>
        <div className="display" style={{ fontSize: 36, color: 'var(--fg)', marginTop: 6 }}>CALENDARIO<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      <div className="card" style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, padding: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)', border: '2px solid var(--volt)', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 15, color: 'var(--fg)' }}>
          {consultant.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div className="display straight" style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{consultant.name}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{consultant.role}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={prevMonth} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)', border: '1px solid var(--line)', cursor: 'pointer', color: 'var(--fg)', display: 'grid', placeItems: 'center' }}>
            <Icon.ChevronLeft style={{ width: 16, height: 16 }} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)' }}>{MONTH_NAMES[viewMonth]}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{viewYear}</div>
          </div>
          <button onClick={nextMonth} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)', border: '1px solid var(--line)', cursor: 'pointer', color: 'var(--fg)', display: 'grid', placeItems: 'center' }}>
            <Icon.ChevronRight style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="cal-grid" style={{ marginBottom: 8 }}>
          {DAY_NAMES.map(d => (
            <div key={d} className="mono" style={{ textAlign: 'center', fontSize: 9, color: 'var(--fg-4)', paddingBottom: 6, letterSpacing: '0.06em' }}>{d}</div>
          ))}
        </div>

        <div className="cal-grid">
          {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={'e' + i} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const d = i + 1
            const isToday = d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
            const past = isPast(d)
            const unavail = UNAVAILABLE.has(d)
            const sel = selectedDay === d
            return (
              <button
                key={d}
                disabled={past || unavail}
                onClick={() => { setSelectedDay(d); setSelectedTime(null) }}
                className={'cal-day' + (isToday && !sel ? ' today' : '') + (sel ? ' selected' : '')}
              >
                {d}
                {!past && !unavail && !sel && <div className="cal-dot" />}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDay && (
        <div style={{ animation: 'slideUp 0.3s both' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>· HORARIOS DISPONIBLES</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={'time-slot' + (selectedTime === t ? ' selected' : '')}
              >
                <div className="display straight" style={{ fontSize: 18, fontWeight: 700, color: selectedTime === t ? 'var(--volt)' : 'var(--fg)' }}>{t}</div>
                <div className="mono" style={{ fontSize: 9, color: selectedTime === t ? 'var(--volt)' : 'var(--fg-3)', marginTop: 2 }}>50 MIN · VIRTUAL</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDay && selectedTime && (
        <div style={{ animation: 'slideUp 0.3s both' }}>
          <div style={{ padding: 16, background: 'var(--bg-2)', borderRadius: 18, border: '1px dashed var(--line-strong)', marginBottom: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>RESUMEN DE CITA</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)' }}>{consultant.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{consultant.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                  <Icon.CalendarIcon style={{ width: 13, height: 13, color: 'var(--volt)' }} />
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>
                    {selectedDay} {MONTH_NAMES[viewMonth]} {viewYear}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Icon.Dot style={{ width: 10, height: 10, color: 'var(--volt)' }} />
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{selectedTime} · 50 min</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="display" style={{ fontSize: 28, color: 'var(--volt)' }}>GRATIS</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--fg-3)' }}>INCLUIDO EN PLAN</div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-volt"
            onClick={() => setConfirmed(true)}
            style={{ width: '100%', marginBottom: 10 }}
          >
            CONFIRMAR CITA <Icon.Arrow />
          </button>
          <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)' }}>
            CANCELACIÓN GRATUITA HASTA 24H ANTES
          </div>
        </div>
      )}
    </div>
  )
}
