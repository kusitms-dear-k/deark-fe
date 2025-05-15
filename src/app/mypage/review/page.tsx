'use client'
import Header from '@/components/common/Header'
import Image from 'next/image'

const ReviewPage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header
        headerType="DYNAMIC"
        title="리뷰"
        className="top-20 items-start"
        description={'소중한 의견을 남겨주세요.'}
      />

      <div className="flex flex-1 flex-col items-center justify-center px-5">
        <Image src="/search/memo.svg" width={28} height={32} alt="메모" />
        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="title-l text-[var(--gray-500)]">검색 결과가 없어요!</div>
          <div className="body-m text-[var(--gray-400)]">다른 키워드로 검색해 보세요.</div>
        </div>
      </div>
    </main>
  )
}
export default ReviewPage
