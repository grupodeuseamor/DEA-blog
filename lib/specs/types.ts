import { z as zod } from 'zod'
import { parseVideoUrl } from '@/lib/video/parseVideoUrl'

export const versionSchema = zod.object({
  contentVersion: zod.string(),
  releasedAt: zod.string(),
  approvedBy: zod.string(),
  specFile: zod.string().optional(),
})

export const routeItemSchema = zod.object({
  label: zod.string(),
  path: zod.string(),
  parent: zod.string().optional(),
})

export const routesSchema = zod.object({
  items: zod.array(routeItemSchema),
})

export const paragraphSectionSchema = zod.object({
  type: zod.literal('paragraphs'),
  id: zod.string().regex(/^[a-z][a-z0-9-]*$/).optional(),
  title: zod.string(),
  variant: zod.enum(['default', 'highlight']).optional(),
  paragraphs: zod.array(zod.string()),
  quote: zod.string().optional(),
  cta: zod
    .object({
      label: zod.string(),
      href: zod.string(),
      style: zod.enum(['instagram', 'primary', 'link']).optional(),
    })
    .optional(),
  secondaryCta: zod
    .object({
      label: zod.string(),
      href: zod.string(),
    })
    .optional(),
})

export const quoteBlockSchema = zod.object({
  type: zod.literal('quote'),
  text: zod.string(),
})

export const cardSectionSchema = zod.object({
  type: zod.literal('card'),
  title: zod.string(),
  variant: zod.enum(['default', 'highlight']).optional(),
  paragraphs: zod.array(zod.string()),
  quote: zod.string().optional(),
})

export const heroSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string().optional(),
  quote: zod.string().optional(),
  backgroundImage: zod.string(),
  backgroundImages: zod.array(zod.string()).min(1).optional(),
  overlay: zod.string().optional(),
  logo: zod
    .object({
      src: zod.string(),
      alt: zod.string(),
      width: zod.number().optional(),
      height: zod.number().optional(),
    })
    .optional(),
})

export const contentSectionSchema = zod.union([
  paragraphSectionSchema,
  cardSectionSchema,
  quoteBlockSchema,
])

export const contentPageSchema = zod.object({
  slug: zod.string(),
  meta: zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
  hero: heroSchema,
  sections: zod.array(contentSectionSchema),
})

export const homeContentSchema = contentPageSchema.extend({
  slug: zod.literal('home'),
  sections: zod.array(paragraphSectionSchema),
  presentation: zod.object({
    identification: zod.string(),
    participate: zod.object({ label: zod.string(), href: zod.literal('/#primeira-vez') }),
    about: zod.object({ label: zod.string(), href: zod.literal('/#sobre-o-grupo') }),
  }),
  meetingLabels: zod.object({
    heading: zod.string(),
    calendar: zod.string(),
    maps: zod.string(),
    loading: zod.string(),
    empty: zod.string(),
    timezone: zod.string(),
    holidayNotice: zod.string(),
  }),
  footerInstagram: zod.object({
    label: zod.string().min(1),
    accessibleLabel: zod.string().min(1),
    href: zod.string().url().startsWith('https://www.instagram.com/'),
  }),
  /** Botão preview (2.5.0-snapshot, item 5a): opcional e removível — apagar o campo some com o botão. */
  previewCta: zod
    .object({ label: zod.string(), href: zod.string(), badge: zod.literal('preview') })
    .optional(),
})

export const nossaSenhoraAuxiliadoraContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-auxiliadora'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraMedjugorjeContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-medjugorje'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraAparecidaContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-aparecida'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraLaSaletteContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-la-salette'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraLourdesContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-lourdes'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraGuadalupeContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-guadalupe'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDasGracasContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-das-gracas'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDaComunicacaoContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-da-comunicacao'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDasDoresContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-das-dores'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDeFatimaContentSchema = contentPageSchema.extend({
  slug: zod.literal('nossa-senhora-de-fatima'),
  sections: zod.array(zod.union([cardSectionSchema, quoteBlockSchema])),
})


