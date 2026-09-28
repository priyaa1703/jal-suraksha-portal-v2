// Client-side mirror of the ESP32 threshold logic described in the SIH idea
// presentation (slides 2-3). Everything here is demo logic on mock data.
//
//   1. Five sensor readings are compared with limits.
//   2. All within limits  -> LIGHT PATH (skips filtration / RO / modules).
//      Any out of limits  -> FULL TREATMENT PATH.
//   3. Full path runs the core platform (sediment, pH neutralization,
//      activated carbon, iron removal), then the region modules installed at
//      the site, then the TDS fork (UF, or RO when TDS is high).
//   4. Every path ends in UV-C, then post-treatment verification.

export const PARAM_KEYS = ['pH', 'turbidity', 'tds', 'temperature', 'orp']

const int = (v) => Math.round(v).toLocaleString('en-IN')

// Limits: pH 6.5-8.5, turbidity < 5 NTU, TDS < 500 mg/L come from the PPT
// workflow slide. Temperature and ORP limits are configurable demo values.
export const RULES = {
  pH: {
    label: 'pH',
    tab: 'pH',
    unit: '',
    range: '6.5 – 8.5',
    fmt: (v) => v.toFixed(2),
    test: (v) => v >= 6.5 && v <= 8.5,
    reason: (f, v) =>
      v < 6.5
        ? `pH ${f} is below 6.5 — acidic water (possible acid mine drainage)`
        : `pH ${f} is above 8.5 — alkaline water`,
    limits: [6.5, 8.5],
    decimals: 2,
    amp: 0.06,
  },
  turbidity: {
    label: 'Turbidity',
    tab: 'Turbidity',
    unit: 'NTU',
    range: '< 5 NTU',
    fmt: (v) => v.toFixed(1),
    test: (v) => v < 5,
    reason: (f) => `Turbidity ${f} is not below 5 NTU — suspended particles`,
    limits: [5],
    decimals: 1,
    amp: 0.4,
  },
  tds: {
    label: 'TDS',
    tab: 'TDS',
    unit: 'mg/L',
    range: '< 500 mg/L',
    fmt: int,
    test: (v) => v < 500,
    reason: (f) => `TDS ${f} is not below 500 mg/L — dissolved solids high`,
    limits: [500],
    decimals: 0,
    amp: 14,
  },
  temperature: {
    label: 'Temperature',
    tab: 'Temperature',
    unit: '°C',
    range: '20 – 30 °C',
    fmt: (v) => v.toFixed(1),
    test: (v) => v >= 20 && v <= 30,
    reason: (f) => `Temperature ${f} is outside 20 – 30 °C`,
    limits: [20, 30],
    decimals: 1,
    amp: 0.5,
  },
  orp: {
    label: 'ORP',
    tab: 'ORP',
    unit: 'mV',
    range: '> 150 mV',
    fmt: int,
    test: (v) => v > 150,
    reason: (f) => `ORP ${f} is not above 150 mV — reducing water (dissolved iron / manganese likely)`,
    limits: [150],
    decimals: 0,
    amp: 9,
  },
}

export const MODULE_LABEL = {
  fluoride: 'Fluoride removal (activated alumina)',
  heavyMetal: 'Heavy-metal adsorption (ion-exchange resin)',
}

export const STRIP_RULES = [
  { key: 'fe', label: 'Iron (Fe)', limit: 1.0, limitText: '≤ 1.0 mg/L' },
  { key: 'f', label: 'Fluoride (F⁻)', limit: 1.5, limitText: '≤ 1.5 mg/L' },
  { key: 'as', label: 'Arsenic (As)', limit: 0.01, limitText: '≤ 0.01 mg/L' },
]

export function formatValue(key, v) {
  if (v == null) return '—'
  const r = RULES[key]
  return `${r.fmt(v)}${r.unit ? ' ' + r.unit : ''}`
}

