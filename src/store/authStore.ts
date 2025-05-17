import { create } from 'zustand'
import { LoginType, CustomerSignUpType } from '@/types/authentication'
import {
  customerSignUp,
  getJWTToken,
  getKaKaoAccessToken,
  getValidationNickname,
  putUserRole,
} from '@/api/authenticationAPI'
import { ResponseType, UserLoginRoleType } from '@/types/common'
import Cookies from 'js-cookie'
import { OrderFormDesignType, OrderFormRequestDetailType, OrderMenuType, QaDetailType } from '@/types/mypage'

interface LoginState {
  user: LoginType | null
  customer: CustomerSignUpType | null
  isLoading: boolean
  error: boolean | null
  isWelcomeModalOpen: boolean
  isGuardianModalOpen: boolean

  kakaoLogin: (code: string) => void
  changeRole: (role: UserLoginRoleType) => void
  validationNickname: (nickName: string) => Promise<boolean>
  customerSignUp: (formData: FormData) => void
  setState: (params: { isWelcomeModalOpen?: boolean; isGuardianModalOpen?: boolean }) => void
}

export const useLoginStore = create<LoginState>((set) => ({
  user: null,
  customer: null,
  isLoading: false,
  error: null,
  isWelcomeModalOpen: true,
  isGuardianModalOpen: false,

  setState: (params: { isWelcomeModalOpen?: boolean; isGuardianModalOpen?: boolean }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },

  kakaoLogin: async (code: string) => {
    const kakaoToken = Cookies.get('kakaoAccessToken')
    try {
      set({ isLoading: true, error: null })
      const kakaoResponse = await getKaKaoAccessToken(code)
      if (kakaoResponse && kakaoResponse.access_token) {
        Cookies.set('kakaoAccessToken', kakaoResponse.access_token, {
          expires: Date.now() + 604800000,
        })
        if (!kakaoToken && code) {
          const data: ResponseType<LoginType> = await getJWTToken(Cookies.get('kakaoAccessToken') as string)
          set({ user: data.results, isLoading: false })
        }
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || '로그인 중 오류가 발생했습니다.',
      })
      throw error
    }
  },
  customerSignUp: async (formData: FormData) => {
    try {
      set({ isLoading: true, error: null })
      await customerSignUp(formData)
      set({ isLoading: false })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || '피커 회원가입 중 오류가 발생했습니다.',
      })
      throw error
    }
  },
  changeRole: async (role: UserLoginRoleType) => {
    try {
      set({ isLoading: true, error: null })
      await putUserRole(role)
      set({ isLoading: false })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || '역할 수정 중 오류가 발생했습니다.',
      })
      throw error
    }
  },
  validationNickname: async (nickName: string) => {
    try {
      set({ isLoading: true, error: null })
      const validationResult: ResponseType<boolean> = await getValidationNickname(nickName)
      set({ isLoading: false })
      return validationResult.results
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || '닉네임 유효성 검사',
      })
      throw error
    }
  },
}))