export const galleryItemSchema = zod.object({
  slug: zod.string(),
  title: zod.string(),
  description: zod.string(),
  path: zod.string(),
  emoji: zod.string().optional(),
  available: zod.boolean().default(true),
})

export const titulosNossaSenhoraContentSchema = zod.object({
  slug: zod.literal('titulos-nossa-senhora'),
  meta: zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
  hero: zod.object({
    title: zod.string(),
    subtitle: zod.string(),
  }),
  galleries: zod.array(galleryItemSchema),
})

export const ministryItemSchema = zod.object({
  slug: zod.string(),
  title: zod.string(),
  description: zod.string(),
  path: zod.string(),
  emoji: zod.string().optional(),
  available: zod.boolean().default(true),
})

export const ministeriosContentSchema = zod.object({
  slug: zod.literal('ministerios'),
  meta: zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
  hero: zod.object({
    title: zod.string(),
    subtitle: zod.string(),
  }),
  ministries: zod.array(ministryItemSchema),
})

export const projectSchema = zod.object({
  emoji: zod.string(),
  title: zod.string(),
  description: zod.string(),
})

export const valueSchema = zod.object({
  icon: zod.enum(['heart', 'users', 'smile', 'cross']),
  title: zod.string(),
  description: zod.string(),
})

export const ministryLandingFields = {
  meta: zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
  hero: zod.object({
    title: zod.string(),
    highlight: zod.string(),
    subtitle: zod.string(),
    tagline: zod.string(),
    backgroundImage: zod.string(),
    backgroundImages: zod.array(zod.string()).min(1).optional(),
    overlay: zod.string().optional(),
    ctaLabel: zod.string(),
    ctaHref: zod.string(),
  }),
  about: zod.object({
    title: zod.string(),
    paragraphs: zod.array(zod.string()),
    highlight: zod.string().optional(),
  }),
  video: zod
    .object({
      title: zod.string(),
      titleHighlight: zod.string(),
      description: zod.string(),
      url: zod
        .string()
        .refine((u) => parseVideoUrl(u) !== null, {
          message: 'video.url must be a supported YouTube or Google Drive link',
        }),
    })
    .optional(),
  projects: zod.object({
    title: zod.string(),
    titleHighlight: zod.string(),
    description: zod.string(),
    items: zod.array(projectSchema),
  }),
  inspiration: zod.object({
    title: zod.string(),
    titleHighlight: zod.string(),
    backgroundImage: zod.string(),
    paragraphs: zod.array(zod.string()),
  }),
  values: zod.object({
    title: zod.string(),
    titleHighlight: zod.string(),
    items: zod.array(valueSchema),
  }),
  quote: zod.object({
    text: zod.string(),
    author: zod.string(),
  }),
}

export const ministryLandingContentSchema = zod.object(ministryLandingFields)

export const deaAjudaContentSchema = ministryLandingContentSchema.extend({
  slug: zod.literal('dea-ajuda'),
})

export const perseverancaContentSchema = ministryLandingContentSchema.extend({
  slug: zod.literal('perseveranca'),
})

export const checklistItemSchema = zod.object({
  id: zod.string(),
  description: zod.string(),
  category: zod.enum(['navigation', 'visual', 'content', 'footer']),
})

export const checklistSchema = zod.object({
  version: zod.string(),
  items: zod.array(checklistItemSchema),
})

export type VersionSpec = zod.infer<typeof versionSchema>
export type RoutesSpec = zod.infer<typeof routesSchema>
export type ParagraphSection = zod.infer<typeof paragraphSectionSchema>
export type CardSection = zod.infer<typeof cardSectionSchema>
export type QuoteBlock = zod.infer<typeof quoteBlockSchema>
export type ContentSection = zod.infer<typeof contentSectionSchema>
export type ContentPage = zod.infer<typeof contentPageSchema>
export type HomeContent = zod.infer<typeof homeContentSchema>
export type TitulosNossaSenhoraContent = zod.infer<typeof titulosNossaSenhoraContentSchema>
export type NossaSenhoraAuxiliadoraContent = zod.infer<
  typeof nossaSenhoraAuxiliadoraContentSchema
