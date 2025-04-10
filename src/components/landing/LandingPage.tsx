import { useState } from 'react';
import Modal from '@/components/landing/Modal';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [isNoModalOpen, setIsNoModalOpen] = useState<boolean>(false);
  const [isYesModalOpen, setIsYesModalOpen] = useState<boolean>(false);

  return (
    <div className={'flex flex-col items-center justify-center'}>
      {isNoModalOpen && (
        <Modal
          content={
            <>
              어떤 점이 아쉬웠는지 알려주시면 <br />꼭 참고해서 더 나은 서비스로 찾아올게요!
            </>
          }
          headingText={'앗! 혹시 이유를 알 수 있을까요?'}
          url={'https://forms.gle/8HUsefcT4XFW7Tia7'}
          setIsOpen={setIsNoModalOpen}
        />
      )}
      {isYesModalOpen && (
        <Modal
          content={
            <>
              필요한 기능이 있다면 알려주세요. <br />
              검토 후 최대한 반영해볼게요!
            </>
          }
          headingText={'앗! 아직 준비 중이에요'}
          url={'https://forms.gle/8HUsefcT4XFW7Tia7'}
          setIsOpen={setIsYesModalOpen}
        />
      )}
      <main className={'relative w-[360px] bg-[var(--background)] shadow-2xl'}>
        <Image
          className={'absolute top-7'}
          src="/landing/cake_img.png"
          alt="케이크 사진"
          priority
          width={360}
          height={500}
          style={{ width: 360, height: 500 }}
        />
        <Image
          className={'relative z-10'}
          src="/landing/roof.svg"
          alt="지붕"
          width={361}
          height={105}
          priority
          style={{ width: 361, height: 105 }}
        />
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
              <span className="text-[var(--main)] before:absolute before:top-[-20px] before:left-12 before:content-['•']">
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

        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={'mt-[22px] flex flex-col items-center justify-center gap-y-[12px]'}>
            <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)] opacity-20'} />
            <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)] opacity-70'} />
            <div className={'h-[8px] w-[8px] rounded-full bg-[var(--main)]'} />
          </div>

          <p className={'headline-s mt-[22px] text-center'}>
            이젠 헤매지 마세요. <br /> <span className={'text-[var(--main)]'}>디어케이가 찾아드릴께요.</span>
          </p>

          <div className={'mt-[22px] flex items-center justify-center gap-x-[11px]'}>
            <Image
              src="/landing/cake.svg"
              alt="케이크"
              width={70}
              height={70}
              priority
              style={{ width: 70, height: 70 }}
            />
            <Image
              className={''}
              src="/landing/line.svg"
              alt="케이크가게"
              width={75}
              height={20}
              priority
              style={{ width: 75, height: 20 }}
            />
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

        <div className={'mt-[48px] flex flex-col items-center justify-center'}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-y-[16px]"
          >
            <div className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
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
              <div className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
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
              <div className="title-l flex h-[49px] w-[252px] items-center justify-center rounded-[12px] bg-[#3E98F9] text-[var(--white)]">
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
              <div className={'absolute top-72 border-[1.3px] border-[var(--gray-300)] py-[10px] px-[10px] w-[310px] rounded-[10px] bg-[var(--white)] button-m'}>혜수야 21번째 생일을 축하해 :)</div>
            </motion.div>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
          className="mt-[52px] flex flex-col items-center justify-center"
        >
          <p className="body-el text-[var(--main)]">레터링 케이크 주문을 쉽게</p>
          <p className="key-visual-l text-[#BC1416]">“Cake it easy”</p>
        </motion.section>

        <div className={"h-[100px]"} />

        <section className={'fixed bottom-0 mt-[32px] flex gap-x-[8px] p-[16px] bg-[var(--background)] p-[16px]'}>
          <button
            onClick={() => {
              setIsNoModalOpen(!isNoModalOpen);
            }}
            className={
              'button-l h-[49px] w-[160px] cursor-pointer appearance-none rounded-[12px] border-none bg-[#757575] text-[var(--white)] transition hover:scale-105'
            }
          >
            나가기
          </button>
          <button
            onClick={() => {
              setIsYesModalOpen(!isYesModalOpen);
            }}
            className={
              'button-l h-[49px] w-[160px] cursor-pointer appearance-none rounded-[12px] border-none bg-[#0C70FA] text-[var(--white)] transition hover:scale-105'
            }
          >
            사용해보기
          </button>
        </section>
      </main>
    </div>
  );
}
export default LandingPage;
