import { STRIP_RULES, formatStrip } from '../logic/decisionEngine.js'

export default function StripTestLog({ site }) {
  const strips = site.strips

  return (
    <section className="govbox" aria-labelledby="strip-heading">
      <div className="govbox-header" id="strip-heading">MANUAL VERIFICATION LOG (STRIP TESTS)</div>
      <div className="govbox-body" style={{ overflowX: 'auto' }}>
        {strips ? (
          <>
            <table className="simple-table">
              <thead>
                <tr>
                  <th scope="col">Contaminant</th>
                  <th scope="col">Limit</th>
                  <th scope="col">Raw Water</th>
                  <th scope="col">Treated Water</th>
                </tr>
              </thead>
              <tbody>
                {STRIP_RULES.map((r) => {
                  const raw = strips[r.key].raw
                  const treated = strips[r.key].treated
                  return (
                    <tr key={r.key}>
                      <td>{r.label}</td>
                      <td>{r.limitText}</td>
                      <td>
                        <div className="value-cell">
                          <strong>{formatStrip(r.key, raw)}</strong>
                          {raw > r.limit
                            ? <span className="status-badge warning">ABOVE LIMIT</span>
                            : <span className="status-badge normal">WITHIN LIMIT</span>}
                        </div>
                      </td>
                      <td>
                        <div className="value-cell">
                          <strong>{formatStrip(r.key, treated)}</strong>
                          {treated > r.limit
                            ? <span className="status-badge danger">ABOVE LIMIT</span>
                            : <span className="status-badge normal">WITHIN LIMIT</span>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="table-note">
              Last tested: {strips.date} — low-cost colorimetric strips (about ₹10–50 per test) used for
              verification only. Iron, fluoride and arsenic are not sensed continuously. Reference limits
              follow the BIS thresholds used in CGWB reports.
            </p>
          </>
        ) : (
          <p className="table-note">No strip-test record available — unit offline.</p>
        )}
      </div>
    </section>
  )
}
