import { z as zod } from 'zod'

const dateSchema = zod.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date) => {
  const parsed = new Date(`${date}T12:00:00Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date
}, 'Data inválida')
const timeSchema = zod.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
const venueSchema = zod.object({ name: zod.string().min(1), address: zod.string().min(1) })

export const meetingScheduleSchema = zod.object({
  title: zod.string().min(1),
  timeZone: zod.literal('America/Sao_Paulo'),
  weekday: zod.number().int().min(0).max(6),
  startTime: timeSchema,
  endTime: timeSchema,
  venue: venueSchema,
  additionalHolidays: zod.array(dateSchema),
  exceptions: zod.array(zod.discriminatedUnion('status', [
    zod.object({ date: dateSchema, status: zod.literal('cancelled') }),
    zod.object({
      date: dateSchema,
      status: zod.literal('scheduled'),
      startTime: timeSchema.optional(),
      endTime: timeSchema.optional(),
      venue: venueSchema.optional(),
    }),
  ])),
}).superRefine((schedule, ctx) => {
  if (schedule.endTime <= schedule.startTime) {
    ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ['endTime'], message: 'O término deve ser após o início, no mesmo dia' })
  }
  const dates = new Set<string>()
  schedule.exceptions.forEach((exception, index) => {
    if (dates.has(exception.date)) {
      ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ['exceptions', index, 'date'], message: 'Exceção duplicada' })
    }
    dates.add(exception.date)
    if (exception.status === 'scheduled' && (exception.endTime ?? schedule.endTime) <= (exception.startTime ?? schedule.startTime)) {
      ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ['exceptions', index], message: 'O término deve ser após o início, no mesmo dia' })
    }
  })
})

export type MeetingSchedule = zod.infer<typeof meetingScheduleSchema>
export type Meeting = Pick<MeetingSchedule, 'startTime' | 'endTime' | 'venue'> & { date: string }

function addDays(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}

/** Páscoa gregoriana (computus de Meeus/Jones/Butcher), para os feriados móveis. */
function easterDate(year: number): string {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = (h + l - 7 * m + 114) % 31 + 1
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Feriados legais aplicáveis a Maringá; fontes e manutenção em specs/spec-2.8.0.md. */
export function meetingHolidays(year: number): Set<string> {
  const fixed = ['01-01', '04-21', '05-01', '09-07', '10-12', '11-02', '11-15', '11-20', '12-25', '08-15']
  const easter = easterDate(year)
  // O aniversário é observado na 2ª segunda-feira de maio, exceto quando 10/05 é domingo.
  const mayFirstWeekday = new Date(`${year}-05-01T12:00:00Z`).getUTCDay()
  const secondMonday = 8 + (8 - mayFirstWeekday) % 7
  const may10 = `${year}-05-10`
  const anniversary = new Date(`${may10}T12:00:00Z`).getUTCDay() === 0 ? may10 : `${year}-05-${String(secondMonday).padStart(2, '0')}`
  // 19/12 (Paraná), Carnaval e vésperas de Natal/Ano Novo são pontos facultativos.
  return new Set([...fixed.map((date) => `${year}-${date}`), addDays(easter, -2), addDays(easter, 60), anniversary])
}

/** Próximo início futuro, independentemente do fuso do navegador ou do servidor. */
export function getNextMeeting(schedule: MeetingSchedule, now: Date): Meeting | null {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: schedule.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((value) => value.type === type)!.value
  const today = `${part('year')}-${part('month')}-${part('day')}`
  const clock = `${part('hour')}:${part('minute')}`
  const holidaysByYear = new Map<number, Set<string>>()
  const additionalHolidays = new Set(schedule.additionalHolidays)
  const exceptions = new Map(schedule.exceptions.map((exception) => [exception.date, exception]))
  // ponytail: busca limitada a um ano; sem programação no período, a UI mostra o estado vazio.
  for (let offset = 0; offset <= 366; offset++) {
    const date = addDays(today, offset)
    const year = Number(date.slice(0, 4))
    const holidays = holidaysByYear.get(year) ?? meetingHolidays(year)
    holidaysByYear.set(year, holidays)
    const exception = exceptions.get(date)
    if (exception?.status === 'cancelled') continue
    if (exception?.status !== 'scheduled' && (new Date(`${date}T12:00:00Z`).getUTCDay() !== schedule.weekday || holidays.has(date) || additionalHolidays.has(date))) continue
    const startTime = exception?.startTime ?? schedule.startTime
    if (date === today && startTime <= clock) continue
    return { date, startTime, endTime: exception?.endTime ?? schedule.endTime, venue: exception?.venue ?? schedule.venue }
  }
  return null
}

export function googleCalendarUrl(schedule: MeetingSchedule, meeting: Meeting): string {
  const dateTime = (time: string) => `${meeting.date.replaceAll('-', '')}T${time.replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: schedule.title,
    dates: `${dateTime(meeting.startTime)}/${dateTime(meeting.endTime)}`,
    ctz: schedule.timeZone,
    location: `${meeting.venue.name}, ${meeting.venue.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export function meetingMapUrls(venue: Meeting['venue']) {
  const query = encodeURIComponent(`${venue.name}, ${venue.address}`)
  return {
    embed: `https://maps.google.com/maps?q=${query}&output=embed`,
    external: `https://www.google.com/maps/search/?api=1&query=${query}`,
  }
}
