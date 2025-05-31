// 이벤트 상세
export interface EventDetail {
  eventId: number
  title: string
  address: string
  eventDate: string
  thumbnailUrl: string
}

// 스토어 아이템
export interface StoreItem {
  storeId: number
  storeName: string
  storeAddress: string
  memo: string
  designImageUrls: string[]
}

// 디자인 아이템
export interface DesignItem {
  designId: number
  storeName: string
  designName: string
  designImageUrl: string
  memo: string
}

// 이벤트 생성 요청
export interface CreateEventRequest {
  title: string
  event_date: string
  address: string
}

// 이벤트 매핑 요청
export interface EventMappingRequest {
  store_id?: number
  design_id?: number
  event_ids: number[]
}

// 이벤트 체크 응답
export interface EventCheckItem extends EventDetail {
  isChecked: boolean
}
