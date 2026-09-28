import { maintenance } from '../data/mockData.js'

export default function MaintenanceStatus({ site }) {
  return (
    <section className="govbox" aria-labelledby="maintenance-heading">
      <div className="govbox-header" id="maintenance-heading">FILTER &amp; MAINTENANCE STATUS</div>
      <div className="govbox-body" style={{ overflowX: 'auto' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Condition</th>
              <th scope="col">Service Due</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenance.map((m) => {
              const missing = m.module && !site.modules.includes(m.module)
              return (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td>
                    {missing ? (
                      '—'
                    ) : (
                      <>
                        <span className="health-bar-wrap" aria-hidden="true">
                          <span className="health-bar-fill" style={{ width: `${m.condition}%` }} />
                        </span>
                        {m.condition}%
                      </>
                    )}
                  </td>
                  <td>{missing ? '—' : `In ${m.days} days`}</td>
                  <td>
                    {missing ? (
                      <span className="status-badge nodata">NOT INSTALLED</span>
                    ) : m.days <= 10 ? (
                      <span className="status-badge warning">DUE SOON</span>
                    ) : (
                      <span className="status-badge normal">OK</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="table-note">Demo values. The IoT dashboard tracks filter condition, sensor status and maintenance requirements so media and UV-C lamps are replaced on time.</p>
      </div>
    </section>
  )
}
