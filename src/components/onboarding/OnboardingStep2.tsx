import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'

interface OnboardingStep2Props {
  onNext: () => void
  onSkip: () => void
}

const OnboardingStep2 = ({ onNext, onSkip }: OnboardingStep2Props) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative flex w-full flex-1 flex-col items-center justify-center border">
        <div className="absolute top-0 left-0">
          <div className="relative h-[300px] w-[150px]">
            <Image src={'/onboarding/card1.png'} fill alt="폰" className="object-cover object-top" />
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <div className="relative h-[400px] w-[300px]">
            <Image src={'/onboarding/hearts.png'} fill alt="폰" className="object-contain" />
          </div>
        </div>
        <div className="absolute top-18 right-0">
          <div className="relative h-[300px] w-[320px]">
            <Image src={'/onboarding/card2.png'} fill alt="폰" className="object-contain" />
          </div>
        </div>

        <div className="absolute top-80 right-0">
          <div className="relative h-[300px] w-[150px]">
            <Image src={'/onboarding/card3.png'} fill alt="폰" className="object-cover object-top" />
          </div>
        </div>
        <div className="absolute top-80 left-0">
          <div className="relative h-[300px] w-[220px]">
            <Image src={'/onboarding/card4.png'} fill alt="폰" className="object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="h-[300px]" />
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
