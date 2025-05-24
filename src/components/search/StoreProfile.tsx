import Image from 'next/image'
import { HeartIcon } from '@/assets/svgComponents'

interface Props {
  storeName: string
  storeImageUrl: string
  likeCount: number
  storeAddress: string
}

const StoreProfile = (props: Props) => {
  const { storeName, storeImageUrl, likeCount, storeAddress } = props

  return (
    <div className="flex w-full flex-col items-center">
      <section className="flex w-full justify-end gap-x-[0.25rem] px-[1.438rem] pt-[1.25rem]">
        <HeartIcon width={24} height={24} />
        <p className="caption-m text-gray-700">{likeCount}</p>
      </section>
      <p className="title-xl">{storeName}</p>
      <div className="mt-[0.25rem] flex gap-x-[0.313rem]">
        <div className="relative h-[1.375rem] w-[1.375rem]">
          <Image src="/search/location.svg" alt="장소" fill className="object-cover"></Image>
        </div>
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