export function formatStrip(key, v) {
  if (v == null) return '—'
  if (key === 'as' && v < 0.01) return '< 0.01 mg/L'
  return `${v.toFixed(1)} mg/L`
}

export function runChecks(readings) {
  return PARAM_KEYS.map((key) => {
    const rule = RULES[key]
    const value = readings ? readings[key] : null
    return {
      key,
      label: rule.label,
      range: rule.range,
      value,
      display: formatValue(key, value),
      ok: value == null ? null : rule.test(value),
    }
  })
}

const stage = (state, label, metric) => ({ state, label, metric })

function buildStages(site, route, tdsHigh, postOk, treatedFailures) {
  const keys = [
    'raw', 'decision', 'sediment', 'ph', 'carbon', 'iron',
    'fluoride', 'heavyMetal', 'uf', 'ro', 'uvc', 'verify', 'output',
  ]
  if (route === 'nodata') {
    return Object.fromEntries(keys.map((k) => [k, stage('nodata', 'NO DATA', 'Unit offline')]))
  }

  const full = route === 'full'
  const has = (m) => site.modules.includes(m)
  const skipped = stage('bypassed', 'BYPASSED', 'Skipped on light path')
  const core = (metric) => (full ? stage('active', 'ACTIVE', metric) : skipped)
  const moduleStage = (m, metric) =>
    !has(m)
      ? stage('notinstalled', 'NOT INSTALLED', 'Not in site profile')
      : full
        ? stage('active', 'ACTIVE', metric)
        : skipped

  const roPct = Math.max(0, Math.round((1 - site.treated.tds / site.raw.tds) * 100))

  return {
    raw: stage('active', 'ACTIVE', 'Borewell / river / storage tank'),
    decision: stage('active', 'ACTIVE', full ? 'Route: FULL TREATMENT' : 'Route: LIGHT PATH'),
    sediment: core('Efficiency 94%'),
    ph: core(`pH ${site.raw.pH.toFixed(2)} → ${site.treated.pH.toFixed(2)}`),
    carbon: core('Efficiency 91%'),
    iron: core('Efficiency 96%'),
    fluoride: moduleStage('fluoride', 'Activated alumina · 92%'),
    heavyMetal: moduleStage('heavyMetal', 'Ion-exchange resin · 93%'),
    uf: !full
      ? skipped
      : tdsHigh
        ? stage('standby', 'STANDBY', 'Not used — RO engaged for high TDS')
        : stage('active', 'ACTIVE', 'TDS within limit — UF used'),
    ro: !full
      ? skipped
      : tdsHigh
        ? stage('active', 'ENGAGED', `TDS reduction ${roPct}%`)
        : stage('standby', 'STANDBY', 'Not required — TDS within limit'),
    uvc: stage('active', 'ACTIVE', 'Intensity 92%'),
    verify: postOk
      ? stage('pass', 'PASS', 'All 5 readings within limits')
      : stage('fail', 'FAIL', `${treatedFailures.map((c) => c.label).join(', ')} out of limits`),
    output: postOk
      ? stage('pass', 'SAFE FOR USE', `Tank level ${site.tankLevel}%`)
      : stage('fail', 'HELD — RE-TREAT', 'Alert raised; water re-enters treatment'),
  }
}

export function analyze(site) {
  const hasData = site.status !== 'offline' && !!site.raw
  if (!hasData) {
    return {
      hasData: false,
      route: 'nodata',
      reasons: [],
      rawChecks: runChecks(null),
      treatedChecks: runChecks(null),
      tdsHigh: false,
      postOk: null,
      outlet: 'nodata',
      stages: buildStages(site, 'nodata', false, null, []),
    }
  }

  const rawChecks = runChecks(site.raw)
  const treatedChecks = runChecks(site.treated)
  const failing = rawChecks.filter((c) => c.ok === false)
  const route = failing.length ? 'full' : 'light'
  const reasons = failing.map((c) => RULES[c.key].reason(c.display, c.value))
  const tdsHigh = !RULES.tds.test(site.raw.tds)
  const treatedFailures = treatedChecks.filter((c) => c.ok === false)
  const postOk = treatedFailures.length === 0

  return {
    hasData: true,
    route,
    reasons,
    rawChecks,
    treatedChecks,
    tdsHigh,
    postOk,
    outlet: postOk ? 'safe' : 'retreat',
    stages: buildStages(site, route, tdsHigh, postOk, treatedFailures),
  }
}

