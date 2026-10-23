import { getAmbiente, isAmbienteDeTeste } from '@/lib/ambiente'

const ROTULO = {
  homologacao: 'Homologação',
  desenvolvimento: 'Desenvolvimento',
} as const

/** Faixa laranja fixa no topo, exibida só fora de produção (NEXT_PUBLIC_APP_ENV). */
export function FaixaAmbiente() {
  const ambiente = getAmbiente()
  if (!isAmbienteDeTeste(ambiente)) return null

  return (
    <div className="faixa-ambiente" role="status" data-ambiente={ambiente}>
      <strong>Ambiente de testes e homologação</strong>
      <span className="faixa-ambiente-detalhe">
        {' '}
        · {ROTULO[ambiente as keyof typeof ROTULO]} · este não é o site oficial do Grupo Deus É Amor
      </span>
    </div>
  )
}
