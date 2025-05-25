'use client';

import { Switch } from "@/components/ui/switch"


import Header from '@/components/common/Header'
import NoticeCard from '@/components/notice/NoticeCard'
import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'

const NoticePage = () => {
  return (
    <main>
      <Header headerType={'DYNAMIC'} title={'알림'} headerClassname={'fixed bg-white'}/>
      <div className="h-[80px]" />
      <section className="flex flex-col gap-y-[6px] px-5 pt-[32.5px]">
        <div className="flex gap-x-[5px]">
          <Switch />
          <p className="body-m-m text-gray-700">수락된 건만 보기</p>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-150">
          <div className="flex gap-x-1">
            <UnCheckBoxIcon />
            <p className="body-m text-gray-500">전체선택(1/5)</p>
          </div>
          <button className="body-m text-gray-500">선택삭제</button>
        </div>
      </section>
      <section className="">
        <NoticeCard />
        <NoticeCard />
        <NoticeCard />
        <NoticeCard />
        <NoticeCard />
        
      </section>
    </main>
  )
}
export default NoticePage
