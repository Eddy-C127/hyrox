// ============================================
// HEALTH SCREEN
// ============================================
function HealthScreen({ biometrics, prescription, consultants }) {
  const [metric, setMetric] = React.useState('weight');
  const metrics = {
    weight: { label: 'WEIGHT', unit: 'kg', values: biometrics.weight, color: '#CCFF00' },
    bodyFat: { label: 'BODY FAT', unit: '%', values: biometrics.bodyFat, color: '#FF7A3D' },
    muscle: { label: 'MUSCLE MASS', unit: '%', values: biometrics.muscle, color: '#5BC0FF' },
    rhr: { label: 'RESTING HR', unit: 'BPM', values: biometrics.rhr, color: '#F472B6' },
  };
  const cur = metrics[metric];
  const start = cur.values[0];
  const end = cur.values[cur.values.length - 1];
  const delta = (end - start).toFixed(1);
  const isImprovement = metric === 'muscle' ? delta > 0 : delta < 0;

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">HEALTH & NUTRITION</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>PROGRESS<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      {/* Metric selector */}
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

      {/* Big chart card */}
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

      {/* Mini stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 22 }}>
        <MiniStat label="BODY FAT" value="14%" delta="-4.0" good />
        <MiniStat label="MUSCLE" value="45%" delta="+3.0" good />
        <MiniStat label="RHR" value="58" delta="-4 bpm" good />
      </div>

      {/* Consultants */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>· BOOK A CONSULTANT</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {consultants.map((c, i) => (
          <div key={c.name} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)', border: '1.5px solid var(--volt)', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 14, color: 'var(--fg)' }}>
              {c.name.split(' ').map(x => x[0]).slice(0,2).join('')}
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

      {/* Prescription timeline */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>· PRESCRIPTION · TODAY</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {prescription.map((p, i) => {
          const isLast = i === prescription.length - 1;
          const isDone = p.status === 'done';
          const isNow = p.status === 'now';
          const isLocked = p.status === 'locked';
          return (
            <div key={p.phase} style={{ display: 'flex', alignItems: 'stretch', borderBottom: isLast ? 'none' : '1px solid var(--line)' }}>
              {/* Track */}
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
          );
        })}
      </div>

      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.1em', marginTop: 18 }}>
        PRESCRIBED BY · DR. LENA PARK · 14 MAY 2026
      </div>
    </div>
  );
}
window.HealthScreen = HealthScreen;

function MiniStat({ label, value, delta, good }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="eyebrow" style={{ fontSize: 9 }}>{label}</div>
      <div className="display" style={{ fontSize: 26, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      <div className="mono" style={{ fontSize: 10, color: good ? 'var(--volt)' : '#FF5757', marginTop: 2 }}>{delta}</div>
    </div>
  );
}

// ============================================
// EVENTS SCREEN
// ============================================
function EventsScreen({ event, pastEvents, showToast }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedHeat, setSelectedHeat] = React.useState(event.heats[0].id);

  // 14-day countdown
  const target = React.useMemo(() => Date.now() + 14 * 86400 * 1000, []);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const heat = event.heats.find(h => h.id === selectedHeat);

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">ARENA</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>EVENTS<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      {/* Hero event card */}
      <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', marginBottom: 14, minHeight: 460 }}>
        <Photo tag="HERO · RACE FLOOR" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)' }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(204,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div style={{ position: 'relative', padding: '22px 22px 22px', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: 460 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--volt)', color: '#000', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em' }}>
              <Icon.Dot style={{ width: 8, height: 8, animation: 'pulseVolt 1.5s infinite' }} /> LIVE TICKETS
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>EVT-2026-07</div>
          </div>

          <div style={{ flex: 1 }} />

          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>SUMMER OPEN · 2026</div>
          <div className="display" style={{ fontSize: 56, color: '#fff', letterSpacing: '-0.02em' }}>
            HYBRID<br/>RACE<br/><span style={{ color: 'var(--volt)' }}>SIM.</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 10, letterSpacing: '0.08em' }}>
            {event.subtitle}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: '#fff', letterSpacing: '0.05em' }}>
            <Icon.Pin style={{ width: 12, height: 12, color: 'var(--volt)' }} />
            {event.venue} · {event.city}
          </div>

          {/* Countdown */}
          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
              { v: d, l: 'DAYS' },
              { v: h, l: 'HRS' },
              { v: m, l: 'MIN' },
              { v: s, l: 'SEC' },
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
        SECURE YOUR HEAT · FROM €{event.price}
        <Icon.Arrow />
      </button>

      {/* Stations preview */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>8 STATIONS · 1KM SPLITS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {['SKI', 'SLED PUSH', 'SLED PULL', 'BURPEES', 'ROW', 'KB FARMER', 'LUNGES', 'WALL BALL'].map((s, i) => (
            <div key={s} style={{ aspectRatio: 1, background: 'var(--bg-3)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div className="display" style={{ fontSize: 18, color: 'var(--volt)' }}>{String(i+1).padStart(2,'0')}</div>
              <div className="mono" style={{ fontSize: 7.5, color: 'var(--fg-3)', textAlign: 'center', letterSpacing: '0.05em' }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Past events */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>· YOUR HISTORY</div>
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
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>PLACE <span style={{ color: 'var(--fg)' }}>{p.place}</span></div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>TIME <span style={{ color: 'var(--volt)' }}>{p.time}</span></div>
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
          onSecure={() => { setDrawerOpen(false); showToast('TICKET SECURED · CHECK EMAIL'); }}
        />
      )}
    </div>
  );
}
window.EventsScreen = EventsScreen;

function TicketDrawer({ event, heat, selectedHeat, setSelectedHeat, onClose, onSecure }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">SECURE TICKET</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>PICK YOUR HEAT</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          {event.heats.map(h => {
            const sel = h.id === selectedHeat;
            const full = h.spots === 0;
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
                    {full ? 'SOLD OUT' : `${h.spots} / ${h.total} SPOTS LEFT`}
                  </div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: sel ? 'none' : '1.5px solid var(--fg-3)', background: sel ? '#000' : 'transparent', display: 'grid', placeItems: 'center' }}>
                  {sel && <Icon.Check style={{ width: 12, height: 12, color: 'var(--volt)' }} />}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 18, padding: 16, background: 'var(--bg-2)', borderRadius: 16, border: '1px dashed var(--line-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">YOUR HEAT</div>
              <div className="display" style={{ fontSize: 18, marginTop: 4, color: 'var(--fg)' }}>{heat.label}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{heat.time} · {event.venue}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display" style={{ fontSize: 32, color: 'var(--volt)' }}>€{event.price}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-3)' }}>INCL. CHIP & PHOTO</div>
            </div>
          </div>
        </div>

        <button className="btn btn-volt" onClick={onSecure} style={{ width: '100%', marginTop: 14 }}>
          SECURE TICKET · €{event.price} <Icon.Arrow />
        </button>
        <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>REFUNDABLE UP TO 7 DAYS BEFORE</div>
      </div>
    </div>
  );
}
