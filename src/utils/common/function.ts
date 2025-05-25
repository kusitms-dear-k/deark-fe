/**
 * 시간 format 하는 함수
 * 1분 미만: "방금 전"
 * 10분 미만: "N분 전"
 * 10분 단위 (최대 1시간): "10분 전", "20분 전", ...
 * 1시간 ~ 24시간: "N시간 전"
 * 1일 이상: "N일 전"
 * @param alarmDateTime 2025-05-01 12:00:00 형태 변경
 */
export const formatTimeAgo = (alarmDateTime: string): string => {
  const now = new Date()
  const received = new Date(alarmDateTime.replace(' ', 'T'))

  const diffMs = now.getTime() - received.getTime()
  const diffMin = Math.floor(diffMs / (1000 * 60))

  if (diffMin < 1) return '방금 전'
  if (diffMin < 10) return `${diffMin}분 전`
  if (diffMin < 60) return `${Math.floor(diffMin / 10) * 10}분 전`

  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}시간 전`

  const diffDay = Math.floor(diffHour / 24)
  return `${diffDay}일 전`
}
