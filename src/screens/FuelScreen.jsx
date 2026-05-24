import React from 'react'
import { Icon, Photo } from '../primitives'

const catIcon = {
  SHAKES: Icon.Shake,
  BOWLS: Icon.Bowl,
  COFFEE: Icon.Coffee,
  SUPLEMENTOS: Icon.Supplement,
}

export function FuelScreen({ menu, cart, setCart, showToast }) {
  const [mode, setMode] = React.useState('menu')
  const [bagOpen, setBagOpen] = React.useState(false)

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0)
  const items = cart.reduce((s, x) => s + x.qty, 0)

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === item.id)
      if (ex) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...item, qty: 1 }]
    })
  }
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p).filter(p => p.qty > 0))
  }

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">CAFETERÍA</div>
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

      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 16, padding: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 18 }}>
        {[['menu', 'MENÚ DEL DÍA'], ['preorder', 'PRE-ORDEN']].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            style={{
              height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: mode === k ? 'var(--volt)' : 'transparent',
              color: mode === k ? '#000' : 'var(--fg-2)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >{label}</button>
        ))}
      </div>

      {mode === 'menu' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· SELECCIÓN DEL CHEF · HOY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {menu.map((item) => {
              const CatI = catIcon[item.cat]
              return (
                <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '1.05', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {CatI && <CatI style={{ width: 52, height: 52, color: 'var(--volt)', opacity: 0.85 }} />}
                    <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--volt)', color: '#000', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 7px', borderRadius: 6 }}>{item.tag}</div>
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>{item.kcal} kcal</div>
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', color: 'var(--fg-2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, padding: '3px 7px', borderRadius: 6, letterSpacing: '0.06em' }}>{item.cat}</div>
                  </div>
                  <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.15 }}>{item.name}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 4 }}>{item.protein}g proteína</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div className="display" style={{ fontSize: 18, color: 'var(--fg)' }}>${item.price.toLocaleString('es-MX')}</div>
                      <button
                        onClick={() => addToCart(item)}
                        style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--volt)', color: '#000', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                      >
                        <Icon.Plus style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {mode === 'preorder' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· EXPRESS · LISTO EN LA BARRA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {menu.map((item) => {
              const c = cart.find(p => p.id === item.id)
              const CatI = catIcon[item.cat]
              return (
                <div key={item.id} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0, background: 'var(--bg-3)', display: 'grid', placeItems: 'center' }}>
                    {CatI && <CatI style={{ width: 30, height: 30, color: 'var(--volt)' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{item.kcal} kcal · {item.protein}g prot.</div>
                    <div className="display" style={{ fontSize: 14, color: 'var(--volt)', marginTop: 4 }}>${item.price.toLocaleString('es-MX')}</div>
                  </div>
                  {c ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-3)', borderRadius: 12, padding: 4 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Minus style={{ width: 14, height: 14 }} /></button>
                      <div className="display" style={{ fontSize: 14, color: 'var(--fg)', minWidth: 12, textAlign: 'center' }}>{c.qty}</div>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--volt)', border: 'none', color: '#000', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Plus style={{ width: 14, height: 14 }} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="btn" style={{ height: 38, padding: '0 14px', borderRadius: 12, background: 'var(--bg-3)', color: 'var(--fg)', fontSize: 10, border: '1px solid var(--line)', fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.08em' }}>+ AGREGAR</button>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {bagOpen && (
        <BagDrawer
          cart={cart}
          updateQty={updateQty}
          total={total}
          onClose={() => setBagOpen(false)}
          onComplete={() => { setBagOpen(false); setCart([]); showToast('LISTO EN 10 MIN · RETIRA EN LA BARRA') }}
        />
      )}
    </div>
  )
}

function BagDrawer({ cart, updateQty, total, onClose, onComplete }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">BOLSA EXPRESS</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>TU PEDIDO</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cart.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 20, color: 'var(--fg-3)' }}>BOLSA VACÍA<span style={{ color: 'var(--volt)' }}>.</span></div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 6 }}>AGREGA PRODUCTOS PARA PRE-ORDENAR</div>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0, background: 'var(--bg-3)', display: 'grid', placeItems: 'center' }}>
                {catIcon[item.cat] && React.createElement(catIcon[item.cat], { style: { width: 22, height: 22, color: 'var(--volt)' } })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{item.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>${item.price.toLocaleString('es-MX')} · cant. {item.qty}</div>
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
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>${total.toLocaleString('es-MX')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>DESCUENTO MIEMBRO</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--volt)' }}>-10%</span>
              </div>
              <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="display" style={{ fontSize: 16, color: 'var(--fg)' }}>TOTAL</span>
                <span className="display" style={{ fontSize: 26, color: 'var(--volt)' }}>${Math.round(total * 0.9).toLocaleString('es-MX')}</span>
              </div>
            </div>
            <button className="btn btn-volt" onClick={onComplete} style={{ width: '100%', marginTop: 14 }}>
              CONFIRMAR PRE-ORDEN <Icon.Arrow />
            </button>
            <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>LISTO EN ~10 MIN · RETIRA EN LA BARRA</div>
          </>
        )}
      </div>
    </div>
  )
}
