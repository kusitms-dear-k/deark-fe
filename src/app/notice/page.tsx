'use client';

import Header from '@/components/common/Header'
import NoticeCard from '@/components/notice/NoticeCard'

const NoticePage = () => {
  return (
    <main>
      <Header headerType={'DYNAMIC'} title={'알림'} headerClassname={'fixed bg-white'}/>
      <div className="h-[80px]" />
      <section className="border">
        <NoticeCard />
        <NoticeCard />
      </section>
    </main>
  )
}
export default NoticePage
