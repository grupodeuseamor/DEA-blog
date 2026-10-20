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
import { z as zod } from 'zod'

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

export const drawingSchema = zod.enum(drawingNames)
const pinSchema = zod.enum(['manto', 'coracao']).default('manto')
const text = zod.string().min(2).max(90)

export const decorMarkSchema = zod.object({
  text,
  kind: zod.enum(['marca', 'circulo', 'sublinhado']),
})

export const decorSideItemSchema = zod.discriminatedUnion('kind', [
  zod.object({ kind: zod.literal('polaroid'), image: zod.string(), caption: text, tape: zod.boolean().default(true) }),
  zod.object({
    kind: zod.literal('carimbo'),
    text,
    center: zod.string().max(14).optional(),
    centerDrawing: drawingSchema.optional(),
  }),
  zod.object({ kind: zod.literal('postit'), label: text, text, pin: pinSchema, paper: zod.enum(['areia', 'papel']).default('areia') }),
  zod.object({
    kind: zod.literal('postit-datas'),
    items: zod.array(zod.object({ label: text, text })).min(2).max(4),
    pin: pinSchema,
  }),
  zod.object({ kind: zod.literal('bilhete'), text, drawing: drawingSchema.optional() }),
  zod.object({
    kind: zod.literal('figurinha'),
    drawings: zod.array(drawingSchema).min(1).max(2),
    tape: zod.boolean().default(false),
    text: text.optional(),
  }),
])

/**
 * Reaproveitamento de imagens (desde 2.1.0-snapshot, opcional): referência a uma imagem que a PRÓPRIA página
 * já usa — caminho no JSON de conteúdo (`hero.backgroundImage`, `hero.backgroundImages[1]`) ou o `src`
 * literal (`/images/...`) que já aparece no conteúdo. Nunca uma imagem nova.
 */
export const imageRefSchema = zod.string().min(2)

/** Fundo esmaecido atrás de um bloco da folha (legibilidade garantida por véu de papel via token). */
export const backdropSchema = zod.object({
  image: imageRefSchema,
  /** `suave` (padrão, imagem quase apagada) ou `media`. O texto fica sempre sobre o véu `--veu-*`. */
  strength: zod.enum(['suave', 'media']).default('suave'),
  /** Lado onde a imagem aparece; o lado do texto fica coberto pelo véu. */
  side: zod.enum(['direita', 'esquerda', 'inteiro']).default('direita'),
})

export const decorBlockSchema = zod.object({
  /** Caminho no JSON de conteúdo: `sections[2]`, `about`, `projects`, `quote`… */
  target: zod.string(),
  titleDrawing: drawingSchema.optional(),
  marks: zod.array(decorMarkSchema).max(2).default([]),
  side: zod.array(decorSideItemSchema).max(2).default([]),
  backdrop: backdropSchema.optional(),
  /** Opcional (2.5.0): força (true) ou desliga (false) o bloco Areia interno; padrão = variant highlight. */
  highlight: zod.boolean().optional(),
})

export const decorSchema = zod.object({
  slug: zod.string(),
  hero: zod.object({
    drawings: zod.array(drawingSchema).max(3).default([]),
    /** Palavra do título do hero que recebe o sublinhado à mão. */
    underline: zod.string().optional(),
    bilhete: text.optional(),
    /** Opcional: troca a foto de fundo do hero por outra imagem que a página já usa. */
    backdrop: backdropSchema.optional(),
  }),
  blocks: zod.array(decorBlockSchema).default([]),
  /**
   * Foto colada na borda da folha (desde 2.0.1-snapshot, opcional): reaproveita uma imagem que a página
   * já usa, presa com fitas nos cantos, levemente inclinada. Desktop largo: na margem da folha, ao lado do
   * bloco `after`; telas menores: abaixo do texto desse bloco (nunca por cima do texto).
   */
  sheetPhotos: zod
    .array(
      zod.object({
        image: imageRefSchema,
        after: zod.string(),
        side: zod.enum(['esquerda', 'direita']).default('esquerda'),
        rotate: zod.number().min(-8).max(8).default(-4),
        caption: text.optional(),
        /** Recorte da foto (CSS object-position), ex.: "50% 20%". */
        focus: zod.string().regex(/^\d{1,3}% \d{1,3}%$/).default('50% 50%'),
      }),
    )
    .max(1)
    .default([]),
  /** Só listagens: fita nos cards, etiqueta de ano tirada da description, figurinha por card. */
  cards: zod
    .object({
      tape: zod.boolean().default(true),
      yearFromDescription: zod.boolean().default(false),
      drawings: zod.record(drawingSchema).default({}),
      soonStamp: text.optional(),
    })
    .optional(),
})