>
export type NossaSenhoraMedjugorjeContent = zod.infer<
  typeof nossaSenhoraMedjugorjeContentSchema
>
export type NossaSenhoraAparecidaContent = zod.infer<
  typeof nossaSenhoraAparecidaContentSchema
>
export type NossaSenhoraLaSaletteContent = zod.infer<
  typeof nossaSenhoraLaSaletteContentSchema
>
export type NossaSenhoraLourdesContent = zod.infer<typeof nossaSenhoraLourdesContentSchema>
export type NossaSenhoraGuadalupeContent = zod.infer<typeof nossaSenhoraGuadalupeContentSchema>
export type NossaSenhoraDasGracasContent = zod.infer<typeof nossaSenhoraDasGracasContentSchema>
export type NossaSenhoraDaComunicacaoContent = zod.infer<
  typeof nossaSenhoraDaComunicacaoContentSchema
>
export type NossaSenhoraDasDoresContent = zod.infer<typeof nossaSenhoraDasDoresContentSchema>
export type NossaSenhoraDeFatimaContent = zod.infer<typeof nossaSenhoraDeFatimaContentSchema>
export type PerseverancaContent = zod.infer<typeof perseverancaContentSchema>
export type MinisteriosContent = zod.infer<typeof ministeriosContentSchema>
export type MinistryLandingContent = zod.infer<typeof ministryLandingContentSchema>
export type DeaAjudaContent = zod.infer<typeof deaAjudaContentSchema>
export type ChecklistSpec = zod.infer<typeof checklistSchema>

export type ContentSlug =
  | 'home'
  | 'titulos-nossa-senhora'
  | 'nossa-senhora-auxiliadora'
  | 'nossa-senhora-medjugorje'
  | 'nossa-senhora-aparecida'
  | 'nossa-senhora-la-salette'
  | 'nossa-senhora-lourdes'
  | 'nossa-senhora-guadalupe'
  | 'nossa-senhora-das-gracas'
  | 'nossa-senhora-da-comunicacao'
  | 'nossa-senhora-das-dores'
  | 'nossa-senhora-de-fatima'
  | 'ministerios'
  | 'perseveranca'
  | 'dea-ajuda'

const contentSchemas = {
  home: homeContentSchema,
  'titulos-nossa-senhora': titulosNossaSenhoraContentSchema,
  'nossa-senhora-auxiliadora': nossaSenhoraAuxiliadoraContentSchema,
  'nossa-senhora-medjugorje': nossaSenhoraMedjugorjeContentSchema,
  'nossa-senhora-aparecida': nossaSenhoraAparecidaContentSchema,
  'nossa-senhora-la-salette': nossaSenhoraLaSaletteContentSchema,
  'nossa-senhora-lourdes': nossaSenhoraLourdesContentSchema,
  'nossa-senhora-guadalupe': nossaSenhoraGuadalupeContentSchema,
  'nossa-senhora-das-gracas': nossaSenhoraDasGracasContentSchema,
  'nossa-senhora-da-comunicacao': nossaSenhoraDaComunicacaoContentSchema,
  'nossa-senhora-das-dores': nossaSenhoraDasDoresContentSchema,
  'nossa-senhora-de-fatima': nossaSenhoraDeFatimaContentSchema,
  ministerios: ministeriosContentSchema,
  perseveranca: perseverancaContentSchema,
  'dea-ajuda': deaAjudaContentSchema,
} as const

export function getContentSchema(slug: ContentSlug) {
  return contentSchemas[slug]
}
