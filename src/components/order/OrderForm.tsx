import { DropDownIcon, GrayPlusIcon, GrayUncheckCalendarIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import Header from '@/components/common/Header'
import { useRef } from 'react'

const OrderForm = () => {
  const editableRef = useRef<HTMLDivElement>(null) // ✅ contentEditable ref
  return (
    <form>
      <Header title={'주문서'} headerType={'DYNAMIC'} className={'pb-3'} />

      <div className="mt-30 flex flex-col gap-y-[16px] border-b-[8px] border-gray-100 px-5 pb-5">
        <section>
          <h5 className="title-m flex gap-x-[2px]">
            이름<span className="title-s text-red-400">*</span>
          </h5>
          <input
            placeholder="이름을 입력해주세요."
            className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
          />
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            전화번호<span className="title-s text-red-400">*</span>
          </h5>
          <input
            placeholder="“000-0000-0000”으로 입력해주세요."
            className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
          />
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            픽업 희망 일자<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>2025년 4월 16일 토요일</p>
            <GrayUncheckCalendarIcon width={24} height={24} />
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            픽업 희망 시간<span className="title-s text-red-400">*</span>
          </h5>
          <p className="body-s text-gray-400">운영 시간 11:00 ~ 21:00</p>
          <input
            placeholder="“14시 00분”형태로 입력해주세요."
            className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
          />
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            디자인<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>갤러리에서 업로드</p>
            <DropDownIcon height={24} width={24} />
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="relative mt-2 h-[350px] w-[350px]">
              <Image src={'/common/cake1.png'} alt="케이크" fill className="rounded-[4px] object-cover"></Image>
            </div>
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">추가 요청 사항</h5>
          <div className="mt-2 w-full">
            <div
              ref={editableRef}
              contentEditable
              onInput={(e) => {
                const content = e.currentTarget.textContent || ''
              }}
              data-placeholder={'원하는 요청사항을 작성해주세요.'}
              className="placeholder:body-m body-m-m flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
            />

            {/* 커스텀 placeholder */}
            <div className="body-m pointer-events-none hidden border text-gray-400 peer-empty:block">
              원하는 요청사항을 작성해주세요.
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <div className="relative mt-2 h-[350px] w-[350px]">
              <Image src={'/common/cake1.png'} alt="케이크" fill className="rounded-[4px] object-cover"></Image>
            </div>
          </div>

          <div className="mt-2 flex gap-x-2">
            <button className="gray-200-300-button flex flex-1 items-center justify-center gap-x-2">
              <GrayPlusIcon height={16} width={16} />
              사진 추가
            </button>
            <button className="gray-200-300-button flex flex-1 items-center justify-center gap-x-2">
              <GrayPlusIcon height={16} width={16} />
              이벤트에서 추가
            </button>
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            크기<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>1호 (+3,000)</p>
            <DropDownIcon height={24} width={24} />
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            크림 맛<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>초콜릿</p>
            <DropDownIcon height={24} width={24} />
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            시트 맛<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>얼그레이</p>
            <DropDownIcon height={24} width={24} />
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">시트 맛</h5>
          <input
            placeholder="기타 요청사항이 있다면 작성해주세요."
            className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
          />
        </section>
      </div>
    </form>
  )
}
export default OrderForm
