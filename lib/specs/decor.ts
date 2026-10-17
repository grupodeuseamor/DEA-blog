/**
 * v2 (desde 2.0.0-snapshot) — decoração "Caderno" por página (post-its, tachinhas, rabiscos, figurinhas,
 * fita adesiva, polaroid, carimbos e marca-texto).
 *
 * Fonte: specs/decor/{slug}.json (um arquivo por página, mesmo slug de specs/content/).
 * A decoração NUNCA traz texto novo: toda frase precisa existir no JSON de conteúdo
 * da própria página. Esta validação roda em `npm run test:specs`.
 */
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

/** Banco de desenhos do design doc (seção 6) + coroa (pedido do piloto Aparecida). */
export const drawingNames = [
  // Brilho e energia
  'brilho', 'brilhinhos', 'estrela', 'respingo', 'raios', 'orbita', 'selo-estrelado',
  // Fé
  'coracao-chama', 'chama', 'pomba', 'coroa-espinhos', 'cruz', 'terco', 'vela', 'aureola', 'lirio', 'coroa',
  // Natureza e encontro
  'gota', 'nuvem', 'onda', 'coracao', 'louvor', 'pregacao',
  // Anotação de caderno
  'sublinhado', 'circulo', 'seta', 'asterisco', 'aspas',
] as const

export const drawingSchema = z.enum(drawingNames)
const pinSchema = z.enum(['manto', 'coracao']).default('manto')
const text = z.string().min(2).max(90)

export const decorMarkSchema = z.object({
  text,
  kind: z.enum(['marca', 'circulo', 'sublinhado']),
})

export const decorSideItemSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('polaroid'), image: z.string(), caption: text, tape: z.boolean().default(true) }),
  z.object({
    kind: z.literal('carimbo'),
    text,
    center: z.string().max(14).optional(),
    centerDrawing: drawingSchema.optional(),
  }),
  z.object({ kind: z.literal('postit'), label: text, text, pin: pinSchema, paper: z.enum(['areia', 'papel']).default('areia') }),
  z.object({
    kind: z.literal('postit-datas'),
    items: z.array(z.object({ label: text, text })).min(2).max(4),
    pin: pinSchema,
  }),
  z.object({ kind: z.literal('bilhete'), text, drawing: drawingSchema.optional() }),
  z.object({
    kind: z.literal('figurinha'),
    drawings: z.array(drawingSchema).min(1).max(2),
    tape: z.boolean().default(false),
    text: text.optional(),
  }),
])

export const decorBlockSchema = z.object({
  /** Caminho no JSON de conteúdo: `sections[2]`, `about`, `projects`, `quote`… */
  target: z.string(),
  titleDrawing: drawingSchema.optional(),
  marks: z.array(decorMarkSchema).max(2).default([]),
  side: z.array(decorSideItemSchema).max(2).default([]),
})

export const decorSchema = z.object({
  slug: z.string(),
  hero: z.object({
    drawings: z.array(drawingSchema).max(3).default([]),
    /** Palavra do título do hero que recebe o sublinhado à mão. */
    underline: z.string().optional(),
    bilhete: text.optional(),
  }),
  blocks: z.array(decorBlockSchema).default([]),
  /** Só listagens: fita nos cards, etiqueta de ano tirada da description, figurinha por card. */
  cards: z
    .object({
      tape: z.boolean().default(true),
      yearFromDescription: z.boolean().default(false),
      drawings: z.record(drawingSchema).default({}),
      soonStamp: text.optional(),
    })
    .optional(),
})

export type DecorDrawing = z.infer<typeof drawingSchema>
export type PageDecor = z.infer<typeof decorSchema>
export type DecorBlock = z.infer<typeof decorBlockSchema>
export type DecorSideItem = z.infer<typeof decorSideItemSchema>

const DECOR_DIR = path.join(process.cwd(), 'specs', 'decor')
const CONTENT_DIR = path.join(process.cwd(), 'specs', 'content')

const norm = (s: string) => s.normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('pt-BR')

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out))
  return out
}

export function resolveContentPath(root: unknown, target: string): unknown {
  return target
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .reduce<unknown>((node, key) => (node == null ? undefined : (node as Record<string, unknown>)[key]), root)
}

