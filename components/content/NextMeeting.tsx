'use client'

import { useEffect, useState } from 'react'
import { getNextMeeting, googleCalendarUrl, meetingMapUrls, type MeetingSchedule } from '@/lib/meetings'
import type { HomeContent } from '@/lib/specs/types'

export function NextMeeting({ schedule, labels }: { schedule: MeetingSchedule; labels: HomeContent['meetingLabels'] }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const refresh = () => setNow(new Date())
    refresh()
    const interval = window.setInterval(refresh, 30_000)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])
  const meeting = now ? getNextMeeting(schedule, now) : null
  const venue = meeting?.venue ?? schedule.venue
  const maps = meetingMapUrls(venue)
  const dateLabel = meeting && new Intl.DateTimeFormat('pt-BR', {
    timeZone: schedule.timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).formatToParts(new Date(`${meeting.date}T12:00:00Z`))
    .map(({ type, value }) => type === 'weekday'
      ? value.replace(/(^|-)\p{L}/gu, initial => initial.toLocaleUpperCase('pt-BR'))
      : value)
    .join('')

  return (
    <div className="meeting" data-testid="next-meeting">
      <h3>{labels.heading}</h3>
      <div aria-live="polite" aria-atomic="true">
        {meeting ? (
          <>
            <p className="meeting-date"><time dateTime={meeting.date}>{dateLabel}</time></p>
            <p><time dateTime={meeting.startTime}>{meeting.startTime}</time> às <time dateTime={meeting.endTime}>{meeting.endTime}</time> · {labels.timezone}</p>
          </>
        ) : <p>{now ? labels.empty : labels.loading}</p>}
      </div>
      <p>{venue.name}<br />{venue.address}</p>
      <p className="meeting-note">{labels.holidayNotice}</p>
      <div className="ctas-v2">
        {meeting && <a className="btn-manto" href={googleCalendarUrl(schedule, meeting)} target="_blank" rel="noopener noreferrer">
          {labels.calendar}<span className="sr-only"> (abre em nova aba)</span>
        </a>}
        <a className="btn-outline-manto" href={maps.external} target="_blank" rel="noopener noreferrer">
          {labels.maps}<span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
      <iframe title={`${venue.name} — Google Maps`} src={maps.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  )
}
