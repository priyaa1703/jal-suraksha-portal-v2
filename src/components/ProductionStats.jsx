export default function ProductionStats({ rows }) {
  return (
    <section className="govbox" aria-labelledby="production-heading">
      <div className="govbox-header" id="production-heading">TODAY'S WATER PRODUCTION</div>
      <div className="govbox-body" style={{ overflowX: 'auto' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.metric}>
                <td>{s.metric}</td>
                <td><strong>{s.value}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="table-note">Water is rejected only when RO or UF backwash is used; Light Path sites reject none.</p>
      </div>
    </section>
  )
}
