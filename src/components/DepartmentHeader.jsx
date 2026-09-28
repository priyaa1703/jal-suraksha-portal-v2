// Original, abstract placeholder emblems only — these are NOT the Government
// of India / Jharkhand emblem or any official seal. They are simple
// water-drop / gear motifs created for this prototype.

function LeftEmblem() {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
      <circle cx="35" cy="35" r="33" fill="#EEF7FF" stroke="#4146BD" strokeWidth="2" />
      <circle cx="35" cy="35" r="27" fill="none" stroke="#4146BD" strokeWidth="1" strokeDasharray="2 3" />
      <path
        d="M35 16c7 9 12 15.5 12 21.5A12 12 0 1 1 23 37.5C23 31.5 28 25 35 16Z"
        fill="#4146BD"
      />
      <path
        d="M35 22c4.5 6 7.5 10 7.5 13.7A7.5 7.5 0 1 1 27.5 35.7C27.5 32 30.5 28 35 22Z"
        fill="#EEF7FF"
      />
    </svg>
  )
}

function RightEmblem() {
  const spokes = Array.from({ length: 8 })
  return (
    <svg width="66" height="66" viewBox="0 0 66 66" aria-hidden="true">
      <circle cx="33" cy="33" r="31" fill="#FFFFFF" stroke="#06477F" strokeWidth="2" />
      <circle cx="33" cy="33" r="8" fill="#06477F" />
      {spokes.map((_, i) => {
        const angle = (i * 360) / spokes.length
        const rad = (angle * Math.PI) / 180
        const x1 = 33 + 10 * Math.cos(rad)
        const y1 = 33 + 10 * Math.sin(rad)
        const x2 = 33 + 26 * Math.cos(rad)
        const y2 = 33 + 26 * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#06477F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function DepartmentHeader({ title, subtitle }) {
  return (
    <header className="dept-header">
      <div className="dept-header-left">
        <div className="dept-emblem">
          <LeftEmblem />
        </div>
        <div className="dept-titles">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <span className="demo-badge" title="All readings shown in this prototype are simulated data.">
            DEMO MONITORING PORTAL
          </span>
        </div>
      </div>
      <div className="dept-header-right">
        <RightEmblem />
      </div>
    </header>
  )
}
