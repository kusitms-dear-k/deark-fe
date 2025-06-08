import 'react-loading-skeleton/dist/skeleton.css'

import Skeleton from 'react-loading-skeleton';

const OrderSkeleton = () => {
  return (
    <div className="mt-24 flex flex-col gap-y-[16px] px-5 pb-5">
      <section>
        <Skeleton height={22} width={49} />
        <Skeleton height={50} className="w-full" />
      </section>

      <section>
        <Skeleton height={22} width={49} />
        <Skeleton height={50} className="w-full" />
      </section>

      <section>
        <Skeleton height={22} width={49} />
        <Skeleton height={50} className="w-full" />
      </section>

      <section>
        <Skeleton height={22} width={49} />
        <Skeleton height={19} width={119} />
        <Skeleton height={50} className="w-full" />
      </section>

      <section className="flex flex-col justify-center">
        <Skeleton height={22} width={49} />
        <Skeleton height={50} className="w-full" />
        <Skeleton height={350} width={350} />
      </section>
    </div>
  )
}
export default OrderSkeleton
