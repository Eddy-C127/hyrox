const VOLT_DATA = {
  user: {
    name: 'Alex Mendez',
    initials: 'AM',
    handle: '@alex.mendez',
    streak: 5,
    credits: 12,
    membership: 'PERFORMANCE',
    memberSince: 'JAN 2024',
    expires: 'DEC 31, 2026',
    creditsTotal: 20,
    weeklyGoal: 5,
    sessionsThisWeek: 4,
  },

  classes: {
    0: [
      { id: 'c1', time: '06:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 4, total: 16, intensity: 'PEAK' },
      { id: 'c2', time: '12:00', dur: 45, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 8, total: 12, intensity: 'HIGH' },
      { id: 'c3', time: '18:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 2, total: 16, intensity: 'PEAK' },
      { id: 'c4', time: '20:00', dur: 45, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 11, total: 14, intensity: 'LOW' },
    ],
    1: [
      { id: 'c5', time: '07:00', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 6, total: 12, intensity: 'HIGH' },
      { id: 'c6', time: '17:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 1, total: 16, intensity: 'PEAK' },
      { id: 'c7', time: '19:00', dur: 45, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Conditioning', spots: 9, total: 16, intensity: 'HIGH' },
    ],
    2: [
      { id: 'c8', time: '06:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 5, total: 16, intensity: 'PEAK' },
      { id: 'c9', time: '12:30', dur: 45, type: 'CORE & STABILITY', coach: 'Coach Marin', coachRole: 'Mobility', spots: 7, total: 14, intensity: 'MED' },
      { id: 'c10', time: '18:00', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 0, total: 16, intensity: 'PEAK' },
    ],
    3: [
      { id: 'c11', time: '07:00', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 4, total: 12, intensity: 'HIGH' },
      { id: 'c12', time: '17:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Conditioning', spots: 6, total: 16, intensity: 'HIGH' },
    ],
    4: [
      { id: 'c13', time: '06:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 3, total: 16, intensity: 'PEAK' },
      { id: 'c14', time: '12:00', dur: 45, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 10, total: 14, intensity: 'LOW' },
      { id: 'c15', time: '18:30', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 5, total: 12, intensity: 'HIGH' },
    ],
    5: [
      { id: 'c16', time: '09:00', dur: 75, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 8, total: 20, intensity: 'PEAK' },
      { id: 'c17', time: '11:00', dur: 45, type: 'CORE & STABILITY', coach: 'Coach Marin', coachRole: 'Mobility', spots: 6, total: 14, intensity: 'MED' },
    ],
    6: [
      { id: 'c18', time: '10:00', dur: 60, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 12, total: 14, intensity: 'LOW' },
    ],
  },

  menu: [
    { id: 'm1', name: 'Post-Workout Whey Shake', cat: 'SHAKES', price: 8.5, kcal: 220, protein: 32, desc: 'Cold-pressed whey, banana, oat milk, cinnamon.', tag: 'BESTSELLER' },
    { id: 'm2', name: 'Keto Protein Bowl', cat: 'BOWLS', price: 14.0, kcal: 540, protein: 42, desc: 'Grilled chicken, avocado, eggs, leafy greens.', tag: 'CHEF' },
    { id: 'm3', name: 'Engine Ignition Espresso', cat: 'COFFEE', price: 4.5, kcal: 6, protein: 0, desc: 'Double shot, MCT oil, dark cacao.', tag: 'PRE' },
    { id: 'm4', name: 'Race Day Carb Stack', cat: 'BOWLS', price: 12.0, kcal: 620, protein: 28, desc: 'Sweet potato, jasmine rice, miso salmon.', tag: 'NEW' },
    { id: 'm5', name: 'Electrolyte Charge', cat: 'SHAKES', price: 5.0, kcal: 25, protein: 0, desc: 'Sodium, magnesium, lime, coconut water.', tag: 'INTRA' },
    { id: 'm6', name: 'Recovery Smoothie', cat: 'SHAKES', price: 9.0, kcal: 310, protein: 28, desc: 'Tart cherry, casein, almond butter, cacao.', tag: 'POST' },
  ],

  biometrics: {
    weight: [78.2, 77.6, 77.1, 76.4, 75.9, 75.3, 75.0],
    bodyFat: [18, 17.3, 16.6, 15.8, 15.1, 14.5, 14.0],
    muscle: [42, 42.4, 43.0, 43.5, 44.0, 44.6, 45.0],
    rhr: [62, 61, 60, 60, 59, 58, 58],
    weeks: ['W22', 'W23', 'W24', 'W25', 'W26', 'W27', 'W28'],
  },

  weeklyVolume: [
    { day: 'MON', val: 62 },
    { day: 'TUE', val: 80 },
    { day: 'WED', val: 45 },
    { day: 'THU', val: 90 },
    { day: 'FRI', val: 70 },
    { day: 'SAT', val: 32 },
    { day: 'SUN', val: 0 },
  ],

  prescription: [
    { phase: 'MORNING', time: '06:00', item: 'Vitamin D3 + K2 / Omega-3', status: 'done' },
    { phase: 'PRE-TRAIN', time: '17:30', item: 'Creatine 5g + Beta-Alanine', status: 'done' },
    { phase: 'POST-TRAIN', time: '19:00', item: 'Whey Isolate 30g + Carbs', status: 'now' },
    { phase: 'DINNER', time: '20:30', item: 'High-protein, low-glycemic plate', status: 'locked' },
    { phase: 'NIGHT', time: '22:30', item: 'Magnesium Glycinate 400mg', status: 'locked' },
  ],

  consultants: [
    { name: 'Dr. Lena Park', role: 'Sports Nutrition', next: 'TUE 14:00', avail: true },
    { name: 'Marcus Vega', role: 'Strength Physio', next: 'WED 09:30', avail: true },
    { name: 'Dr. Iris Cole', role: 'Performance MD', next: 'FRI 16:00', avail: false },
  ],

  event: {
    name: 'HYBRID RACE SIM // SUMMER OPEN',
    subtitle: '8 STATIONS · 1 KM SPLITS · 90 MIN CAP',
    venue: 'VOLT // HPX HANGAR 04',
    city: 'BERLIN — KREUZBERG',
    heats: [
      { id: 'h1', time: '09:00', label: 'OPEN MEN', spots: 14, total: 32 },
      { id: 'h2', time: '10:30', label: 'OPEN WOMEN', spots: 6, total: 32 },
      { id: 'h3', time: '12:00', label: 'PRO MIXED', spots: 2, total: 24 },
      { id: 'h4', time: '13:30', label: 'DOUBLES', spots: 18, total: 40 },
    ],
    price: 65,
  },

  pastEvents: [
    { name: 'WINTER CIRCUIT', date: 'JAN 18', place: '08 / 124', time: '52:14' },
    { name: 'SPRING CLASH', date: 'APR 02', place: '12 / 96', time: '48:51' },
  ],
}

export default VOLT_DATA
