const VOLT_DATA = {
  user: {
    name: 'Alex Mendez',
    initials: 'AM',
    handle: '@alex.mendez',
    streak: 5,
    credits: 12,
    membership: 'PERFORMANCE',
    memberSince: 'ENE 2024',
    expires: '31 DIC, 2026',
    creditsTotal: 20,
    weeklyGoal: 5,
    sessionsThisWeek: 4,
  },

  classes: {
    0: [
      { id: 'c1', time: '06:30', dur: 60, type: 'SIM. CARRERA HÍBRIDA', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 4, total: 16, intensity: 'PICO' },
      { id: 'c2', time: '12:00', dur: 45, type: 'FUERZA & POTENCIA', coach: 'Coach Sofia', coachRole: 'Fuerza Lead', spots: 8, total: 12, intensity: 'ALTO' },
      { id: 'c3', time: '18:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 2, total: 16, intensity: 'PICO' },
      { id: 'c4', time: '20:00', dur: 45, type: 'RECUPERACIÓN', coach: 'Coach Marin', coachRole: 'Movilidad', spots: 11, total: 14, intensity: 'BAJO' },
    ],
    1: [
      { id: 'c5', time: '07:00', dur: 60, type: 'FUERZA & POTENCIA', coach: 'Coach Sofia', coachRole: 'Fuerza Lead', spots: 6, total: 12, intensity: 'ALTO' },
      { id: 'c6', time: '17:30', dur: 60, type: 'SIM. CARRERA HÍBRIDA', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 1, total: 16, intensity: 'PICO' },
      { id: 'c7', time: '19:00', dur: 45, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Acondicionamiento', spots: 9, total: 16, intensity: 'ALTO' },
    ],
    2: [
      { id: 'c8', time: '06:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 5, total: 16, intensity: 'PICO' },
      { id: 'c9', time: '12:30', dur: 45, type: 'CORE & ESTABILIDAD', coach: 'Coach Marin', coachRole: 'Movilidad', spots: 7, total: 14, intensity: 'MED' },
      { id: 'c10', time: '18:00', dur: 60, type: 'SIM. CARRERA HÍBRIDA', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 0, total: 16, intensity: 'PICO' },
    ],
    3: [
      { id: 'c11', time: '07:00', dur: 60, type: 'FUERZA & POTENCIA', coach: 'Coach Sofia', coachRole: 'Fuerza Lead', spots: 4, total: 12, intensity: 'ALTO' },
      { id: 'c12', time: '17:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Acondicionamiento', spots: 6, total: 16, intensity: 'ALTO' },
    ],
    4: [
      { id: 'c13', time: '06:30', dur: 60, type: 'SIM. CARRERA HÍBRIDA', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 3, total: 16, intensity: 'PICO' },
      { id: 'c14', time: '12:00', dur: 45, type: 'RECUPERACIÓN', coach: 'Coach Marin', coachRole: 'Movilidad', spots: 10, total: 14, intensity: 'BAJO' },
      { id: 'c15', time: '18:30', dur: 60, type: 'FUERZA & POTENCIA', coach: 'Coach Sofia', coachRole: 'Fuerza Lead', spots: 5, total: 12, intensity: 'ALTO' },
    ],
    5: [
      { id: 'c16', time: '09:00', dur: 75, type: 'SIM. CARRERA HÍBRIDA', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 8, total: 20, intensity: 'PICO' },
      { id: 'c17', time: '11:00', dur: 45, type: 'CORE & ESTABILIDAD', coach: 'Coach Marin', coachRole: 'Movilidad', spots: 6, total: 14, intensity: 'MED' },
    ],
    6: [
      { id: 'c18', time: '10:00', dur: 60, type: 'RECUPERACIÓN', coach: 'Coach Marin', coachRole: 'Movilidad', spots: 12, total: 14, intensity: 'BAJO' },
    ],
  },

  menu: [
    { id: 'm1', name: 'Shake Post-Entreno Whey', cat: 'SHAKES', price: 8.5, kcal: 220, protein: 32, desc: 'Whey prensado en frío, plátano, leche de avena, canela.', tag: 'TOP VENTA' },
    { id: 'm2', name: 'Bowl Proteico Keto', cat: 'BOWLS', price: 14.0, kcal: 540, protein: 42, desc: 'Pollo a la plancha, aguacate, huevos, hojas verdes.', tag: 'CHEF' },
    { id: 'm3', name: 'Espresso Ignición', cat: 'COFFEE', price: 4.5, kcal: 6, protein: 0, desc: 'Doble shot, aceite MCT, cacao oscuro.', tag: 'PRE' },
    { id: 'm4', name: 'Stack de Carbos Race Day', cat: 'BOWLS', price: 12.0, kcal: 620, protein: 28, desc: 'Camote, arroz jazmín, salmón con miso.', tag: 'NUEVO' },
    { id: 'm5', name: 'Carga de Electrolitos', cat: 'SHAKES', price: 5.0, kcal: 25, protein: 0, desc: 'Sodio, magnesio, limón, agua de coco.', tag: 'INTRA' },
    { id: 'm6', name: 'Smoothie de Recuperación', cat: 'SHAKES', price: 9.0, kcal: 310, protein: 28, desc: 'Cereza ácida, caseína, mantequilla de almendra, cacao.', tag: 'POST' },
    { id: 'm7', name: 'Creatina + Beta-Alanina', cat: 'SUPLEMENTOS', price: 6.0, kcal: 15, protein: 5, desc: 'Dosis estándar 5g + 3.2g, sabor neutro.', tag: 'PRE' },
    { id: 'm8', name: 'Pack Vitamínico D3 + K2', cat: 'SUPLEMENTOS', price: 4.0, kcal: 0, protein: 0, desc: 'Vitamina D3 2000UI con K2-MK7 para absorción óptima.', tag: 'DIARIO' },
  ],

  biometrics: {
    weight: [78.2, 77.6, 77.1, 76.4, 75.9, 75.3, 75.0],
    bodyFat: [18, 17.3, 16.6, 15.8, 15.1, 14.5, 14.0],
    muscle: [42, 42.4, 43.0, 43.5, 44.0, 44.6, 45.0],
    rhr: [62, 61, 60, 60, 59, 58, 58],
    weeks: ['S22', 'S23', 'S24', 'S25', 'S26', 'S27', 'S28'],
  },

  weeklyVolume: [
    { day: 'LUN', val: 62 },
    { day: 'MAR', val: 80 },
    { day: 'MIÉ', val: 45 },
    { day: 'JUE', val: 90 },
    { day: 'VIE', val: 70 },
    { day: 'SÁB', val: 32 },
    { day: 'DOM', val: 0 },
  ],

  prescription: [
    { phase: 'MAÑANA', time: '06:00', item: 'Vitamina D3 + K2 / Omega-3', status: 'done' },
    { phase: 'PRE-ENTRENO', time: '17:30', item: 'Creatina 5g + Beta-Alanina', status: 'done' },
    { phase: 'POST-ENTRENO', time: '19:00', item: 'Whey Isolate 30g + Carbos', status: 'now' },
    { phase: 'CENA', time: '20:30', item: 'Plato alto en proteína, bajo glucémico', status: 'locked' },
    { phase: 'NOCHE', time: '22:30', item: 'Glicinato de Magnesio 400mg', status: 'locked' },
  ],

  consultants: [
    { name: 'Dra. Lena Park', role: 'Nutrición Deportiva', next: 'MAR 14:00', avail: true },
    { name: 'Marcus Vega', role: 'Fisio de Fuerza', next: 'MIÉ 09:30', avail: true },
    { name: 'Dr. Iris Cole', role: 'Medicina del Rendimiento', next: 'VIE 16:00', avail: false },
  ],

  event: {
    name: 'SIM. CARRERA HÍBRIDA // OPEN VERANO',
    subtitle: '8 ESTACIONES · SPLITS DE 1KM · CAP 90 MIN',
    venue: 'VOLT // HPX HANGAR 04',
    city: 'BERLÍN — KREUZBERG',
    heats: [
      { id: 'h1', time: '09:00', label: 'OPEN MASCULINO', spots: 14, total: 32 },
      { id: 'h2', time: '10:30', label: 'OPEN FEMENINO', spots: 6, total: 32 },
      { id: 'h3', time: '12:00', label: 'PRO MIXTO', spots: 2, total: 24 },
      { id: 'h4', time: '13:30', label: 'DUPLAS', spots: 18, total: 40 },
    ],
    price: 65,
  },

  pastEvents: [
    { name: 'CIRCUITO DE INVIERNO', date: 'ENE 18', place: '08 / 124', time: '52:14' },
    { name: 'CLASH DE PRIMAVERA', date: 'ABR 02', place: '12 / 96', time: '48:51' },
  ],
}

export default VOLT_DATA
