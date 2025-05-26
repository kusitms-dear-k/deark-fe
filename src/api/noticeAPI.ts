import { OrderMenuType } from '@/types/mypage'

/**
 * 알람 전체 조회
 */
export const getNotices = async (orderStatus: OrderMenuType | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/alarm${orderStatus !== null ? `?orderStatus=${orderStatus}` : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  )

  const data = await response.json()
  return data
}

/**
 * 알람 삭제
 */
export const deleteNotices = async (deleteAlarmIdList: number[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/alarm`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify({ alarmIdList: deleteAlarmIdList })
    }
  )

  const data = await response.json()
  return data
}

/**
 * 알람 읽음 처리
 */
export const putNotices = async (readAlarmIdList: number[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/alarm/read`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
      body: JSON.stringify({ alarmIdList: readAlarmIdList })
    }
  )

  const data = await response.json()
  return data
}
