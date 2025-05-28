import Image from 'next/image'
import { DesignDetailType } from '@/types/search'
import { Gray700HeartIcon, HeartIconFill } from '@/assets/svgComponents'
import { useOrderStore } from '@/store/orderStore'
import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useSearchStore } from '@/store/searchStore'
import Cookies from 'js-cookie'

interface Props {
  designDetail: DesignDetailType | undefined
}

const DesignDetailContent = ({ designDetail }: Props) => {
  const token = Cookies.get('ACCESS_TOKEN')
  const setState = useOrderStore((state) => state.setState)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const designId = useSearchStore((state) => state.designId) //선택된 designId

  if (!designDetail) return null

  return (
    <DrawerContent >
      <DrawerHeader
        onClick={() => {
          setSearchParams({
            isStoreDetailModalOpen: true,
            isDesignDetailModalOpen: false,
            storeId: designDetail?.storeId,
          })
        }}
      >
        <DrawerTitle className="title-m text-center">{designDetail.storeName}</DrawerTitle>
      </DrawerHeader>

      <div className="overflow-y-scroll">
        <div className="relative h-[22.5rem] w-full">
          <Image src={designDetail.designImageUrl} alt="케이크 디자인" fill className="object-cover" priority />
        </div>

        <section className="border-gray-150 border-b p-[1.25rem]">
          <div className="flex items-center justify-between">
            <h4 className="title-l">{designDetail.designName}</h4>
            <div className="flex items-center gap-x-1">
              {designDetail.isLiked ? (
                <HeartIconFill width={24} height={24} />
              ) : (
                <Gray700HeartIcon width={20} height={18} />
              )}
              <p className="caption-m text-gray-700">{designDetail.likeCount}</p>
            </div>
          </div>
          <p className="body-m mt-[0.25rem] text-gray-800">{designDetail.description}</p>
          <p className="title-xl mt-2">{designDetail.price.toLocaleString()}원</p>
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

      <DrawerFooter className="border-gray-150 border-t bg-white px-[1.25rem] pt-[1.25rem]">
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
      </DrawerFooter>
    </DrawerContent>
  )
}

const OptionRow = ({ title, values }: { title: string; values: string[] }) => (
  <div className="flex items-center gap-x-[0.5rem]">
    <p className="title-s text-gray-700">{title}</p>
    <div className="flex flex-wrap gap-x-[0.375rem]">
      {values.map((value) => (
        <div key={value} className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">
          {value}
        </div>
      ))}
    </div>
  </div>
)

export default DesignDetailContent
