import BottomStepperControls from '@/components/onboarding/BottomStepperControls'

interface OnboardingStep4Props {
  onNext: () => void;
  onSkip: () => void;
}
const OnboardingStep4 = ({onNext, onSkip} : OnboardingStep4Props) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 w-full">
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
