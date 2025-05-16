export type OrderMenuType = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type OrderMenuKorType = '응답 대기' | '수락' | '반려'

export interface OrderType {
  messageId: number
  requestDate: string
  storeName: string
  designName: string
  designImageUrl: string
  qaDetails: QaDetailType[]
}

export interface QaDetailType {
  title: string
  answer: string
}

export interface RequestCountType {
  status: OrderMenuType
  count: number
}
