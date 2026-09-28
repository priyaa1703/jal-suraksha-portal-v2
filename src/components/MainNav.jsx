import { useState } from 'react'

export default function MainNav({ items }) {
  const [active, setActive] = useState(items[0])

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul>
        {items.map((item) => (
          <li key={item} className={item === active ? 'active' : ''}>
            <button onClick={() => setActive(item)} aria-current={item === active ? 'page' : undefined}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
