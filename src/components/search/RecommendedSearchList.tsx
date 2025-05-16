interface Props {
  recommendedSearchList: string[]
}

const RecommendedSearchList = (props: Props) => {
  const { recommendedSearchList } = props
  return (
    <section className={'flex flex-col gap-y-3'}>
      <h2 className={'title-l'}>추천 검색어</h2>
      <div className={'flex flex-wrap gap-x-[6px] gap-y-2'}>
        {recommendedSearchList.map((recommendedSearchText) => {
          return (
            <div
              key={recommendedSearchText}
              className={'body-s w-fit rounded-full bg-[var(--gray-100)] px-3 py-[6px] text-[var(--gray-500)]'}
            >
              {recommendedSearchText}
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default RecommendedSearchList
