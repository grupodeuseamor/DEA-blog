/**
 * Ambiente em que o site está rodando, definido pela variável NEXT_PUBLIC_APP_ENV.
 *
 * - `producao` (padrão): site oficial, sem faixa.
 * - `homologacao`: Railway (projeto dea-stage, branch develop). Mostra a faixa laranja
 *   de testes no topo e pede para buscadores não indexarem.
 * - `desenvolvimento`: máquina local. Também mostra a faixa.
 *
 * A variável é lida no build (NEXT_PUBLIC_*), então mudar o valor exige novo deploy.
 */
export type Ambiente = 'producao' | 'homologacao' | 'desenvolvimento'

const ALIASES: Record<string, Ambiente> = {
  producao: 'producao',
  production: 'producao',
  prod: 'producao',
  homologacao: 'homologacao',
  homolog: 'homologacao',
  staging: 'homologacao',
  stage: 'homologacao',
  desenvolvimento: 'desenvolvimento',
  development: 'desenvolvimento',
  dev: 'desenvolvimento',
}

export function getAmbiente(valor = process.env.NEXT_PUBLIC_APP_ENV): Ambiente {
  if (!valor) return 'producao'
  return ALIASES[valor.trim().toLowerCase()] ?? 'producao'
}

export function isAmbienteDeTeste(ambiente: Ambiente = getAmbiente()): boolean {
  return ambiente !== 'producao'
}
