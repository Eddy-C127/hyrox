import React from 'react'
import { Icon } from '../primitives'

export function BookScreen({ classes, credits, onBook, bookedIds }) {
  const [day, setDay] = React.useState(0)
  const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']
  const dates = [24, 25, 26, 27, 28, 29, 30]
  const list = classes[day] || []

  const intensityColor = (i) => i === 'PICO' ? 'var(--volt)' : i === 'ALTO' ? '#FF7A3D' : i === 'MED' ? '#5BC0FF' : '#9CA3AF'

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">HORARIO</div>
            <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>RESERVAR<span style={{ color: 'var(--volt)' }}>.</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="display" style={{ fontSize: 28, color: 'var(--volt)' }}>{credits}</div>
            <div className="eyebrow">CRÉDITOS</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18, marginLeft: -20, paddingLeft: 20, paddingRight: 20, scrollbarWidth: 'none' }}>
        {days.map((d, i) => {
          const active = i === day
          return (
            <button
              key={d}
              onClick={() => setDay(i)}
              style={{
                flex: '0 0 auto',
                width: 64, height: 86,
                padding: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: active ? 'var(--volt)' : 'var(--bg-2)',
                color: active ? '#000' : 'var(--fg)',
                border: active ? '1px solid var(--volt)' : '1px solid var(--line)',
                cursor: 'pointer',
                borderRadius: 18,
                gap: 4,
                fontFamily: 'inherit',
              }}
            >
              <div className="eyebrow" style={{ color: active ? 'rgba(0,0,0,0.6)' : 'var(--fg-3)' }}>{d}</div>
              <div className="display" style={{ fontSize: 28, color: 'inherit' }}>{dates[i]}</div>
              {(classes[i] || []).length > 0 && (
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#000' : 'var(--volt)' }} />
              )}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <div className="display" style={{ fontSize: 22, color: 'var(--fg-3)' }}>DÍA DE DESCANSO<span style={{ color: 'var(--volt)' }}>.</span></div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 8 }}>SIN CLASES PROGRAMADAS</div>
          </div>
        ) : list.map((c) => {
          const booked = bookedIds.has(c.id)
          const full = c.spots === 0
          const iColor = intensityColor(c.intensity)
          return (
            <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ width: 78, padding: '18px 0 18px 18px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="display" style={{ fontSize: 24, color: 'var(--fg)' }}>{c.time}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.dur} MIN</div>
                  <div style={{ marginTop: 8, width: 24, height: 3, background: iColor, borderRadius: 2 }} />
                  <div className="eyebrow" style={{ fontSize: 9, marginTop: 4, color: iColor }}>{c.intensity}</div>
                </div>
                <div style={{ flex: 1, padding: '16px 16px 16px 14px' }}>
                  <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.1 }}>{c.type}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-3)', border: '1px solid var(--volt)', display: 'grid', placeItems: 'center', fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 8, color: 'var(--fg)' }}>
                      {c.coach.split(' ')[1][0]}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{c.coach}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)' }}>· {c.coachRole}</div>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ fontSize: 10, color: full ? '#FF5757' : 'var(--fg-3)' }}>
                        {full ? 'LLENO' : `${c.spots} / ${c.total} LUGARES`}
                      </div>
                      <div style={{ marginTop: 4, height: 3, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(1 - c.spots / c.total) * 100}%`, background: full ? '#FF5757' : c.spots <= 3 ? '#FF7A3D' : 'var(--volt)' }} />
                      </div>
                    </div>
                    <button
                      onClick={() => { if (!booked && !full && credits > 0) onBook(c.id) }}
                      disabled={full || (credits === 0 && !booked)}
                      className="btn"
                      style={{
                        height: 38,
                        padding: booked ? '0 14px' : '0 16px',
                        borderRadius: 12,
                        fontSize: 11,
                        background: booked ? 'transparent' : full ? 'var(--bg-3)' : 'var(--volt)',
                        color: booked ? 'var(--volt)' : full ? 'var(--fg-3)' : '#000',
                        border: booked ? '1px solid var(--volt)' : 'none',
                        cursor: full || (credits === 0 && !booked) ? 'not-allowed' : 'pointer',
                        opacity: full ? 0.5 : 1,
                      }}
                    >
                      {booked ? <><Icon.Check style={{ width: 14, height: 14 }} /> RESERVADO</> : full ? 'LLENO' : '+ RESERVAR · 1 CR'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ height: 18 }} />
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-2)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--volt-soft)', display: 'grid', placeItems: 'center' }}>
          <Icon.Plus style={{ width: 18, height: 18, color: 'var(--volt)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>¿NECESITAS MÁS CRÉDITOS?</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>Pack x10 · €89 · Sin vencimiento</div>
        </div>
        <Icon.Arrow style={{ width: 16, height: 16, color: 'var(--fg-3)' }} />
      </div>
    </div>
  )
}
