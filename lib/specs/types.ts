import { z } from 'zod'
import { parseVideoUrl } from '@/lib/video/parseVideoUrl'

export const versionSchema = z.object({
  contentVersion: z.string(),
  releasedAt: z.string(),
  approvedBy: z.string(),
  specFile: z.string().optional(),
})

export const routeItemSchema = z.object({
  label: z.string(),
  path: z.string(),
  parent: z.string().optional(),
})

export const routesSchema = z.object({
  items: z.array(routeItemSchema),
})

export const paragraphSectionSchema = z.object({
  type: z.literal('paragraphs'),
  id: z.string().regex(/^[a-z][a-z0-9-]*$/).optional(),
  title: z.string(),
  variant: z.enum(['default', 'highlight']).optional(),
  paragraphs: z.array(z.string()),
  quote: z.string().optional(),
  cta: z
    .object({
      label: z.string(),
      href: z.string(),
      style: z.enum(['instagram', 'primary', 'link']).optional(),
    })
    .optional(),
  secondaryCta: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
})

export const quoteBlockSchema = z.object({
  type: z.literal('quote'),
  text: z.string(),
})

export const cardSectionSchema = z.object({
  type: z.literal('card'),
  title: z.string(),
  variant: z.enum(['default', 'highlight']).optional(),
  paragraphs: z.array(z.string()),
  quote: z.string().optional(),
})

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  quote: z.string().optional(),
  backgroundImage: z.string(),
  backgroundImages: z.array(z.string()).min(1).optional(),
  overlay: z.string().optional(),
  logo: z
    .object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
})

export const contentSectionSchema = z.union([
  paragraphSectionSchema,
  cardSectionSchema,
  quoteBlockSchema,
])

export const contentPageSchema = z.object({
  slug: z.string(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: heroSchema,
  sections: z.array(contentSectionSchema),
})

export const homeContentSchema = contentPageSchema.extend({
  slug: z.literal('home'),
  sections: z.array(paragraphSectionSchema),
  presentation: z.object({
    identification: z.string(),
    participate: z.object({ label: z.string(), href: z.literal('/#primeira-vez') }),
    about: z.object({ label: z.string(), href: z.literal('/#sobre-o-grupo') }),
  }),
  meetingLabels: z.object({
    heading: z.string(),
    calendar: z.string(),
    maps: z.string(),
    loading: z.string(),
    empty: z.string(),
    timezone: z.string(),
    holidayNotice: z.string(),
  }),
  footerInstagram: z.object({
    label: z.string().min(1),
    accessibleLabel: z.string().min(1),
    href: z.string().url().startsWith('https://www.instagram.com/'),
  }),
  /** Botão preview (2.5.0-snapshot, item 5a): opcional e removível — apagar o campo some com o botão. */
  previewCta: z
    .object({ label: z.string(), href: z.string(), badge: z.literal('preview') })
    .optional(),
})

export const nossaSenhoraAuxiliadoraContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-auxiliadora'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraMedjugorjeContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-medjugorje'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraAparecidaContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-aparecida'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraLaSaletteContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-la-salette'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraLourdesContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-lourdes'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraGuadalupeContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-guadalupe'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDasGracasContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-das-gracas'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDaComunicacaoContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-da-comunicacao'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDasDoresContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-das-dores'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})

export const nossaSenhoraDeFatimaContentSchema = contentPageSchema.extend({
  slug: z.literal('nossa-senhora-de-fatima'),
  sections: z.array(z.union([cardSectionSchema, quoteBlockSchema])),
})


export const galleryItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  path: z.string(),
  emoji: z.string().optional(),
  available: z.boolean().default(true),
})

export const titulosNossaSenhoraContentSchema = z.object({
  slug: z.literal('titulos-nossa-senhora'),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  galleries: z.array(galleryItemSchema),
})

export const ministryItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  path: z.string(),
  emoji: z.string().optional(),
  available: z.boolean().default(true),
})

export const ministeriosContentSchema = z.object({
  slug: z.literal('ministerios'),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  ministries: z.array(ministryItemSchema),
})

