import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

const RecommendCardSkeleton = () => {
  return (
    <div className="relative h-[12.125rem] w-full">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />
      <div className="absolute top-[0.75rem] right-[0.875rem]">
        <Skeleton width={24} height={24} />
      </div>
      <div className="absolute bottom-[0.75rem] left-[0.75rem]">
        <Skeleton height={19} width={70} />
        <Skeleton height={19} width={100} />
      </div>
    </div>
  )
}
export default RecommendCardSkeleton
