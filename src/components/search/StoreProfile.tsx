import Image from 'next/image'
import { LocationIcon } from '@/assets/svgComponents'

interface Props {
  storeName: string
  storeImageUrl: string
  likeCount: number
  storeAddress: string
  storeId: number
  isLiked: boolean
}

const StoreProfile = (props: Props) => {
  const { storeName, storeImageUrl, likeCount, storeAddress, storeId, isLiked } = props

  return (
    <div className="fixed top-28 flex w-full flex-col items-center bg-white pt-2 pb-[26.5px]">
      <div className="mt-[0.25rem] flex gap-x-[0.313rem]">
        <LocationIcon width={22} height={22} />
        <p className="body-m-m text-gray-700">{storeAddress}</p>
      </div>

      <div className="relative mt-[1.25rem] flex w-full flex-col items-center">
        <Image src="/search/cracker-group.svg" alt="폭죽" width={244} height={84} className="absolute" />
        <div className="relative h-[5rem] w-[5rem] rounded-full border border-blue-400">
          <Image src={storeImageUrl} alt="케이크" fill className="rounded-full object-cover" />
        </div>
      </div>
    </div>
  )
}
export default StoreProfile