export const projectSchema = z.object({
  emoji: z.string(),
  title: z.string(),
  description: z.string(),
})

export const valueSchema = z.object({
  icon: z.enum(['heart', 'users', 'smile', 'cross']),
  title: z.string(),
  description: z.string(),
})

export const ministryLandingFields = {
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    highlight: z.string(),
    subtitle: z.string(),
    tagline: z.string(),
    backgroundImage: z.string(),
    backgroundImages: z.array(z.string()).min(1).optional(),
    overlay: z.string().optional(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
  }),
  about: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
    highlight: z.string().optional(),
  }),
  video: z
    .object({
      title: z.string(),
      titleHighlight: z.string(),
      description: z.string(),
      url: z
        .string()
        .refine((u) => parseVideoUrl(u) !== null, {
          message: 'video.url must be a supported YouTube or Google Drive link',
        }),
    })
    .optional(),
  projects: z.object({
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    items: z.array(projectSchema),
  }),
  inspiration: z.object({
    title: z.string(),
    titleHighlight: z.string(),
    backgroundImage: z.string(),
    paragraphs: z.array(z.string()),
  }),
  values: z.object({
    title: z.string(),
    titleHighlight: z.string(),
    items: z.array(valueSchema),
  }),
  quote: z.object({
    text: z.string(),
    author: z.string(),
  }),
}

export const ministryLandingContentSchema = z.object(ministryLandingFields)

export const deaAjudaContentSchema = ministryLandingContentSchema.extend({
  slug: z.literal('dea-ajuda'),
})

export const perseverancaContentSchema = ministryLandingContentSchema.extend({
  slug: z.literal('perseveranca'),
})

export const checklistItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.enum(['navigation', 'visual', 'content', 'footer']),
})

export const checklistSchema = z.object({
  version: z.string(),
  items: z.array(checklistItemSchema),
})

export type VersionSpec = z.infer<typeof versionSchema>
export type RoutesSpec = z.infer<typeof routesSchema>
export type ParagraphSection = z.infer<typeof paragraphSectionSchema>
export type CardSection = z.infer<typeof cardSectionSchema>
export type QuoteBlock = z.infer<typeof quoteBlockSchema>
export type ContentSection = z.infer<typeof contentSectionSchema>
export type ContentPage = z.infer<typeof contentPageSchema>
export type HomeContent = z.infer<typeof homeContentSchema>
export type TitulosNossaSenhoraContent = z.infer<typeof titulosNossaSenhoraContentSchema>
export type NossaSenhoraAuxiliadoraContent = z.infer<
  typeof nossaSenhoraAuxiliadoraContentSchema
>
export type NossaSenhoraMedjugorjeContent = z.infer<
  typeof nossaSenhoraMedjugorjeContentSchema
>
export type NossaSenhoraAparecidaContent = z.infer<
  typeof nossaSenhoraAparecidaContentSchema
>
export type NossaSenhoraLaSaletteContent = z.infer<
  typeof nossaSenhoraLaSaletteContentSchema
>
export type NossaSenhoraLourdesContent = z.infer<typeof nossaSenhoraLourdesContentSchema>
export type NossaSenhoraGuadalupeContent = z.infer<typeof nossaSenhoraGuadalupeContentSchema>
export type NossaSenhoraDasGracasContent = z.infer<typeof nossaSenhoraDasGracasContentSchema>
export type NossaSenhoraDaComunicacaoContent = z.infer<
  typeof nossaSenhoraDaComunicacaoContentSchema
>
export type NossaSenhoraDasDoresContent = z.infer<typeof nossaSenhoraDasDoresContentSchema>
export type NossaSenhoraDeFatimaContent = z.infer<typeof nossaSenhoraDeFatimaContentSchema>
export type PerseverancaContent = z.infer<typeof perseverancaContentSchema>
export type MinisteriosContent = z.infer<typeof ministeriosContentSchema>
export type MinistryLandingContent = z.infer<typeof ministryLandingContentSchema>
export type DeaAjudaContent = z.infer<typeof deaAjudaContentSchema>
export type ChecklistSpec = z.infer<typeof checklistSchema>

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
