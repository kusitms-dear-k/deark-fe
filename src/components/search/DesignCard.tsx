import { HeartIcon, HeartIconFill } from '@/assets/svgComponents'
import Image from 'next/image'

interface DesignCardProps {
  img: string
  enableDayOrder?: boolean
  storeName: string
  isHeartContent?: boolean // 하트 아이콘과 count가 필요 없는 곳에 제거하기 위함
  isHeart: boolean
  description: string
  startPrice?: number
  heartCount?: number
  location?: string
  onHeartClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onCardClick: () => void
}

const DesignCard = ({
  img,
  enableDayOrder = false,
  storeName,
  isHeart,
  isHeartContent = true,
  description,
  startPrice,
  heartCount,
  location,
  onHeartClick,
  onCardClick,
}: DesignCardProps) => {
  return (
    <div onClick={onCardClick} className={'w-full'}>
      <div className={'relative h-[194px] w-full'}>
        <Image src={img} alt={'arrow'} fill className={'object-cover'} />
        <div className={'absolute bottom-[8px] flex w-full justify-between pr-[12px] pl-[8px]'}>
          {enableDayOrder ? (
            <div
              className={
                'z-20 flex h-[22px] w-fit items-center justify-center gap-x-1 rounded-[2px] bg-[var(--blue-400)] px-2 text-white'
              }
            >
              <div className={'relative h-[14px] w-[14px]'}>
                <Image className={'object-cover'} src={'/search/white-calendar.svg'} fill alt={'heart'} />
              </div>
              <p className={'caption-m'}>당일 주문</p>
            </div>
          ) : (
            <div />
          )}

          <div className={'relative z-20 h-[24px] w-[24px] cursor-pointer'} onClick={onHeartClick}>
            {isHeart ? (
              <HeartIconFill className="bottom-0 object-cover" width="100%" height="100%" />
            ) : (
              <HeartIcon className="bottom-0 object-cover" width="100%" height="100%" />
            )}
          </div>
        </div>
      </div>

      <section className={'flex flex-col items-start gap-y-1 px-[10px] py-[6px]'}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex items-center gap-x-1'}>
            <div className={'caption-m text-[var(--gray-900)]'}>{storeName}</div>
            <div className={'relative h-[6px] w-[3px]'}>
              <Image className={'object-cover'} src={'/search/right-arrow.svg'} fill alt={'arrow'} />
            </div>
          </div>
          <div className={'body-m text-[var(--gray-800)]'}>{description}</div>
        </div>
        {startPrice && (
          <div className={'title-l text-[var(--gray-900)]'}>
            {startPrice.toLocaleString()}
            <span className={'body-s'}>원~</span>
          </div>
        )}

        <section className={'flex gap-x-[4px]'}>
          {isHeartContent ? (
            <div className={'flex items-center gap-x-[2px]'}>
              <div className={'relative h-[12px] w-[12px]'}>
                <Image className={'object-cover'} src={'/search/gray-fill-heart.svg'} fill alt={'heart'} />
              </div>
              <div className={'caption-m text-[var(--gray-400)]'}>{heartCount}</div>
            </div>
          ) : null}
          {location && <div className={'caption-m truncate text-[var(--gray-400)]'}>{location}</div>}
        </section>
      </section>
    </div>
  )
}
export default DesignCard
