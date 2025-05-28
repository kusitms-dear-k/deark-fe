import KebabIcon from '@/assets/svgComponents/KebabIcon'
import { DesignItem, EventDetail, StoreItem } from '@/types/event'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface EventCardProps {
  event: EventDetail
  stores: StoreItem[]
  designs: DesignItem[]
  onMenuClick: () => void
}

// function getThumbnails(stores: StoreItem[], designs: DesignItem[]) {
//   const images = [...stores.map((s) => s.storeImageUrl), ...designs.map((d) => d.designImageUrl)]
//   if (images.length === 0) return []
//   if (images.length < 4) return [images[0]]
//   return images.slice(0, 4)
// }

export default function EventCard({ event, stores, designs, onMenuClick }: EventCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // 케밥 메뉴 클릭 시 이벤트 전파 방지
    if ((e.target as HTMLElement).closest('.kebab-menu')) {
      return
    }
    // 이벤트 상세 페이지로 이동
    router.push(`/event/${event.eventId}`)
  }

  if (!event.thumbnailUrl) return

  return (
    <div className="shadow-middlemodal h-[15.125rem] w-[10.5rem] rounded-sm bg-white px-2 py-4">
      <div className="mb-2" onClick={handleCardClick}>
        <div className="relative aspect-square overflow-hidden rounded">
          <Image src={event.thumbnailUrl} alt={event.title} fill className="object-cover" />
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="caption-m text-gray-700">{event.eventDate.replace(/-/g, '.')}</div>
          <div className="title-s text-gray-900">{event.title}</div>
          <div className="caption-m line-clamp-1 text-gray-400">{event.address}</div>
        </div>

        <KebabIcon width={24} height={24} onClick={onMenuClick} className="cursor-pointer" />
      </div>
    </div>
  )
}