/** Divide "Padroeira do Brasil · 12 de outubro" em trechos; cada trecho precisa existir no conteúdo. */
const pieces = (s: string) => s.split('·').map((p) => p.trim()).filter(Boolean)

export function validateDecor(slug: string): PageDecor {
  const decor = decorSchema.parse(JSON.parse(fs.readFileSync(path.join(DECOR_DIR, `${slug}.json`), 'utf-8')))
  const content = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, `${slug}.json`), 'utf-8'))
  const pageText = norm(collectStrings(content).join(' \n '))
  const errors: string[] = []

  const mustBeInPage = (phrase: string, where: string) => {
    for (const piece of pieces(phrase)) {
      if (!pageText.includes(norm(piece))) errors.push(`${where}: "${piece}" não existe no conteúdo da página`)
    }
  }

  if (decor.slug !== slug) errors.push(`slug "${decor.slug}" difere do arquivo ${slug}.json`)
  if (decor.hero.underline && !norm(collectStrings(content.hero).join(' ')).includes(norm(decor.hero.underline))) {
    errors.push(`hero.underline: "${decor.hero.underline}" não está no hero`)
  }
  if (decor.hero.bilhete) mustBeInPage(decor.hero.bilhete, 'hero.bilhete')

  let redPins = 0
  const seen = new Set<string>()
  decor.blocks.forEach((block, i) => {
    const where = `blocks[${i}] (${block.target})`
    if (seen.has(block.target)) errors.push(`${where}: target repetido`)
    seen.add(block.target)
    const node = resolveContentPath(content, block.target)
    if (node === undefined) {
      errors.push(`${where}: target não existe no conteúdo`)
      return
    }
    const blockText = norm(collectStrings(node).join(' \n '))
    block.marks.forEach((m) => {
      if (!blockText.includes(norm(m.text))) errors.push(`${where}: marca "${m.text}" não está nesse bloco`)
    })
    block.side.forEach((item) => {
      switch (item.kind) {
        case 'polaroid': {
          const img = resolveContentPath(content, item.image)
          if (typeof img !== 'string') errors.push(`${where}: polaroid.image "${item.image}" não aponta para uma imagem do conteúdo`)
          mustBeInPage(item.caption, `${where} polaroid`)
          break
        }
        case 'carimbo':
          mustBeInPage(item.text, `${where} carimbo`)
          if (item.center) mustBeInPage(item.center, `${where} carimbo.center`)
          break
        case 'postit':
          mustBeInPage(item.label, `${where} postit.label`)
          mustBeInPage(item.text, `${where} postit`)
          if (item.pin === 'coracao') redPins++
          break
        case 'postit-datas':
          item.items.forEach((d) => {
            mustBeInPage(d.label, `${where} postit-datas.label`)
            mustBeInPage(d.text, `${where} postit-datas`)
          })
          if (item.pin === 'coracao') redPins++
          break
        case 'bilhete':
          mustBeInPage(item.text, `${where} bilhete`)
          break
        case 'figurinha':
          if (item.text) mustBeInPage(item.text, `${where} figurinha`)
          break
      }
    })
  })
  if (decor.cards?.soonStamp) mustBeInPage(decor.cards.soonStamp, 'cards.soonStamp')
  if (redPins > 1) errors.push(`vermelho só em acento: ${redPins} tachinhas vermelhas (máx. 1 por página)`)

  if (errors.length) throw new Error(`Decoração inválida em specs/decor/${slug}.json:\n- ${errors.join('\n- ')}`)
  return decor
}

/** Valida todos os arquivos de specs/decor/ (páginas ainda não migradas podem não ter arquivo). */
export function validateAllDecor(): void {
  if (!fs.existsSync(DECOR_DIR)) return
  fs.readdirSync(DECOR_DIR)
    .filter((f) => f.endsWith('.json'))
    .forEach((f) => {
      const slug = f.replace(/\.json$/, '')
      if (!fs.existsSync(path.join(CONTENT_DIR, `${slug}.json`))) {
        throw new Error(`specs/decor/${f}: não há specs/content/${slug}.json correspondente`)
      }
      validateDecor(slug)
    })
}

export function loadDecor(slug: string): PageDecor | null {
  return fs.existsSync(path.join(DECOR_DIR, `${slug}.json`)) ? validateDecor(slug) : null
}
