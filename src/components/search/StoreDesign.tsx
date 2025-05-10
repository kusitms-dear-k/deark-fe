import Image from 'next/image';
import DesignCard from '@/components/search/DesignCard'

const StoreDesign = () => {
  return (
    <>
      <section className={'flex justify-start w-full gap-x-2 py-3 px-5'}>
        <button className="blue-chip">전체</button>
        <button className="gray-chip">도시락 케이크</button>
        <button className="gray-chip">1호 케이크</button>
        <button className="gray-chip">2호 케이크</button>
      </section>
      <section className="grid w-full grid-cols-2 gap-x-[2px] overflow-y-scroll">
        <DesignCard
          description={'설명'}
          location={'경기도 이천시 증포동'}
          img={'/common/cake1.png'}
          heartCount={'1'}
          isHeart={true}
          storeName={'유림이집'}
          startPrice={'10000'}
          enableDayOrder={true}
          onHeartClick={() => {}}
        />
        <DesignCard
          description={'설명'}
          location={'경기도 이천시 증포동'}
          img={'/common/cake1.png'}
          heartCount={'1'}
          isHeart={true}
          storeName={'유림이집'}
          startPrice={'10000'}
          enableDayOrder={true}
          onHeartClick={() => {}}
        />
        <DesignCard
          description={'설명'}
          location={'경기도 이천시 증포동'}
          img={'/common/cake1.png'}
          heartCount={'1'}
          isHeart={true}
          storeName={'유림이집'}
          startPrice={'10000'}
          enableDayOrder={true}
          onHeartClick={() => {}}
        />
        <DesignCard
          description={'설명'}
          location={'경기도 이천시 증포동'}
          img={'/common/cake1.png'}
          heartCount={'1'}
          isHeart={true}
          storeName={'유림이집'}
          startPrice={'10000'}
          enableDayOrder={true}
          onHeartClick={() => {}}
        />
      </section>
    </>
  )
}
export default StoreDesign
