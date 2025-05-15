import { HeartIcon, HeartIconFill } from '@/assets/svgComponents'
import Image from 'next/image'
import { RecommendType } from '@/types/search'

interface Props extends RecommendType {
  onCardClick: () => void
}

const RecommendCard = (props: Props) => {
  const { storeName, designName, designId, designImageUrl, isLiked, onCardClick } = props
  return (
    <div onClick={onCardClick} className="relative h-[12.125rem] w-full">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
      <Image src={designImageUrl} alt={'이미지'} fill className="object-cover" />
      <div className="absolute top-[0.75rem] right-[0.875rem]">
        <div className="relative h-[1.5rem] w-[1.5rem]">
          {isLiked ? <HeartIconFill width={24} height={24} /> : <HeartIcon width={24} height={24} />}
        </div>
      </div>
      <div className="absolute bottom-[0.75rem] left-[0.75rem]">
        <div className="body-s text-white">{storeName}</div>
        <div className="title-s text-white">{designName}</div>
      </div>
    </div>
  )
}
export default RecommendCard
