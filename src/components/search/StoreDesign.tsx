import DesignCard from '@/components/search/DesignCard'
import { ResponseType } from '@/types/common'
import { StoreDesignListResponseType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import DesignCardSkeleton from '@/components/skeleton/DesignCardSkeleton'

interface Props {
  sizeNameList: string[]
  searchResults: ResponseType<StoreDesignListResponseType>[] | undefined
}

const StoreDesign = (props: Props) => {
  const { sizeNameList, searchResults } = props
  const selectedSizeName = useSearchStore((state) => state.sizeName)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  return (
    <div className="flex flex-col h-full min-h-0">
      <section className="shrink-0 scrollbar-hide flex w-full justify-start gap-x-[0.5rem] overflow-x-scroll px-[1.25rem] py-[0.75rem] whitespace-nowrap">
        <button
          onClick={() => {
            setSearchParams({ sizeName: '전체' })
          }}
          className={selectedSizeName === '전체' ? 'blue-chip' : 'gray-chip'}
        >
          전체
        </button>
        {sizeNameList.map((sizeName, i) => {
          return (
            <button
              onClick={() => {
                setSearchParams({ sizeName: sizeName })
              }}
              key={i}
              className={selectedSizeName === sizeName ? 'blue-chip' : 'gray-chip'}
            >
              {sizeName}
            </button>
          )
        })}
      </section>
      <section className="flex-1 min-h-0 overflow-y-auto w-full">
        <div className="grid grid-cols-2 gap-x-[0.125rem]">
          {searchResults
            ? searchResults.map((results) => {
              return results.results.designList.map((design) => {
                return (
                  <DesignCard
                    onCardClick={() => {
                      setSearchParams({ designId: design.designId, isDesignDetailModalOpen: true, isStoreDetailModalOpen: false })
                    }}
                    key={design.designId}
                    description={design.designName}
                    img={design.designImageUrl}
                    heartCount={10}
                    isHeart={design.isLiked}
                    storeName={design.storeName}
                    startPrice={design.price}
                    onHeartClick={() => {}}
                  />
                )
              })
            })
            : [1, 2, 3, 4].map((i) => {
              return <DesignCardSkeleton key={i} />
            })}
        </div>
      </section>
    </div>
  )
}
export default StoreDesign
