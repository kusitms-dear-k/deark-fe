import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import Image from 'next/image'

interface OnboardingStep2Props {
  onNext: () => void
  onSkip: () => void
}

const OnboardingStep2 = ({ onNext, onSkip }: OnboardingStep2Props) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between sm:pt-2 pt-5">
      {/* 반응형을 위한 기준 박스 */}
      <div className="relative w-full max-w-[400px] aspect-[3/4]">
        <div className="absolute left-[0%] top-[0%] w-[40%] aspect-[1/2]">
          <Image src="/onboarding/card1.png" fill alt="카드1" className="object-cover" />
        </div>
        <div className="absolute right-[0%] top-[15%] w-[80%] aspect-[4/3]">
          <Image src="/onboarding/hearts.png" fill alt="하트" className="object-contain" />
        </div>
        <div className="absolute right-[0%] top-[20%] w-[70%] aspect-[4/3]">
          <Image src="/onboarding/card2.png" fill alt="카드2" className="object-contain" />
        </div>
        <div className="absolute right-[0%] top-[60%] w-[40%] aspect-[2/3]">
          <Image src="/onboarding/card3.png" fill alt="카드3" className="object-cover" />
        </div>
        <div className="absolute left-[0%] top-[60%] w-[50%] aspect-[2/3]">
          <Image src="/onboarding/card4.png" fill alt="카드4" className="object-cover" />
        </div>
      </div>

      {/* 아래 버튼 */}
      <BottomStepperControls
        step={2}
        title="찜으로 쉬워지는 선택"
        content1="가게와 디자인을 찜해두고 비교해"
        content2="최선의 선택지를 마련해보세요."
        onNext={onNext}
        onSkip={onSkip}
      />
    </main>
  )
}
export default OnboardingStep2
