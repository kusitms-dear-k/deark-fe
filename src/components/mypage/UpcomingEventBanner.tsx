import Image from 'next/image'
import { UpcomingEventType } from '@/types/mypage'

interface UpcomingEventBannerProps {
  upcomingEvent: UpcomingEventType | undefined
}

const UpcomingEventBanner = ({upcomingEvent}: UpcomingEventBannerProps) => {
  return (
    <div className="relative mt-4 rounded-[8px] bg-white px-5 py-4">
      <Image src={'/common/glitter-group-icon.svg'} alt="글리터" fill className="object-cover px-[25px]" />
      <div className="title-l text-gray-800">{upcomingEvent ? `D-${upcomingEvent.dDay} "${upcomingEvent.eventTitle}"` : '아직 이벤트가 없네요.'}</div>
      {upcomingEvent ? (
        <p className="text-gray-700 body-s-m"><span className="title-s">"{upcomingEvent.eventTitle}"</span>만의 특별함을 담아보세요.</p>
        ) : (
        <p className="body-s-m text-gray-700">이벤트는 찜하기 {'>'} ‘새 이벤트 생성하기’로 만들 수 있어요.</p>
      )}

    </div>
  )
}
export default UpcomingEventBanner;
