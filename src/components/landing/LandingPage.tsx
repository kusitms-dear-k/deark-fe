'use client';

import { useState } from 'react';

import Modal from '@/components/landing/Modal';
import PainAndSolutionSection from '@/components/landing/PainAndSolutionSection';
import FeatureSection from '@/components/landing/FeatureSection';
import SloganSection from '@/components/landing/SloganSection';
import CallToActionSection from '@/components/landing/CallToActionSection';

const LandingPage = () => {
  const [isNoModalOpen, setIsNoModalOpen] = useState<boolean>(false);
  const [isYesModalOpen, setIsYesModalOpen] = useState<boolean>(false);

  return (
    <div className={'flex flex-col items-center justify-center'}>
      {isNoModalOpen && (
        <Modal
          content={<>어떤 점이 아쉬웠는지 알려주시면 <br />꼭 참고해서 더 나은 서비스로 찾아올게요!</>}
          headingText={<>앗! 혹시<br />이유를 알 수 있을까요?</>}
          url={'https://docs.google.com/forms/d/e/1FAIpQLSeW7VzejSgDLA8mkQXidGqhqWv4KoznXxbJ9qvEtoEz4vnM_w/viewform'}
          setIsOpen={setIsNoModalOpen}
        />
      )}
      {isYesModalOpen && (
        <Modal
          content={<>필요한 기능이 있다면 알려주세요. <br />검토 후 최대한 반영해볼게요!</>}
          headingText={<>앗! 아직 준비 중이에요</>}
          url={'https://forms.gle/8HUsefcT4XFW7Tia7'}
          setIsOpen={setIsYesModalOpen}
        />
      )}
      <main className={'relative w-[360px] bg-[var(--background)] shadow-2xl'}>
        <PainAndSolutionSection />
        <FeatureSection />
        <SloganSection />
        <div className={'h-[100px]'} />
        <CallToActionSection setIsNoModalOpen={setIsNoModalOpen} setIsYesModalOpen={setIsYesModalOpen} />
      </main>
    </div>
  );
}
export default LandingPage;
