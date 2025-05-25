import BottomStepperControls from '@/components/onboarding/BottomStepperControls'

interface OnboardingStep2Props {
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingStep2 = ({onNext, onSkip}: OnboardingStep2Props) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5">
      <BottomStepperControls
        step={2}
        title={'찜으로 쉬워지는 선택'}
        content1={'가게와 디자인을 찜해두고 비교해'}
        content2={'최선의 선택지를 마련해보세요.'}
        onNext={onNext}
        onSkip={onSkip}
      />
    </main>
  )
}
export default OnboardingStep2
