import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'

interface OnboardingStep3Props {
  onNext: () => void
}

const OnboardingStep3 = ({ onNext }: OnboardingStep3Props) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="relative h-[600px] w-[280px]">
          <Image src={'/onboarding/form.png'} alt="폰" fill className="object-cover object-top" />
        </div>
      </div>
      <div className="h-[80px]" />
      <BottomStepperControls
        step={3}
        title={'정돈된 폼, 명확한 주문'}
        content1={'보기 쉬운 질문형 옵션과 정돈된 양식으로'}
        content2={'직관적인 주문을 경험할 수 있어요.'}
        onNext={onNext}
      />
    </main>
  )
}
export default OnboardingStep3
