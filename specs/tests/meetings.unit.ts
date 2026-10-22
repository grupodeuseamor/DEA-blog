import assert from 'node:assert/strict'
import { getNextMeeting, googleCalendarUrl, meetingHolidays, meetingMapUrls, meetingScheduleSchema } from '../../lib/meetings'
import { getEntryFlow, getTopLevelFlow, isNavItemActive } from '../../lib/specs/nav'
import scheduleJson from '../meetings.json'
import routes from '../routes.json'

const schedule = meetingScheduleSchema.parse(scheduleJson)
const next = (instant: string, config = schedule) => getNextMeeting(config, new Date(instant))

for (const [instant, date] of [
  ['2026-10-19T12:00:00Z', '2026-10-22'],
  ['2026-10-22T22:29:00Z', '2026-10-22'], // 19h29 em Maringá
  ['2026-10-22T22:30:00Z', '2026-10-29'], // início passado
  ['2026-10-23T01:00:00Z', '2026-10-29'], // ainda quinta em Maringá
  ['2026-12-31T23:59:00Z', '2027-01-07'],
  ['2025-12-31T12:00:00Z', '2026-01-08'], // feriado na virada
  ['2026-06-01T12:00:00Z', '2026-06-11'], // Corpus Christi
  ['2025-11-19T12:00:00Z', '2025-11-27'], // Consciência Negra
  ['2030-08-14T12:00:00Z', '2030-08-22'], // padroeira municipal
  ['2026-12-23T12:00:00Z', '2026-12-24'], // facultativo não cancela
  ['2030-12-18T12:00:00Z', '2030-12-19'], // emancipação PR: facultativo
  ['2029-05-09T12:00:00Z', '2029-05-10'], // aniversário observado na segunda
]) assert.equal(next(instant)?.date, date, instant)
for (const [year, date] of [[2026, '2026-04-03'], [2027, '2027-05-27'], [2026, '2026-05-10'], [2029, '2029-05-14'], [2023, '2023-05-08']] as const) {
  assert.ok(meetingHolidays(year).has(date), date)
}

const overridden = meetingScheduleSchema.parse({
  ...schedule,
  exceptions: [
    { date: '2026-06-04', status: 'scheduled', startTime: '18:00', endTime: '20:00', venue: { name: 'Outro local', address: 'Maringá, PR' } },
    { date: '2026-06-11', status: 'cancelled' },
    { date: '2026-06-12', status: 'scheduled' },
  ],
})
const special = next('2026-06-01T12:00:00Z', overridden)!
assert.equal(special.date, '2026-06-04')
assert.equal(special.startTime, '18:00')
assert.equal(special.venue.name, 'Outro local')
assert.equal(next('2026-06-04T21:00:00Z', overridden)?.date, '2026-06-12')
assert.equal(next('2026-10-19T12:00:00Z', { ...schedule, additionalHolidays: ['2026-10-22'] })?.date, '2026-10-29')
const allCancelled = { ...schedule, exceptions: Array.from({ length: 367 }, (_, index) => ({
  date: new Date(Date.UTC(2026, 9, 19 + index)).toISOString().slice(0, 10), status: 'cancelled' as const,
})) }
assert.equal(next('2026-10-19T12:00:00Z', allCancelled), null)

const calendar = new URL(googleCalendarUrl(schedule, next('2026-10-19T12:00:00Z')!))
assert.equal(calendar.searchParams.get('dates'), '20261022T193000/20261022T210000')
assert.equal(calendar.searchParams.get('ctz'), 'America/Sao_Paulo')
assert.equal(calendar.searchParams.get('text'), 'Encontro do Grupo Deus É Amor')
assert.match(calendar.searchParams.get('location')!, /Auditório Dona Guilhermina.*710/)
const specialCalendar = new URL(googleCalendarUrl(overridden, special))
assert.equal(specialCalendar.searchParams.get('dates'), '20260604T180000/20260604T200000')
assert.match(specialCalendar.searchParams.get('location')!, /Outro local/)
assert.match(new URL(meetingMapUrls(special.venue).external).searchParams.get('query')!, /Outro local/)

for (const invalid of [
  { ...schedule, startTime: '25:00' },
  { ...schedule, endTime: '18:00' },
  { ...schedule, additionalHolidays: ['2026-02-30'] },
  { ...schedule, exceptions: [{ date: '2026-10-22', status: 'scheduled', startTime: '22:00' }] },
  { ...schedule, exceptions: [{ date: '2026-10-22', status: 'cancelled' }, { date: '2026-10-22', status: 'scheduled' }] },
]) assert.equal(meetingScheduleSchema.safeParse(invalid).success, false)

assert.equal(getEntryFlow(routes)?.next?.path, '/titulos-nossa-senhora')
assert.equal(getTopLevelFlow('/ministerios', routes)?.next, undefined)
assert.equal(isNavItemActive('/', '/#primeira-vez'), false)
console.log('✓ Encontros: fuso, viradas, feriados, cancelamentos, exceções, agenda, mapa e validação. Fluxo não inclui âncoras.')
