import { BlackCalendarIcon, GrayRightArrowIcon } from '@/assets/svgComponents'
import { PickupOrder } from '@/types/mypage'
import Image from 'next/image'
import { useOrderStore } from '@/store/orderStore'

interface PickUpStatusCardProps extends PickupOrder {}

const PickUpStatusCard: React.FC<PickUpStatusCardProps> = ({
  messageId,
  storeName,
  designName,
  designUrl,
  size,
  cream,
  sheet,
  progressStatus,
  pickupDate,
  pickupTime,
}) => {
  // 진행 상태에 따른 UI 계산
  const getProgressInfo = (status: string) => {
    const isCompleted = status === 'PICKUP_DONE'

    switch (status) {
      case 'RESERVED':
        return {
          step: 1,
          progressWidth: '4.688rem',
          statusText: '예약 완료',
          isCompleted: false,
        }
      case 'BAKING_DONE':
        return {
          step: 2,
          progressWidth: '9.376rem',
          statusText: '베이킹 완료',
          isCompleted: false,
        }
      case 'PICKUP_DONE':
        return {
          step: 3,
          progressWidth: '100%',
          statusText: '픽업 완료',
          isCompleted: true,
        }
      default:
        return {
          step: 1,
          progressWidth: '4.688rem',
          statusText: '예약 완료',
          isCompleted: false,
        }
    }
  }

  const progressInfo = getProgressInfo(progressStatus)

  // 색상 클래스 결정
  const getColorClasses = (stepNumber: number, currentStep: number, isCompleted: boolean) => {
    if (isCompleted) {
      // 픽업 완료인 경우 모든 단계를 회색으로
      return {
        dotColor: 'bg-gray-600',
        textColor: 'text-gray-600',
        progressBarColor: 'border-gray-600',
      }
    } else {
      // 픽업 완료가 아닌 경우 기존 로직 유지
      const isActive = stepNumber <= currentStep
      return {
        dotColor: isActive ? 'bg-blue-400' : 'bg-gray-300',
        textColor: isActive ? 'text-blue-400' : 'text-gray-300',
        progressBarColor: 'border-blue-400',
      }
    }
  }

  const colorClasses = getColorClasses(1, progressInfo.step, progressInfo.isCompleted)

  const formatPickupDateTime = (pickupDate: string, pickupTime: string): string => {
    if (!pickupDate || !pickupTime) return '시간이 입력되지 않았어요'

    // 요일 한글로 매핑
    const dayMap = ['일', '월', '화', '수', '목', '금', '토']

    // 1. 날짜에서 년/월/일 추출
    const match = pickupDate.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/)
    if (!match) return ''

    const [, year, month, day] = match
    const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
    const dayOfWeek = dayMap[date.getDay()]

    // 2. 시간에서 시/분 추출
    const timeMatch = pickupTime.match(/(\d{1,2})시 (\d{2})분/)
    if (!timeMatch) return ''

    let [_, hourStr, minuteStr] = timeMatch
    let hour = parseInt(hourStr, 10)
    const isPM = hour >= 12

    // 3. 12시간제로 변환
    if (hour === 0) hour = 12
    if (hour > 12) hour -= 12

    const meridiem = isPM ? '오후' : '오전'

    // 4. 최종 포맷
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}(${dayOfWeek}) ${meridiem} ${hour}:${minuteStr}`
  }

  const setOrderState = useOrderStore((state) => state.setState)
  return (
    <div
      className="relative flex flex-col gap-y-[0.75rem] rounded-[0.25rem] bg-white"
      style={{ boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <section className="flex items-center justify-between px-[0.75rem] pt-[0.75rem]">
        <div className="flex">
          <BlackCalendarIcon width={24} height={24} />
          <h3 className="body-m text-gray-900">
            <span className="title-l text-gray-700">{formatPickupDateTime(pickupDate, pickupTime)}</span>
          </h3>
        </div>
        <button
          onClick={() => {
            setOrderState({ messageId: messageId, isOrderOpen: true })
          }}
          className="bg-gray-150 body-m-m flex h-fit items-center gap-x-[0.25rem] rounded-[0.25rem] px-[0.438rem] py-[0.25rem] text-gray-500"
        >
          주문서 보기
          <GrayRightArrowIcon width={5} height={10} />
        </button>
      </section>

      <section className="flex gap-x-[0.625rem] px-[0.75rem] pb-[3.75rem]">
        <div className="relative h-[5rem] w-[5rem]">
          <Image
            alt={designName}
            src={designUrl || '/common/cake1.png'}
            fill
            className="rounded-[0.25rem] object-cover"
          />
        </div>
        <div className="truncate overflow-hidden">
          <h3 className="title-l">{storeName}</h3>
          <p className="body-m-m mt-[0.375rem] text-gray-700">{designName}</p>
          <p className="body-m-m text-gray-400">
            {size} / [크림] {cream} / [시트] {sheet}
          </p>
        </div>
      </section>

      {/* 진행 바 배경 (점선/실선 조건부) */}
      <div
        className={`absolute bottom-[2.5rem] h-[0.063rem] w-full border-b ${
          progressInfo.isCompleted ? 'border-solid border-gray-600' : 'border-dashed border-gray-300'
        }`}
      ></div>

      {/* 진행 바 (상태에 따라 파란색 또는 회색) */}
      <div
        className={`absolute bottom-[2.5rem] h-[0.063rem] border-b ${colorClasses.progressBarColor} ${
          progressInfo.isCompleted ? 'border-solid' : ''
        }`}
        style={{ width: progressInfo.progressWidth }}
      ></div>

      <div className="absolute bottom-[0.75rem] left-0 flex w-full justify-between px-[1.25rem]">
        {/* 예약 완료 */}
        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div
            className={`h-[0.375rem] w-[0.375rem] rounded-full ${
              getColorClasses(1, progressInfo.step, progressInfo.isCompleted).dotColor
            }`}
          />
          <p className={`chip-s-bold ${getColorClasses(1, progressInfo.step, progressInfo.isCompleted).textColor}`}>
            예약 완료
          </p>
        </div>

        {/* 베이킹 완료 */}
        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div
            className={`h-[0.375rem] w-[0.375rem] rounded-full ${
              getColorClasses(2, progressInfo.step, progressInfo.isCompleted).dotColor
            }`}
          />
          <p className={`chip-s-bold ${getColorClasses(2, progressInfo.step, progressInfo.isCompleted).textColor}`}>
            베이킹 완료
          </p>
        </div>

        {/* 픽업 완료 */}
        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div
            className={`h-[0.375rem] w-[0.375rem] rounded-full ${
              getColorClasses(3, progressInfo.step, progressInfo.isCompleted).dotColor
            }`}
          />
          <p className={`chip-s-bold ${getColorClasses(3, progressInfo.step, progressInfo.isCompleted).textColor}`}>
            픽업 완료
          </p>
        </div>
      </div>
    </div>
  )
}

export default PickUpStatusCard
