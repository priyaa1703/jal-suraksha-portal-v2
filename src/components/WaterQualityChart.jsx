import { useEffect, useMemo, useRef, useState } from 'react'
import { PARAM_KEYS, RULES, buildTrend } from '../logic/decisionEngine.js'

const W = 640
const H = 210
const PAD_L = 46
const PAD_R = 54
const PAD_T = 14
const PAD_B = 30

const RAW_COLOR = '#4146BD'
const TREATED_COLOR = '#238B45'
const LIMIT_COLOR = '#FF6A00'

function AnimatedPath({ d, color }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.style.strokeDasharray = 'none'
      return
    }
    const len = el.getTotalLength()
    el.style.transition = 'none'
    el.style.strokeDasharray = String(len)
    el.style.strokeDashoffset = String(len)
    el.getBoundingClientRect() // force reflow so the transition restarts
    el.style.transition = 'stroke-dashoffset 1.1s ease-out'
    el.style.strokeDashoffset = '0'
  }, [d])

  return <path ref={ref} d={d} fill="none" stroke={color} strokeWidth="2.2" />
}

function LineChart({ paramKey, data }) {
  const rule = RULES[paramKey]
  const n = data.raw.length
  const values = [...data.raw, ...data.treated].map((p) => p.v).concat(rule.limits)
  let min = Math.min(...values)
  let max = Math.max(...values)
  const pad = (max - min || 1) * 0.12
  min -= pad
  max += pad

  const x = (i) => PAD_L + (i * (W - PAD_L - PAD_R)) / (n - 1)
  const y = (v) => H - PAD_B - ((v - min) / (max - min)) * (H - PAD_T - PAD_B)
  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ')

  const ticks = [0, 1, 2, 3].map((i) => min + ((max - min) * i) / 3)
  const rawPath = toPath(data.raw)
  const treatedPath = toPath(data.treated)

  return (
    <div className="chart-svg-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${rule.label} raw versus treated water, last 24 hours`}
        style={{ minWidth: '480px', width: '100%' }}
      >
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={PAD_L} x2={W - PAD_R} y1={y(t)} y2={y(t)} stroke="#E4E4E1" strokeWidth="1" />
            <text x={PAD_L - 6} y={y(t) + 3} textAnchor="end" className="chart-axis-label">{rule.fmt(t)}</text>
          </g>
        ))}

        {rule.limits.map((l) => (
          <g key={l}>
            <line x1={PAD_L} x2={W - PAD_R} y1={y(l)} y2={y(l)} stroke={LIMIT_COLOR} strokeWidth="1.3" strokeDasharray="5 4" />
            <text x={W - PAD_R + 4} y={y(l) + 3} className="chart-limit-label">Limit {rule.fmt(l)}</text>
          </g>
        ))}

        <AnimatedPath d={treatedPath} color={TREATED_COLOR} />
        <AnimatedPath d={rawPath} color={RAW_COLOR} />

        {data.raw.map((p, i) => (
          <g key={p.t}>
            <circle cx={x(i)} cy={y(p.v)} r="2.6" fill={RAW_COLOR} />
            <circle cx={x(i)} cy={y(data.treated[i].v)} r="2.6" fill={TREATED_COLOR} />
            <text x={x(i)} y={H - 10} textAnchor="middle" className="chart-point-label">{p.t}</text>
          </g>
        ))}

        <text x={PAD_L} y={9} className="chart-axis-label">{rule.unit ? `Value (${rule.unit})` : 'Value'}</text>
      </svg>
    </div>
  )
}

export default function WaterQualityChart({ site, analysis }) {
  const [tab, setTab] = useState(PARAM_KEYS[0])
  const rule = RULES[tab]

  const data = useMemo(
    () => (analysis.hasData ? buildTrend(site, tab, analysis.route) : null),
    [site, tab, analysis.hasData, analysis.route],
  )

  return (
    <section className="govbox" aria-labelledby="wq-chart-heading">
      <div className="govbox-header" id="wq-chart-heading">WATER QUALITY TREND</div>
      <div className="govbox-body">
        <div className="chart-tabs" role="tablist" aria-label="Select parameter">
          {PARAM_KEYS.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={key === tab}
              className={key === tab ? 'active' : ''}
              onClick={() => setTab(key)}
            >
              {RULES[key].tab}
            </button>
          ))}
        </div>

        <p className="chart-title">{rule.label} Monitoring — Raw vs Treated — Last 24 Hours</p>

        {data ? (
          <>
            <div className="chart-legend">
              <span><i style={{ borderTopColor: RAW_COLOR }} />Raw water (inlet)</span>
              <span><i style={{ borderTopColor: TREATED_COLOR }} />Treated water (outlet)</span>
              <span><i className="dashed" />Limit</span>
            </div>
            <div className="chart-area">
              <LineChart paramKey={tab} data={data} />
            </div>
            {analysis.route === 'light' && (
              <p className="table-note">Light Path (UV-C only): treated readings are unchanged from raw, so the two lines overlap.</p>
            )}
          </>
        ) : (
          <div className="chart-area chart-empty">No data — unit offline. Trend will resume when the ESP32 reconnects.</div>
        )}
      </div>
    </section>
  )
}
