export default function Footer({ data }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h5>ABOUT</h5>
          <ul>{data.about.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="footer-col">
          <h5>IMPORTANT LINKS</h5>
          <ul>{data.links.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="footer-col">
          <h5>CONTACT</h5>
          <ul>{data.contact.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="footer-col">
          <h5>HELP</h5>
          <ul>{data.help.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
      <div className="footer-bottom">
        <strong>{data.psLine}</strong>
        {data.disclaimer}
      </div>
    </footer>
  )
}
