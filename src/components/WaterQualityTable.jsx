function Cell({ check, kind }) {
  let badge
  if (check.ok === null) badge = <span className="status-badge nodata">NO DATA</span>
  else if (check.ok) badge = <span className="status-badge normal">NORMAL</span>
  else if (kind === 'raw') badge = <span className="status-badge warning">OUT OF LIMIT</span>
  else badge = <span className="status-badge danger">OUT OF LIMIT</span>

  return (
    <div className="value-cell">
      <strong>{check.display}</strong>
      {badge}
    </div>
  )
}

export default function WaterQualityTable({ analysis }) {
  const { rawChecks, treatedChecks } = analysis

  return (
    <section className="govbox" aria-labelledby="wq-table-heading">
      <div className="govbox-header" id="wq-table-heading">CURRENT WATER QUALITY STATUS</div>
      <div className="govbox-body" style={{ overflowX: 'auto' }}>
        <table className="gov-table">
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              <th scope="col">Safe Range</th>
              <th scope="col">Raw Water (Inlet)</th>
              <th scope="col">Treated Water (Outlet)</th>
            </tr>
          </thead>
          <tbody>
            {rawChecks.map((raw, i) => (
              <tr key={raw.key}>
                <td>{raw.label}</td>
                <td>{raw.range}</td>
                <td><Cell check={raw} kind="raw" /></td>
                <td><Cell check={treatedChecks[i]} kind="treated" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="table-note">
          ESP32 demo logic: all five inlet readings within limits → Light Path (UV-C only); any reading out of
          limits → Full Treatment Path. Treated readings are re-checked before water is released. The ORP limit is a
          configurable demo threshold, not a BIS / WHO standard.
        </p>
      </div>
    </section>
  )
}
