import { useOrderStore } from '@/store/orderStore'
import { QaDetailTitleType } from '@/types/mypage'
import Image from 'next/image'
import {
  CancelIcon,
  DarkGrayPlusIcon,
  Gray300HeartIcon,
  Gray700HeartIcon,
  GrayImagePlusIcon,
  ImagePlusIcon,
  WhiteCancelIcon,
} from '@/assets/svgComponents'
import { Dispatch, RefObject, SetStateAction, useRef } from 'react'

interface Props {
  imgRef: RefObject<HTMLInputElement | null>
  handleRequestDetailImagePreview: () => void
  uploadRequestDetailImage: string | ArrayBuffer | null | undefined
  setIsEventFilterOpen: Dispatch<SetStateAction<boolean>>
}
const AdditionalRequestField = (props: Props) => {
  const { imgRef, handleRequestDetailImagePreview, uploadRequestDetailImage, setIsEventFilterOpen } = props
  const setState = useOrderStore((state) => state.setState)
  const selectedRequestDetailDesignUrl = useOrderStore((state) => state.selectedRequestDetailDesignUrl)
  const answers = useOrderStore((state) => state.answers)
  const additionalRequestField = answers?.find((a) => a.title === '추가 요청사항')?.answer ?? ''

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px] text-gray-700">
        문구 및 디자인 요청사항 <span className="body-m">(선택)</span>
      </h5>
      <p className="body-s text-gray-400">요청하고 싶은 문구나 디자인이 있으면 사진/설명을 남겨주세요.</p>

      <input
        value={additionalRequestField}
        onChange={(e) => {
          const content = e.target.value || ''
          const currentAnswers = useOrderStore.getState().answers ?? []

          const newAnswer = {
            title: '추가 요청사항' as QaDetailTitleType,
            answer: content,
          }

          const updatedAnswers = currentAnswers.some((a) => a.title === '추가 요청사항')
            ? currentAnswers.map((a) => (a.title === '추가 요청사항' ? { ...a, answer: content } : a))
            : [...currentAnswers, newAnswer]

          setState({ answers: updatedAnswers })
        }}
        placeholder="ex) 사진처럼 손글씨 느낌의 필기체 문구로 적어주세요."
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />

      {uploadRequestDetailImage || selectedRequestDetailDesignUrl ? (
        <div className="flex w-full items-start">
          <div className="relative mt-2 flex h-[175px] w-[175px] items-center justify-center">
            <Image
              src={
                typeof uploadRequestDetailImage === 'string'
                  ? uploadRequestDetailImage
                  : (selectedRequestDetailDesignUrl as string) // null일 수 있으므로 안전하게 단언
              }
              alt="케이크"
              fill
              className="rounded-[4px] object-cover"
            />
            <div
              onClick={() => {
                setState({ selectedRequestDetailDesignUrl: null })
                setState({ uploadRequestDetailImage: null })
              }}
              className="absolute top-2 right-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-500"
            >
              <WhiteCancelIcon height={8} width={8} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-2 flex gap-x-2">
        <label
          htmlFor="input-file2"
          className={`${uploadRequestDetailImage || selectedRequestDetailDesignUrl ? 'text-gray-300' : 'text-gray-600'} bg-gray-150 button-m flex w-full flex-1 items-center justify-center gap-x-2 rounded-[4px] py-3`}
        >
          {uploadRequestDetailImage || selectedRequestDetailDesignUrl ? (
            <GrayImagePlusIcon height={16} width={16} />
          ) : (
            <ImagePlusIcon height={16} width={16} />
          )}
          사진첩에서 추가
        </label>
        <input
          disabled={(uploadRequestDetailImage || selectedRequestDetailDesignUrl) === null ? undefined : true}
          type="file"
          id={'input-file2'}
          ref={imgRef}
          name="input-file"
          onChange={handleRequestDetailImagePreview}
          className="hidden"
        />
        <button
          disabled={(uploadRequestDetailImage || selectedRequestDetailDesignUrl) === null ? undefined : true}
          onClick={() => {
            setState({ uploadRequestDetailImage: undefined })
            setIsEventFilterOpen(true)
            setState({ requestDetailType: 'EVENT', requestDetailDesignId: 1 })
          }}
          type={'button'}
          className={`${uploadRequestDetailImage || selectedRequestDetailDesignUrl ? 'text-gray-300' : 'text-gray-600'} bg-gray-150 button-m flex w-full flex-1 items-center justify-center gap-x-2 rounded-[4px] py-3`}
        >
          {uploadRequestDetailImage || selectedRequestDetailDesignUrl ? (
            <Gray300HeartIcon height={16} width={16} />
          ) : (
            <Gray700HeartIcon height={16} width={16} />
          )}
          찜하기에서 추가
        </button>
      </div>
    </section>
  )
}
export default AdditionalRequestField
