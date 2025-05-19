'use client'
import SelectRole from '@/components/authentication/SelectRole'
import { Suspense, useEffect, useState } from 'react'
import { ResponseType, UserLoginRoleType } from '@/types/common'
import SignUp from '@/components/authentication/SignUp'
import { LoginType, StepType } from '@/types/authentication'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLoginStore } from '@/store/authStore'
import Cookies from 'js-cookie'
import Loading from '@/components/common/Spinner'
import { getJWTToken, getKaKaoAccessToken } from '@/api/authenticationAPI'

const AuthenticationPage = () => {
  const [step, setStep] = useState<StepType>('Loading')
  const [role, setRole] = useState<UserLoginRoleType | undefined>()
  const params = useSearchParams()
  const router = useRouter()
  const setState = useLoginStore((state) => state.setState)

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
      try {
        getKaKaoAccessToken(code).then((kakaoResponse) => {
          if (kakaoResponse && kakaoResponse.access_token) {
            Cookies.set('kakaoAccessToken', kakaoResponse.access_token, {
              expires: Date.now() + 604800000,
            })
            if (Cookies.get('kakaoAccessToken') && code) {
              getJWTToken(Cookies.get('kakaoAccessToken') as string).then((response: ResponseType<LoginType>) => {
                console.log(response)
                Cookies.set('ROLE', response.results.role, { expires: Date.now() + 604800000 })
                setState({ user: response.results, isLoading: false })
                //권한 별로 router 지정
                if (response.results.role === 'GUEST') {
                  setStep('SelectRole')
                } else {
                  router.push('/home')
                }
              })
            }
          }
        })
      } catch (error: any) {
        setState({
          isLoading: false,
          error: error.response?.data?.message || '로그인 중 오류가 발생했습니다.',
        })
        throw error
      }
    }
  }, [params])

  return (
    <>
      {step === 'Loading' && <Loading />}
      {step === 'SelectRole' && <SelectRole role={role} handleRoleClick={handleRoleClick} setStep={setStep} />}
      {step === 'SignUp' && role && <SignUp role={role as UserLoginRoleType} setStep={setStep} />}
    </>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthenticationPage />
    </Suspense>
  )
}
