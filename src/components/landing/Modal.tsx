import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  headingText: ReactNode;
  content: ReactNode;
  url: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: Props) => {
  const {headingText, content, url, setIsOpen} = props;

  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  return (
    <div
      className={'fixed inset-0 z-50 flex flex-col items-center gap-y-2 justify-center bg-[rgba(0,0,0,0.7)] px-8 min-h-screen'}>
      <motion.div
        className="flex flex-col justify-center items-center absolute bg-[var(--background)] w-[300px] p-[20px] rounded-[20px]"
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeOut' }}
        variants={variants}
      >
        <div className="w-full flex justify-end">
          <Image
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            src="/cancel.svg"
            alt="삭제"
            priority
            width={26}
            height={26}
            style={{ width: 26, height: 26 }}
          />
        </div>
        <Image
          src="/landing/cooking.svg"
          alt="베이킹중"
          priority
          width={56}
          height={56}
          style={{ width: 56, height: 56 }}
        />
        <h2 className="text-[var(--main)] headline-m mt-[19px] text-center">{headingText}</h2>
        <p className="body-l-1 text-[var(--gray-600)]">🍰서비스 출시 준비 중🍰</p>
        <p className="body-l-1 text-[var(--gray-600)] mt-[24px] text-center">{content}</p>
        <div className="bg-[var(--background)] w-full mt-[41px]">
          <Link href={url}
                className="flex items-center justify-center gap-x-1 bg-[var(--main)] button-l text-[var(--white)] rounded-[12px] h-[49px] hover:scale-105 transition">
            <Image
              src="/landing/file.svg"
              alt="파일"
              priority
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
            />
            소중한 의견 남기기
          </Link>
        </div>
      </motion.div>
    </div>

  )
}
export default Modal;
