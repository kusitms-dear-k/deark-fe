'use client'

import { ApiResponse } from '@/types/api'
import {
  CreateEventRequest,
  DesignItem,
  EventCheckItem,
  EventDetail,
  EventMappingRequest,
  StoreItem,
} from '@/types/event'

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL

// 공통 에러 처리
const handleResponse = async <T>(res: Response): Promise<T> => {
  const data: ApiResponse<T> = await res.json()
  if (!data.isSuccess) throw new Error(data.message)
  return data.results
}

export const EventApi = {
  // 이벤트 상세 조회
  getEvent: async (eventId: number): Promise<EventDetail> => {
    const res = await fetch(`${API_BASE}/event/${eventId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<EventDetail>(res)
  },

  // 이벤트 생성
  createEvent: async (body: CreateEventRequest): Promise<number> => {
    const res = await fetch(`${API_BASE}/event`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<number>(res)
  },

  // 이벤트 수정
  updateEvent: async (eventId: number, body: CreateEventRequest): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<void>(res)
  },

  // 이벤트 삭제
  deleteEvent: async (eventId: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<void>(res)
  },

  // 스토어-이벤트 매핑
  mapStoreToEvents: async (body: EventMappingRequest): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/store/mapping`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<void>(res)
  },

  // 디자인-이벤트 매핑
  mapDesignToEvents: async (body: EventMappingRequest): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/design/mapping`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return handleResponse<void>(res)
  },

  // 이벤트 내 스토어 조회
  getEventStores: async (eventId: number): Promise<StoreItem[]> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/stores`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<StoreItem[]>(res)
  },

  // 이벤트 내 디자인 조회
  getEventDesigns: async (eventId: number): Promise<DesignItem[]> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/designs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<DesignItem[]>(res)
  },

  // 전체 이벤트 조회
  getMyEvents: async (): Promise<EventDetail[]> => {
    const res = await fetch(`${API_BASE}/event/my_events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<EventDetail[]>(res)
  },

  // 스토어 체크 이벤트 조회
  getCheckedEventsByStore: async (storeId: number): Promise<EventCheckItem[]> => {
    const res = await fetch(`${API_BASE}/event/my_events/with-check/store?storeId=${storeId}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<EventCheckItem[]>(res)
  },

  // 디자인 체크 이벤트 조회
  getCheckedEventsByDesign: async (designId: number): Promise<EventCheckItem[]> => {
    const res = await fetch(`${API_BASE}/event/my_events/with-check/design?designId=${designId}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<EventCheckItem[]>(res)
  },

  // 이벤트에서 스토어 제거
  removeStoreFromEvent: async (eventId: number, storeId: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/stores/${storeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<void>(res)
  },

  // 이벤트에서 디자인 제거
  removeDesignFromEvent: async (eventId: number, designId: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/designs/${designId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    })
    return handleResponse<void>(res)
  },

  updateStoreMemo: async (eventId: number, storeId: number, memo: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/stores/${storeId}/memo`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memo }),
    })
    return handleResponse<void>(res)
  },

  updateDesignMemo: async (eventId: number, designId: number, memo: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/event/${eventId}/designs/${designId}/memo`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memo }),
    })
    return handleResponse<void>(res)
  },
}
