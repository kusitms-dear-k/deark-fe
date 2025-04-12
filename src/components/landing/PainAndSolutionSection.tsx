import Image from 'next/image';
import { motion } from 'framer-motion';

const PainAndSolutionSection = () => {
  return (
    <section>
      {/* 배경 사진 */}
      <Image
        className={'absolute top-7'}
        src="/landing/cake_img.png"
        alt="케이크 사진"
        priority
        width={360}
        height={500}
        style={{ width: 360, height: 500 }}
      />

      {/* 지붕 아이콘 */}
      <Image
        className={'relative z-10'}
        src="/landing/roof.svg"
        alt="지붕"
        width={361}
        height={105}
        priority
        style={{ width: 361, height: 105 }}
      />

      {/* pain point 메시지 */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className={'title-l mt-[32px] text-center'}>레터링케이크 주문할 때</p>
        <p className="headline-m mt-[7px] text-center">
            <span className="relative inline-block">
              <span className="text-[var(--main)] before:absolute before:top-[-20px] before:left-1 before:content-['•']">
                어
              </span>
              <span className="text-[var(--main)] before:absolute before:top-[-20px] before:left-6 before:content-['•']">
                떤
              </span>{' '}
              <span className="text-[var(--main)] before:absolute before:top-[-20px] before:left-13 before:content-['•']">
                가
              </span>
              <span className="text-[var(--main)] before:absolute before:top-[-20px] before:left-18 before:content-['•']">
                게
              </span>
            </span>
          에서 주문할지
          <br />
          막막하셨죠?
        </p>
        <Image
          className={'mt-[11px]'}
          src="/landing/emoji.png"
          alt="이모지"
          width={72}
          height={72}
          priority
          style={{ width: 72, height: 72 }}
        />

        <div className={'mt-[25px] flex flex-col gap-y-[12px]'}>
          <div className={'flex h-[40px] w-[220px] items-center justify-center rounded-[8px] bg-[var(--white)]'}>
            <p className={'title-m text-[var(--main)]'}>
              당일 예약 가능한 곳<span className={'title-s text-[var(--gray-900)]'}>만 보고싶은데</span>
            </p>
          </div>

          <div className={'flex h-[40px] w-[220px] items-center justify-center rounded-[8px] bg-[var(--white)]'}>
            <p className={'title-m text-[var(--main)]'}>
              여러 가게를 쉽게 비교<span className={'title-s text-[var(--gray-900)]'}>하면 좋겠고</span>
            </p>
          </div>

          <div className={'flex h-[40px] w-[220px] items-center justify-center rounded-[8px] bg-[var(--white)]'}>
            <p className={'title-m text-[var(--main)]'}>
              접수 양식<span className={'title-s text-[var(--gray-900)]'}>도 더 </span>간편하게{' '}
              <span className={'title-s text-[var(--gray-900)]'}>쓰고 싶어!</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* 해결책 */}
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* dot 3개 */}
        <div className={'mt-[22px] flex flex-col items-center justify-center gap-y-[12px]'}>
          <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)] opacity-20'} />
          <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)] opacity-70'} />
          <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)]'} />
        </div>

        <p className={'headline-s mt-[22px] text-center'}>
          이젠 헤매지 마세요. <br /> <span className={'text-[var(--main)]'}>디어케이가 찾아드릴께요.</span>
        </p>

        <div className={'mt-[22px] flex items-center justify-center gap-x-[11px]'}>
          {/* 케이크 아이콘 */}
          <Image
            src="/landing/cake.svg"
            alt="케이크"
            width={70}
            height={70}
            priority
            style={{ width: 70, height: 70 }}
          />
          {/* ------- */}
          <Image
            className={''}
            src="/landing/line.svg"
            alt="케이크가게"
            width={75}
            height={20}
            priority
            style={{ width: 75, height: 20 }}
          />
          {/* 가게 아이콘 */}
          <Image
            src="/landing/bakery.svg"
            alt="케이크가게"
            width={74}
            height={74}
            priority
            style={{ width: 74, height: 74 }}
          />
        </div>
        <div className={'flex items-center justify-center gap-x-[95px]'}>
          <p className={'body-l-1 text-[var(--gray-400)]'}>원하는 조건</p>
          <p className={'body-l-1 text-[var(--gray-400)]'}>케이크 가게</p>
        </div>
      </motion.div>
    </section>
  )
}
export default PainAndSolutionSection;
