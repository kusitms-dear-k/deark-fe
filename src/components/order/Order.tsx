import Header from '@/components/common/Header'
import { DropDownIcon, GrayPlusIcon, GrayUncheckCalendarIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ResponseType } from '@/types/common'
import { getMyOrderDetailData } from '@/api/mypageAPI'
import { OrderType } from '@/types/mypage'
import OrderSkeleton from '@/components/skeleton/OrderSkeleton'
import { useOrderStore } from '@/store/orderStore'

interface Props {
  messageId?: number
}

const Order = (props: Props) => {
  const { messageId = 4 } = props
  const [orderDetailData, setOrderDetailData] = useState<OrderType>()
  const setState = useOrderStore((state) =>state.setState)

  useEffect(() => {
    // 1. 초기 상태 실행
    getMyOrderDetailData(messageId)
      .then((res: ResponseType<OrderType>) => {
        console.log('주문서 상세 데이터', res)
        setOrderDetailData(res.results)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="z-40 min-h-screen">
      <Header onBack={() => setState({isOrderOpen: false})} title={'내가 보낸 주문서'} headerType={'DYNAMIC'} className="pb-[0.75rem]" />

      {orderDetailData ? (
        <>
          <div className="mt-24 flex flex-col gap-y-[1rem] border-b-[0.5rem] border-gray-100 px-[1.25rem] pb-[1.25rem]">
            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                이름<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-start rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                {orderDetailData.qaDetails.find((item) => item.title === '이름')?.answer}
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                전화번호<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-start rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                {orderDetailData.qaDetails.find((item) => item.title === '전화번호')?.answer}
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                픽업 희망 일자<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p> {orderDetailData.qaDetails.find((item) => item.title === '픽업 희망 일자')?.answer}</p>
                <GrayUncheckCalendarIcon width={24} height={24} />
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                픽업 희망 시간<span className="title-s text-red-400">*</span>
              </h5>
              <p className="body-s text-gray-400">운영 시간 {orderDetailData.operatingHours}</p>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                {orderDetailData.qaDetails.find((item) => item.title === '픽업 희망 시간')?.answer}
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                디자인<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p>갤러리에서 업로드</p>
                <DropDownIcon height={24} width={24} />
              </div>
              <div className="flex w-full items-center justify-center">
                <div className="relative mt-[0.5rem] h-[21.875rem] w-[21.875rem]">
                  <Image
                    src={orderDetailData.designImageUrl}
                    alt="케이크"
                    fill
                    className="rounded-[0.25rem] object-cover"
                  ></Image>
                </div>
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">추가 요청 사항</h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                {orderDetailData.qaDetails.find((item) => item.title === '추가 요청사항')?.answer}
              </div>
              <div className="flex w-full items-center justify-center">
                <div className="relative mt-[0.5rem] h-[21.875rem] w-[21.875rem]">
                  <Image
                    src={orderDetailData.designImageUrl}
                    alt="케이크"
                    fill
                    className="rounded-[0.25rem] object-cover"
                  ></Image>
                </div>
              </div>

              <div className="mt-[0.5rem] flex gap-x-[0.5rem]">
                <button className="gray-200-300-button flex flex-1 items-center justify-center gap-x-[0.5rem]">
                  <GrayPlusIcon height={16} width={16} />
                  사진 추가
                </button>
                <button className="gray-200-300-button flex flex-1 items-center justify-center gap-x-[0.5rem]">
                  <GrayPlusIcon height={16} width={16} />
                  이벤트에서 추가
                </button>
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                크기<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p>{orderDetailData.qaDetails.find((item) => item.title === '크기')?.answer}</p>
                <DropDownIcon height={24} width={24} />
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                크림 맛<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p>{orderDetailData.qaDetails.find((item) => item.title === '크림 맛')?.answer}</p>
                <DropDownIcon height={24} width={24} />
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">
                시트 맛<span className="title-s text-red-400">*</span>
              </h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p>{orderDetailData.qaDetails.find((item) => item.title === '시트 맛')?.answer}</p>
                <DropDownIcon height={24} width={24} />
              </div>
            </section>

            <section>
              <h5 className="title-m flex gap-x-[0.125rem]">기타 요청사항</h5>
              <div className="body-m-m mt-[0.5rem] flex w-full justify-between rounded-[0.25rem] border border-gray-200 px-[1rem] py-[0.875rem] text-gray-400">
                <p>{orderDetailData.qaDetails.find((item) => item.title === '기타 요청사항')?.answer}</p>
              </div>
            </section>
          </div>

          <section className="px-[1.25rem] pb-[5.313rem]">
            <h5 className="title-m mt-[1.25rem] flex gap-x-[0.125rem]">링크</h5>
            <div className="mt-2 flex gap-x-[0.5rem]">
              <div className="relative h-[2.5rem] w-[2.5rem]">
                <Image src={'/common/kakao-app-icon.svg'} alt="카카오 로고" fill className="object-cover" />
              </div>
              <div>
                <div className="title-m">Kakao</div>
                <a className="body-m text-blue-400" href={orderDetailData.chattingUrl}>
                  {orderDetailData.chattingUrl}
                </a>
                <a href={orderDetailData.chattingUrl} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <OrderSkeleton />
      )}
    </div>
  )
}
export default Order
