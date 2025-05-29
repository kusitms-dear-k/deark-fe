'use client'

import Cookies from 'js-cookie'
import { useOrderStore } from '@/store/orderStore'
import { useSearchStore } from '@/store/searchStore'
import { useHeartClick } from '@/hooks/useHeartClick'
import { EventApi } from '@/api/eventAPI'
import { useEffect, useState } from 'react'
import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import Image from 'next/image'
import { Gray700HeartIcon, HeartIconFill } from '@/assets/svgComponents'
import EventModal from '@/components/event/EventModal'
import EventSelectionContent from '@/components/event/EventSelectContent'
import ToastMsg from '@/components/event/ToastMsg'
import { getDesignDetailData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import { DesignDetailType } from '@/types/search'
import OrderForm from '@/components/order/OrderForm'
import Header from '@/components/common/Header'
import { useParams, useRouter } from 'next/navigation'
import RequireLoginModal from '@/components/mypage/RequireLoginModal'
import OrderSubmissionSuccessModal from '@/components/order/OrderSubmissionSuccessModal'

const DesignDetail = () => {
  const params = useParams()
  const [designDetail, setDesignDetail] = useState<DesignDetailType>() // 디자인 상세 페이지 데이터
  const token = Cookies.get('ACCESS_TOKEN')
  const setState = useOrderStore((state) => state.setState)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  // const designId = useSearchStore((state) => state.designId) //선택된 designId
  const designId = parseInt(params.id as string)
  const isOrderFormOpen = useOrderStore((state) => state.isOrderFormOpen)
  const isOrderSubmissionSuccessModalOpen = useOrderStore((state) => state.isOrderSubmissionSuccessModalOpen)
  const isLoginRequiredForOrderFormOpen = useOrderStore((state) => state.isLoginRequiredForOrderFormOpen)
  const resetOrderForm = useOrderStore((state) => state.resetOrderForm)
  const router = useRouter()

  useEffect(() => {
    if (designId) {
      setSearchParams({ designId: designId }) // 페이지 로드시 자동으로 설정
    }
  }, [designId])

  const {
    modalView,
    setModalView,
    eventList,
    handleHeartClick,
    selectedEventIds,
    toastMessage,
    showToast,
    setShowToast,
  } = useHeartClick('design')

  const handleModalClose = async (selectedIds: number[]) => {
    if (designId) {
      await EventApi.mapDesignToEvents({
        design_id: designId,
        event_ids: selectedIds,
      })
      setShowToast(true)
    }
    setModalView(null)
  }

  /**
   * 스토어,디자인 상세페이지 데이터 불러오기
   */
  useEffect(() => {
    // 1. 초기 상태 실행
    getDesignDetailData(designId)
      .then((res: ResponseType<DesignDetailType>) => {
        console.log('디자인 상세', res.results)
        setDesignDetail(res.results)
      })
      .catch(console.error)

    // 2. 이후 상태 변화 감지
    const unsubscribe = useSearchStore.subscribe((currentStatus, prevState) => {
      getDesignDetailData(currentStatus.designId)
        .then((res) => {
          console.log('디자인 상세:', res)
          setDesignDetail(res.results)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [])

  // 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isOrderSubmissionSuccessModalOpen) {
      const timer = setTimeout(() => {
        setState({ isOrderSubmissionSuccessModalOpen: false })
        //초기화
        resetOrderForm()
      }, 3000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isOrderSubmissionSuccessModalOpen, setState])

  if (!designDetail) return null

  return isOrderFormOpen ? (
    <OrderForm />
  ) : (
    <>
      <div className="relative min-h-screen">
        {/* 로그인 안할 경우 주문서 대신 로그인 요구 모달 */}
        {isLoginRequiredForOrderFormOpen && (
          <RequireLoginModal
            title={'주문하기'}
            onClick={() => setState({ isLoginRequiredForOrderFormOpen: false })}
            onCancelClick={() => setState({ isLoginRequiredForOrderFormOpen: false })}
          />
        )}

        {/* 주문서 문의가 완료될 때 보이는 모달 */}
        {isOrderSubmissionSuccessModalOpen && (
          <OrderSubmissionSuccessModal onClick={() => setState({ isOrderSubmissionSuccessModalOpen: false })} />
        )}

        <Header headerType={'DYNAMIC'} className={'justify-between'} headerClassname={'fixed bg-white pb-5'} />
        <div className="h-24"></div>
        <div className="overflow-y-scroll">
          <div className="relative h-[22.5rem] w-full">
            <Image src={designDetail.designImageUrl} alt="케이크 디자인" fill className="object-cover" priority />
          </div>
          <div className="border-gray-150 flex border-b px-5 py-2">
            <button
              className="body-m flex items-center gap-x-1 text-gray-600"
              onClick={() => {
                setSearchParams({
                  storeId: designDetail?.storeId,
                })
                router.push(`/store/${designDetail?.storeId}`)
              }}
            >
              {designDetail.storeName}
              <div className={'relative h-[8px] w-[4px]'}>
                <Image className={'object-cover'} src={'/search/right-arrow.svg'} fill alt={'arrow'} />
              </div>
            </button>
          </div>

          <section className="border-gray-150 border-b p-[1.25rem]">
            <div className="flex items-center justify-between">
              <h4 className="title-l">{designDetail.designName}</h4>
              <div
                className="flex items-center gap-x-1"
                onClick={(e) => {
                  handleHeartClick(designDetail.storeId)
                }}
              >
                {designDetail.isLiked ? (
                  <HeartIconFill width={24} height={24} />
                ) : (
                  <Gray700HeartIcon width={20} height={18} />
                )}
                <p className="caption-m text-gray-700">{designDetail.likeCount}</p>
              </div>
            </div>
            <p className="body-m mt-[0.25rem] text-gray-800">{designDetail.description}</p>
            <p className="title-xl mt-2">{designDetail.price.toLocaleString()}원 ~</p>
          </section>

          <section className="p-[1.25rem]">
            <h4 className="title-l">케이크 옵션</h4>
            <div className="mt-[1rem] flex flex-col gap-y-[1.125rem]">
              {designDetail.sizeList.length > 0 && <OptionRow title="크기" values={designDetail.sizeList} />}
              {designDetail.creamList.length > 0 && <OptionRow title="크림 맛" values={designDetail.creamList} />}
              {designDetail.sheetList.length > 0 && <OptionRow title="시트 맛" values={designDetail.sheetList} />}
            </div>
          </section>
        </div>

        <div className="h-[120px]" />

        <div className="border-gray-150 fixed bottom-0 z-10 w-full border-t bg-white px-[1.25rem] pt-[1.25rem] pb-10">
          <button
            onClick={() => {
              if (token) {
                setState({
                  isOrderFormOpen: true,
                  selectedDesignUrl: designDetail?.designImageUrl,
                  designId: designId,
                  selectedDesignContent: designDetail?.designName,
                  storeId: designDetail?.storeId,
                })
                setSearchParams({ isDesignDetailModalOpen: false })
              } else {
                setState({ isLoginRequiredForOrderFormOpen: true })
              }
            }}
            className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white"
            type="button"
          >
            주문 문의하기
          </button>
        </div>
      </div>

      <EventModal isOpenModal={modalView === 'eventList'} onClose={() => setModalView(null)}>
        <EventSelectionContent
          events={eventList}
          initialSelected={selectedEventIds}
          onAddNew={() => setModalView('newEvent')}
          onClose={handleModalClose}
        />
      </EventModal>
      <ToastMsg message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
export default DesignDetail

const OptionRow = ({ title, values }: { title: string; values: string[] }) => (
  <div className="flex items-center gap-x-[0.5rem]">
    <p className="title-s flex whitespace-nowrap text-gray-700">{title}</p>
    <div className="flex flex-wrap gap-[0.375rem]">
      {values.map((value) => (
        <div key={value} className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">
          {value}
        </div>
      ))}
    </div>
  </div>
)
