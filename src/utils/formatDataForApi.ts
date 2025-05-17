export const formatDateForApi = (dateString: string): string => {
  if (!dateString) return ''

  // 정규표현식으로 날짜 형식 추출
  const matches = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  if (!matches) return dateString

  const [_, year, month, day] = matches
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}
