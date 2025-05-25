import Header from '@/components/common/Header'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import ETCRequestField from '@/components/order/order-form/ETCRequestField'
import SheetSelector from '@/components/order/order-form/SheetSelector'
import CreamSelector from '@/components/order/order-form/CreamSelector'
import SizeSelector from '@/components/order/order-form/SizeSelector'
import AdditionalRequestField from '@/components/order/order-form/AdditionalRequestField'
import DesignSelector from '@/components/order/order-form/DesignSelector'
import WishPickUpTimeField from '@/components/order/order-form/WishPickUpTimeField'
import WishPickUpDateField from '@/components/order/order-form/WishPickUpDateField'
import PhoneNumberField from '@/components/order/order-form/PhoneNumberField'
import { ResponseType } from '@/types/common'
import { getBusinessHours, getOrderFormDesignData, postOrderForm } from '@/api/mypageAPI'
import { OrderFormDesignListType } from '@/types/mypage'
import { AnimatePresence } from 'framer-motion'
import UTEventModal from '@/components/order/UTEventModal'
import UTEventDesignModal from '@/components/order/UTEventDesignModal'
import NameField from '@/components/order/order-form/NameField'
import NotFormValidModal from '@/components/order/NotFormValidModal'
import SubmitConfirmationModal from '@/components/order/SubmitConfirmationModal'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

