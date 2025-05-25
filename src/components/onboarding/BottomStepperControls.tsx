interface BottomStepperControlsProps {
  step: 1 | 2 | 3 | 4
  title: string
  content1: string
  content2: string
  onNext: () => void
  onSkip: () => void
  buttonContent?: string
  skipButtonContent?: string
}

const BottomStepperControls = ({
  step = 1,
  title,
  content1,
  content2,
  onNext,
  onSkip,
  buttonContent = '다음',
  skipButtonContent = '우선 둘러볼래요',
}: BottomStepperControlsProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <section className="from-bg-100 absolute bottom-76 h-[100px] w-full bg-gradient-to-t to-transparent"></section>
      <footer className="bg-bg-100 absolute bottom-15 flex w-full flex-col items-center justify-center gap-y-10 px-5 pt-8">
        <section className="flex flex-col gap-y-[6px]">
          <div className="headline-m text-gray-900">{title}</div>
          <div className="body-m-m flex flex-col items-center justify-center text-gray-500">
            <p>{content1}</p>
            <p>{content2}</p>
          </div>
        </section>
        <section className="mt-2 flex w-full flex-col items-center justify-center gap-y-3">
          <button onClick={onNext} className="blue-400-button w-full">
            {buttonContent}
          </button>
          <div className="flex gap-x-2">
            {skipButtonContent === '로그인' && (
              <p className="body-m text-gray-400">로그인 후 더 많은 기능을 사용해보세요</p>
            )}
            <button
              onClick={onSkip}
              className={`${skipButtonContent === '로그인' ? 'text-blue-400' : 'text-gray-400'} body-m underline`}
            >
              {skipButtonContent}
            </button>
          </div>
        </section>
      </footer>
    </div>
  )
}
export default BottomStepperControls
