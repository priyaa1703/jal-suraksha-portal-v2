const ROUTE_TEXT = {
  light: 'LIGHT PATH (UV-C ONLY)',
  full: 'FULL TREATMENT PATH',
  nodata: 'NO DATA — UNIT OFFLINE',
}

function StageBox({ name, stage }) {
  return (
    <div className={`process-stage state-${stage.state}`}>
      <h4>{name}</h4>
      <div className="stage-status">Status: {stage.label}</div>
      <div className="stage-metric">{stage.metric}</div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="process-arrow" aria-hidden="true">
      <span>➜</span>
    </div>
  )
}

function Tier({ title, children }) {
  return (
    <div className="tier">
      <p className="tier-title">{title}</p>
      <div className="tier-row">{children}</div>
    </div>
  )
}

function TierArrow() {
  return (
    <div className="tier-arrow" aria-hidden="true">
      <span>▼</span>
    </div>
  )
}

export default function PurificationProcess({ analysis }) {
  const { stages: s, route, reasons } = analysis

  return (
    <section className="govbox" aria-labelledby="purification-heading">
      <div className="govbox-header" id="purification-heading">PURIFICATION PROCESS STATUS</div>
      <div className="govbox-body">
        <div className={`route-banner route-${route}`} role="status">
          <div>
            ESP32 DECISION ENGINE — ROUTE SELECTED: <strong>{ROUTE_TEXT[route]}</strong>
          </div>
          {route === 'full' && (
            <ul className="route-reasons">
              {reasons.map((r) => <li key={r}>{r}</li>)}
            </ul>
          )}
          {route === 'light' && (
            <p className="route-note">All five sensor readings are within limits — water skips the filtration modules and goes straight to UV-C.</p>
          )}
          {route === 'nodata' && (
            <p className="route-note">No sensor data received from this unit.</p>
          )}
        </div>

        <Tier title="INPUT & DECISION">
          <StageBox name="RAW WATER" stage={s.raw} />
          <Arrow />
          <StageBox name="ESP32 DECISION ENGINE" stage={s.decision} />
        </Tier>
        <TierArrow />
        <Tier title="CORE PLATFORM — runs on Full Treatment Path">
          <StageBox name="SEDIMENT FILTER" stage={s.sediment} />
          <Arrow />
          <StageBox name="pH NEUTRALIZATION" stage={s.ph} />
          <Arrow />
          <StageBox name="ACTIVATED CARBON" stage={s.carbon} />
          <Arrow />
          <StageBox name="IRON REMOVAL" stage={s.iron} />
        </Tier>
        <TierArrow />
        <Tier title="REGION MODULES — installed as per site survey">
          <StageBox name="FLUORIDE REMOVAL" stage={s.fluoride} />
          <StageBox name="HEAVY-METAL ADSORPTION" stage={s.heavyMetal} />
        </Tier>
        <TierArrow />
        <Tier title="TDS FORK — UF when TDS is within limit, RO when TDS is high">
          <StageBox name="UF (ULTRAFILTRATION)" stage={s.uf} />
          <StageBox name="RO (REVERSE OSMOSIS)" stage={s.ro} />
        </Tier>
        <TierArrow />
        <Tier title="FINAL STAGES — every path">
          <StageBox name="UV-C DISINFECTION" stage={s.uvc} />
          <Arrow />
          <StageBox name="POST-TREATMENT VERIFICATION" stage={s.verify} />
          <Arrow />
          <StageBox name="CLEAN WATER OUTPUT" stage={s.output} />
        </Tier>
      </div>
    </section>
  )
}
