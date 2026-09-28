export default function AboutSystem({ about }) {
  return (
    <section className="govbox" aria-labelledby="about-heading">
      <div className="govbox-header" id="about-heading">{about.heading}</div>
      <div className="govbox-body">
        <p style={{ fontSize: '13.5px', margin: '0 0 4px' }}>{about.body}</p>
        <div className="pillars-grid">
          {about.pillars.map((p) => (
            <div className="pillar-box" key={p.title}>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
