import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface OnboardingStep1Props {
  onNext: () => void
  onSkip: () => void
}

const OnboardingStep1 = ({ onSkip, onNext }: OnboardingStep1Props) => {
  const router = useRouter()
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="relative h-[600px] w-[280px]">
          <Image src={'/onboarding/home-screen.png'} fill alt="폰" className="object-cover object-top" />
        </div>
        <Image
          src={'/onboarding/filter.png'}
          width={400}
          height={200}
          alt="폰"
          className="absolute top-48 z-10 drop-shadow-[0_-20px_10px_rgba(62,152,249,0.1)]"
        />
      </div>
      <div className="h-[80px]" />
      <BottomStepperControls
        step={1}
        title={'내게 꼭 필요한 검색 필터'}
        content1={'유연한 검색과 맞춤형 필터로'}
        content2={'원하는 가게와 디자인을 쉽게 찾아보세요.'}
        onNext={onNext}
        onSkip={onSkip}
      />
    </main>
  )
}
export default OnboardingStep1
