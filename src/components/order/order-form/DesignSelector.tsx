import { DropDownIcon, GalleryIcon, ImagePlusIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import { OrderFormDesignListType } from '@/types/mypage';

interface Props {
  setIsDesignDropBoxOpen: Dispatch<SetStateAction<boolean>>
  isDesignDropBoxOpen: boolean
  selectedDesignContent: string | undefined
  designList: OrderFormDesignListType[] | undefined
  imgRef: RefObject<HTMLInputElement | null>
  handleImagePreview: () => void
  uploadImage: string | ArrayBuffer | null | undefined
}
const DesignSelector = (props: Props) => {
  const {
    setIsDesignDropBoxOpen,
    isDesignDropBoxOpen,
    selectedDesignContent,
    designList,
    imgRef,
    handleImagePreview,
    uploadImage,
  } = props
  const setState = useOrderStore((state) => state.setState)
  const selectedDesignUrl = useOrderStore((state) => state.selectedDesignUrl)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        디자인<span className="title-s text-red-400">*</span>
      </h5>
      <div
        onClick={() => {
          setIsDesignDropBoxOpen(!isDesignDropBoxOpen)
        }}
        className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400"
      >
        <p>{selectedDesignContent ? selectedDesignContent : selectedDesignUrl ? '갤러리에서 업로드' : '원하는 케이크 디자인을 선택해주세요.'}</p>
        <DropDownIcon height={24} width={24} />
      </div>
      {isDesignDropBoxOpen && (
        <section>
          {designList ? designList.map((design) => {
            return (
              <button
                type={'button'}
                onClick={() => {
                  setState({ selectedDesignUrl: design.designImageUrl, designId: 1, designType: 'STORE' }) //TODO: 변경
                  setState({selectedDesignContent: design.designName})
                  setIsDesignDropBoxOpen(false)
                  setState({uploadDesignImage: undefined})
                }}
                className="body-m flex w-full items-center gap-x-[6px] border-x border-b border-gray-200 px-4 py-[9px] text-gray-700"
                key={design.designId}
              >
                <div className="relative h-[32px] w-[32px]">
                  <Image alt="케이크" src={design.designImageUrl} fill className="rounded-[2px] object-cover" />
                </div>
                {design.designName}
              </button>
            )
          }) : (
            //TODO: 스켈러톤 UI
            <div></div>
          )}
        </section>
      )}
      <label
        htmlFor="input-file"
        className="mt-2 relative flex items-center justify-center button-m bg-gray-150 py-3 w-full rounded-[4px] text-gray-600"
      >
        사진첩에서 추가
        <ImagePlusIcon className="absolute right-5" width={24} height={24} />
      </label>
      <input
        type="file"
        id={'input-file'}
        ref={imgRef}
        name="input-file"
        onChange={handleImagePreview}
        className="hidden"
      />
      {uploadImage || selectedDesignUrl ? (
        <div className="flex w-full items-center justify-center">
          <div className="relative mt-2 h-[350px] w-[350px]">
            <Image
              src={
                typeof uploadImage === 'string'
                  ? uploadImage
                  : selectedDesignUrl as string // null일 수 있으므로 안전하게 단언
              }
              alt="케이크"
              fill
              className="rounded-[4px] object-cover"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
export default DesignSelector
