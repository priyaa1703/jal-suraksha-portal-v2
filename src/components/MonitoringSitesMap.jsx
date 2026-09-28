const STATUS_COLOR = {
  online: '#238B45',
  warning: '#E88A00',
  critical: '#C62828',
  offline: '#8A8A85',
}

const STATUS_LABEL = {
  online: 'Online',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline',
}

const ROUTE_TEXT = { light: 'Light Path', full: 'Full Treatment', nodata: '—' }

export default function MonitoringSitesMap({ sites, selectedId, onSelect, analysis }) {
  const selected = sites.find((s) => s.id === selectedId)
  const has = !!selected.raw

  return (
    <section className="govbox" aria-labelledby="map-heading">
      <div className="govbox-header" id="map-heading">MONITORING LOCATIONS</div>
      <div className="govbox-body">
        <div className="map-wrap">
          <svg
            className="map-svg"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Simplified, original stylised map of monitoring sites (not an official map)"
          >
            {/* Original, simplified abstract state-outline placeholder — not a
                reproduction of any official cartographic data. */}
            <path
              d="M22 20 L55 12 L78 22 L88 40 L80 58 L86 72 L66 88 L40 90 L20 76 L14 55 L10 38 Z"
              fill="#DCEBFB"
              stroke="#4146BD"
              strokeWidth="0.8"
            />
            {sites.map((site) => (
              <g
                key={site.id}
                className="map-marker"
                onClick={() => onSelect(site.id)}
                tabIndex={0}
                role="button"
                aria-label={`${site.name} monitoring site, status ${STATUS_LABEL[site.status]}`}
                aria-pressed={site.id === selectedId}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(site.id)
                  }
                }}
              >
                {site.status !== 'offline' && (
                  <circle cx={site.x} cy={site.y} r="4" fill={STATUS_COLOR[site.status]} className="pulse" opacity="0.5" />
                )}
                <circle
                  cx={site.x}
                  cy={site.y}
                  r={site.id === selectedId ? 3.8 : 3}
                  fill={STATUS_COLOR[site.status]}
                  stroke={site.id === selectedId ? '#11175F' : '#fff'}
                  strokeWidth={site.id === selectedId ? 1 : 0.6}
                />
                <text x={site.x} y={site.y - 5}>{site.name}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className="map-legend">
          <span><i style={{ background: STATUS_COLOR.online }} />Online</span>
          <span><i style={{ background: STATUS_COLOR.warning }} />Warning</span>
          <span><i style={{ background: STATUS_COLOR.critical }} />Critical</span>
          <span><i style={{ background: STATUS_COLOR.offline }} />Offline</span>
        </div>

        <div className="site-detail-panel">
          <dl>
            <dt>Site</dt><dd>{selected.name}</dd>
            <dt>District</dt><dd>{selected.district}</dd>
            <dt>Status</dt><dd>{STATUS_LABEL[selected.status]}</dd>
            <dt>Treatment Path</dt><dd>{ROUTE_TEXT[analysis.route]}</dd>
            <dt>pH</dt><dd>{has ? selected.raw.pH.toFixed(2) : '—'}</dd>
            <dt>Turbidity</dt><dd>{has ? `${selected.raw.turbidity.toFixed(1)} NTU` : '—'}</dd>
            <dt>TDS</dt><dd>{has ? `${selected.raw.tds.toLocaleString('en-IN')} mg/L` : '—'}</dd>
            <dt>ORP</dt><dd>{has ? `${selected.raw.orp} mV` : '—'}</dd>
            <dt>Last Updated</dt><dd>{selected.lastUpdated}</dd>
          </dl>
          <p className="table-note">Map readings are inlet (raw water) values. Click a marker to load that site on the dashboard.</p>
        </div>
      </div>
    </section>
  )
}
