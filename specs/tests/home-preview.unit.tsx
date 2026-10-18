/**
 * 2.5.0-snapshot (item 5a): o botão preview aparece com `previewCta` e some sem ele.
 * Roda com `npm run test:preview` (sem navegador).
 */
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { HomePreviewCta } from '../../components/ui/HomePreviewCta'
import { homeContentSchema } from '../../lib/specs/types'
import home from '../content/home.json'

const withField = homeContentSchema.parse(home)
const { previewCta: _omit, ...rest } = home as typeof home & { previewCta?: unknown }
const withoutField = homeContentSchema.parse(rest)

const present = renderToStaticMarkup(<HomePreviewCta cta={{ label: 'Ministérios', href: '/ministerios', badge: 'preview' }} />)
assert.match(present, /data-testid="home-preview-ministerios"/)
assert.match(present, /href="\/ministerios"/)
assert.match(present, />preview</)

assert.equal(withoutField.previewCta, undefined)
assert.equal(renderToStaticMarkup(<HomePreviewCta cta={withoutField.previewCta} />), '')

if (withField.previewCta) {
  assert.match(renderToStaticMarkup(<HomePreviewCta cta={withField.previewCta} />), /home-preview-ministerios/)
}
assert.throws(() => homeContentSchema.parse({ ...home, previewCta: { label: 'x', href: '/ministerios', badge: 'beta' } }))

console.log('✓ HomePreviewCta: presente com previewCta, ausente sem ele.')