export function quickStatusFor(site, a) {
  const off = site.status === 'offline'
  return [
    {
      label: 'System Status',
      value: off ? 'OFFLINE' : site.status === 'warning' ? 'WARNING' : 'ONLINE',
      tone: off ? 'off' : site.status === 'warning' ? 'warn' : 'good',
    },
    { label: 'Controller (ESP32)', value: off ? 'OFFLINE' : 'ONLINE', tone: off ? 'off' : 'good' },
    {
      label: 'Treatment Path',
      value: a.route === 'light' ? 'LIGHT PATH' : a.route === 'full' ? 'FULL TREATMENT' : 'NO DATA',
      tone: a.route === 'light' ? 'good' : a.route === 'full' ? 'info' : 'off',
    },
    {
      label: 'Water Quality',
      value: a.outlet === 'safe' ? 'SAFE' : a.outlet === 'retreat' ? 'RE-TREAT' : 'NO DATA',
      tone: a.outlet === 'safe' ? 'good' : a.outlet === 'retreat' ? 'bad' : 'off',
    },
    {
      label: 'Purification',
      value: a.outlet === 'safe' ? 'ACTIVE' : a.outlet === 'retreat' ? 'RE-TREATING' : 'OFFLINE',
      tone: a.outlet === 'safe' ? 'good' : a.outlet === 'retreat' ? 'bad' : 'off',
    },
    { label: 'Network', value: off ? 'DISCONNECTED' : 'CONNECTED', tone: off ? 'off' : 'good' },
  ]
}

export function productionFor(site) {
  const p = site.production
  if (!p) {
    return ['Raw Water Processed', 'Purified Water Produced', 'Water Rejected', 'Purification Efficiency', 'People Served', 'System Uptime']
      .map((metric) => ({ metric, value: '—' }))
  }
  const rejected = p.raw - p.purified
  return [
    { metric: 'Raw Water Processed', value: `${p.raw.toLocaleString('en-IN')} L` },
    { metric: 'Purified Water Produced', value: `${p.purified.toLocaleString('en-IN')} L` },
    { metric: 'Water Rejected', value: `${rejected.toLocaleString('en-IN')} L` },
    { metric: 'Purification Efficiency', value: `${((p.purified / p.raw) * 100).toFixed(1)}%` },
    { metric: 'People Served', value: String(p.people) },
    { metric: 'System Uptime', value: `${p.uptime}%` },
  ]
}

// ---- Trend data (deterministic mock series for the last 24 hours) ----------
export const TIMES = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00']
const WOBBLE = [-0.9, 0.2, -0.5, 0.8, 1.0, 0.1, 0.6, -0.3]

const shiftFor = (id) => [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % WOBBLE.length

function series(base, key, shift) {
  const { amp, decimals } = RULES[key]
  const factor = 10 ** decimals
  return TIMES.map((t, i) => {
    if (i === TIMES.length - 1) return { t, v: base }
    const v = base + WOBBLE[(i + shift) % WOBBLE.length] * amp
    return { t, v: Math.max(0, Math.round(v * factor) / factor) }
  })
}

export function buildTrend(site, key, route) {
  const shift = shiftFor(site.id)
  const raw = series(site.raw[key], key, shift)
  const treated = route === 'light' ? raw : series(site.treated[key], key, shift + 3)
  return { raw, treated }
}
