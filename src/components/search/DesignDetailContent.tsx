import Image from 'next/image'

const DesignDetailContent = () => {
  return (
    <>
      <div className="flex w-full flex-col overflow-y-scroll">
        <h3 className="title-m my-[0.75rem] flex w-full items-center justify-center">메리고라운드</h3>
        <div className="relative h-[22.5rem]">
          <Image src="/common/cake1.png" alt="케이크" fill className="object-cover" />
        </div>
        <section className="border-gray-150 border-b p-[1.25rem]">
          <div className="flex items-center justify-between">
            <h4 className="title-l">블루리안 케이크</h4>
            <p className="caption-m text-gray-700">1,452</p>
          </div>
          <p className="body-m mt-[0.25rem] text-gray-800">
            아이들에게 인기만점! 여러가지 수채화 색깔로 디자인해 상큼한 맛과 분위기가 매력적인 케이크입니다.
          </p>
          <p className="title-xl">20000원~</p>
        </section>
        <section className="p-[1.25rem]">
          <h4 className="title-l">케이크 옵션</h4>
          <div className="mt-[1rem] flex flex-col gap-y-[1.125rem]">
            <div className="flex gap-x-[1.313rem]">
              <p className="title-s text-gray-700">크기</p>
              <div className="flex items-center gap-x-[0.375rem]">
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">한 입 케이크</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">도시락 케이크</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">1호</div>
              </div>
            </div>
            <div className="flex items-center gap-x-[0.5rem]">
              <p className="title-s text-gray-700">크림 맛</p>
              <div className="flex items-center gap-x-[0.375rem]">
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">생크림</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">딸기크림</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">초코크림</div>
              </div>
            </div>
            <div className="flex items-center gap-x-[0.5rem]">
              <p className="title-s text-gray-700">시트 맛</p>
              <div className="flex items-center gap-x-[0.375rem]">
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">기본</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">바나나</div>
                <div className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">얼그레이</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="border-gray-150 bottom-0 w-full border-t bg-white px-[1.25rem] pt-[1.25rem]">
        <button className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white">주문하러 가기</button>
      </div>
    </>
  )
}
export default DesignDetailContent
