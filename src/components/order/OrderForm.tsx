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
import { getOrderFormDesignData, postOrderForm } from '@/api/mypageAPI'
import { OrderFormDesignListType } from '@/types/mypage'
import { AnimatePresence } from 'framer-motion'
import UTEventModal from '@/components/order/UTEventModal'
import UTEventDesignModal from '@/components/order/UTEventDesignModal'
import NameField from '@/components/order/order-form/NameField'

const OrderForm = () => {
  const [isDesignDropBoxOpen, setIsDesignDropBoxOpen] = useState<boolean>(false)
  const [selectedDesignContent, setSelectedDesignContent] = useState<string>()

  const [isSizeDropBoxOpen, setIsSizeDropBoxOpen] = useState<boolean>(false)
  const [isSheetDropBoxOpen, setIsSheetDropBoxOpen] = useState<boolean>(false)
  const [isCreamDropBoxOpen, setIsCreamDropBoxOpen] = useState<boolean>(false)
  const [isEventFilterOpen, setIsEventFilterOpen] = useState<boolean>(false)
  const [isEventDesignFilterOpen, setIsEventDesignFilterOpen] = useState<boolean>(false)

  const setState = useOrderStore((state) => state.setState)
  const designType = useOrderStore((state) => state.designType)
  const storeId = useOrderStore((state) => state.storeId)
  const designId = useOrderStore((state) => state.designId)
  const requestDetailType = useOrderStore((state) => state.requestDetailType)
  const requestDetailDesignId = useOrderStore((state) => state.requestDetailDesignId)
  const answers = useOrderStore((state) => state.answers)

  const name = answers?.find((item) => item.title === '이름')?.answer
  const phoneNumber = answers?.find((item) => item.title === '전화번호')?.answer
  const wishPickUpDate = answers?.find((a) => a.title === '픽업 희망 일자')?.answer
  const wishPickUpTime = answers?.find((a) => a.title === '픽업 희망 시간')?.answer
  const size = answers?.find((a) => a.title === '크기')?.answer
  const cream = answers?.find((a) => a.title === '크림 맛')?.answer
  const sheet = answers?.find((a) => a.title === '시트 맛')?.answer
  const selectedDesignUrl = useOrderStore((state) => state.selectedDesignUrl)
  const selectedRequestDetailDesignUrl = useOrderStore((state) => state.selectedRequestDetailDesignUrl)

  const designImageRef = useRef<HTMLInputElement>(null)
  const requestDetailImageRef = useRef<HTMLInputElement>(null)

  const [uploadDesignImage, setUploadDesignImage] = useState<string | ArrayBuffer | null>()
  const [uploadRequestDetailImage, setUploadRequestDetailImage] = useState<string | ArrayBuffer | null>()

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
          setUploadDesignImage(reader.result)
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
          setUploadRequestDetailImage(reader.result)
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

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // 새로고침 방지

    // 마케팅, 3자 동의 상태 변경
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
    <form onSubmit={handleSubmit}>
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
      <Header title={'주문서'} headerType={'DYNAMIC'} className={'pb-3'} />

      <div className="mt-24 flex flex-col gap-y-[16px] px-5 pb-5">
        <NameField />
        <PhoneNumberField />
        <WishPickUpDateField />
        <WishPickUpTimeField />
        <DesignSelector
          uploadImage={uploadDesignImage}
          setUploadImage={setUploadDesignImage}
          handleImagePreview={handleDesignImagePreview}
          imgRef={designImageRef}
          designList={orderFormDesignList}
          isDesignDropBoxOpen={isDesignDropBoxOpen}
          selectedDesignContent={selectedDesignContent}
          setIsDesignDropBoxOpen={setIsDesignDropBoxOpen}
          setSelectedDesignContent={setSelectedDesignContent}
        />
        <AdditionalRequestField
          setIsEventFilterOpen={setIsEventFilterOpen}
          imgRef={requestDetailImageRef}
          handleRequestDetailImagePreview={handleRequestDetailImagePreview}
          setUploadRequestDetailImage={setUploadRequestDetailImage}
          uploadRequestDetailImage={uploadRequestDetailImage}
        />
        <SizeSelector isSizeDropBoxOpen={isSizeDropBoxOpen} setIsSizeDropBoxOpen={setIsSizeDropBoxOpen} />
        <CreamSelector isCreamDropBoxOpen={isCreamDropBoxOpen} setIsCreamDropBoxOpen={setIsCreamDropBoxOpen} />
        <SheetSelector isSheetDropBoxOpen={isSheetDropBoxOpen} setIsSheetDropBoxOpen={setIsSheetDropBoxOpen} />
        <ETCRequestField />
      </div>
      <div className="h-[100px]" />
      <div className="fixed bg-white w-full bottom-0 pb-[29px] pt-[20px] px-[20px] border-t border-gray-150">
        <button
          disabled={!isFormValid}
          type={'submit'}
          className={!isFormValid ? 'blue-200-button w-full' : 'blue-400-button w-full'}
        >
          주문서 보내기
        </button>
      </div>
    </form>
  )
}
export default OrderForm
