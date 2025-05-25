interface BottomStepperControlsProps {
  step: 1 | 2 | 3 | 4
  title: string
  content1: string
  content2: string
  onNext: () => void;
  onSkip: () => void;
  buttonContent?: string
  skipButtonContent?: string
}

const BottomStepperControls = ({ step = 1, title, content1, content2, onNext, onSkip, buttonContent = '다음', skipButtonContent = '우선 둘러볼래요' }: BottomStepperControlsProps) => {
  return (
    <footer className="absolute left-5 bottom-10 right-5 flex flex-col items-center justify-center gap-y-10">
      <section className="flex gap-x-[6px]">
        <div
          className={
            step === 1 ? 'h-[8px] w-[30px] rounded-full bg-blue-400' : 'h-[8px] w-[8px] rounded-full bg-gray-200'
          }
        />
        <div
          className={
            step === 2 ? 'h-[8px] w-[30px] rounded-full bg-blue-400' : 'h-[8px] w-[8px] rounded-full bg-gray-200'
          }
        />
        <div
          className={
            step === 3 ? 'h-[8px] w-[30px] rounded-full bg-blue-400' : 'h-[8px] w-[8px] rounded-full bg-gray-200'
          }
        />
        <div
          className={
            step === 4 ? 'h-[8px] w-[30px] rounded-full bg-blue-400' : 'h-[8px] w-[8px] rounded-full bg-gray-200'
          }
        />
      </section>
      <section className="flex flex-col gap-y-[6px]">
        <div className="headline-m text-gray-900">{title}</div>
        <div className="body-m-m flex flex-col items-center justify-center text-gray-500">
          <p>{content1}</p>
          <p>{content2}</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full flex-col gap-y-3">
        <button onClick={onNext} className="blue-400-button w-full">{buttonContent}</button>
        <div className="flex gap-x-2">
          {skipButtonContent === '로그인' && <p className="text-gray-400 body-m">로그인 후 더 많은 기능을 사용해보세요</p>}
          <button onClick={onSkip} className={`${skipButtonContent === '로그인' ? 'text-blue-400' : 'text-gray-400'} body-m underline`}>{skipButtonContent}</button>
        </div>
      </section>
    </footer>
  )
}
export default BottomStepperControls
