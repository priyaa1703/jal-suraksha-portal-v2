import { RULES } from '../logic/decisionEngine.js'

function severityClass(severity) {
  if (['resolved', 'danger', 'info', 'offline'].includes(severity)) return severity
  return 'warning'
}

export function WhatsNew({ items }) {
  return (
    <section className="govbox" aria-labelledby="whats-new-heading">
      <div className="govbox-header" id="whats-new-heading">WHAT'S NEW!!</div>
      <div className="govbox-body">
        <ul className="whats-new-list">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>
          View All »
        </a>
      </div>
    </section>
  )
}

export function Alerts({ alerts }) {
  return (
    <section className="govbox" aria-labelledby="alerts-heading">
      <div className="govbox-header" id="alerts-heading">RECENT ALERTS</div>
      <div className="govbox-body">
        {alerts.map((a) => (
          <div key={a.title + a.location} className={`alert-box ${severityClass(a.severity)}`}>
            <span className="alert-title">{a.title}</span>
            <span className="alert-meta">{a.location} — {a.value}</span>
            <span className={`alert-badge ${severityClass(a.severity)}`}>{a.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const HEADLINE = {
  safe: { text: 'WATER QUALITY: SAFE', tone: '' },
  retreat: { text: 'NOT SAFE — RE-TREAT', tone: 'bad' },
  nodata: { text: 'NO DATA — UNIT OFFLINE', tone: 'off' },
}

export function SafetyStatus({ site, analysis }) {
  const head = HEADLINE[analysis.outlet]

  return (
    <section className="govbox" aria-labelledby="safety-heading">
      <div className="govbox-header" id="safety-heading">WATER SAFETY STATUS</div>
      <div className="govbox-body safety-score-panel">
        <div className={`score ${head.tone}`}>
          {site.safetyScore ?? '—'}<span> / 100</span>
        </div>
        <div className={`headline ${head.tone}`}>{head.text}</div>
        <p className="safety-scope">Treated (outlet) water — {site.name}</p>
        <ul className="safety-params">
          {analysis.treatedChecks.map((c) => (
            <li key={c.key}>
              <span>{RULES[c.key].label}</span>
              {c.ok === null && <span className="status-badge nodata">NO DATA</span>}
              {c.ok === true && <span className="status-badge normal">NORMAL</span>}
              {c.ok === false && <span className="status-badge danger">OUT OF LIMIT</span>}
            </li>
          ))}
        </ul>
        <p className="safety-note">Prototype indicator based on monitored parameters.</p>
      </div>
    </section>
  )
}
