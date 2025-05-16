import { useOrderStore } from '@/store/orderStore';
import { QaDetailTitleType } from '@/types/mypage';
import Image from 'next/image';
import { DarkGrayPlusIcon } from '@/assets/svgComponents';
import { Dispatch, RefObject, SetStateAction, useRef } from 'react';

interface Props {
  imgRef: RefObject<HTMLInputElement | null>
  handleRequestDetailImagePreview: () => void;
  uploadRequestDetailImage: string | ArrayBuffer | null | undefined
  setUploadRequestDetailImage: Dispatch<SetStateAction<string | ArrayBuffer | null | undefined>>
  setIsEventFilterOpen: Dispatch<SetStateAction<boolean>>
}
const AdditionalRequestField = (props: Props) => {
  const {imgRef, handleRequestDetailImagePreview, uploadRequestDetailImage, setUploadRequestDetailImage, setIsEventFilterOpen} = props
  const editableRef = useRef<HTMLDivElement>(null) // ✅ contentEditable ref
  const setState = useOrderStore((state) => state.setState)
  const selectedRequestDetailDesignUrl = useOrderStore((state) => state.selectedRequestDetailDesignUrl)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">추가 요청사항</h5>
      <div className="mt-2 w-full">
        <div
          ref={editableRef}
          contentEditable
          onInput={(e) => {
            const content = e.currentTarget.textContent || ''
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
          data-placeholder={'원하는 요청사항을 작성해주세요.'}
          className="placeholder:body-m body-m-m flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
        />

        {/* 커스텀 placeholder */}
        <div className="body-m pointer-events-none hidden border text-gray-400 peer-empty:block">
          원하는 요청사항을 작성해주세요.
        </div>
      </div>

      {uploadRequestDetailImage || selectedRequestDetailDesignUrl ? (
        <div className="flex w-full items-center justify-center">
          <div className="relative mt-2 h-[350px] w-[350px]">
            <Image
              src={
                typeof uploadRequestDetailImage === 'string'
                  ? uploadRequestDetailImage
                  : selectedRequestDetailDesignUrl as string // null일 수 있으므로 안전하게 단언
              }
              alt="케이크"
              fill
              className="rounded-[4px] object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-2 flex gap-x-2">
        <label htmlFor="input-file2" className="gray-200-700-button flex flex-1 items-center justify-center gap-x-2">
          <DarkGrayPlusIcon height={16} width={16} />
          사진 추가
        </label>
        <input
          type="file"
          id={'input-file2'}
          ref={imgRef}
          name="input-file"
          onChange={handleRequestDetailImagePreview}
          className="hidden"
        />
        <button
          onClick={() => {
            setUploadRequestDetailImage(undefined)
            setIsEventFilterOpen(true)
            setState({ requestDetailType: 'EVENT', requestDetailDesignId: 1 })
          }}
          type={'button'}
          className="gray-200-700-button flex flex-1 items-center justify-center gap-x-2"
        >
          <DarkGrayPlusIcon height={16} width={16} />
          이벤트에서 추가
        </button>
      </div>
    </section>
  )
}
export default AdditionalRequestField
