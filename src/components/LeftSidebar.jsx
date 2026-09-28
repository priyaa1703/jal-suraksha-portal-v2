export default function LeftSidebar({ links, quickStatus, siteName }) {
  return (
    <div className="left-col">
      <section className="govbox" aria-labelledby="important-links-heading">
        <div className="govbox-header" id="important-links-heading">IMPORTANT LINKS</div>
        <ul className="links-list">
          {links.map((link) => (
            <li key={link}>
              <button onClick={() => alert(`${link} (demo — not wired to a real page)`)}>
                » {link}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="govbox" aria-labelledby="quick-status-heading">
        <div className="govbox-header" id="quick-status-heading">QUICK STATUS</div>
        <div className="govbox-body">
          <p className="quick-status-site">Site: {siteName}</p>
          <ul className="quick-status-list">
            {quickStatus.map((s) => (
              <li key={s.label}>
                <span>{s.label}</span>
                <span className={`status-dot ${s.tone}`}>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
