import { BlackCalendarIcon, GrayRightArrowIcon } from '@/assets/svgComponents'
import Image from 'next/image'

interface Props {}

const OrderCard = (props: Props) => {
  const {} = props
  return (
    <div className="flex w-full flex-col gap-y-[0.5rem] border-b-[0.563rem] border-gray-100 px-[1.25rem] py-[1.5rem]">
      <section className="flex w-full justify-between">
        <div className="flex">
          <BlackCalendarIcon width={24} height={24} />
          <h3 className="body-m text-gray-900">
            <span className="title-l text-gray-700">05/03(수)</span> 요청 날짜
          </h3>
        </div>
        <button className="bg-gray-150 body-m-m px- flex h-fit items-center gap-x-[0.25rem] rounded-[0.25rem] px-[0.438rem] py-[0.25rem] text-gray-500">
          주문서 보기
          <GrayRightArrowIcon width={5} height={10} />
        </button>
      </section>

      <section className="flex gap-x-[1.25rem]">
        <div className="relative h-[5.625rem] w-[5.625rem]">
          <Image alt="케이크" src="/common/cake1.png" fill className="rounded-[0.25rem] object-cover" />
        </div>

        <div>
          <h2 className="title-l">꿈빛나라 케이크</h2>
          <p className="body-m-m mt-[0.375rem] text-gray-700">강아지 꼬까 모자 케이크</p>
          <p className="body-m-m text-gray-400">2호 / [크림] 바닐라 맛 / [시트] 초콜릿 ...</p>
          <p className="body-m-m text-blue-400">05/05(금) 픽업 희망</p>
        </div>
      </section>

      <button className="gray-200-700-button w-full">응답 대기 중</button>
    </div>
  )
}
export default OrderCard
