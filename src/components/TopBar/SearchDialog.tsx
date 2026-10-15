import { useEffect, useMemo, useRef, useState } from 'react'

export interface SearchItem {
  label: string
  path: string
  group: string
}

export interface SearchDialogProps {
  items: SearchItem[]
  onSelect: (item: SearchItem) => void
  onClose: () => void
}

export function SearchDialog({ items, onSelect, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return needle
      ? items.filter((item) => item.label.toLowerCase().includes(needle) || item.group.toLowerCase().includes(needle))
      : items
  }, [items, query])

  return (
    <div
      className="SearchDialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="SearchDialog__panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="SearchDialog__head">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="SearchDialog__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search"
          />
          <button type="button" className="SearchDialog__esc" onClick={onClose}>
            Esc
          </button>
        </div>
        <ul className="SearchDialog__results">
          {results.map((item) => (
            <li key={item.path}>
              <button type="button" className="SearchDialog__result" onClick={() => onSelect(item)}>
                <span className="SearchDialog__resultText">
                  <span className="SearchDialog__label">{item.label}</span>
                  <span className="SearchDialog__path">{item.path}</span>
                </span>
                <span className="SearchDialog__group">{item.group}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="SearchDialog__empty">Nothing matches “{query}”.</li>}
        </ul>
      </div>
    </div>
  )
}
