'use client'

import DesignCard from '@/components/search/DesignCard'
import StoreCard from '@/components/search/StoreCard'
import Image from 'next/image'
import RecommendCard from '@/components/search/RecommendCard'
import { useState } from 'react'
import MiddleModal from '../common/MiddleModal'

const designData = [
  {
    id: 1,
    img: '/search/cake_img.png',
    enableDayOrder: true,
    storeName: '무무케이크',
    isHeart: false,
    description: '심플감성 스타일 레터링케이크',
    startPrice: '18000',
    heartCount: '1,452',
    location: '· 서울 흥길구 흥석동',
  },
  {
    id: 0,
    img: '/search/cake_img.png',
    enableDayOrder: true,
    storeName: '무무케이크',
    isHeart: true,
    description: '심플감성 스타일 레터링케이크',
    startPrice: '18000',
    heartCount: '1,452',
    location: '· 서울 흥길구 흥석동',
  },
  {
    id: 2,
    img: '/search/cake_img.png',
    enableDayOrder: false,
    storeName: '무무케이크',
    isHeart: false,
    description: '심플감성 스타일 레터링케이크',
    startPrice: '18000',
    heartCount: '1,452',
    location: '· 서울 흥길구 흥석동',
  },
]

interface Props {
  searchMenu: '디자인' | '스토어'
}

const DesignSearchResult = (props: Props) => {
  const { searchMenu } = props
  const [isGoLoginModal, setIsGoLoginModal] = useState<boolean>(true)
  const [isLogin] = useState<boolean>(false)

  const handleHeartClick = () => {
    if (isLogin) {
      setIsGoLoginModal(true)
    }
  }

  return (
    <div>
      <div className={'mt-7 mb-[53px] flex flex-col items-center justify-center gap-y-[15px]'}>
        <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
        <div className={'flex flex-col items-center justify-center'}>
          <div className={'title-l text-[var(--gray-500)]'}>검색 결과가 없어요!</div>
          <div className={'body-m text-[var(--gray-400)]'}>다른 키워드로 검색해 보세요.</div>
        </div>
      </div>
      <div className={'h-1 bg-[var(--gray-150)]'} />
      <div className={'mt-[24px] px-5'}>
        <h2 className={'title-l'}>이런 디자인은 어때요?</h2>
        <section className={'mt-2 grid grid-cols-2 gap-[2px]'}>
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
        </section>
      </div>
      {searchMenu === '디자인' ? (
        <section className={'grid grid-cols-2 gap-[2px] gap-y-5'}>
          {designData.map((design) => (
            <DesignCard
              key={design.id}
              img={design.img}
              enableDayOrder={design.enableDayOrder}
              storeName={design.storeName}
              isHeart={design.isHeart}
              description={design.description}
              startPrice={design.startPrice}
              heartCount={design.heartCount}
              location={design.location}
            />
          ))}
        </section>
      ) : (
        <section className={'flex flex-col gap-y-4 py-2 pl-5'}>
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
        </section>
      )}

      <MiddleModal isOpenModal={isGoLoginModal} onClose={() => setIsGoLoginModal(false)}>
        <div className="flex flex-col">
          <div>
            <p className="mb-1 text-center text-[1rem] font-bold">찜하기는 로그인 후 이용이 가능해요.</p>
            <p className="text-center text-xs font-normal">30초만에 로그인하고 계속 해볼까요?</p>
          </div>
          <button
            className="flex w-full items-center justify-center rounded-lg bg-[#FADD0E] py-3 text-sm font-semibold text-black"
            onClick={() => {
              // 카카오 로그인 로직
              setIsGoLoginModal(false)
            }}
          >
            <Image src={'/common/kakao_icon.svg'} alt="kakao icon" width={19} height={17} />
            카카오톡으로 쉬운 시작
          </button>
        </div>
      </MiddleModal>
    </div>
  )
}
export default DesignSearchResult
