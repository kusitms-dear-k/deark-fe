import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'

interface OnboardingStep2Props {
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingStep2 = ({onNext, onSkip}: OnboardingStep2Props) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col flex-1 items-center justify-center relative w-full border h-full">
        <Image src={'/onboarding/card1.png'} width={150} height={1000} alt="폰" className="absolute top-5 left-0" />
        <Image src={'/onboarding/hearts.png'} width={300} height={1000} alt="폰" className="absolute top-30 right-0" />
        <Image src={'/onboarding/card2.png'} width={320} height={500} alt="폰" className="absolute top-40 right-0"  />
        <Image src={'/onboarding/card3.png'} width={150} height={1000} alt="폰" className="absolute top-90 right-0"  />
        <Image src={'/onboarding/card4.png'} width={220} height={1000} alt="폰" className="absolute top-90 left-0"  />
      </div>
      <div className="h-[80px]" />
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
