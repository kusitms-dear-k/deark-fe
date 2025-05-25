import CheckBoxIcon from '@/assets/svgComponents/CheckBoxIcon'
import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'
import Image from 'next/image'
import { CancelIcon, Gray300ClipboardIcon, GrayClipboardIcon } from '@/assets/svgComponents'
import { NoticeResponseType, NoticeType } from '@/types/notice'
import { deleteNotices, getNotices, putNotices } from '@/api/noticeAPI'
import { OrderMenuType } from '@/types/mypage'
import { Dispatch, SetStateAction } from 'react'
import { formatTimeAgo } from '@/utils/common/function'
import { useOrderStore } from '@/store/orderStore'

interface NoticeCardProps extends NoticeResponseType {
  isLastIndex: boolean
  deleteAlarmIdList: number[]
  totalOrderStatus: OrderMenuType | null
  setNoticeData: Dispatch<SetStateAction<NoticeType | undefined>>
  setDeleteAlarmIdList: Dispatch<SetStateAction<number[]>>
  readAlarmIdList: number[]
  setReadAlarmIdList: Dispatch<SetStateAction<number[]>>
  setIsRejectedMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAcceptedRequestModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NoticeCard = ({
  isLastIndex,
  designImageUrl,
  storeName,
  responseStatus, //현재는 사용되지 않음 (피커가 승인되었는데 취소한 경우를 의미)
  messageId,
  orderStatus,
  alarmId,
  alarmDateTime,
  isRead,
  deleteAlarmIdList,
  totalOrderStatus,
  setNoticeData,
  setDeleteAlarmIdList,
  setReadAlarmIdList,
                      setIsRejectedMessageModalOpen,
  setIsAcceptedRequestModalOpen,
}: NoticeCardProps) => {
  const setState = useOrderStore((state) => state.setState)

  /**
   * delete 요청 함수
   * @param alarmId
   */
  const handleDeleteNotice = async (alarmId: number) => {
    try {
      const res = await deleteNotices([alarmId])
      console.log(res)

      // ⬇ 삭제된 alarmId를 리스트에서 제거
      setDeleteAlarmIdList((prev) => prev.filter((id) => id !== alarmId))

      const noticeRes = await getNotices(totalOrderStatus)
      console.log('알람 데이터', noticeRes)
      setNoticeData(noticeRes.results)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 읽음 처리 요청 함수
   * @param alarmId
   */
  const handleReadNotice = async (alarmId: number) => {
    try {
      const res = await putNotices([alarmId])
      console.log('읽음 처리 완료', res)

      // ⬇ 읽음 처리 된 alarmId를 리스트에서 제거
      setReadAlarmIdList((prev) => prev.filter((id) => id !== alarmId))

      const noticeRes = await getNotices(totalOrderStatus)
      console.log('알람 데이터', noticeRes)
      setNoticeData(noticeRes.results)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * checkbox 제어 함수
   */
  const toggleCheck = () => {
    setDeleteAlarmIdList((prev) => {
      if (prev.includes(alarmId)) {
        return prev.filter((id) => id !== alarmId)
      } else {
        return [...prev, alarmId]
      }
    })
  }

  const isChecked = deleteAlarmIdList.includes(alarmId)

  return (
    <div
      onClick={async () => {
        await handleReadNotice(alarmId)
        setState({ messageId: messageId })
        if (orderStatus === 'ACCEPTED') {
          setIsAcceptedRequestModalOpen(true)
        } else if (orderStatus === 'REJECTED') {
          setIsRejectedMessageModalOpen(true)
        }
      }}
      className={isLastIndex ? 'w-full flex gap-x-2 px-5 py-4' : 'w-full flex gap-x-2 border-b-[9px] border-gray-100 px-5 py-4'}
    >
      {isChecked ? (
        <CheckBoxIcon
          onClick={(e) => {
            e.stopPropagation()
            toggleCheck()
          }}
          width={24}
          height={24}
        />
      ) : (
        <UnCheckBoxIcon
          onClick={(e) => {
            e.stopPropagation()
            toggleCheck()
          }}
          width={24}
          height={24}
        />
      )}
      <section className="flex w-full flex-col gap-y-3 w-full">
        <section className="flex justify-between">
          <div className="flex gap-x-3">
            <div className="relative h-[67px] w-[67px]">
              {isRead && <div className="absolute z-10 h-[67px] w-[67px] bg-white object-cover opacity-[60%]" />}
              <Image src={designImageUrl} alt="케이크" fill className="rounded-[4px] object-cover" />
            </div>
            <div>
              <p className={isRead ? 'body-m-m text-gray-300' : 'body-m-m text-gray-700'}>
                <span className="title-m">{storeName}</span>에서 <br />
                피커님의 주문서를 {orderStatus === 'ACCEPTED' ? '수락' : '반려'}했어요.
              </p>
              <div className="flex gap-x-1">
                <div
                  className={
                    orderStatus === 'ACCEPTED'
                      ? `body-s-m rounded-[27px] bg-blue-100 px-[6px] ${isRead ? 'text-blue-300' : 'text-blue-400'}`
                      : `body-s-m rounded-[27px] bg-red-100 px-[6px] ${isRead ? 'text-red-200' : 'text-red-400'}`
                  }
                >
                  {orderStatus === 'ACCEPTED' ? '수락' : '반려'}
                </div>
                <p className={`body-s ${isRead ? 'text-gray-300' : 'text-gray-400'}`}>{formatTimeAgo(alarmDateTime)}</p>
              </div>
            </div>
          </div>
          <CancelIcon
            onClick={async (e) => {
              e.stopPropagation()
              await handleDeleteNotice(alarmId)
            }}
            width={24}
            height={24}
          />
        </section>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setState({ messageId: messageId, isOrderOpen: true })
          }}
          className={`body-m-m flex w-full items-center justify-center gap-x-1 rounded-[4px] border border-gray-200 py-2 ${isRead ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {isRead ? <Gray300ClipboardIcon width={16} height={16} /> : <GrayClipboardIcon width={16} height={16} />}
          내가 보낸 주문서 보러가기
        </button>
      </section>
    </div>
  )
}
export default NoticeCard
