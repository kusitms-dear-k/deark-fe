import Cookies from 'js-cookie'

/**
 * 홈 화면에 필요한 데이터 조회
 */
export const getHomeData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/home`, {
    method: 'GET',
    headers: {
      Authorization:
        Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  return data
}
