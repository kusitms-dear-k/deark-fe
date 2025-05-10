import { UserLoginRoleType } from '@/types/common'

export type StepType = 'SelectRole' | 'SignUp'
export type GenderType = 'MAN' | 'WOMAN'
export interface LoginType {
  profileImageUrl: string
  role: UserLoginRoleType
  userId: number
}
export interface CustomerSignUpType {
  nickname: string
  gender: GenderType | null
  birthDate: string | null
  isMarketingAgreement: true
  isThridPartyAgreement: true
}
