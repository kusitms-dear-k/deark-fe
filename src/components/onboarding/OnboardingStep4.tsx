import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'
import { useLoginStore } from '@/store/authStore'

const OnboardingStep4 = () => {
  const setState = useLoginStore((state) => state.setState)

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* 오버레이 이미지 - main 기준으로 절대 위치 */}
      <Image
        src="/onboarding/pickup-status.png"
        width={400}
        height={200}
        alt="픽업 상태"
        className="absolute top-[25%] z-10 w-full max-w-[400px] left-1/2 -translate-x-1/2"
      />

      {/* 기기 이미지 */}
      <div className="relative flex w-full max-w-[280px] flex-col items-center justify-center">
        <div className="relative w-full aspect-[280/500]">
          <Image
            src="/onboarding/order.png"
            fill
            alt="주문 이미지"
            className="object-contain"
          />
        </div>
      </div>

      <div className="h-[80px]" />
      <BottomStepperControls
        step={4}
        title="한눈에 보이는 제작 현황"
        content1="제작 현황부터 픽업 일정까지,"
        content2="단계별로 확인하고 안심해요."
        onNext={() => setState({isGuardianModalOpen: false})}
        buttonContent="디어케이와 추억 쌓으러 가기"
        skipButtonContent="로그인"
      />
    </main>
  )
}
export default OnboardingStep4
