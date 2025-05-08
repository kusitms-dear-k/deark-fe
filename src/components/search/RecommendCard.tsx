import { HeartIcon } from '@/assets/svgComponents'
import Image from 'next/image'

const RecommendCard = () => {
  return (
    <div className={'relative h-[194px] w-full'}>
      <Image src={'/search/cake_img.png'} alt={'arrow'} fill className={'object-cover'} />
      <div className={'absolute top-[12px] right-[14px]'}>
        <div className={'relative h-[24px] w-[24px]'}>
          <HeartIcon className="bottom-0 object-cover" width="100%" height="100%" />
        </div>
      </div>
      <div className={'absolute bottom-[12px] left-[12px]'}>
        <div className={'body-s text-[var(--white)]'}>라라 케이크</div>
        <div className={'title-s text-[var(--white)]'}>꼬까모자 퍼피 케이크</div>
      </div>
    </div>
  )
}
export default RecommendCard
