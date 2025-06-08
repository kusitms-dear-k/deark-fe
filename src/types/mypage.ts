export type OrderMenuType = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type OrderMenuKorType = '응답 대기' | '수락' | '반려'
export type QaDetailTitleType =
  | '이름'
  | '전화번호'
  | '크기'
  | '크림 맛'
  | '시트 맛'
  | '픽업 희망 일자'
  | '픽업 희망 시간'
  | '추가 요청사항'
  | '기타 요청사항'

export interface OrderType {
  messageId: number
  requestDate: string
  storeName: string
  designName: string
  chattingUrl: string
  designImageUrl: string
  responseStatus: RequestStatusType
  operatingHours: string
  designType: OrderFormDesignType
  qaDetails: QaDetailType[]
}

export interface QaDetailType {
  title: QaDetailTitleType
  answer: string
  isRequired?: boolean
}

export interface RequestCountType {
  orderStatus: OrderMenuType
  count: number
}

export interface OrderFormType {
  storeId: number | null
  designType: OrderFormDesignType | null
  designId: number | null
  requestDetailType: OrderFormRequestDetailType | null
  requestDetailDesignId: number | null
  answers: QaDetailType[] | null
}

export type OrderFormDesignType = 'STORE' | 'CUSTOM' // 'STORE': 가게 디자인에서 선택, 'CUSTOM': 사용자가 갤러리에서 선택,
export type OrderFormRequestDetailType = 'EVENT' | 'CUSTOM' // 'CUSTOM': 사용자가 갤러리에서 선택, 'EVENT': 이벤트에서 선택

export interface OrderFormDesignListType {
  designId: number
  designName: string
  designImageUrl: string
  price: number
}
export interface UTEventType {
  eventId: number
  title: string
  address: string
  eventDate: string
  thumbnailUrl: string
}
export interface UTEventDesignType {
  designId: number
  storeName: string
  designName: string
  designImageUrl: string
  memo: string
}
export interface OrderFormCreamType {
  creamName: string
}
export interface OrderFormSheetType {
  sheetName: string
}
export interface OrderFormSizeType {
  sizeName: string
}

export interface PickupOrder {
  messageId: number
  storeName: string
  designName: string
  designUrl: string
  size: string
  cream: string
  sheet: string
  progressStatus: 'RESERVED' | 'PICKUP_DONE' | string
  pickupDate: string
  pickupTime: string
}

export interface PickupOrderResponse {
  isSuccess: boolean
  code: string
  message: string
  results: {
    responseList: PickupOrder[]
    totalNum: number
  }
}

export interface AcceptedOrderDetailType {
  pickUpTime: string
  price: string
  bankImageUrl: string
  bankName: string
  account: string
}
export type RequestStatusType = 'CANCELED' | 'PAID' | 'UNRESPONSIVE'


//다가오는 이벤트 타입
export interface UpcomingEventType {
  eventTitle: string
  dDay: number
}
