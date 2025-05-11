
import { SearchIconGray } from '@/assets/svgComponents'
import Image from 'next/image'

interface Props {
  recentSearchList: string[]
}

const RecentSearchList = (props: Props) => {
  const { recentSearchList } = props
  return (
    <section className={'flex flex-col gap-y-3'}>
      <div className={'flex justify-between'}>
        <h2 className={'title-l'}>최근 검색항목</h2>
        {recentSearchList.length > 0 ? <button className={'body-s text-[var(--gray-500)]'}>모두 삭제</button> : null}
      </div>
      {recentSearchList.length > 0 ? (
        recentSearchList.map((recentSearchText) => {
          return (
            <div key={recentSearchText} className={'flex flex-col gap-y-4 px-4'}>
              <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-x-2'}>
                  <div className={'w-fit rounded-full bg-[var(--gray-100)] p-2'}>
                    <SearchIconGray width={24} height={24} />
                  </div>
                  <div className={'body-m text-[var(--gray-900)]'}>{recentSearchText}</div>
                </div>

                <Image src={'/cancel.svg'} width={24} height={24} alt={'삭제'} style={{ width: 24, height: 24 }} />
              </div>
            </div>
          )
        })
      ) : (
        <div className={'mt-[124px] flex flex-col items-center justify-center gap-y-[15px]'}>
          <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
          <div className={'flex flex-col items-center justify-center'}>
            <div className={'title-l text-[var(--gray-500)]'}>아직 찾으신 내용이 없네요.</div>
            <div className={'body-m text-[var(--gray-400)]'}>어떤 케이크를 찾아볼까요?</div>
          </div>
        </div>
      )}
    </section>
  )
}
export default RecentSearchList
