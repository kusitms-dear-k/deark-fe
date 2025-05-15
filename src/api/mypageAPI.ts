import Cookies from 'js-cookie'
import { OrderMenuType } from '@/types/mypage'

/**
 * 내가 작성한 주문서
 */
export const myOrder = async (status: OrderMenuType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mypage/request/status?status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}
