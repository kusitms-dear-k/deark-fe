import Image from 'next/image'

import { DesignDetailType } from '@/types/search'
import { HeartIcon, HeartIconFill } from '@/assets/svgComponents'

interface Props {
  designDetail: DesignDetailType | undefined
}

const DesignDetailContent = (props: Props) => {
  const { designDetail } = props

  return (
    <>
      {designDetail ? (
        <>
          <div className="flex w-full flex-col overflow-y-scroll">
            <h3 className="title-m my-[0.75rem] flex w-full items-center justify-center">{designDetail.storeName}</h3>
            <div className="relative h-[22.5rem]">
              <Image src={designDetail.designImageUrl} alt="케이크" fill className="object-cover" />
            </div>
            <section className="border-gray-150 border-b p-[1.25rem]">
              <div className="flex items-center justify-between">
                <h4 className="title-l">{designDetail.designName}</h4>
                <div className="flex gap-x-1">
                  {designDetail.isLiked ? (
                    <HeartIconFill width={24} height={24} />
                  ) : (
                    <HeartIcon width={24} height={24} />
                  )}
                  <p className="caption-m text-gray-700">{designDetail.likeCount}</p>
                </div>
              </div>
              <p className="body-m mt-[0.25rem] text-gray-800">{designDetail.description}</p>
              <p className="title-xl">{designDetail.price}원</p>
            </section>
            <section className="p-[1.25rem]">
              <h4 className="title-l">케이크 옵션</h4>
              <div className="mt-[1rem] flex flex-col gap-y-[1.125rem]">
                {designDetail.sizeList.length > 0 ? (
                  <section className="flex items-center gap-x-[1.313rem]">
                    <p className="title-s text-gray-700">크기</p>
                    <div className="flex items-center gap-x-[0.375rem]">
                      {designDetail.sizeList.map((size) => {
                        return (
                          <div key={size} className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">
                            {size}
                          </div>
                        )
                      })}
                    </div>
                  </section>
                ) : null}
                {designDetail.creamList.length > 0 ? (
                  <section className="flex items-center gap-x-[0.5rem]">
                    <p className="title-s text-gray-700">크림 맛</p>
                    <div className="flex items-center gap-x-[0.375rem]">
                      {designDetail.creamList.map((cream) => {
                        return (
                          <div key={cream} className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">
                            {cream}
                          </div>
                        )
                      })}
                    </div>
                  </section>
                ) : null}
                {designDetail.sheetList.length > 0 ? (
                  <section className="flex items-center gap-x-[0.5rem]">
                    <p className="title-s text-gray-700">시트 맛</p>
                    <div className="flex items-center gap-x-[0.375rem]">
                      {designDetail.sheetList.map((sheet) => {
                        return (
                          <div key={sheet} className="chip-s bg-gray-150 rounded-[0.15rem] px-[0.45rem] py-[0.219rem]">
                            {sheet}
                          </div>
                        )
                      })}
                    </div>
                  </section>
                ) : null}
              </div>
            </section>
          </div>
          <div className="border-gray-150 bottom-0 w-full border-t bg-white px-[1.25rem] pt-[1.25rem]">
            <button className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white">
              주문하러 가기
            </button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default DesignDetailContent
