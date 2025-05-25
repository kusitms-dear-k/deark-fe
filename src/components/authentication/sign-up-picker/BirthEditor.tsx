import { Dispatch, SetStateAction, useState } from 'react'
import { CustomerSignUpType } from '@/types/authentication'
import Calendar from '@/components/search/CustomCalendar' // 커스텀 달력 경로로 맞게 수정

interface Props {
  setPickerSignUpInfo: Dispatch<SetStateAction<CustomerSignUpType | null>>
}

const BirthEditor = ({ setPickerSignUpInfo }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // 날짜 선택 시 상태 업데이트
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setPickerSignUpInfo((prev) => ({
      ...prev!,
      birthDate: date ? date.toISOString().split('T')[0] : null, // YYYY-MM-DD
    }))
  }

  return (
    <section className="flex flex-col gap-y-1">
      <p className="title-l text-gray-800">생년월일</p>
      <div className="default-input">
        <Calendar mode="single" value={selectedDate} setValue={handleDateChange} />
      </div>
      <div className="caption-m h-4"></div>
    </section>
  )
}

export default BirthEditor