const OrderForm = () => {
  const [isDesignDropBoxOpen, setIsDesignDropBoxOpen] = useState<boolean>(false)
  const selectedDesignContent = useOrderStore((state) => state.selectedDesignContent)

  const [isSizeDropBoxOpen, setIsSizeDropBoxOpen] = useState<boolean>(false)
  const [isSheetDropBoxOpen, setIsSheetDropBoxOpen] = useState<boolean>(false)
  const [isCreamDropBoxOpen, setIsCreamDropBoxOpen] = useState<boolean>(false)
  const [isEventFilterOpen, setIsEventFilterOpen] = useState<boolean>(false)
  const [isEventDesignFilterOpen, setIsEventDesignFilterOpen] = useState<boolean>(false)
  const [businessHours, setBusinessHours] = useState<{ openTime: string; closeTime: string }>()

  const designType = useOrderStore((state) => state.designType)
  const storeId = useOrderStore((state) => state.storeId)
  const designId = useOrderStore((state) => state.designId)
  const requestDetailType = useOrderStore((state) => state.requestDetailType)
  const requestDetailDesignId = useOrderStore((state) => state.requestDetailDesignId)

  const { answers, setState } = useStoreWithEqualityFn(
    useOrderStore,
    (state) => ({
      answers: state.answers,
      setState: state.setState,
    }),
    shallow
  )

  const name = answers?.find((item) => item.title === '이름')?.answer
  const phoneNumber = answers?.find((item) => item.title === '전화번호')?.answer
  const wishPickUpDate = answers?.find((a) => a.title === '픽업 희망 일자')?.answer
  const wishPickUpTime = answers?.find((a) => a.title === '픽업 희망 시간')?.answer
  const size = answers?.find((a) => a.title === '크기')?.answer
  const cream = answers?.find((a) => a.title === '크림 맛')?.answer
  const sheet = answers?.find((a) => a.title === '시트 맛')?.answer
  const selectedDesignUrl = useOrderStore((state) => state.selectedDesignUrl)
  const selectedRequestDetailDesignUrl = useOrderStore((state) => state.selectedRequestDetailDesignUrl)

  const [isNotFormValidModalOpen, setIsNotFormValidModalOpen] = useState(false)
  const [isSubmitConfirmationModalOpen, setIsSubmitConfirmationModalOpen] = useState(false)
  const isOrderSubmissionSuccessModalOpen= useOrderStore((state) =>state.isOrderSubmissionSuccessModalOpen)
  const resetOrderForm = useOrderStore((state) =>state.resetOrderForm)

  const [blurred, setBlurred] = useState<{
    name: boolean
    phoneNumber: boolean
    wishPickUpTime: boolean
  }>({
    name: false,
    phoneNumber: false,
    wishPickUpTime: false,
  })

  //이미지
  let designImageRef = useRef<HTMLInputElement>(null)
  let requestDetailImageRef = useRef<HTMLInputElement>(null)

  const uploadDesignImage = useOrderStore((state) =>state.uploadDesignImage)
  const uploadRequestDetailImage = useOrderStore((state) =>state.uploadRequestDetailImage)

  // 제출 완료되면 값을 초기화
  useEffect(() => {
    if (isOrderSubmissionSuccessModalOpen) {
      if (designImageRef.current) designImageRef.current.value = ''
      if (requestDetailImageRef.current) requestDetailImageRef.current.value = ''
    }
  }, [isOrderSubmissionSuccessModalOpen])

  const isFormValid = useMemo(() => {
    return (
      !!name &&
      !!phoneNumber &&
      !!wishPickUpDate &&
      !!wishPickUpTime &&
      !!size &&
      !!cream &&
      !!sheet &&
      (!!uploadDesignImage || !!selectedDesignUrl)
    )
  }, [
    name,
    phoneNumber,
    wishPickUpDate,
    wishPickUpTime,
    size,
    cream,
    sheet,
    uploadDesignImage,
    selectedDesignUrl,
    uploadRequestDetailImage,
    selectedRequestDetailDesignUrl,
  ])

  // 디자인 이미지 미리보기 설정
  const handleDesignImagePreview = () => {
    const files = designImageRef.current?.files
    if (files && files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setState({uploadDesignImage: reader.result})
        }
      }
    }
    setState({ designId: null, designType: 'CUSTOM' })
  }

  // 추가 요청 사항 이미지 미리보기 설정
  const handleRequestDetailImagePreview = () => {
    const files = requestDetailImageRef.current?.files
    if (files && files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setState({uploadRequestDetailImage: reader.result})
        }
      }
    }
    setState({ requestDetailType: 'CUSTOM', requestDetailDesignId: null })
  }

  const [orderFormDesignList, setOrderFormDesignList] = useState<OrderFormDesignListType[]>()

  useEffect(() => {
    // 1. 초기 상태 실행
    if (storeId) {
      getOrderFormDesignData(storeId)
        .then((res: ResponseType<OrderFormDesignListType[]>) => {
          console.log('주문서 디자인 조회', res)
          setOrderFormDesignList(res.results)
        })
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    if (storeId && wishPickUpDate) {
      getBusinessHours(storeId, wishPickUpDate)
        .then((res) => {
          console.log('가게 운영 시간 조회', res)
          setBusinessHours(res.results)
        })
        .catch(console.error)
    }
  }, [storeId, wishPickUpDate])

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // 새로고침 방지

    const fullSignUpInfo = {
      storeId: storeId,
      designType: designType,
      designId: designId,
      requestDetailType: requestDetailType,
      requestDetailDesignId: requestDetailDesignId,
      answers: answers,
    }

    const formData = new FormData()

    if (designImageRef.current && designImageRef.current.files && designImageRef.current.files[0]) {
      formData.append('designImage', designImageRef.current.files[0]) // 이미지 첨부
    }

    if (
      requestDetailImageRef.current &&
      requestDetailImageRef.current.files &&
      requestDetailImageRef.current.files[0]
    ) {
      formData.append('requestDetailImage', requestDetailImageRef.current.files[0]) // 이미지 첨부
    }

    formData.append(
      'request',
      new Blob([JSON.stringify(fullSignUpInfo)], {
        type: 'application/json',
      })
    )

    postOrderForm(formData).then((res) => {
      console.log('제출 성공', res)
    })
  }

  return (
    <div className="flex h-screen flex-col z-40">
      <Header
        headerClassname={'fixed bg-white'}
        title={'주문 문의'}
        headerType={'DYNAMIC'}
        className={'pb-3'}
        //제출시 값 초기화
        onBack={() => {
          resetOrderForm()
          if (designImageRef.current) designImageRef.current.value = ''
          if (requestDetailImageRef.current) requestDetailImageRef.current.value = ''
        }}
      />
      {isNotFormValidModalOpen && <NotFormValidModal onClick={() => setIsNotFormValidModalOpen(false)} />}
      {isSubmitConfirmationModalOpen && (
        <SubmitConfirmationModal onClick={() => setIsSubmitConfirmationModalOpen(false)} />
      )}
      {isEventFilterOpen && (
        <AnimatePresence>
          <UTEventModal
            onClick={() => {
              setIsEventFilterOpen(!isEventFilterOpen)
            }}
            setIsEventDesignFilterOpen={setIsEventDesignFilterOpen}
          />
        </AnimatePresence>
      )}
      {isEventDesignFilterOpen && (
        <AnimatePresence>
          <UTEventDesignModal
            onClick={() => {
              setIsEventDesignFilterOpen(!isEventDesignFilterOpen)
            }}
            setIsEventFilterOpen={setIsEventFilterOpen}
          />
        </AnimatePresence>
      )}
      <div>
        <form className="z-40 mt-24 flex flex-col gap-y-[16px] overflow-y-scroll px-5 pb-5" onSubmit={handleSubmit}>
          <NameField setBlurred={setBlurred} />
          {name && blurred.name && <PhoneNumberField blurred={blurred} setBlurred={setBlurred} />}
          {phoneNumber && blurred.phoneNumber && <WishPickUpDateField blurred={blurred} />}
          {wishPickUpDate && (
            <WishPickUpTimeField businessHours={businessHours} setBlurred={setBlurred} blurred={blurred} />
          )}
          {(selectedDesignUrl || (wishPickUpTime && blurred.wishPickUpTime)) && (
            <>
              <DesignSelector
                uploadImage={uploadDesignImage}
                handleImagePreview={handleDesignImagePreview}
                imgRef={designImageRef}
                designList={orderFormDesignList}
                isDesignDropBoxOpen={isDesignDropBoxOpen}
                selectedDesignContent={selectedDesignContent}
                setIsDesignDropBoxOpen={setIsDesignDropBoxOpen}
              />
              <AdditionalRequestField
                setIsEventFilterOpen={setIsEventFilterOpen}
                imgRef={requestDetailImageRef}
                handleRequestDetailImagePreview={handleRequestDetailImagePreview}
                uploadRequestDetailImage={uploadRequestDetailImage}
              />
            </>
          )}
          {(uploadDesignImage || selectedDesignUrl) && (
            <SizeSelector isSizeDropBoxOpen={isSizeDropBoxOpen} setIsSizeDropBoxOpen={setIsSizeDropBoxOpen} />
          )}
          {size && (
            <CreamSelector isCreamDropBoxOpen={isCreamDropBoxOpen} setIsCreamDropBoxOpen={setIsCreamDropBoxOpen} />
          )}
          {cream && (
            <SheetSelector isSheetDropBoxOpen={isSheetDropBoxOpen} setIsSheetDropBoxOpen={setIsSheetDropBoxOpen} />
          )}
          {sheet && <ETCRequestField />}

        </form>
        <div className="h-[150px]" />
        {!isFormValid ? (
          <div className="z-40 border-gray-150 fixed bottom-0 w-full border-t bg-white px-[20px] pt-[20px] pb-[29px]">
            <button
              onClick={() => {
                setIsNotFormValidModalOpen(true)
              }}
              type={'button'}
              className={!isFormValid ? 'blue-200-button w-full' : 'blue-400-button w-full'}
            >
              주문서와 함께 문의하기
            </button>
          </div>
        ) : (
          <div className="z-40 border-gray-150 fixed bottom-0 w-full border-t bg-white px-[20px] pt-[20px] pb-[29px]">
            <button
              type={'button'}
              onClick={() => {
                setIsSubmitConfirmationModalOpen(true)
              }}
              className={!isFormValid ? 'blue-200-button w-full' : 'blue-400-button w-full'}
            >
              주문서와 함께 문의하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default OrderForm
