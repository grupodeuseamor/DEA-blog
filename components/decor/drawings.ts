/**
 * v2 — banco de desenhos à mão (design doc, seção 6). Nome → viewBox + traços SVG.
 * Cor sempre por currentColor (classe de token no componente que usa). Nunca hex.
 */
import type { DecorDrawing } from '@/lib/specs/decor'

export type DrawingDef = { viewBox: string; body: string }

export const drawings: Record<DecorDrawing, DrawingDef> = {
  'brilho': { viewBox: '0 0 48 48', body: '<path d="M24 4c1.4 11 5 15.6 20 20-15 4.4-18.6 9-20 20-1.4-11-5-15.6-20-20 15-4.4 18.6-9 20-20z"/>' },
  'brilhinhos': { viewBox: '0 0 48 48', body: '<path d="M19 6c1 9 3.6 13 15 15-11.4 2-14 6-15 15-1-9-3.6-13-15-15 11.4-2 14-6 15-15z"/><path d="M38 28c.5 4 1.6 5.6 7 6.5-5.4 1-6.5 2.5-7 6.5-.5-4-1.6-5.5-7-6.5 5.4-.9 6.5-2.5 7-6.5z"/>' },
  'estrela': { viewBox: '0 0 48 48', body: '<path d="M24 5l5.6 12.4 13.4 1.4-10 9.2 2.9 13.2L24 34.6 12.1 41.2 15 28 5 18.8l13.4-1.4z"/>' },
  'respingo': { viewBox: '0 0 48 48', body: '<path d="M24 14c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z"/><path d="M24 4v4M24 40v4M4 24h4M40 24h4M10 10l3 3M35 35l3 3M38 10l-3 3M13 35l-3 3"/>' },
  'raios': { viewBox: '0 0 48 48', body: '<path d="M24 4v10M24 34v10M4 24h10M34 24h10M10 10l7 7M31 31l7 7M38 10l-7 7M17 31l-7 7"/>' },
  'orbita': { viewBox: '0 0 60 48', body: '<path d="M6 30c0-8 11-15 24-15s24 7 24 15-11 12-24 12S6 38 6 30z"/><circle cx="30" cy="14" r="3"/>' },
  'selo-estrelado': { viewBox: '0 0 48 48', body: '<circle cx="24" cy="24" r="19" style="fill:none;stroke:currentColor"/><path d="M24 13l3.2 7 7.6.8-5.7 5.2 1.6 7.5L24 29.8l-6.7 3.7 1.6-7.5-5.7-5.2 7.6-.8z"/>' },
  'coracao-chama': { viewBox: '0 0 48 56', body: '<path d="M24 52C11 43 5 36 5 28c0-6 4.5-10 9.6-10 4.4 0 7.6 2.7 9.4 6.3 1.8-3.6 5-6.3 9.4-6.3C38.5 18 43 22 43 28c0 8-6 15-19 24z"/><path d="M24 17c-4-2.6-4.6-7-2.2-11 .7 2.2 2 2.8 3.2 2.5-1-3.6.4-6.9 3.6-8.8-.7 3.9 2.8 6.3 2.4 10.3-.3 3.4-2.8 5.8-7 7z"/>' },
  'chama': { viewBox: '0 0 40 56', body: '<path d="M20 52c-9 0-14-6-14-14 0-9 8-14 9-24 4 4 5 8 4 12 3-2 5-6 5-10 6 6 10 13 10 22 0 8-5 14-14 14z"/>' },
  'pomba': { viewBox: '0 0 64 48', body: '<path d="M5 30c8 5 19 5 27-1l9-6c4-2.6 8-3.2 12-2l6 1.4-6 3c-2.4 6.4-8.6 11.6-18 13.4C25 40.6 13 38.4 5 30z"/><path d="M23 28c-2.4-9-.4-17 7.6-23 3.4 7 3.6 14 .4 20.4"/><path d="M31 26c2.4-7 8-11.4 15.6-12.6-1.8 6-5.8 10.4-11.6 13.4"/>' },
  'coroa-espinhos': { viewBox: '0 0 64 40', body: '<path d="M6 20c0-7 12-12 26-12s26 5 26 12-12 12-26 12S6 27 6 20z"/><path d="M14 12l-3-6M26 9l-1-6M40 9l1-6M52 12l3-6M14 29l-3 6M32 32v6M50 29l3 6"/>' },
  'cruz': { viewBox: '0 0 40 56', body: '<path d="M17 3h6v14h12v6H23v30h-6V23H5v-6h12z"/>' },
  'terco': { viewBox: '0 0 60 80', body: '<circle cx="23.2" cy="42.8" r="2.3"/><circle cx="17.1" cy="39.3" r="2.3"/><circle cx="12.7" cy="34.0" r="2.3"/><circle cx="10.3" cy="27.5" r="2.3"/><circle cx="10.3" cy="20.5" r="2.3"/><circle cx="12.7" cy="14.0" r="2.3"/><circle cx="17.1" cy="8.7" r="2.3"/><circle cx="23.2" cy="5.2" r="2.3"/><circle cx="30.0" cy="4.0" r="2.3"/><circle cx="36.8" cy="5.2" r="2.3"/><circle cx="42.9" cy="8.7" r="2.3"/><circle cx="47.3" cy="14.0" r="2.3"/><circle cx="49.7" cy="20.5" r="2.3"/><circle cx="49.7" cy="27.5" r="2.3"/><circle cx="47.3" cy="34.0" r="2.3"/><circle cx="42.9" cy="39.3" r="2.3"/><circle cx="36.8" cy="42.8" r="2.3"/><path d="M30 44v10M30 54v22M23 61h14"/>' },
  'vela': { viewBox: '0 0 48 60', body: '<path d="M17 26h14v28H17zM24 20c-3.6-2.6-3.8-7 0-12 3.8 5 3.6 9.4 0 12zM24 13.5v3M11 54h26M31 32c-2 0-3 2-3 4"/><path d="M8 12l-3-2M40 12l3-2M6 22H2M42 22h4" style="opacity:.7"/>' },
  'aureola': { viewBox: '0 0 60 30', body: '<path d="M6 15c0-5 11-9 24-9s24 4 24 9-11 9-24 9S6 20 6 15z"/><path d="M14 15c0-2 7-4 16-4s16 2 16 4" style="opacity:.6"/>' },
  'lirio': { viewBox: '0 0 48 56', body: '<path d="M24 54V26M24 45c-6.4 0-10.4-4-11.4-9.4 6.2.2 10.2 3.4 11.4 9.4zM24 41c6.4 0 10.4-4 11.4-9.4-6.2.2-10.2 3.4-11.4 9.4zM24 26c-5-5-5.4-13 0-20.4 5.4 7.4 5 15.4 0 20.4zM24 26c-7.4 0-12.4-5-13.4-12.6 6.6.2 11.4 4.4 13.4 12.6zM24 26c7.4 0 12.4-5 13.4-12.6-6.6.2-11.4 4.4-13.4 12.6z"/>' },
  'coroa': { viewBox: '0 0 64 52', body: '<path d="M8 40L5 14l13 12 14-20 14 20 13-12-3 26z"/><path d="M8 47h48"/><circle cx="5" cy="11" r="2.4"/><circle cx="32" cy="4" r="2.4"/><circle cx="59" cy="11" r="2.4"/><path d="M24 34h16" style="opacity:.6"/>' },
  'gota': { viewBox: '0 0 48 48', body: '<path d="M24 6c7 10 13 17 13 24a13 13 0 0 1-26 0c0-7 6-14 13-24z"/><path d="M18 31c0 3 2 6 5 7" style="opacity:.6"/>' },
  'nuvem': { viewBox: '0 0 64 40', body: '<path d="M14 34c-6 0-10-4-10-9s4-9 10-9c1-6 7-11 14-11 8 0 14 5 15 12 6 0 11 4 11 9s-5 8-11 8z"/>' },
  'onda': { viewBox: '0 0 96 30', body: '<path d="M2 15c8-10 16-10 23 0s15 10 23 0 15-10 23 0 15 10 23 0"/><path d="M14 26c6-6 12-6 18 0s12 6 18 0" style="opacity:.6"/>' },
  'coracao': { viewBox: '0 0 48 44', body: '<path d="M24 40C11 31 5 24 5 16c0-6 4.5-10 9.6-10 4.4 0 7.6 2.7 9.4 6.3 1.8-3.6 5-6.3 9.4-6.3C38.5 6 43 10 43 16c0 8-6 15-19 24z"/>' },
  'louvor': { viewBox: '0 0 48 56', body: '<path d="M18 44V10l22-6v34"/><circle cx="12" cy="44" r="6"/><circle cx="34" cy="38" r="6"/><path d="M18 18l22-6"/>' },
  'pregacao': { viewBox: '0 0 56 48', body: '<path d="M6 8h44v26H24l-10 9v-9H6z"/><path d="M14 17h28M14 25h18" style="opacity:.7"/>' },
  'sublinhado': { viewBox: '0 0 300 18', body: '<path d="M3 11c38-7 78-8 118-3s92 6 176-5" style="stroke-width:4"/><path d="M30 15c50-4 110-4 200-6" style="stroke-width:2;opacity:.6"/>' },
  'circulo': { viewBox: '0 0 100 40', body: '<path d="M50 4C80 3 97 10 97 20S78 37 50 37 3 31 3 20 20 5 50 4c9 0 15 1 19 3"/>' },
  'seta': { viewBox: '0 0 80 60', body: '<path d="M6 8C10 30 30 46 66 44"/><path d="M55 34l12 10-12 9"/>' },
  'asterisco': { viewBox: '0 0 48 48', body: '<path d="M24 6v36M8.4 15l31.2 18M39.6 15 8.4 33"/>' },
  'aspas': { viewBox: '0 0 60 40', body: '<path d="M8 34c8-4 12-10 12-18 0-5-3-8-7-8s-7 3-7 7 3 7 7 7M34 34c8-4 12-10 12-18 0-5-3-8-7-8s-7 3-7 7 3 7 7 7"/>' },
}

