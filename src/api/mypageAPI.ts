import { OrderMenuType } from '@/types/mypage'
import Cookies from 'js-cookie';

/**
 * 내가 작성한 주문서
 */
export const getMyOrder = async (status: OrderMenuType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/status?status=${status}`, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDczMzU3NDIsImV4cCI6MTc0NzMzOTM0MiwiaXNzIjoiZGVhcmsiLCJzdWIiOiIxIiwicm9sZSI6IkNVU1RPTUVSIn0.5fFXp9uMknE1Pj_u0b4Zi7CZRaN-61-SsOovdoW82ztDlHUwoh9DgHdh3tUBVgXa3ftTAaDiTLZNfByXXIX2vw',
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
      Authorization:
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDczMzU3NDIsImV4cCI6MTc0NzMzOTM0MiwiaXNzIjoiZGVhcmsiLCJzdWIiOiIxIiwicm9sZSI6IkNVU1RPTUVSIn0.5fFXp9uMknE1Pj_u0b4Zi7CZRaN-61-SsOovdoW82ztDlHUwoh9DgHdh3tUBVgXa3ftTAaDiTLZNfByXXIX2vw',
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
