import { OrderMenuType, RequestStatusType } from '@/types/mypage'

export interface NoticeType {
  alarmCount: number
  responseList: NoticeResponseType[]
}

export interface NoticeResponseType {
  alarmId: number
  designImageUrl: string
  storeName: string
  orderStatus: OrderMenuType
  alarmDateTime: string
  messageId: number
  isRead: boolean
  responseStatus: RequestStatusType
}
