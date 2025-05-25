import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'

interface OnboardingStep4Props {
  onNext: () => void;
  onSkip: () => void;
}
const OnboardingStep4 = ({onNext, onSkip} : OnboardingStep4Props) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="relative h-[500px] w-[280px]">
          <Image src={'/onboarding/order.png'} fill className="object-contain" alt="폰" />
        </div>

        <Image
          src={'/onboarding/pickup-status.png'}
          width={500}
          height={200}
          alt="폰"
          className="absolute top-25 z-10"
        />
      </div>
      <div className="h-[160px]" />
      <BottomStepperControls
        step={4}
        title={'한눈에 보이는 제작 현황'}
        content1={'제작 현황부터 픽업 일정까지,'}
        content2={'단계별로 확인하고 안심해요.'}
        onNext={onNext}
        onSkip={onSkip}
        buttonContent={'디어케이와 추억 쌓으러 가기'}
        skipButtonContent={'로그인'}
      />
    </main>
  )
}
export default OnboardingStep4
