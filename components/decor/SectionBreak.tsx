/** Respiro com rabisco (onda curta em Azul Céu) entre seções da folha única. */
export function SectionBreak() {
  return (
    <div className="respiro" aria-hidden="true">
      <svg className="d" viewBox="0 0 140 16" style={{ strokeWidth: 2 }} focusable="false">
        <path d="M4 9c14-6 24 6 38 0s24-6 38 0 24 6 38 0 12-4 18-2" />
      </svg>
    </div>
  )
}
