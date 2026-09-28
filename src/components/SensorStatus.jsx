import { formatValue } from '../logic/decisionEngine.js'
import { sensors } from '../data/mockData.js'

export default function SensorStatus({ site }) {
  const offline = site.status === 'offline'

  return (
    <section className="govbox" aria-labelledby="sensor-heading">
      <div className="govbox-header" id="sensor-heading">SENSOR STATUS</div>
      <div className="govbox-body" style={{ overflowX: 'auto' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th scope="col">Sensor</th>
              <th scope="col">Live Reading</th>
              <th scope="col">Health</th>
              <th scope="col">Calibration</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((s) => (
              <tr key={s.key}>
                <td>{s.name}</td>
                <td><strong>{offline ? '—' : formatValue(s.key, site.raw[s.key])}</strong></td>
                <td>
                  {offline ? (
                    '—'
                  ) : (
                    <>
                      <span className="health-bar-wrap" aria-hidden="true">
                        <span className="health-bar-fill" style={{ width: `${s.health}%` }} />
                      </span>
                      {s.health}%
                    </>
                  )}
                </td>
                <td>
                  <div className="value-cell">
                    <span>Due in {s.calibrationDays} days</span>
                    {s.calibrationDays <= 7 && <span className="status-badge warning">CALIBRATE SOON</span>}
                  </div>
                </td>
                <td>
                  {offline
                    ? <span className="status-badge nodata">OFFLINE</span>
                    : <span className="status-badge normal">ACTIVE</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="table-note">Readings are the inlet (raw water) values reported by the ESP32. Periodic cleaning and calibration limit sensor drift and fouling.</p>
      </div>
    </section>
  )
}
