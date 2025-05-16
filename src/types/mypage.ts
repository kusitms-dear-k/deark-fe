export type OrderMenuType = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type OrderMenuKorType = '응답 대기' | '수락' | '반려'
export type QaDetailTitleType = '이름' | '전화번호' | '크기' | '크림 맛' | '시트 맛' | '픽업 희망 일자' | '픽업 희망 시간' | '추가 요청사항' | '기타 요청사항'

export interface OrderType {
  messageId: number
  requestDate: string
  storeName: string
  designName: string
  designImageUrl: string
  qaDetails: QaDetailType[]
}

export interface QaDetailType {
  title: QaDetailTitleType
  answer: string
  isRequired: boolean
}

export interface RequestCountType {
  status: OrderMenuType
  count: number
}
