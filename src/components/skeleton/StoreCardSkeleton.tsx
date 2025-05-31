import Skeleton from 'react-loading-skeleton'

const StoreCardSkeleton = () => {
  return (
    <div className="border-gray-150 border-b pb-[1rem]">
      <section className="flex items-center justify-between pr-[1.25rem]">
        <section className="flex items-center gap-x-[0.75rem]">
          <Skeleton width={58} height={58} className="rounded-full" />
          <div>
            <Skeleton width={70} height={26} />
            <div className="flex items-center gap-x-1">
              <Skeleton width={89} height={19} />
              <Skeleton width={24} height={19} />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <Skeleton width={24} height={24} />
          <Skeleton width={25} height={16} />
        </section>
      </section>

      <section className="mt-[0.75rem] flex w-full gap-x-[0.125rem] overflow-x-scroll">
        {[1, 2, 3].map((i) => {
          return <Skeleton key={i} width={120} height={120} />
        })}
      </section>

      <section className="mt-[0.375rem] flex gap-x-[0.25rem]">
        <Skeleton width={76} height={22} />
        <Skeleton width={76} height={22} />
        <Skeleton width={76} height={22} />
      </section>
    </div>
  )
}
export default StoreCardSkeleton
