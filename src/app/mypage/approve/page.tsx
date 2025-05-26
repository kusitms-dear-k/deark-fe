'use client'
import Header from '@/components/common/Header'
import PickUpStatusCard from '@/components/mypage/PickUpStatusCard'

const ApprovePage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header
        headerType="DYNAMIC"
        title="픽업 확정"
        // className="top-20 items-start"
        headerClassname={'fixed bg-white px-5'}
      />

      <section className="mt-[4.375rem] flex flex-col gap-y-[1rem] px-[1.25rem]">
        <section>
          <h2 className="title-m p-[0.5rem]">
            픽업 예정 <span className="text-blue-400">2건</span>
          </h2>
          <section className="flex flex-col gap-y-[1rem]">
            <PickUpStatusCard />
            <PickUpStatusCard />
          </section>
        </section>
        <section>
          <h2 className="title-l p-[0.5rem]">
            픽업 완료 <span className="text-blue-400">2건</span>
          </h2>
          <section className="flex flex-col gap-y-[1rem]">
            <PickUpStatusCard />
            <PickUpStatusCard />
            <PickUpStatusCard />
            <PickUpStatusCard />
          </section>
        </section>
      </section>
    </main>
  )
}
export default ApprovePage
