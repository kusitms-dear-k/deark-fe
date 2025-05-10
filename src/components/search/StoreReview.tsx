import Image from 'next/image'

const StoreReview = () => {
  return (
    <div className={'h-full mt-7 mb-[53px] flex flex-col items-center justify-center gap-y-[15px]'}>
      <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
      <div className={'flex flex-col items-center justify-center'}>
        <div className={'title-l text-[var(--gray-500)]'}>아직 리뷰는 준비중이에요!</div>
        <div className={'body-m text-[var(--gray-400)]'}>조금만 기다려주세요.</div>
      </div>
    </div>
  )
}
export default StoreReview
