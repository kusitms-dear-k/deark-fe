import { OrderMenuType } from '@/types/mypage'
import Cookies from 'js-cookie';

/**
 * 내가 작성한 주문서
 */
export const getMyOrder = async (status: OrderMenuType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/status?status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
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
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
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
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
    },
  })

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
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
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
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
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
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
    },
  })

  const data = await response.json()
  return data
}
