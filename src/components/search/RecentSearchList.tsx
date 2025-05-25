import { CancelIcon, SearchIconGray } from '@/assets/svgComponents'
import Image from 'next/image'
import { useSearchStore } from '@/store/searchStore'

interface Props {
  recentSearchList: string[]
  onClear: () => void
  onRemove: (keyword: string) => void
}

const RecentSearchList = (props: Props) => {
  const { recentSearchList, onClear, onRemove } = props

  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <h2 className="title-l">최근 검색항목</h2>
        {recentSearchList.length > 0 ? (
          <button onClick={onClear} className="body-s text-gray-500">
            모두 삭제
          </button>
        ) : null}
      </div>
      {recentSearchList.length > 0 ? (
        recentSearchList.map((recentSearchText) => {
          return (
            <div
              onClick={() => setSearchParams({ keyword: recentSearchText })}
              key={recentSearchText}
              className="flex flex-col gap-y-4 px-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="w-fit rounded-full bg-gray-100 p-2">
                    <SearchIconGray width={24} height={24} />
                  </div>
                  <div className="body-m text-gray-900">{recentSearchText}</div>
                </div>

                <CancelIcon
                  onClick={(e) => {
                    e.stopPropagation() // 이벤트 버블링 차단
                    onRemove(recentSearchText)
                  }}
                  width={24}
                  height={24}
                />
              </div>
            </div>
          )
        })
      ) : (
        <div className="mt-[124px] flex flex-col items-center justify-center gap-y-[15px]">
          <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
          <div className="flex flex-col items-center justify-center">
            <div className="title-l text-gray-500">아직 찾으신 내용이 없네요.</div>
            <div className="body-m text-gray-400">어떤 케이크를 찾아볼까요?</div>
          </div>
        </div>
      )}
    </section>
  )
}
export default RecentSearchList
