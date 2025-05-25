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
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center relative w-full">
        <Image src={'/onboarding/home-screen.png'} width={280} height={1000} alt="폰"/>
        <Image src={'/onboarding/filter.png'} width={400} height={200} alt="폰" className="absolute z-10 top-48 drop-shadow-[0_-20px_10px_rgba(62,152,249,0.1)]"/>
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