/** Logo provisória Cruz e Coração (traço único). O coração é preenchido com a cor do fundo via `var(--logo-fundo)`. */
export const logoDrawing: DrawingDef = {
  viewBox: '0 0 40 50',
  body:
    '<path d="M17 3h6v10h11v6H23v28h-6V19H6v-6h11z"/><path d="M20 37c-7-4.6-11-8.6-11-13 0-3.2 2.4-5.4 5.3-5.4 2.4 0 4.4 1.4 5.7 3.3 1.3-1.9 3.3-3.3 5.7-3.3 2.9 0 5.3 2.2 5.3 5.4 0 4.4-4 8.4-11 13z" style="fill:var(--logo-fundo)"/><path d="M20 19.6c-2.4-1.5-2.9-4.1-1.4-6.4.4 1.3 1.2 1.7 1.9 1.5-.6-2.1.2-4.1 2.1-5.3-.4 2.3 1.7 3.7 1.4 6.1-.2 2-1.6 3.4-4 4.1z" style="fill:var(--logo-fundo)"/><path d="M10.3 25.2c3 1.5 6.2 2.1 9.7 2.1s6.7-.6 9.7-2.1M10.9 27.8c3 1.4 6 1.9 9.1 1.9s6.1-.5 9.1-1.9M13.4 26.2l-.9-2M17.2 27.2l.3-2.1M22.8 27.2l-.3-2.1M26.6 26.2l.9-2"/>',
}
