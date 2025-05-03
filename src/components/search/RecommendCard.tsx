import Image from 'next/image';

const RecommendCard = () => {
  return (
    <div className={'relative h-[194px] w-full'}>
      <Image src={'/search/cake_img.png'} alt={'arrow'} fill className={'object-cover'} />
      <div className={'right-[14px] top-[12px] absolute '}>
        <div className={'relative h-[24px] w-[24px]'}>
          <Image className={'bottom-0 object-cover'} src={'/common/heart_icon.svg'} fill alt={'heart'} />
        </div>
      </div>
      <div className={'absolute bottom-0 left-[12px] bottom-[12px]'}>
        <div className={'body-s text-[var(--white)]'}>라라 케이크</div>
        <div className={'title-s text-[var(--white)]'}>꼬까모자 퍼피 케이크</div>
      </div>

    </div>
  )
}
export default RecommendCard;
