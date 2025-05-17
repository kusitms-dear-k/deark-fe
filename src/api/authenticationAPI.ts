import Cookies from 'js-cookie'
import { UserLoginRoleType } from '@/types/common'
import { CustomerSignUpType } from '@/types/authentication'

/**
 * 카카오 로그인 accessToken 을 불러오는 함수
 * @param code 카카오톡에서 받은 인가코드
 */
export async function getKaKaoAccessToken(code: string | null) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_REST_API_KEY ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI ?? '',
    code: code ?? '',
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '',
  })

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: body.toString(),
  })

  return await response.json()
}

/**
 * 카카오톡으로 받은 accessToken 을 보내고, userInfo 와 Token 을 받는 함수
 * @param accessToken 카카오톡 accessToken
 */
export const getJWTToken = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ accessToken }),
  })

  // 응답 헤더에서 accessToken 을 추출하여 쿠키에 저장
  const authHeader = response.headers.get('authorization')
  if (authHeader !== null) {
    Cookies.set('ACCESS_TOKEN', authHeader)
  }

  const data = await response.json()
  console.log('✅ 카카오 로그인 성공:', data)

  return data
}

/**
 * User Role 을 변경하는 함수
 * @param userRole 메이커: OWNER, 피커: CUSTOMER
 */
export const putUserRole = async (userRole: UserLoginRoleType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
    body: JSON.stringify({ role: userRole }),
  })

  const data = await response.json()
  console.log('✅ 역할 저장 성공:', data)

  return data
}

/**
 * 유효성 검사 함수
 * @param nickName 닉네임
 */
export const getValidationNickname = async (nickName: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/nickname/validation?nickname=${nickName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
  })

  const data = await response.json()
  console.log('✅닉네임 유효성 검사 저장 성공:', data)

  return data
}

/**
 * picker sign-up 함수
 * @param formData 메이커: OWNER, 피커: CUSTOMER
 */
export const customerSignUp = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    method: 'POST',
    headers: {
      Authorization: Cookies.get('ACCESS_TOKEN') as string,
    },
    body: formData,
  })

  const data = await response.json()
  console.log('✅피커 회원등록 유효성 검사 저장 성공:', data)

  return data
}
