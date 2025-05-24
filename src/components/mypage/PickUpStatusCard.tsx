import { BlackCalendarIcon, GrayRightArrowIcon } from '@/assets/svgComponents'
import Image from 'next/image'

interface PickUpStatusCardProps {

}

const PickUpStatusCard = ({}:PickUpStatusCardProps) => {
  return (
    <div
      className="relative flex flex-col gap-y-[0.75rem] rounded-[0.25rem] bg-white"
      style={{ boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <section className="flex items-center justify-between px-[0.75rem] pt-[0.75rem]">
        <div className="flex">
          <BlackCalendarIcon width={24} height={24} />
          <h3 className="body-m text-gray-900">
            <span className="title-l text-gray-700">05/03(수) 오후 3:00</span> 픽업 예정
          </h3>
        </div>
        <button className="bg-gray-150 body-m-m flex h-fit items-center gap-x-[0.25rem] rounded-[0.25rem] px-[0.438rem] py-[0.25rem] text-gray-500">
          주문서 보기
          <GrayRightArrowIcon width={5} height={10} />
        </button>
      </section>

      <section className="flex gap-x-[0.625rem] px-[0.75rem] pb-[3.75rem]">
        <div className="relative h-[5rem] w-[5rem]">
          <Image alt="케이크" src="/common/cake1.png" fill className="rounded-[0.25rem] object-cover"></Image>
        </div>
        <div>
          <h3 className="title-l">디어케이크</h3>
          <p className="body-m-m mt-[0.375rem] text-gray-700">파스텔 리본 케이크</p>
          <p className="body-m-m text-gray-400">2호 / [크림] 바닐라 맛 / [시트] 초콜릿</p>
        </div>
      </section>

      <div className="absolute bottom-[2.5rem] h-[0.063rem] w-full border-b border-dashed border-gray-300"></div>
      <div className="absolute bottom-[2.5rem] h-[0.063rem] w-[4.688rem] border-b border-blue-400"></div>
      <div className="absolute bottom-[0.75rem] left-0 flex w-full justify-between px-[1.25rem]">
        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div className="h-[0.375rem] w-[0.375rem] rounded-full bg-blue-400" />
          <p className="chip-s-bold text-blue-400">예약 완료</p>
        </div>

        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div className="h-[0.375rem] w-[0.375rem] rounded-full bg-gray-300" />
          <p className="chip-s-bold text-gray-300">베이킹 완료</p>
        </div>

        <div className="flex w-1/3 flex-col items-center gap-y-[0.375rem]">
          <div className="h-[0.375rem] w-[0.375rem] rounded-full bg-gray-300" />
          <p className="chip-s-bold text-gray-300">픽업 완료</p>
        </div>
      </div>
    </div>
  )
}
export default PickUpStatusCard
