import { MODULE_LABEL } from '../logic/decisionEngine.js'

const ROUTE_TEXT = {
  light: 'LIGHT PATH (UV-C ONLY)',
  full: 'FULL TREATMENT PATH',
  nodata: 'NO DATA',
}
const ROUTE_BADGE = { light: 'normal', full: 'info', nodata: 'nodata' }
const STATUS_TEXT = {
  online: 'SYSTEM ONLINE',
  warning: 'SYSTEM ONLINE — WARNING',
  offline: 'SYSTEM OFFLINE',
}
const STATUS_TONE = { online: 'good', warning: 'warn', offline: 'off' }
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default function MonitoringHero({ sites, site, analysis, onSelect }) {
  const modules = site.modules.length
    ? site.modules.map((m) => MODULE_LABEL[m]).join('; ')
    : 'None (core platform only)'

  return (
    <section className="govbox" aria-labelledby="monitoring-hero-heading">
      <div className="govbox-header" id="monitoring-hero-heading">WATER QUALITY MONITORING SYSTEM</div>

      <div className="site-select-row">
        <label htmlFor="site-select">Monitoring Site:</label>
        <select id="site-select" value={site.id} onChange={(e) => onSelect(e.target.value)}>
          {sites.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {cap(s.status)}
            </option>
          ))}
        </select>
      </div>

      <div className="govbox-body">
        <dl className="hero-grid">
          <dt>District:</dt>
          <dd>{site.district}</dd>

          <dt>Block:</dt>
          <dd>{site.block}</dd>

          <dt>Site:</dt>
          <dd>{site.unit}</dd>

          <dt>Site Profile:</dt>
          <dd>{site.profile}</dd>

          <dt>Region Modules:</dt>
          <dd>{modules}</dd>

          <dt>Treatment Path:</dt>
          <dd>
            <span className={`status-badge ${ROUTE_BADGE[analysis.route]}`}>{ROUTE_TEXT[analysis.route]}</span>
          </dd>

          <div className="hero-status-line">
            <span className={`status-dot ${STATUS_TONE[site.status]}`}>{STATUS_TEXT[site.status]}</span>
            <span>Last Updated: {site.lastUpdated}</span>
          </div>
        </dl>
      </div>
    </section>
  )
}
