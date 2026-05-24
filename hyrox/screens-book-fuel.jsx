// ============================================
// BOOKING SCREEN
// ============================================
function BookScreen({ classes, credits, onBook, bookedIds, onSpend }) {
  const [day, setDay] = React.useState(0);
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dates = [24, 25, 26, 27, 28, 29, 30];

  const list = classes[day] || [];

  return (
    <div className="scroll page-enter">
      {/* Header */}
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">SCHEDULE</div>
            <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>BOOK<span style={{ color: 'var(--volt)' }}>.</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="display" style={{ fontSize: 28, color: 'var(--volt)' }}>{credits}</div>
            <div className="eyebrow">CREDITS</div>
          </div>
        </div>
      </div>

      {/* Day swiper */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18, marginLeft: -20, paddingLeft: 20, paddingRight: 20, scrollbarWidth: 'none' }}>
        {days.map((d, i) => {
          const active = i === day;
          return (
            <button
              key={d}
              onClick={() => setDay(i)}
              className={'card ' + (active ? '' : '')}
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
              }}
            >
              <div className="eyebrow" style={{ color: active ? 'rgba(0,0,0,0.6)' : 'var(--fg-3)' }}>{d}</div>
              <div className="display" style={{ fontSize: 28, color: 'inherit' }}>{dates[i]}</div>
              {(classes[i] || []).length > 0 && (
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#000' : 'var(--volt)' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Class list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <div className="display" style={{ fontSize: 22, color: 'var(--fg-3)' }}>REST DAY<span style={{ color: 'var(--volt)' }}>.</span></div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 8 }}>NO CLASSES SCHEDULED</div>
          </div>
        ) : list.map((c) => {
          const booked = bookedIds.has(c.id);
          const full = c.spots === 0;
          const intensityColor = c.intensity === 'PEAK' ? 'var(--volt)' : c.intensity === 'HIGH' ? '#FF7A3D' : c.intensity === 'MED' ? '#5BC0FF' : '#9CA3AF';
          return (
            <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Time column */}
                <div style={{ width: 78, padding: '18px 0 18px 18px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="display" style={{ fontSize: 24, color: 'var(--fg)' }}>{c.time}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.dur} MIN</div>
                  <div style={{ marginTop: 8, width: 24, height: 3, background: intensityColor, borderRadius: 2 }} />
                  <div className="eyebrow" style={{ fontSize: 9, marginTop: 4, color: intensityColor }}>{c.intensity}</div>
                </div>
                {/* Content */}
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="mono" style={{ fontSize: 10, color: full ? '#FF5757' : 'var(--fg-3)' }}>
                          {full ? 'FULL' : `${c.spots} / ${c.total} SPOTS`}
                        </div>
                      </div>
                      <div style={{ marginTop: 4, height: 3, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(1 - c.spots / c.total) * 100}%`, background: full ? '#FF5757' : c.spots <= 3 ? '#FF7A3D' : 'var(--volt)' }} />
                      </div>
                    </div>
                    <button
                      onClick={() => { if (!booked && !full && credits > 0) { onBook(c.id); onSpend(); } }}
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
                      {booked ? <><Icon.Check style={{ width: 14, height: 14 }} /> BOOKED</> : full ? 'FULL' : '+ BOOK · 1 CR'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 18 }} />
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-2)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--volt-soft)', display: 'grid', placeItems: 'center' }}>
          <Icon.Plus style={{ width: 18, height: 18, color: 'var(--volt)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>NEED MORE CREDITS?</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>10-pack · €89 · No expiry</div>
        </div>
        <Icon.Arrow style={{ width: 16, height: 16, color: 'var(--fg-3)' }} />
      </div>
    </div>
  );
}
window.BookScreen = BookScreen;

// ============================================
// FUEL BAR SCREEN
// ============================================
function FuelScreen({ menu, cart, setCart, showToast }) {
  const [mode, setMode] = React.useState('menu'); // menu | preorder
  const [bagOpen, setBagOpen] = React.useState(false);

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const items = cart.reduce((s, x) => s + x.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === item.id);
      if (ex) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p).filter(p => p.qty > 0));
  };

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">CAFETERIA</div>
            <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>FUEL<span style={{ color: 'var(--volt)' }}>.</span></div>
          </div>
          <button onClick={() => setBagOpen(true)} style={{ position: 'relative', width: 52, height: 52, borderRadius: 16, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--fg)' }}>
            <Icon.Cart style={{ width: 22, height: 22 }} />
            {items > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 22, height: 22, padding: '0 6px', borderRadius: 11, background: 'var(--volt)', color: '#000', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center', boxShadow: '0 0 12px var(--volt-glow)' }}>{items}</span>
            )}
          </button>
        </div>
      </div>

      {/* Toggle */}
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 16, padding: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 18 }}>
        {[['menu', "TODAY'S MENU"], ['preorder', 'PRE-ORDER']].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            style={{
              height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: mode === k ? 'var(--volt)' : 'transparent',
              color: mode === k ? '#000' : 'var(--fg-2)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >{label}</button>
        ))}
      </div>

      {mode === 'menu' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· CHEF'S PICKS · TODAY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {menu.map((item) => (
              <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '1.05' }}>
                  <Photo tag={item.cat} style={{ position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--volt)', color: '#000', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 7px', borderRadius: 6 }}>{item.tag}</div>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>{item.kcal} kcal</div>
                </div>
                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.15 }}>{item.name}</div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 4 }}>{item.protein}g protein</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <div className="display" style={{ fontSize: 18, color: 'var(--fg)' }}>€{item.price.toFixed(2)}</div>
                    <button
                      onClick={() => addToCart(item)}
                      style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--volt)', color: '#000', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                    >
                      <Icon.Plus style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'preorder' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· EXPRESS · READY AT BAR</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {menu.map((item) => {
              const c = cart.find(p => p.id === item.id);
              return (
                <div key={item.id} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
                  <Photo tag="" style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{item.kcal} kcal · {item.protein}g protein</div>
                    <div className="display" style={{ fontSize: 14, color: 'var(--volt)', marginTop: 4 }}>€{item.price.toFixed(2)}</div>
                  </div>
                  {c ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-3)', borderRadius: 12, padding: 4 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Minus style={{ width: 14, height: 14 }} /></button>
                      <div className="display" style={{ fontSize: 14, color: 'var(--fg)', minWidth: 12, textAlign: 'center' }}>{c.qty}</div>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--volt)', border: 'none', color: '#000', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Plus style={{ width: 14, height: 14 }} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="btn" style={{ height: 38, padding: '0 14px', borderRadius: 12, background: 'var(--bg-3)', color: 'var(--fg)', fontSize: 10, border: '1px solid var(--line)' }}>+ ADD</button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {bagOpen && (
        <BagDrawer cart={cart} updateQty={updateQty} total={total} onClose={() => setBagOpen(false)} onComplete={() => { setBagOpen(false); setCart([]); showToast('READY IN 10 MIN · PICKUP AT BAR'); }} />
      )}
    </div>
  );
}
window.FuelScreen = FuelScreen;

function BagDrawer({ cart, updateQty, total, onClose, onComplete }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">EXPRESS BAG</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>YOUR ORDER</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cart.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 20, color: 'var(--fg-3)' }}>EMPTY BAG<span style={{ color: 'var(--volt)' }}>.</span></div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 6 }}>ADD ITEMS TO PRE-ORDER</div>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <Photo tag="" style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{item.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>€{item.price.toFixed(2)} · qty {item.qty}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-3)', borderRadius: 10, padding: 3 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 7, background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Minus style={{ width: 12, height: 12 }} /></button>
                <div className="display" style={{ fontSize: 12, color: 'var(--fg)', minWidth: 12, textAlign: 'center' }}>{item.qty}</div>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 7, background: 'var(--volt)', border: 'none', color: '#000', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Plus style={{ width: 12, height: 12 }} /></button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <>
            <div style={{ marginTop: 14, padding: 14, background: 'var(--bg-2)', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>SUBTOTAL</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>€{total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>MEMBER DISCOUNT</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--volt)' }}>-10%</span>
              </div>
              <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="display" style={{ fontSize: 16, color: 'var(--fg)' }}>TOTAL</span>
                <span className="display" style={{ fontSize: 26, color: 'var(--volt)' }}>€{(total * 0.9).toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-volt" onClick={onComplete} style={{ width: '100%', marginTop: 14 }}>
              COMPLETE PRE-ORDER <Icon.Arrow />
            </button>
            <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>READY IN ~10 MIN · PICKUP AT BAR</div>
          </>
        )}
      </div>
    </div>
  );
}
