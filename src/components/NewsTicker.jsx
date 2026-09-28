import { useState } from 'react'

export default function NewsTicker({ items }) {
  const [paused, setPaused] = useState(false)

  return (
    <div className="news-ticker" role="region" aria-label="Latest news">
      <div className="ticker-orange-line" aria-hidden="true" />
      <div className="ticker-label">LATEST NEWS</div>
      <div className="ticker-track-wrap">
        <div className={`ticker-track${paused ? ' paused' : ''}`}>
          {items.map((item, i) => (
            <span key={i}>• {item}</span>
          ))}
        </div>
      </div>
      <button
        className="ticker-pause"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? 'Resume news ticker' : 'Pause news ticker'}
      >
        {paused ? '▶ Play' : '❚❚ Pause'}
      </button>
    </div>
  )
}
