/**
 * 우리나라 도로명 가져오는 공공 API 를 사용하기 위해 토큰을 불러오는 함수, id 와 key 필요
 */
export const getPublicDataToken = async () => {
  return fetch(
    `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${process.env.NEXT_PUBLIC_SGIS_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_SGIS_SECRET}`
  )
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      return json
    })
    .catch((err) => {
      console.error('토큰 발급 실패:', err)
      throw err
    })
}

/**
 * 우리나라 도로명 가져오는 공공 API 함수
 * @param accessToken 공공 데이터 포탈 액세스 토큰
 * @param cd 주소 코드 ex) 서울 11, response 로 제공됨.
 */
export const getAddressData = async (accessToken: string, cd?: string) => {
  return fetch(
    `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}${cd ? `&cd=${cd}` : ''}`
  )
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      return json
    })
    .catch((err) => {
      console.error('지역 데이터 발급 실패:', err)
      throw err
    })
}
