import Header from '@/components/common/Header'
import { DropDownIcon, GrayPlusIcon, GrayUncheckCalendarIcon } from '@/assets/svgComponents'
import Image from 'next/image'

const Order = () => {
  return (
    <div className="z-40 min-h-screen">
      <Header title={'내가 보낸 주문서'} headerType={'DYNAMIC'} className={'pb-3'} />

      <div className="mt-30 flex flex-col gap-y-[16px] border-b-[8px] border-gray-100 px-5 pb-5">
        <section>
          <h5 className="title-m flex gap-x-[2px]">
            이름<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            황유림
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">
            전화번호<span className="title-s text-red-400">*</span>
          </h5>
          <div className="body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            01040372419
          </div>
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
            픽업 희망 일자<span className="title-s text-red-400">*</span>
          </h5>
          <p className="body-s text-gray-400">운영 시간 11:00 ~ 21:00</p>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            오후 1시
          </div>
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
              <div className="button-m absolute top-4 left-4 z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-gray-700">
                1
              </div>
              <Image src={'/common/cake1.png'} alt="케이크" fill className="rounded-[4px] object-cover"></Image>
            </div>
          </div>
        </section>

        <section>
          <h5 className="title-m flex gap-x-[2px]">추가 요청 사항</h5>
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            문구를 “지수야 생일축하해!”로 해주세요. 첫번째 사진 속 리본 3개를 곰돌이 위에 올려주세요. 두번째 사진 속
            빨간리본은 딱 1개만 올려주세요.
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="relative mt-2 h-[350px] w-[350px]">
              <div className="button-m absolute top-4 left-4 z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-gray-700">
                1
              </div>
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
          <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
            <p>기타 요청사항이 있다면 작성해주세요.</p>
          </div>
        </section>
      </div>

      <section className="px-5 pb-[85px]">
        <h5 className="title-m mt-5 flex gap-x-[2px]">링크</h5>
        <div className="mt-2 flex gap-x-2">
          <div className="relative h-[40px] w-[40px]">
            <Image src={'/common/kakao-app-icon.svg'} alt="카카오 로고" fill className="object-cover" />
          </div>
          <div>
            <div className="title-m">Kakao</div>
            <a href={'/kakao.com/dearcake'} />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Order
