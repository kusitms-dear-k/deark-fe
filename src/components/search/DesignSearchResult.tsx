import Image from 'next/image';
import DesignCard from '@/components/search/DesignCard';

const DesignSearchResult = () => {
  return (
    <section className={'grid grid-cols-2 gap-[2px] gap-y-5'}>
      <DesignCard />
      <DesignCard />
      <DesignCard />
      <DesignCard />
    </section>
  );
};
export default DesignSearchResult;
