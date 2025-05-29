import Image from 'next/image'
import { Gray700HeartIcon, HeartIcon, HeartIconFill, LocationIcon } from '@/assets/svgComponents'
import { DrawerTitle } from '@/components/ui/drawer'
import { useHeartClick } from '@/hooks/useHeartClick'
import { EventApi } from '@/api/eventAPI'
import EventModal from '../event/EventModal'
import EventSelectionContent from '../event/EventSelectContent'
import ToastMsg from '../event/ToastMsg'

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

  const {
    modalView,
    setModalView,
    eventList,
    handleHeartClick,
    selectedEventIds,
    toastMessage,
    showToast,
    setShowToast,
  } = useHeartClick('store')

  // 모달 닫힐 때 API 호출
  const handleModalClose = async (selectedIds: number[]) => {
    if (storeId) {
      await EventApi.mapStoreToEvents({
        store_id: storeId,
        event_ids: selectedIds,
      })
      setShowToast(true)
    }
    setModalView(null)
  }

  return (
    <div className="fixed top-28 pt-2 bg-white flex w-full flex-col items-center pb-[26.5px]">
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

      <EventModal isOpenModal={modalView === 'eventList'} onClose={() => setModalView(null)}>
        <EventSelectionContent
          events={eventList}
          initialSelected={selectedEventIds}
          onAddNew={() => setModalView('newEvent')}
          onClose={handleModalClose}
        />
      </EventModal>
      <ToastMsg message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
export default StoreProfile