export type DecorDrawing = zod.infer<typeof drawingSchema>
export type PageDecor = zod.infer<typeof decorSchema>
export type DecorBlock = zod.infer<typeof decorBlockSchema>
export type DecorBackdrop = zod.infer<typeof backdropSchema>
export type DecorSideItem = zod.infer<typeof decorSideItemSchema>

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

const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i

/** Resolve uma referência de imagem reaproveitada; devolve o src ou null se a página não usa essa imagem. */
export function resolveImageRef(content: unknown, ref: string): string | null {
  if (ref.startsWith('/') || ref.startsWith('http')) {
    return IMAGE_EXT.test(ref) && collectStrings(content).includes(ref) ? ref : null
  }
  const value = resolveContentPath(content, ref)
  return typeof value === 'string' && IMAGE_EXT.test(value) ? value : null
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

  if (decor.hero.backdrop && !resolveImageRef(content, decor.hero.backdrop.image)) {
    errors.push(`hero.backdrop.image "${decor.hero.backdrop.image}" não é uma imagem já usada pela página`)
  }

  decor.sheetPhotos.forEach((photo, i) => {
    if (!resolveImageRef(content, photo.image)) errors.push(`sheetPhotos[${i}]: imagem "${photo.image}" não é usada pela página`)
    if (resolveContentPath(content, photo.after) === undefined) errors.push(`sheetPhotos[${i}]: after "${photo.after}" não existe no conteúdo`)
    if (photo.caption) mustBeInPage(photo.caption, `sheetPhotos[${i}].caption`)
  })

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
    if (block.backdrop && !resolveImageRef(content, block.backdrop.image)) {
      errors.push(`${where}: backdrop.image "${block.backdrop.image}" não é uma imagem já usada pela página`)
    }
    const blockText = norm(collectStrings(node).join(' \n '))
    block.marks.forEach((m) => {
      if (!blockText.includes(norm(m.text))) errors.push(`${where}: marca "${m.text}" não está nesse bloco`)
    })
    block.side.forEach((item) => {
      switch (item.kind) {
        case 'polaroid': {
          if (!resolveImageRef(content, item.image)) errors.push(`${where}: polaroid.image "${item.image}" não aponta para uma imagem já usada pela página`)
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

/** Valida todos os arquivos de specs/decor/; desde 2.6.0-snapshot todo conteúdo (as 15 rotas) precisa ter decoração. */
export function validateAllDecor(): void {
  const missing = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json'))
    .filter((f) => !fs.existsSync(path.join(DECOR_DIR, f)))
  if (missing.length) {
    throw new Error(`Decoração obrigatória ausente: ${missing.map((f) => 'specs/decor/' + f).join(', ')}`)
  }
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

/** Decoração da página (obrigatória desde 2.6.0-snapshot): falta de arquivo é erro. */
export function loadDecor(slug: string): PageDecor {
  if (!fs.existsSync(path.join(DECOR_DIR, `${slug}.json`))) {
    throw new Error(`specs/decor/${slug}.json ausente (decoração obrigatória desde 2.6.0-snapshot)`)
  }
  return validateDecor(slug)
}
