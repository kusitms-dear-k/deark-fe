import Image from 'next/image'

const StoreReview = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] py-12 gap-y-[0.938rem]">
      <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
      <div className="flex flex-col items-center justify-center">
        <div className="title-l text-gray-500">아직 리뷰는 준비중이에요!</div>
        <div className="body-m text-gray-400">조금만 기다려주세요.</div>
      </div>
    </div>
  )
}
export default StoreReview
