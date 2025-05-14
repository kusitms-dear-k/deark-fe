export type OrderMenuType = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type OrderMenuKorType = '응답 대기' | '수락' | '반려'

export interface OrderType {
  messageId: number
  createdAt: string
  storeName: string
  designName: string
  designImageUrl: string
  qaDetails: QaDetailType
}

export interface QaDetailType {
  크기: string
  '픽업 희망 날짜': string
  '픽업 희망 시간': string
}
