import { useState } from 'react'

export default function UtilityBar({ lang, setLang, onFontChange, onToggleContrast, highContrast }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="utility-bar">
      <div className="utility-left">
        <a href="#main-content" className="skip-link-inline" style={{ color: '#fff' }}>
          Skip to Main Content
        </a>
      </div>
      <div className="utility-right">
        <div className="font-size-controls" role="group" aria-label="Adjust font size">
          <button onClick={() => onFontChange(1)} aria-label="Increase font size">A+</button>
          <button onClick={() => onFontChange(0)} aria-label="Reset font size">A</button>
          <button onClick={() => onFontChange(-1)} aria-label="Decrease font size">A-</button>
        </div>

        <div className="lang-toggle" role="group" aria-label="Choose language">
          <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>
            हिंदी
          </button>
          <span aria-hidden="true">|</span>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
            English
          </button>
        </div>

        {searchOpen ? (
          <div className="utility-search-box">
            <input
              type="search"
              aria-label="Search this portal"
              placeholder="Search..."
              autoFocus
            />
            <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
              ✕
            </button>
          </div>
        ) : (
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Open search">
            🔍
          </button>
        )}

        <button
          className="icon-btn"
          onClick={onToggleContrast}
          aria-pressed={highContrast}
          aria-label="Toggle high contrast mode"
        >
          ♿
        </button>
      </div>
    </div>
  )
}
