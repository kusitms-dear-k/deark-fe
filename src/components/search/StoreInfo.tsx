import Image from 'next/image'
import { BusinessHourType } from '@/types/search'

interface Props {
  isSameDayOrder: true
  is24hSelfService: false
  isLunchBoxCake: true
  storeDescription: string
  storeName: string
  storeAddress: string
  businessHours: BusinessHourType[]
  pickUpHours: BusinessHourType[]
  ownerName: string
  businessNumber: string
}

const StoreInfo = (props: Props) => {
  const {
    isSameDayOrder,
    isLunchBoxCake,
    is24hSelfService,
    storeDescription,
    storeName,
    storeAddress,
    businessHours,
    pickUpHours,
    ownerName,
    businessNumber,
  } = props

  return (
    <div className="flex w-full flex-col gap-y-[1.75rem] overflow-y-scroll px-[1.25rem] py-[1.5rem]">
      <section className="flex flex-col gap-y-[0.5rem]">
        <p className="title-l">가게 소개</p>
        <section className="mt-[0.375rem] flex gap-x-[0.25rem]">
          {isSameDayOrder && (
            <div className="z-20 flex h-[1.375rem] w-fit items-center justify-center gap-x-[0.25rem] rounded-[0.125rem] bg-blue-400 px-[0.5rem] text-white">
              <div className="relative h-[0.875rem] w-[0.875rem]">
                <Image className={'object-cover'} src={'/search/white-calendar.svg'} fill alt={'heart'} />
              </div>
              <p className="caption-m">당일 주문</p>
            </div>
          )}
          {is24hSelfService && (
            <div className="caption-l bg-gray-150 w-fit rounded-[0.125rem] px-[0.375rem] py-[0.125rem]">
              24시 무인가게
            </div>
          )}
          {isLunchBoxCake && (
            <div className="caption-l bg-gray-150 w-fit rounded-[0.125rem] px-[0.375rem] py-[0.125rem]">
              도시락 케이크
            </div>
          )}
        </section>
        <section className="border-gray-150 rounded-[0.25rem] border p-[1rem]">
          <p className="body-m text-gray-500">{storeDescription}</p>
        </section>
      </section>
      <section className="flex flex-col gap-y-[0.75rem]">
        <div>
          <p className="title-l">{storeName}</p>
          <p className="body-m text-gray-800">{storeAddress}</p>
        </div>
        <div>
          <p className="title-l">영업시간</p>
          <div className="flex flex-col">
            {businessHours.map((businessHour) => {
              return (
                <p key={businessHour.dayName} className="body-m text-gray-800">
                  {`${businessHour.dayName} : ${businessHour.startTime}~${businessHour.endTime}`}
                </p>
              )
            })}
          </div>
        </div>
        <div>
          <p className="title-l">주문가능시간</p>
          <div className="flex flex-col">
            {pickUpHours.map((pickUpHour) => {
              return (
                <p key={pickUpHour.dayName} className="body-m text-gray-800">
                  {`${pickUpHour.dayName} : ${pickUpHour.startTime}~${pickUpHour.endTime}`}
                </p>
              )
            })}
          </div>
        </div>
        <div>
          <p className="title-l">대표자명: {ownerName}</p>
          <p className="body-m text-gray-800">사업자 등록번호: {businessNumber}</p>
          <p className="body-m text-gray-800">상호명: {storeName}</p>
        </div>
      </section>
    </div>
  )
}

export default StoreInfo
