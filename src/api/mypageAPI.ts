import { OrderMenuType, PickupOrderResponse, RequestStatusType } from '@/types/mypage'
import Cookies from 'js-cookie'

/**
 * 내가 작성한 주문서
 */
export const getMyOrder = async (status: OrderMenuType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/status?status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 내 요청서 상태 별 개수 조회
 */
export const getMyOrderRequestCount = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/count`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 내 요청서 상세 조회
 */
export const getMyOrderDetailData = async (messageId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/detail/${messageId}`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 승인된 요청서 상세 조회
 */
export const getAcceptedOrderDetailData = async (messageId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/accepted/${messageId}`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}


/**
 * 주문서 작성시 가게별 디자인 조회
 */
export const getOrderFormDesignData = async (storeId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/store/${storeId}/design`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 주문서 작성시 가게 운영시간 조회
 */
export const getBusinessHours = async (storeId: number, pickUpDate: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order/store/${storeId}/business-hours?pickUpDate=${pickUpDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: Cookies.get('ACCESS_TOKEN') as string,
      },
    }
  )

  const data = await response.json()
  return data
}

/**
 * 주문서 작성시 가게별 디자인 조회
 */
export const getOrderFormSizeData = async (storeId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/store/${storeId}/size`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 주문서 작성시 가게별 디자인 조회
 */
export const getOrderFormSheetData = async (storeId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/store/${storeId}/sheet`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 주문서 작성시 가게별 디자인 조회
 */
export const getOrderFormCreamData = async (storeId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/store/${storeId}/cream`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 주문서 작성시 가게별 디자인 조회
 */
export const postOrderForm = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/submit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
    body: formData,
  })

  const data = await response.json()
  return data
}

/**
 * UT용 이벤트 전체 불러오기 작성시 가게별 디자인 조회
 */
export const getMyEventForUT = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/my_events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * UT용 이벤트 전체 불러오기 작성시 가게별 디자인 조회
 */
export const getMyEventDesignForUT = async (eventId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}/designs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 픽업 예정 주문서 조회
 */
export const getPickupExpectData = async (): Promise<PickupOrderResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/pickup/scheduled`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  return response.json()
}

/**
 * 픽업 완료 주문서 조회
 */
export const getPickupDoneData = async (): Promise<PickupOrderResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/pickup/completed`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  return response.json()
}

/**
 * 입금 완료/주문 취소 상태를 변경하는 호출
 */
export const putRequestStatus = async (messageId: number, status: RequestStatusType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/${messageId}?status=${status}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 반려된 견적서 사유 조회
 */
export const getRejectedMessage = async (messageId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/rejected/${messageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

/**
 * 다가오는 이벤트 조회
 */
export const getUpcomingEvent = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/event/upcoming`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}

