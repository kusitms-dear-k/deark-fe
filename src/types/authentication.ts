import { UserLoginRoleType } from '@/types/common'

export type StepType = 'Loading' | 'SelectRole' | 'SignUp'
export type GenderType = 'MAN' | 'WOMAN'
export interface LoginType {
  profileImageUrl: string
  role: UserLoginRoleType
  userId: number
  nickname: string
  phoneNumber: string
}
export interface CustomerSignUpType {
  nickname: string
  gender: GenderType | null
  birthDate: string | null
  isMarketingAgreement: true
  isThridPartyAgreement: true
}
