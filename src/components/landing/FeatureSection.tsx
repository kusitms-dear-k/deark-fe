import { motion } from 'framer-motion';
import Image from 'next/image';

const FeatureSection = () => {
  return (
    <div className={'mt-[48px] flex flex-col items-center justify-center'}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center gap-y-[16px]"
      >
        <div
          className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
          1. 내 일정에 맞는 가게만 보기
        </div>
        <Image
          src="/landing/calendar.svg"
          alt="캘린더"
          width={220}
          height={205}
          priority
          style={{ width: 220, height: 205 }}
        />
      </motion.div>

      <div className={'relative mt-[47px] flex h-[800px] w-[360px] flex-col items-center justify-center'}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="absolute top-0 flex flex-col gap-y-[16px]"
        >
          <div
            className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
            2. 가게들은 한 눈에 비교하기
          </div>
          <Image
            src="/landing/map.svg"
            alt="지도"
            width={250}
            height={424}
            priority
            style={{ width: 250, height: 424 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.5 }}
          className="absolute bottom-0 flex flex-col items-center gap-y-[16px]"
        >
          <div
            className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
            3. 선택형 주문으로 간편히
          </div>
          <Image
            src="/landing/order.svg"
            alt="캘린더"
            width={287}
            height={409}
            priority
            style={{ width: 287, height: 409 }}
          />
          <div
            className={
              'body-m absolute top-72 w-[310px] rounded-[10px] border-[1.3px] border-[var(--gray-300)] bg-[var(--white)] px-[10px] py-[10px]'
            }
          >
            혜수야 21번째 생일을 축하해 :)
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default FeatureSection;
