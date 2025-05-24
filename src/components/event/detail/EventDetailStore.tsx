import { StoreItem } from '@/types/event'
import Image from 'next/image'
import { HeartIconFill } from '@/assets/svgComponents'

export default function EventDetailStoreCard({ store }: { store: StoreItem }) {
  return (
    <div className="flex flex-col gap-2.5 rounded border border-gray-100 bg-white p-2.5 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={store.storeImageUrl} alt={store.storeName} width={36} height={36} className="rounded-full" />
          <div>
            <div className="text-sm font-bold text-zinc-900">{store.storeName}</div>
            <div className="text-xs text-neutral-700">{store.storeAddress}</div>
          </div>
        </div>
        <HeartIconFill width={24} height={24} className="text-red-500" />
      </div>
      {/* 대표 이미지 4장 */}
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <Image
            key={i}
            src={store.storeImageUrl}
            alt={store.storeName}
            width={81}
            height={82}
            className="rounded-sm"
          />
        ))}
      </div>
      {/* 메모 */}
      <div className="rounded-sm bg-stone-50 p-2 text-xs text-neutral-500">
        {store.memo ? store.memo : <span className="text-stone-300">메모를 입력해주세요...</span>}
      </div>
    </div>
  )
}
