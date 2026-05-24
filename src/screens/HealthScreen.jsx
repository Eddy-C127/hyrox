import React from 'react'
import { Icon, LineChart } from '../primitives'

export function HealthScreen({ biometrics, prescription, consultants }) {
  const [metric, setMetric] = React.useState('weight')
  const metrics = {
    weight: { label: 'WEIGHT', unit: 'kg', values: biometrics.weight, color: '#CCFF00' },
    bodyFat: { label: 'BODY FAT', unit: '%', values: biometrics.bodyFat, color: '#FF7A3D' },
    muscle: { label: 'MUSCLE MASS', unit: '%', values: biometrics.muscle, color: '#5BC0FF' },
    rhr: { label: 'RESTING HR', unit: 'BPM', values: biometrics.rhr, color: '#F472B6' },
  }
  const cur = metrics[metric]
  const start = cur.values[0]
  const end = cur.values[cur.values.length - 1]
  const delta = (end - start).toFixed(1)
  const isImprovement = metric === 'muscle' ? delta > 0 : delta < 0

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">HEALTH & NUTRITION</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>PROGRESS<span style={{ color: 'var(--volt)' }}>.</span></div>
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
            <div className="eyebrow">{cur.label} · 7 WEEKS</div>
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
        <MiniStat label="BODY FAT" value="14%" delta="-4.0" good />
        <MiniStat label="MUSCLE" value="45%" delta="+3.0" good />
        <MiniStat label="RHR" value="58" delta="-4 bpm" good />
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· BOOK A CONSULTANT</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {consultants.map((c) => (
          <div key={c.name} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)', border: '1.5px solid var(--volt)', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 14, color: 'var(--fg)' }}>
              {c.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{c.name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.role}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 10, color: c.avail ? 'var(--volt)' : 'var(--fg-3)', fontWeight: 700, letterSpacing: '0.08em' }}>{c.avail ? 'NEXT' : 'BOOKED'}</div>
              <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{c.next}</div>
            </div>
            <button className="btn-ghost" style={{ width: 36, height: 36, padding: 0, borderRadius: 10, opacity: c.avail ? 1 : 0.4 }}><Icon.Arrow style={{ width: 14, height: 14 }} /></button>
          </div>
        ))}
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· PRESCRIPTION · TODAY</div>
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
                {isNow && <div style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 700, color: 'var(--volt)', letterSpacing: '0.1em' }}>· TAKE NOW</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.1em', marginTop: 18 }}>
        PRESCRIBED BY · DR. LENA PARK · 14 MAY 2026
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
