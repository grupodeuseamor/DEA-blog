/** Tachinha. `coracao` (vermelho) só como acento: máx. 1 por página (validado em lib/specs/decor.ts). */
export function Pin({ tone = 'manto' }: { tone?: 'manto' | 'coracao' }) {
  return <span className={`pin ${tone}`} aria-hidden="true" />
}
