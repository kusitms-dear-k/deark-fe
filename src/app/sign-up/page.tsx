'use client'
import SelectRole from '@/components/authentication/SelectRole'
import { Suspense, useEffect, useState } from 'react'
import { UserLoginRoleType } from '@/types/common'
import SignUp from '@/components/authentication/SignUp'
import { StepType } from '@/types/authentication'
import { useSearchParams } from 'next/navigation'
import { useLoginStore } from '@/store/authStore'
import Cookies from 'js-cookie'

const AuthenticationPage = () => {
  const [step, setStep] = useState<StepType>('SelectRole')
  const [role, setRole] = useState<UserLoginRoleType | undefined>()
  const params = useSearchParams()

  /**
   * Role 타입을 변경하는 함수
   * @param selected
   */
  const handleRoleClick = (selected: UserLoginRoleType) => {
    setRole((prev) => (prev === selected ? undefined : selected))
  }

  useEffect(() => {
    const code = params.get('code')
    if (code && (!Cookies.get('ACCESS_TOKEN') || !Cookies.get('kakaoAccessToken'))) {
      useLoginStore.getState().kakaoLogin(code as string)
    }
  }, [params])

  return (
    <>
      {step === 'SelectRole' && <SelectRole role={role} handleRoleClick={handleRoleClick} setStep={setStep} />}
      {step === 'SignUp' && role && <SignUp role={role as UserLoginRoleType} setStep={setStep} />}
    </>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <AuthenticationPage />
    </Suspense>
  )
}
