/** v2 — filtros SVG globais: #rough (traço à mão) e #stamp (tinta de carimbo). Renderizado uma vez no <body>. */
export function RoughFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={2.2} />
        </filter>
        <filter id="stamp">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves={2} seed={8} result="n" />
          <feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.3" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}
