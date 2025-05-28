import { DropDownIcon, HeartIconEmpty, HeartIconFill } from '@/assets/svgComponents'
import Image from 'next/image'
import { StoreType } from '@/types/search'
import { DrawerTrigger } from '@/components/ui/drawer'

interface Props extends StoreType {
  onCardClick: () => void
}

const StoreCard = (props: Props) => {
  const {
    onCardClick,
    storeName,
    storeId,
    storeImageUrl,
    designImageUrlList,
    address,
    isLunchBoxCake,
    isSameDayOrder,
    isSelfService,
    isLiked,
    likeCount,
  } = props
  return (
    <DrawerTrigger onClick={onCardClick} className="w-full border-gray-150 border-b pb-[1rem]">
      <section className="flex items-center justify-between pr-[1.25rem]">
        <section className="flex items-center gap-x-[0.75rem]">
          <div className="relative h-[3.625rem] w-[3.625rem]">
            <Image src={storeImageUrl} alt={'가게 이미지'} className="rounded-full object-cover" fill />
          </div>
          <div className="flex flex-col items-start">
            <p className="title-l">{storeName}</p>
            <div className="flex">
              <p className="body-s text-gray-600">{address}</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center">
          {isLiked ? <HeartIconFill width={24} height={24} /> : <HeartIconEmpty width={24} height={24} />}

          <p className="caption-m text-gray-400">{likeCount}</p>
        </section>
      </section>

      <section className="mt-[0.75rem] flex w-full gap-x-[0.125rem] overflow-x-scroll">
        {designImageUrlList.map((designImageUrl) => {
          return (
            <div key={designImageUrl} className="relative h-[7.5rem] w-[7.5rem] flex-shrink-0">
              <Image alt={'디자인 이미지'} src={designImageUrl} fill className="object-cover" />
            </div>
          )
        })}
      </section>

      <section className="mt-[0.375rem] flex gap-x-[0.25rem]">
        {isSameDayOrder && (
          <div className="z-20 flex h-[1.375rem] w-fit items-center justify-center gap-x-[0.25rem] rounded-[0.125rem] bg-blue-400 px-[0.5rem] text-white">
            <div className="relative h-[0.875rem] w-[0.875rem]">
              <Image className="object-cover" src={'/search/white-calendar.svg'} fill alt={'heart'} />
            </div>
            <p className="caption-m">당일 주문</p>
          </div>
        )}
        {isSelfService && (
          <div className="caption-l bg-gray-150 w-fit rounded-[0.125rem] px-[0.375rem] py-[0.125rem]">
            24시 무인가게
          </div>
        )}
        {isLunchBoxCake && (
          <div className={'caption-l bg-gray-150 w-fit rounded-[0.125rem] px-[0.375rem] py-[0.125rem]'}>
            도시락 케이크
          </div>
        )}
      </section>
    </DrawerTrigger>
  );
}
export default StoreCard
