import 'react-loading-skeleton/dist/skeleton.css'

import Skeleton from 'react-loading-skeleton'

const DesignCardSkeleton = () => {
  return (
    <div className="w-full bg-white">
      <Skeleton width="100%" height="12.125rem" />

      <section className="flex flex-col gap-y-1 px-[0.625rem] py-[0.375rem]">
        <div className="flex flex-col gap-y-[0.25rem]">
          <Skeleton width={50} height={16} />

          <Skeleton width={174} height={22} />
        </div>
        <div>
          <Skeleton width={100} height={20} />
        </div>
        <section className="flex gap-x-[0.25rem]">
          <div className="flex items-center gap-x-[0.125rem]">
            <Skeleton width={16} height={16} />
            <Skeleton width={25} height={16} />
          </div>
          <Skeleton width={80} height={16} />
        </section>
      </section>
    </div>
  )
}
export default DesignCardSkeleton
