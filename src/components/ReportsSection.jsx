export default function ReportsSection({ reports }) {
  return (
    <section className="govbox" aria-labelledby="reports-heading">
      <div className="govbox-header" id="reports-heading">REPORTS &amp; DOCUMENTS</div>
      <div className="govbox-body">
        <ul className="reports-list">
          {reports.map((r) => (
            <li key={r}>
              <span>» {r}</span>
              <span className="report-actions">
                <button
                  className="gov-btn secondary"
                  onClick={() => alert(`Viewing "${r}" (demo — mock report)`)}
                >
                  VIEW
                </button>
                <button
                  className="gov-btn"
                  onClick={() => alert(`Downloading "${r}" (demo — mock report)`)}
                >
                  DOWNLOAD
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
