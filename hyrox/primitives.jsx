// Icon set — line, 22px viewbox
const Icon = {
  Home: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>,
  Schedule: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Fuel: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 8a7 7 0 0 1 14 0v6a7 7 0 0 1-14 0z"/><path d="M9 4c.5 1 .5 2 0 3M13 4c.5 1 .5 2 0 3"/></svg>,
  Health: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>,
  Events: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 4l3 8-3 8M18 4l-3 8 3 8M12 4v16"/></svg>,
  QR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v1"/></svg>,
  Flame: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-1 4-3 4-3 8a5 5 0 0 0 10 0c0-5-5-8-5-12z"/></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5L20 6"/></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Minus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  Bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0"/></svg>,
  Sun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>,
  Moon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21 13a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowUp: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17L17 7M9 7h8v8"/></svg>,
  ArrowDown: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 7l10 10M15 17H7V9"/></svg>,
  X: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Cart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3h2l3 13h12l2-9H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Lock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  Dot: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="12" cy="12" r="4"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>,
  Coach: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
};

window.Icon = Icon;

// QR-like dot pattern (deterministic from a string seed)
function QRPattern({ seed = 'volt-hpx-AM-5' }) {
  // deterministic noise
  const cells = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      h = (h * 16807) % 2147483647;
      let on = (h % 100) < 50;
      // finder patterns (top-left, top-right, bottom-left)
      const inFinder = (rr, cc, r0, c0) => rr >= r0 && rr < r0+7 && cc >= c0 && cc < c0+7;
      const finderOn = (rr, cc, r0, c0) => {
        const lr = rr - r0, lc = cc - c0;
        const onBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
        const inCore = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
        return onBorder || inCore;
      };
      if (inFinder(r,c,0,0)) on = finderOn(r,c,0,0);
      else if (inFinder(r,c,0,14)) on = finderOn(r,c,0,14);
      else if (inFinder(r,c,14,0)) on = finderOn(r,c,14,0);
      cells.push(<div key={r+'-'+c} className={on ? '' : 'off'} />);
    }
  }
  return <div className="qr-grid">{cells}</div>;
}

window.QRPattern = QRPattern;

// Photo placeholder
function Photo({ tag, style, children, className }) {
  return (
    <div className={'photo ' + (className || '')} style={style}>
      {children}
      {tag ? <div className="photo-tag">{tag}</div> : null}
    </div>
  );
}
window.Photo = Photo;

// Tiny SVG line chart with gradient fill
function LineChart({ values, color = '#CCFF00', height = 130, label = '', unit = '' }) {
  const w = 320, h = height;
  const pad = 12;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = path + ` L ${pts[pts.length-1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  const gid = 'g' + Math.random().toString(36).slice(2,7);
  return (
    <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2} fill={color} />
      ))}
      {pts.map((p, i) => (
        i === pts.length - 1
          ? <text key={'t'+i} x={p[0] - 8} y={p[1] - 12} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="currentColor" textAnchor="end">{values[i]}{unit}</text>
          : null
      ))}
    </svg>
  );
}
window.LineChart = LineChart;

// Status bar (iOS-style)
function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="11" rx="0.5"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 9.5c.8 0 1.5-.7 1.5-1.5S7.8 6.5 7 6.5s-1.5.7-1.5 1.5S6.2 9.5 7 9.5zM4.5 6c.7-.6 1.6-.9 2.5-.9s1.8.3 2.5.9l-1 1c-.4-.4-1-.6-1.5-.6s-1.1.2-1.5.6L4.5 6zM2 3.5C3.4 2.2 5.2 1.5 7 1.5s3.6.7 5 2l-1 1C9.9 3.6 8.5 3 7 3S4.1 3.6 3 4.5L2 3.5zM0 1C1.9-.9 4.4-1.5 7-1.5S12.1-.9 14 1l-1 1c-1.6-1.6-3.8-2.5-6-2.5S2.6-.6 1 1L0 1z" transform="translate(0,1)"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor"/><rect x="21" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.5"/></svg>
      </div>
    </div>
  );
}
window.StatusBar = StatusBar;
