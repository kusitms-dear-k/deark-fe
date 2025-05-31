import { BlackCalendarIcon, GrayRightArrowIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { OrderMenuType, OrderType } from '@/types/mypage'
import { Dispatch, SetStateAction } from 'react'
import { useOrderStore } from '@/store/orderStore'

interface Props extends OrderType {
  status: OrderMenuType
  setIsAcceptedRequestModalOpen: Dispatch<SetStateAction<boolean>>
  setIsRejectedMessageModalOpen: Dispatch<SetStateAction<boolean>>
}

const OrderCard = (props: Props) => {
  const {
    status,
    messageId,
    requestDate,
    storeName,
    designName,
    designImageUrl,
    qaDetails,
    responseStatus,
    setIsAcceptedRequestModalOpen,
    setIsRejectedMessageModalOpen,
  } = props
  const pickupDate = qaDetails.find((q: { title: string }) => q.title === 'pickupDate')?.answer || ''
  const pickupTime = qaDetails.find((q: { title: string }) => q.title === 'pickupTime')?.answer || ''
  const sheet = qaDetails.find((q: { title: string }) => q.title === 'sheet')?.answer || ''
  const size = qaDetails.find((q: { title: string }) => q.title === 'size')?.answer || ''
  const cream = qaDetails.find((q: { title: string }) => q.title === 'cream')?.answer || ''

  const setState = useOrderStore((state) => state.setState)

  function formatShortDate(dateStr: string) {
    const regex = /(\d{4})-(\d{2})-(\d{2})\((.)\)/
    const match = dateStr.match(regex)

    if (!match) return ''

    const [, , month, day, weekday] = match
    return `${month}/${day}(${weekday})`
  }

  function formatKoreanDate(dateStr: string) {
    const regex = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\S+)/
    const match = dateStr.match(regex)

    if (!match) return ''

    const [, year, month, day, weekday] = match
    const yy = year.slice(2)
    const mm = month.padStart(2, '0')
    const dd = day.padStart(2, '0')
    const shortWeekday = weekday.slice(0, 1) // 금요일 → 금

    return `${mm}/${dd}(${shortWeekday})`
  }

  const renderStatusButton = (status: OrderMenuType, messageId: number) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <button
            onClick={() => {
              setIsAcceptedRequestModalOpen(true)
              setState({ messageId: messageId })
            }}
            type={'button'}
            className="blue-400-button w-full"
          >
            메이커 답장 보러가기
          </button>
        )
      case 'REJECTED':
        return (
          <button
            onClick={() => {
              setIsRejectedMessageModalOpen(true)
              setState({ messageId: messageId })
            }}
            type={'button'}
            className="gray-200-700-button h-[42px] w-full"
          >
            메이커 답장 보러가기
          </button>
        )
    }
  }

  return (
    <div className="relative">
      {responseStatus === 'CANCELED' && (
        <div className={'absolute z-10 h-full w-full bg-white object-cover opacity-[60%]'} />
      )}
      <div className="flex w-full flex-col gap-y-[0.5rem] border-b-[0.563rem] border-gray-100 px-[1.25rem] py-[1.5rem]">
        <section className="flex w-full justify-between">
          <div className="flex">
            <BlackCalendarIcon width={24} height={24} />
            <h3 className="body-m text-gray-900">
              <span className="title-l text-gray-700">{formatShortDate(requestDate)}</span> 요청 날짜
            </h3>
          </div>
          <button
            type={'button'}
            onClick={() => {
              setState({ isOrderOpen: true })
              setState({ messageId: messageId })
            }}
            className="bg-gray-150 body-m-m px- flex h-fit items-center gap-x-[0.25rem] rounded-[0.25rem] px-[0.438rem] py-[0.25rem] text-gray-500"
          >
            주문서 보기
            <GrayRightArrowIcon width={5} height={10} />
          </button>
        </section>

        <section className="flex gap-x-[1.25rem]">
          <div className="relative h-[5.625rem] w-[5.625rem]">
            <Image alt="케이크" src={designImageUrl} fill className="rounded-[0.25rem] object-cover" />
          </div>

          <div className="w-[70%]">
            <h2 className="title-l">{storeName}</h2>
            <p className="body-m-m mt-[0.375rem] text-gray-700">{designName}</p>
            <p className="body-m-m line-clamp-1 w-[100%] text-gray-400">
              {`${size ? `${size}` : ''}${cream ? ` / [크림] ${cream}` : ''}${sheet ? ` / [시트] ${sheet}` : ''}`}
            </p>
            {pickupTime && pickupDate && (
              <p className="body-m-m text-blue-400">
                {formatKoreanDate(pickupDate)} {pickupTime} 픽업 희망
              </p>
            )}
          </div>
        </section>

        {renderStatusButton(status, messageId)}
      </div>
    </div>
  )
}
export default OrderCard
